
import React from 'react';
import { BetType } from './types';

interface BettingBoardProps {
  onSelectBet: (type: BetType, number?: number) => void;
}

const BettingBoard: React.FC<BettingBoardProps> = ({ onSelectBet }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-b from-green-900 to-green-800 p-4 rounded-md shadow-md">
        {/* Zero section */}
        <div className="flex justify-start mb-2">
          <button
            onClick={() => onSelectBet('straight', 0)}
            className="w-12 h-32 flex items-center justify-center bg-green-600 hover:bg-green-500 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            0
          </button>
          
          <button
            onClick={() => onSelectBet('straight', 37)}
            className="w-12 h-32 flex items-center justify-center bg-green-600 hover:bg-green-500 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20 ml-1"
          >
            00
          </button>
        </div>
        
        {/* Numbers grid */}
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }, (_, i) => i + 1).map(num => {
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const color = isRed ? 'bg-red-600 hover:bg-red-500' : 'bg-black hover:bg-gray-800';
            return (
              <button
                key={num}
                onClick={() => onSelectBet('straight', num)}
                className={`w-12 h-12 flex items-center justify-center ${color} hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20`}
              >
                {num}
              </button>
            );
          })}
        </div>
        
        {/* Outside bets */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('red')}
              className="w-full py-2 bg-red-600 hover:bg-red-500 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              Red
            </button>
            <button
              onClick={() => onSelectBet('black')}
              className="w-full py-2 bg-black hover:bg-gray-800 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              Black
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('odd')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              Odd
            </button>
            <button
              onClick={() => onSelectBet('even')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              Even
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('1-18')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              1-18
            </button>
            <button
              onClick={() => onSelectBet('19-36')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              19-36
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onSelectBet('1st12')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              1st 12
            </button>
            <button
              onClick={() => onSelectBet('2nd12')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              2nd 12
            </button>
            <button
              onClick={() => onSelectBet('3rd12')}
              className="w-full py-2 bg-dark-lighter hover:bg-dark-card hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
            >
              3rd 12
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingBoard;
