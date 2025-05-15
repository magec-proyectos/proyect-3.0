
import React, { useState } from 'react';
import Cell from './Cell';
import { BetType } from './types';
import { getSplitNumbers, getCornerNumbers, getStreetNumbers, getSixLineNumbers, boardLayout } from './rouletteUtils';

// European roulette board numbers arrangement - using from rouletteUtils now

interface BettingBoardProps {
  onSelectBet: (type: BetType, number?: number) => void;
}

const BettingBoard: React.FC<BettingBoardProps> = ({ onSelectBet }) => {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
  const [hoveredBetType, setHoveredBetType] = useState<BetType | null>(null);
  const [highlightedNumbers, setHighlightedNumbers] = useState<number[]>([]);
  
  // Determine the color of a roulette number
  const getNumberColor = (num: number): 'red' | 'black' | 'green' => {
    if (num === 0) return 'green';
    
    // Red numbers in European roulette
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  // Handle hover effects for better user feedback
  const handleNumberHover = (number: number, betType: BetType = 'straight') => {
    setHoveredNumber(number);
    setHoveredBetType(betType);
    
    // Update highlighted numbers based on bet type
    let highlights: number[] = [number];
    
    if (betType === 'split') {
      const splits = getSplitNumbers(number);
      highlights = splits.length > 0 ? splits[0] : [number];
    } else if (betType === 'corner') {
      const corners = getCornerNumbers(number);
      highlights = corners.length > 0 ? corners[0] : [number];
    } else if (betType === 'street') {
      const streets = getStreetNumbers(number);
      highlights = streets.length > 0 ? streets[0] : [number];
    } else if (betType === 'sixline') {
      const sixlines = getSixLineNumbers(number);
      highlights = sixlines.length > 0 ? sixlines[0] : [number];
    }
    
    setHighlightedNumbers(highlights);
  };

  const handleNumberLeave = () => {
    setHoveredNumber(null);
    setHoveredBetType(null);
    setHighlightedNumbers([]);
  };

  // Check if a number should be highlighted
  const isHighlighted = (number: number) => {
    return highlightedNumbers.includes(number);
  };
  
  // Handle bet placement with visual feedback
  const handleBetPlacement = (type: BetType, number?: number) => {
    onSelectBet(type, number);
    
    // Play a sound effect for better feedback
    const clickSound = new Audio('/chip-place.mp3');
    clickSound.volume = 0.2;
    clickSound.play().catch(e => console.log("Audio play failed:", e));
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-900 border-2 border-amber-900/60 rounded-lg p-3 overflow-hidden">
        <div className="flex">
          {/* Zero */}
          <div className="w-12 h-36 flex items-center justify-center">
            <Cell 
              text="0" 
              color="green"
              onClick={() => handleBetPlacement('straight', 0)}
              onHover={() => handleNumberHover(0)}
              onLeave={handleNumberLeave}
              highlight={isHighlighted(0)}
              className="hover:scale-105 transition-transform"
            />
          </div>
          
          {/* Main grid */}
          <div className="flex-1">
            <div className="grid grid-cols-12 gap-1">
              {boardLayout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map(number => (
                    <Cell 
                      key={number} 
                      text={number.toString()} 
                      color={getNumberColor(number)}
                      onClick={() => handleBetPlacement('straight', number)}
                      onHover={() => handleNumberHover(number)}
                      onLeave={handleNumberLeave}
                      highlight={isHighlighted(number)}
                      className="hover:scale-105 transition-transform"
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
                onClick={() => handleBetPlacement('1st12')}
                onHover={() => handleNumberHover(6, '1st12')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-amber-800/50 transition-colors"
              />
              <Cell 
                text="2nd 12" 
                color="transparent"
                textSize="sm"
                onClick={() => handleBetPlacement('2nd12')}
                onHover={() => handleNumberHover(18, '2nd12')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-amber-800/50 transition-colors"
              />
              <Cell 
                text="3rd 12" 
                color="transparent"
                textSize="sm"
                onClick={() => handleBetPlacement('3rd12')}
                onHover={() => handleNumberHover(30, '3rd12')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-amber-800/50 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-6 gap-1 mt-1">
              <Cell 
                text="1-18" 
                color="transparent"
                textSize="sm"
                onClick={() => handleBetPlacement('1-18')}
                onHover={() => handleNumberHover(9, '1-18')}
                onLeave={handleNumberLeave}
                className="col-span-2 hover:bg-amber-800/50 transition-colors"
              />
              <Cell 
                text="EVEN" 
                color="transparent"
                textSize="sm"
                onClick={() => handleBetPlacement('even')}
                onHover={() => handleNumberHover(4, 'even')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-amber-800/50 transition-colors"
              />
              <Cell 
                text="RED" 
                color="transparent"
                textSize="sm"
                textColor="text-red-600"
                onClick={() => handleBetPlacement('red')}
                onHover={() => handleNumberHover(3, 'red')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-red-800/30 transition-colors"
              />
              <Cell 
                text="BLACK" 
                color="transparent"
                textSize="sm"
                textColor="text-gray-900"
                backgroundColor="bg-black/80"
                onClick={() => handleBetPlacement('black')}
                onHover={() => handleNumberHover(2, 'black')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-gray-800 transition-colors"
              />
              <Cell 
                text="ODD" 
                color="transparent"
                textSize="sm"
                onClick={() => handleBetPlacement('odd')}
                onHover={() => handleNumberHover(1, 'odd')}
                onLeave={handleNumberLeave}
                className="col-span-1 hover:bg-amber-800/50 transition-colors"
              />
              <Cell 
                text="19-36" 
                color="transparent"
                textSize="sm"
                onClick={() => handleBetPlacement('19-36')}
                onHover={() => handleNumberHover(25, '19-36')}
                onLeave={handleNumberLeave}
                className="col-span-2 hover:bg-amber-800/50 transition-colors"
              />
            </div>
          </div>
        </div>
        
        {/* Advanced bet options with improved UI */}
        <div className="mt-3 border-t border-amber-800/40 pt-3">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            <Cell 
              text="Split" 
              color="transparent"
              textSize="sm"
              onClick={() => handleBetPlacement('split', 17)}
              onHover={() => handleNumberHover(17, 'split')}
              onLeave={handleNumberLeave}
              className="col-span-1 hover:bg-amber-700/30 transition-colors"
            />
            <Cell 
              text="Street" 
              color="transparent"
              textSize="sm"
              onClick={() => handleBetPlacement('street', 4)}
              onHover={() => handleNumberHover(4, 'street')}
              onLeave={handleNumberLeave}
              className="col-span-1 hover:bg-amber-700/30 transition-colors"
            />
            <Cell 
              text="Corner" 
              color="transparent"
              textSize="sm"
              onClick={() => handleBetPlacement('corner', 23)}
              onHover={() => handleNumberHover(23, 'corner')}
              onLeave={handleNumberLeave}
              className="col-span-1 hover:bg-amber-700/30 transition-colors"
            />
            <Cell 
              text="Six Line" 
              color="transparent"
              textSize="sm"
              onClick={() => handleBetPlacement('sixline', 10)}
              onHover={() => handleNumberHover(10, 'sixline')}
              onLeave={handleNumberLeave}
              className="col-span-1 hover:bg-amber-700/30 transition-colors"
            />
            <Cell 
              text="Neighbors" 
              color="transparent"
              textSize="sm"
              onClick={() => handleBetPlacement('neighbors', 5)}
              onHover={() => handleNumberHover(5, 'neighbors')}
              onLeave={handleNumberLeave}
              className="col-span-1 hover:bg-amber-700/30 transition-colors"
            />
          </div>
        </div>
      </div>
      
      {/* Bet type description for better user information */}
      {hoveredBetType && (
        <div className="text-xs text-amber-200/80 p-2 bg-black/40 rounded border border-amber-500/20 animate-fade-in">
          <p className="font-medium mb-1">
            {hoveredBetType === 'straight' && 'Straight Up: Bet on a single number.'}
            {hoveredBetType === 'split' && 'Split Bet: Bet on two adjacent numbers.'}
            {hoveredBetType === 'street' && 'Street Bet: Bet on three numbers in a row.'}
            {hoveredBetType === 'corner' && 'Corner Bet: Bet on four numbers that form a square.'}
            {hoveredBetType === 'sixline' && 'Six Line: Bet on six numbers from two adjacent rows.'}
            {hoveredBetType === 'neighbors' && 'Neighbors: Bet on five adjacent numbers on the wheel.'}
            {hoveredBetType === 'red' && 'Red: Bet on all red numbers.'}
            {hoveredBetType === 'black' && 'Black: Bet on all black numbers.'}
            {hoveredBetType === 'even' && 'Even: Bet on all even numbers (2, 4, 6, etc).'}
            {hoveredBetType === 'odd' && 'Odd: Bet on all odd numbers (1, 3, 5, etc).'}
            {hoveredBetType === '1-18' && 'Low: Bet on numbers 1 through 18.'}
            {hoveredBetType === '19-36' && 'High: Bet on numbers 19 through 36.'}
            {hoveredBetType === '1st12' && 'First Dozen: Bet on numbers 1 through 12.'}
            {hoveredBetType === '2nd12' && 'Second Dozen: Bet on numbers 13 through 24.'}
            {hoveredBetType === '3rd12' && 'Third Dozen: Bet on numbers 25 through 36.'}
          </p>
          <div className="flex justify-between items-center text-xs text-amber-200/60">
            <span>{hoveredBetType === 'straight' ? 'Payout 35:1' : hoveredBetType === 'split' ? 'Payout 17:1' : 
                   hoveredBetType === 'street' ? 'Payout 11:1' : hoveredBetType === 'corner' ? 'Payout 8:1' :
                   hoveredBetType === 'sixline' ? 'Payout 5:1' : hoveredBetType === 'neighbors' ? 'Payout 7:1' :
                   hoveredBetType.includes('12') ? 'Payout 2:1' : 'Payout 1:1'}</span>
            <span>
              {hoveredBetType === 'straight' ? 'Probability 2.7%' : hoveredBetType === 'split' ? 'Probability 5.4%' : 
               hoveredBetType === 'street' ? 'Probability 8.1%' : hoveredBetType === 'corner' ? 'Probability 10.8%' :
               hoveredBetType === 'sixline' ? 'Probability 16.2%' : hoveredBetType === 'neighbors' ? 'Probability 13.5%' :
               hoveredBetType.includes('12') ? 'Probability 32.4%' : 'Probability 48.6%'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingBoard;
