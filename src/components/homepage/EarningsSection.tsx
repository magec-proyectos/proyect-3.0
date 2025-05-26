
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ChartControls from './earnings/ChartControls';
import { earningsData, winRateData, roiData, chartConfig } from './earnings/ChartData';
import EarningsSectionBackground from './earnings/EarningsSectionBackground';
import EarningsSectionHeader from './earnings/EarningsSectionHeader';
import ChartSection from './earnings/ChartSection';
import { useIsMobile } from '@/hooks/use-mobile';

const EarningsSection: React.FC = React.memo(() => {
  const [activeChart, setActiveChart] = useState<'earnings' | 'winRate' | 'roi'>('earnings');
  const [timeRange, setTimeRange] = useState<'1m' | '6m' | '1y'>('6m');
  const [animateChart, setAnimateChart] = useState(true);
  const [chartKey, setChartKey] = useState(0);
  const isMobile = useIsMobile();
  
  // Calculator state elevated to parent component
  const [monthlyBets, setMonthlyBets] = useState(isMobile ? 20 : 30);
  const [averageBet, setAverageBet] = useState(isMobile ? 30 : 50);
  
  // Reset animation when chart type or time range changes
  useEffect(() => {
    setAnimateChart(false);
    const timer = setTimeout(() => {
      setChartKey(prev => prev + 1);
      setAnimateChart(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeChart, timeRange]);

  // Memoize base data selection
  const baseData = useMemo(() => {
    return activeChart === 'earnings' 
      ? earningsData[timeRange] 
      : activeChart === 'winRate' 
        ? winRateData[timeRange] 
        : roiData[timeRange];
  }, [activeChart, timeRange]);
  
  // Memoize scaled data calculation
  const activeData = useMemo(() => {
    const scaleFactor = (monthlyBets / 20) * (averageBet / 50);
    
    return baseData.map(item => ({
      ...item,
      withBet3: Math.round(item.withBet3 * scaleFactor),
      withoutBet3: Math.round(item.withoutBet3 * scaleFactor)
    }));
  }, [baseData, monthlyBets, averageBet]);

  const getPercentageChange = useCallback(() => {
    const lastIndex = activeData.length - 1;
    const bet3Value = activeData[lastIndex].withBet3;
    const nonBet3Value = activeData[lastIndex].withoutBet3;
    const percentageIncrease = ((bet3Value - nonBet3Value) / nonBet3Value) * 100;
    return Math.round(percentageIncrease);
  }, [activeData]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-dark to-dark-darker relative overflow-hidden">
      {/* Background elements */}
      <EarningsSectionBackground />
      
      <div className="container px-4 relative z-10">
        {/* Section header */}
        <EarningsSectionHeader />
        
        {/* Chart controls */}
        <ChartControls 
          activeChart={activeChart}
          setActiveChart={setActiveChart}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        
        {/* Chart display with integrated calculator */}
        <ChartSection 
          activeChart={activeChart}
          timeRange={timeRange}
          chartKey={chartKey}
          animateChart={animateChart}
          activeData={activeData}
          chartConfig={chartConfig}
          getPercentageChange={getPercentageChange}
          // Pass calculator state and setters
          monthlyBets={monthlyBets}
          setMonthlyBets={setMonthlyBets}
          averageBet={averageBet}
          setAverageBet={setAverageBet}
        />
        
        {/* Additional explanation text */}
        <div className="text-center mt-8 text-sm text-gray-400 max-w-2xl mx-auto">
          <p>* Calculations are based on average historical performance and may vary based on individual betting patterns. Bet 3.0 uses advanced AI technology to improve betting decisions.</p>
        </div>
      </div>
    </section>
  );
});

EarningsSection.displayName = 'EarningsSection';

export default EarningsSection;
