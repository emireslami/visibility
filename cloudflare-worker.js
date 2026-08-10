const HTML = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Visibility</title>
  <style>
    :root { color-scheme: light; --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); background: var(--bg); }
    header { padding: 18px 24px; background: var(--panel); border-bottom: 1px solid var(--line); display:flex; gap:16px; align-items:center; justify-content:space-between; }
    h1 { margin: 0; font-size: 20px; }
    main { padding: 18px 24px; }
    .filters { display:grid; grid-template-columns: 1fr 170px 170px 110px; gap:10px; margin-bottom:14px; }
    input, button { height: 38px; border: 1px solid var(--line); border-radius: 6px; padding: 0 10px; font: inherit; background: #fff; }
    button { background: var(--accent); color: #fff; border-color: var(--accent); cursor:pointer; }
    table { width: 100%; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); direction:ltr; }
    th, td { padding: 10px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font-size: 13px; }
    th { background: #eef3f4; color: #24343b; position: sticky; top: 0; }
    td.body { max-width: 420px; white-space: pre-wrap; direction:rtl; text-align:right; }
    .meta { color: var(--muted); font-size: 12px; }
    @media (max-width: 900px) { .filters { grid-template-columns: 1fr; } main, header { padding: 14px; } table { display:block; overflow:auto; } }
  </style>
</head>
<body>
  <header>
    <h1>Visibility</h1>
    <div class="meta" id="status">در حال دریافت...</div>
  </header>
  <main>
    <section class="filters">
      <input id="search" placeholder="جست‌وجو در متن پیام، گروه، یوزرنیم..." />
      <input id="chat" placeholder="Chat ID" />
      <input id="sender" placeholder="Sender ID" />
      <button id="refresh">به‌روزرسانی</button>
    </section>
    <table>
      <thead>
        <tr>
          <th>Group ID</th>
          <th>Group Name</th>
          <th>Username</th>
          <th>Sender ID</th>
          <th>Message</th>
          <th>Date</th>
          <th>Time</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody id="rows"></tbody>
    </table>
  </main>
  <script>
    const rowsEl = document.getElementById("rows");
    const statusEl = document.getElementById("status");
    const searchEl = document.getElementById("search");
    const chatEl = document.getElementById("chat");
    const senderEl = document.getElementById("sender");
    const refreshEl = document.getElementById("refresh");
    function esc(value) {
      return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    async function load() {
      const params = new URLSearchParams();
      if (searchEl.value.trim()) params.set("q", searchEl.value.trim());
      if (chatEl.value.trim()) params.set("chat_id", chatEl.value.trim());
      if (senderEl.value.trim()) params.set("sender_id", senderEl.value.trim());
      const res = await fetch("/api/messages?" + params);
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.messages)) {
        rowsEl.innerHTML = "";
        statusEl.textContent = data.detail || data.error || "خطا در دریافت داده";
        return;
      }
      rowsEl.innerHTML = data.messages.map(row => \`
        <tr>
          <td>\${esc(row.chat_id)}</td>
          <td>\${esc(row.chat_title)}</td>
          <td>\${esc(row.sender_username)}</td>
          <td>\${esc(row.sender_id)}</td>
          <td class="body">\${esc(row.body || row.caption || "[" + row.message_type + "]")}</td>
          <td>\${esc(row.sent_date)}</td>
          <td>\${esc(row.sent_time)}</td>
          <td>\${esc(row.message_type)}</td>
        </tr>\`).join("");
      statusEl.textContent = data.messages.length + " پیام";
    }
    refreshEl.addEventListener("click", load);
    [searchEl, chatEl, senderEl].forEach(el => el.addEventListener("keydown", e => { if (e.key === "Enter") load(); }));
    load();
    setInterval(load, 5000);
  </script>
</body>
</html>`;

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function text(value, status = 200, contentType = "text/plain; charset=utf-8") {
  return new Response(value, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
  });
}

async function fetchMessages(request, env) {
  const url = new URL(request.url);
  const params = new URLSearchParams();
  params.set("select", "update_id,message_id,chat_id,chat_title,sender_username,sender_id,body,caption,message_type,sent_at_utc");
  params.set("order", "sent_at_utc.desc.nullslast,id.desc");
  params.set("limit", "500");

  const filters = [];
  const q = url.searchParams.get("q");
  const chatId = url.searchParams.get("chat_id");
  const senderId = url.searchParams.get("sender_id");
  if (q) {
    const pattern = `*${q.replace(/[%*]/g, "")}*`;
    filters.push(`body.ilike.${pattern},caption.ilike.${pattern},chat_title.ilike.${pattern},sender_username.ilike.${pattern}`);
  }
  if (filters.length) params.set("or", `(${filters.join(",")})`);
  if (chatId) params.set("chat_id", `eq.${chatId}`);
  if (senderId) params.set("sender_id", `eq.${senderId}`);

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!response.ok) {
    return json({ error: "Supabase request failed", detail: await response.text() }, 500);
  }
  const rows = await response.json();
  const messages = rows.map((row) => {
    const date = row.sent_at_utc ? new Date(row.sent_at_utc) : null;
    return {
      ...row,
      sent_date: date ? new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran" }).format(date) : null,
      sent_time: date ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tehran", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(date) : null,
    };
  });
  return json({ messages });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") return text(HTML, 200, "text/html; charset=utf-8");
    if (url.pathname === "/api/messages") return fetchMessages(request, env);
    return text("Not found", 404);
  },
};
