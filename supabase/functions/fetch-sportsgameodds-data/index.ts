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
  eventID: string;
  sportID: string;
  leagueID: string;
  homeTeam: string;
  awayTeam: string;
  eventDate: string;
  eventStatus: string;
  homeScore?: number;
  awayScore?: number;
  odds?: {
    moneyline?: {
      home?: number;
      draw?: number;
      away?: number;
    };
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
  last_updated: string;
  competition_id: string | null;
  season: string | null;
  match_week: number | null;
  venue: string | null;
  country: string | null;
  priority_level: number;
  market_types: string[];
  live_stats: Record<string, any>;
  betting_trends: Record<string, any>;
}

// Helper function to get sport ID from SportsGameOdds API
async function getSportId(sport: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.sportsgameodds.com/v2/sports', {
      headers: {
        'x-api-key': apiKey,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Sports API Error (${response.status}): ${await response.text()}`);
      return null;
    }

    const sportsData = await response.json();
    console.log('Available sports:', sportsData);

    // Map our sport names to API sport names
    const sportMappings: Record<string, string[]> = {
      'football': ['soccer', 'association football', 'football'],
      'basketball': ['basketball'],
      'american_football': ['american football', 'nfl', 'american_football']
    };

    const searchTerms = sportMappings[sport] || [];
    
    for (const term of searchTerms) {
      const foundSport = sportsData.find((s: any) => 
        s.name?.toLowerCase().includes(term.toLowerCase()) ||
        s.slug?.toLowerCase().includes(term.toLowerCase())
      );
      
      if (foundSport) {
        console.log(`Found sport mapping: ${sport} -> ${foundSport.name} (ID: ${foundSport.id})`);
        return foundSport.id?.toString() || foundSport.slug;
      }
    }

    console.error(`No sport found for: ${sport}`);
    return null;
  } catch (error) {
    console.error('Error fetching sports list:', error);
    return null;
  }
}

// Check rate limiting
async function shouldSkipDueToRateLimit(sport: string, supabase: any): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('scraping_metadata')
      .select('last_scraped')
      .eq('data_source', 'sportsgameodds')
      .single();

    if (data?.last_scraped) {
      const lastScraped = new Date(data.last_scraped);
      const now = new Date();
      const diffSeconds = (now.getTime() - lastScraped.getTime()) / 1000;
      
      if (diffSeconds < 60) {
        console.log(`Rate limit: Last scraped ${diffSeconds}s ago, skipping external call`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log('No rate limit data found, proceeding with API call');
    return false;
  }
}

async function fetchSportsData(sport: string): Promise<SportsGameOddsMatch[]> {
  const sportId = await getSportId(sport, sportsGameOddsApiKey);
  if (!sportId) {
    throw new Error(`Could not find sport ID for: ${sport}`);
  }

  // Try with sport parameter first, then fallback to sportID
  let url = `https://api.sportsgameodds.com/v2/events?sport=${sportId}&status=upcoming,live`;
  console.log('Fetching data from:', url);

  try {
    let response = await fetch(url, {
      headers: {
        'x-api-key': sportsGameOddsApiKey,
        'Accept': 'application/json'
      }
    });

    // If sport parameter fails, try sportID
    if (!response.ok && response.status === 400) {
      url = `https://api.sportsgameodds.com/v2/events?sportID=${sportId}&status=upcoming,live`;
      console.log('Retrying with sportID parameter:', url);
      
      response = await fetch(url, {
        headers: {
          'x-api-key': sportsGameOddsApiKey,
          'Accept': 'application/json'
        }
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`Failed to fetch ${sport} data: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.length || 0} matches for ${sport}`);
    return data || [];
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch ${sport} data: ${errorMessage}`);
  }
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

  // Helper function to get league name from ID
  const getLeagueName = (leagueID: string): string => {
    const leagueMap: Record<string, string> = {
      '1': 'Premier League',
      '2': 'La Liga',
      '3': 'Bundesliga',
      '4': 'Serie A',
      '5': 'Ligue 1',
      '6': 'UEFA Champions League',
      '7': 'UEFA Europa League'
    };
    return leagueMap[leagueID] || `League ${leagueID}`;
  };

  return {
    external_id: `sgo-${apiMatch.eventID}`,
    sport_type: sportMapping[sport as keyof typeof sportMapping] || sport,
    league: getLeagueName(apiMatch.leagueID) || 'Unknown League',
    home_team: apiMatch.homeTeam,
    away_team: apiMatch.awayTeam,
    match_date: apiMatch.eventDate,
    status: apiMatch.eventStatus?.toLowerCase() || 'upcoming',
    home_score: apiMatch.homeScore || 0,
    away_score: apiMatch.awayScore || 0,
    odds_home: apiMatch.odds?.moneyline?.home || null,
    odds_draw: apiMatch.odds?.moneyline?.draw || null,
    odds_away: apiMatch.odds?.moneyline?.away || null,
    data_source: 'sportsgameodds',
    last_updated: new Date().toISOString(),
    competition_id: apiMatch.leagueID || null,
    season: '2024-25',
    match_week: null,
    venue: apiMatch.venue || null,
    country: apiMatch.country || null,
    priority_level: getPriorityLevel(getLeagueName(apiMatch.leagueID)),
    market_types: getMarketTypes(sport, apiMatch.eventStatus?.toLowerCase() || 'upcoming'),
    live_stats: getLiveStats(sport, apiMatch.eventStatus?.toLowerCase() || 'upcoming'),
    betting_trends: getBettingTrends(apiMatch.odds?.moneyline)
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

    // Check rate limiting
    if (await shouldSkipDueToRateLimit(sport, supabase)) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Skipped due to rate limiting',
          matches: 0,
          timestamp: new Date().toISOString() 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
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