import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, HelpCircle, ArrowRight, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

type BetType = 
  | 'red' | 'black' 
  | 'odd' | 'even' 
  | '1-18' | '19-36' 
  | '1st12' | '2nd12' | '3rd12' 
  | 'straight' | 'split' | 'street' | 'corner' | 'sixline';

type RouletteNumber = {
  number: number;
  color: 'red' | 'black' | 'green';
};

// American roulette wheel numbers and their colors
const rouletteNumbers: RouletteNumber[] = [
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

const getBetOdds = (betType: BetType, specificNumber?: number): number => {
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

const getBetProbability = (betType: BetType): string => {
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

const RouletteWheel = ({ spinning, lastResult }: { spinning: boolean; lastResult?: number }) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-black to-red-600 border-4 border-gray-700 shadow-xl flex items-center justify-center">
        {/* Inner ring */}
        <div className="w-48 h-48 rounded-full bg-dark-lighter border-2 border-gray-700 flex items-center justify-center">
          {/* Center disc */}
          <div className={`w-24 h-24 rounded-full bg-dark/80 border border-gray-600 flex items-center justify-center text-3xl font-bold ${spinning ? 'animate-spin' : ''}`}>
            {lastResult !== undefined ? lastResult : 0}
          </div>
        </div>
      </div>
      
      {/* Ball indicator */}
      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full bg-white shadow-lg ${spinning ? 'animate-bounce' : ''}`}></div>
      
      {/* Number positions around the wheel (simplified) */}
      <div className="absolute inset-0">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 32 * Math.cos(rad) + 32;
          const y = 32 * Math.sin(rad) + 32;
          return (
            <div 
              key={i}
              className="absolute w-6 h-6 flex items-center justify-center text-xs font-bold text-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {i % 2 === 0 ? 
                <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center" /> : 
                <span className="w-4 h-4 bg-black rounded-full flex items-center justify-center" />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BettingBoard = ({ onSelectBet }: { onSelectBet: (type: BetType, number?: number) => void }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-green-800 p-4 rounded-md">
        {/* Zero section */}
        <div className="flex justify-start mb-2">
          <button
            onClick={() => onSelectBet('straight', 0)}
            className="w-12 h-32 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold rounded-sm border border-white/20"
          >
            0
          </button>
          
          <button
            onClick={() => onSelectBet('straight', 0)}
            className="w-12 h-32 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold rounded-sm border border-white/20 ml-1"
          >
            00
          </button>
        </div>
        
        {/* Numbers grid */}
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }, (_, i) => i + 1).map(num => {
            const color = num % 2 === 0 ? 'bg-black' : 'bg-red-600';
            return (
              <button
                key={num}
                onClick={() => onSelectBet('straight', num)}
                className={`w-12 h-12 flex items-center justify-center ${color} hover:opacity-80 text-white font-bold rounded-sm border border-white/20`}
              >
                {num}
              </button>
            );
          })}
        </div>
        
        {/* Outside bets */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('red')}
              className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-sm border border-white/20"
            >
              Red
            </button>
            <button
              onClick={() => onSelectBet('black')}
              className="w-full py-2 bg-black hover:bg-gray-800 text-white font-bold rounded-sm border border-white/20"
            >
              Black
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('odd')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              Odd
            </button>
            <button
              onClick={() => onSelectBet('even')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              Even
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('1-18')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              1-18
            </button>
            <button
              onClick={() => onSelectBet('19-36')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              19-36
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('1st12')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              1st 12
            </button>
            <button
              onClick={() => onSelectBet('2nd12')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              2nd 12
            </button>
            <button
              onClick={() => onSelectBet('3rd12')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card text-white font-bold rounded-sm border border-white/20"
            >
              3rd 12
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RouletteTable = () => {
  const [selectedBet, setSelectedBet] = useState<{type: BetType, number?: number} | null>(null);
  const [previousResults, setPreviousResults] = useState<number[]>([14, 7, 32, 5, 19]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [chipAmount, setChipAmount] = useState<number>(10);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [lastSpinResult, setLastSpinResult] = useState<number | undefined>(undefined);
  const [gameStats, setGameStats] = useState({
    wins: 0,
    losses: 0,
    totalBets: 0,
    totalWinnings: 0,
    totalLosses: 0
  });
  
  const handleSelectBet = (type: BetType, number?: number) => {
    setSelectedBet({ type, number });
    setBetAmount(chipAmount);
  };
  
  const resetBets = () => {
    setSelectedBet(null);
    setBetAmount(0);
  };
  
  const increaseChip = () => {
    const newAmount = chipAmount < 50 ? chipAmount + 10 : chipAmount + 50;
    setChipAmount(Math.min(newAmount, 1000));
  };
  
  const decreaseChip = () => {
    const newAmount = chipAmount > 50 ? chipAmount - 50 : chipAmount - 10;
    setChipAmount(Math.max(newAmount, 10));
  };
  
  const spinWheel = () => {
    if (!selectedBet) {
      toast({
        title: "No bet selected",
        description: "Please place a bet before spinning the wheel.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSpinning(true);
    setLastSpinResult(undefined);
    
    // Simulate wheel spinning
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 38); // 0-37 (including 00)
      const result = newResult === 37 ? 0 : newResult; // Treat 37 as 00 (also using 0 to represent 00)
      
      setLastSpinResult(result);
      setPreviousResults([result, ...previousResults.slice(0, 4)]);
      setIsSpinning(false);
      
      // Determine if bet won
      const isWin = evaluateBet(selectedBet, result);
      
      // Update stats
      updateGameStats(isWin);
      
      // Show result toast
      if (isWin) {
        const winAmount = betAmount * getBetOdds(selectedBet.type);
        toast({
          title: "You Won!",
          description: `Congratulations! You've won $${winAmount}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "You Lost",
          description: `Better luck next time. You've lost $${betAmount}.`,
          variant: "destructive",
        });
      }
    }, 3000); // 3 second animation
  };
  
  const evaluateBet = (bet: {type: BetType, number?: number}, result: number): boolean => {
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
  
  const updateGameStats = (isWin: boolean) => {
    setGameStats(prev => {
      const winAmount = isWin ? betAmount * getBetOdds(selectedBet!.type) : 0;
      
      return {
        wins: isWin ? prev.wins + 1 : prev.wins,
        losses: !isWin ? prev.losses + 1 : prev.losses,
        totalBets: prev.totalBets + 1,
        totalWinnings: prev.totalWinnings + winAmount,
        totalLosses: prev.totalLosses + (isWin ? 0 : betAmount)
      };
    });
  };
  
  // Get AI recommendation based on selected bet
  const getRecommendation = () => {
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
  
  const recommendation = getRecommendation();
  
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Roulette Advisor</CardTitle>
          <Badge variant="outline" className="bg-dark/50">Balance: $1000</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        {/* Table background */}
        <div className="absolute inset-0 bg-green-900/30 rounded-md -z-10"></div>
        
        <div className="space-y-8 py-4">
          {/* Session stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-dark-lighter p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400">Win/Loss</div>
              <div className="text-lg font-semibold">{gameStats.wins}/{gameStats.losses}</div>
            </div>
            <div className="bg-dark-lighter p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400">Win Rate</div>
              <div className="text-lg font-semibold">
                {gameStats.totalBets > 0 ? `${Math.round((gameStats.wins / gameStats.totalBets) * 100)}%` : '-'}
              </div>
            </div>
            <div className="bg-dark-lighter p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400">Profit/Loss</div>
              <div className={`text-lg font-semibold ${gameStats.totalWinnings - gameStats.totalLosses >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${gameStats.totalWinnings - gameStats.totalLosses}
              </div>
            </div>
            <div className="bg-dark-lighter p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400">Total Bets</div>
              <div className="text-lg font-semibold">{gameStats.totalBets}</div>
            </div>
          </div>
          
          {/* Previous Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-300">Previous Results</h3>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {previousResults.map((num, index) => {
                const color = num === 0 ? 'bg-green-600' : 
                              num % 2 === 0 ? 'bg-black' : 'bg-red-600';
                return (
                  <div 
                    key={index} 
                    className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold border border-white/20 ${index === 0 ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-dark-card' : ''}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Roulette Wheel */}
          <RouletteWheel spinning={isSpinning} lastResult={lastSpinResult} />
          
          {/* Chip Selection */}
          <div className="space-y-3">
            <h3 className="text-gray-300">Chip Value</h3>
            <div className="flex items-center justify-center gap-4">
              <Button 
                onClick={decreaseChip} 
                variant="outline" 
                className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
                disabled={chipAmount <= 10}
              >
                -
              </Button>
              
              <div 
                className="w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center text-lg font-bold border-4 border-white/20 shadow-lg shadow-neon-blue/20" 
              >
                ${chipAmount}
              </div>
              
              <Button 
                onClick={increaseChip} 
                variant="outline" 
                className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
                disabled={chipAmount >= 1000}
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Betting Board */}
          <div className="space-y-3">
            <h3 className="text-gray-300">Select Your Bet</h3>
            <BettingBoard onSelectBet={handleSelectBet} />
          </div>
          
          {/* Selected Bet */}
          {selectedBet && (
            <div className="bg-dark-lighter p-4 rounded-lg">
              <div className="text-sm text-gray-400">Selected Bet</div>
              <div className="flex items-center gap-3 mt-1">
                <Badge 
                  className={`${
                    selectedBet.type === 'red' ? 'bg-red-600' : 
                    selectedBet.type === 'black' ? 'bg-black' : 
                    'bg-dark-card'
                  }`}
                >
                  {selectedBet.type.toUpperCase()}
                </Badge>
                {selectedBet.number !== undefined && (
                  <span className="text-white font-bold">{selectedBet.number}</span>
                )}
                <Badge variant="outline" className="ml-auto">
                  ${betAmount}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                <div>
                  <span className="text-gray-400">Odds:</span>
                  <span className="text-white ml-2">{getBetOdds(selectedBet.type)}:1</span>
                </div>
                <div>
                  <span className="text-gray-400">Probability:</span>
                  <span className="text-white ml-2">{getBetProbability(selectedBet.type)}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Recommendation Box */}
          {selectedBet && recommendation && (
            <div className="bg-dark-lighter p-4 rounded-lg border-l-4 border-neon-blue mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-neon-blue text-black">AI ADVICE</Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Based on mathematical probabilities and standard roulette strategies. This is advisory only.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-2xl font-bold mb-1">{recommendation.action}</div>
              <p className="text-sm text-gray-400">{recommendation.explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="justify-between">
        <Button 
          variant="ghost" 
          onClick={resetBets} 
          className="text-gray-400 hover:text-white"
          disabled={!selectedBet || isSpinning}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Clear Bet
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedBet(prevBet => {
                if (!prevBet) return null;
                setBetAmount(chipAmount);
                return prevBet;
              });
            }}
            disabled={!selectedBet || isSpinning}
          >
            <Settings className="mr-2 h-4 w-4" />
            Change Bet
          </Button>
          
          <Button 
            variant="default" 
            onClick={spinWheel}
            disabled={!selectedBet || isSpinning}
            className="bg-neon-blue text-black hover:bg-neon-blue/90"
          >
            {isSpinning ? 'Spinning...' : 'Spin Wheel'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RouletteTable;
