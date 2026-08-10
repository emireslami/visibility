ALTER TABLE public.visibility_access_users
    ADD COLUMN IF NOT EXISTS permissions JSONB NOT NULL
    DEFAULT '["access", "threads", "groups", "messages", "dashboard"]'::jsonb;

UPDATE public.visibility_access_users
SET permissions = '["access", "threads", "groups", "messages", "dashboard"]'::jsonb
WHERE permissions IS NULL OR jsonb_typeof(permissions) <> 'array';

ALTER TABLE public.visibility_access_users
    DROP CONSTRAINT IF EXISTS visibility_access_users_permissions_chk;

ALTER TABLE public.visibility_access_users
    ADD CONSTRAINT visibility_access_users_permissions_chk
    CHECK (
        jsonb_typeof(permissions) = 'array'
        AND permissions <@ '["access", "threads", "groups", "messages", "dashboard"]'::jsonb
    );
