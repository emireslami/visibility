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
    .filters { display:grid; grid-template-columns: 1fr 170px 170px 170px 110px; gap:10px; margin-bottom:14px; }
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
      <input id="topic" placeholder="Topic" />
      <input id="chat" placeholder="Chat ID" />
      <input id="sender" placeholder="Sender ID" />
      <button id="refresh">به‌روزرسانی</button>
    </section>
    <table>
      <thead>
        <tr>
          <th>Group ID</th>
          <th>Group Name</th>
          <th>Topic</th>
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
    const topicEl = document.getElementById("topic");
    const chatEl = document.getElementById("chat");
    const senderEl = document.getElementById("sender");
    const refreshEl = document.getElementById("refresh");
    function esc(value) {
      return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    async function load() {
      const params = new URLSearchParams();
      if (searchEl.value.trim()) params.set("q", searchEl.value.trim());
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
      rowsEl.innerHTML = data.messages.map(row => \`
        <tr>
          <td>\${esc(row.chat_id)}</td>
          <td>\${esc(row.chat_title)}</td>
          <td>\${esc(row.topic_name || (row.message_thread_id ? "#" + row.message_thread_id : ""))}</td>
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
    [searchEl, topicEl, chatEl, senderEl].forEach(el => el.addEventListener("keydown", e => { if (e.key === "Enter") load(); }));
    load();
    setInterval(load, 5000);
  </script>
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
  const { message } = findMessage(update);
  if (!message) return json({ ok: true, ignored: true });

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
  params.set("select", "update_id,message_id,chat_id,chat_title,message_thread_id,topic_name,sender_username,sender_id,body,caption,message_type,sent_at_utc");
  params.set("order", "sent_at_utc.desc.nullslast,id.desc");
  params.set("limit", "500");

  const filters = [];
  const q = url.searchParams.get("q");
  const topic = url.searchParams.get("topic");
  const chatId = url.searchParams.get("chat_id");
  const senderId = url.searchParams.get("sender_id");
  if (q) {
    const pattern = `*${q.replace(/[%*]/g, "")}*`;
    filters.push(`body.ilike.${pattern},caption.ilike.${pattern},chat_title.ilike.${pattern},topic_name.ilike.${pattern},sender_username.ilike.${pattern}`);
  }
  if (filters.length) params.set("or", `(${filters.join(",")})`);
  if (topic) params.set("topic_name", `ilike.*${topic.replace(/[%*]/g, "")}*`);
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
  const messages = rows.map((row) => {
    const date = row.sent_at_utc ? new Date(row.sent_at_utc) : null;
    const mappedTopicName = row.message_thread_id
      ? topicByThread.get(`${row.chat_id}:${row.message_thread_id}`)
      : null;
    return {
      ...row,
      topic_name: row.topic_name || mappedTopicName || null,
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
    if (url.pathname === "/api/debug") return text("Not found", 404);
    if (url.pathname === "/api/messages") return fetchMessages(request, env);
    if (url.pathname === "/telegram-webhook") return handleTelegramWebhook(request, env);
    return text("Not found", 404);
  },
};
