
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
    <div className="bg-gradient-to-br from-dark-lighter to-dark-card p-4 rounded-lg border-l-4 border-neon-blue mt-6 shadow-lg shadow-neon-blue/10">
      <div className="flex items-center gap-2 mb-2">
        <Badge className="bg-gradient-to-r from-neon-blue to-blue-400 text-black">CONSEJO IA</Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-dark-card border-dark-border">
              <p className="max-w-xs text-xs">
                Basado en probabilidades matemáticas y estrategias estándar de ruleta. Esto es sólo una recomendación.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-neon-blue/5 rounded-full blur-xl"></div>
        <div className="text-2xl font-bold mb-1 text-gradient">{recommendation.action}</div>
        <p className="text-sm text-gray-300">{recommendation.explanation}</p>
      </div>
      
      <div className="mt-3 pt-3 border-t border-dark-border">
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
          <span>La IA analiza los patrones pero recuerda: cada giro es independiente.</span>
        </div>
      </div>
    </div>
  );
};

export default BetRecommendation;
