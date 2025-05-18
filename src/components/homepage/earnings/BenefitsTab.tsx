
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChartBar, Star, Info, Zap, ShieldCheck } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const BenefitsTab = () => {
  const benefits = [
    {
      icon: <ChartBar className="text-neon-blue" size={28} />,
      title: "Advanced Prediction Algorithm",
      description: "Our AI-powered system analyzes thousands of data points to provide the most accurate predictions in the market.",
      successRate: 92,
      highlightColor: "from-neon-blue to-blue-400"
    },
    {
      icon: <Zap className="text-amber-400" size={28} />,
      title: "Increased Win Rate",
      description: "Users experience an average 28% increase in win rate compared to traditional betting strategies.",
      successRate: 88,
      highlightColor: "from-amber-400 to-amber-500"
    },
    {
      icon: <Info className="text-purple-400" size={28} />,
      title: "Real-Time Insights",
      description: "Get instant updates and game-changing insights that help you make smarter betting decisions.",
      successRate: 85,
      highlightColor: "from-purple-400 to-purple-500"
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={28} />,
      title: "Proven Results",
      description: "Our system has been tested and proven across multiple sports and betting scenarios with consistent results.",
      successRate: 90,
      highlightColor: "from-emerald-400 to-emerald-500"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          variants={item}
          className="relative overflow-hidden"
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
        >
          <Card className="h-full bg-dark-card/50 border border-dark-border hover:border-neon-blue/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-dark-lighter rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Success rate</div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + (index * 0.2), duration: 0.5 }}
                    className="text-neon-blue font-medium flex items-center gap-2"
                  >
                    {benefit.successRate}%
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <CheckCircle size={16} className="text-neon-blue" />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="relative h-2 bg-dark-lighter rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${benefit.highlightColor} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${benefit.successRate}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + (index * 0.2), ease: "easeOut" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Animated glow effect on hover */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-neon-blue/0 via-neon-blue/20 to-neon-blue/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
      
      <motion.div
        variants={item}
        className="md:col-span-2 relative overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-dark-card/80 to-dark-card/40 border border-neon-blue/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ready to boost your betting success?</h3>
                <p className="text-gray-400">Join thousands of smart bettors who have increased their earnings with Bet 3.0</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-neon-blue text-black font-medium rounded-lg shadow-lg shadow-neon-blue/20 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Free Trial</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-blue/80 to-neon-blue opacity-100"
                  animate={{ 
                    x: ["-100%", "100%"],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                />
              </motion.button>
            </div>
          </CardContent>
        </Card>
        
        {/* Animated border effect */}
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 rounded-xl opacity-0 blur-sm"
          animate={{ 
            opacity: [0, 0.5, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "linear" 
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsTab;
