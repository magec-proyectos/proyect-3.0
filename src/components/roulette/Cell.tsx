
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
  // Determine background color based on the color prop using casino theme colors
  const bgColor = backgroundColor || (
    color === 'red' ? 'bg-casino-red' : 
    color === 'black' ? 'bg-casino-black' : 
    color === 'green' ? 'bg-casino-green' : 
    color === 'transparent' ? 'bg-dark/30' : 
    'bg-dark/30'
  );

  const textSizeClass = 
    textSize === 'xs' ? 'text-xs' : 
    textSize === 'sm' ? 'text-sm' :
    textSize === 'lg' ? 'text-lg' :
    'text-base';

  // Apply highlight effect if cell is highlighted
  const highlightClass = highlight ? 
    'ring-2 ring-casino-gold ring-opacity-80 shadow-[0_0_10px_rgba(212,175,55,0.6)] z-10 scale-105' : '';

  return (
    <button
      key={cellKey}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`${bgColor} ${textColor} ${textSizeClass} rounded font-casino font-medium flex items-center justify-center border border-casino-gold/20 
                hover:brightness-110 hover:border-casino-gold/40 transition-all duration-200 h-8 ${highlightClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default Cell;
