
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ChartControls from '../earnings/ChartControls';
import { earningsData, winRateData, roiData, chartConfig } from '../earnings/ChartData';
import EarningsSectionBackground from '../earnings/EarningsSectionBackground';
import EarningsSectionHeader from '../earnings/EarningsSectionHeader';
import ChartSection from '../earnings/ChartSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatedCard } from '@/components/ui/micro-interaction';

const EarningsSection: React.FC = React.memo(() => {
  const [activeChart, setActiveChart] = useState<'earnings' | 'winRate' | 'roi'>('earnings');
  const [timeRange, setTimeRange] = useState<'1m' | '6m' | '1y'>('6m');
  const [animateChart, setAnimateChart] = useState(true);
  const [chartKey, setChartKey] = useState(0);
  const isMobile = useIsMobile();
  
  // Enhanced calculator state with better defaults
  const [monthlyBets, setMonthlyBets] = useState(isMobile ? 25 : 35);
  const [averageBet, setAverageBet] = useState(isMobile ? 40 : 65);
  
  // Reset animation when chart type or time range changes
  useEffect(() => {
    setAnimateChart(false);
    const timer = setTimeout(() => {
      setChartKey(prev => prev + 1);
      setAnimateChart(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [activeChart, timeRange]);

  // Enhanced base data selection with memoization
  const baseData = useMemo(() => {
    return activeChart === 'earnings' 
      ? earningsData[timeRange] 
      : activeChart === 'winRate' 
        ? winRateData[timeRange] 
        : roiData[timeRange];
  }, [activeChart, timeRange]);
  
  // Enhanced data calculation with better scaling algorithm
  const activeData = useMemo(() => {
    const volumeScale = Math.log(monthlyBets / 30 + 1) + 0.5; // Logarithmic scaling
    const sizeScale = Math.log(averageBet / 50 + 1) + 0.5;
    const combinedScale = (volumeScale + sizeScale) / 2;
    
    return baseData.map(item => {
      if (activeChart === 'earnings') {
        return {
          ...item,
          withBet3: Math.round(item.withBet3 * combinedScale),
          withoutBet3: Math.round(item.withoutBet3 * combinedScale)
        };
      } else {
        // More subtle scaling for percentages
        const subtleScale = 1 + (combinedScale - 1) * 0.25;
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
    <section className={`${isMobile ? 'py-16' : 'py-20 md:py-28'} bg-gradient-to-b from-dark via-dark-darker to-dark relative overflow-hidden`}>
      {/* Enhanced background elements */}
      <EarningsSectionBackground />
      
      <div className={`container ${isMobile ? 'px-4' : 'px-6'} relative z-10`}>
        <AnimatedCard intensity="subtle">
          {/* Enhanced section header */}
          <EarningsSectionHeader />
          
          {/* Enhanced chart controls */}
          <ChartControls 
            activeChart={activeChart}
            setActiveChart={setActiveChart}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          
          {/* Enhanced chart display with better integration */}
          <ChartSection 
            activeChart={activeChart}
            timeRange={timeRange}
            chartKey={chartKey}
            animateChart={animateChart}
            activeData={activeData}
            chartConfig={chartConfig}
            getPercentageChange={getPercentageChange}
            monthlyBets={monthlyBets}
            setMonthlyBets={setMonthlyBets}
            averageBet={averageBet}
            setAverageBet={setAverageBet}
          />
          
          {/* Enhanced explanation with better styling */}
          <div className={`text-center ${isMobile ? 'mt-8' : 'mt-12'} space-y-4`}>
            <div className="text-sm text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {isMobile ? (
                <p className="bg-dark-card/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
                  * Charts update with your settings: <span className="text-neon-blue font-semibold">{monthlyBets} bets/month</span> at <span className="text-neon-blue font-semibold">${averageBet} avg</span>
                </p>
              ) : (
                <div className="bg-dark-card/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 space-y-3">
                  <p>
                    * Charts reflect your betting parameters: <span className="text-neon-blue font-semibold">{monthlyBets} bets/month</span> at <span className="text-neon-blue font-semibold">${averageBet} average bet size</span>
                  </p>
                  <p className="text-xs">
                    Calculations based on historical performance data. Bet 3.0's AI technology analyzes 20+ competitions to improve your betting decisions and maximize your potential returns.
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
});

EarningsSection.displayName = 'EarningsSection';

export default EarningsSection;
