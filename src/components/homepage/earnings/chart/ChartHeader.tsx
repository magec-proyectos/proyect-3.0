
import React from 'react';
import { TrendingUp, DollarSign, Percent, ArrowUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartHeaderProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  monthlyBets?: number;
  averageBet?: number;
  percentageChange?: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ 
  activeChart,
  monthlyBets = 20,
  averageBet = 50,
  percentageChange = 0
}) => {
  const getIcon = () => {
    switch (activeChart) {
      case 'earnings':
        return <DollarSign className="h-5 w-5 text-neon-blue mr-2" />;
      case 'winRate':
        return <TrendingUp className="h-5 w-5 text-neon-blue mr-2" />;
      case 'roi':
        return <Percent className="h-5 w-5 text-neon-blue mr-2" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeChart) {
      case 'earnings':
        return `Comparative Earnings`;
      case 'winRate':
        return `Win Rate Improvement`;
      case 'roi':
        return `Return on Investment`;
      default:
        return '';
    }
  };
  
  const getSubtitle = () => {
    return `${monthlyBets} bets of $${averageBet} each`;
  };

  return (
    <div className="mb-4 px-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getIcon()}
          <h4 className="text-base sm:text-lg font-medium text-white">{getTitle()}</h4>
        </div>
        
        {percentageChange > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>{percentageChange}%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Improvement with Bet 3.0 System</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">{getSubtitle()}</p>
    </div>
  );
};

export default ChartHeader;
