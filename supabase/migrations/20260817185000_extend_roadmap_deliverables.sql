ALTER TABLE public.visibility_roadmap_items
    ADD COLUMN IF NOT EXISTS product_id BIGINT REFERENCES public.visibility_products(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS subproduct_id BIGINT REFERENCES public.visibility_products(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS dependencies_json JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS visibility_roadmap_items_product_idx
    ON public.visibility_roadmap_items (product_id);

CREATE INDEX IF NOT EXISTS visibility_roadmap_items_subproduct_idx
    ON public.visibility_roadmap_items (subproduct_id);
