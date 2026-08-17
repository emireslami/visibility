CREATE TABLE IF NOT EXISTS public.visibility_products (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT REFERENCES public.visibility_products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    product_key TEXT,
    owner_email TEXT,
    description TEXT NOT NULL DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_email TEXT,
    updated_by_email TEXT,
    created_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT visibility_products_name_not_empty CHECK (length(btrim(name)) >= 2),
    CONSTRAINT visibility_products_not_self_parent CHECK (parent_id IS NULL OR parent_id <> id)
);

CREATE UNIQUE INDEX IF NOT EXISTS visibility_products_name_unique_idx
    ON public.visibility_products (lower(name));

CREATE UNIQUE INDEX IF NOT EXISTS visibility_products_key_unique_idx
    ON public.visibility_products (lower(product_key))
    WHERE product_key IS NOT NULL AND btrim(product_key) <> '';

CREATE INDEX IF NOT EXISTS visibility_products_parent_idx
    ON public.visibility_products (parent_id);

CREATE INDEX IF NOT EXISTS visibility_products_active_idx
    ON public.visibility_products (is_active);

ALTER TABLE public.visibility_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS visibility_products_no_public_access ON public.visibility_products;
CREATE POLICY visibility_products_no_public_access
    ON public.visibility_products
    FOR ALL
    USING (false)
    WITH CHECK (false);
