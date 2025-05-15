
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

// Wheel numbers in European roulette order (same as in RouletteWheel.tsx)
export const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
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

// Define board layout for reference in bet verification
export const boardLayout = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
];

// Helper function to get split bet numbers based on a reference number
export const getSplitNumbers = (number: number): number[][] => {
  // Find position in the board
  let rowIndex = -1;
  let colIndex = -1;
  
  for (let i = 0; i < boardLayout.length; i++) {
    const j = boardLayout[i].indexOf(number);
    if (j !== -1) {
      rowIndex = i;
      colIndex = j;
      break;
    }
  }
  
  if (rowIndex === -1 || colIndex === -1) return [];
  
  const splits = [];
  
  // Horizontal split (right)
  if (colIndex < boardLayout[rowIndex].length - 1) {
    splits.push([number, boardLayout[rowIndex][colIndex + 1]]);
  }
  
  // Vertical split (down)
  if (rowIndex < boardLayout.length - 1) {
    splits.push([number, boardLayout[rowIndex + 1][colIndex]]);
  }
  
  return splits;
};

// Helper function to get corner bet numbers based on a reference number
export const getCornerNumbers = (number: number): number[][] => {
  // Find position in the board
  let rowIndex = -1;
  let colIndex = -1;
  
  for (let i = 0; i < boardLayout.length; i++) {
    const j = boardLayout[i].indexOf(number);
    if (j !== -1) {
      rowIndex = i;
      colIndex = j;
      break;
    }
  }
  
  if (rowIndex === -1 || colIndex === -1 || rowIndex === boardLayout.length - 1 || colIndex === boardLayout[rowIndex].length - 1) {
    return [];
  }
  
  // Default corner (bottom-right)
  return [
    [
      number,
      boardLayout[rowIndex][colIndex + 1],
      boardLayout[rowIndex + 1][colIndex],
      boardLayout[rowIndex + 1][colIndex + 1]
    ]
  ];
};

// Helper function to get street bet numbers based on a reference number
export const getStreetNumbers = (number: number): number[][] => {
  // Find row in the board
  let rowIndex = -1;
  
  for (let i = 0; i < boardLayout.length; i++) {
    if (boardLayout[i].includes(number)) {
      rowIndex = i;
      break;
    }
  }
  
  if (rowIndex === -1) return [];
  
  // Get all numbers in the row (street)
  return [boardLayout[rowIndex]];
};

// Helper function to get six line bet numbers based on a reference number
export const getSixLineNumbers = (number: number): number[][] => {
  // Find position in the board
  let rowIndex = -1;
  
  for (let i = 0; i < boardLayout.length; i++) {
    if (boardLayout[i].includes(number)) {
      rowIndex = i;
      break;
    }
  }
  
  if (rowIndex === -1 || rowIndex === boardLayout.length - 1) return [];
  
  // Return combined two rows (six line)
  return [[...boardLayout[rowIndex], ...boardLayout[rowIndex + 1]]];
};

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

// Get detailed information about a bet for UI display
export const getBetDetails = (type: BetType, number?: number): {
  description: string;
  coverage: string;
  odds: string;
  probability: string;
} => {
  switch (type) {
    case 'red':
      return {
        description: 'Red Numbers',
        coverage: '18 numbers',
        odds: '1:1',
        probability: '48.65%'
      };
    case 'black':
      return {
        description: 'Black Numbers',
        coverage: '18 numbers',
        odds: '1:1',
        probability: '48.65%'
      };
    case 'odd':
      return {
        description: 'Odd Numbers (1,3,5,...)',
        coverage: '18 numbers',
        odds: '1:1',
        probability: '48.65%'
      };
    case 'even':
      return {
        description: 'Even Numbers (2,4,6,...)',
        coverage: '18 numbers',
        odds: '1:1',
        probability: '48.65%'
      };
    case '1-18':
      return {
        description: 'Low Numbers (1-18)',
        coverage: '18 numbers',
        odds: '1:1',
        probability: '48.65%'
      };
    case '19-36':
      return {
        description: 'High Numbers (19-36)',
        coverage: '18 numbers',
        odds: '1:1',
        probability: '48.65%'
      };
    case '1st12':
      return {
        description: 'First Dozen (1-12)',
        coverage: '12 numbers',
        odds: '2:1',
        probability: '32.43%'
      };
    case '2nd12':
      return {
        description: 'Second Dozen (13-24)',
        coverage: '12 numbers',
        odds: '2:1',
        probability: '32.43%'
      };
    case '3rd12':
      return {
        description: 'Third Dozen (25-36)',
        coverage: '12 numbers',
        odds: '2:1',
        probability: '32.43%'
      };
    case 'straight':
      return {
        description: `Straight Up (${number})`,
        coverage: '1 number',
        odds: '35:1',
        probability: '2.70%'
      };
    case 'split':
      return {
        description: `Split Bet (${number} and adjacent)`,
        coverage: '2 numbers',
        odds: '17:1',
        probability: '5.41%'
      };
    case 'street':
      return {
        description: `Street Bet (row with ${number})`,
        coverage: '3 numbers',
        odds: '11:1',
        probability: '8.11%'
      };
    case 'corner':
      return {
        description: `Corner Bet (quad with ${number})`,
        coverage: '4 numbers',
        odds: '8:1',
        probability: '10.81%'
      };
    case 'sixline':
      return {
        description: `Six Line Bet (2 rows with ${number})`,
        coverage: '6 numbers',
        odds: '5:1',
        probability: '16.22%'
      };
    case 'neighbors':
      return {
        description: `Neighbors of ${number}`,
        coverage: '5 numbers',
        odds: '7:1',
        probability: '13.51%'
      };
    default:
      return {
        description: 'Unknown bet type',
        coverage: '',
        odds: '',
        probability: '0%'
      };
  }
};

// Enhanced evaluate bet function with improved complex bet verification
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
      
    case 'split':
      if (!bet.number) return false;
      const splitOptions = getSplitNumbers(bet.number);
      return splitOptions.some(split => split.includes(result));
      
    case 'street':
      if (!bet.number) return false;
      let foundRow = null;
      for (const row of boardLayout) {
        if (row.includes(bet.number)) {
          foundRow = row;
          break;
        }
      }
      return foundRow ? foundRow.includes(result) : false;
      
    case 'corner':
      if (!bet.number) return false;
      const cornerOptions = getCornerNumbers(bet.number);
      return cornerOptions.some(corner => corner.includes(result));
      
    case 'sixline':
      if (!bet.number) return false;
      const sixlineOptions = getSixLineNumbers(bet.number);
      return sixlineOptions.some(sixline => sixline.includes(result));
      
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
  
  // Enhanced recommendations with more context
  if (selectedBet.type === 'straight') {
    return {
      action: "HIGH RISK",
      explanation: "Straight bets have the lowest probability of winning (2.7%) but the highest payout (35:1). Consider placing multiple straight bets or combining with outside bets."
    };
  } else if (['red', 'black', 'odd', 'even', '1-18', '19-36'].includes(selectedBet.type)) {
    return {
      action: "BALANCED RISK",
      explanation: "Outside bets have the highest probability of winning (48.65%) with a 1:1 payout. This is a good choice for consistent play and bankroll preservation."
    };
  } else if (['1st12', '2nd12', '3rd12'].includes(selectedBet.type)) {
    return {
      action: "MEDIUM RISK",
      explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning with a ${getBetOdds(selectedBet.type)}:1 payout ratio. Good balance between risk and reward.`
    };
  } else if (selectedBet.type === 'split') {
    return {
      action: "MEDIUM-HIGH RISK",
      explanation: "Split bets have a 5.41% probability with a 17:1 payout. Consider placing multiple split bets to cover more numbers."
    };
  } else if (selectedBet.type === 'corner') {
    return {
      action: "MEDIUM RISK",
      explanation: "Corner bets cover 4 numbers with 10.81% probability and an 8:1 payout. A balanced option between straight bets and dozens."
    };
  } else if (selectedBet.type === 'sixline') {
    return {
      action: "MEDIUM-LOW RISK",
      explanation: "Six Line bets cover 6 numbers with 16.22% probability and a 5:1 payout. Good for covering more numbers with a reasonable return."
    };
  } else if (selectedBet.type === 'street') {
    return {
      action: "MEDIUM-HIGH RISK",
      explanation: "Street bets cover 3 numbers with 8.11% probability and an 11:1 payout. Consider combining with outside bets."
    };
  } else if (selectedBet.type === 'neighbors') {
    return {
      action: "STRATEGIC BET",
      explanation: `Betting on 5 neighboring numbers on the wheel (${selectedBet.number} and neighbors). ${getBetProbability(selectedBet.type)} chance with a ${getBetOdds(selectedBet.type)}:1 payout.`
    };
  } else {
    return {
      action: "CALCULATED RISK",
      explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning. Consider your bankroll management and risk tolerance.`
    };
  }
};

// Get a more detailed betting strategy recommendation for the current game state
export const getBettingStrategyRecommendation = (previousResults: number[]): {
  strategy: string;
  explanation: string;
  suggestedBets: Array<{type: BetType, number?: number, reasoning: string}>;
} => {
  // Analyze previous results
  const redCount = previousResults.filter(num => [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)).length;
  const blackCount = previousResults.filter(num => num !== 0 && ![1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)).length;
  const zeroCount = previousResults.filter(num => num === 0).length;
  
  const oddCount = previousResults.filter(num => num !== 0 && num % 2 === 1).length;
  const evenCount = previousResults.filter(num => num !== 0 && num % 2 === 0).length;
  
  const lowCount = previousResults.filter(num => num >= 1 && num <= 18).length;
  const highCount = previousResults.filter(num => num >= 19 && num <= 36).length;
  
  // Define threshold for significant bias
  const threshold = Math.ceil(previousResults.length * 0.65);
  
  // Define some simple strategies based on biases
  if (redCount >= threshold) {
    return {
      strategy: "Red Bias Detected",
      explanation: `${redCount} out of ${previousResults.length} spins landed on red. While each spin is independent, you might consider balancing with black bets or continuing the trend with red.`,
      suggestedBets: [
        { type: 'black', reasoning: "Balance strategy after red frequency" },
        { type: 'red', reasoning: "Follow the trend that seems to be developing" }
      ]
    };
  } else if (blackCount >= threshold) {
    return {
      strategy: "Black Bias Detected",
      explanation: `${blackCount} out of ${previousResults.length} spins landed on black. Remember that each spin is independent, but you might consider balancing with red bets or continuing the trend.`,
      suggestedBets: [
        { type: 'red', reasoning: "Balance strategy after black frequency" },
        { type: 'black', reasoning: "Follow the trend that seems to be developing" }
      ]
    };
  } else if (oddCount >= threshold) {
    return {
      strategy: "Odd Numbers Trend",
      explanation: `${oddCount} out of ${previousResults.length} spins landed on odd numbers. You might consider balancing with even bets or continuing the trend with odd.`,
      suggestedBets: [
        { type: 'even', reasoning: "Balance strategy after odd frequency" },
        { type: 'odd', reasoning: "Follow the trend that seems to be developing" }
      ]
    };
  } else if (evenCount >= threshold) {
    return {
      strategy: "Even Numbers Trend",
      explanation: `${evenCount} out of ${previousResults.length} spins landed on even numbers. You might consider balancing with odd bets or continuing the trend with even.`,
      suggestedBets: [
        { type: 'odd', reasoning: "Balance strategy after even frequency" },
        { type: 'even', reasoning: "Follow the trend that seems to be developing" }
      ]
    };
  } else if (lowCount >= threshold) {
    return {
      strategy: "Low Numbers Trend",
      explanation: `${lowCount} out of ${previousResults.length} spins landed on low numbers (1-18). Consider balancing with high number bets or continuing the trend.`,
      suggestedBets: [
        { type: '19-36', reasoning: "Balance strategy after low number frequency" },
        { type: '1-18', reasoning: "Follow the trend that seems to be developing" }
      ]
    };
  } else if (highCount >= threshold) {
    return {
      strategy: "High Numbers Trend",
      explanation: `${highCount} out of ${previousResults.length} spins landed on high numbers (19-36). Consider balancing with low number bets or continuing the trend.`,
      suggestedBets: [
        { type: '1-18', reasoning: "Balance strategy after high number frequency" },
        { type: '19-36', reasoning: "Follow the trend that seems to be developing" }
      ]
    };
  } else if (zeroCount > 0) {
    // If zero has appeared recently, suggest neighbors of zero
    return {
      strategy: "Zero Coverage",
      explanation: `Zero has appeared ${zeroCount} time(s) in the last ${previousResults.length} spins. Consider covering zero and its neighbors.`,
      suggestedBets: [
        { type: 'straight', number: 0, reasoning: "Cover zero directly" },
        { type: 'neighbors', number: 0, reasoning: "Cover zero and surrounding numbers" }
      ]
    };
  } else {
    // Default balanced strategy when no clear pattern
    return {
      strategy: "Balanced Approach",
      explanation: "No strong pattern detected in recent spins. Consider a balanced approach with outside bets for better odds.",
      suggestedBets: [
        { type: 'red', reasoning: "Outside bet with nearly 50% coverage" },
        { type: 'even', reasoning: "Outside bet with nearly 50% coverage" },
        { type: '1st12', reasoning: "Medium risk with 12 number coverage" }
      ]
    };
  }
};
