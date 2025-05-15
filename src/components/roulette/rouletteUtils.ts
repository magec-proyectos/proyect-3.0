
import { BetType, RouletteNumber, PlacedBet } from './types';

// European roulette wheel numbers and their colors
export const rouletteNumbers: RouletteNumber[] = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' },
  { number: 15, color: 'black' },
  { number: 19, color: 'red' },
  { number: 4, color: 'black' },
  { number: 21, color: 'red' },
  { number: 2, color: 'black' },
  { number: 25, color: 'red' },
  { number: 17, color: 'black' },
  { number: 34, color: 'red' },
  { number: 6, color: 'black' },
  { number: 27, color: 'red' },
  { number: 13, color: 'black' },
  { number: 36, color: 'red' },
  { number: 11, color: 'black' },
  { number: 30, color: 'red' },
  { number: 8, color: 'black' },
  { number: 23, color: 'red' },
  { number: 10, color: 'black' },
  { number: 5, color: 'red' },
  { number: 24, color: 'black' },
  { number: 16, color: 'red' },
  { number: 33, color: 'black' },
  { number: 1, color: 'red' },
  { number: 20, color: 'black' },
  { number: 14, color: 'red' },
  { number: 31, color: 'black' },
  { number: 9, color: 'red' },
  { number: 22, color: 'black' },
  { number: 18, color: 'red' },
  { number: 29, color: 'black' },
  { number: 7, color: 'red' },
  { number: 28, color: 'black' },
  { number: 12, color: 'red' },
  { number: 35, color: 'black' },
  { number: 3, color: 'red' },
  { number: 26, color: 'black' }
];

// Get neighboring numbers on the wheel
export const getNeighbors = (number: number, count: number = 2): number[] => {
  const index = wheelNumbers.indexOf(number);
  if (index === -1) return [];
  
  const neighbors: number[] = [];
  const len = wheelNumbers.length;
  
  for (let i = -count; i <= count; i++) {
    if (i === 0) continue; // Skip the number itself
    const neighborIndex = (index + i + len) % len;
    neighbors.push(wheelNumbers[neighborIndex]);
  }
  
  return neighbors;
};

// Wheel numbers in European roulette order (same as in RouletteWheel.tsx)
export const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

// Get the odds (payout multiplier) for a given bet type
export const getBetOdds = (betType: BetType): number => {
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
    case 'neighbors':
      return 7; // 5 numbers bet includes the central number and two on each side
    default:
      return 0;
  }
};

// Get the probability of winning for a given bet type
export const getBetProbability = (betType: BetType): string => {
  // European roulette probabilities
  switch (betType) {
    case 'red':
    case 'black':
    case 'odd':
    case 'even':
    case '1-18':
    case '19-36':
      return '48.65%'; // 18/37 for European roulette
    case '1st12':
    case '2nd12':
    case '3rd12':
      return '32.43%'; // 12/37 for European roulette
    case 'street':
      return '8.11%'; // 3/37 for European roulette
    case 'split':
      return '5.41%'; // 2/37 for European roulette
    case 'corner':
      return '10.81%'; // 4/37 for European roulette
    case 'sixline':
      return '16.22%'; // 6/37 for European roulette
    case 'straight':
      return '2.70%'; // 1/37 for European roulette
    case 'neighbors':
      return '13.51%'; // 5/37 for 5 numbers
    default:
      return '0%';
  }
};

// Evaluate if a bet wins based on the result
export const evaluateBet = (bet: {type: BetType, number?: number}, result: number): boolean => {
  const resultColor = result === 0 ? 'green' : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(result) ? 'red' : 'black';
  
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
    case 'neighbors':
      if (!bet.number) return false;
      const neighbors = getNeighbors(bet.number, 2);
      return result === bet.number || neighbors.includes(result);
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
      explanation: "Straight bets have the lowest probability of winning (2.7%). Consider outside bets for more frequent wins."
    };
  } else if (['red', 'black', 'odd', 'even', '1-18', '19-36'].includes(selectedBet.type)) {
    return {
      action: "BALANCED RISK",
      explanation: "Outside bets have the highest probability of winning (48.65%). This is a good choice for consistent play."
    };
  } else if (['1st12', '2nd12', '3rd12'].includes(selectedBet.type)) {
    return {
      action: "MEDIUM RISK",
      explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning with a ${getBetOdds(selectedBet.type)}:1 payout ratio.`
    };
  } else if (selectedBet.type === 'neighbors') {
    return {
      action: "STRATEGIC BET",
      explanation: `Betting on 5 neighboring numbers on the wheel. ${getBetProbability(selectedBet.type)} chance with a ${getBetOdds(selectedBet.type)}:1 payout.`
    };
  } else {
    return {
      action: "CALCULATED RISK",
      explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning. Consider your bankroll management.`
    };
  }
};
