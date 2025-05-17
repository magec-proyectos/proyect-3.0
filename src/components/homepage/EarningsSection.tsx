
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, BarChart3, DollarSign } from 'lucide-react';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EarningsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const earningsData = [
    { month: 'Jan', withAI: 2400, withoutAI: 1200 },
    { month: 'Feb', withAI: 3000, withoutAI: 1300 },
    { month: 'Mar', withAI: 2800, withoutAI: 900 },
    { month: 'Apr', withAI: 3800, withoutAI: 1600 },
    { month: 'May', withAI: 4000, withoutAI: 1700 },
    { month: 'Jun', withAI: 3500, withoutAI: 1400 },
    { month: 'Jul', withAI: 4500, withoutAI: 2100 },
    { month: 'Aug', withAI: 5000, withoutAI: 2400 },
  ];

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

  return (
    <section className="py-20 bg-gradient-to-b from-dark to-dark-darker">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-3">Boost Your Earnings</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See the difference our AI-powered prediction system can make to your betting performance
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="h-80 lg:h-96 w-full bg-dark-card rounded-xl p-4">
              <ChartContainer config={chartConfig} className="w-full h-full">
                {/* Wrap multiple child elements with a single fragment */}
                <>
                  <AreaChart
                    data={earningsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#444' }} />
                    <Area 
                      type="monotone" 
                      dataKey="withAI" 
                      name="withAI"
                      stroke="#00f0ff" 
                      fill="#00f0ff20" 
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
              <div className="absolute bottom-6 right-8 bg-dark-lighter p-4 rounded-lg border border-dark-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
                  <p className="text-sm font-medium">With AI: <span className="text-neon-blue">+138%</span></p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-bold mb-6">Why Choose Our AI Predictions?</h3>
            
            <ul className="space-y-6">
              {benefits.map(benefit => (
                <li key={benefit.id} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-dark-card/80 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-dark-lighter/50 border border-dark-border rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-neon-lime mt-1" size={20} />
                <p className="text-white">
                  <span className="font-semibold">87% of our users</span> report making more profitable betting decisions after using our platform for just 4 weeks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EarningsSection;
