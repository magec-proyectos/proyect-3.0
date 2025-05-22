
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartControlsProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  setActiveChart: (chart: 'earnings' | 'winRate' | 'roi') => void;
  timeRange: '1m' | '6m' | '1y';
  setTimeRange: (range: '1m' | '6m' | '1y') => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  activeChart,
  setActiveChart,
  timeRange,
  setTimeRange
}) => {
  const isMobile = useIsMobile();
  
  const chartTypes = [
    { id: 'earnings', label: 'Earnings' },
    { id: 'winRate', label: 'Win Rate' },
    { id: 'roi', label: 'ROI' }
  ];
  
  const timeRanges = [
    { id: '1m', label: '1 Month' },
    { id: '6m', label: '6 Months' },
    { id: '1y', label: '1 Year' }
  ];
  
  return (
    <div className={`flex flex-col ${isMobile ? 'gap-3' : 'sm:flex-row sm:justify-between'} mb-6`}>
      <div className="inline-flex flex-wrap gap-2 justify-center sm:justify-start">
        {chartTypes.map((chart) => (
          <Button
            key={chart.id}
            variant={activeChart === chart.id ? "default" : "outline"}
            size="sm"
            className={`px-4 py-1 h-8 text-xs font-medium rounded-full ${
              activeChart === chart.id 
                ? 'bg-neon-blue text-black border-neon-blue'
                : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setActiveChart(chart.id as 'earnings' | 'winRate' | 'roi')}
          >
            {chart.label}
          </Button>
        ))}
      </div>
      
      <div className="inline-flex gap-2 justify-center sm:justify-start">
        {timeRanges.map((range) => (
          <Button
            key={range.id}
            variant={timeRange === range.id ? "default" : "outline"}
            size="sm"
            className={`px-4 py-1 h-8 text-xs font-medium rounded-full ${
              timeRange === range.id 
                ? 'bg-dark-lighter text-white border-neon-blue/50'
                : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white'
            }`}
            onClick={() => setTimeRange(range.id as '1m' | '6m' | '1y')}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChartControls;
