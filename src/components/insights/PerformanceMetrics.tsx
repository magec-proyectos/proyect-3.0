
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PerformanceMetricsProps {
  winRate: {
    value: number;
    change: number;
  };
  profit: {
    value: number;
    change: number;
  };
  totalBets: {
    value: number;
    period: string;
  };
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ winRate, profit, totalBets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Win Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-neon-blue">{winRate.value}%</span>
            <span className={`text-sm ${winRate.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {winRate.change >= 0 ? '+' : ''}{winRate.change}% vs last period
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-card border-dark-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-neon-lime">${profit.value}</span>
            <span className={`text-sm ${profit.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {profit.change >= 0 ? '+' : ''}{profit.change}% vs last period
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-card border-dark-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Bets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-white">{totalBets.value}</span>
            <span className="text-sm text-gray-400">{totalBets.period}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
