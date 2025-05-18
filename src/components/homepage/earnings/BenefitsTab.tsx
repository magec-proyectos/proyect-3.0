
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChartBar, Star, Info } from 'lucide-react';

const BenefitsTab = () => {
  const benefits = [
    {
      icon: <ChartBar className="text-neon-blue" size={28} />,
      title: "Advanced Prediction Algorithm",
      description: "Our AI-powered system analyzes thousands of data points to provide the most accurate predictions in the market."
    },
    {
      icon: <Star className="text-neon-blue" size={28} />,
      title: "Increased Win Rate",
      description: "Users experience an average 28% increase in win rate compared to traditional betting strategies."
    },
    {
      icon: <Info className="text-neon-blue" size={28} />,
      title: "Real-Time Insights",
      description: "Get instant updates and game-changing insights that help you make smarter betting decisions."
    },
    {
      icon: <CheckCircle className="text-neon-blue" size={28} />,
      title: "Proven Results",
      description: "Our system has been tested and proven across multiple sports and betting scenarios with consistent results."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          variants={item}
          className="bg-dark-card/50 p-6 rounded-xl border border-dark-border hover:border-neon-blue/30 transition-colors duration-300"
          whileHover={{ 
            y: -5, 
            boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.15)",
            transition: { duration: 0.2 }
          }}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-dark-lighter rounded-lg">
              {benefit.icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-dark-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Success rate</div>
              <div className="text-neon-blue font-medium">{75 + index * 5}%</div>
            </div>
            <div className="h-2 bg-dark-lighter rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-blue/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${75 + index * 5}%` }}
                transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
              />
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div
        variants={item}
        className="md:col-span-2 bg-gradient-to-br from-dark-card/80 to-dark-card/40 p-6 rounded-xl border border-neon-blue/20 mt-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ready to boost your betting success?</h3>
            <p className="text-gray-400">Join thousands of smart bettors who have increased their earnings with Bet 3.0</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-neon-blue text-black font-medium rounded-lg shadow-lg shadow-neon-blue/20"
          >
            Start Free Trial
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BenefitsTab;
