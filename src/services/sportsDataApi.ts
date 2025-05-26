
import { useQuery } from '@tanstack/react-query';
import { Team, Match, League } from '@/types/football';

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
        logo: 'https://placehold.co/60x60?text=LIV',
        form: ['W', 'W', 'D', 'W', 'L'],
        stats: {
          goals: { for: 45, against: 20 },
          possession: 65,
          xG: 2.1,
          shots: 18,
          shotsOnTarget: 8,
          corners: 6
        }
      },
      awayTeam: {
        id: 't2',
        name: 'Manchester United',
        logo: 'https://placehold.co/60x60?text=MUN',
        form: ['W', 'L', 'W', 'D', 'W'],
        stats: {
          goals: { for: 38, against: 25 },
          possession: 58,
          xG: 1.8,
          shots: 15,
          shotsOnTarget: 6,
          corners: 4
        }
      },
      date: '2025-05-20',
      time: '20:00',
      league: 'Premier League',
      homeOdds: 1.85,
      drawOdds: 3.50,
      awayOdds: 4.20,
      predictions: {
        homeScore: 2,
        awayScore: 1,
        winProbability: {
          home: 65,
          draw: 20,
          away: 15
        },
        btts: {
          yes: 70,
          no: 30
        },
        over: {
          value: 2.5,
          probability: 75
        },
        confidence: 75,
        bets: [
          { type: 'Match Winner', pick: 'Home', odds: 1.85, confidence: 75 }
        ]
      },
      status: 'upcoming'
    },
    {
      id: 'm2',
      homeTeam: {
        id: 't3',
        name: 'Barcelona',
        logo: 'https://placehold.co/60x60?text=BAR',
        form: ['W', 'W', 'W', 'D', 'W'],
        stats: {
          goals: { for: 52, against: 18 },
          possession: 68,
          xG: 2.3,
          shots: 20,
          shotsOnTarget: 9,
          corners: 7
        }
      },
      awayTeam: {
        id: 't4',
        name: 'Real Madrid',
        logo: 'https://placehold.co/60x60?text=RMA',
        form: ['W', 'L', 'W', 'W', 'W'],
        stats: {
          goals: { for: 48, against: 22 },
          possession: 62,
          xG: 2.0,
          shots: 17,
          shotsOnTarget: 7,
          corners: 5
        }
      },
      date: '2025-05-25',
      time: '21:00',
      league: 'La Liga',
      homeOdds: 2.10,
      drawOdds: 3.40,
      awayOdds: 3.20,
      predictions: {
        homeScore: 1,
        awayScore: 1,
        winProbability: {
          home: 45,
          draw: 25,
          away: 30
        },
        btts: {
          yes: 65,
          no: 35
        },
        over: {
          value: 2.5,
          probability: 60
        },
        confidence: 55,
        bets: [
          { type: 'Both Teams to Score', pick: 'Yes', odds: 1.65, confidence: 65 }
        ]
      },
      status: 'upcoming'
    },
    {
      id: 'm3',
      homeTeam: {
        id: 't5',
        name: 'Bayern Munich',
        logo: 'https://placehold.co/60x60?text=BAY',
        form: ['W', 'W', 'W', 'W', 'L'],
        stats: {
          goals: { for: 58, against: 15 },
          possession: 70,
          xG: 2.5,
          shots: 22,
          shotsOnTarget: 10,
          corners: 8
        }
      },
      awayTeam: {
        id: 't6',
        name: 'Dortmund',
        logo: 'https://placehold.co/60x60?text=DOR',
        form: ['L', 'W', 'W', 'D', 'W'],
        stats: {
          goals: { for: 42, against: 28 },
          possession: 55,
          xG: 1.9,
          shots: 16,
          shotsOnTarget: 6,
          corners: 5
        }
      },
      date: '2025-05-18',
      time: '18:30',
      league: 'Bundesliga',
      homeOdds: 1.45,
      drawOdds: 4.20,
      awayOdds: 6.50,
      predictions: {
        homeScore: 3,
        awayScore: 1,
        winProbability: {
          home: 75,
          draw: 15,
          away: 10
        },
        btts: {
          yes: 55,
          no: 45
        },
        over: {
          value: 3.5,
          probability: 80
        },
        confidence: 85,
        bets: [
          { type: 'Match Winner', pick: 'Home', odds: 1.45, confidence: 85 }
        ]
      },
      status: 'upcoming'
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
        logo: 'https://placehold.co/60x60?text=LAL',
        form: ['W', 'L', 'W', 'W', 'L'],
        stats: {
          goals: { for: 112, against: 108 },
          possession: 52,
          xG: 110,
          shots: 88,
          shotsOnTarget: 45,
          corners: 0
        }
      },
      awayTeam: {
        id: 'b-t2',
        name: 'Golden State Warriors',
        logo: 'https://placehold.co/60x60?text=GSW',
        form: ['W', 'W', 'W', 'L', 'W'],
        stats: {
          goals: { for: 118, against: 105 },
          possession: 48,
          xG: 115,
          shots: 92,
          shotsOnTarget: 48,
          corners: 0
        }
      },
      date: '2025-05-19',
      time: '22:00',
      league: 'NBA',
      homeOdds: 2.10,
      drawOdds: 0,  // No draws in basketball
      awayOdds: 1.75,
      predictions: {
        homeScore: 108,
        awayScore: 115,
        winProbability: {
          home: 40,
          draw: 0,
          away: 60
        },
        btts: {
          yes: 0,
          no: 0
        },
        over: {
          value: 220.5,
          probability: 68
        },
        confidence: 68,
        bets: [
          { type: 'Match Winner', pick: 'Away', odds: 1.75, confidence: 68 }
        ]
      },
      status: 'upcoming'
    }
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
        logo: 'https://placehold.co/60x60?text=KC',
        form: ['W', 'W', 'W', 'L', 'W'],
        stats: {
          goals: { for: 28, against: 21 },
          possession: 58,
          xG: 26,
          shots: 65,
          shotsOnTarget: 32,
          corners: 0
        }
      },
      awayTeam: {
        id: 'af-t2',
        name: 'San Francisco 49ers',
        logo: 'https://placehold.co/60x60?text=SF',
        form: ['L', 'W', 'W', 'W', 'W'],
        stats: {
          goals: { for: 24, against: 18 },
          possession: 42,
          xG: 22,
          shots: 58,
          shotsOnTarget: 28,
          corners: 0
        }
      },
      date: '2025-05-22',
      time: '19:30',
      league: 'NFL',
      homeOdds: 1.90,
      drawOdds: 0,  // No draws in American football
      awayOdds: 1.95,
      predictions: {
        homeScore: 24,
        awayScore: 21,
        winProbability: {
          home: 53,
          draw: 0,
          away: 47
        },
        btts: {
          yes: 0,
          no: 0
        },
        over: {
          value: 44.5,
          probability: 58
        },
        confidence: 58,
        bets: [
          { type: 'Match Winner', pick: 'Home', odds: 1.90, confidence: 58 }
        ]
      },
      status: 'upcoming'
    }
  ];
};

const fetchLeagues = async (sport: string): Promise<League[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (sport === 'football') {
    return [
      { id: 'l1', name: 'Premier League', country: 'England', logo: 'https://placehold.co/50x50?text=PL', season: '2024-25' },
      { id: 'l2', name: 'La Liga', country: 'Spain', logo: 'https://placehold.co/50x50?text=LL', season: '2024-25' },
      { id: 'l3', name: 'Bundesliga', country: 'Germany', logo: 'https://placehold.co/50x50?text=BL', season: '2024-25' },
      { id: 'l4', name: 'Serie A', country: 'Italy', logo: 'https://placehold.co/50x50?text=SA', season: '2024-25' },
      { id: 'l5', name: 'Ligue 1', country: 'France', logo: 'https://placehold.co/50x50?text=L1', season: '2024-25' },
    ];
  } else if (sport === 'basketball') {
    return [
      { id: 'l6', name: 'NBA', country: 'USA', logo: 'https://placehold.co/50x50?text=NBA', season: '2024-25' },
      { id: 'l7', name: 'EuroLeague', country: 'Europe', logo: 'https://placehold.co/50x50?text=EL', season: '2024-25' },
    ];
  } else if (sport === 'american-football') {
    return [
      { id: 'l8', name: 'NFL', country: 'USA', logo: 'https://placehold.co/50x50?text=NFL', season: '2024-25' },
      { id: 'l9', name: 'NCAA', country: 'USA', logo: 'https://placehold.co/50x50?text=NCAA', season: '2024-25' },
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
