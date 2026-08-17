ALTER TABLE public.visibility_user_groups
    DROP CONSTRAINT IF EXISTS visibility_user_groups_group_type_check;

ALTER TABLE public.visibility_user_groups
    ADD CONSTRAINT visibility_user_groups_group_type_check
        CHECK (group_type IN (
            'squad',
            'gtm',
            'content',
            'marketing',
            'sales',
            'account',
            'commercial',
            'product_design',
            'product_management',
            'product_operations',
            'engineering'
        ));

ALTER TABLE public.visibility_user_groups
    ADD COLUMN IF NOT EXISTS group_mode TEXT NOT NULL DEFAULT 'functional';

ALTER TABLE public.visibility_user_groups
    DROP CONSTRAINT IF EXISTS visibility_user_groups_group_mode_check;

ALTER TABLE public.visibility_user_groups
    ADD CONSTRAINT visibility_user_groups_group_mode_check
        CHECK (group_mode IN ('functional', 'cross_functional'));

CREATE INDEX IF NOT EXISTS visibility_user_groups_group_mode_idx
    ON public.visibility_user_groups (group_mode);
