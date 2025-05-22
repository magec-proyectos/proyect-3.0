
import React, { useState } from 'react';
import RouletteWheel from './RouletteWheel';
import PreviousResults from './PreviousResults';
import ChipSelector from './ChipSelector';
import RouletteCamera from './RouletteCamera';
import WheelAnalysis from './WheelAnalysis';
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
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const handleImageCaptured = (imageData: string) => {
    setCapturedImage(imageData);
  };
  
  const clearAnalysis = () => {
    setCapturedImage(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Previous Results */}
      <PreviousResults results={previousResults} />
      
      {/* Roulette Wheel */}
      <div className="flex justify-center transform hover:scale-105 transition-transform duration-500 cursor-pointer">
        <RouletteWheel spinning={isSpinning} lastResult={lastSpinResult} />
      </div>
      
      {/* Chip Selector and Camera Button */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:items-center">
        <div className="flex-1">
          <ChipSelector 
            chipAmount={chipAmount}
            decreaseChip={decreaseChip}
            increaseChip={increaseChip}
          />
        </div>
        
        <div className="sm:flex-shrink-0">
          <RouletteCamera onImageCaptured={handleImageCaptured} />
        </div>
      </div>
      
      {/* Wheel Analysis */}
      {capturedImage && (
        <WheelAnalysis 
          imageData={capturedImage} 
          onClearAnalysis={clearAnalysis} 
        />
      )}
    </div>
  );
};

export default WheelSection;
