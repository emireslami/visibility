const fs = require("fs");
const { execFileSync } = require("child_process");
const { Client } = require("pg");

function loadEnv(filePath = ".env") {
  if (!fs.existsSync(filePath)) return;
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [key, ...rest] = line.split("=");
    if (!process.env[key]) process.env[key] = rest.join("=").replace(/^['"]|['"]$/g, "");
  }
}

async function main() {
  loadEnv();
  const sqlitePath = process.argv[2] || "telegram_messages.sqlite3";
  if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL in .env");
  if (!fs.existsSync(sqlitePath)) throw new Error(`SQLite file not found: ${sqlitePath}`);

  const json = execFileSync("sqlite3", [
    "-json",
    sqlitePath,
    `select update_id, message_id, chat_id, chat_title, chat_username, chat_type,
            null as message_thread_id, null as is_topic_message, null as topic_name,
            null as topic_icon_color, null as topic_icon_custom_emoji_id,
            sender_id, sender_username, sender_first_name, sender_last_name, sender_is_bot,
            sender_chat_id, sender_chat_title, body, caption, message_type,
            sent_at_utc, sent_date, sent_time, edited_at_utc, reply_to_message_id,
            forward_origin_json, entities_json, media_file_id, media_group_id, raw_payload_json
     from telegram_messages
     order by id`,
  ], { encoding: "utf8" });
  const rows = JSON.parse(json || "[]");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  let inserted = 0;
  for (const row of rows) {
    const result = await client.query(
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
        row.update_id, row.message_id, row.chat_id, row.chat_title, row.chat_username, row.chat_type,
        row.message_thread_id, row.is_topic_message, row.topic_name, row.topic_icon_color, row.topic_icon_custom_emoji_id,
        row.sender_id, row.sender_username, row.sender_first_name, row.sender_last_name,
        row.sender_is_bot === null ? null : Boolean(row.sender_is_bot),
        row.sender_chat_id, row.sender_chat_title, row.body, row.caption, row.message_type,
        row.sent_at_utc, row.sent_date, row.sent_time, row.edited_at_utc, row.reply_to_message_id,
        row.forward_origin_json, row.entities_json, row.media_file_id, row.media_group_id, row.raw_payload_json,
      ]
    );
    inserted += result.rowCount;
  }
  const count = await client.query("select count(*)::int as count from public.telegram_messages");
  await client.end();
  console.log(`Imported ${inserted}/${rows.length} rows. Supabase rows=${count.rows[0].count}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
