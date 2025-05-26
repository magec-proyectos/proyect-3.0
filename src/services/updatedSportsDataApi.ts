
import { useQuery } from '@tanstack/react-query';
import { Match, League } from '@/types/football';
import { useRealTimeSportsMatches } from './realTimeSportsApi';

// Updated hooks that use real Supabase data
export const useFootballMatches = () => {
  return useRealTimeSportsMatches('football');
};

export const useBasketballMatches = () => {
  return useRealTimeSportsMatches('basketball');
};

export const useAmericanFootballMatches = () => {
  return useRealTimeSportsMatches('american-football');
};

export const useLeagues = (sport: string) => {
  return useQuery({
    queryKey: ['leagues', sport],
    queryFn: async (): Promise<League[]> => {
      // This could also be enhanced to fetch from a leagues table in the future
      const mockLeagues = {
        football: [
          { id: 'l1', name: 'Premier League', country: 'England', logo: 'https://placehold.co/50x50?text=PL', season: '2024-25' },
          { id: 'l2', name: 'La Liga', country: 'Spain', logo: 'https://placehold.co/50x50?text=LL', season: '2024-25' },
          { id: 'l3', name: 'Bundesliga', country: 'Germany', logo: 'https://placehold.co/50x50?text=BL', season: '2024-25' },
          { id: 'l4', name: 'Serie A', country: 'Italy', logo: 'https://placehold.co/50x50?text=SA', season: '2024-25' },
          { id: 'l5', name: 'Ligue 1', country: 'France', logo: 'https://placehold.co/50x50?text=L1', season: '2024-25' },
        ],
        basketball: [
          { id: 'l6', name: 'NBA', country: 'USA', logo: 'https://placehold.co/50x50?text=NBA', season: '2024-25' },
          { id: 'l7', name: 'EuroLeague', country: 'Europe', logo: 'https://placehold.co/50x50?text=EL', season: '2024-25' },
        ],
        'american-football': [
          { id: 'l8', name: 'NFL', country: 'USA', logo: 'https://placehold.co/50x50?text=NFL', season: '2024-25' },
          { id: 'l9', name: 'NCAA', country: 'USA', logo: 'https://placehold.co/50x50?text=NCAA', season: '2024-25' },
        ]
      };
      
      return mockLeagues[sport as keyof typeof mockLeagues] || [];
    },
  });
};
