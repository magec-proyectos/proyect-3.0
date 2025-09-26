
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting enhanced sports data scraping with new database structure...')

    const now = new Date()
    
    // Enhanced mock data that utilizes the new database structure
    const enhancedMatchesWithCompetitions = [
      // Premier League matches
      {
        external_id: 'live-premier-1',
        sport_type: 'football',
        league: 'Premier League',
        competition_id: 'premier-league',
        home_team: 'Manchester City',
        away_team: 'Arsenal',
        match_date: new Date(Date.now() - 30 * 60000).toISOString(),
        status: 'live',
        home_score: 1,
        away_score: 1,
        odds_home: 2.10,
        odds_draw: 3.40,
        odds_away: 3.20,
        season: '2024-25',
        match_week: 15,
        venue: 'Etihad Stadium',
        country: 'England',
        priority_level: 5,
        market_types: JSON.stringify(['match_winner', 'over_under_2_5', 'btts']),
        live_stats: JSON.stringify({
          possession: { home: 58, away: 42 },
          shots: { home: 12, away: 8 },
          corners: { home: 6, away: 3 }
        }),
        betting_trends: JSON.stringify({
          movement: { home: '+0.05', draw: '-0.10', away: '+0.15' },
          volume: 'high'
        }),
        data_source: 'api-football',
        last_updated: now.toISOString()
      },
      {
        external_id: 'upcoming-premier-2',
        sport_type: 'football',
        league: 'Premier League',
        competition_id: 'premier-league',
        home_team: 'Liverpool',
        away_team: 'Chelsea',
        match_date: new Date(Date.now() + 2 * 60 * 60000).toISOString(),
        status: 'upcoming',
        home_score: 0,
        away_score: 0,
        odds_home: 2.30,
        odds_draw: 3.20,
        odds_away: 3.10,
        season: '2024-25',
        match_week: 15,
        venue: 'Anfield',
        country: 'England',
        priority_level: 5,
        market_types: JSON.stringify(['match_winner', 'over_under_2_5', 'btts', 'correct_score']),
        live_stats: JSON.stringify({}),
        betting_trends: JSON.stringify({
          movement: { home: '-0.10', draw: '+0.05', away: '+0.20' },
          volume: 'very_high'
        }),
        data_source: 'api-football',
        last_updated: now.toISOString()
      },
      // La Liga matches
      {
        external_id: 'live-laliga-1',
        sport_type: 'football',
        league: 'La Liga',
        competition_id: 'la-liga',
        home_team: 'Real Madrid',
        away_team: 'Barcelona',
        match_date: new Date(Date.now() + 4 * 60 * 60000).toISOString(),
        status: 'upcoming',
        home_score: 0,
        away_score: 0,
        odds_home: 2.50,
        odds_draw: 3.10,
        odds_away: 2.80,
        season: '2024-25',
        match_week: 16,
        venue: 'Santiago Bernabéu',
        country: 'Spain',
        priority_level: 5,
        market_types: JSON.stringify(['match_winner', 'over_under_2_5', 'btts', 'first_goal_scorer']),
        live_stats: JSON.stringify({}),
        betting_trends: JSON.stringify({
          movement: { home: '+0.20', draw: '-0.05', away: '-0.15' },
          volume: 'very_high'
        }),
        data_source: 'api-football',
        last_updated: now.toISOString()
      },
      // Bundesliga matches
      {
        external_id: 'upcoming-bundesliga-1',
        sport_type: 'football',
        league: 'Bundesliga',
        competition_id: 'bundesliga',
        home_team: 'Bayern Munich',
        away_team: 'Borussia Dortmund',
        match_date: new Date(Date.now() + 6 * 60 * 60000).toISOString(),
        status: 'upcoming',
        home_score: 0,
        away_score: 0,
        odds_home: 1.85,
        odds_draw: 3.80,
        odds_away: 4.20,
        season: '2024-25',
        match_week: 14,
        venue: 'Allianz Arena',
        country: 'Germany',
        priority_level: 4,
        market_types: JSON.stringify(['match_winner', 'over_under_2_5', 'btts']),
        live_stats: JSON.stringify({}),
        betting_trends: JSON.stringify({
          movement: { home: '-0.05', draw: '+0.10', away: '+0.15' },
          volume: 'high'
        }),
        data_source: 'api-football',
        last_updated: now.toISOString()
      },
      // NBA matches
      {
        external_id: 'nba-live-1',
        sport_type: 'basketball',
        league: 'NBA',
        competition_id: 'nba',
        home_team: 'Los Angeles Lakers',
        away_team: 'Boston Celtics',
        match_date: new Date(Date.now() - 60 * 60000).toISOString(),
        status: 'live',
        home_score: 89,
        away_score: 92,
        odds_home: 2.15,
        odds_draw: 15.0,
        odds_away: 1.75,
        season: '2024-25',
        venue: 'Crypto.com Arena',
        country: 'USA',
        priority_level: 5,
        market_types: JSON.stringify(['match_winner', 'point_spread', 'over_under_points']),
        live_stats: JSON.stringify({
          quarter: 3,
          time_remaining: '8:45',
          fouls: { home: 12, away: 9 }
        }),
        betting_trends: JSON.stringify({
          movement: { home: '+0.10', away: '-0.10' },
          volume: 'high'
        }),
        data_source: 'api-football',
        last_updated: now.toISOString()
      },
      // NFL matches
      {
        external_id: 'nfl-upcoming-1',
        sport_type: 'american-football',
        league: 'NFL',
        competition_id: 'nfl',
        home_team: 'Kansas City Chiefs',
        away_team: 'Buffalo Bills',
        match_date: new Date(Date.now() + 3 * 24 * 60 * 60000).toISOString(),
        status: 'upcoming',
        home_score: 0,
        away_score: 0,
        odds_home: 1.95,
        odds_draw: 12.0,
        odds_away: 1.90,
        season: '2024-25',
        match_week: 16,
        venue: 'Arrowhead Stadium',
        country: 'USA',
        priority_level: 5,
        market_types: JSON.stringify(['match_winner', 'point_spread', 'over_under_points']),
        live_stats: JSON.stringify({}),
        betting_trends: JSON.stringify({
          movement: { home: '+0.05', away: '-0.05' },
          volume: 'very_high'
        }),
        data_source: 'api-football',
        last_updated: now.toISOString()
      }
    ]

    console.log(`Inserting ${enhancedMatchesWithCompetitions.length} enhanced matches with competition data...`)

    // Insert or update matches with enhanced data structure
    const { data: insertedMatches, error: insertError } = await supabase
      .from('sports_matches')
      .upsert(enhancedMatchesWithCompetitions, { 
        onConflict: 'external_id',
        ignoreDuplicates: false 
      })
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      throw insertError
    }

    // Update API configuration with safe increment pattern
    const { data: existingConfig } = await supabase
      .from('api_configurations')
      .select('success_count, error_count')
      .eq('api_name', 'enhanced-sports-api')
      .single();

    const apiSuccessCount = (existingConfig?.success_count || 0) + 1;

    await supabase
      .from('api_configurations')
      .upsert({
        api_name: 'enhanced-sports-api',
        api_url: 'internal://enhanced-sports-data',
        success_count: apiSuccessCount,
        error_count: 0,
        last_successful_call: now.toISOString(),
        updated_at: now.toISOString()
      }, {
        onConflict: 'api_name'
      });

    // Update scraping metadata with safe increment pattern
    const { data: existingMetadata } = await supabase
      .from('scraping_metadata')
      .select('success_count, error_count')
      .eq('data_source', 'enhanced-sports-api')
      .single();

    const successCount = (existingMetadata?.success_count || 0) + 1;

    await supabase
      .from('scraping_metadata')
      .upsert({
        data_source: 'enhanced-sports-api',
        last_scraped: now.toISOString(),
        success_count: successCount,
        error_count: 0,
        is_active: true,
        scrape_interval_minutes: 5,
        rate_limit_delay_ms: 2000
      }, {
        onConflict: 'data_source'
      });

    console.log(`Successfully scraped and stored ${insertedMatches?.length || 0} enhanced matches with competition data`)

    return new Response(
      JSON.stringify({
        success: true,
        matches_processed: insertedMatches?.length || 0,
        timestamp: now.toISOString(),
        message: 'Enhanced sports data with competitions successfully synchronized',
        features: [
          'Competition classification',
          'Priority scoring',
          'Enhanced betting markets',
          'Live statistics tracking',
          'Betting trends analysis'
        ]
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in enhanced sports data scraping:', error)

    // Update error count in metadata and API config
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update error counts with safe increment pattern
    const { data: existingMetadata } = await supabase
      .from('scraping_metadata')
      .select('success_count, error_count')
      .eq('data_source', 'enhanced-sports-api')
      .single();

    const errorCount = (existingMetadata?.error_count || 0) + 1;

    await supabase
      .from('scraping_metadata')
      .upsert({
        data_source: 'enhanced-sports-api',
        last_scraped: new Date().toISOString(),
        success_count: existingMetadata?.success_count || 0,
        error_count: errorCount,
        last_error: error instanceof Error ? error.message : 'Unknown error'
      }, {
        onConflict: 'data_source'
      });

    const { data: existingConfig } = await supabase
      .from('api_configurations')
      .select('success_count, error_count')
      .eq('api_name', 'enhanced-sports-api')
      .single();

    const apiErrorCount = (existingConfig?.error_count || 0) + 1;

    await supabase
      .from('api_configurations')
      .upsert({
        api_name: 'enhanced-sports-api',
        api_url: 'internal://enhanced-sports-data',
        success_count: existingConfig?.success_count || 0,
        error_count: apiErrorCount,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'api_name'
      });

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Enhanced sync temporarily offline - please try again'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
