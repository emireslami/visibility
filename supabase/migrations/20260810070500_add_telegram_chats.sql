CREATE TABLE IF NOT EXISTS public.telegram_chats (
    chat_id BIGINT PRIMARY KEY,
    chat_title TEXT,
    chat_username TEXT,
    chat_type TEXT,
    joined_at_utc TIMESTAMPTZ,
    first_seen_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    raw_payload_json JSONB,
    created_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.telegram_chats (
    chat_id,
    chat_title,
    chat_username,
    chat_type,
    joined_at_utc,
    first_seen_at_utc,
    last_seen_at_utc,
    updated_at_utc
)
SELECT DISTINCT ON (chat_id)
    chat_id,
    chat_title,
    chat_username,
    chat_type,
    MIN(received_at_utc) OVER (PARTITION BY chat_id),
    MIN(received_at_utc) OVER (PARTITION BY chat_id),
    MAX(received_at_utc) OVER (PARTITION BY chat_id),
    NOW()
FROM public.telegram_messages
WHERE chat_id IS NOT NULL
ORDER BY chat_id, received_at_utc DESC
ON CONFLICT (chat_id) DO NOTHING;

CREATE OR REPLACE VIEW public.telegram_group_stats AS
SELECT
    c.chat_id,
    c.chat_title,
    c.chat_username,
    c.chat_type,
    c.joined_at_utc,
    c.first_seen_at_utc,
    c.last_seen_at_utc,
    COUNT(m.id)::BIGINT AS message_count,
    MAX(m.sent_at_utc) AS last_message_at_utc
FROM public.telegram_chats c
LEFT JOIN public.telegram_messages m ON m.chat_id = c.chat_id
GROUP BY
    c.chat_id,
    c.chat_title,
    c.chat_username,
    c.chat_type,
    c.joined_at_utc,
    c.first_seen_at_utc,
    c.last_seen_at_utc;

ALTER TABLE public.telegram_chats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "telegram_chats_no_public_access" ON public.telegram_chats;
CREATE POLICY "telegram_chats_no_public_access"
    ON public.telegram_chats
    FOR ALL
    USING (false)
    WITH CHECK (false);
