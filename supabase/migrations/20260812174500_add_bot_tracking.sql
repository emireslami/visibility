ALTER TABLE public.telegram_messages
    ADD COLUMN IF NOT EXISTS bot_id text,
    ADD COLUMN IF NOT EXISTS bot_username text,
    ADD COLUMN IF NOT EXISTS bot_name text;

ALTER TABLE public.telegram_chats
    ADD COLUMN IF NOT EXISTS bot_id text,
    ADD COLUMN IF NOT EXISTS bot_username text,
    ADD COLUMN IF NOT EXISTS bot_name text;

ALTER TABLE public.telegram_topics
    ADD COLUMN IF NOT EXISTS bot_id text,
    ADD COLUMN IF NOT EXISTS bot_username text,
    ADD COLUMN IF NOT EXISTS bot_name text;

CREATE TABLE IF NOT EXISTS public.visibility_bots (
    platform text NOT NULL,
    bot_id text NOT NULL,
    bot_username text,
    bot_name text,
    webhook_path text,
    is_active boolean NOT NULL DEFAULT true,
    first_seen_at_utc timestamptz NOT NULL DEFAULT timezone('utc', now()),
    last_seen_at_utc timestamptz NOT NULL DEFAULT timezone('utc', now()),
    last_update_at_utc timestamptz,
    created_at_utc timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at_utc timestamptz NOT NULL DEFAULT timezone('utc', now()),
    PRIMARY KEY (platform, bot_id)
);

ALTER TABLE public.visibility_bots
    DROP CONSTRAINT IF EXISTS visibility_bots_platform_chk;

ALTER TABLE public.visibility_bots
    ADD CONSTRAINT visibility_bots_platform_chk
    CHECK (platform IN ('telegram', 'bale', 'whatsapp'));

UPDATE public.telegram_messages
SET
    bot_id = COALESCE(bot_id, platform || '_default'),
    bot_name = COALESCE(bot_name, CASE platform WHEN 'bale' THEN 'بات بله' WHEN 'whatsapp' THEN 'بات واتساپ' ELSE 'بات تلگرام' END)
WHERE bot_id IS NULL;

UPDATE public.telegram_chats
SET
    bot_id = COALESCE(bot_id, platform || '_default'),
    bot_name = COALESCE(bot_name, CASE platform WHEN 'bale' THEN 'بات بله' WHEN 'whatsapp' THEN 'بات واتساپ' ELSE 'بات تلگرام' END)
WHERE bot_id IS NULL;

UPDATE public.telegram_topics
SET
    bot_id = COALESCE(bot_id, platform || '_default'),
    bot_name = COALESCE(bot_name, CASE platform WHEN 'bale' THEN 'بات بله' WHEN 'whatsapp' THEN 'بات واتساپ' ELSE 'بات تلگرام' END)
WHERE bot_id IS NULL;

INSERT INTO public.visibility_bots (
    platform,
    bot_id,
    bot_name,
    first_seen_at_utc,
    last_seen_at_utc,
    last_update_at_utc,
    updated_at_utc
)
SELECT
    platform,
    platform || '_default',
    CASE platform WHEN 'bale' THEN 'بات بله' WHEN 'whatsapp' THEN 'بات واتساپ' ELSE 'بات تلگرام' END,
    MIN(COALESCE(received_at_utc, sent_at_utc, timezone('utc', now()))),
    MAX(COALESCE(received_at_utc, sent_at_utc, timezone('utc', now()))),
    MAX(COALESCE(received_at_utc, sent_at_utc)),
    timezone('utc', now())
FROM public.telegram_messages
GROUP BY platform
ON CONFLICT (platform, bot_id) DO UPDATE
SET
    last_seen_at_utc = GREATEST(public.visibility_bots.last_seen_at_utc, EXCLUDED.last_seen_at_utc),
    last_update_at_utc = GREATEST(public.visibility_bots.last_update_at_utc, EXCLUDED.last_update_at_utc),
    updated_at_utc = timezone('utc', now());

CREATE INDEX IF NOT EXISTS telegram_messages_bot_idx
    ON public.telegram_messages(platform, bot_id);

CREATE INDEX IF NOT EXISTS telegram_chats_bot_idx
    ON public.telegram_chats(platform, bot_id);

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
    c.platform,
    c.bot_id,
    c.bot_username,
    c.bot_name
FROM public.telegram_chats c
LEFT JOIN public.telegram_messages m
    ON m.platform = c.platform
    AND m.chat_id = c.chat_id
    AND m.bot_id = c.bot_id
GROUP BY
    c.platform,
    c.bot_id,
    c.bot_username,
    c.bot_name,
    c.chat_id,
    c.chat_title,
    c.chat_username,
    c.chat_type,
    c.group_label,
    c.joined_at_utc,
    c.first_seen_at_utc,
    c.last_seen_at_utc;

CREATE OR REPLACE VIEW public.visibility_bot_stats AS
SELECT
    b.platform,
    b.bot_id,
    b.bot_username,
    b.bot_name,
    b.webhook_path,
    b.is_active,
    b.first_seen_at_utc,
    b.last_seen_at_utc,
    b.last_update_at_utc,
    COUNT(m.id)::BIGINT AS message_count,
    COUNT(DISTINCT m.chat_id)::BIGINT AS group_count,
    MAX(m.sent_at_utc) AS last_message_at_utc
FROM public.visibility_bots b
LEFT JOIN public.telegram_messages m
    ON m.platform = b.platform
    AND m.bot_id = b.bot_id
GROUP BY
    b.platform,
    b.bot_id,
    b.bot_username,
    b.bot_name,
    b.webhook_path,
    b.is_active,
    b.first_seen_at_utc,
    b.last_seen_at_utc,
    b.last_update_at_utc;

ALTER TABLE public.visibility_bots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "visibility_bots_no_public_access" ON public.visibility_bots;
CREATE POLICY "visibility_bots_no_public_access"
    ON public.visibility_bots
    FOR ALL
    TO anon, authenticated
    USING (false)
    WITH CHECK (false);

ALTER TABLE public.visibility_access_users
    DROP CONSTRAINT IF EXISTS visibility_access_users_permissions_chk;

ALTER TABLE public.visibility_access_users
    ADD CONSTRAINT visibility_access_users_permissions_chk
    CHECK (
        jsonb_typeof(permissions) = 'array'
        AND permissions <@ '["access", "threads", "groups", "messages", "dashboard", "bots"]'::jsonb
    );
