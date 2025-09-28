
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Match, League } from '@/types/football';

// Enhanced hook to fetch real-time sports matches with SportsGameOdds API integration
export const useRealTimeSportsMatches = (sportType: string = 'football') => {
  return useQuery({
    queryKey: ['realtime-sports-matches', sportType],
    queryFn: async (): Promise<Match[]> => {
      console.log('Fetching real-time sports matches for:', sportType);
      
      // First, trigger data refresh from SportsGameOdds API
      try {
        await supabase.functions.invoke('fetch-sportsgameodds-data', {
          body: { sport: sportType }
        });
        console.log('SportsGameOdds API refresh triggered successfully');
      } catch (error) {
        console.warn('Failed to refresh live data from SportsGameOdds, using cached data:', error);
      }

      // Fetch matches from database
      const { data: matchesData, error: matchesError } = await supabase
        .from('sports_matches')
        .select('*')
        .eq('sport_type', sportType)
        .order('priority_level', { ascending: false })
        .order('match_date', { ascending: true });

      if (matchesError) {
        console.error('Error fetching enhanced sports matches:', matchesError);
        throw matchesError;
      }

      // Fetch competitions separately to avoid join issues
      const { data: competitionsData } = await supabase
        .from('sports_competitions')
        .select('*')
        .eq('sport_type', sportType);

      // Create a map of competitions for easy lookup
      const competitionsMap = new Map();
      if (competitionsData) {
        competitionsData.forEach(comp => {
          competitionsMap.set(comp.external_id, comp);
        });
      }

      // Fetch available betting markets for this sport
      const { data: marketsData } = await supabase
        .from('betting_markets')
        .select('*')
        .eq('sport_type', sportType)
        .eq('is_active', true)
        .order('display_order');

      // Transform database data to Match interface with enhanced features
      return (matchesData || []).map(match => {
        // Get competition data if available
        const competition = competitionsMap.get(match.competition_id);
        
        // Calculate dynamic confidence based on multiple factors
        const baseConfidence = 50;
        const priorityBonus = (match.priority_level || 1) * 10;
        const tierBonus = competition ? (4 - (competition.tier || 1)) * 15 : 0;
        const timeBonus = match.status === 'live' ? 20 : 0;
        const confidence = Math.min(95, baseConfidence + priorityBonus + tierBonus + timeBonus);

        // Enhanced win probability calculation
        const homeOdds = match.odds_home || 2.0;
        const drawOdds = match.odds_draw || 3.2;
        const awayOdds = match.odds_away || 3.5;
        
        const homeProb = Math.round((1 / homeOdds) * 100);
        const drawProb = Math.round((1 / drawOdds) * 100);
        const awayProb = Math.round((1 / awayOdds) * 100);
        
        // Normalize probabilities to sum to 100%
        const total = homeProb + drawProb + awayProb;
        const normalizedHome = Math.round((homeProb / total) * 100);
        const normalizedDraw = Math.round((drawProb / total) * 100);
        const normalizedAway = 100 - normalizedHome - normalizedDraw;

        return {
          id: match.id,
          homeTeam: {
            id: `${match.home_team}-${match.id}`,
            name: match.home_team,
            logo: `https://placehold.co/60x60?text=${match.home_team.substring(0, 3).toUpperCase()}`,
            form: ['W', 'W', 'D', 'W', 'L'],
            stats: {
              goals: { for: 25, against: 15 },
              possession: 55,
              xG: 1.8,
              shots: 15,
              shotsOnTarget: 6,
              corners: 5
            }
          },
          awayTeam: {
            id: `${match.away_team}-${match.id}`,
            name: match.away_team,
            logo: `https://placehold.co/60x60?text=${match.away_team.substring(0, 3).toUpperCase()}`,
            form: ['L', 'W', 'W', 'D', 'W'],
            stats: {
              goals: { for: 20, against: 18 },
              possession: 45,
              xG: 1.5,
              shots: 12,
              shotsOnTarget: 5,
              corners: 3
            }
          },
          date: new Date(match.match_date).toISOString().split('T')[0],
          time: new Date(match.match_date).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
          }),
          league: competition?.name || match.league,
          homeOdds: match.odds_home || 2.0,
          drawOdds: match.odds_draw || 3.2,
          awayOdds: match.odds_away || 3.5,
          predictions: {
            homeScore: Math.floor(Math.random() * 3) + 1,
            awayScore: Math.floor(Math.random() * 3),
            winProbability: {
              home: normalizedHome,
              draw: normalizedDraw,
              away: normalizedAway
            },
            btts: {
              yes: Math.floor(Math.random() * 30) + 50,
              no: Math.floor(Math.random() * 30) + 30
            },
            over: {
              value: 2.5,
              probability: Math.floor(Math.random() * 30) + 50
            },
            confidence: confidence,
            bets: [
              { 
                type: 'Match Winner', 
                pick: normalizedHome > normalizedAway ? 'Home' : 'Away', 
                odds: normalizedHome > normalizedAway ? homeOdds : awayOdds, 
                confidence: confidence 
              },
              ...(marketsData?.slice(0, 3).map(market => ({
                type: market.name,
                pick: 'Yes',
                odds: Math.random() * 2 + 1.5,
                confidence: Math.floor(Math.random() * 30) + 60
              })) || [])
            ]
          },
          status: match.status as 'upcoming' | 'live' | 'finished'
        };
      });
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes for better performance
  });
};

// New hooks specifically for SportsGameOdds API integration
export const useLiveSportsData = (sportType: string = 'football') => {
  return useQuery({
    queryKey: ['live-sports-data', sportType],
    queryFn: async (): Promise<Match[]> => {
      console.log('Fetching live sports data from SportsGameOdds API for:', sportType);
      
      // Trigger fresh data from SportsGameOdds API
      const { data: apiResponse } = await supabase.functions.invoke('fetch-sportsgameodds-data', {
        body: { sport: sportType }
      });

      console.log('SportsGameOdds API Response:', apiResponse);

      // Get updated data from database
      const { data: matchesData, error } = await supabase
        .from('sports_matches')
        .select('*')
        .eq('sport_type', sportType)
        .eq('data_source', 'sportsgameodds')
        .order('priority_level', { ascending: false })
        .order('match_date', { ascending: true });

      if (error) {
        console.error('Error fetching live sports data:', error);
        throw error;
      }

      return transformDatabaseMatches(matchesData || []);
    },
    staleTime: 30 * 1000, // 30 seconds for live data
    refetchInterval: 45 * 1000, // Refresh every 45 seconds for live updates
  });
};

// Manual refresh function for real-time updates
export const useRefreshSportsData = () => {
  const refreshData = async (sport: string = 'football') => {
    console.log('Manually refreshing sports data for:', sport);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-sportsgameodds-data', {
        body: { sport }
      });

      if (error) throw error;

      console.log('Sports data refreshed successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to refresh sports data:', error);
      throw error;
    }
  };

  return { refreshData };
};

// Enhanced hook to fetch competitions with priority and metadata
export const useEnhancedCompetitions = (sportType: string = 'football') => {
  return useQuery({
    queryKey: ['enhanced-competitions', sportType],
    queryFn: async () => {
      console.log('Fetching enhanced competitions for:', sportType);
      
      const { data, error } = await supabase
        .from('sports_competitions')
        .select('*')
        .eq('sport_type', sportType)
        .eq('is_active', true)
        .order('priority_score', { ascending: false });

      if (error) {
        console.error('Error fetching competitions:', error);
        throw error;
      }

      return data;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// Hook to fetch betting markets
export const useBettingMarkets = (sportType: string = 'football') => {
  return useQuery({
    queryKey: ['betting-markets', sportType],
    queryFn: async () => {
      console.log('Fetching betting markets for:', sportType);
      
      const { data, error } = await supabase
        .from('betting_markets')
        .select('*')
        .eq('sport_type', sportType)
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching betting markets:', error);
        throw error;
      }

      return data;
    },
  });
};

// Hook to fetch casino odds
export const useRealTimeCasinoOdds = (gameType?: string) => {
  return useQuery({
    queryKey: ['realtime-casino-odds', gameType],
    queryFn: async () => {
      console.log('Fetching real-time casino odds for:', gameType);
      
      let query = supabase
        .from('casino_odds')
        .select('*')
        .order('scraped_at', { ascending: false });

      if (gameType) {
        query = query.eq('game_type', gameType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching casino odds:', error);
        throw error;
      }

      return data;
    },
    refetchInterval: 60000, // Refetch every minute
  });
};

// Enhanced hook to trigger manual data scraping
export const useTriggerScraping = () => {
  const triggerSportsScraping = async (sport: string = 'football') => {
    console.log(`Triggering sports data fetch for: ${sport}`);
    
    // Map frontend sport names to API format
    const sportMapping: Record<string, string> = {
      'americanFootball': 'american_football',
      'football': 'football',
      'basketball': 'basketball'
    };
    
    const mappedSport = sportMapping[sport] || sport;
    
    const { data, error } = await supabase.functions.invoke('fetch-sportsgameodds-data', {
      body: { sport: mappedSport }
    });
    
    if (error) {
      console.error('Error triggering sports fetch:', error);
      throw error;
    }
    
    console.log('Sports fetch triggered successfully:', data);
    return data;
  };

  const triggerCasinoScraping = async () => {
    console.log('Triggering casino data scraping...');
    
    const { data, error } = await supabase.functions.invoke('scrape-casino-data');
    
    if (error) {
      console.error('Error triggering casino scraping:', error);
      throw error;
    }
    
    return data;
  };

  return { triggerSportsScraping, triggerCasinoScraping };
};

// Transform database format to Match interface for SportsGameOdds data
function transformDatabaseMatches(dbMatches: any[]): Match[] {
  return dbMatches.map(match => ({
    id: match.id,
    homeTeam: {
      id: `${match.home_team}_${match.id}`,
      name: match.home_team,
      logo: getTeamLogo(match.home_team),
      form: generateRandomForm(),
      stats: {
        goals: { for: match.home_score || 0, against: match.away_score || 0 },
        possession: match.live_stats?.possession?.home || 50,
        xG: Math.random() * 3,
        shots: match.live_stats?.shots?.home || Math.floor(Math.random() * 15),
        shotsOnTarget: Math.floor(Math.random() * 8),
        corners: match.live_stats?.corners?.home || Math.floor(Math.random() * 10)
      }
    },
    awayTeam: {
      id: `${match.away_team}_${match.id}`,
      name: match.away_team,
      logo: getTeamLogo(match.away_team),
      form: generateRandomForm(),
      stats: {
        goals: { for: match.away_score || 0, against: match.home_score || 0 },
        possession: match.live_stats?.possession?.away || 50,
        xG: Math.random() * 3,
        shots: match.live_stats?.shots?.away || Math.floor(Math.random() * 15),
        shotsOnTarget: Math.floor(Math.random() * 8),
        corners: match.live_stats?.corners?.away || Math.floor(Math.random() * 10)
      }
    },
    date: match.match_date,
    time: new Date(match.match_date).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }),
    league: match.league,
    homeOdds: match.odds_home || 2.5,
    drawOdds: match.odds_draw || 3.2,
    awayOdds: match.odds_away || 2.8,
    status: match.status as 'upcoming' | 'live' | 'finished',
    predictions: {
      homeScore: match.home_score || Math.floor(Math.random() * 3),
      awayScore: match.away_score || Math.floor(Math.random() * 3),
      winProbability: {
        home: calculateWinProbability(match.odds_home || 2.5),
        draw: calculateWinProbability(match.odds_draw || 3.2),
        away: calculateWinProbability(match.odds_away || 2.8)
      },
      btts: {
        yes: 55 + Math.random() * 20,
        no: 45 - Math.random() * 20
      },
      over: {
        value: 2.5,
        probability: 60 + Math.random() * 20
      },
      confidence: match.priority_level ? match.priority_level * 20 : 75,
      bets: generateBets(match),
      recommended: getBestBet(match)
    }
  }));
}

// Helper functions for data transformation
function getTeamLogo(teamName: string): string {
  const logoMap: Record<string, string> = {
    'Manchester City': '/lovable-uploads/47a02565-17b2-48ae-8b66-2a7dd7bb0e06.png',
    'Arsenal': '/lovable-uploads/4c6104c3-e8cc-4051-b1a7-84d7f8a1d5dd.png',
    'Liverpool': '/lovable-uploads/77e0ad3f-f163-4ddc-9071-88dad9b24d85.png',
    'Chelsea': '/lovable-uploads/8612b727-d03a-4e04-887c-05e6beeda2b1.png',
    'Real Madrid': '/lovable-uploads/2418d250-be60-4431-a20f-d5515ca78132.png',
    'Barcelona': '/lovable-uploads/662235b7-184c-447e-b1a6-5d796396aaab.png',
    'Bayern Munich': '/lovable-uploads/816d62f4-7b52-4389-afd5-03dcab68d2da.png',
    'Borussia Dortmund': '/lovable-uploads/158a61d4-99dd-4969-80d8-1708ade8bb66.png'
  };
  
  return logoMap[teamName] || '/lovable-uploads/096710cc-8897-405e-93b7-5a5659000837.png';
}

function generateRandomForm(): readonly ('w' | 'l' | 'd' | 'W' | 'L' | 'D')[] {
  const forms = ['w', 'l', 'd', 'W', 'L', 'D'] as const;
  return Array.from({ length: 5 }, () => forms[Math.floor(Math.random() * forms.length)]);
}

function calculateWinProbability(odds: number): number {
  return Math.round((1 / odds) * 100);
}

function generateBets(match: any): any[] {
  const bets = [
    {
      type: 'Match Winner',
      pick: match.odds_home < match.odds_away ? match.home_team : match.away_team,
      odds: Math.min(match.odds_home || 2.5, match.odds_away || 2.8),
      confidence: match.priority_level ? match.priority_level * 20 : 75
    }
  ];

  if (match.odds_home && match.odds_away && (match.odds_home + match.odds_away) < 5) {
    bets.push({
      type: 'Both Teams to Score',
      pick: 'Yes',
      odds: 1.8 + Math.random() * 0.4,
      confidence: 65 + Math.random() * 20
    });
  }

  return bets;
}

function getBestBet(match: any): string {
  const homeOdds = match.odds_home || 2.5;
  const awayOdds = match.odds_away || 2.8;
  
  if (homeOdds < awayOdds && homeOdds < 2.0) {
    return `${match.home_team} to win`;
  } else if (awayOdds < homeOdds && awayOdds < 2.0) {
    return `${match.away_team} to win`;
  }
  
  return 'Both Teams to Score - Yes';
}

// Real-time subscription hook for live updates
export const useRealTimeUpdates = (tableName: 'sports_matches' | 'casino_odds' | 'sports_competitions' | 'betting_markets') => {
  const [updates, setUpdates] = React.useState<any[]>([]);

  React.useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          setUpdates(prev => [...prev, payload]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName]);

  return updates;
};
