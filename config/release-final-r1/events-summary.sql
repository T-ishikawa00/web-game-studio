-- DESIGN ONLY. No database/collector/account has been created.
-- Hypothetical Analytics Engine mapping: blob1=event, blob2=gameId,
-- blob3=locale, blob4=progressBucket, blob5=errorCode. Server timestamp only.
-- Dataset name must be confirmed before authorized use. No token belongs here.
SELECT toStartOfDay(timestamp) AS day,
       blob2 AS game_id, blob3 AS locale, blob1 AS event,
       blob4 AS progress_bucket, blob5 AS error_code,
       SUM(_sample_interval) AS estimated_events
FROM tinlumo_events
WHERE timestamp >= NOW() - INTERVAL '7' DAY
GROUP BY day, game_id, locale, event, progress_bucket, error_code
ORDER BY day, game_id, locale, event, progress_bucket, error_code
