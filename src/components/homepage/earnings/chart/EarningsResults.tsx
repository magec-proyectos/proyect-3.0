
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EarningsResultsProps {
  currentMonthlyEarnings: number;
  enhancedMonthlyEarnings: number;
  percentageIncrease: number;
}

const EarningsResults: React.FC<EarningsResultsProps> = ({
  currentMonthlyEarnings,
  enhancedMonthlyEarnings,
  percentageIncrease
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="space-y-3 bg-dark-lighter p-4 rounded-lg border border-neon-blue/10 shadow-inner">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-300 flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-2"></div>
                Current earnings
              </div>
              <div className={`font-medium text-sm ${currentMonthlyEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {currentMonthlyEarnings >= 0 ? '+' : ''}{currentMonthlyEarnings}$
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-300 flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-neon-blue mr-2"></div>
                With Bet 3.0
              </div>
              <div className="text-neon-blue text-lg font-bold">
                +{enhancedMonthlyEarnings}$
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-700/50 mt-1">
              <div className="flex justify-between items-center">
                <div className="text-sm text-white">Improvement</div>
                <div className="text-neon-blue font-medium flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +{percentageIncrease}%
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-[200px]">
            Calculation based on: (bets × average size × win rate × odds) - total investment
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EarningsResults;
