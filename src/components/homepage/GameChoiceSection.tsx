
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameChoiceSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 bg-dark">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-2">Choose Your Game</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Whether you're a sports fan or casino player, our AI tools are designed to enhance your strategy and decision making.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="relative overflow-hidden rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-transparent z-0"></div>
            <div className="relative z-10 p-8">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mb-6">
                <span className="text-neon-blue text-3xl font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Sports Analysis</h3>
              <p className="text-gray-400 mb-6">Advanced AI predictions for football, basketball, and more. Get insights on upcoming matches, team performance, and strategic opportunities.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-neon-blue mt-0.5" />
                  <span>Match predictions with confidence scores</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-neon-blue mt-0.5" />
                  <span>Team statistics and performance analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-neon-blue mt-0.5" />
                  <span>Historical data comparisons</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/football">
                  <Button className="bg-neon-blue text-black hover:bg-neon-blue/90">
                    Football
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/basketball">
                  <Button variant="outline" className="border-dark-border hover:bg-dark-border">
                    Basketball
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/american-football">
                  <Button variant="outline" className="border-dark-border hover:bg-dark-border">
                    American Football
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative overflow-hidden rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-lime/20 to-transparent z-0"></div>
            <div className="relative z-10 p-8">
              <div className="w-16 h-16 rounded-2xl bg-neon-lime/20 flex items-center justify-center mb-6">
                <span className="text-neon-lime text-3xl font-bold">C</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Casino Strategy</h3>
              <p className="text-gray-400 mb-6">Optimize your gameplay with AI-driven strategies for blackjack, roulette and more. Get real-time advice based on mathematical probabilities.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-neon-lime mt-0.5" />
                  <span>Optimal play recommendations</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-neon-lime mt-0.5" />
                  <span>Probability-based strategy advice</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-neon-lime mt-0.5" />
                  <span>Mathematical edge calculation</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/blackjack">
                  <Button className="bg-neon-lime text-black hover:bg-neon-lime/90">
                    Blackjack
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/roulette">
                  <Button variant="outline" className="border-dark-border hover:bg-dark-border">
                    Roulette
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameChoiceSection;
