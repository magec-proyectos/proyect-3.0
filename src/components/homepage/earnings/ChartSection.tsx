
import React from 'react';
import ChartSectionContainer from './chart/ChartSectionContainer';

interface ChartSectionProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: any;
  getPercentageChange: () => number;
  // Calculator state props
  monthlyBets: number;
  setMonthlyBets: (value: number) => void;
  averageBet: number;
  setAverageBet: (value: number) => void;
}

const ChartSection: React.FC<ChartSectionProps> = (props) => {
  return <ChartSectionContainer {...props} />;
};

export default ChartSection;
