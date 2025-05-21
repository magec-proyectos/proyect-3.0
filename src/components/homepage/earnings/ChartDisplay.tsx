
import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ChartContentWrapper from './ChartContentWrapper';
import ChartRenderer from './chart/ChartRenderer';
import ChartDecorations from './chart/ChartDecorations';
import ChartHeader from './chart/ChartHeader';
import { useChartDataPoint } from './chart/useChartDataPoint';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChartDisplayProps {
  activeChart: 'earnings' | 'winRate' | 'roi';
  timeRange: '1m' | '3m' | '6m' | '1y';
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
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData,
  chartConfig,
  getPercentageChange 
}) => {
  // Use custom hook for data point highlighting
  const {
    hoveredPoint,
    setHoveredPoint,
    animatingDataPoint
  } = useChartDataPoint({ activeData, animateChart });
  
  // Get chart explanation based on type
  const getChartExplanation = () => {
    switch(activeChart) {
      case 'earnings':
        return "This chart shows your potential earnings with and without our Bet 3.0 AI system over time. The blue line represents earnings using our predictions.";
      case 'winRate':
        return "Win rate is the percentage of successful bets. Our AI consistently helps users achieve higher win rates compared to standard betting strategies.";
      case 'roi':
        return "Return on Investment (ROI) measures your profit relative to your betting investment. Higher percentages mean more efficient betting.";
    }
  };
      
  return (
    <motion.div 
      className="h-[28rem] lg:h-[32rem] w-full bg-dark-card rounded-xl p-6 border border-dark-border shadow-2xl backdrop-blur-sm relative overflow-hidden"
      whileHover={{ boxShadow: "0 0 40px rgba(0, 240, 255, 0.2)" }}
      transition={{ duration: 0.5 }}
    >
      {/* Chart decorations (background pattern, floating elements) */}
      <ChartDecorations percentageChange={getPercentageChange()} />
      
      {/* Chart header showing the title with explanation tooltip */}
      <div className="flex items-center justify-between">
        <ChartHeader activeChart={activeChart} />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-dark-card border border-neon-blue/20 p-3 max-w-xs">
              <p>{getChartExplanation()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="h-[80%] w-full relative z-10">
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
            />
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </ChartContentWrapper>
        </ChartContainer>
      </div>
    </motion.div>
  );
};

export default ChartDisplay;
