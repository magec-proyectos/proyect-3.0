
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Match, League } from '@/types/football';

// Enhanced hook to fetch real-time sports matches with competition data
export const useRealTimeSportsMatches = (sportType: string = 'football') => {
  return useQuery({
    queryKey: ['realtime-sports-matches', sportType],
    queryFn: async (): Promise<Match[]> => {
      console.log('Fetching enhanced real-time sports matches for:', sportType);
      
      // Fetch matches first
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
    refetchInterval: 30000, // Refetch every 30 seconds
  });
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
  const triggerSportsScraping = async () => {
    console.log('Triggering enhanced sports data scraping...');
    
    const { data, error } = await supabase.functions.invoke('scrape-sports-data');
    
    if (error) {
      console.error('Error triggering sports scraping:', error);
      throw error;
    }
    
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
