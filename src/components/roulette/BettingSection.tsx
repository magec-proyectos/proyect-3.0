
import React from 'react';
import BettingBoard from './BettingBoard';
import SelectedBet from './SelectedBet';
import BetRecommendation from './BetRecommendation';
import ActiveBets from './ActiveBets';
import BettingAdvice from './BettingAdvice';
import { Button } from '@/components/ui/button';
import { Plus, Info } from 'lucide-react';
import { useRoulette } from '@/contexts/RouletteContext';
import { getBetDetails } from './rouletteUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BettingSection: React.FC = () => {
  const { 
    selectedBet, 
    handleSelectBet, 
    betAmount, 
    placeBet, 
    bettingStrategy, 
    previousResults 
  } = useRoulette();
  
  // Get more detailed information about the selected bet
  const betDetails = selectedBet ? getBetDetails(selectedBet.type, selectedBet.number) : null;
  
  return (
    <div className="space-y-6">
      {/* Betting Board */}
      <div className="space-y-3">
        <h3 className="text-amber-100 font-semibold flex items-center">
          <span className="bg-amber-600 w-2 h-2 rounded-full mr-2"></span>
          Select Your Bet
        </h3>
        <BettingBoard onSelectBet={handleSelectBet} />
      </div>
      
      {/* Betting Strategy Advice */}
      {previousResults.length > 0 && bettingStrategy && (
        <div className="bg-black/30 border border-amber-500/30 rounded-lg p-3 shadow-lg">
          <BettingAdvice strategy={bettingStrategy} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selected Bet */}
        {selectedBet && (
          <div className="md:col-span-1 space-y-3">
            <SelectedBet selectedBet={selectedBet} betAmount={betAmount} />
            
            {/* Bet details tooltip */}
            {betDetails && (
              <div className="text-xs bg-black/40 p-2 rounded border border-amber-500/20 text-amber-200/90">
                <div className="flex justify-between mb-1">
                  <span>{betDetails.description}</span>
                  <span className="text-amber-400 font-medium">{betDetails.odds} payout</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage: {betDetails.coverage}</span>
                  <span>Probability: {betDetails.probability}</span>
                </div>
              </div>
            )}
            
            <Button
              onClick={placeBet}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-medium border border-amber-400/20 shadow-lg"
              disabled={!selectedBet || betAmount <= 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Place Bet
            </Button>
          </div>
        )}
        
        {/* Active Bets */}
        <div className="md:col-span-1">
          <ActiveBets />
        </div>
      </div>
      
      {/* Recommendation */}
      {selectedBet && (
        <div className="mt-4 animate-fade-in">
          <div className="flex items-center mb-2">
            <h3 className="text-amber-100 font-semibold flex items-center">
              <span className="bg-amber-600 w-2 h-2 rounded-full mr-2"></span>
              AI Recommendation
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 text-amber-300/70">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    AI recommendations are based on mathematical probabilities and historical data. 
                    Remember that each spin is independent and past results don't influence future spins.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <BetRecommendation recommendation={{ 
            action: "BALANCED RISK",
            explanation: "This is a common bet with moderate risk and reward." 
          }} />
        </div>
      )}
    </div>
  );
};

export default BettingSection;
