
import React from 'react';
import BarChartRenderer from './BarChartRenderer';
import AreaChartRenderer from './AreaChartRenderer';

interface ChartRendererProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  hoveredPoint: number | null;
  setHoveredPoint: (point: number | null) => void;
  animatingDataPoint: boolean;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ 
  activeChart, 
  chartKey, 
  animateChart, 
  activeData,
  hoveredPoint,
  setHoveredPoint,
  animatingDataPoint
}) => {
  // Prepare bar chart data if needed
  const getBarChartData = () => {
    if (activeChart === 'earnings') {
      const lastMonthData = activeData[activeData.length - 1];
      return [
        { name: 'Without Bet 3.0', value: lastMonthData.withoutBet3, color: '#888' },
        { name: 'With Bet 3.0', value: lastMonthData.withBet3, color: '#00f0ff' }
      ];
    }
    return [];
  };
  
  // For earnings, show bar chart
  if (activeChart === 'earnings' && animateChart) {
    return (
      <BarChartRenderer 
        data={getBarChartData()}
        chartKey={chartKey}
        hoveredPoint={hoveredPoint}
        setHoveredPoint={setHoveredPoint}
        animatingDataPoint={animatingDataPoint}
      />
    );
  }
  
  // For other charts, show area chart
  return (
    <AreaChartRenderer
      data={activeData}
      chartKey={chartKey}
      hoveredPoint={hoveredPoint}
      setHoveredPoint={setHoveredPoint}
      animatingDataPoint={animatingDataPoint}
      activeChart={activeChart}
      animateChart={animateChart}
    />
  );
};

export default ChartRenderer;
