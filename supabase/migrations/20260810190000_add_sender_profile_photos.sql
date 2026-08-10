ALTER TABLE public.telegram_messages
    ADD COLUMN IF NOT EXISTS sender_photo_file_id TEXT,
    ADD COLUMN IF NOT EXISTS sender_photo_file_unique_id TEXT;
