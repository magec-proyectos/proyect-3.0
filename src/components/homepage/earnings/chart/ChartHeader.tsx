
import React from 'react';

interface ChartHeaderProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ activeChart }) => {
  const getTitle = () => {
    switch (activeChart) {
      case 'earnings':
        return 'Earnings Comparison';
      case 'winRate':
        return 'Win Rate Improvement';
      case 'roi':
        return 'Return on Investment';
      default:
        return '';
    }
  };

  return (
    <div className="mb-2 px-1">
      <h4 className="text-sm sm:text-base font-medium text-white">{getTitle()}</h4>
    </div>
  );
};

export default ChartHeader;
