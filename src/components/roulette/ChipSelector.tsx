
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChipSelectorProps {
  chipAmount: number;
  decreaseChip: () => void;
  increaseChip: () => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ chipAmount, decreaseChip, increaseChip }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Function to define chip color based on value
  const getChipColor = () => {
    if (chipAmount >= 500) return 'from-yellow-400 to-yellow-600';
    if (chipAmount >= 100) return 'from-blue-400 to-blue-600';
    if (chipAmount >= 50) return 'from-green-400 to-green-600';
    if (chipAmount >= 25) return 'from-red-400 to-red-600';
    return 'from-amber-400 to-amber-600';
  };
  
  return (
    <div className="space-y-3">
      <h3 className="text-amber-200 font-semibold">Chips</h3>
      <div className="flex items-center justify-center gap-4">
        <Button 
          onClick={decreaseChip} 
          variant="outline" 
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-black/50 border-amber-900/50 text-amber-200 hover:bg-black/80"
          disabled={chipAmount <= 10}
        >
          -
        </Button>
        
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transform transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-b ${getChipColor()} shadow-lg flex items-center justify-center relative`}>
            <div className="absolute inset-1 rounded-full border-2 border-dashed border-white/30"></div>
            <div className="absolute inset-3 rounded-full border border-white/20"></div>
            <span className="text-white font-bold text-xl drop-shadow-md">${chipAmount}</span>
          </div>
        </div>
        
        <Button 
          onClick={increaseChip} 
          variant="outline" 
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-black/50 border-amber-900/50 text-amber-200 hover:bg-black/80"
          disabled={chipAmount >= 1000}
        >
          +
        </Button>
      </div>
      
      <div className="flex justify-center gap-2 mt-2">
        {[10, 25, 50, 100, 500].map(value => (
          <button
            key={value}
            onClick={() => {
              if (value <= 1000) {
                // Set chip amount directly 
                if (value > chipAmount) {
                  // Simulate multiple increases to reach the desired amount
                  increaseChip();
                } else if (value < chipAmount) {
                  // Simulate multiple decreases to reach the desired amount
                  decreaseChip();
                }
              }
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border 
                      ${chipAmount === value ? 'border-white ring-2 ring-amber-300/50' : 'border-amber-900/30'} 
                      hover:scale-110 transition-transform ${
              value >= 500 ? 'bg-gradient-to-b from-yellow-400 to-yellow-600' : 
              value >= 100 ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 
              value >= 50 ? 'bg-gradient-to-b from-green-400 to-green-600' : 
              value >= 25 ? 'bg-gradient-to-b from-red-400 to-red-600' : 
                          'bg-gradient-to-b from-amber-400 to-amber-600'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipSelector;
