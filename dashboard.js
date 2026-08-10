const fs = require("fs");
const http = require("http");
const { URL } = require("url");
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

async function query(sql, params = []) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    await client.end();
  }
}

function sendJson(res, value) {
  const body = JSON.stringify(value);
  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

function sendHtml(res) {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(`<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Telegram Visibility</title>
  <style>
    :root { color-scheme: light; --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); background: var(--bg); }
    header { padding: 18px 24px; background: var(--panel); border-bottom: 1px solid var(--line); display:flex; gap:16px; align-items:center; justify-content:space-between; }
    h1 { margin: 0; font-size: 20px; }
    main { padding: 18px 24px; }
    .filters { display:grid; grid-template-columns: 1fr 170px 170px 170px 170px 110px; gap:10px; margin-bottom:14px; }
    input, button { height: 38px; border: 1px solid var(--line); border-radius: 6px; padding: 0 10px; font: inherit; background: #fff; }
    button { background: var(--accent); color: #fff; border-color: var(--accent); cursor:pointer; }
    table { width: 100%; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); direction:ltr; }
    th, td { padding: 10px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font-size: 13px; }
    th { background: #eef3f4; color: #24343b; position: sticky; top: 0; }
    td.body { min-width: 260px; max-width: 360px; direction:rtl; text-align:right; }
    .clip { display:block; max-width: 320px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .more { height: 28px; margin-top: 6px; padding: 0 9px; font-size: 12px; }
    td.json { min-width: 320px; max-width: 560px; white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; }
    .meta { color: var(--muted); font-size: 12px; }
    .modal-backdrop { position:fixed; inset:0; display:none; align-items:center; justify-content:center; padding:20px; background:rgba(23,32,38,.42); z-index:20; }
    .modal-backdrop.open { display:flex; }
    .modal { width:min(760px, 100%); max-height:min(78vh, 720px); display:flex; flex-direction:column; background:#fff; border:1px solid var(--line); border-radius:8px; box-shadow:0 20px 70px rgba(23,32,38,.24); direction:rtl; }
    .modal-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; border-bottom:1px solid var(--line); }
    .modal-head h2 { margin:0; font-size:16px; }
    .modal-close { width:34px; height:34px; padding:0; font-size:20px; line-height:1; }
    .modal-body { padding:16px; overflow:auto; white-space:pre-wrap; line-height:1.8; text-align:right; }
    @media (max-width: 900px) { .filters { grid-template-columns: 1fr; } main, header { padding: 14px; } table { display:block; overflow:auto; } }
  </style>
</head>
<body>
  <header>
    <h1>Telegram Visibility</h1>
    <div class="meta" id="status">در حال دریافت...</div>
  </header>
  <main>
    <section class="filters">
      <input id="search" placeholder="جست‌وجو در متن پیام، گروه، یوزرنیم..." />
      <input id="group" placeholder="Group Name" />
      <input id="topic" placeholder="Topic Name" />
      <input id="chat" placeholder="Chat ID" />
      <input id="sender" placeholder="Sender ID" />
      <button id="refresh">به‌روزرسانی</button>
    </section>
    <table>
      <thead>
        <tr>
          <th>Update ID</th>
          <th>Message ID</th>
          <th>Group ID</th>
          <th>Group Name</th>
          <th>Group Username</th>
          <th>Group Type</th>
          <th>Topic</th>
          <th>Topic ID</th>
          <th>Is Topic</th>
          <th>Username</th>
          <th>Sender ID</th>
          <th>Sender First Name</th>
          <th>Sender Last Name</th>
          <th>Sender Is Bot</th>
          <th>Sender Chat ID</th>
          <th>Sender Chat Title</th>
          <th>Message</th>
          <th>Caption</th>
          <th>Date (Tehran)</th>
          <th>Time (Tehran)</th>
          <th>Type</th>
          <th>Edited At</th>
          <th>Reply To Message ID</th>
          <th>Media File ID</th>
          <th>Media Group ID</th>
          <th>Forward Origin</th>
          <th>Entities</th>
          <th>Raw Telegram Payload</th>
        </tr>
      </thead>
      <tbody id="rows"></tbody>
    </table>
  </main>
  <div class="modal-backdrop" id="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal">
      <div class="modal-head">
        <h2 id="modalTitle">متن کامل پیام</h2>
        <button class="modal-close" id="modalClose" type="button" aria-label="بستن">×</button>
      </div>
      <div class="modal-body" id="modalBody"></div>
    </div>
  </div>
  <script>
    const rowsEl = document.getElementById("rows");
    const statusEl = document.getElementById("status");
    const searchEl = document.getElementById("search");
    const groupEl = document.getElementById("group");
    const topicEl = document.getElementById("topic");
    const chatEl = document.getElementById("chat");
    const senderEl = document.getElementById("sender");
    const refreshEl = document.getElementById("refresh");
    const modalBackdropEl = document.getElementById("modalBackdrop");
    const modalBodyEl = document.getElementById("modalBody");
    const modalCloseEl = document.getElementById("modalClose");
    const fullTextByKey = new Map();
    function esc(value) {
      return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    function jsonText(value) {
      if (value == null) return "";
      if (typeof value === "string") {
        try { return JSON.stringify(JSON.parse(value), null, 2); } catch { return value; }
      }
      return JSON.stringify(value, null, 2);
    }
    function shouldCollapse(value) {
      return String(value ?? "").length > 90 || String(value ?? "").includes("\\n");
    }
    function shortText(value) {
      const normalized = String(value ?? "").replace(/\\s+/g, " ").trim();
      return normalized.length > 90 ? normalized.slice(0, 90) + "..." : normalized;
    }
    function textCell(value, key) {
      const text = String(value ?? "");
      if (!text) return "";
      fullTextByKey.set(key, text);
      const button = shouldCollapse(text) ? \`<button class="more" type="button" data-full-key="\${esc(key)}">مشاهده بیشتر</button>\` : "";
      return \`<span class="clip">\${esc(shortText(text))}</span>\${button}\`;
    }
    function openModal(text) {
      modalBodyEl.textContent = text;
      modalBackdropEl.classList.add("open");
    }
    function closeModal() {
      modalBackdropEl.classList.remove("open");
      modalBodyEl.textContent = "";
    }
    async function load() {
      const params = new URLSearchParams();
      if (searchEl.value.trim()) params.set("q", searchEl.value.trim());
      if (groupEl.value.trim()) params.set("group", groupEl.value.trim());
      if (topicEl.value.trim()) params.set("topic", topicEl.value.trim());
      if (chatEl.value.trim()) params.set("chat_id", chatEl.value.trim());
      if (senderEl.value.trim()) params.set("sender_id", senderEl.value.trim());
      const res = await fetch("/api/messages?" + params);
      const data = await res.json();
      fullTextByKey.clear();
      rowsEl.innerHTML = data.messages.map((row, index) => \`
        <tr>
          <td>\${esc(row.update_id)}</td>
          <td>\${esc(row.message_id)}</td>
          <td>\${esc(row.chat_id)}</td>
          <td>\${esc(row.chat_title)}</td>
          <td>\${esc(row.chat_username)}</td>
          <td>\${esc(row.chat_type)}</td>
          <td>\${esc(row.topic_name || (row.message_thread_id ? "#" + row.message_thread_id : ""))}</td>
          <td>\${esc(row.message_thread_id)}</td>
          <td>\${esc(row.is_topic_message)}</td>
          <td>\${esc(row.sender_username)}</td>
          <td>\${esc(row.sender_id)}</td>
          <td>\${esc(row.sender_first_name)}</td>
          <td>\${esc(row.sender_last_name)}</td>
          <td>\${esc(row.sender_is_bot)}</td>
          <td>\${esc(row.sender_chat_id)}</td>
          <td>\${esc(row.sender_chat_title)}</td>
          <td class="body">\${textCell(row.body || row.caption || "[" + row.message_type + "]", "message-" + index)}</td>
          <td class="body">\${textCell(row.caption, "caption-" + index)}</td>
          <td>\${esc(row.sent_date)}</td>
          <td>\${esc(row.sent_time)}</td>
          <td>\${esc(row.message_type)}</td>
          <td>\${esc(row.edited_at_utc)}</td>
          <td>\${esc(row.reply_to_message_id)}</td>
          <td>\${esc(row.media_file_id)}</td>
          <td>\${esc(row.media_group_id)}</td>
          <td class="json">\${esc(jsonText(row.forward_origin_json))}</td>
          <td class="json">\${esc(jsonText(row.entities_json))}</td>
          <td class="json">\${esc(jsonText(row.raw_payload_json))}</td>
        </tr>\`).join("");
      statusEl.textContent = data.messages.length + " پیام";
    }
    rowsEl.addEventListener("click", event => {
      const button = event.target.closest("[data-full-key]");
      if (!button) return;
      openModal(fullTextByKey.get(button.dataset.fullKey) || "");
    });
    modalCloseEl.addEventListener("click", closeModal);
    modalBackdropEl.addEventListener("click", event => { if (event.target === modalBackdropEl) closeModal(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
    refreshEl.addEventListener("click", load);
    [searchEl, groupEl, topicEl, chatEl, senderEl].forEach(el => el.addEventListener("keydown", e => { if (e.key === "Enter") load(); }));
    load();
    setInterval(load, 5000);
  </script>
</body>
</html>`);
}

async function handle(req, res) {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/") return sendHtml(res);
  if (url.pathname === "/api/messages") {
    const clauses = [];
    const params = [];
    const q = url.searchParams.get("q");
    const group = url.searchParams.get("group");
    const topic = url.searchParams.get("topic");
    const chatId = url.searchParams.get("chat_id");
    const senderId = url.searchParams.get("sender_id");
    if (q) {
      params.push(`%${q}%`);
      clauses.push(`(m.body ilike $${params.length} or m.caption ilike $${params.length} or m.chat_title ilike $${params.length} or coalesce(m.topic_name, t.topic_name) ilike $${params.length} or m.sender_username ilike $${params.length})`);
    }
    if (group) {
      params.push(`%${group}%`);
      clauses.push(`m.chat_title ilike $${params.length}`);
    }
    if (topic) {
      params.push(`%${topic}%`);
      clauses.push(`coalesce(m.topic_name, t.topic_name) ilike $${params.length}`);
    }
    if (chatId) {
      params.push(chatId);
      clauses.push(`m.chat_id = $${params.length}`);
    }
    if (senderId) {
      params.push(senderId);
      clauses.push(`m.sender_id = $${params.length}`);
    }
    const where = clauses.length ? `where ${clauses.join(" and ")}` : "";
    const messages = await query(`
      select m.update_id, m.message_id, m.chat_id, m.chat_title, m.chat_username, m.chat_type,
             m.message_thread_id, m.is_topic_message, coalesce(m.topic_name, t.topic_name) as topic_name,
             m.sender_username, m.sender_id, m.sender_first_name, m.sender_last_name, m.sender_is_bot,
             m.sender_chat_id, m.sender_chat_title,
             m.body, m.caption, m.message_type, m.edited_at_utc, m.reply_to_message_id,
             m.media_file_id, m.media_group_id, m.forward_origin_json, m.entities_json, m.raw_payload_json,
             to_char(m.sent_at_utc at time zone 'Asia/Tehran', 'YYYY-MM-DD') as sent_date,
             to_char(m.sent_at_utc at time zone 'Asia/Tehran', 'HH24:MI:SS') as sent_time
      from public.telegram_messages m
      left join public.telegram_topics t
        on t.chat_id = m.chat_id and t.message_thread_id = m.message_thread_id
      ${where}
      order by m.sent_at_utc desc nulls last, m.id desc
      limit 500
    `, params);
    return sendJson(res, { messages });
  }
  res.writeHead(404);
  res.end("Not found");
}

loadEnv();
if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env");
  process.exit(1);
}

const port = Number(process.env.PORT || 3000);
http.createServer((req, res) => {
  handle(req, res).catch((error) => {
    console.error(error);
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  });
}).listen(port, () => {
  console.log(`Dashboard running at http://127.0.0.1:${port}`);
});
