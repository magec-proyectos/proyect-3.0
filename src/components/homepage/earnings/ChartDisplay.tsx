
import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ChartContentWrapper from './ChartContentWrapper';
import ChartRenderer from './chart/ChartRenderer';
import ChartHeader from './chart/ChartHeader';
import { useChartDataPoint } from './chart/useChartDataPoint';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartDisplayProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '6m' | '1y';
  chartKey: number;
  animateChart: boolean;
  activeData: any[];
  chartConfig: {
    withBet3: {
      label: string;
      theme: {
        light: string;
        dark: string;
      };
    };
    withoutBet3: {
      label: string;
      theme: {
        light: string;
        dark: string;
      };
    };
  };
  getPercentageChange: () => number;
  // Calculator props
  monthlyBets?: number;
  averageBet?: number;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData,
  chartConfig,
  getPercentageChange,
  // Calculator props
  monthlyBets = 20,
  averageBet = 50
}) => {
  // Use custom hook for data point highlighting
  const {
    hoveredPoint,
    setHoveredPoint,
    animatingDataPoint
  } = useChartDataPoint({ activeData, animateChart });
  
  const percentageChange = getPercentageChange();
  const isPositive = percentageChange > 0;
      
  return (
    <motion.div 
      className="h-[280px] sm:h-[320px] md:h-[400px] w-full bg-dark-card rounded-xl p-4 border border-dark-border shadow-lg relative overflow-hidden"
      whileHover={{ boxShadow: "0 0 20px rgba(0, 240, 255, 0.15)" }}
      transition={{ duration: 0.3 }}
    >      
      {/* Chart header showing the title */}
      <ChartHeader 
        activeChart={activeChart}
        monthlyBets={monthlyBets}
        averageBet={averageBet}
      />
      
      {/* Performance indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-dark-lighter px-3 py-1 rounded-full text-sm">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-neon-blue" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={isPositive ? "text-neon-blue font-medium" : "text-red-500 font-medium"}>
          {isPositive ? "+" : ""}{percentageChange}%
        </span>
      </div>
      
      <div className="h-[90%] w-full relative z-10">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ChartContentWrapper>
            <ChartRenderer 
              activeChart={activeChart}
              chartKey={chartKey}
              animateChart={animateChart}
              activeData={activeData}
              hoveredPoint={hoveredPoint}
              setHoveredPoint={setHoveredPoint}
              animatingDataPoint={animatingDataPoint}
              monthlyBets={monthlyBets}
              averageBet={averageBet}
            />
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </ChartContentWrapper>
        </ChartContainer>
      </div>
      
      {/* Chart description legend */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-neon-blue"></div>
          <span className="text-white">With Bet 3.0</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-300">Without Bet 3.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChartDisplay;
