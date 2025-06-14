
export interface MatchEvent {
  type: 'goal' | 'yellow-card' | 'red-card' | 'substitution';
  time: number;
  team: 'home' | 'away';
  player: string;
  description?: string;
}

export interface BettingTrend {
  type: string;
  homePercentage: number;
  drawPercentage?: number;
  awayPercentage: number;
  movement: 'up' | 'stable' | 'down';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: 'injury' | 'transfer' | 'preview' | 'general';
  imageUrl?: string;
}

export interface TeamStats {
  goals: {
    for: number;
    against: number;
  };
  possession: number;
  xG: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  form: ('w' | 'l' | 'd' | 'W' | 'L' | 'D')[];
  stats: TeamStats;
}

export interface Bet {
  type: string;
  pick: string;
  odds: number;
  confidence: number;
}

export interface Prediction {
  homeScore: number;
  awayScore: number;
  winProbability: {
    home: number;
    draw: number;
    away: number;
  };
  btts: {
    yes: number;
    no: number;
  };
  over: {
    value: number;
    probability: number;
  };
  confidence: number;
  bets: Bet[];
  recommended?: string; // Added this optional property
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  league: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  predictions: Prediction;
  status: 'upcoming' | 'live' | 'finished';
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  season: string;
}
