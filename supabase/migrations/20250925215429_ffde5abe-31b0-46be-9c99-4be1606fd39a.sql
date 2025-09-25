-- Add SportsGameOdds API configuration to the api_configurations table
INSERT INTO public.api_configurations (
  api_name,
  api_url,
  is_active,
  rate_limit_per_minute,
  timeout_seconds,
  priority,
  configuration
) VALUES (
  'SportsGameOdds',
  'https://api.sportsgameodds.com',
  true,
  100,
  30,
  1,
  '{
    "endpoints": {
      "football": "/v1/sports/football/fixtures",
      "basketball": "/v1/sports/basketball/fixtures", 
      "american_football": "/v1/sports/american-football/fixtures",
      "odds": "/v1/odds/match"
    },
    "supported_sports": ["football", "basketball", "american_football"],
    "rate_limit": "100 requests per minute",
    "cache_duration_minutes": 5
  }'::jsonb
)
ON CONFLICT (api_name) DO UPDATE SET
  api_url = EXCLUDED.api_url,
  is_active = EXCLUDED.is_active,
  rate_limit_per_minute = EXCLUDED.rate_limit_per_minute,
  timeout_seconds = EXCLUDED.timeout_seconds,
  priority = EXCLUDED.priority,
  configuration = EXCLUDED.configuration,
  updated_at = now();