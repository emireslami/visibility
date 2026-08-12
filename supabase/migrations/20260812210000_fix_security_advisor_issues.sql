DO $$
BEGIN
    IF to_regclass('public.bot_state') IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.bot_state ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS bot_state_no_public_access ON public.bot_state';
        EXECUTE 'CREATE POLICY bot_state_no_public_access
            ON public.bot_state
            FOR ALL
            TO anon, authenticated
            USING (false)
            WITH CHECK (false)';
    END IF;
END $$;

DO $$
BEGIN
    IF to_regclass('public.telegram_group_stats') IS NOT NULL THEN
        EXECUTE 'ALTER VIEW public.telegram_group_stats SET (security_invoker = true)';
    END IF;

    IF to_regclass('public.visibility_bot_stats') IS NOT NULL THEN
        EXECUTE 'ALTER VIEW public.visibility_bot_stats SET (security_invoker = true)';
    END IF;
END $$;
