
import React from 'react';

interface PreviousResultsProps {
  results: number[];
}

const PreviousResults: React.FC<PreviousResultsProps> = ({ results }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-300">Previous Results</h3>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {results.map((num, index) => {
          const color = num === 0 ? 'bg-green-600' : 
                        num % 2 === 0 ? 'bg-black' : 'bg-red-600';
          return (
            <div 
              key={index} 
              className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold border border-white/20 ${index === 0 ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-dark-card' : ''}`}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousResults;
