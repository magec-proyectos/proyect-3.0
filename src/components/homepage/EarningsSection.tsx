
import React, { useState, useEffect } from 'react';
import ChartControls from './earnings/ChartControls';
import { earningsData, winRateData, roiData, chartConfig } from './earnings/ChartData';
import EarningsSectionBackground from './earnings/EarningsSectionBackground';
import EarningsSectionHeader from './earnings/EarningsSectionHeader';
import ChartSection from './earnings/ChartSection';
import InfoTabsSection from './earnings/InfoTabsSection';
import FloatingStats from './earnings/FloatingStats';

const EarningsSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'earnings' | 'winRate' | 'roi'>('earnings');
  const [timeRange, setTimeRange] = useState<'1m' | '6m' | '1y'>('6m');
  const [animateChart, setAnimateChart] = useState(true);
  const [chartKey, setChartKey] = useState(0);
  
  // Reset animation when chart type or time range changes
  useEffect(() => {
    setAnimateChart(false);
    setTimeout(() => {
      setChartKey(prev => prev + 1);
      setAnimateChart(true);
    }, 100);
  }, [activeChart, timeRange]);

  // Select data based on active chart and time range
  const activeData = activeChart === 'earnings' 
    ? earningsData[timeRange] 
    : activeChart === 'winRate' 
      ? winRateData[timeRange] 
      : roiData[timeRange];

  const getPercentageChange = () => {
    const lastIndex = activeData.length - 1;
    const bet3Value = activeData[lastIndex].withBet3;
    const nonBet3Value = activeData[lastIndex].withoutBet3;
    const percentageIncrease = ((bet3Value - nonBet3Value) / nonBet3Value) * 100;
    return Math.round(percentageIncrease);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark to-dark-darker relative overflow-hidden">
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
        
        <div className="grid grid-cols-1 gap-16">
          {/* Chart display with integrated calculator */}
          <ChartSection 
            activeChart={activeChart}
            timeRange={timeRange}
            chartKey={chartKey}
            animateChart={animateChart}
            activeData={activeData}
            chartConfig={chartConfig}
            getPercentageChange={getPercentageChange}
          />
          
          {/* Info tabs - Simplified */}
          <InfoTabsSection />
        </div>
      </div>
      
      {/* Floating statistics */}
      <FloatingStats />
    </section>
  );
};

export default EarningsSection;
