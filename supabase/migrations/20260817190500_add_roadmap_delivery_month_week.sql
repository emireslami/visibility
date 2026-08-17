ALTER TABLE public.visibility_roadmap_items
    ADD COLUMN IF NOT EXISTS delivery_month SMALLINT,
    ADD COLUMN IF NOT EXISTS delivery_week SMALLINT;

ALTER TABLE public.visibility_roadmap_items
    DROP CONSTRAINT IF EXISTS visibility_roadmap_items_delivery_month_chk,
    ADD CONSTRAINT visibility_roadmap_items_delivery_month_chk
        CHECK (delivery_month IS NULL OR delivery_month BETWEEN 6 AND 12);

ALTER TABLE public.visibility_roadmap_items
    DROP CONSTRAINT IF EXISTS visibility_roadmap_items_delivery_week_chk,
    ADD CONSTRAINT visibility_roadmap_items_delivery_week_chk
        CHECK (delivery_week IS NULL OR delivery_week BETWEEN 1 AND 4);

CREATE INDEX IF NOT EXISTS visibility_roadmap_items_delivery_slot_idx
    ON public.visibility_roadmap_items (delivery_month, delivery_week);
