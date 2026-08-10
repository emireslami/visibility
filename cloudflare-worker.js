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
    table { width: 100%; table-layout: fixed; border-collapse: collapse; background: var(--panel); border: 1px solid var(--line); direction:ltr; }
    th, td { padding: 8px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; font-size: 12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    th { background: #eef3f4; color: #24343b; position: sticky; top: 0; }
    td.body { direction:rtl; text-align:right; }
    .clip { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .more { height: 28px; margin-top: 6px; padding: 0 9px; font-size: 12px; }
    .details-button { height: 30px; padding: 0 10px; font-size: 12px; }
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
      <h1>Visibility</h1>
      <nav aria-label="Dashboard pages">
        <button class="nav-button active" id="messagesNav" type="button">Messages</button>
        <button class="nav-button" id="groupsNav" type="button">Groups</button>
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
      <table>
        <thead>
          <tr>
            <th>Update ID</th>
            <th>Message ID</th>
            <th>Group ID</th>
            <th>Group Name</th>
            <th>Group Type</th>
            <th>Topic</th>
            <th>Topic ID</th>
            <th>Is Topic</th>
            <th>Username</th>
            <th>Sender ID</th>
            <th>Sender First Name</th>
            <th>Sender Last Name</th>
            <th>Sender Is Bot</th>
            <th>Message</th>
            <th>Date (Tehran)</th>
            <th>Time (Tehran)</th>
            <th>Type</th>
            <th>Edited At</th>
            <th>Reply To Message ID</th>
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
    const statusEl = document.getElementById("status");
    const messagesNavEl = document.getElementById("messagesNav");
    const groupsNavEl = document.getElementById("groupsNav");
    const messagesPageEl = document.getElementById("messagesPage");
    const groupsPageEl = document.getElementById("groupsPage");
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
    function detailValue(value) {
      const text = typeof value === "object" && value !== null ? jsonText(value) : String(value ?? "");
      return \`<span class="\${text.includes("{") || text.includes("[") ? "detail-value detail-pre" : "detail-value"}">\${esc(text)}</span>\`;
    }
    function detailRow(label, value) {
      return \`<div class="detail-row"><div class="detail-label">\${esc(label)}</div>\${detailValue(value)}</div>\`;
    }
    function detailHtml(row) {
      return \`<div class="details-grid">\${[
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
        ["Sender Chat ID", row.sender_chat_id],
        ["Sender Chat Title", row.sender_chat_title],
        ["Message", row.body],
        ["Caption", row.caption],
        ["Date (Tehran)", row.sent_date],
        ["Time (Tehran)", row.sent_time],
        ["Type", row.message_type],
        ["Edited At", row.edited_at_utc],
        ["Reply To Message ID", row.reply_to_message_id],
        ["Media File ID", row.media_file_id],
        ["Media Group ID", row.media_group_id],
        ["Forward Origin", row.forward_origin_json],
        ["Entities", row.entities_json],
        ["Raw Telegram Payload", row.raw_payload_json],
      ].map(([label, value]) => detailRow(label, value)).join("")}</div>\`;
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
      if (!res.ok || !Array.isArray(data.messages)) {
        rowsEl.innerHTML = "";
        statusEl.textContent = data.detail || data.error || "خطا در دریافت داده";
        return;
      }
      fullTextByKey.clear();
      detailByKey.clear();
      rowsEl.innerHTML = data.messages.map((row, index) => \`
        <tr>
          <td>\${esc(row.update_id)}</td>
          <td>\${esc(row.message_id)}</td>
          <td>\${esc(row.chat_id)}</td>
          <td>\${esc(row.chat_title)}</td>
          <td>\${esc(row.chat_type)}</td>
          <td>\${esc(row.topic_name || (row.message_thread_id ? "#" + row.message_thread_id : ""))}</td>
          <td>\${esc(row.message_thread_id)}</td>
          <td>\${esc(row.is_topic_message)}</td>
          <td>\${esc(row.sender_username)}</td>
          <td>\${esc(row.sender_id)}</td>
          <td>\${esc(row.sender_first_name)}</td>
          <td>\${esc(row.sender_last_name)}</td>
          <td>\${esc(row.sender_is_bot)}</td>
          <td class="body">\${textCell(row.body || row.caption || "[" + row.message_type + "]", "message-" + index)}</td>
          <td>\${esc(row.sent_date)}</td>
          <td>\${esc(row.sent_time)}</td>
          <td>\${esc(row.message_type)}</td>
          <td>\${esc(row.edited_at_utc)}</td>
          <td>\${esc(row.reply_to_message_id)}</td>
          <td><button class="details-button" type="button" data-detail-key="detail-\${index}">Details</button></td>
        </tr>\`).join("");
      data.messages.forEach((row, index) => detailByKey.set("detail-" + index, detailHtml(row)));
      statusEl.textContent = data.messages.length + " پیام";
    }
    async function loadGroups() {
      const res = await fetch("/api/groups");
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.groups)) {
        groupRowsEl.innerHTML = "";
        statusEl.textContent = data.detail || data.error || "خطا در دریافت گروه‌ها";
        return;
      }
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
    function showPage(page) {
      currentPage = page;
      const isGroups = page === "groups";
      messagesPageEl.hidden = isGroups;
      groupsPageEl.hidden = !isGroups;
      messagesNavEl.classList.toggle("active", !isGroups);
      groupsNavEl.classList.toggle("active", isGroups);
      if (isGroups) loadGroups();
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
    modalCloseEl.addEventListener("click", closeModal);
    modalBackdropEl.addEventListener("click", event => { if (event.target === modalBackdropEl) closeModal(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
    refreshEl.addEventListener("click", load);
    messagesNavEl.addEventListener("click", () => showPage("messages"));
    groupsNavEl.addEventListener("click", () => showPage("groups"));
    [searchEl, groupEl, topicEl, chatEl, senderEl].forEach(el => el.addEventListener("keydown", e => { if (e.key === "Enter") load(); }));
    load();
    setInterval(() => { if (currentPage === "groups") loadGroups(); else load(); }, 5000);
  </script>
</body>
</html>`;

const LOGIN_HTML = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Visibility Login</title>
  <style>
    :root { color-scheme: light; --ink:#172026; --muted:#64727d; --line:#d8dee4; --bg:#f7f8fa; --panel:#fff; --accent:#087f8c; }
    * { box-sizing: border-box; }
    body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--ink); background:var(--bg); }
    form { width:min(380px, calc(100vw - 32px)); background:var(--panel); border:1px solid var(--line); border-radius:8px; padding:22px; }
    h1 { margin:0 0 16px; font-size:20px; }
    label { display:block; margin-bottom:8px; color:var(--muted); font-size:13px; }
    input, button { width:100%; height:40px; border-radius:6px; font:inherit; }
    input { border:1px solid var(--line); padding:0 10px; }
    button { margin-top:12px; border:0; background:var(--accent); color:#fff; cursor:pointer; }
  </style>
</head>
<body>
  <form method="post" action="/login">
    <h1>Visibility</h1>
    <label for="password">رمز ورود داشبورد</label>
    <input id="password" name="password" type="password" autocomplete="current-password" autofocus />
    <button type="submit">ورود</button>
  </form>
</body>
</html>`;

const MESSAGE_KEYS = ["message", "edited_message", "channel_post", "edited_channel_post"];
const MEDIA_KEYS = ["photo", "video", "document", "voice", "audio", "video_note", "animation", "sticker", "location", "contact", "poll", "venue"];

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

function redirect(location) {
  return new Response(null, {
    status: 303,
    headers: { location },
  });
}

function dashboardAuthorized(request, env) {
  if (!env.DASHBOARD_PASSWORD) return false;
  const cookie = request.headers.get("cookie") || "";
  return cookie.split(";").some((part) => part.trim() === `visibility_session=${env.DASHBOARD_PASSWORD}`);
}

async function handleLogin(request, env) {
  if (request.method !== "POST") return text(LOGIN_HTML, 200, "text/html; charset=utf-8");
  if (!env.DASHBOARD_PASSWORD) return text("Dashboard password is not configured", 503);
  const form = await request.formData();
  if (form.get("password") !== env.DASHBOARD_PASSWORD) {
    return text(LOGIN_HTML, 401, "text/html; charset=utf-8");
  }
  return new Response(null, {
    status: 303,
    headers: {
      location: "/",
      "set-cookie": `visibility_session=${env.DASHBOARD_PASSWORD}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
    },
  });
}

function supabaseHeaders(env, prefer) {
  const headers = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    "content-type": "application/json",
  };
  if (prefer) headers.prefer = prefer;
  return headers;
}

function findMessage(update) {
  for (const key of MESSAGE_KEYS) {
    if (update[key]) return { updateKind: key, message: update[key] };
  }
  return { updateKind: null, message: null };
}

function messageType(message) {
  if (message.text !== undefined) return "text";
  for (const key of MEDIA_KEYS) {
    if (message[key] !== undefined) return key;
  }
  for (const key of [
    "forum_topic_created",
    "forum_topic_edited",
    "forum_topic_closed",
    "forum_topic_reopened",
    "new_chat_members",
    "left_chat_member",
    "new_chat_title",
    "pinned_message",
  ]) {
    if (message[key] !== undefined) return key;
  }
  return "unknown";
}

function mediaFileId(message) {
  if (Array.isArray(message.photo) && message.photo.length) {
    return message.photo[message.photo.length - 1]?.file_id ?? null;
  }
  for (const key of ["video", "document", "voice", "audio", "video_note", "animation", "sticker"]) {
    if (message[key]?.file_id) return message[key].file_id;
  }
  return null;
}

function isoFromUnix(value) {
  return value ? new Date(value * 1000).toISOString() : null;
}

function tehranParts(date) {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const dateMap = Object.fromEntries(dateParts.map((part) => [part.type, part.value]));
  const timeMap = Object.fromEntries(timeParts.map((part) => [part.type, part.value]));
  return {
    sent_date: `${dateMap.year}-${dateMap.month}-${dateMap.day}`,
    sent_time: `${timeMap.hour}:${timeMap.minute}:${timeMap.second}`,
    display_timezone: "Asia/Tehran",
  };
}

function topicData(message) {
  const created = message.forum_topic_created;
  const edited = message.forum_topic_edited;
  return {
    messageThreadId: message.message_thread_id ?? null,
    isTopicMessage: message.is_topic_message ?? null,
    topicName: created?.name ?? edited?.name ?? null,
    topicIconColor: created?.icon_color ?? null,
    topicIconCustomEmojiId: created?.icon_custom_emoji_id ?? edited?.icon_custom_emoji_id ?? null,
  };
}

function isPrivateChat(message) {
  return message.chat?.type === "private";
}

function isBotCommand(message) {
  const text = message.text || message.caption || "";
  const entities = message.entities || message.caption_entities || [];
  return entities.some((entity) => entity.type === "bot_command" && entity.offset === 0) || text.trim().startsWith("/");
}

async function sendTelegramMessage(env, chatId, textValue) {
  if (!env.TELEGRAM_BOT_TOKEN || !chatId) return false;
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: textValue,
      disable_notification: true,
    }),
  });
  return response.ok;
}

async function rejectPrivateUser(env, message) {
  try {
    await sendTelegramMessage(env, message.chat?.id, "مجاز به ادامه عملیات نیستید.");
  } catch {
    return false;
  }
  return true;
}

function activeMemberStatus(status) {
  return ["member", "administrator", "creator"].includes(status);
}

function leftMemberStatus(status) {
  return ["left", "kicked"].includes(status);
}

async function insertChat(env, row) {
  if (!row.chat_id) return;
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_chats?on_conflict=chat_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=ignore-duplicates,return=minimal"),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function patchChat(env, chatId, row) {
  if (!chatId) return;
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_chats?chat_id=eq.${chatId}`, {
    method: "PATCH",
    headers: supabaseHeaders(env, "return=minimal"),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function upsertChatFromMessage(env, message, update) {
  const chat = message.chat ?? {};
  if (!chat.id) return;
  const now = new Date().toISOString();
  const seenAt = isoFromUnix(message.date) || now;
  await insertChat(env, {
    chat_id: chat.id,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    joined_at_utc: seenAt,
    first_seen_at_utc: seenAt,
    last_seen_at_utc: seenAt,
    raw_payload_json: update,
    updated_at_utc: now,
  });
  await patchChat(env, chat.id, {
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    last_seen_at_utc: seenAt,
    raw_payload_json: update,
    updated_at_utc: now,
  });
}

async function upsertChatFromMembership(env, update) {
  const membership = update.my_chat_member;
  if (!membership?.chat?.id) return false;

  const chat = membership.chat;
  const joinedAt = isoFromUnix(membership.date) || new Date().toISOString();
  const oldStatus = membership.old_chat_member?.status;
  const newStatus = membership.new_chat_member?.status;
  const isJoinEvent = leftMemberStatus(oldStatus) && activeMemberStatus(newStatus);
  const now = new Date().toISOString();

  await insertChat(env, {
    chat_id: chat.id,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    joined_at_utc: isJoinEvent ? joinedAt : null,
    first_seen_at_utc: joinedAt,
    last_seen_at_utc: joinedAt,
    raw_payload_json: update,
    updated_at_utc: now,
  });

  const patch = {
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    last_seen_at_utc: joinedAt,
    raw_payload_json: update,
    updated_at_utc: now,
  };
  if (isJoinEvent) patch.joined_at_utc = joinedAt;
  await patchChat(env, chat.id, patch);
  return true;
}

async function upsertTopic(env, message, update) {
  const chat = message.chat ?? {};
  const topic = topicData(message);
  if (!chat.id || !topic.messageThreadId || !topic.topicName) return;

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_topics?on_conflict=chat_id,message_thread_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=merge-duplicates,return=minimal"),
    body: JSON.stringify({
      chat_id: chat.id,
      message_thread_id: topic.messageThreadId,
      topic_name: topic.topicName,
      icon_color: topic.topicIconColor,
      icon_custom_emoji_id: topic.topicIconCustomEmojiId,
      raw_payload_json: update,
      updated_at_utc: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function handleTelegramWebhook(request, env) {
  if (request.method !== "POST") return text("ok");
  if (env.TELEGRAM_WEBHOOK_SECRET && request.headers.get("x-telegram-bot-api-secret-token") !== env.TELEGRAM_WEBHOOK_SECRET) {
    return text("unauthorized", 401);
  }

  const update = await request.json();
  if (update.my_chat_member && await upsertChatFromMembership(env, update)) {
    return json({ ok: true, membership: true });
  }

  const { message } = findMessage(update);
  if (!message) return json({ ok: true, ignored: true });

  if (isPrivateChat(message)) {
    await rejectPrivateUser(env, message);
    return json({ ok: true, rejected: "private_chat" });
  }
  if (isBotCommand(message)) {
    return json({ ok: true, ignored: "bot_command" });
  }

  await upsertChatFromMessage(env, message, update);
  await upsertTopic(env, message, update);

  const chat = message.chat ?? {};
  const sender = message.from ?? {};
  const senderChat = message.sender_chat ?? {};
  const sentAt = isoFromUnix(message.date);
  const editedAt = isoFromUnix(message.edit_date);
  const topic = topicData(message);

  const row = {
    update_id: update.update_id,
    message_id: message.message_id ?? null,
    chat_id: chat.id ?? null,
    chat_title: chat.title ?? null,
    chat_username: chat.username ?? null,
    chat_type: chat.type ?? null,
    message_thread_id: topic.messageThreadId,
    is_topic_message: topic.isTopicMessage,
    topic_name: topic.topicName,
    topic_icon_color: topic.topicIconColor,
    topic_icon_custom_emoji_id: topic.topicIconCustomEmojiId,
    sender_id: sender.id ?? null,
    sender_username: sender.username ?? null,
    sender_first_name: sender.first_name ?? null,
    sender_last_name: sender.last_name ?? null,
    sender_is_bot: sender.is_bot ?? null,
    sender_chat_id: senderChat.id ?? null,
    sender_chat_title: senderChat.title ?? null,
    body: message.text ?? null,
    caption: message.caption ?? null,
    message_type: messageType(message),
    sent_at_utc: sentAt,
    sent_date: sentAt?.slice(0, 10) ?? null,
    sent_time: sentAt?.slice(11, 19) ?? null,
    edited_at_utc: editedAt,
    reply_to_message_id: message.reply_to_message?.message_id ?? null,
    forward_origin_json: message.forward_origin ?? null,
    entities_json: message.entities ?? message.caption_entities ?? null,
    media_file_id: mediaFileId(message),
    media_group_id: message.media_group_id ?? null,
    raw_payload_json: update,
  };

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?on_conflict=update_id,message_id`, {
    method: "POST",
    headers: supabaseHeaders(env, "resolution=ignore-duplicates,return=minimal"),
    body: JSON.stringify(row),
  });
  if (!response.ok) {
    return json({ ok: false, error: await response.text() }, 500);
  }
  return json({ ok: true });
}

async function fetchMessages(request, env) {
  const url = new URL(request.url);
  const params = new URLSearchParams();
  params.set("select", [
    "update_id",
    "message_id",
    "chat_id",
    "chat_title",
    "chat_username",
    "chat_type",
    "message_thread_id",
    "is_topic_message",
    "topic_name",
    "sender_id",
    "sender_username",
    "sender_first_name",
    "sender_last_name",
    "sender_is_bot",
    "sender_chat_id",
    "sender_chat_title",
    "body",
    "caption",
    "message_type",
    "sent_at_utc",
    "edited_at_utc",
    "reply_to_message_id",
    "media_file_id",
    "media_group_id",
    "forward_origin_json",
    "entities_json",
    "raw_payload_json",
  ].join(","));
  params.set("order", "sent_at_utc.desc.nullslast,id.desc");
  params.set("limit", "500");

  const filters = [];
  const q = url.searchParams.get("q");
  const group = url.searchParams.get("group");
  const topic = url.searchParams.get("topic");
  const chatId = url.searchParams.get("chat_id");
  const senderId = url.searchParams.get("sender_id");
  if (q) {
    const pattern = `*${q.replace(/[%*]/g, "")}*`;
    filters.push(`body.ilike.${pattern},caption.ilike.${pattern},chat_title.ilike.${pattern},topic_name.ilike.${pattern},sender_username.ilike.${pattern}`);
  }
  if (filters.length) params.set("or", `(${filters.join(",")})`);
  if (group) params.set("chat_title", `ilike.*${group.replace(/[%*]/g, "")}*`);
  if (chatId) params.set("chat_id", `eq.${chatId}`);
  if (senderId) params.set("sender_id", `eq.${senderId}`);

  const headers = supabaseHeaders(env);
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_messages?${params}`, {
    headers,
  });
  if (!response.ok) {
    return json({ error: "Supabase request failed", detail: await response.text() }, 500);
  }

  const topicsResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_topics?select=chat_id,message_thread_id,topic_name&limit=10000`, {
    headers,
  });
  if (!topicsResponse.ok) {
    return json({ error: "Supabase topics request failed", detail: await topicsResponse.text() }, 500);
  }

  const topics = await topicsResponse.json();
  const topicByThread = new Map(
    topics.map((topicRow) => [`${topicRow.chat_id}:${topicRow.message_thread_id}`, topicRow.topic_name])
  );
  const rows = await response.json();
  let messages = rows.map((row) => {
    const date = row.sent_at_utc ? new Date(row.sent_at_utc) : null;
    const mappedTopicName = row.message_thread_id
      ? topicByThread.get(`${row.chat_id}:${row.message_thread_id}`)
      : null;
    return {
      ...row,
      topic_name: row.topic_name || mappedTopicName || null,
      ...(date ? tehranParts(date) : { sent_date: null, sent_time: null, display_timezone: "Asia/Tehran" }),
    };
  });
  if (topic) {
    const normalizedTopic = topic.toLowerCase();
    messages = messages.filter((row) => String(row.topic_name || "").toLowerCase().includes(normalizedTopic));
  }
  return json({ messages });
}

async function fetchGroups(request, env) {
  const params = new URLSearchParams();
  params.set("select", "chat_id,chat_title,chat_username,chat_type,joined_at_utc,first_seen_at_utc,last_seen_at_utc,message_count,last_message_at_utc");
  params.set("order", "message_count.desc,last_seen_at_utc.desc");
  params.set("limit", "1000");

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/telegram_group_stats?${params}`, {
    headers: supabaseHeaders(env),
  });
  if (!response.ok) {
    return json({ error: "Supabase groups request failed", detail: await response.text() }, 500);
  }

  const rows = await response.json();
  const groups = rows.map((row) => {
    const joinedAt = row.joined_at_utc || row.first_seen_at_utc;
    const joined = joinedAt ? tehranParts(new Date(joinedAt)) : { sent_date: null, sent_time: null };
    const lastSeen = row.last_seen_at_utc ? tehranParts(new Date(row.last_seen_at_utc)) : { sent_date: null, sent_time: null };
    const lastMessage = row.last_message_at_utc ? tehranParts(new Date(row.last_message_at_utc)) : { sent_date: null, sent_time: null };
    return {
      ...row,
      message_count: Number(row.message_count || 0),
      joined_date: joined.sent_date,
      joined_time: joined.sent_time,
      last_seen_date: lastSeen.sent_date,
      last_seen_time: lastSeen.sent_time,
      last_message_date: lastMessage.sent_date,
      last_message_time: lastMessage.sent_time,
      display_timezone: "Asia/Tehran",
    };
  });
  return json({ groups });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/telegram-webhook") return handleTelegramWebhook(request, env);
    if (url.pathname === "/login") return handleLogin(request, env);
    if (url.pathname === "/logout") {
      return new Response(null, {
        status: 303,
        headers: {
          location: "/login",
          "set-cookie": "visibility_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
        },
      });
    }
    if (!dashboardAuthorized(request, env)) {
      if (url.pathname === "/api/messages" || url.pathname === "/api/groups") return json({ error: "Unauthorized" }, 401);
      return text(LOGIN_HTML, 200, "text/html; charset=utf-8");
    }
    if (url.pathname === "/") return text(HTML, 200, "text/html; charset=utf-8");
    if (url.pathname === "/api/debug") return text("Not found", 404);
    if (url.pathname === "/api/messages") return fetchMessages(request, env);
    if (url.pathname === "/api/groups") return fetchGroups(request, env);
    return text("Not found", 404);
  },
};
