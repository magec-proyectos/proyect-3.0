
import React from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from '../ChartDisplay';
import EarningsCalculator from './EarningsCalculator';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartSectionContainerProps {
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

const ChartSectionContainer: React.FC<ChartSectionContainerProps> = ({ 
  activeChart, 
  timeRange, 
  chartKey, 
  animateChart, 
  activeData, 
  chartConfig,
  getPercentageChange,
  // Calculator state props
  monthlyBets,
  setMonthlyBets,
  averageBet,
  setAverageBet
}) => {
  const isMobile = useIsMobile();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      {isMobile ? (
        // Mobile layout: Calculator first, then chart
        <div className="space-y-4">
          <EarningsCalculator
            monthlyBets={monthlyBets}
            setMonthlyBets={setMonthlyBets}
            averageBet={averageBet}
            setAverageBet={setAverageBet}
            getPercentageChange={getPercentageChange}
            isMobile={isMobile}
          />
          
          <ChartDisplay 
            activeChart={activeChart}
            timeRange={timeRange}
            chartKey={chartKey}
            animateChart={animateChart}
            activeData={activeData}
            chartConfig={chartConfig}
            getPercentageChange={getPercentageChange}
            monthlyBets={monthlyBets}
            averageBet={averageBet}
          />
        </div>
      ) : (
        // Desktop layout: Side by side
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mb-4">
          {/* Chart area - 3/5 width on desktop */}
          <div className="lg:col-span-3">
            <ChartDisplay 
              activeChart={activeChart}
              timeRange={timeRange}
              chartKey={chartKey}
              animateChart={animateChart}
              activeData={activeData}
              chartConfig={chartConfig}
              getPercentageChange={getPercentageChange}
              monthlyBets={monthlyBets}
              averageBet={averageBet}
            />
          </div>
          
          {/* Integrated calculator - 2/5 width on desktop */}
          <div className="lg:col-span-2 h-full">
            <EarningsCalculator
              monthlyBets={monthlyBets}
              setMonthlyBets={setMonthlyBets}
              averageBet={averageBet}
              setAverageBet={setAverageBet}
              getPercentageChange={getPercentageChange}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChartSectionContainer;
