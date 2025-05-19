
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BettingTrend {
  type: string;
  homePercentage: number;
  drawPercentage?: number;
  awayPercentage: number;
  movement: 'up' | 'down' | 'stable';
}

interface BettingTrendsProps {
  trends: BettingTrend[];
  homeTeam: string;
  awayTeam: string;
}

const BettingTrends: React.FC<BettingTrendsProps> = ({ trends, homeTeam, awayTeam }) => {
  if (!trends || trends.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No betting trends available.
      </div>
    );
  }

  const getMovementIcon = (movement: string) => {
    switch (movement) {
      case 'up':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Betting Trends</h3>
        <div className="flex items-center text-sm text-gray-400">
          <Users size={16} className="mr-1" />
          <span>Based on 10,243 bettors</span>
        </div>
      </div>

      <div className="space-y-6">
        {trends.map((trend, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{trend.type}</div>
              <div className="flex items-center bg-dark-lighter px-2 py-1 rounded text-xs">
                {getMovementIcon(trend.movement)}
                <span className={`ml-1 ${
                  trend.movement === 'up' ? 'text-green-500' : 
                  trend.movement === 'down' ? 'text-red-500' : ''
                }`}>
                  {trend.movement === 'up' ? '+2.3%' : 
                   trend.movement === 'down' ? '-1.8%' : '0%'}
                </span>
              </div>
            </div>
            
            <div className="relative pt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{homeTeam} ({trend.homePercentage}%)</span>
                {trend.drawPercentage !== undefined && (
                  <span>Draw ({trend.drawPercentage}%)</span>
                )}
                <span>{awayTeam} ({trend.awayPercentage}%)</span>
              </div>
              
              <div className="h-1.5 w-full bg-dark-lighter rounded-full overflow-hidden flex">
                <div 
                  className="bg-neon-blue h-full" 
                  style={{ width: `${trend.homePercentage}%` }}
                ></div>
                {trend.drawPercentage !== undefined && (
                  <div 
                    className="bg-gray-500 h-full" 
                    style={{ width: `${trend.drawPercentage}%` }}
                  ></div>
                )}
                <div 
                  className="bg-neon-lime h-full" 
                  style={{ width: `${trend.awayPercentage}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BettingTrends;
