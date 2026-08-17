CREATE TABLE IF NOT EXISTS public.visibility_user_group_products (
    group_id BIGINT NOT NULL REFERENCES public.visibility_user_groups(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES public.visibility_products(id) ON DELETE CASCADE,
    created_at_utc TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (group_id, product_id)
);

CREATE INDEX IF NOT EXISTS visibility_user_group_products_product_idx
    ON public.visibility_user_group_products (product_id);

ALTER TABLE public.visibility_user_group_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS visibility_user_group_products_no_public_access ON public.visibility_user_group_products;
CREATE POLICY visibility_user_group_products_no_public_access
    ON public.visibility_user_group_products
    FOR ALL
    USING (false)
    WITH CHECK (false);
