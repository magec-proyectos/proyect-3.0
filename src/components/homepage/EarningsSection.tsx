
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChartDisplay from './earnings/ChartDisplay';
import ChartControls from './earnings/ChartControls';
import InfoTabs from './earnings/InfoTabs';
import { earningsData, winRateData, roiData, chartConfig } from './earnings/ChartData';

const EarningsSection = () => {
  const [activeChart, setActiveChart] = useState<'earnings' | 'winRate' | 'roi'>('earnings');
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('6m');
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
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

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
    <section className="py-20 bg-gradient-to-b from-dark to-dark-darker relative overflow-hidden">
      {/* Animated Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-20"></div>
      <motion.div 
        className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-lime/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            animate={{ 
              textShadow: ["0 0 8px rgba(0,240,255,0.3)", "0 0 16px rgba(0,240,255,0.6)", "0 0 8px rgba(0,240,255,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Boost Your Earnings
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See the difference our Bet 3.0 prediction system can make to your betting performance
          </p>
        </motion.div>
        
        <ChartControls 
          activeChart={activeChart}
          setActiveChart={setActiveChart}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <ChartDisplay 
              activeChart={activeChart}
              timeRange={timeRange}
              chartKey={chartKey}
              animateChart={animateChart}
              activeData={activeData}
              chartConfig={chartConfig}
              getPercentageChange={getPercentageChange}
            />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="lg:pl-4"
          >
            <InfoTabs />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EarningsSection;
