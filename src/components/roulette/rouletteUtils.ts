
import { BetType, RouletteNumber } from './types';

// American roulette wheel numbers and their colors
export const rouletteNumbers: RouletteNumber[] = [
  { number: 0, color: 'green' },
  { number: 28, color: 'black' },
  { number: 9, color: 'red' },
  { number: 26, color: 'black' },
  { number: 30, color: 'red' },
  { number: 11, color: 'black' },
  { number: 7, color: 'red' },
  { number: 20, color: 'black' },
  { number: 32, color: 'red' },
  { number: 17, color: 'black' },
  { number: 5, color: 'red' },
  { number: 22, color: 'black' },
  { number: 34, color: 'red' },
  { number: 15, color: 'black' },
  { number: 3, color: 'red' },
  { number: 24, color: 'black' },
  { number: 36, color: 'red' },
  { number: 13, color: 'black' },
  { number: 1, color: 'red' },
  { number: 0, color: 'green' }, // Changed from 00 to 0 to represent double zero
  { number: 27, color: 'red' },
  { number: 10, color: 'black' },
  { number: 25, color: 'red' },
  { number: 29, color: 'black' },
  { number: 12, color: 'red' },
  { number: 8, color: 'black' },
  { number: 19, color: 'red' },
  { number: 31, color: 'black' },
  { number: 18, color: 'red' },
  { number: 6, color: 'black' },
  { number: 21, color: 'red' },
  { number: 33, color: 'black' },
  { number: 16, color: 'red' },
  { number: 4, color: 'black' },
  { number: 23, color: 'red' },
  { number: 35, color: 'black' },
  { number: 14, color: 'red' },
  { number: 2, color: 'black' }
];

export const getBetOdds = (betType: BetType, specificNumber?: number): number => {
  switch (betType) {
    case 'red':
    case 'black':
    case 'odd':
    case 'even':
    case '1-18':
    case '19-36':
      return 1; // 1 to 1 payout
    case '1st12':
    case '2nd12':
    case '3rd12':
      return 2; // 2 to 1 payout
    case 'street':
      return 11; // 11 to 1 payout
    case 'split':
      return 17; // 17 to 1 payout
    case 'corner':
      return 8; // 8 to 1 payout
    case 'sixline':
      return 5; // 5 to 1 payout
    case 'straight':
      return 35; // 35 to 1 payout
    default:
      return 0;
  }
};

export const getBetProbability = (betType: BetType): string => {
  // American roulette probabilities
  switch (betType) {
    case 'red':
    case 'black':
    case 'odd':
    case 'even':
    case '1-18':
    case '19-36':
      return '46.37%'; // 18/38 for American roulette
    case '1st12':
    case '2nd12':
    case '3rd12':
      return '31.58%'; // 12/38 for American roulette
    case 'street':
      return '7.89%'; // 3/38 for American roulette
    case 'split':
      return '5.26%'; // 2/38 for American roulette
    case 'corner':
      return '10.53%'; // 4/38 for American roulette
    case 'sixline':
      return '15.79%'; // 6/38 for American roulette
    case 'straight':
      return '2.63%'; // 1/38 for American roulette
    default:
      return '0%';
  }
};

export const evaluateBet = (bet: {type: BetType, number?: number}, result: number): boolean => {
  const resultColor = result === 0 ? 'green' : result % 2 === 0 ? 'black' : 'red';
  
  switch (bet.type) {
    case 'red':
      return resultColor === 'red';
    case 'black':
      return resultColor === 'black';
    case 'odd':
      return result !== 0 && result % 2 === 1;
    case 'even':
      return result !== 0 && result % 2 === 0;
    case '1-18':
      return result >= 1 && result <= 18;
    case '19-36':
      return result >= 19 && result <= 36;
    case '1st12':
      return result >= 1 && result <= 12;
    case '2nd12':
      return result >= 13 && result <= 24;
    case '3rd12':
      return result >= 25 && result <= 36;
    case 'straight':
      return result === bet.number;
    default:
      return false;
  }
};

// Get AI recommendation based on selected bet
export const getRecommendation = (selectedBet: {type: BetType, number?: number} | null) => {
  if (!selectedBet) return null;
  
  // Simple recommendations based on bet type
  if (selectedBet.type === 'straight') {
    return {
      action: "HIGH RISK",
      explanation: "Straight bets have the lowest probability of winning (2.63%). Consider outside bets for more frequent wins."
    };
  } else if (['red', 'black', 'odd', 'even', '1-18', '19-36'].includes(selectedBet.type)) {
    return {
      action: "BALANCED RISK",
      explanation: "Outside bets have the highest probability of winning (46.37%). This is a good choice for consistent play."
    };
  } else if (['1st12', '2nd12', '3rd12'].includes(selectedBet.type)) {
    return {
      action: "MEDIUM RISK",
      explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning with a ${getBetOdds(selectedBet.type)}:1 payout ratio.`
    };
  } else {
    return {
      action: "CALCULATED RISK",
      explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning. Consider your bankroll management.`
    };
  }
};
