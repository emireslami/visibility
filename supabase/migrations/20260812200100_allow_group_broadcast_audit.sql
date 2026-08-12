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
            'bot_rotate',
            'group_broadcast'
        )
    );
