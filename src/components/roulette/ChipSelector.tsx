
import React from 'react';
import { Button } from '@/components/ui/button';

interface ChipSelectorProps {
  chipAmount: number;
  decreaseChip: () => void;
  increaseChip: () => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ chipAmount, decreaseChip, increaseChip }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-gray-300">Chip Value</h3>
      <div className="flex items-center justify-center gap-4">
        <Button 
          onClick={decreaseChip} 
          variant="outline" 
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
          disabled={chipAmount <= 10}
        >
          -
        </Button>
        
        <div 
          className="w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center text-lg font-bold border-4 border-white/20 shadow-lg shadow-neon-blue/20" 
        >
          ${chipAmount}
        </div>
        
        <Button 
          onClick={increaseChip} 
          variant="outline" 
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
          disabled={chipAmount >= 1000}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default ChipSelector;
