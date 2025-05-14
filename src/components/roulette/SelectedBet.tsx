
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
  // Función para determinar el color del badge según el tipo de apuesta
  const getBetColor = () => {
    if (selectedBet.type === 'red') return 'from-red-500 to-red-700';
    if (selectedBet.type === 'black') return 'from-gray-800 to-black';
    if (selectedBet.type === 'straight' && selectedBet.number === 0) return 'from-green-500 to-green-700';
    return 'from-dark-card to-dark-lighter';
  };
  
  return (
    <div className="bg-gradient-to-br from-dark-lighter to-dark-card p-4 rounded-lg border border-neon-blue/30 shadow-md shadow-neon-blue/5">
      <div className="text-sm text-gray-400">Apuesta Seleccionada</div>
      <div className="flex items-center gap-3 mt-1">
        <Badge 
          className={`bg-gradient-to-r ${getBetColor()} border border-white/10 text-white`}
        >
          {selectedBet.type === 'straight' ? 'NÚMERO' : selectedBet.type.toUpperCase()}
        </Badge>
        {selectedBet.number !== undefined && (
          <span className="text-white font-bold">
            {selectedBet.number === 37 ? '00' : selectedBet.number}
          </span>
        )}
        <Badge variant="outline" className="ml-auto bg-dark-lighter border-gray-600">
          <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-b ${
              betAmount >= 500 ? 'from-yellow-400 to-yellow-600' : 
              betAmount >= 100 ? 'from-blue-400 to-blue-600' : 
              betAmount >= 50 ? 'from-green-400 to-green-600' : 
              betAmount >= 25 ? 'from-red-400 to-red-600' : 
                           'from-neon-blue to-blue-400'
            }`}></div>
            <span>${betAmount}</span>
          </div>
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
        <div className="bg-dark/40 p-2 rounded">
          <span className="text-gray-400">Paga:</span>
          <span className="text-neon-lime ml-2 font-semibold">{getBetOdds(selectedBet.type)}:1</span>
        </div>
        <div className="bg-dark/40 p-2 rounded">
          <span className="text-gray-400">Probabilidad:</span>
          <span className="text-neon-blue ml-2 font-semibold">{getBetProbability(selectedBet.type)}</span>
        </div>
        <div className="col-span-2 bg-dark/40 p-2 rounded text-center">
          <span className="text-gray-400">Ganancia Potencial:</span>
          <span className="text-neon-lime ml-2 font-semibold">${betAmount * getBetOdds(selectedBet.type)}</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedBet;
