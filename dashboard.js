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

function jalaliDate(value) {
  if (!value) return null;
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(value));
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function rowContent(row) {
  return row.body || row.caption || (row.message_type ? `[${row.message_type}]` : "");
}

function withEditHistory(messages, historyRows = messages) {
  const byMessage = new Map();
  for (const row of historyRows) {
    if (!row.chat_id || !row.message_id) continue;
    const key = `${row.chat_id}:${row.message_id}`;
    const list = byMessage.get(key) || [];
    list.push(row);
    byMessage.set(key, list);
  }
  for (const list of byMessage.values()) {
    list.sort((a, b) => {
      const aEdited = a.edited_at_utc ? Date.parse(a.edited_at_utc) : 0;
      const bEdited = b.edited_at_utc ? Date.parse(b.edited_at_utc) : 0;
      if (aEdited !== bEdited) return aEdited - bEdited;
      return Number(a.update_id || 0) - Number(b.update_id || 0);
    });
    const original = list.find((row) => !row.edited_at_utc) || list[0];
    const latestEdited = [...list].reverse().find((row) => row.edited_at_utc) || null;
    for (const row of messages.filter((message) => `${message.chat_id}:${message.message_id}` === `${original.chat_id}:${original.message_id}`)) {
      row.original_message_content = rowContent(original);
      row.latest_edited_message_content = latestEdited ? rowContent(latestEdited) : null;
    }
  }
  return messages;
}

function sendJson(res, value) {
  const body = JSON.stringify(value);
  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

function sendText(res, status, value, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "content-type": contentType,
    "cache-control": "no-store",
  });
  res.end(value);
}

async function sendTelegramProfilePhoto(res, fileId) {
  if (!process.env.TELEGRAM_BOT_TOKEN) return sendText(res, 503, "Telegram token is not configured");
  if (!fileId) return sendText(res, 400, "Missing file_id");
  const fileResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${encodeURIComponent(fileId)}`);
  if (!fileResponse.ok) return sendText(res, 502, "Profile photo lookup failed");
  const fileData = await fileResponse.json();
  const filePath = fileData?.result?.file_path;
  if (!filePath) return sendText(res, 404, "Profile photo not found");
  const imageResponse = await fetch(`https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`);
  if (!imageResponse.ok) return sendText(res, 502, "Profile photo fetch failed");
  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  res.writeHead(200, {
    "content-type": imageResponse.headers.get("content-type") || "image/jpeg",
    "cache-control": "private, max-age=86400",
  });
  res.end(buffer);
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
    .brand { display:flex; gap:14px; align-items:center; }
    h1 { margin: 0; font-size: 20px; }
    nav { display:flex; gap:8px; direction:ltr; }
    .nav-button { height:32px; padding:0 12px; background:#fff; color:var(--ink); border-color:var(--line); }
    .nav-button.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    main { padding: 18px 24px; }
    .page[hidden] { display:none; }
    .filters { display:grid; grid-template-columns: 1fr 170px 170px 170px 170px 110px; gap:10px; margin-bottom:14px; }
    input, button { height: 38px; border: 1px solid var(--line); border-radius: 6px; padding: 0 10px; font: inherit; background: #fff; }
    button { background: var(--accent); color: #fff; border-color: var(--accent); cursor:pointer; }
    table { width: 100%; table-layout: fixed; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); direction:rtl; }
    th, td { padding: 6px; border-bottom: 1px solid var(--line); text-align: right; vertical-align: top; font-size: 12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    th { background: #eef3f4; color: #24343b; position: sticky; top: 0; }
    td.body { direction:rtl; text-align:right; }
    .full-cell { overflow:visible; text-overflow:clip; white-space:normal; overflow-wrap:anywhere; line-height:1.45; }
    .message-cell .clip { max-width:100%; }
    .clip { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .badge { display:inline-flex; align-items:center; height:22px; margin-top:6px; padding:0 8px; border-radius:999px; background:#fff4d6; color:#7a4a00; border:1px solid #f1cf75; font-size:11px; font-weight:700; direction:ltr; }
    .more { height: 28px; margin-top: 6px; padding: 0 9px; font-size: 12px; }
    .details-button { height: 28px; padding: 0 8px; font-size: 12px; }
    .thread-list { display:grid; gap:14px; max-width:980px; margin:0 auto; direction:rtl; }
    .thread-card { background:var(--panel); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
    .thread-root, .thread-reply, .thread-missing { padding:14px 16px; }
    .thread-replies { border-top:1px solid var(--line); }
    .thread-reply { position:relative; margin-right:28px; border-right:2px solid var(--line); }
    .thread-reply + .thread-reply { border-top:1px solid var(--line); }
    .thread-missing { color:var(--muted); background:#fbfcfd; }
    .thread-item { display:grid; grid-template-columns:42px minmax(0, 1fr); gap:10px; align-items:start; }
    .thread-content { min-width:0; }
    .thread-avatar { width:34px; height:34px; border-radius:50%; border:1px solid var(--line); background:#eef3f4; color:#36505a; display:grid; place-items:center; font-weight:800; font-size:13px; direction:ltr; object-fit:cover; }
    .thread-head { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:8px; }
    .thread-author { font-weight:700; color:var(--ink); }
    .thread-muted { color:var(--muted); font-size:12px; }
    .thread-pill { display:inline-flex; align-items:center; height:24px; padding:0 8px; border:1px solid var(--line); border-radius:999px; background:#f7f8fa; color:#24343b; font-size:12px; direction:ltr; }
    .thread-message { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.7; text-align:right; }
    td.json { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; }
    td.json .clip { direction:ltr; text-align:left; }
    .meta { color: var(--muted); font-size: 12px; }
    .modal-backdrop { position:fixed; inset:0; display:none; align-items:center; justify-content:center; padding:20px; background:rgba(23,32,38,.42); z-index:20; }
    .modal-backdrop.open { display:flex; }
    .modal { width:min(900px, 100%); max-height:min(82vh, 760px); display:flex; flex-direction:column; background:#fff; border:1px solid var(--line); border-radius:8px; box-shadow:0 20px 70px rgba(23,32,38,.24); direction:rtl; }
    .modal-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; border-bottom:1px solid var(--line); }
    .modal-head h2 { margin:0; font-size:16px; }
    .modal-close { width:34px; height:34px; padding:0; font-size:20px; line-height:1; }
    .modal-body { padding:16px; overflow:auto; white-space:pre-wrap; line-height:1.8; text-align:right; }
    .details-grid { display:grid; gap:10px; white-space:normal; }
    .detail-row { display:grid; grid-template-columns: 190px minmax(0, 1fr); gap:10px; padding:10px; border:1px solid var(--line); border-radius:6px; direction:ltr; text-align:left; }
    .detail-label { color:var(--muted); font-size:12px; font-weight:700; }
    .detail-value { min-width:0; overflow-wrap:anywhere; white-space:pre-wrap; }
    .detail-pre { direction:ltr; text-align:left; font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:12px; line-height:1.55; }
    @media (max-width: 900px) { .filters { grid-template-columns: 1fr; } main, header { padding: 14px; } th, td { padding:6px; font-size:11px; } .detail-row { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <h1>Telegram Visibility</h1>
      <nav aria-label="Dashboard pages">
        <button class="nav-button active" id="messagesNav" type="button">Messages</button>
        <button class="nav-button" id="groupsNav" type="button">Groups</button>
        <button class="nav-button" id="threadsNav" type="button">Threads</button>
      </nav>
    </div>
    <div class="meta" id="status">در حال دریافت...</div>
  </header>
  <main>
    <section class="page" id="messagesPage">
      <section class="filters">
        <input id="search" placeholder="جست‌وجو در متن پیام، گروه، یوزرنیم..." />
        <input id="group" placeholder="Group Name" />
        <input id="topic" placeholder="Topic Name" />
        <input id="chat" placeholder="Chat ID" />
        <input id="sender" placeholder="Sender ID" />
        <button id="refresh">به‌روزرسانی</button>
      </section>
      <table class="messages-table">
        <colgroup>
          <col style="width:12%" />
          <col style="width:8%" />
          <col style="width:8%" />
          <col style="width:8%" />
          <col style="width:38%" />
          <col style="width:8%" />
          <col style="width:7%" />
          <col style="width:6%" />
          <col style="width:5%" />
        </colgroup>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Sender First Name</th>
            <th>Sender Last Name</th>
            <th>Username</th>
            <th>Message</th>
            <th>Date (Jalali)</th>
            <th>Time (Tehran)</th>
            <th>Message ID</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody id="rows"></tbody>
      </table>
    </section>
    <section class="page" id="groupsPage" hidden>
      <table>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Group Name</th>
            <th>Group Username</th>
            <th>Group Type</th>
            <th>Messages</th>
            <th>Joined Date (Tehran)</th>
            <th>Joined Time (Tehran)</th>
            <th>Last Seen Date (Tehran)</th>
            <th>Last Seen Time (Tehran)</th>
            <th>Last Message Date (Tehran)</th>
            <th>Last Message Time (Tehran)</th>
          </tr>
        </thead>
        <tbody id="groupRows"></tbody>
      </table>
    </section>
    <section class="page" id="threadsPage" hidden>
      <div class="thread-list" id="threadRows"></div>
    </section>
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
    const groupRowsEl = document.getElementById("groupRows");
    const threadRowsEl = document.getElementById("threadRows");
    const statusEl = document.getElementById("status");
    const messagesNavEl = document.getElementById("messagesNav");
    const groupsNavEl = document.getElementById("groupsNav");
    const threadsNavEl = document.getElementById("threadsNav");
    const messagesPageEl = document.getElementById("messagesPage");
    const groupsPageEl = document.getElementById("groupsPage");
    const threadsPageEl = document.getElementById("threadsPage");
    const searchEl = document.getElementById("search");
    const groupEl = document.getElementById("group");
    const topicEl = document.getElementById("topic");
    const chatEl = document.getElementById("chat");
    const senderEl = document.getElementById("sender");
    const refreshEl = document.getElementById("refresh");
    const modalBackdropEl = document.getElementById("modalBackdrop");
    const modalTitleEl = document.getElementById("modalTitle");
    const modalBodyEl = document.getElementById("modalBody");
    const modalCloseEl = document.getElementById("modalClose");
    const fullTextByKey = new Map();
    const detailByKey = new Map();
    let currentPage = "messages";
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
    function shouldCollapse(value, limit = 90) {
      return String(value ?? "").length > limit || String(value ?? "").includes("\\n");
    }
    function shortText(value, limit = 90) {
      const normalized = String(value ?? "").replace(/\\s+/g, " ").trim();
      return normalized.length > limit ? normalized.slice(0, limit) + "..." : normalized;
    }
    function textCell(value, key, limit = 90) {
      const text = String(value ?? "");
      if (!text) return "";
      fullTextByKey.set(key, text);
      const button = shouldCollapse(text, limit) ? \`<button class="more" type="button" data-full-key="\${esc(key)}">مشاهده بیشتر</button>\` : "";
      return \`<span class="clip">\${esc(shortText(text, limit))}</span>\${button}\`;
    }
    function detailValue(value) {
      const text = typeof value === "object" && value !== null ? jsonText(value) : String(value ?? "");
      return \`<span class="\${text.includes("{") || text.includes("[") ? "detail-value detail-pre" : "detail-value"}">\${esc(text)}</span>\`;
    }
    function detailRow(label, value) {
      return \`<div class="detail-row"><div class="detail-label">\${esc(label)}</div>\${detailValue(value)}</div>\`;
    }
    function detailHtml(row) {
      const details = [
        ["Update ID", row.update_id],
        ["Message ID", row.message_id],
        ["Group ID", row.chat_id],
        ["Group Name", row.chat_title],
        ["Group Username", row.chat_username],
        ["Group Type", row.chat_type],
        ["Topic", row.topic_name || (row.message_thread_id ? "#" + row.message_thread_id : "")],
        ["Topic ID", row.message_thread_id],
        ["Is Topic", row.is_topic_message],
        ["Username", row.sender_username],
        ["Sender ID", row.sender_id],
        ["Sender First Name", row.sender_first_name],
        ["Sender Last Name", row.sender_last_name],
        ["Sender Is Bot", row.sender_is_bot],
        ["Sender Photo File ID", row.sender_photo_file_id],
        ["Sender Photo File Unique ID", row.sender_photo_file_unique_id],
        ["Sender Chat ID", row.sender_chat_id],
        ["Sender Chat Title", row.sender_chat_title],
        ["Message", row.body],
        ["Caption", row.caption],
        ...(row.edited_at_utc ? [
          ["Original Message Content", row.original_message_content],
          ["Latest Edited Message Content", row.latest_edited_message_content],
        ] : []),
        ["Date (Tehran)", row.sent_date],
        ["Date (Jalali)", row.sent_jalali_date],
        ["Time (Tehran)", row.sent_time],
        ["Type", row.message_type],
        ["Edited At", row.edited_at_utc],
        ["Reply To Message ID", row.reply_to_message_id],
        ["Media File ID", row.media_file_id],
        ["Media Group ID", row.media_group_id],
        ["Forward Origin", row.forward_origin_json],
        ["Entities", row.entities_json],
        ["Raw Telegram Payload", row.raw_payload_json],
      ];
      return \`<div class="details-grid">\${details.map(([label, value]) => detailRow(label, value)).join("")}</div>\`;
    }
    function messageContent(row) {
      return row.body || row.caption || (row.message_type ? "[" + row.message_type + "]" : "");
    }
    function compactMessage(row) {
      const text = messageContent(row);
      return text ? esc(text) : '<span class="thread-muted">بدون متن</span>';
    }
    function initials(row) {
      const source = [row.sender_first_name, row.sender_last_name].filter(Boolean).join(" ") || row.sender_username || "?";
      return source.trim().slice(0, 1).toUpperCase() || "?";
    }
    function avatar(row) {
      if (row.sender_photo_file_id) {
        return \`<img class="thread-avatar" src="/api/profile-photo?file_id=\${encodeURIComponent(row.sender_photo_file_id)}" alt="" loading="lazy" />\`;
      }
      return \`<span class="thread-avatar">\${esc(initials(row))}</span>\`;
    }
    function threadNode(row, kind, index) {
      if (row.missing) {
        return \`<article class="thread-missing">
          <div class="thread-head">
            <span class="thread-pill">Message ID: \${esc(row.message_id)}</span>
            <span class="thread-muted">پیام اصلی در محدوده فعلی داده‌ها نیست</span>
          </div>
        </article>\`;
      }
      const author = [row.sender_first_name, row.sender_last_name].filter(Boolean).join(" ") || row.sender_username || "Unknown";
      return \`<article class="\${kind}">
        <div class="thread-item">
          \${avatar(row)}
          <div class="thread-content">
            <div class="thread-head">
              <span class="thread-author">\${esc(author)}</span>
              <span class="thread-muted">\${esc(row.sender_username ? "@" + row.sender_username : "")}</span>
              <span class="thread-muted">\${esc(row.chat_title)}</span>
              <span class="thread-pill">Message ID: \${esc(row.message_id)}</span>
              \${row.reply_to_message_id ? \`<span class="thread-pill">Reply To: \${esc(row.reply_to_message_id)}</span>\` : ""}
              <span class="thread-muted">\${esc(row.sent_jalali_date || "")} \${esc(row.sent_time || "")}</span>
              \${row.edited_at_utc ? '<span class="badge">Edited</span>' : ''}
              <button class="details-button" type="button" data-detail-key="thread-detail-\${index}">Details</button>
            </div>
            <div class="thread-message">\${compactMessage(row)}</div>
          </div>
        </div>
      </article>\`;
    }
    function buildThreads(messages) {
      const latestByMessage = new Map();
      for (const row of messages) {
        if (!row.chat_id || !row.message_id) continue;
        const key = row.chat_id + ":" + row.message_id;
        const existing = latestByMessage.get(key);
        if (!existing || Date.parse(row.edited_at_utc || row.sent_at_utc || 0) > Date.parse(existing.edited_at_utc || existing.sent_at_utc || 0)) {
          latestByMessage.set(key, row);
        }
      }
      const repliesByParent = new Map();
      for (const row of latestByMessage.values()) {
        if (!row.reply_to_message_id || !row.chat_id) continue;
        const parentKey = row.chat_id + ":" + row.reply_to_message_id;
        const list = repliesByParent.get(parentKey) || [];
        list.push(row);
        repliesByParent.set(parentKey, list);
      }
      const rootKeys = new Set();
      for (const [key, row] of latestByMessage.entries()) {
        if (!row.reply_to_message_id || repliesByParent.has(key)) rootKeys.add(key);
      }
      for (const parentKey of repliesByParent.keys()) {
        if (!latestByMessage.has(parentKey)) rootKeys.add(parentKey);
      }
      return [...rootKeys].map((key) => {
        const root = latestByMessage.get(key) || { missing: true, chat_id: key.split(":")[0], message_id: key.split(":")[1] };
        const replies = (repliesByParent.get(key) || []).sort((a, b) => Number(a.message_id || 0) - Number(b.message_id || 0));
        return { root, replies };
      }).sort((a, b) => {
        const aTime = Date.parse(a.root.sent_at_utc || a.replies[0]?.sent_at_utc || 0);
        const bTime = Date.parse(b.root.sent_at_utc || b.replies[0]?.sent_at_utc || 0);
        return bTime - aTime;
      });
    }
    function openModal(text) {
      modalTitleEl.textContent = "متن کامل پیام";
      modalBodyEl.textContent = text;
      modalBackdropEl.classList.add("open");
    }
    function openDetails(html) {
      modalTitleEl.textContent = "جزئیات پیام";
      modalBodyEl.innerHTML = html;
      modalBackdropEl.classList.add("open");
    }
    function closeModal() {
      modalBackdropEl.classList.remove("open");
      modalBodyEl.textContent = "";
      modalBodyEl.innerHTML = "";
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
      detailByKey.clear();
      rowsEl.innerHTML = data.messages.map((row, index) => \`
        <tr>
          <td class="full-cell">\${esc(row.chat_title)}</td>
          <td class="full-cell">\${esc(row.sender_first_name)}</td>
          <td class="full-cell">\${esc(row.sender_last_name)}</td>
          <td class="full-cell">\${esc(row.sender_username)}</td>
          <td class="body message-cell">\${textCell(row.body || row.caption || "[" + row.message_type + "]", "message-" + index, 120)}\${row.edited_at_utc ? '<span class="badge">Edited</span>' : ''}</td>
          <td>\${esc(row.sent_jalali_date)}</td>
          <td class="full-cell">\${esc(row.sent_time)}</td>
          <td>\${esc(row.message_id)}</td>
          <td><button class="details-button" type="button" data-detail-key="detail-\${index}">Details</button></td>
        </tr>\`).join("");
      data.messages.forEach((row, index) => detailByKey.set("detail-" + index, detailHtml(row)));
      statusEl.textContent = data.messages.length + " پیام";
    }
    async function loadGroups() {
      const res = await fetch("/api/groups");
      const data = await res.json();
      groupRowsEl.innerHTML = data.groups.map(row => \`
        <tr>
          <td>\${esc(row.chat_id)}</td>
          <td>\${esc(row.chat_title)}</td>
          <td>\${esc(row.chat_username)}</td>
          <td>\${esc(row.chat_type)}</td>
          <td>\${esc(row.message_count)}</td>
          <td>\${esc(row.joined_date)}</td>
          <td>\${esc(row.joined_time)}</td>
          <td>\${esc(row.last_seen_date)}</td>
          <td>\${esc(row.last_seen_time)}</td>
          <td>\${esc(row.last_message_date)}</td>
          <td>\${esc(row.last_message_time)}</td>
        </tr>\`).join("");
      statusEl.textContent = data.groups.length + " گروه";
    }
    async function loadThreads() {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.messages)) {
        threadRowsEl.innerHTML = "";
        statusEl.textContent = data.detail || data.error || "خطا در دریافت تردها";
        return;
      }
      fullTextByKey.clear();
      detailByKey.clear();
      data.messages.forEach((row, index) => detailByKey.set("thread-detail-" + index, detailHtml(row)));
      const indexByRow = new Map(data.messages.map((row, index) => [row, index]));
      const threads = buildThreads(data.messages);
      threadRowsEl.innerHTML = threads.map((thread) => {
        const rootIndex = indexByRow.get(thread.root) ?? "missing-" + thread.root.message_id;
        return \`<section class="thread-card">
          \${threadNode(thread.root, "thread-root", rootIndex)}
          <div class="thread-replies">
            \${thread.replies.map((reply) => threadNode(reply, "thread-reply", indexByRow.get(reply))).join("")}
          </div>
        </section>\`;
      }).join("");
      statusEl.textContent = threads.length + " ترد";
    }
    function showPage(page) {
      currentPage = page;
      const isGroups = page === "groups";
      const isThreads = page === "threads";
      messagesPageEl.hidden = isGroups || isThreads;
      groupsPageEl.hidden = !isGroups;
      threadsPageEl.hidden = !isThreads;
      messagesNavEl.classList.toggle("active", !isGroups && !isThreads);
      groupsNavEl.classList.toggle("active", isGroups);
      threadsNavEl.classList.toggle("active", isThreads);
      if (isGroups) loadGroups();
      else if (isThreads) loadThreads();
      else load();
    }
    rowsEl.addEventListener("click", event => {
      const button = event.target.closest("[data-full-key]");
      if (button) {
        openModal(fullTextByKey.get(button.dataset.fullKey) || "");
        return;
      }
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "");
    });
    threadRowsEl.addEventListener("click", event => {
      const detailsButton = event.target.closest("[data-detail-key]");
      if (detailsButton) openDetails(detailByKey.get(detailsButton.dataset.detailKey) || "");
    });
    modalCloseEl.addEventListener("click", closeModal);
    modalBackdropEl.addEventListener("click", event => { if (event.target === modalBackdropEl) closeModal(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
    refreshEl.addEventListener("click", load);
    messagesNavEl.addEventListener("click", () => showPage("messages"));
    groupsNavEl.addEventListener("click", () => showPage("groups"));
    threadsNavEl.addEventListener("click", () => showPage("threads"));
    [searchEl, groupEl, topicEl, chatEl, senderEl].forEach(el => el.addEventListener("keydown", e => { if (e.key === "Enter") load(); }));
    load();
    setInterval(() => { if (currentPage === "groups") loadGroups(); else if (currentPage === "threads") loadThreads(); else load(); }, 5000);
  </script>
</body>
</html>`);
}

async function handle(req, res) {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api/profile-photo") return sendTelegramProfilePhoto(res, url.searchParams.get("file_id"));
  if (url.pathname === "/") return sendHtml(res);
  if (url.pathname === "/api/groups") {
    const groups = await query(`
      select
        c.chat_id,
        c.chat_title,
        c.chat_username,
        c.chat_type,
        count(m.id)::bigint as message_count,
        to_char(coalesce(c.joined_at_utc, c.first_seen_at_utc) at time zone 'Asia/Tehran', 'YYYY-MM-DD') as joined_date,
        to_char(coalesce(c.joined_at_utc, c.first_seen_at_utc) at time zone 'Asia/Tehran', 'HH24:MI:SS') as joined_time,
        to_char(c.last_seen_at_utc at time zone 'Asia/Tehran', 'YYYY-MM-DD') as last_seen_date,
        to_char(c.last_seen_at_utc at time zone 'Asia/Tehran', 'HH24:MI:SS') as last_seen_time,
        to_char(max(m.sent_at_utc) at time zone 'Asia/Tehran', 'YYYY-MM-DD') as last_message_date,
        to_char(max(m.sent_at_utc) at time zone 'Asia/Tehran', 'HH24:MI:SS') as last_message_time
      from public.telegram_chats c
      left join public.telegram_messages m on m.chat_id = c.chat_id
      group by c.chat_id, c.chat_title, c.chat_username, c.chat_type, c.joined_at_utc, c.first_seen_at_utc, c.last_seen_at_utc
      order by message_count desc, c.last_seen_at_utc desc
      limit 1000
    `);
    return sendJson(res, { groups });
  }
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
             m.sender_photo_file_id, m.sender_photo_file_unique_id,
             m.sender_chat_id, m.sender_chat_title,
             m.body, m.caption, m.message_type, m.edited_at_utc, m.reply_to_message_id,
             m.media_file_id, m.media_group_id, m.forward_origin_json, m.entities_json, m.raw_payload_json,
             m.sent_at_utc,
             to_char(m.sent_at_utc at time zone 'Asia/Tehran', 'YYYY-MM-DD') as sent_date,
             to_char(m.sent_at_utc at time zone 'Asia/Tehran', 'HH24:MI:SS') as sent_time
      from public.telegram_messages m
      left join public.telegram_topics t
        on t.chat_id = m.chat_id and t.message_thread_id = m.message_thread_id
      ${where}
      order by m.sent_at_utc desc nulls last, m.id desc
      limit 500
    `, params);
    const enrichedMessages = messages.map((row) => ({ ...row, sent_jalali_date: jalaliDate(row.sent_at_utc) }));
    const editedKeys = [...new Set(
      enrichedMessages
        .filter((row) => row.edited_at_utc && row.chat_id && row.message_id)
        .map((row) => `${row.chat_id}:${row.message_id}`)
    )];
    let historyRows = enrichedMessages;
    if (editedKeys.length) {
      const historyParams = [];
      const historyClauses = editedKeys.map((key) => {
        const [chatIdValue, messageIdValue] = key.split(":");
        historyParams.push(chatIdValue, messageIdValue);
        return `(chat_id = $${historyParams.length - 1} and message_id = $${historyParams.length})`;
      });
      historyRows = await query(`
        select update_id, message_id, chat_id, body, caption, message_type, edited_at_utc
        from public.telegram_messages
        where ${historyClauses.join(" or ")}
        order by edited_at_utc asc nulls first, update_id asc
        limit 10000
      `, historyParams);
    }
    return sendJson(res, { messages: withEditHistory(enrichedMessages, historyRows) });
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
