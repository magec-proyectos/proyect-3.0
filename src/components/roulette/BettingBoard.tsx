
import React from 'react';
import Cell from './Cell';
import { BetType } from './types';

// Define the wheel numbers
const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
  11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
  22, 18, 29, 7, 28, 12, 35, 3, 26
];

// European roulette board numbers arrangement
const boardNumbers = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
];

interface BettingBoardProps {
  onSelectBet: (type: BetType, number?: number) => void;
}

const BettingBoard: React.FC<BettingBoardProps> = ({ onSelectBet }) => {
  // Determine the color of a roulette number
  const getNumberColor = (num: number): 'red' | 'black' | 'green' => {
    if (num === 0) return 'green';
    
    // Red numbers in European roulette
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  return (
    <div className="bg-green-900 border-2 border-amber-900/60 rounded-lg p-3 overflow-hidden">
      <div className="flex">
        {/* Zero */}
        <div className="w-12 h-36 flex items-center justify-center">
          <Cell 
            text="0" 
            color="green"
            onClick={() => onSelectBet('straight', 0)}
          />
        </div>
        
        {/* Main grid */}
        <div className="flex-1">
          <div className="grid grid-cols-12 gap-1">
            {boardNumbers.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map(number => (
                  <Cell 
                    key={number} 
                    text={number.toString()} 
                    color={getNumberColor(number)}
                    onClick={() => onSelectBet('straight', number)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          
          {/* Bottom betting options */}
          <div className="grid grid-cols-3 gap-1 mt-1">
            <Cell 
              text="1st 12" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('1st12')}
              className="col-span-1"
            />
            <Cell 
              text="2nd 12" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('2nd12')}
              className="col-span-1"
            />
            <Cell 
              text="3rd 12" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('3rd12')}
              className="col-span-1"
            />
          </div>
          
          <div className="grid grid-cols-6 gap-1 mt-1">
            <Cell 
              text="1-18" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('1-18')}
              className="col-span-2"
            />
            <Cell 
              text="EVEN" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('even')}
              className="col-span-1"
            />
            <Cell 
              text="RED" 
              color="transparent"
              textSize="sm"
              textColor="text-red-600"
              onClick={() => onSelectBet('red')}
              className="col-span-1"
            />
            <Cell 
              text="BLACK" 
              color="transparent"
              textSize="sm"
              textColor="text-gray-900"
              backgroundColor="bg-black/80"
              onClick={() => onSelectBet('black')}
              className="col-span-1"
            />
            <Cell 
              text="ODD" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('odd')}
              className="col-span-1"
            />
            <Cell 
              text="19-36" 
              color="transparent"
              textSize="sm"
              onClick={() => onSelectBet('19-36')}
              className="col-span-2"
            />
          </div>
        </div>
      </div>
      
      {/* Advanced bet options */}
      <div className="mt-3 border-t border-amber-800/40 pt-3">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          <Cell 
            text="Split" 
            color="transparent"
            textSize="sm"
            onClick={() => onSelectBet('split', 17)} // Default to a common split bet
            className="col-span-1"
          />
          <Cell 
            text="Street" 
            color="transparent"
            textSize="sm"
            onClick={() => onSelectBet('street', 4)} // Default to a common street bet
            className="col-span-1"
          />
          <Cell 
            text="Corner" 
            color="transparent"
            textSize="sm"
            onClick={() => onSelectBet('corner', 23)} // Default to a common corner bet
            className="col-span-1"
          />
          <Cell 
            text="Six Line" 
            color="transparent"
            textSize="sm"
            onClick={() => onSelectBet('sixline', 10)} // Default to a common six line bet
            className="col-span-1"
          />
          <Cell 
            text="Neighbors" 
            color="transparent"
            textSize="sm"
            onClick={() => onSelectBet('neighbors', wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)])} // Random number for neighbors
            className="col-span-1"
          />
        </div>
      </div>
    </div>
  );
};

export default BettingBoard;
