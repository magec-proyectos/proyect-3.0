
import { useQuery } from '@tanstack/react-query';

export type Team = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  winPercentage: number;
  recentForm: ('W' | 'L' | 'D')[];
};

export type Match = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  league: string;
  stadium: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  predictions: {
    homeWinProbability: number;
    drawProbability: number;
    awayWinProbability: number;
    recommended: 'home' | 'draw' | 'away' | null;
    confidence: number;
  };
  status?: 'scheduled' | 'live' | 'finished';
  score?: {
    home: number;
    away: number;
  };
};

export type League = {
  id: string;
  name: string;
  country: string;
  logo: string;
};

// Mock data fetching functions - would be replaced with real API calls
const fetchFootballMatches = async (): Promise<Match[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    {
      id: 'm1',
      homeTeam: {
        id: 't1',
        name: 'Liverpool',
        shortName: 'LIV',
        logo: 'https://placehold.co/60x60?text=LIV',
        winPercentage: 0.75,
        recentForm: ['W', 'W', 'D', 'W', 'L']
      },
      awayTeam: {
        id: 't2',
        name: 'Manchester United',
        shortName: 'MUN',
        logo: 'https://placehold.co/60x60?text=MUN',
        winPercentage: 0.6,
        recentForm: ['W', 'L', 'W', 'D', 'W']
      },
      date: '2025-05-20',
      time: '20:00',
      league: 'Premier League',
      stadium: 'Anfield',
      homeOdds: 1.85,
      drawOdds: 3.50,
      awayOdds: 4.20,
      predictions: {
        homeWinProbability: 0.65,
        drawProbability: 0.20,
        awayWinProbability: 0.15,
        recommended: 'home',
        confidence: 0.75
      }
    },
    {
      id: 'm2',
      homeTeam: {
        id: 't3',
        name: 'Barcelona',
        shortName: 'BAR',
        logo: 'https://placehold.co/60x60?text=BAR',
        winPercentage: 0.80,
        recentForm: ['W', 'W', 'W', 'D', 'W']
      },
      awayTeam: {
        id: 't4',
        name: 'Real Madrid',
        shortName: 'RMA',
        logo: 'https://placehold.co/60x60?text=RMA',
        winPercentage: 0.78,
        recentForm: ['W', 'L', 'W', 'W', 'W']
      },
      date: '2025-05-25',
      time: '21:00',
      league: 'La Liga',
      stadium: 'Camp Nou',
      homeOdds: 2.10,
      drawOdds: 3.40,
      awayOdds: 3.20,
      predictions: {
        homeWinProbability: 0.45,
        drawProbability: 0.25,
        awayWinProbability: 0.30,
        recommended: null,
        confidence: 0.55
      }
    },
    {
      id: 'm3',
      homeTeam: {
        id: 't5',
        name: 'Bayern Munich',
        shortName: 'BAY',
        logo: 'https://placehold.co/60x60?text=BAY',
        winPercentage: 0.82,
        recentForm: ['W', 'W', 'W', 'W', 'L']
      },
      awayTeam: {
        id: 't6',
        name: 'Dortmund',
        shortName: 'DOR',
        logo: 'https://placehold.co/60x60?text=DOR',
        winPercentage: 0.65,
        recentForm: ['L', 'W', 'W', 'D', 'W']
      },
      date: '2025-05-18',
      time: '18:30',
      league: 'Bundesliga',
      stadium: 'Allianz Arena',
      homeOdds: 1.45,
      drawOdds: 4.20,
      awayOdds: 6.50,
      predictions: {
        homeWinProbability: 0.75,
        drawProbability: 0.15,
        awayWinProbability: 0.10,
        recommended: 'home',
        confidence: 0.85
      }
    }
  ];
};

const fetchBasketballMatches = async (): Promise<Match[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data for basketball
  return [
    {
      id: 'b1',
      homeTeam: {
        id: 'b-t1',
        name: 'LA Lakers',
        shortName: 'LAL',
        logo: 'https://placehold.co/60x60?text=LAL',
        winPercentage: 0.65,
        recentForm: ['W', 'L', 'W', 'W', 'L']
      },
      awayTeam: {
        id: 'b-t2',
        name: 'Golden State Warriors',
        shortName: 'GSW',
        logo: 'https://placehold.co/60x60?text=GSW',
        winPercentage: 0.72,
        recentForm: ['W', 'W', 'W', 'L', 'W']
      },
      date: '2025-05-19',
      time: '22:00',
      league: 'NBA',
      stadium: 'Crypto.com Arena',
      homeOdds: 2.10,
      drawOdds: 0,  // No draws in basketball
      awayOdds: 1.75,
      predictions: {
        homeWinProbability: 0.40,
        drawProbability: 0,
        awayWinProbability: 0.60,
        recommended: 'away',
        confidence: 0.68
      }
    },
    // Add more basketball matches as needed
  ];
};

const fetchAmericanFootballMatches = async (): Promise<Match[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data for American football
  return [
    {
      id: 'af1',
      homeTeam: {
        id: 'af-t1',
        name: 'Kansas City Chiefs',
        shortName: 'KC',
        logo: 'https://placehold.co/60x60?text=KC',
        winPercentage: 0.78,
        recentForm: ['W', 'W', 'W', 'L', 'W']
      },
      awayTeam: {
        id: 'af-t2',
        name: 'San Francisco 49ers',
        shortName: 'SF',
        logo: 'https://placehold.co/60x60?text=SF',
        winPercentage: 0.70,
        recentForm: ['L', 'W', 'W', 'W', 'W']
      },
      date: '2025-05-22',
      time: '19:30',
      league: 'NFL',
      stadium: 'Arrowhead Stadium',
      homeOdds: 1.90,
      drawOdds: 0,  // No draws in American football
      awayOdds: 1.95,
      predictions: {
        homeWinProbability: 0.53,
        drawProbability: 0,
        awayWinProbability: 0.47,
        recommended: 'home',
        confidence: 0.58
      }
    },
    // Add more American football matches as needed
  ];
};

const fetchLeagues = async (sport: string): Promise<League[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (sport === 'football') {
    return [
      { id: 'l1', name: 'Premier League', country: 'England', logo: 'https://placehold.co/50x50?text=PL' },
      { id: 'l2', name: 'La Liga', country: 'Spain', logo: 'https://placehold.co/50x50?text=LL' },
      { id: 'l3', name: 'Bundesliga', country: 'Germany', logo: 'https://placehold.co/50x50?text=BL' },
      { id: 'l4', name: 'Serie A', country: 'Italy', logo: 'https://placehold.co/50x50?text=SA' },
      { id: 'l5', name: 'Ligue 1', country: 'France', logo: 'https://placehold.co/50x50?text=L1' },
    ];
  } else if (sport === 'basketball') {
    return [
      { id: 'l6', name: 'NBA', country: 'USA', logo: 'https://placehold.co/50x50?text=NBA' },
      { id: 'l7', name: 'EuroLeague', country: 'Europe', logo: 'https://placehold.co/50x50?text=EL' },
    ];
  } else if (sport === 'american-football') {
    return [
      { id: 'l8', name: 'NFL', country: 'USA', logo: 'https://placehold.co/50x50?text=NFL' },
      { id: 'l9', name: 'NCAA', country: 'USA', logo: 'https://placehold.co/50x50?text=NCAA' },
    ];
  }
  
  return [];
};

// React Query hooks for easy data fetching
export const useFootballMatches = () => {
  return useQuery({
    queryKey: ['footballMatches'],
    queryFn: fetchFootballMatches,
  });
};

export const useBasketballMatches = () => {
  return useQuery({
    queryKey: ['basketballMatches'],
    queryFn: fetchBasketballMatches,
  });
};

export const useAmericanFootballMatches = () => {
  return useQuery({
    queryKey: ['americanFootballMatches'],
    queryFn: fetchAmericanFootballMatches,
  });
};

export const useLeagues = (sport: string) => {
  return useQuery({
    queryKey: ['leagues', sport],
    queryFn: () => fetchLeagues(sport),
  });
};
