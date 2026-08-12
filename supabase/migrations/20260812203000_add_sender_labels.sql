CREATE TABLE IF NOT EXISTS public.visibility_sender_labels (
    platform text NOT NULL DEFAULT 'telegram',
    sender_id text NOT NULL,
    sender_label text,
    created_at_utc timestamptz NOT NULL DEFAULT timezone('utc', now()),
    updated_at_utc timestamptz NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT visibility_sender_labels_pkey PRIMARY KEY (platform, sender_id),
    CONSTRAINT visibility_sender_labels_platform_chk CHECK (platform IN ('telegram', 'bale', 'whatsapp')),
    CONSTRAINT visibility_sender_labels_sender_label_chk CHECK (
        sender_label IS NULL
        OR sender_label IN ('internal_team', 'customer', 'provider')
    )
);

CREATE INDEX IF NOT EXISTS visibility_sender_labels_label_idx
    ON public.visibility_sender_labels(sender_label);

ALTER TABLE public.visibility_sender_labels ENABLE ROW LEVEL SECURITY;
