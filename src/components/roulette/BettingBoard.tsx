
import React, { useState } from 'react';
import { BetType } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BettingBoardProps {
  onSelectBet: (type: BetType, number?: number) => void;
}

const BettingBoard: React.FC<BettingBoardProps> = ({ onSelectBet }) => {
  const [showNeighborsDialog, setShowNeighborsDialog] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  
  const handleSelectNeighbors = (number: number) => {
    setSelectedNumber(number);
    setShowNeighborsDialog(true);
  };
  
  const confirmNeighborsBet = () => {
    if (selectedNumber !== null) {
      onSelectBet('neighbors', selectedNumber);
      setShowNeighborsDialog(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-green-800 p-3 rounded-md border border-amber-900/50 shadow-md">
        {/* Zero section */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => onSelectBet('straight', 0)}
            className="w-12 h-32 flex items-center justify-center bg-green-600 hover:bg-green-500 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            0
          </button>
        </div>
        
        {/* Numbers grid - 3 rows x 12 columns as in a real roulette table */}
        <div className="grid grid-cols-12 gap-1">
          {/* First row: 1-36 */}
          {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map(num => {
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const color = isRed ? 'bg-red-600 hover:bg-red-500' : 'bg-black hover:bg-gray-800';
            return (
              <div key={num} className="relative group">
                <button
                  onClick={() => onSelectBet('straight', num)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleSelectNeighbors(num);
                  }}
                  className={`w-12 h-12 flex items-center justify-center ${color} hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20`}
                >
                  {num}
                </button>
                <div className="hidden group-hover:block absolute top-full mt-1 z-10 bg-black/90 text-white text-xs p-1 rounded whitespace-nowrap">
                  Right-click for neighbors bet
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-12 gap-1 mt-1">
          {/* Second row: 1-36 */}
          {[2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].map(num => {
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const color = isRed ? 'bg-red-600 hover:bg-red-500' : 'bg-black hover:bg-gray-800';
            return (
              <div key={num} className="relative group">
                <button
                  onClick={() => onSelectBet('straight', num)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleSelectNeighbors(num);
                  }}
                  className={`w-12 h-12 flex items-center justify-center ${color} hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20`}
                >
                  {num}
                </button>
                <div className="hidden group-hover:block absolute top-full mt-1 z-10 bg-black/90 text-white text-xs p-1 rounded whitespace-nowrap">
                  Right-click for neighbors bet
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-12 gap-1 mt-1">
          {/* Third row: 1-36 */}
          {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].map(num => {
            const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
            const color = isRed ? 'bg-red-600 hover:bg-red-500' : 'bg-black hover:bg-gray-800';
            return (
              <div key={num} className="relative group">
                <button
                  onClick={() => onSelectBet('straight', num)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleSelectNeighbors(num);
                  }}
                  className={`w-12 h-12 flex items-center justify-center ${color} hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20`}
                >
                  {num}
                </button>
                <div className="hidden group-hover:block absolute top-full mt-1 z-10 bg-black/90 text-white text-xs p-1 rounded whitespace-nowrap">
                  Right-click for neighbors bet
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Outside bets */}
        <div className="grid grid-cols-3 gap-1 mt-3">
          {/* 1st, 2nd, 3rd dozen */}
          <button
            onClick={() => onSelectBet('1st12')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            1st 12
          </button>
          <button
            onClick={() => onSelectBet('2nd12')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            2nd 12
          </button>
          <button
            onClick={() => onSelectBet('3rd12')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            3rd 12
          </button>
        </div>
        
        <div className="grid grid-cols-6 gap-1 mt-1">
          {/* Even money bets */}
          <button
            onClick={() => onSelectBet('1-18')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            1-18
          </button>
          <button
            onClick={() => onSelectBet('even')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            EVEN
          </button>
          <button
            onClick={() => onSelectBet('red')}
            className="py-3 bg-red-600 hover:bg-red-500 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            <div className="w-6 h-6 mx-auto diamond bg-red-600 rotate-45"></div>
          </button>
          <button
            onClick={() => onSelectBet('black')}
            className="py-3 bg-black hover:bg-gray-800 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            <div className="w-6 h-6 mx-auto diamond bg-black rotate-45"></div>
          </button>
          <button
            onClick={() => onSelectBet('odd')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            ODD
          </button>
          <button
            onClick={() => onSelectBet('19-36')}
            className="py-3 bg-green-700 hover:bg-green-600 hover:scale-105 transition-all text-white font-bold rounded-sm border border-white/20"
          >
            19-36
          </button>
        </div>
      </div>
      
      {/* Neighbors Dialog */}
      <Dialog open={showNeighborsDialog} onOpenChange={setShowNeighborsDialog}>
        <DialogContent className="bg-green-900 border border-amber-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-amber-200">Neighbors Bet</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              A neighbors bet includes a number and two numbers on either side of it on the wheel 
              (total of 5 numbers).
            </p>
            
            {selectedNumber !== null && (
              <div className="flex justify-center space-x-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => {
                  const wheelIndex = (wheelNumbers.indexOf(selectedNumber) - 2 + i + wheelNumbers.length) % wheelNumbers.length;
                  const num = wheelNumbers[wheelIndex];
                  const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);
                  const isGreen = num === 0;
                  const bgColor = isGreen ? 'bg-green-600' : isRed ? 'bg-red-600' : 'bg-black';
                  const isCenter = i === 2;
                  
                  return (
                    <div 
                      key={i} 
                      className={`w-10 h-10 ${bgColor} flex items-center justify-center rounded-full text-white font-bold ${isCenter ? 'ring-2 ring-yellow-400 transform scale-125' : ''}`}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowNeighborsDialog(false)}
                className="border-amber-600 text-amber-200 hover:bg-amber-900/50"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmNeighborsBet}
                className="bg-amber-600 text-white hover:bg-amber-500"
              >
                Place Neighbors Bet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BettingBoard;
