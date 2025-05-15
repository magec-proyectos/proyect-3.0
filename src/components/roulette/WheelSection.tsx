
import React from 'react';
import RouletteWheel from './RouletteWheel';
import PreviousResults from './PreviousResults';
import ChipSelector from './ChipSelector';
import { useRoulette } from '@/contexts/RouletteContext';

const WheelSection: React.FC = () => {
  const { 
    previousResults, 
    isSpinning, 
    lastSpinResult, 
    chipAmount, 
    decreaseChip, 
    increaseChip 
  } = useRoulette();
  
  return (
    <div className="space-y-6">
      {/* Previous Results */}
      <PreviousResults results={previousResults} />
      
      {/* Roulette Wheel */}
      <div className="flex justify-center transform hover:scale-105 transition-transform duration-500 cursor-pointer">
        <RouletteWheel spinning={isSpinning} lastResult={lastSpinResult} />
      </div>
      
      {/* Chip Selector */}
      <ChipSelector 
        chipAmount={chipAmount}
        decreaseChip={decreaseChip}
        increaseChip={increaseChip}
      />
    </div>
  );
};

export default WheelSection;
