
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

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
  
  // Chart rendering based on active type
  const renderChart = () => {
    if (activeChart === 'earnings' && animateChart) {
      return (
        <AnimatePresence>
          <motion.div 
            key={`barchart-${chartKey}`}
            className="h-full w-full" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getBarChartData()}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="name" type="category" stroke="#888" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#444' }} 
                  formatter={(value) => [`$${value}`, '']}
                  labelFormatter={() => ''}
                />
                <Bar dataKey="value" animationDuration={1500} animationBegin={300} isAnimationActive={true}>
                  {getBarChartData().map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      );
    }
    
    return (
      <AnimatePresence>
        <motion.div 
          key={`areachart-${chartKey}`}
          className="h-full w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWithBet3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWithoutBet3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#888" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#888" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#444' }} 
                formatter={(value: number, name: string) => {
                  const formattedValue = activeChart === 'earnings' ? `$${value}` : `${value}%`;
                  return [formattedValue, name === 'withBet3' ? 'With Bet 3.0' : 'Without Bet 3.0'];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="withBet3" 
                name="withBet3"
                stroke="#00f0ff" 
                fill="url(#colorWithBet3)" 
                strokeWidth={2}
                isAnimationActive={animateChart}
                animationDuration={1500}
                animationBegin={300}
              />
              <Area 
                type="monotone" 
                dataKey="withoutBet3" 
                name="withoutBet3"
                stroke="#888" 
                fill="url(#colorWithoutBet3)" 
                isAnimationActive={animateChart}
                animationDuration={1500}
                animationBegin={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Animated bar chart data preparation
  const getBarChartData = () => {
    if (activeChart === 'earnings') {
      const lastMonthData = activeData[activeData.length - 1];
      return [
        { name: 'Without Bet 3.0', value: lastMonthData.withoutBet3, color: '#888' },
        { name: 'With Bet 3.0', value: lastMonthData.withBet3, color: '#00f0ff' }
      ];
    }
    return [];
  };
  
  const chartTitle = activeChart === 'earnings' 
    ? 'Earnings Performance' 
    : activeChart === 'winRate' 
      ? 'Win Rate %' 
      : 'Return on Investment %';
      
  return (
    <motion.div 
      className="h-80 lg:h-96 w-full bg-dark-card rounded-xl p-6 border border-dark-border shadow-xl backdrop-blur-sm relative overflow-hidden"
      whileHover={{ boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)" }}
    >
      {/* Animated background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5 z-0" width="100%" height="100%">
        <pattern id="graph-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <motion.path 
            d="M 0 10 L 20 10 M 10 0 L 10 20" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
      </svg>
      
      <motion.h3 
        className="text-xl font-semibold mb-4 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {chartTitle}
      </motion.h3>
      
      <div className="h-[75%] w-full relative z-10">
        <ChartContainer config={chartConfig} className="w-full h-full">
          {renderChart()}
          <ChartLegend>
            <ChartLegendContent />
          </ChartLegend>
        </ChartContainer>
      </div>
      
      <motion.div 
        className="absolute bottom-6 right-8 bg-dark-lighter p-4 rounded-lg border border-dark-border shadow-lg z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-2"
          animate={{ 
            boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 10px rgba(0, 240, 255, 0.3)", "0 0 0px rgba(0, 240, 255, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <p className="text-sm font-medium">Bet 3.0: 
            <motion.span 
              className="text-neon-blue ml-1"
              animate={{ 
                textShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 5px rgba(0, 240, 255, 0.8)", "0 0 0px rgba(0, 240, 255, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              +{getPercentageChange()}%
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
      
      {/* Animated highlights */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent z-0"
        animate={{ 
          boxShadow: ["inset 0 0 0px rgba(0, 240, 255, 0)", "inset 0 0 20px rgba(0, 240, 255, 0.1)", "inset 0 0 0px rgba(0, 240, 255, 0)"],
          borderColor: ["rgba(0, 240, 255, 0)", "rgba(0, 240, 255, 0.15)", "rgba(0, 240, 255, 0)"]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ChartDisplay;
