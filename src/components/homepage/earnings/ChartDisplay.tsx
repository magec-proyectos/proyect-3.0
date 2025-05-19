
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
  
  // Calculate percentage improvement
  const percentageChange = getPercentageChange();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
      
  return (
    <motion.div 
      className="h-[32rem] lg:h-[36rem] xl:h-[40rem] w-full bg-dark-card rounded-xl p-6 border border-dark-border shadow-2xl backdrop-blur-sm relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        boxShadow: "0 0 40px rgba(0, 240, 255, 0.3)",
        scale: 1.01,
        transition: { duration: 0.5 }
      }}
    >
      {/* Chart decorations (background pattern, floating elements) */}
      <ChartDecorations percentageChange={percentageChange} />
      
      {/* Chart header showing the title */}
      <ChartHeader activeChart={activeChart} />
      
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
