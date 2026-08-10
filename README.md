# Telegram dashboard bot

This bot collects messages from Telegram groups and stores them in SQLite.

## 1. Create the bot

1. Open Telegram and message `@BotFather`.
2. Send `/newbot`.
3. Choose a name and username.
4. Copy the token into `.env`:

```sh
cp .env.example .env
```

Then edit `.env`:

```sh
TELEGRAM_BOT_TOKEN=your_real_token
```

## 2. Make the bot able to read group messages

In `@BotFather`:

1. Send `/setprivacy`.
2. Select your bot.
3. Choose `Disable`.

Then add the bot to each work group. Admin access is recommended.

## 3. Run

```sh
python3 bot.py
```

Messages are stored in:

```sh
telegram_messages.sqlite3
```

## 4. Inspect collected messages

```sh
sqlite3 telegram_messages.sqlite3 \
  "select chat_id, chat_title, sender_username, sender_id, body, sent_date, sent_time from telegram_messages order by id desc limit 20;"
```
