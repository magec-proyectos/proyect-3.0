-- Update SportsGameOdds API configuration with correct v2 endpoint
UPDATE api_configurations 
SET 
  api_url = 'https://api.sportsgameodds.com/v2/events',
  configuration = jsonb_build_object(
    'version', 'v2',
    'endpoints', jsonb_build_object(
      'events', '/events',
      'sports', '/sports',
      'leagues', '/leagues'
    ),
    'auth_method', 'x-api-key',
    'supported_sports', jsonb_build_array('football', 'basketball', 'american_football'),
    'rate_limit_per_minute', 60,
    'cache_duration_minutes', 15
  ),
  updated_at = now()
WHERE api_name = 'SportsGameOdds';