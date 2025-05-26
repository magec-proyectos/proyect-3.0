
import React from 'react';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';

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
  const getIcon = () => {
    switch (activeChart) {
      case 'earnings':
        return <DollarSign className="h-5 w-5 text-neon-blue mr-2" />;
      case 'winRate':
        return <TrendingUp className="h-5 w-5 text-neon-blue mr-2" />;
      case 'roi':
        return <Percent className="h-5 w-5 text-neon-blue mr-2" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeChart) {
      case 'earnings':
        return `Comparative Earnings`;
      case 'winRate':
        return `Win Rate Improvement`;
      case 'roi':
        return `Return on Investment`;
      default:
        return '';
    }
  };
  
  const getSubtitle = () => {
    return `${monthlyBets} bets of $${averageBet} each`;
  };

  return (
    <div className="mb-4 px-1">
      <div className="flex items-center">
        {getIcon()}
        <h4 className="text-base sm:text-lg font-medium text-white">{getTitle()}</h4>
      </div>
      <p className="text-xs text-gray-400 mt-1">{getSubtitle()}</p>
    </div>
  );
};

export default ChartHeader;
