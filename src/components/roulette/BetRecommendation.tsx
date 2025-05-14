
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RecommendationType } from './types';

interface BetRecommendationProps {
  recommendation: RecommendationType;
}

const BetRecommendation: React.FC<BetRecommendationProps> = ({ recommendation }) => {
  return (
    <div className="bg-black/30 p-4 rounded-lg border-l-4 border-amber-500 mt-0 border-t border-r border-b border-amber-900/30">
      <div className="flex items-center gap-2 mb-2">
        <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium">ANALYTICS</Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-amber-200 hover:text-amber-100">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 border-amber-900/50 text-amber-200">
              <p className="max-w-xs text-xs">
                Based on mathematical probabilities and standard roulette strategies. This is just a recommendation.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-500/5 rounded-full blur-xl"></div>
        <div className="text-xl font-bold mb-1 text-amber-300">{recommendation.action}</div>
        <p className="text-sm text-amber-200/80">{recommendation.explanation}</p>
      </div>
      
      <div className="mt-3 pt-3 border-t border-amber-900/30">
        <div className="text-xs text-amber-200/60 flex items-center gap-1">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          <span>The house edge for European roulette is 2.7%.</span>
        </div>
      </div>
    </div>
  );
};

export default BetRecommendation;
