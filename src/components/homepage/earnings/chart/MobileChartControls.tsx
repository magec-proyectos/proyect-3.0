
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, BarChart3, TrendingUp, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileChartControlsProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  setActiveChart: (chart: 'earnings' | 'winRate' | 'roi') => void;
  timeRange: '1m' | '6m' | '1y';
  setTimeRange: (range: '1m' | '6m' | '1y') => void;
}

const MobileChartControls: React.FC<MobileChartControlsProps> = ({
  activeChart,
  setActiveChart,
  timeRange,
  setTimeRange
}) => {
  const [showChartTypes, setShowChartTypes] = useState(false);
  
  const chartTypes = [
    { id: 'earnings', label: 'Earnings', icon: BarChart3, color: 'text-neon-blue' },
    { id: 'winRate', label: 'Win Rate', icon: TrendingUp, color: 'text-green-400' },
    { id: 'roi', label: 'ROI', icon: Percent, color: 'text-purple-400' }
  ];
  
  const timeRanges = [
    { id: '1m', label: '1M' },
    { id: '6m', label: '6M' },
    { id: '1y', label: '1Y' }
  ];
  
  const activeChartData = chartTypes.find(chart => chart.id === activeChart);
  const ActiveIcon = activeChartData?.icon || BarChart3;

  return (
    <div className="space-y-3 mb-4">
      {/* Chart Type Selector */}
      <div className="relative">
        <Button
          variant="outline"
          className="w-full h-12 bg-dark-card border-neon-blue/30 hover:border-neon-blue/50 flex items-center justify-between"
          onClick={() => setShowChartTypes(!showChartTypes)}
        >
          <div className="flex items-center gap-2">
            <ActiveIcon className={`h-4 w-4 ${activeChartData?.color}`} />
            <span className="text-white font-medium">{activeChartData?.label}</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${showChartTypes ? 'rotate-180' : ''}`} />
        </Button>
        
        <AnimatePresence>
          {showChartTypes && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-1 bg-dark-card border border-neon-blue/30 rounded-lg shadow-lg z-50 overflow-hidden"
            >
              {chartTypes.map((chart) => {
                const ChartIcon = chart.icon;
                return (
                  <button
                    key={chart.id}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-lighter transition-colors ${
                      activeChart === chart.id ? 'bg-dark-lighter' : ''
                    }`}
                    onClick={() => {
                      setActiveChart(chart.id as 'earnings' | 'winRate' | 'roi');
                      setShowChartTypes(false);
                    }}
                  >
                    <ChartIcon className={`h-4 w-4 ${chart.color}`} />
                    <span className="text-white">{chart.label}</span>
                    {activeChart === chart.id && (
                      <div className="ml-auto w-2 h-2 bg-neon-blue rounded-full" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Time Range Selector */}
      <div className="flex gap-1 bg-dark-lighter p-1 rounded-lg">
        {timeRanges.map((range) => (
          <Button
            key={range.id}
            variant="ghost"
            size="sm"
            className={`flex-1 h-9 text-xs font-medium rounded-md transition-all ${
              timeRange === range.id 
                ? 'bg-neon-blue text-black' 
                : 'text-gray-300 hover:text-white hover:bg-dark-card'
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

export default MobileChartControls;
