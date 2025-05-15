
import React from 'react';
import { useRoulette } from '@/contexts/RouletteContext';
import { PlacedBet } from './types';
import { X } from 'lucide-react';

const ActiveBets: React.FC = () => {
  const { placedBets, removeBet, totalBetAmount } = useRoulette();
  
  if (!placedBets.length) {
    return (
      <div className="bg-black/30 border border-amber-900/20 rounded-md p-3 text-center">
        <p className="text-amber-200/70 text-sm">No active bets. Place your bets!</p>
      </div>
    );
  }
  
  const getBetLabel = (bet: PlacedBet) => {
    switch (bet.type) {
      case 'straight': return `Straight up on ${bet.number}`;
      case 'split': return `Split on ${bet.number}`;
      case 'street': return `Street on ${bet.number}`;
      case 'corner': return `Corner on ${bet.number}`;
      case 'sixline': return `Six Line on ${bet.number}`;
      case 'neighbors': return `Neighbors of ${bet.number}`;
      default: return bet.type.charAt(0).toUpperCase() + bet.type.slice(1);
    }
  };
  
  const getChipColor = (amount: number) => {
    if (amount >= 500) return 'from-yellow-400 to-yellow-600';
    if (amount >= 100) return 'from-blue-400 to-blue-600';
    if (amount >= 50) return 'from-green-400 to-green-600';
    if (amount >= 25) return 'from-red-400 to-red-600';
    return 'from-amber-400 to-amber-600';
  };
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-amber-200 font-semibold">Active Bets</h3>
        <div className="text-amber-100 text-sm bg-amber-900/30 px-2 py-1 rounded">
          Total: ${totalBetAmount}
        </div>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {placedBets.map((bet) => (
          <div 
            key={bet.id} 
            className="flex items-center justify-between bg-black/30 border border-amber-900/20 rounded-md p-2"
          >
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-b ${getChipColor(bet.amount)} flex items-center justify-center text-white font-bold text-xs`}>
                ${bet.amount}
              </div>
              <div className="text-amber-100">
                {getBetLabel(bet)}
              </div>
            </div>
            <button 
              onClick={() => removeBet(bet.id)}
              className="text-amber-400/70 hover:text-amber-400 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBets;
