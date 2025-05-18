
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BenefitsTab = () => {
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
  
  return (
    <>
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
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    </>
  );
};

export default BenefitsTab;
