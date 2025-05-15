
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-16 bg-dark-lighter">
      <div className="container px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400">Our AI system analyzes vast amounts of data to provide you with accurate predictions and advice.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div 
            className="bg-dark p-6 rounded-xl border border-dark-border"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
              <span className="text-neon-blue font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Select Your Game</h3>
            <p className="text-gray-400">Choose between football match analysis or blackjack advice.</p>
          </motion.div>
          
          <motion.div 
            className="bg-dark p-6 rounded-xl border border-dark-border"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
              <span className="text-neon-blue font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Input Parameters</h3>
            <p className="text-gray-400">Select teams, cards, or other relevant information for analysis.</p>
          </motion.div>
          
          <motion.div 
            className="bg-dark p-6 rounded-xl border border-dark-border"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
              <span className="text-neon-blue font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get AI Predictions</h3>
            <p className="text-gray-400">Receive data-driven predictions and recommendations to inform your decisions.</p>
          </motion.div>
        </motion.div>
        
        <div className="flex justify-center mb-16 mt-12">
          <Button asChild className="flex items-center gap-2">
            <Link to="/football">
              Start Analyzing
              <ArrowDown size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
