
import React from 'react';
import BettingBoard from './BettingBoard';
import SelectedBet from './SelectedBet';
import BetRecommendation from './BetRecommendation';
import ActiveBets from './ActiveBets';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRoulette } from '@/contexts/RouletteContext';

const BettingSection: React.FC = () => {
  const { selectedBet, handleSelectBet, betAmount, placeBet } = useRoulette();
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selected Bet */}
        {selectedBet && (
          <div className="md:col-span-1 space-y-3">
            <SelectedBet selectedBet={selectedBet} betAmount={betAmount} />
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
