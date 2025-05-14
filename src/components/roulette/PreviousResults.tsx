
import React from 'react';

interface PreviousResultsProps {
  results: number[];
}

const PreviousResults: React.FC<PreviousResultsProps> = ({ results }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-300 font-semibold">Resultados Anteriores</h3>
      </div>
      
      <div className="bg-dark-lighter/70 p-3 rounded-lg shadow-inner">
        <div className="flex gap-2 flex-wrap justify-center">
          {results.map((num, index) => {
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const color = num === 0 ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
            
            return (
              <div 
                key={index} 
                className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold border border-white/20 
                           ${index === 0 ? 'ring-2 ring-neon-blue shadow-lg shadow-neon-blue/30' : ''} 
                           ${index === 0 ? 'animate-pulse' : ''}`}
              >
                {num === 37 ? '00' : num}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-3 text-xs text-gray-400">
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
