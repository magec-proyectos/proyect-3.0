
import React from 'react';
import { BarChart3, TrendingUp, Percent } from 'lucide-react';

interface ChartHeaderProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  monthlyBets: number;
  averageBet: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ 
  activeChart, 
  monthlyBets, 
  averageBet 
}) => {
  const getChartInfo = () => {
    switch (activeChart) {
      case 'earnings':
        return {
          icon: <BarChart3 className="h-5 w-5 text-neon-blue" />,
          title: 'Monthly Earnings',
          subtitle: `Based on ${monthlyBets} bets at $${averageBet} average`
        };
      case 'winRate':
        return {
          icon: <TrendingUp className="h-5 w-5 text-green-400" />,
          title: 'Win Rate Improvement',
          subtitle: `Performance with ${monthlyBets} monthly bets`
        };
      case 'roi':
        return {
          icon: <Percent className="h-5 w-5 text-purple-400" />,
          title: 'Return on Investment',
          subtitle: `ROI analysis for $${averageBet} average bets`
        };
    }
  };

  const chartInfo = getChartInfo();

  return (
    <div className="flex items-start gap-3 mb-4">
      {chartInfo.icon}
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">
          {chartInfo.title}
        </h4>
        <p className="text-sm text-gray-400">
          {chartInfo.subtitle}
        </p>
      </div>
    </div>
  );
};

export default ChartHeader;
