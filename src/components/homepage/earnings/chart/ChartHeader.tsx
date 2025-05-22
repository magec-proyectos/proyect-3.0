
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
        return `Ganancias Comparativas`;
      case 'winRate':
        return `Mejora en Tasa de Victoria`;
      case 'roi':
        return `Retorno de Inversión`;
      default:
        return '';
    }
  };
  
  const getSubtitle = () => {
    return `${monthlyBets} apuestas de $${averageBet} cada una`;
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
