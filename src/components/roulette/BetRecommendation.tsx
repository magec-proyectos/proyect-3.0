
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
  );
};

export default BetRecommendation;
