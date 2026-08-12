ALTER TABLE public.telegram_chats
    ADD COLUMN IF NOT EXISTS group_label text;

ALTER TABLE public.telegram_chats
    DROP CONSTRAINT IF EXISTS telegram_chats_group_label_chk;

ALTER TABLE public.telegram_chats
    ADD CONSTRAINT telegram_chats_group_label_chk
    CHECK (
        group_label IS NULL
        OR group_label IN ('internal_team', 'customer', 'provider')
    );

COMMENT ON COLUMN public.telegram_chats.group_label
    IS 'Manual group classification: internal_team, customer, or provider.';

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
    MAX(m.sent_at_utc) AS last_message_at_utc,
    c.group_label
FROM public.telegram_chats c
LEFT JOIN public.telegram_messages m ON m.chat_id = c.chat_id
GROUP BY
    c.chat_id,
    c.chat_title,
    c.chat_username,
    c.chat_type,
    c.group_label,
    c.joined_at_utc,
    c.first_seen_at_utc,
    c.last_seen_at_utc;
