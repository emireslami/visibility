ALTER TABLE public.visibility_roadmap_items
    ADD COLUMN IF NOT EXISTS parent_roadmap_id BIGINT REFERENCES public.visibility_roadmap_items(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS team_id BIGINT REFERENCES public.visibility_user_groups(id) ON DELETE SET NULL;

ALTER TABLE public.visibility_roadmap_items
    DROP CONSTRAINT IF EXISTS visibility_roadmap_items_not_self_parent;

ALTER TABLE public.visibility_roadmap_items
    ADD CONSTRAINT visibility_roadmap_items_not_self_parent
    CHECK (parent_roadmap_id IS NULL OR parent_roadmap_id <> id);

CREATE INDEX IF NOT EXISTS visibility_roadmap_items_parent_idx
    ON public.visibility_roadmap_items (parent_roadmap_id);

CREATE INDEX IF NOT EXISTS visibility_roadmap_items_team_idx
    ON public.visibility_roadmap_items (team_id);

CREATE OR REPLACE FUNCTION public.visibility_roadmap_items_prevent_parent_cycle()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    current_parent BIGINT;
BEGIN
    current_parent := NEW.parent_roadmap_id;
    WHILE current_parent IS NOT NULL LOOP
        IF current_parent = NEW.id THEN
            RAISE EXCEPTION 'roadmap dependency cycle is not allowed';
        END IF;

        SELECT parent_roadmap_id
        INTO current_parent
        FROM public.visibility_roadmap_items
        WHERE id = current_parent;
    END LOOP;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS visibility_roadmap_items_parent_cycle_guard
    ON public.visibility_roadmap_items;

CREATE TRIGGER visibility_roadmap_items_parent_cycle_guard
    BEFORE INSERT OR UPDATE OF parent_roadmap_id
    ON public.visibility_roadmap_items
    FOR EACH ROW
    EXECUTE FUNCTION public.visibility_roadmap_items_prevent_parent_cycle();
