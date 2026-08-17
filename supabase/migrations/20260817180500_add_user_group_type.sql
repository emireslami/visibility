ALTER TABLE public.visibility_user_groups
    ADD COLUMN IF NOT EXISTS group_type TEXT NOT NULL DEFAULT 'squad'
    CHECK (group_type IN ('squad', 'gtm'));

CREATE INDEX IF NOT EXISTS visibility_user_groups_group_type_idx
    ON public.visibility_user_groups (group_type);
