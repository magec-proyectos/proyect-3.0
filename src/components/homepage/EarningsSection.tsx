
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartControls from './earnings/ChartControls';
import { earningsData, winRateData, roiData, chartConfig } from './earnings/ChartData';
import EarningsSectionBackground from './earnings/EarningsSectionBackground';
import EarningsSectionHeader from './earnings/EarningsSectionHeader';
import ChartSection from './earnings/ChartSection';
import InfoTabsSection from './earnings/InfoTabsSection';
import FloatingStats from './earnings/FloatingStats';
import EarningsCalculator from './earnings/EarningsCalculator';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const EarningsSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'earnings' | 'winRate' | 'roi'>('earnings');
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('6m');
  const [animateChart, setAnimateChart] = useState(true);
  const [chartKey, setChartKey] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark to-dark-darker relative overflow-hidden">
      {/* Background elements */}
      <EarningsSectionBackground />
      
      <div className="container px-4 relative z-10">
        {/* Section header */}
        <EarningsSectionHeader />
        
        {/* Chart controls */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <ChartControls 
            activeChart={activeChart}
            setActiveChart={setActiveChart}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 gap-16">
          {/* Chart display */}
          <ChartSection 
            activeChart={activeChart}
            timeRange={timeRange}
            chartKey={chartKey}
            animateChart={animateChart}
            activeData={activeData}
            chartConfig={chartConfig}
            getPercentageChange={getPercentageChange}
          />
          
          {showCalculator ? (
            <EarningsCalculator onClose={() => setShowCalculator(false)} />
          ) : (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={() => setShowCalculator(true)}
                className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium rounded-full px-8 py-6 h-auto flex items-center gap-2 group"
              >
                Calculate Your Potential Earnings
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          )}
          
          {/* Info tabs */}
          <InfoTabsSection />
        </div>
      </div>
      
      {/* Floating statistics */}
      <FloatingStats />
    </section>
  );
};

export default EarningsSection;
