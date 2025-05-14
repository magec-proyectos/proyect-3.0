
import React from 'react';

interface PreviousResultsProps {
  results: number[];
}

const PreviousResults: React.FC<PreviousResultsProps> = ({ results }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-amber-200 font-semibold">Previous Results</h3>
      </div>
      
      <div className="bg-black/30 p-3 rounded-lg border border-amber-900/30">
        <div className="flex gap-2 flex-wrap justify-center">
          {results.map((num, index) => {
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const color = num === 0 ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
            
            return (
              <div 
                key={index} 
                className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold border border-white/20 
                           ${index === 0 ? 'ring-2 ring-amber-300 shadow-lg shadow-amber-300/30' : ''} 
                           ${index === 0 ? 'animate-pulse' : ''}`}
              >
                {num === 37 ? '00' : num}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-3 text-xs text-amber-200/60">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>{results.filter(num => [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)).length}</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-black rounded-full border border-white/20"></div>
            <span>{results.filter(num => ![0, 37, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)).length}</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>{results.filter(num => num === 0 || num === 37).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousResults;
