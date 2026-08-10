WITH payload_topics AS (
    SELECT DISTINCT ON (m.chat_id, m.message_thread_id)
        m.chat_id,
        m.message_thread_id,
        NULLIF(topic.value ->> 'name', '') AS topic_name,
        CASE
            WHEN topic.value ? 'icon_color' THEN (topic.value ->> 'icon_color')::BIGINT
            ELSE NULL
        END AS icon_color,
        NULLIF(topic.value ->> 'icon_custom_emoji_id', '') AS icon_custom_emoji_id,
        m.raw_payload_json,
        m.received_at_utc
    FROM public.telegram_messages m
    CROSS JOIN LATERAL (
        SELECT jsonb_path_query(m.raw_payload_json::JSONB, '$.**.forum_topic_created') AS value
        UNION ALL
        SELECT jsonb_path_query(m.raw_payload_json::JSONB, '$.**.forum_topic_edited') AS value
    ) topic
    WHERE m.chat_id IS NOT NULL
      AND m.message_thread_id IS NOT NULL
      AND NULLIF(topic.value ->> 'name', '') IS NOT NULL
    ORDER BY m.chat_id, m.message_thread_id, m.received_at_utc DESC NULLS LAST
)
INSERT INTO public.telegram_topics (
    chat_id,
    message_thread_id,
    topic_name,
    icon_color,
    icon_custom_emoji_id,
    raw_payload_json,
    updated_at_utc
)
SELECT
    chat_id,
    message_thread_id,
    topic_name,
    icon_color,
    icon_custom_emoji_id,
    raw_payload_json,
    NOW()
FROM payload_topics
ON CONFLICT (chat_id, message_thread_id) DO UPDATE
SET
    topic_name = EXCLUDED.topic_name,
    icon_color = COALESCE(EXCLUDED.icon_color, public.telegram_topics.icon_color),
    icon_custom_emoji_id = COALESCE(EXCLUDED.icon_custom_emoji_id, public.telegram_topics.icon_custom_emoji_id),
    raw_payload_json = COALESCE(EXCLUDED.raw_payload_json, public.telegram_topics.raw_payload_json),
    updated_at_utc = NOW();

UPDATE public.telegram_messages m
SET
    topic_name = t.topic_name,
    topic_icon_color = COALESCE(m.topic_icon_color, t.icon_color),
    topic_icon_custom_emoji_id = COALESCE(m.topic_icon_custom_emoji_id, t.icon_custom_emoji_id)
FROM public.telegram_topics t
WHERE m.chat_id = t.chat_id
  AND m.message_thread_id = t.message_thread_id
  AND t.topic_name IS NOT NULL
  AND t.topic_name <> ''
  AND (
      m.topic_name IS NULL
      OR m.topic_name = ''
      OR m.topic_name ~ '^#[0-9]+$'
      OR m.topic_name <> t.topic_name
  );
