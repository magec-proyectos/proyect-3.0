
import React from 'react';

interface ChartHeaderProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  monthlyBets?: number;
  averageBet?: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ 
  activeChart,
  monthlyBets = 20,
  averageBet = 50
}) => {
  const getTitle = () => {
    switch (activeChart) {
      case 'earnings':
        return `Earnings Comparison (${monthlyBets} bets at $${averageBet})`;
      case 'winRate':
        return `Win Rate Improvement (${monthlyBets} bets at $${averageBet})`;
      case 'roi':
        return `Return on Investment (${monthlyBets} bets at $${averageBet})`;
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
