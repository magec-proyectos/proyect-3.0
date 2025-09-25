import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const sportsGameOddsApiKey = Deno.env.get('SPORTSGAMEODDS_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface SportsGameOddsMatch {
  id: string;
  sport: string;
  league: string;
  home_team: string;
  away_team: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
  odds?: {
    home: number;
    draw?: number;
    away: number;
  };
  venue?: string;
  country?: string;
}

interface DatabaseMatch {
  external_id: string;
  sport_type: string;
  league: string;
  home_team: string;
  away_team: string;
  match_date: string;
  status: string;
  home_score: number;
  away_score: number;
  odds_home: number | null;
  odds_draw: number | null;
  odds_away: number | null;
  data_source: string;
  venue: string | null;
  country: string | null;
  priority_level: number;
  market_types: string[];
  live_stats: Record<string, any>;
  betting_trends: Record<string, any>;
}

async function fetchSportsData(sport: string): Promise<SportsGameOddsMatch[]> {
  const baseUrl = 'https://api.sportsgameodds.com';
  const endpoints = {
    football: '/v1/sports/football/fixtures',
    basketball: '/v1/sports/basketball/fixtures',
    american_football: '/v1/sports/american-football/fixtures'
  };

  const endpoint = endpoints[sport as keyof typeof endpoints];
  if (!endpoint) {
    throw new Error(`Unsupported sport: ${sport}`);
  }

  const url = `${baseUrl}${endpoint}`;
  console.log(`Fetching data from: ${url}`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${sportsGameOddsApiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}):`, errorText);
    throw new Error(`Failed to fetch ${sport} data: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log(`Successfully fetched ${data.length || 0} ${sport} matches`);
  
  return data.fixtures || data.matches || data || [];
}

function transformToDbFormat(apiMatch: SportsGameOddsMatch, sport: string): DatabaseMatch {
  // Map sport types to our database format
  const sportMapping = {
    'football': 'football',
    'basketball': 'basketball', 
    'american_football': 'american_football'
  };

  // Determine priority level based on league
  const getPriorityLevel = (league: string): number => {
    const highPriorityLeagues = ['Premier League', 'La Liga', 'UEFA Champions League', 'NBA', 'NFL'];
    const mediumPriorityLeagues = ['Bundesliga', 'Serie A', 'Ligue 1', 'NCAA Basketball', 'NCAA Football'];
    
    if (highPriorityLeagues.some(l => league.includes(l))) return 5;
    if (mediumPriorityLeagues.some(l => league.includes(l))) return 4;
    return 3;
  };

  // Generate market types based on sport and status
  const getMarketTypes = (sport: string, status: string): string[] => {
    const baseMarkets = ['match_winner'];
    
    if (sport === 'football') {
      baseMarkets.push('over_under_2_5', 'btts');
      if (status === 'upcoming') baseMarkets.push('correct_score');
    } else if (sport === 'basketball') {
      baseMarkets.push('over_under_points', 'handicap');
    } else if (sport === 'american_football') {
      baseMarkets.push('over_under_points', 'handicap', 'touchdowns');
    }
    
    return baseMarkets;
  };

  // Generate realistic live stats for live matches
  const getLiveStats = (sport: string, status: string): Record<string, any> => {
    if (status !== 'live') return {};
    
    if (sport === 'football') {
      return {
        possession: { home: Math.floor(Math.random() * 40) + 30, away: Math.floor(Math.random() * 40) + 30 },
        shots: { home: Math.floor(Math.random() * 15), away: Math.floor(Math.random() * 15) },
        corners: { home: Math.floor(Math.random() * 10), away: Math.floor(Math.random() * 10) }
      };
    }
    
    return {};
  };

  // Generate betting trends
  const getBettingTrends = (odds: any): Record<string, any> => {
    if (!odds) return {};
    
    const movements = ['+0.05', '-0.05', '+0.10', '-0.10', '+0.15', '-0.15'];
    const volumes = ['low', 'medium', 'high', 'very_high'];
    
    return {
      movement: {
        home: movements[Math.floor(Math.random() * movements.length)],
        draw: odds.draw ? movements[Math.floor(Math.random() * movements.length)] : undefined,
        away: movements[Math.floor(Math.random() * movements.length)]
      },
      volume: volumes[Math.floor(Math.random() * volumes.length)]
    };
  };

  return {
    external_id: `sgo-${apiMatch.id}`,
    sport_type: sportMapping[sport as keyof typeof sportMapping] || sport,
    league: apiMatch.league,
    home_team: apiMatch.home_team,
    away_team: apiMatch.away_team,
    match_date: apiMatch.match_date,
    status: apiMatch.status,
    home_score: apiMatch.home_score || 0,
    away_score: apiMatch.away_score || 0,
    odds_home: apiMatch.odds?.home || null,
    odds_draw: apiMatch.odds?.draw || null,
    odds_away: apiMatch.odds?.away || null,
    data_source: 'sportsgameodds',
    venue: apiMatch.venue || null,
    country: apiMatch.country || null,
    priority_level: getPriorityLevel(apiMatch.league),
    market_types: getMarketTypes(sport, apiMatch.status),
    live_stats: getLiveStats(sport, apiMatch.status),
    betting_trends: getBettingTrends(apiMatch.odds)
  };
}

async function updateDatabase(matches: DatabaseMatch[]): Promise<void> {
  if (matches.length === 0) {
    console.log('No matches to update');
    return;
  }

  console.log(`Updating database with ${matches.length} matches`);

  // Upsert matches
  const { error } = await supabase
    .from('sports_matches')
    .upsert(matches, { 
      onConflict: 'external_id',
      ignoreDuplicates: false 
    });

  if (error) {
    console.error('Database update error:', error);
    throw error;
  }

  console.log('Database updated successfully');
}

async function updateApiConfig(apiName: string, success: boolean, errorMessage?: string): Promise<void> {
  // Get current counts first
  const { data: currentConfig } = await supabase
    .from('api_configurations')
    .select('success_count, error_count')
    .eq('api_name', apiName)
    .single();

  const updateData = success 
    ? {
        last_successful_call: new Date().toISOString(),
        success_count: (currentConfig?.success_count || 0) + 1,
        error_count: Math.max((currentConfig?.error_count || 0) - 1, 0)
      }
    : {
        error_count: (currentConfig?.error_count || 0) + 1
      };

  await supabase
    .from('api_configurations')
    .update(updateData)
    .eq('api_name', apiName);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting SportsGameOdds data fetch...');

    const { sport = 'football' } = await req.json().catch(() => ({ sport: 'football' }));
    
    // Validate sport parameter
    const validSports = ['football', 'basketball', 'american_football'];
    if (!validSports.includes(sport)) {
      throw new Error(`Invalid sport: ${sport}. Valid sports: ${validSports.join(', ')}`);
    }

    // Fetch data from SportsGameOdds API
    const apiMatches = await fetchSportsData(sport);
    
    // Transform to database format
    const dbMatches = apiMatches.map(match => transformToDbFormat(match, sport));
    
    // Update database
    await updateDatabase(dbMatches);
    
    // Update API configuration success
    await updateApiConfig('SportsGameOdds', true);

    // Update scraping metadata
    const { data: currentMeta } = await supabase
      .from('scraping_metadata')
      .select('success_count, error_count')
      .eq('data_source', 'sportsgameodds')
      .single();

    await supabase
      .from('scraping_metadata')
      .upsert({
        data_source: 'sportsgameodds',
        last_scraped: new Date().toISOString(),
        success_count: (currentMeta?.success_count || 0) + 1,
        error_count: Math.max((currentMeta?.error_count || 0) - 1, 0)
      }, { 
        onConflict: 'data_source' 
      });

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully fetched and stored ${dbMatches.length} ${sport} matches`,
      sport,
      matchesCount: dbMatches.length,
      lastUpdate: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in SportsGameOdds data fetch:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Update API configuration error
    await updateApiConfig('SportsGameOdds', false, errorMessage);

    // Update scraping metadata error
    const { data: currentErrorMeta } = await supabase
      .from('scraping_metadata')
      .select('error_count')
      .eq('data_source', 'sportsgameodds')
      .single();

    await supabase
      .from('scraping_metadata')
      .upsert({
        data_source: 'sportsgameodds',
        error_count: (currentErrorMeta?.error_count || 0) + 1,
        last_error: errorMessage
      }, { 
        onConflict: 'data_source' 
      });

    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});