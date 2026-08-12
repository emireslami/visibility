ALTER TABLE public.visibility_access_users
    DROP CONSTRAINT IF EXISTS visibility_access_users_permissions_chk;

ALTER TABLE public.visibility_access_users
    ADD CONSTRAINT visibility_access_users_permissions_chk
    CHECK (
        (
            jsonb_typeof(permissions) = 'array'
            AND permissions <@ '["access", "threads", "groups", "messages", "dashboard", "analytics", "bots"]'::jsonb
        )
        OR
        (
            jsonb_typeof(permissions) = 'object'
            AND jsonb_typeof(permissions -> 'pages') = 'array'
            AND (permissions -> 'pages') <@ '["access", "threads", "groups", "messages", "dashboard", "analytics", "bots"]'::jsonb
            AND (
                NOT (permissions ? 'group_access')
                OR (
                    jsonb_typeof(permissions -> 'group_access') = 'object'
                    AND (
                        NOT ((permissions -> 'group_access') ? 'labels')
                        OR (
                            jsonb_typeof(permissions -> 'group_access' -> 'labels') = 'array'
                            AND (permissions -> 'group_access' -> 'labels') <@ '["internal_team", "customer", "provider"]'::jsonb
                        )
                    )
                    AND (
                        NOT ((permissions -> 'group_access') ? 'groups')
                        OR jsonb_typeof(permissions -> 'group_access' -> 'groups') = 'array'
                    )
                )
            )
        )
    );
