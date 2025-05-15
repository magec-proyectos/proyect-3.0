
import React from 'react';

interface CellProps {
  text: string;
  color: string;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  textSize?: 'xs' | 'sm' | 'base' | 'lg';
  textColor?: string;
  backgroundColor?: string;
  className?: string;
  cellKey?: string;
  highlight?: boolean;
}

const Cell: React.FC<CellProps> = ({ 
  text, 
  color, 
  onClick, 
  onHover, 
  onLeave,
  textSize = 'base', 
  textColor = 'text-white',
  backgroundColor,
  className = '',
  cellKey,
  highlight = false
}) => {
  // Determine background color based on the color prop
  const bgColor = backgroundColor || (
    color === 'red' ? 'bg-red-600' : 
    color === 'black' ? 'bg-black' : 
    color === 'green' ? 'bg-green-600' : 
    color === 'transparent' ? 'bg-amber-900/30' : 
    'bg-amber-900/30'
  );

  const textSizeClass = 
    textSize === 'xs' ? 'text-xs' : 
    textSize === 'sm' ? 'text-sm' :
    textSize === 'lg' ? 'text-lg' :
    'text-base';

  // Apply highlight effect if cell is highlighted
  const highlightClass = highlight ? 
    'ring-2 ring-amber-300 ring-opacity-80 shadow-[0_0_10px_rgba(245,158,11,0.6)] z-10 scale-105' : '';

  return (
    <button
      key={cellKey}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`${bgColor} ${textColor} ${textSizeClass} rounded font-medium flex items-center justify-center border border-amber-500/20 hover:brightness-110 transition-all h-8 ${highlightClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default Cell;
