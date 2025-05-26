
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
  
  // Calculator state elevated to parent component with better defaults
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
  
  // Enhanced data calculation that responds to calculator inputs
  const activeData = useMemo(() => {
    // Create a more realistic scaling factor based on betting volume and size
    const volumeScale = monthlyBets / 30; // Base of 30 bets
    const sizeScale = averageBet / 50; // Base of $50 per bet
    const combinedScale = (volumeScale + sizeScale) / 2; // Average of both factors
    
    return baseData.map(item => {
      // Apply scaling more intelligently based on chart type
      if (activeChart === 'earnings') {
        return {
          ...item,
          withBet3: Math.round(item.withBet3 * combinedScale),
          withoutBet3: Math.round(item.withoutBet3 * combinedScale)
        };
      } else {
        // For winRate and ROI, scaling should be more subtle
        const subtleScale = 1 + (combinedScale - 1) * 0.3; // Reduce the impact
        return {
          ...item,
          withBet3: Math.round(item.withBet3 * subtleScale * 10) / 10,
          withoutBet3: Math.round(item.withoutBet3 * subtleScale * 10) / 10
        };
      }
    });
  }, [baseData, monthlyBets, averageBet, activeChart]);

  const getPercentageChange = useCallback(() => {
    if (!activeData.length) return 0;
    
    const lastIndex = activeData.length - 1;
    const bet3Value = activeData[lastIndex].withBet3;
    const nonBet3Value = activeData[lastIndex].withoutBet3;
    
    if (nonBet3Value === 0) return 0;
    
    const percentageIncrease = ((bet3Value - nonBet3Value) / Math.abs(nonBet3Value)) * 100;
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
        
        {/* Enhanced explanation text */}
        <div className="text-center mt-8 text-sm text-gray-400 max-w-3xl mx-auto">
          <p className="mb-2">
            * Charts reflect your betting parameters: <span className="text-neon-blue">{monthlyBets} bets/month</span> at <span className="text-neon-blue">${averageBet} average</span>
          </p>
          <p>
            Calculations based on historical performance data. Bet 3.0's AI technology analyzes 20+ competitions to improve your betting decisions.
          </p>
        </div>
      </div>
    </section>
  );
});

EarningsSection.displayName = 'EarningsSection';

export default EarningsSection;
