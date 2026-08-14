DROP POLICY IF EXISTS "visibility_sender_labels_no_public_access" ON public.visibility_sender_labels;
CREATE POLICY "visibility_sender_labels_no_public_access"
    ON public.visibility_sender_labels
    FOR ALL
    USING (false)
    WITH CHECK (false);
