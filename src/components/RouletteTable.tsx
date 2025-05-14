
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  { number: 00, color: 'green' },
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
  // European roulette probabilities
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

const RouletteWheel = () => {
  // Just displaying a simplified representation of the wheel
  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-black to-red-600 border-4 border-gray-700 shadow-xl flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-dark-lighter border-2 border-gray-700 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-dark/80 border border-gray-600 flex items-center justify-center text-3xl font-bold animate-spin-slow">
            0
          </div>
        </div>
      </div>
      {/* Ball indicator */}
      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white shadow-lg animate-bounce-slow"></div>
    </div>
  );
};

const BettingBoard = ({ onSelectBet }: { onSelectBet: (type: BetType, number?: number) => void }) => {
  // Roulette table layout with numbers 0-36 and betting options
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
        
        {/* Numbers grid (simplified for display) */}
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
        <div className="grid grid-cols-2 gap-4 mt-4">
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
        </div>
      </div>
    </div>
  );
};

const RouletteTable = () => {
  const [selectedBet, setSelectedBet] = useState<{type: BetType, number?: number} | null>(null);
  const [previousResults, setPreviousResults] = useState<number[]>([14, 7, 32, 5, 19]);
  
  const handleSelectBet = (type: BetType, number?: number) => {
    setSelectedBet({ type, number });
  };
  
  const resetBets = () => {
    setSelectedBet(null);
  };
  
  // Get AI recommendation based on selected bet
  const getRecommendation = () => {
    if (!selectedBet) return null;
    
    // Simple recommendations based on bet type
    if (selectedBet.type === 'straight') {
      return {
        action: "CONSIDER ALTERNATIVES",
        explanation: "Straight bets have the lowest probability of winning (2.63%). Consider outside bets for more consistent results."
      };
    } else if (['red', 'black', 'odd', 'even', '1-18', '19-36'].includes(selectedBet.type)) {
      return {
        action: "REASONABLE CHOICE",
        explanation: "Outside bets have the highest probability of winning (46.37%). This is a balanced risk option."
      };
    } else {
      return {
        action: "MEDIUM RISK",
        explanation: `This bet type has a ${getBetProbability(selectedBet.type)} chance of winning with a ${getBetOdds(selectedBet.type)}:1 payout ratio.`
      };
    }
  };
  
  const recommendation = getRecommendation();
  
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="text-lg">Roulette Advisor</CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        {/* Table background */}
        <div className="absolute inset-0 bg-green-900/30 rounded-md -z-10"></div>
        
        <div className="space-y-8 py-4">
          {/* Previous Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-300">Previous Results</h3>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {previousResults.map((num, index) => {
                const color = num === 0 || num === 0o0 ? 'bg-green-600' : 
                              num % 2 === 0 ? 'bg-red-600' : 'bg-black';
                return (
                  <div 
                    key={index} 
                    className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold border border-white/20`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Roulette Wheel */}
          <RouletteWheel />
          
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
          disabled={!selectedBet}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reset Selection
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              // Simulate spinning the wheel
              const newResult = Math.floor(Math.random() * 37); // 0-36 for European
              setPreviousResults([newResult, ...previousResults.slice(0, 4)]);
            }}
          >
            Spin Wheel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RouletteTable;
