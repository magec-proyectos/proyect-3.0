
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, BarChart3, DollarSign, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EarningsSection = () => {
  const [activeChart, setActiveChart] = useState<'earnings' | 'winRate' | 'roi'>('earnings');
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('6m');
  
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
      { month: 'Week 1', withAI: 580, withoutAI: 290 },
      { month: 'Week 2', withAI: 620, withoutAI: 310 },
      { month: 'Week 3', withAI: 750, withoutAI: 340 },
      { month: 'Week 4', withAI: 850, withoutAI: 380 },
    ],
    '3m': [
      { month: 'Jan', withAI: 2400, withoutAI: 1200 },
      { month: 'Feb', withAI: 3000, withoutAI: 1300 },
      { month: 'Mar', withAI: 3800, withoutAI: 1600 },
    ],
    '6m': [
      { month: 'Jan', withAI: 2400, withoutAI: 1200 },
      { month: 'Feb', withAI: 3000, withoutAI: 1300 },
      { month: 'Mar', withAI: 2800, withoutAI: 900 },
      { month: 'Apr', withAI: 3800, withoutAI: 1600 },
      { month: 'May', withAI: 4000, withoutAI: 1700 },
      { month: 'Jun', withAI: 4500, withoutAI: 2100 },
    ],
    '1y': [
      { month: 'Jan', withAI: 2400, withoutAI: 1200 },
      { month: 'Feb', withAI: 3000, withoutAI: 1300 },
      { month: 'Mar', withAI: 2800, withoutAI: 900 },
      { month: 'Apr', withAI: 3800, withoutAI: 1600 },
      { month: 'May', withAI: 4000, withoutAI: 1700 },
      { month: 'Jun', withAI: 3500, withoutAI: 1400 },
      { month: 'Jul', withAI: 4500, withoutAI: 2100 },
      { month: 'Aug', withAI: 5000, withoutAI: 2400 },
      { month: 'Sep', withAI: 5200, withoutAI: 2500 },
      { month: 'Oct', withAI: 5800, withoutAI: 2600 },
      { month: 'Nov', withAI: 6000, withoutAI: 2700 },
      { month: 'Dec', withAI: 6500, withoutAI: 2800 },
    ]
  };

  const winRateData = {
    '1m': [
      { month: 'Week 1', withAI: 58, withoutAI: 29 },
      { month: 'Week 2', withAI: 62, withoutAI: 31 },
      { month: 'Week 3', withAI: 65, withoutAI: 34 },
      { month: 'Week 4', withAI: 68, withoutAI: 38 },
    ],
    '3m': [
      { month: 'Jan', withAI: 60, withoutAI: 32 },
      { month: 'Feb', withAI: 65, withoutAI: 35 },
      { month: 'Mar', withAI: 68, withoutAI: 38 },
    ],
    '6m': [
      { month: 'Jan', withAI: 60, withoutAI: 32 },
      { month: 'Feb', withAI: 65, withoutAI: 35 },
      { month: 'Mar', withAI: 63, withoutAI: 30 },
      { month: 'Apr', withAI: 68, withoutAI: 36 },
      { month: 'May', withAI: 70, withoutAI: 37 },
      { month: 'Jun', withAI: 72, withoutAI: 39 },
    ],
    '1y': Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      withAI: 60 + Math.floor(Math.random() * 15),
      withoutAI: 30 + Math.floor(Math.random() * 10)
    }))
  };

  const roiData = {
    '1m': [
      { month: 'Week 1', withAI: 15, withoutAI: 5 },
      { month: 'Week 2', withAI: 18, withoutAI: 6 },
      { month: 'Week 3', withAI: 20, withoutAI: 8 },
      { month: 'Week 4', withAI: 22, withoutAI: 10 },
    ],
    '3m': [
      { month: 'Jan', withAI: 18, withoutAI: 8 },
      { month: 'Feb', withAI: 22, withoutAI: 10 },
      { month: 'Mar', withAI: 25, withoutAI: 12 },
    ],
    '6m': [
      { month: 'Jan', withAI: 18, withoutAI: 8 },
      { month: 'Feb', withAI: 22, withoutAI: 10 },
      { month: 'Mar', withAI: 20, withoutAI: 6 },
      { month: 'Apr', withAI: 25, withoutAI: 12 },
      { month: 'May', withAI: 28, withoutAI: 13 },
      { month: 'Jun', withAI: 32, withoutAI: 15 },
    ],
    '1y': Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      withAI: 18 + Math.floor(Math.random() * 20),
      withoutAI: 8 + Math.floor(Math.random() * 10)
    }))
  };

  const chartConfig = {
    withAI: {
      label: "With AI",
      theme: {
        light: "#00f0ff",
        dark: "#00f0ff",
      },
    },
    withoutAI: {
      label: "Without AI",
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
      description: "Our users report up to 64% higher win rates compared to their previous strategies."
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
      description: "Users see an average ROI improvement of 38% in their first 3 months."
    }
  ];

  const activeTutorial = {
    title: "How to Use AI for Maximum Betting Profits",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    description: "Learn how to leverage our AI prediction system to maximize your betting profits and improve your win rate."
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
    const aiValue = activeData[lastIndex].withAI;
    const nonAiValue = activeData[lastIndex].withoutAI;
    const percentageIncrease = ((aiValue - nonAiValue) / nonAiValue) * 100;
    return Math.round(percentageIncrease);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark to-dark-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-lime/5 opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-lime/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Boost Your Earnings
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See the difference our AI-powered prediction system can make to your betting performance
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
            <Button
              variant={activeChart === 'earnings' ? 'default' : 'outline'}
              onClick={() => setActiveChart('earnings')}
              className={activeChart === 'earnings' ? 'bg-neon-blue text-black hover:bg-neon-blue/90' : 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10'}
            >
              Earnings
            </Button>
            <Button
              variant={activeChart === 'winRate' ? 'default' : 'outline'}
              onClick={() => setActiveChart('winRate')}
              className={activeChart === 'winRate' ? 'bg-neon-blue text-black hover:bg-neon-blue/90' : 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10'}
            >
              Win Rate %
            </Button>
            <Button
              variant={activeChart === 'roi' ? 'default' : 'outline'}
              onClick={() => setActiveChart('roi')}
              className={activeChart === 'roi' ? 'bg-neon-blue text-black hover:bg-neon-blue/90' : 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10'}
            >
              ROI %
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-end gap-2 mb-4">
            <Button
              variant={timeRange === '1m' ? 'secondary' : 'ghost'}
              onClick={() => setTimeRange('1m')}
              size="sm"
              className="text-xs"
            >
              1M
            </Button>
            <Button
              variant={timeRange === '3m' ? 'secondary' : 'ghost'}
              onClick={() => setTimeRange('3m')}
              size="sm"
              className="text-xs"
            >
              3M
            </Button>
            <Button
              variant={timeRange === '6m' ? 'secondary' : 'ghost'}
              onClick={() => setTimeRange('6m')}
              size="sm"
              className="text-xs"
            >
              6M
            </Button>
            <Button
              variant={timeRange === '1y' ? 'secondary' : 'ghost'}
              onClick={() => setTimeRange('1y')}
              size="sm"
              className="text-xs"
            >
              1Y
            </Button>
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
            <div className="h-80 lg:h-96 w-full bg-dark-card rounded-xl p-6 border border-dark-border shadow-xl backdrop-blur-sm relative">
              <h3 className="text-xl font-semibold mb-4">{chartTitle}</h3>
              
              <ChartContainer config={chartConfig} className="w-full h-full">
                <>
                  <AreaChart
                    data={activeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWithAI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#444' }} 
                      formatter={(value: number, name: string) => {
                        const formattedValue = activeChart === 'earnings' ? `$${value}` : `${value}%`;
                        return [formattedValue, name === 'withAI' ? 'With AI' : 'Without AI'];
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="withAI" 
                      name="withAI"
                      stroke="#00f0ff" 
                      fill="url(#colorWithAI)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="withoutAI" 
                      name="withoutAI"
                      stroke="#888" 
                      fill="#88830" 
                    />
                  </AreaChart>
                  <ChartLegend>
                    <ChartLegendContent />
                  </ChartLegend>
                </>
              </ChartContainer>
              
              <motion.div 
                className="absolute bottom-6 right-8 bg-dark-lighter p-4 rounded-lg border border-dark-border shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
                  <p className="text-sm font-medium">With AI: <span className="text-neon-blue">+{getPercentageChange()}%</span></p>
                </div>
              </motion.div>
            </div>
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
                <h3 className="text-2xl font-bold mb-6">Why Choose Our AI Predictions?</h3>
                
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
                      <div className="mt-1 w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center">
                        {benefit.icon}
                      </div>
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
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-neon-lime mt-1" size={20} />
                    <p className="text-white">
                      <span className="font-semibold">87% of our users</span> report making more profitable betting decisions after using our platform for just 4 weeks.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="tutorial" className="focus-visible:outline-none focus-visible:ring-0">
                <div className="bg-dark-card/50 p-5 rounded-lg border border-dark-border">
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
                            <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center backdrop-blur-sm">
                              <Play className="text-neon-blue ml-1" size={30} />
                            </div>
                          </div>
                          <img 
                            src="/placeholder.svg" 
                            alt="Tutorial thumbnail" 
                            className="w-full h-full object-cover opacity-50"
                          />
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
                    <Button variant="outline" size="sm" className="text-gray-400 border-dark-border">
                      <ChevronLeft className="mr-1" size={16} /> Previous
                    </Button>
                    <Button className="bg-neon-blue hover:bg-neon-blue/90 text-black" size="sm">
                      Next Tutorial <ChevronRight className="ml-1" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                      className="bg-dark-card/30 border border-dark-border rounded-lg p-3 cursor-pointer hover:bg-dark-lighter/30 transition-all"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="aspect-video bg-black/30 rounded mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={20} className="text-gray-400" />
                        </div>
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
            >
              <h3 className="text-xl font-bold mb-3">Ready to improve your betting results?</h3>
              <p className="text-gray-400 mb-4">Start using our AI predictions today and see the difference in your performance.</p>
              
              <Button className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium px-6">
                Try Free for 7 Days
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EarningsSection;
