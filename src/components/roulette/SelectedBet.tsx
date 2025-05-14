
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BetType } from './types';
import { getBetOdds, getBetProbability } from './rouletteUtils';

interface SelectedBetProps {
  selectedBet: {
    type: BetType;
    number?: number;
  };
  betAmount: number;
}

const SelectedBet: React.FC<SelectedBetProps> = ({ selectedBet, betAmount }) => {
  return (
    <div className="bg-dark-lighter p-4 rounded-lg">
      <div className="text-sm text-gray-400">Selected Bet</div>
      <div className="flex items-center gap-3 mt-1">
        <Badge 
          className={`${
            selectedBet.type === 'red' ? 'bg-red-600' : 
            selectedBet.type === 'black' ? 'bg-black' : 
            'bg-dark-card'
          }`}
        >
          {selectedBet.type.toUpperCase()}
        </Badge>
        {selectedBet.number !== undefined && (
          <span className="text-white font-bold">{selectedBet.number}</span>
        )}
        <Badge variant="outline" className="ml-auto">
          ${betAmount}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
        <div>
          <span className="text-gray-400">Odds:</span>
          <span className="text-white ml-2">{getBetOdds(selectedBet.type)}:1</span>
        </div>
        <div>
          <span className="text-gray-400">Probability:</span>
          <span className="text-white ml-2">{getBetProbability(selectedBet.type)}</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedBet;
