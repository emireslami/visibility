ALTER TABLE public.visibility_access_users
    ADD COLUMN IF NOT EXISTS telegram_username text;

ALTER TABLE public.visibility_access_users
    DROP CONSTRAINT IF EXISTS visibility_access_users_telegram_username_chk;

ALTER TABLE public.visibility_access_users
    ADD CONSTRAINT visibility_access_users_telegram_username_chk
    CHECK (
        telegram_username IS NULL
        OR telegram_username ~ '^@[A-Za-z][A-Za-z0-9_]{4,31}$'
    );

COMMENT ON COLUMN public.visibility_access_users.telegram_username
    IS 'Telegram username in @username format. Required when users complete first-login password setup.';
