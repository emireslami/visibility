ALTER TABLE public.visibility_access_users
    ADD COLUMN IF NOT EXISTS avatar_data_url TEXT;

COMMENT ON COLUMN public.visibility_access_users.avatar_data_url
    IS 'Small compressed image data URL for dashboard user avatar.';
