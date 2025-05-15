
import React from 'react';
import { BetType } from './types';
import { getBettingStrategyRecommendation } from './rouletteUtils';
import { useRoulette } from '@/contexts/RouletteContext';
import { ArrowRight } from 'lucide-react';

interface BettingAdviceProps {
  strategy: ReturnType<typeof getBettingStrategyRecommendation>;
}

const BettingAdvice: React.FC<BettingAdviceProps> = ({ strategy }) => {
  const { handleSelectBet } = useRoulette();
  
  const getStrategyColor = () => {
    if (strategy.strategy.includes("Red")) return "text-red-400";
    if (strategy.strategy.includes("Black")) return "text-gray-300";
    if (strategy.strategy.includes("Odd")) return "text-amber-300";
    if (strategy.strategy.includes("Even")) return "text-emerald-300";
    if (strategy.strategy.includes("Low")) return "text-blue-300";
    if (strategy.strategy.includes("High")) return "text-purple-300";
    if (strategy.strategy.includes("Zero")) return "text-green-400";
    return "text-amber-200";
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-amber-100 flex items-center">
          <span className="bg-amber-500 w-1.5 h-1.5 rounded-full mr-1.5"></span>
          Pattern Analysis
        </h3>
        <span className={`text-sm font-medium ${getStrategyColor()}`}>
          {strategy.strategy}
        </span>
      </div>
      
      <p className="text-xs text-amber-200/80">
        {strategy.explanation}
      </p>
      
      <div className="grid grid-cols-2 gap-2 pt-1">
        {strategy.suggestedBets.map((bet, index) => (
          <button
            key={index}
            onClick={() => handleSelectBet(bet.type, bet.number)}
            className="flex items-center justify-between bg-amber-900/20 hover:bg-amber-800/30 rounded p-2 border border-amber-500/20 transition-colors text-left"
          >
            <div className="space-y-0.5">
              <div className="text-xs font-medium text-amber-200">
                {getBetLabel(bet.type, bet.number)}
              </div>
              <div className="text-xs text-amber-200/60 truncate max-w-[140px]">
                {bet.reasoning}
              </div>
            </div>
            <ArrowRight className="h-3 w-3 text-amber-400/70" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get a human-readable bet label
const getBetLabel = (type: BetType, number?: number): string => {
  switch (type) {
    case 'red': return 'Red';
    case 'black': return 'Black';
    case 'odd': return 'Odd';
    case 'even': return 'Even';
    case '1-18': return 'Low (1-18)';
    case '19-36': return 'High (19-36)';
    case '1st12': return 'First Dozen';
    case '2nd12': return 'Second Dozen';
    case '3rd12': return 'Third Dozen';
    case 'straight': return `Straight ${number}`;
    case 'split': return `Split ${number}`;
    case 'street': return `Street ${number}`;
    case 'corner': return `Corner ${number}`;
    case 'sixline': return `Six Line ${number}`;
    case 'neighbors': return `Neighbors of ${number}`;
    default: return 'Unknown';
  }
};

export default BettingAdvice;
