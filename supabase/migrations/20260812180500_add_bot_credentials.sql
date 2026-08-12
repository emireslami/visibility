ALTER TABLE public.visibility_bots
    ADD COLUMN IF NOT EXISTS credential_ciphertext text,
    ADD COLUMN IF NOT EXISTS credential_iv text,
    ADD COLUMN IF NOT EXISTS credential_last4 text,
    ADD COLUMN IF NOT EXISTS credential_updated_at_utc timestamptz,
    ADD COLUMN IF NOT EXISTS webhook_secret_hash text,
    ADD COLUMN IF NOT EXISTS created_by_email text,
    ADD COLUMN IF NOT EXISTS api_base text,
    ADD COLUMN IF NOT EXISTS file_base text;

DROP VIEW IF EXISTS public.visibility_bot_stats;

CREATE VIEW public.visibility_bot_stats AS
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
    b.credential_last4,
    b.credential_updated_at_utc,
    b.created_by_email,
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
    b.last_update_at_utc,
    b.credential_last4,
    b.credential_updated_at_utc,
    b.created_by_email;

ALTER TABLE public.visibility_access_audit_logs
    DROP CONSTRAINT IF EXISTS visibility_access_audit_logs_action_chk;

ALTER TABLE public.visibility_access_audit_logs
    ADD CONSTRAINT visibility_access_audit_logs_action_chk
    CHECK (
        action IN (
            'invite',
            'permissions_update',
            'revoke',
            'reactivate',
            'password_change',
            'password_recovery',
            'invite_email',
            'resend_invite',
            'profile_update',
            'bot_create',
            'bot_rotate'
        )
    );
