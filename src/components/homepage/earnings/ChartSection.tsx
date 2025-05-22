
import React, { useState } from 'react';
import ChartHeader from './chart/ChartHeader';
import ChartDisplay from './ChartDisplay';
import EarningsCalculator from './EarningsCalculator';

interface ChartSectionProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: any;
  getPercentageChange: () => number;
  monthlyBets: number;
  setMonthlyBets: (value: number) => void;
  averageBet: number;
  setAverageBet: (value: number) => void;
  percentageChange: number;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  activeChart,
  timeRange,
  chartKey,
  animateChart,
  activeData,
  chartConfig,
  getPercentageChange,
  monthlyBets,
  setMonthlyBets,
  averageBet,
  setAverageBet,
  percentageChange
}) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl shadow-lg overflow-hidden">
      <div className="p-4">
        <ChartHeader 
          activeChart={activeChart} 
          monthlyBets={monthlyBets}
          averageBet={averageBet}
          percentageChange={percentageChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Display */}
          <div className="lg:col-span-2">
            <ChartDisplay
              chartType={activeChart}
              timeRange={timeRange}
              animate={animateChart}
              data={activeData}
              config={chartConfig}
            />
          </div>
          
          {/* Calculator Widget */}
          <div className="lg:col-span-1">
            <EarningsCalculator
              monthlyBets={monthlyBets}
              setMonthlyBets={setMonthlyBets}
              averageBet={averageBet}
              setAverageBet={setAverageBet}
              percentIncrease={percentageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
