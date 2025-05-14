
import React from 'react';

interface RouletteWheelProps {
  spinning: boolean;
  lastResult?: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, lastResult }) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-black to-red-600 border-4 border-gray-700 shadow-xl flex items-center justify-center">
        {/* Inner ring */}
        <div className="w-48 h-48 rounded-full bg-dark-lighter border-2 border-gray-700 flex items-center justify-center">
          {/* Center disc */}
          <div className={`w-24 h-24 rounded-full bg-dark/80 border border-gray-600 flex items-center justify-center text-3xl font-bold ${spinning ? 'animate-spin' : ''}`}>
            {lastResult !== undefined ? lastResult : 0}
          </div>
        </div>
      </div>
      
      {/* Ball indicator */}
      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full bg-white shadow-lg ${spinning ? 'animate-bounce' : ''}`}></div>
      
      {/* Number positions around the wheel (simplified) */}
      <div className="absolute inset-0">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 32 * Math.cos(rad) + 32;
          const y = 32 * Math.sin(rad) + 32;
          return (
            <div 
              key={i}
              className="absolute w-6 h-6 flex items-center justify-center text-xs font-bold text-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {i % 2 === 0 ? 
                <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center" /> : 
                <span className="w-4 h-4 bg-black rounded-full flex items-center justify-center" />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RouletteWheel;
