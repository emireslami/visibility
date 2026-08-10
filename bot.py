#!/usr/bin/env python3
import argparse
import json
import os
import signal
import sqlite3
import sys
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone


SCHEMA = """
CREATE TABLE IF NOT EXISTS telegram_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    update_id INTEGER NOT NULL,
    message_id INTEGER,
    chat_id INTEGER,
    chat_title TEXT,
    chat_username TEXT,
    chat_type TEXT,
    sender_id INTEGER,
    sender_username TEXT,
    sender_first_name TEXT,
    sender_last_name TEXT,
    sender_is_bot INTEGER,
    sender_chat_id INTEGER,
    sender_chat_title TEXT,
    body TEXT,
    caption TEXT,
    message_type TEXT,
    sent_at_utc TEXT,
    sent_date TEXT,
    sent_time TEXT,
    edited_at_utc TEXT,
    reply_to_message_id INTEGER,
    forward_origin_json TEXT,
    entities_json TEXT,
    media_file_id TEXT,
    media_group_id TEXT,
    raw_payload_json TEXT NOT NULL,
    received_at_utc TEXT NOT NULL,
    UNIQUE(update_id, message_id)
);

CREATE TABLE IF NOT EXISTS bot_state (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
"""


MESSAGE_KEYS = [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
]


MEDIA_KEYS = [
    "photo",
    "video",
    "document",
    "voice",
    "audio",
    "video_note",
    "animation",
    "sticker",
    "location",
    "contact",
    "poll",
    "venue",
]


running = True


def load_env_file(path):
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as env_file:
        for raw_line in env_file:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)


def connect_db(path):
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA)
    conn.commit()
    return conn


def api_call(token, method, payload=None, timeout=70):
    url = f"https://api.telegram.org/bot{token}/{method}"
    data = None
    headers = {}
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=data, headers=headers, method="POST")
    with urllib.request.urlopen(request, timeout=timeout) as response:
        parsed = json.loads(response.read().decode("utf-8"))
    if not parsed.get("ok"):
        raise RuntimeError(f"Telegram API error for {method}: {parsed}")
    return parsed["result"]


def get_state(conn, key):
    row = conn.execute("SELECT value FROM bot_state WHERE key = ?", (key,)).fetchone()
    return row["value"] if row else None


def set_state(conn, key, value):
    conn.execute(
        "INSERT INTO bot_state(key, value) VALUES(?, ?) "
        "ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        (key, str(value)),
    )
    conn.commit()


def unix_to_parts(timestamp):
    if not timestamp:
        return None, None, None
    dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
    return dt.isoformat(), dt.date().isoformat(), dt.time().replace(microsecond=0).isoformat()


def detect_message_type(message):
    if message.get("text") is not None:
        return "text"
    for key in MEDIA_KEYS:
        if key in message:
            return key
    service_keys = [
        "new_chat_members",
        "left_chat_member",
        "new_chat_title",
        "new_chat_photo",
        "delete_chat_photo",
        "group_chat_created",
        "supergroup_chat_created",
        "channel_chat_created",
        "message_auto_delete_timer_changed",
        "pinned_message",
    ]
    for key in service_keys:
        if key in message:
            return key
    return "unknown"


def extract_media_file_id(message):
    if "photo" in message and message["photo"]:
        return message["photo"][-1].get("file_id")
    for key in ["video", "document", "voice", "audio", "video_note", "animation", "sticker"]:
        if key in message and isinstance(message[key], dict):
            return message[key].get("file_id")
    return None


def find_message(update):
    for key in MESSAGE_KEYS:
        if key in update:
            return key, update[key]
    return None, None


def save_update(conn, update):
    update_id = update.get("update_id")
    update_kind, message = find_message(update)
    if not message:
        return False

    chat = message.get("chat") or {}
    sender = message.get("from") or {}
    sender_chat = message.get("sender_chat") or {}
    sent_at_utc, sent_date, sent_time = unix_to_parts(message.get("date"))
    edited_at_utc, _, _ = unix_to_parts(message.get("edit_date"))
    reply_to_message = message.get("reply_to_message") or {}

    body = message.get("text")
    caption = message.get("caption")
    entities = message.get("entities") or message.get("caption_entities")

    conn.execute(
        """
        INSERT OR IGNORE INTO telegram_messages (
            update_id, message_id, chat_id, chat_title, chat_username, chat_type,
            sender_id, sender_username, sender_first_name, sender_last_name, sender_is_bot,
            sender_chat_id, sender_chat_title, body, caption, message_type,
            sent_at_utc, sent_date, sent_time, edited_at_utc, reply_to_message_id,
            forward_origin_json, entities_json, media_file_id, media_group_id,
            raw_payload_json, received_at_utc
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            update_id,
            message.get("message_id"),
            chat.get("id"),
            chat.get("title"),
            chat.get("username"),
            chat.get("type"),
            sender.get("id"),
            sender.get("username"),
            sender.get("first_name"),
            sender.get("last_name"),
            int(bool(sender.get("is_bot"))) if sender else None,
            sender_chat.get("id"),
            sender_chat.get("title"),
            body,
            caption,
            detect_message_type(message),
            sent_at_utc,
            sent_date,
            sent_time,
            edited_at_utc,
            reply_to_message.get("message_id"),
            json.dumps(message.get("forward_origin"), ensure_ascii=False) if message.get("forward_origin") else None,
            json.dumps(entities, ensure_ascii=False) if entities else None,
            extract_media_file_id(message),
            message.get("media_group_id"),
            json.dumps(update, ensure_ascii=False),
            datetime.now(timezone.utc).isoformat(),
        ),
    )
    conn.commit()

    label = body or caption or f"[{detect_message_type(message)}]"
    print(
        f"saved {update_kind} update={update_id} chat={chat.get('title') or chat.get('id')} "
        f"sender={sender.get('username') or sender.get('id') or sender_chat.get('title')} body={label[:120]!r}",
        flush=True,
    )
    return True


def handle_signal(signum, frame):
    global running
    running = False
    print("\nStopping bot after current request...", flush=True)


def run_bot(token, db_path):
    conn = connect_db(db_path)
    bot = api_call(token, "getMe")
    print(f"Bot connected: @{bot.get('username')} ({bot.get('first_name')})", flush=True)
    print("Waiting for Telegram updates. Press Ctrl+C to stop.", flush=True)

    offset_value = get_state(conn, "offset")
    offset = int(offset_value) if offset_value else None

    while running:
        payload = {
            "timeout": 50,
            "limit": 100,
            "allowed_updates": MESSAGE_KEYS,
        }
        if offset is not None:
            payload["offset"] = offset

        try:
            updates = api_call(token, "getUpdates", payload=payload, timeout=65)
            for update in updates:
                save_update(conn, update)
                offset = int(update["update_id"]) + 1
                set_state(conn, "offset", offset)
        except urllib.error.HTTPError as error:
            body = error.read().decode("utf-8", errors="replace")
            print(f"Telegram HTTP error {error.code}: {body}", file=sys.stderr, flush=True)
            time.sleep(5)
        except urllib.error.URLError as error:
            print(f"Network error: {error}", file=sys.stderr, flush=True)
            time.sleep(5)
        except Exception:
            traceback.print_exc()
            time.sleep(5)

    conn.close()


def main():
    parser = argparse.ArgumentParser(description="Collect Telegram group messages into SQLite.")
    parser.add_argument("--db", default="telegram_messages.sqlite3", help="SQLite database path")
    parser.add_argument("--env", default=".env", help="Optional env file path")
    args = parser.parse_args()

    load_env_file(args.env)
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        print("Missing TELEGRAM_BOT_TOKEN. Put it in .env or export it before running.", file=sys.stderr)
        return 2

    signal.signal(signal.SIGINT, handle_signal)
    signal.signal(signal.SIGTERM, handle_signal)
    run_bot(token, args.db)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
