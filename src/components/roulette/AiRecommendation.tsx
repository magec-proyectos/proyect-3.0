
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRoulette } from '@/contexts/RouletteContext';
import { RecommendationType } from './types';
import { Badge } from '@/components/ui/badge';
import { Bot, HelpCircle, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AiRecommendation: React.FC = () => {
  const { aiRecommendation, previousResults } = useRoulette();
  const [detailedView, setDetailedView] = useState(false);
  
  // Generate additional insights based on previous results
  const getPatternInsight = (): RecommendationType | null => {
    if (previousResults.length < 3) return null;
    
    // Count colors
    const redCount = previousResults.filter(num => 
      [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)
    ).length;
    
    const blackCount = previousResults.filter(num => 
      ![0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) && num !== 0
    ).length;
    
    // Analyze sequence
    const oddCount = previousResults.filter(num => num !== 0 && num % 2 === 1).length;
    const evenCount = previousResults.filter(num => num !== 0 && num % 2 === 0).length;
    
    // Low/High analysis
    const lowCount = previousResults.filter(num => num >= 1 && num <= 18).length;
    const highCount = previousResults.filter(num => num >= 19 && num <= 36).length;
    
    // Dozen analysis
    const firstDozen = previousResults.filter(num => num >= 1 && num <= 12).length;
    const secondDozen = previousResults.filter(num => num >= 13 && num <= 24).length;
    const thirdDozen = previousResults.filter(num => num >= 25 && num <= 36).length;
    
    // Generate insight based on the strongest pattern
    if (redCount >= previousResults.length * 0.7) {
      return {
        action: "RED BIAS DETECTED",
        explanation: "Recent spins show a strong bias toward red numbers. While each spin is independent, this pattern may be of interest."
      };
    } else if (blackCount >= previousResults.length * 0.7) {
      return {
        action: "BLACK BIAS DETECTED",
        explanation: "Recent spins show a strong bias toward black numbers. While each spin is independent, this pattern may be of interest."
      };
    } else if (oddCount >= previousResults.length * 0.7) {
      return {
        action: "ODD NUMBER BIAS",
        explanation: "Recent spins show a strong bias toward odd numbers. While each spin is independent, this pattern may be of interest."
      };
    } else if (evenCount >= previousResults.length * 0.7) {
      return {
        action: "EVEN NUMBER BIAS",
        explanation: "Recent spins show a strong bias toward even numbers. While each spin is independent, this pattern may be of interest."
      };
    } else if (lowCount >= previousResults.length * 0.7) {
      return {
        action: "LOW NUMBERS TREND",
        explanation: "Recent spins show a strong bias toward numbers 1-18. While each spin is independent, this pattern may be of interest."
      };
    } else if (highCount >= previousResults.length * 0.7) {
      return {
        action: "HIGH NUMBERS TREND",
        explanation: "Recent spins show a strong bias toward numbers 19-36. While each spin is independent, this pattern may be of interest."
      };
    } else if (firstDozen >= previousResults.length * 0.5) {
      return {
        action: "FIRST DOZEN TREND",
        explanation: "Recent spins show a bias toward the first dozen (1-12). Consider this when planning your next bet."
      };
    } else if (secondDozen >= previousResults.length * 0.5) {
      return {
        action: "SECOND DOZEN TREND",
        explanation: "Recent spins show a bias toward the second dozen (13-24). Consider this when planning your next bet."
      };
    } else if (thirdDozen >= previousResults.length * 0.5) {
      return {
        action: "THIRD DOZEN TREND",
        explanation: "Recent spins show a bias toward the third dozen (25-36). Consider this when planning your next bet."
      };
    }
    
    return {
      action: "NO CLEAR PATTERN",
      explanation: "No strong patterns detected in recent spins. Each spin is independent, so past results don't predict future ones."
    };
  };
  
  const patternInsight = getPatternInsight();
  
  if (!aiRecommendation && !patternInsight) return null;
  
  return (
    <Card className="bg-black/30 border-amber-900/30 overflow-hidden">
      <CardHeader className="bg-black/20 pb-3 border-b border-amber-900/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-amber-200 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Roulette Advisor
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-amber-200 hover:text-amber-100">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black/80 border-amber-900/50 text-amber-200">
                <p className="max-w-xs text-xs">
                  AI-powered analysis of your bets and recent game trends. Remember that each spin is independent.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4 relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-xl"></div>
        
        {aiRecommendation && (
          <div className="mb-4 bg-black/20 p-3 rounded-lg border-l-4 border-amber-500 border-t border-r border-b border-amber-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium">BET ANALYSIS</Badge>
            </div>
            <div className="text-lg font-bold mb-1 text-amber-300">{aiRecommendation.action}</div>
            <p className="text-sm text-amber-200/80">{aiRecommendation.explanation}</p>
          </div>
        )}
        
        {patternInsight && (
          <div className="bg-black/20 p-3 rounded-lg border-l-4 border-amber-700 border-t border-r border-b border-amber-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-200 font-medium">PATTERN ANALYSIS</Badge>
            </div>
            <div className="text-lg font-bold mb-1 text-amber-300">{patternInsight.action}</div>
            <p className="text-sm text-amber-200/80">{patternInsight.explanation}</p>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-4 w-full bg-black/30 text-amber-200 hover:bg-black/50 hover:text-amber-100 flex items-center gap-2"
          onClick={() => setDetailedView(!detailedView)}
        >
          <Sparkles className="h-3 w-3" />
          {detailedView ? "Show Less" : "Detailed AI Analysis"}
        </Button>
        
        {detailedView && (
          <div className="mt-3 bg-black/20 p-3 rounded-lg text-xs text-amber-200/70 space-y-2">
            <p>• Roulette wheels follow randomized patterns dictated by physics principles.</p>
            <p>• Each spin is an independent event, despite apparent patterns.</p>
            <p>• The expected return for European roulette is -2.7% (house edge).</p>
            <p>• Best strategy: Place bets with lower house edge and manage your bankroll.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiRecommendation;
