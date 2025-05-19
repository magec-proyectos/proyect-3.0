
import { MatchEvent, BettingTrend, NewsItem, Team, Prediction } from '@/types/football';

export const matchEvents: MatchEvent[] = [
  { 
    type: 'goal', 
    time: 23, 
    team: 'home', 
    player: 'Mohamed Salah', 
    description: 'Goal from penalty spot after handball' 
  },
  { 
    type: 'yellow-card', 
    time: 38, 
    team: 'away', 
    player: 'Bruno Fernandes', 
    description: 'Late tackle on Henderson' 
  },
  { 
    type: 'goal', 
    time: 45, 
    team: 'away', 
    player: 'Marcus Rashford', 
    description: 'Counter attack, assisted by Fernandes' 
  },
  { 
    type: 'substitution', 
    time: 63, 
    team: 'home', 
    player: 'Roberto Firmino', 
    description: 'Comes on for Diogo Jota' 
  },
  { 
    type: 'red-card', 
    time: 78, 
    team: 'away', 
    player: 'Harry Maguire', 
    description: 'Second yellow card for dangerous play' 
  },
  { 
    type: 'goal', 
    time: 85, 
    team: 'home', 
    player: 'Roberto Firmino', 
    description: 'Header from corner kick' 
  }
];

export const bettingTrends: BettingTrend[] = [
  {
    type: 'Match Result',
    homePercentage: 63,
    drawPercentage: 21,
    awayPercentage: 16,
    movement: 'up'
  },
  {
    type: 'Both Teams to Score',
    homePercentage: 74, // Yes
    awayPercentage: 26, // No
    movement: 'stable'
  },
  {
    type: 'Over/Under 2.5 Goals',
    homePercentage: 58, // Over
    awayPercentage: 42, // Under
    movement: 'down'
  }
];

export const matchNews: NewsItem[] = [
  {
    id: 'n1',
    title: 'Thiago ruled out for the weekend clash',
    summary: "Liverpool's midfielder Thiago Alcantara will miss the big game against Manchester United due to hamstring injury sustained in training.",
    source: 'Sky Sports',
    date: '2 hours ago',
    category: 'injury'
  },
  {
    id: 'n2',
    title: 'Rashford back in full training ahead of Liverpool clash',
    summary: "Manchester United forward Marcus Rashford has recovered from his minor knock and has been training with the squad since Tuesday.",
    source: 'BBC Sport',
    date: '5 hours ago',
    category: 'injury'
  },
  {
    id: 'n3',
    title: 'Premier League Classic: Liverpool vs Man United - Preview',
    summary: "This weekend's clash between the arch-rivals could have major implications for the top four race.",
    source: 'Guardian',
    date: '1 day ago',
    category: 'preview'
  }
];

export const homeTeam: Team = {
  id: 'liverpool',
  name: 'Liverpool',
  logo: 'https://placehold.co/40?text=LIV',
  form: ['w', 'w', 'd', 'w', 'l'],
  stats: {
    goals: {
      for: 42,
      against: 18,
    },
    possession: 65,
    xG: 45.7,
    shots: 223,
    shotsOnTarget: 98,
    corners: 134,
  }
};

export const awayTeam: Team = {
  id: 'manchester-united',
  name: 'Man United',
  logo: 'https://placehold.co/40?text=MUN',
  form: ['l', 'w', 'l', 'd', 'w'],
  stats: {
    goals: {
      for: 28,
      against: 27,
    },
    possession: 52,
    xG: 30.2,
    shots: 187,
    shotsOnTarget: 72,
    corners: 98,
  }
};

export const prediction: Prediction = {
  homeScore: 2,
  awayScore: 1,
  winProbability: {
    home: 60,
    draw: 25,
    away: 15,
  },
  btts: {
    yes: 65,
    no: 35,
  },
  over: {
    value: 2.5,
    probability: 70,
  },
  confidence: 75,
  bets: [
    {
      type: '1X2',
      pick: 'Home Win',
      odds: 1.85,
      confidence: 60,
    },
    {
      type: 'BTTS',
      pick: 'Yes',
      odds: 1.70,
      confidence: 65,
    },
    {
      type: 'Over/Under',
      pick: 'Over 2.5',
      odds: 1.90,
      confidence: 70,
    },
  ],
};
