
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Match, League } from '@/types/football';

// Hook to fetch real-time sports matches from Supabase
export const useRealTimeSportsMatches = (sportType: string = 'football') => {
  return useQuery({
    queryKey: ['realtime-sports-matches', sportType],
    queryFn: async (): Promise<Match[]> => {
      console.log('Fetching real-time sports matches for:', sportType);
      
      const { data, error } = await supabase
        .from('sports_matches')
        .select('*')
        .eq('sport_type', sportType)
        .order('match_date', { ascending: true });

      if (error) {
        console.error('Error fetching sports matches:', error);
        throw error;
      }

      // Transform database data to Match interface
      return data.map(match => ({
        id: match.id,
        homeTeam: {
          id: `${match.home_team}-${match.id}`,
          name: match.home_team,
          logo: `https://placehold.co/60x60?text=${match.home_team.substring(0, 3).toUpperCase()}`,
          form: ['W', 'W', 'D', 'W', 'L'], // Mock form data
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
          form: ['L', 'W', 'W', 'D', 'W'], // Mock form data
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
        league: match.league,
        homeOdds: match.odds_home || 2.0,
        drawOdds: match.odds_draw || 3.2,
        awayOdds: match.odds_away || 3.5,
        predictions: {
          homeScore: Math.floor(Math.random() * 3) + 1,
          awayScore: Math.floor(Math.random() * 3),
          winProbability: {
            home: Math.floor(Math.random() * 40) + 30,
            draw: Math.floor(Math.random() * 20) + 15,
            away: Math.floor(Math.random() * 40) + 20
          },
          btts: {
            yes: Math.floor(Math.random() * 30) + 50,
            no: Math.floor(Math.random() * 30) + 30
          },
          over: {
            value: 2.5,
            probability: Math.floor(Math.random() * 30) + 50
          },
          confidence: Math.floor(Math.random() * 40) + 50,
          bets: [
            { 
              type: 'Match Winner', 
              pick: 'Home', 
              odds: match.odds_home || 2.0, 
              confidence: Math.floor(Math.random() * 40) + 50 
            }
          ]
        },
        status: match.status as 'upcoming' | 'live' | 'finished'
      }));
    },
    refetchInterval: 30000, // Refetch every 30 seconds
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

// Hook to trigger manual data scraping
export const useTriggerScraping = () => {
  const triggerSportsScraping = async () => {
    console.log('Triggering sports data scraping...');
    
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
export const useRealTimeUpdates = (tableName: 'sports_matches' | 'casino_odds') => {
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
