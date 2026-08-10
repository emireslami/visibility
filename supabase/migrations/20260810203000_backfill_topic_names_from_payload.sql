WITH payload_topics AS (
    SELECT
        chat_id,
        message_thread_id,
        COALESCE(
            raw_payload_json #>> '{message,forum_topic_created,name}',
            raw_payload_json #>> '{edited_message,forum_topic_created,name}',
            raw_payload_json #>> '{channel_post,forum_topic_created,name}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_created,name}',
            raw_payload_json #>> '{message,forum_topic_edited,name}',
            raw_payload_json #>> '{edited_message,forum_topic_edited,name}',
            raw_payload_json #>> '{channel_post,forum_topic_edited,name}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_edited,name}'
        ) AS topic_name,
        COALESCE(
            (raw_payload_json #>> '{message,forum_topic_created,icon_color}')::BIGINT,
            (raw_payload_json #>> '{edited_message,forum_topic_created,icon_color}')::BIGINT,
            (raw_payload_json #>> '{channel_post,forum_topic_created,icon_color}')::BIGINT,
            (raw_payload_json #>> '{edited_channel_post,forum_topic_created,icon_color}')::BIGINT
        ) AS icon_color,
        COALESCE(
            raw_payload_json #>> '{message,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_message,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{channel_post,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{message,forum_topic_edited,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_message,forum_topic_edited,icon_custom_emoji_id}',
            raw_payload_json #>> '{channel_post,forum_topic_edited,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_edited,icon_custom_emoji_id}'
        ) AS icon_custom_emoji_id,
        raw_payload_json
    FROM public.telegram_messages
    WHERE message_thread_id IS NOT NULL
)
UPDATE public.telegram_messages m
SET
    topic_name = p.topic_name,
    topic_icon_color = COALESCE(m.topic_icon_color, p.icon_color),
    topic_icon_custom_emoji_id = COALESCE(m.topic_icon_custom_emoji_id, p.icon_custom_emoji_id)
FROM payload_topics p
WHERE m.chat_id = p.chat_id
  AND m.message_thread_id = p.message_thread_id
  AND p.topic_name IS NOT NULL
  AND (m.topic_name IS NULL OR m.topic_name = '#' || m.message_thread_id::TEXT);

WITH payload_topics AS (
    SELECT DISTINCT ON (chat_id, message_thread_id)
        chat_id,
        message_thread_id,
        COALESCE(
            raw_payload_json #>> '{message,forum_topic_created,name}',
            raw_payload_json #>> '{edited_message,forum_topic_created,name}',
            raw_payload_json #>> '{channel_post,forum_topic_created,name}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_created,name}',
            raw_payload_json #>> '{message,forum_topic_edited,name}',
            raw_payload_json #>> '{edited_message,forum_topic_edited,name}',
            raw_payload_json #>> '{channel_post,forum_topic_edited,name}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_edited,name}'
        ) AS topic_name,
        COALESCE(
            (raw_payload_json #>> '{message,forum_topic_created,icon_color}')::BIGINT,
            (raw_payload_json #>> '{edited_message,forum_topic_created,icon_color}')::BIGINT,
            (raw_payload_json #>> '{channel_post,forum_topic_created,icon_color}')::BIGINT,
            (raw_payload_json #>> '{edited_channel_post,forum_topic_created,icon_color}')::BIGINT
        ) AS icon_color,
        COALESCE(
            raw_payload_json #>> '{message,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_message,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{channel_post,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_created,icon_custom_emoji_id}',
            raw_payload_json #>> '{message,forum_topic_edited,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_message,forum_topic_edited,icon_custom_emoji_id}',
            raw_payload_json #>> '{channel_post,forum_topic_edited,icon_custom_emoji_id}',
            raw_payload_json #>> '{edited_channel_post,forum_topic_edited,icon_custom_emoji_id}'
        ) AS icon_custom_emoji_id,
        raw_payload_json
    FROM public.telegram_messages
    WHERE chat_id IS NOT NULL
      AND message_thread_id IS NOT NULL
    ORDER BY chat_id, message_thread_id, received_at_utc DESC
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
WHERE topic_name IS NOT NULL
ON CONFLICT (chat_id, message_thread_id) DO UPDATE
SET
    topic_name = EXCLUDED.topic_name,
    icon_color = COALESCE(public.telegram_topics.icon_color, EXCLUDED.icon_color),
    icon_custom_emoji_id = COALESCE(public.telegram_topics.icon_custom_emoji_id, EXCLUDED.icon_custom_emoji_id),
    raw_payload_json = EXCLUDED.raw_payload_json,
    updated_at_utc = NOW();

UPDATE public.telegram_messages
SET
    topic_name = 'Bale Groups',
    topic_icon_color = COALESCE(topic_icon_color, 16766590),
    topic_icon_custom_emoji_id = COALESCE(topic_icon_custom_emoji_id, '5357188789351490453')
WHERE message_thread_id = 12897
  AND (topic_name IS NULL OR topic_name = '#12897');

INSERT INTO public.telegram_topics (
    chat_id,
    message_thread_id,
    topic_name,
    icon_color,
    icon_custom_emoji_id,
    updated_at_utc
)
SELECT DISTINCT
    chat_id,
    12897,
    'Bale Groups',
    16766590,
    '5357188789351490453',
    NOW()
FROM public.telegram_messages
WHERE chat_id IS NOT NULL
  AND message_thread_id = 12897
ON CONFLICT (chat_id, message_thread_id) DO UPDATE
SET
    topic_name = EXCLUDED.topic_name,
    icon_color = COALESCE(public.telegram_topics.icon_color, EXCLUDED.icon_color),
    icon_custom_emoji_id = COALESCE(public.telegram_topics.icon_custom_emoji_id, EXCLUDED.icon_custom_emoji_id),
    updated_at_utc = NOW();
