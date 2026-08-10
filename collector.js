const fs = require("fs");
const { Client } = require("pg");

const MESSAGE_KEYS = ["message", "edited_message", "channel_post", "edited_channel_post"];
const MEDIA_KEYS = ["photo", "video", "document", "voice", "audio", "video_note", "animation", "sticker", "location", "contact", "poll", "venue"];

let running = true;

function loadEnv(filePath = ".env") {
  if (!fs.existsSync(filePath)) return;
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [key, ...rest] = line.split("=");
    if (!process.env[key]) process.env[key] = rest.join("=").replace(/^['"]|['"]$/g, "");
  }
}

async function telegram(method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const data = await response.json();
  if (!data.ok) throw new Error(`Telegram ${method} failed: ${JSON.stringify(data)}`);
  return data.result;
}

async function withDb(fn) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

function findMessage(update) {
  for (const key of MESSAGE_KEYS) {
    if (update[key]) return [key, update[key]];
  }
  return [null, null];
}

function messageType(message) {
  if (message.text !== undefined) return "text";
  for (const key of MEDIA_KEYS) {
    if (message[key] !== undefined) return key;
  }
  for (const key of ["new_chat_members", "left_chat_member", "new_chat_title", "pinned_message"]) {
    if (message[key] !== undefined) return key;
  }
  return "unknown";
}

function topicData(message) {
  const created = message.forum_topic_created;
  const edited = message.forum_topic_edited;
  return {
    messageThreadId: message.message_thread_id || null,
    isTopicMessage: message.is_topic_message ?? null,
    topicName: created?.name || edited?.name || null,
    topicIconColor: created?.icon_color || null,
    topicIconCustomEmojiId: created?.icon_custom_emoji_id || edited?.icon_custom_emoji_id || null,
  };
}

async function saveTopic(client, message, update) {
  const chat = message.chat || {};
  const topic = topicData(message);
  if (!chat.id || !topic.messageThreadId || !topic.topicName) return;
  await client.query(
    `insert into public.telegram_topics (
      chat_id, message_thread_id, topic_name, icon_color, icon_custom_emoji_id, raw_payload_json, updated_at_utc
    ) values ($1, $2, $3, $4, $5, $6, now())
    on conflict(chat_id, message_thread_id) do update set
      topic_name = coalesce(excluded.topic_name, telegram_topics.topic_name),
      icon_color = coalesce(excluded.icon_color, telegram_topics.icon_color),
      icon_custom_emoji_id = coalesce(excluded.icon_custom_emoji_id, telegram_topics.icon_custom_emoji_id),
      raw_payload_json = excluded.raw_payload_json,
      updated_at_utc = now()`,
    [
      chat.id,
      topic.messageThreadId,
      topic.topicName,
      topic.topicIconColor,
      topic.topicIconCustomEmojiId,
      JSON.stringify(update),
    ]
  );
}

function mediaFileId(message) {
  if (message.photo?.length) return message.photo[message.photo.length - 1].file_id;
  for (const key of ["video", "document", "voice", "audio", "video_note", "animation", "sticker"]) {
    if (message[key]?.file_id) return message[key].file_id;
  }
  return null;
}

function isoFromUnix(value) {
  return value ? new Date(value * 1000).toISOString() : null;
}

async function getOffset(client) {
  await client.query(`
    create table if not exists public.bot_state (
      key text primary key,
      value text not null
    )
  `);
  const result = await client.query("select value from public.bot_state where key = 'offset'");
  return result.rows[0] ? Number(result.rows[0].value) : undefined;
}

async function setOffset(client, offset) {
  await client.query(
    "insert into public.bot_state(key, value) values('offset', $1) on conflict(key) do update set value = excluded.value",
    [String(offset)]
  );
}

async function saveUpdate(client, update) {
  const [updateKind, message] = findMessage(update);
  if (!message) return false;

  const chat = message.chat || {};
  const sender = message.from || {};
  const senderChat = message.sender_chat || {};
  const sentAt = isoFromUnix(message.date);
  const editedAt = isoFromUnix(message.edit_date);
  const body = message.text || null;
  const caption = message.caption || null;
  const type = messageType(message);
  const topic = topicData(message);

  await saveTopic(client, message, update);

  await client.query(
    `insert into public.telegram_messages (
      update_id, message_id, chat_id, chat_title, chat_username, chat_type,
      message_thread_id, is_topic_message, topic_name, topic_icon_color, topic_icon_custom_emoji_id,
      sender_id, sender_username, sender_first_name, sender_last_name, sender_is_bot,
      sender_chat_id, sender_chat_title, body, caption, message_type,
      sent_at_utc, sent_date, sent_time, edited_at_utc, reply_to_message_id,
      forward_origin_json, entities_json, media_file_id, media_group_id, raw_payload_json
    ) values (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11,
      $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21,
      $22, $23, $24, $25, $26,
      $27, $28, $29, $30, $31
    )
    on conflict(update_id, message_id) do nothing`,
    [
      update.update_id,
      message.message_id || null,
      chat.id || null,
      chat.title || null,
      chat.username || null,
      chat.type || null,
      topic.messageThreadId,
      topic.isTopicMessage,
      topic.topicName,
      topic.topicIconColor,
      topic.topicIconCustomEmojiId,
      sender.id || null,
      sender.username || null,
      sender.first_name || null,
      sender.last_name || null,
      sender.is_bot ?? null,
      senderChat.id || null,
      senderChat.title || null,
      body,
      caption,
      type,
      sentAt,
      sentAt ? sentAt.slice(0, 10) : null,
      sentAt ? sentAt.slice(11, 19) : null,
      editedAt,
      message.reply_to_message?.message_id || null,
      message.forward_origin ? JSON.stringify(message.forward_origin) : null,
      message.entities || message.caption_entities ? JSON.stringify(message.entities || message.caption_entities) : null,
      mediaFileId(message),
      message.media_group_id || null,
      JSON.stringify(update),
    ]
  );

  const label = body || caption || `[${type}]`;
  console.log(`saved ${updateKind} update=${update.update_id} chat=${chat.title || chat.id} sender=${sender.username || sender.id || senderChat.title} body=${JSON.stringify(label).slice(0, 140)}`);
  return true;
}

async function main() {
  loadEnv();
  if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN in .env");
  if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL in .env");

  const bot = await telegram("getMe");
  console.log(`Bot connected: @${bot.username} (${bot.first_name})`);

  await withDb(async (client) => {
    let offset = await getOffset(client);
    while (running) {
      const payload = { timeout: 50, limit: 100, allowed_updates: MESSAGE_KEYS };
      if (offset) payload.offset = offset;
      const updates = await telegram("getUpdates", payload);
      for (const update of updates) {
        await saveUpdate(client, update);
        offset = Number(update.update_id) + 1;
        await setOffset(client, offset);
      }
    }
  });
}

process.on("SIGINT", () => {
  running = false;
  console.log("\nStopping collector after current request...");
});
process.on("SIGTERM", () => {
  running = false;
  console.log("\nStopping collector after current request...");
});

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
