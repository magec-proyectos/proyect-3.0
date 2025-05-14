
export type BetType = 
  | 'red' | 'black' 
  | 'odd' | 'even' 
  | '1-18' | '19-36' 
  | '1st12' | '2nd12' | '3rd12' 
  | 'straight' | 'split' | 'street' | 'corner' | 'sixline';

export type RouletteNumber = {
  number: number;
  color: 'red' | 'black' | 'green';
};

export type GameStats = {
  wins: number;
  losses: number;
  totalBets: number;
  totalWinnings: number;
  totalLosses: number;
};

export type RecommendationType = {
  action: string;
  explanation: string;
};
