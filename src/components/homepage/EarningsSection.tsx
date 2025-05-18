
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle2, BarChart3, DollarSign, ChevronRight, ChevronLeft, Play, ArrowRight } from 'lucide-react';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts';

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

  const earningsData = {
    '1m': [
      { month: 'Week 1', withBet3: 580, withoutBet3: 290 },
      { month: 'Week 2', withBet3: 620, withoutBet3: 310 },
      { month: 'Week 3', withBet3: 750, withoutBet3: 340 },
      { month: 'Week 4', withBet3: 850, withoutBet3: 380 },
    ],
    '3m': [
      { month: 'Jan', withBet3: 2400, withoutBet3: 1200 },
      { month: 'Feb', withBet3: 3000, withoutBet3: 1300 },
      { month: 'Mar', withBet3: 3800, withoutBet3: 1600 },
    ],
    '6m': [
      { month: 'Jan', withBet3: 2400, withoutBet3: 1200 },
      { month: 'Feb', withBet3: 3000, withoutBet3: 1300 },
      { month: 'Mar', withBet3: 2800, withoutBet3: 900 },
      { month: 'Apr', withBet3: 3800, withoutBet3: 1600 },
      { month: 'May', withBet3: 4000, withoutBet3: 1700 },
      { month: 'Jun', withBet3: 4500, withoutBet3: 2100 },
    ],
    '1y': [
      { month: 'Jan', withBet3: 2400, withoutBet3: 1200 },
      { month: 'Feb', withBet3: 3000, withoutBet3: 1300 },
      { month: 'Mar', withBet3: 2800, withoutBet3: 900 },
      { month: 'Apr', withBet3: 3800, withoutBet3: 1600 },
      { month: 'May', withBet3: 4000, withoutBet3: 1700 },
      { month: 'Jun', withBet3: 3500, withoutBet3: 1400 },
      { month: 'Jul', withBet3: 4500, withoutBet3: 2100 },
      { month: 'Aug', withBet3: 5000, withoutBet3: 2400 },
      { month: 'Sep', withBet3: 5200, withoutBet3: 2500 },
      { month: 'Oct', withBet3: 5800, withoutBet3: 2600 },
      { month: 'Nov', withBet3: 6000, withoutBet3: 2700 },
      { month: 'Dec', withBet3: 6500, withoutBet3: 2800 },
    ]
  };

  const winRateData = {
    '1m': [
      { month: 'Week 1', withBet3: 58, withoutBet3: 29 },
      { month: 'Week 2', withBet3: 62, withoutBet3: 31 },
      { month: 'Week 3', withBet3: 65, withoutBet3: 34 },
      { month: 'Week 4', withBet3: 68, withoutBet3: 38 },
    ],
    '3m': [
      { month: 'Jan', withBet3: 60, withoutBet3: 32 },
      { month: 'Feb', withBet3: 65, withoutBet3: 35 },
      { month: 'Mar', withBet3: 68, withoutBet3: 38 },
    ],
    '6m': [
      { month: 'Jan', withBet3: 60, withoutBet3: 32 },
      { month: 'Feb', withBet3: 65, withoutBet3: 35 },
      { month: 'Mar', withBet3: 63, withoutBet3: 30 },
      { month: 'Apr', withBet3: 68, withoutBet3: 36 },
      { month: 'May', withBet3: 70, withoutBet3: 37 },
      { month: 'Jun', withBet3: 72, withoutBet3: 39 },
    ],
    '1y': Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      withBet3: 60 + Math.floor(Math.random() * 15),
      withoutBet3: 30 + Math.floor(Math.random() * 10)
    }))
  };

  const roiData = {
    '1m': [
      { month: 'Week 1', withBet3: 15, withoutBet3: 5 },
      { month: 'Week 2', withBet3: 18, withoutBet3: 6 },
      { month: 'Week 3', withBet3: 20, withoutBet3: 8 },
      { month: 'Week 4', withBet3: 22, withoutBet3: 10 },
    ],
    '3m': [
      { month: 'Jan', withBet3: 18, withoutBet3: 8 },
      { month: 'Feb', withBet3: 22, withoutBet3: 10 },
      { month: 'Mar', withBet3: 25, withoutBet3: 12 },
    ],
    '6m': [
      { month: 'Jan', withBet3: 18, withoutBet3: 8 },
      { month: 'Feb', withBet3: 22, withoutBet3: 10 },
      { month: 'Mar', withBet3: 20, withoutBet3: 6 },
      { month: 'Apr', withBet3: 25, withoutBet3: 12 },
      { month: 'May', withBet3: 28, withoutBet3: 13 },
      { month: 'Jun', withBet3: 32, withoutBet3: 15 },
    ],
    '1y': Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      withBet3: 18 + Math.floor(Math.random() * 20),
      withoutBet3: 8 + Math.floor(Math.random() * 10)
    }))
  };

  const chartConfig = {
    withBet3: {
      label: "With Bet 3.0",
      theme: {
        light: "#00f0ff",
        dark: "#00f0ff",
      },
    },
    withoutBet3: {
      label: "Without Bet 3.0",
      theme: {
        light: "#555",
        dark: "#888",
      },
    },
  };

  const benefits = [
    {
      id: 1,
      icon: <TrendingUp className="text-neon-blue" />,
      title: "Increase Win Rate",
      description: "Bet 3.0 users report up to 64% higher win rates compared to traditional betting strategies."
    },
    {
      id: 2,
      icon: <BarChart3 className="text-neon-blue" />,
      title: "Informed Decisions",
      description: "Data-driven insights help you make more calculated decisions for every bet."
    },
    {
      id: 3,
      icon: <DollarSign className="text-neon-blue" />,
      title: "Better ROI",
      description: "Users see an average ROI improvement of 38% in their first 3 months with Bet 3.0."
    }
  ];

  const activeTutorial = {
    title: "How to Use Bet 3.0 for Maximum Betting Profits",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    description: "Learn how to leverage our Bet 3.0 prediction system to maximize your betting profits and improve your win rate."
  };

  // Select data based on active chart and time range
  const activeData = activeChart === 'earnings' 
    ? earningsData[timeRange] 
    : activeChart === 'winRate' 
      ? winRateData[timeRange] 
      : roiData[timeRange];

  const chartTitle = activeChart === 'earnings' 
    ? 'Earnings Performance' 
    : activeChart === 'winRate' 
      ? 'Win Rate %' 
      : 'Return on Investment %';

  const getPercentageChange = () => {
    const lastIndex = activeData.length - 1;
    const bet3Value = activeData[lastIndex].withBet3;
    const nonBet3Value = activeData[lastIndex].withoutBet3;
    const percentageIncrease = ((bet3Value - nonBet3Value) / nonBet3Value) * 100;
    return Math.round(percentageIncrease);
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
        
        <motion.div 
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['earnings', 'winRate', 'roi'].map((chartType) => (
              <motion.div
                key={chartType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={activeChart === chartType ? 'default' : 'outline'}
                  onClick={() => setActiveChart(chartType as 'earnings' | 'winRate' | 'roi')}
                  className={activeChart === chartType 
                    ? 'bg-neon-blue text-black hover:bg-neon-blue/90' 
                    : 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10'}
                >
                  {chartType === 'earnings' ? 'Earnings' : chartType === 'winRate' ? 'Win Rate %' : 'ROI %'}
                </Button>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-end gap-2 mb-4">
            {['1m', '3m', '6m', '1y'].map((range) => (
              <motion.div
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={timeRange === range ? 'secondary' : 'ghost'}
                  onClick={() => setTimeRange(range as '1m' | '3m' | '6m' | '1y')}
                  size="sm"
                  className="text-xs"
                >
                  {range.toUpperCase()}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
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
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="lg:pl-4"
          >
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="benefits" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">Benefits</TabsTrigger>
                <TabsTrigger value="tutorial" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">Tutorial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="benefits" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
                <motion.h3 
                  className="text-2xl font-bold mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Why Choose Bet 3.0?
                </motion.h3>
                
                <ul className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.li 
                      key={benefit.id} 
                      className="flex gap-4 bg-dark-card/50 p-4 rounded-lg border border-dark-border hover:border-neon-blue/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
                    >
                      <motion.div 
                        className="mt-1 w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 240, 255, 0.2)' }}
                        animate={{ 
                          boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 10px rgba(0, 240, 255, 0.4)", "0 0 0px rgba(0, 240, 255, 0)"]
                        }}
                        transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className="mt-8 p-5 bg-gradient-to-r from-dark-lighter/80 to-dark-card/80 border border-dark-border rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        color: ["#aaff00", "#ccff00", "#aaff00"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="text-neon-lime mt-1" size={20} />
                    </motion.div>
                    <p className="text-white">
                      <span className="font-semibold">87% of our users</span> report making more profitable betting decisions after using Bet 3.0 for just 4 weeks.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="tutorial" className="focus-visible:outline-none focus-visible:ring-0">
                <motion.div 
                  className="bg-dark-card/50 p-5 rounded-lg border border-dark-border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{activeTutorial.title}</h3>
                  <div className="aspect-video w-full mb-4 bg-black/50 rounded-lg overflow-hidden">
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div 
                          className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-tr from-dark-card to-dark-card/50 relative"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                              className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center backdrop-blur-sm"
                              animate={{ 
                                boxShadow: ["0 0 0px rgba(0, 240, 255, 0)", "0 0 20px rgba(0, 240, 255, 0.6)", "0 0 0px rgba(0, 240, 255, 0)"],
                                scale: [1, 1.05, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Play className="text-neon-blue ml-1" size={30} />
                            </motion.div>
                          </div>
                          
                          {/* Video thumbnail with animated overlay */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="w-full h-full relative">
                              <img 
                                src="/placeholder.svg" 
                                alt="Tutorial thumbnail" 
                                className="w-full h-full object-cover opacity-50"
                              />
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent"
                                animate={{
                                  x: ["-100%", "100%"]
                                }}
                                transition={{
                                  duration: 2,
                                  ease: "easeInOut",
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="bg-dark-card border-dark-border sm:max-w-[700px]">
                        <div className="aspect-video w-full">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={activeTutorial.videoUrl}
                            title={activeTutorial.title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-gray-400">{activeTutorial.description}</p>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="text-gray-400 border-dark-border">
                        <ChevronLeft className="mr-1" size={16} /> Previous
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-neon-blue hover:bg-neon-blue/90 text-black" size="sm">
                        Next Tutorial <ChevronRight className="ml-1" size={16} />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                      className="bg-dark-card/30 border border-dark-border rounded-lg p-3 cursor-pointer hover:bg-dark-lighter/30 transition-all"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(0, 240, 255, 0.3)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (item * 0.1) }}
                    >
                      <div className="aspect-video bg-black/30 rounded mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={20} className="text-gray-400" />
                        </div>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent -translate-x-full"
                          whileHover={{ x: ["100%", "-100%"] }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                      <p className="text-sm font-medium truncate">Tutorial {item}: Advanced Tips</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <motion.div 
              className="mt-8 sm:mt-10 p-6 bg-gradient-to-br from-neon-blue/10 to-transparent rounded-xl border border-neon-blue/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
                borderColor: "rgba(0, 240, 255, 0.3)"
              }}
            >
              <h3 className="text-xl font-bold mb-3">Ready to improve your betting results?</h3>
              <p className="text-gray-400 mb-4">Start using Bet 3.0 today and see the difference in your performance.</p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium px-6 group">
                  Try Free for 7 Days 
                  <motion.span className="ml-1 inline-block">
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </motion.span>
                </Button>
              </motion.div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-neon-blue/50"
                    initial={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`, 
                      opacity: 0.1,
                      scale: 0.2
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`,
                      opacity: [0.1, 0.3, 0.1],
                      scale: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EarningsSection;
