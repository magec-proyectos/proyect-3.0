
import React from 'react';
import BettingBoard from './BettingBoard';
import SelectedBet from './SelectedBet';
import BetRecommendation from './BetRecommendation';
import { useRoulette } from '@/contexts/RouletteContext';

const BettingSection: React.FC = () => {
  const { selectedBet, handleSelectBet, betAmount } = useRoulette();
  
  return (
    <div className="space-y-6">
      {/* Betting Board */}
      <div className="space-y-3">
        <h3 className="text-amber-200 font-semibold">Select Your Bet</h3>
        <BettingBoard onSelectBet={handleSelectBet} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selected Bet */}
        {selectedBet && (
          <div className="md:col-span-1">
            <SelectedBet selectedBet={selectedBet} betAmount={betAmount} />
          </div>
        )}
        
        {/* Recommendation */}
        {selectedBet && (
          <div className="md:col-span-1">
            <BetRecommendation recommendation={{ 
              action: "BALANCED RISK",
              explanation: "This is a common bet with moderate risk and reward." 
            }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingSection;
