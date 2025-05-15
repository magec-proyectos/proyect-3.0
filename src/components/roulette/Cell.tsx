
import React from 'react';

interface CellProps {
  text: string;
  color: string;
  onClick?: () => void;
  textSize?: 'xs' | 'sm' | 'base' | 'lg';
  textColor?: string;
  backgroundColor?: string;
  className?: string;
  cellKey?: string;
}

const Cell: React.FC<CellProps> = ({ 
  text, 
  color, 
  onClick, 
  textSize = 'base', 
  textColor = 'text-white',
  backgroundColor,
  className = '',
  cellKey
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

  return (
    <button
      key={cellKey}
      onClick={onClick}
      className={`${bgColor} ${textColor} ${textSizeClass} rounded font-medium flex items-center justify-center border border-amber-500/20 hover:brightness-110 transition-all h-8 ${className}`}
    >
      {text}
    </button>
  );
};

export default Cell;
