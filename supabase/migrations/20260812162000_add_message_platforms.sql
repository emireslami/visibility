ALTER TABLE public.telegram_messages
    ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'telegram';

ALTER TABLE public.telegram_chats
    ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'telegram';

ALTER TABLE public.telegram_topics
    ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'telegram';

ALTER TABLE public.telegram_message_reactions
    ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'telegram';

ALTER TABLE public.telegram_messages
    DROP CONSTRAINT IF EXISTS telegram_messages_update_id_message_id_key;

ALTER TABLE public.telegram_messages
    ADD CONSTRAINT telegram_messages_platform_update_message_key
    UNIQUE (platform, update_id, message_id);

ALTER TABLE public.telegram_chats
    DROP CONSTRAINT IF EXISTS telegram_chats_pkey;

ALTER TABLE public.telegram_chats
    ADD CONSTRAINT telegram_chats_pkey
    PRIMARY KEY (platform, chat_id);

ALTER TABLE public.telegram_topics
    DROP CONSTRAINT IF EXISTS telegram_topics_pkey;

ALTER TABLE public.telegram_topics
    ADD CONSTRAINT telegram_topics_pkey
    PRIMARY KEY (platform, chat_id, message_thread_id);

ALTER TABLE public.telegram_messages
    DROP CONSTRAINT IF EXISTS telegram_messages_platform_chk;

ALTER TABLE public.telegram_chats
    DROP CONSTRAINT IF EXISTS telegram_chats_platform_chk;

ALTER TABLE public.telegram_topics
    DROP CONSTRAINT IF EXISTS telegram_topics_platform_chk;

ALTER TABLE public.telegram_message_reactions
    DROP CONSTRAINT IF EXISTS telegram_message_reactions_platform_chk;

ALTER TABLE public.telegram_messages
    ADD CONSTRAINT telegram_messages_platform_chk
    CHECK (platform IN ('telegram', 'bale', 'whatsapp'));

ALTER TABLE public.telegram_chats
    ADD CONSTRAINT telegram_chats_platform_chk
    CHECK (platform IN ('telegram', 'bale', 'whatsapp'));

ALTER TABLE public.telegram_topics
    ADD CONSTRAINT telegram_topics_platform_chk
    CHECK (platform IN ('telegram', 'bale', 'whatsapp'));

ALTER TABLE public.telegram_message_reactions
    ADD CONSTRAINT telegram_message_reactions_platform_chk
    CHECK (platform IN ('telegram', 'bale', 'whatsapp'));

CREATE INDEX IF NOT EXISTS telegram_messages_platform_chat_idx
    ON public.telegram_messages(platform, chat_id);

CREATE INDEX IF NOT EXISTS telegram_messages_platform_thread_idx
    ON public.telegram_messages(platform, chat_id, message_thread_id);

CREATE INDEX IF NOT EXISTS telegram_messages_platform_media_group_idx
    ON public.telegram_messages(platform, chat_id, media_group_id);

CREATE INDEX IF NOT EXISTS telegram_message_reactions_platform_message_idx
    ON public.telegram_message_reactions(platform, chat_id, message_id);

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
    c.group_label,
    c.platform
FROM public.telegram_chats c
LEFT JOIN public.telegram_messages m
    ON m.platform = c.platform
    AND m.chat_id = c.chat_id
GROUP BY
    c.platform,
    c.chat_id,
    c.chat_title,
    c.chat_username,
    c.chat_type,
    c.group_label,
    c.joined_at_utc,
    c.first_seen_at_utc,
    c.last_seen_at_utc;
