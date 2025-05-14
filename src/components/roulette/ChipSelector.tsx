
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChipSelectorProps {
  chipAmount: number;
  decreaseChip: () => void;
  increaseChip: () => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({ chipAmount, decreaseChip, increaseChip }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Función para definir el color del chip según su valor
  const getChipColor = () => {
    if (chipAmount >= 500) return 'from-yellow-400 to-yellow-600';
    if (chipAmount >= 100) return 'from-blue-400 to-blue-600';
    if (chipAmount >= 50) return 'from-green-400 to-green-600';
    if (chipAmount >= 25) return 'from-red-400 to-red-600';
    return 'from-neon-blue to-blue-400';
  };
  
  return (
    <div className="space-y-3">
      <h3 className="text-gray-300 font-semibold">Fichas</h3>
      <div className="flex items-center justify-center gap-4">
        <Button 
          onClick={decreaseChip} 
          variant="outline" 
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-dark-card border-gray-600 hover:bg-dark-lighter"
          disabled={chipAmount <= 10}
        >
          -
        </Button>
        
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-lg font-bold transform transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
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
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-dark-card border-gray-600 hover:bg-dark-lighter"
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
                // Establecer directamente el valor del chip
                const newChipAmount = value;
                if (newChipAmount !== chipAmount) {
                  // Simular llamadas de aumento o disminución para actualizar el estado
                  if (newChipAmount > chipAmount) {
                    increaseChip();
                  } else {
                    decreaseChip();
                  }
                }
              }
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border 
                      ${chipAmount === value ? 'border-white ring-2 ring-white/50' : 'border-gray-600'} 
                      hover:scale-110 transition-transform ${
              value >= 500 ? 'bg-gradient-to-b from-yellow-400 to-yellow-600' : 
              value >= 100 ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 
              value >= 50 ? 'bg-gradient-to-b from-green-400 to-green-600' : 
              value >= 25 ? 'bg-gradient-to-b from-red-400 to-red-600' : 
                          'bg-gradient-to-b from-neon-blue to-blue-400'
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
