# Telegram dashboard bot

This bot collects messages from Telegram groups and stores them in Supabase Postgres.

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
DATABASE_URL=postgresql://postgres.dniaincbngeeqnjzvfjs:your_db_password@aws-0-ca-central-1.pooler.supabase.com:6543/postgres
```

## 2. Make the bot able to read group messages

In `@BotFather`:

1. Send `/setprivacy`.
2. Select your bot.
3. Choose `Disable`.

Then add the bot to each work group. Admin access is recommended.

## 3. Run

```sh
node migrate.js
node collector.js
```

## 4. Run dashboard

```sh
node dashboard.js
```

Open `http://127.0.0.1:3000`.
