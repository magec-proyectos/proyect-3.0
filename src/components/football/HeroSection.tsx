
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="relative bg-gradient-to-br from-dark via-dark-lighter to-dark-card overflow-hidden">
      <div 
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/20 rounded-full px-4 py-2">
              <TrendingUp className="h-4 w-4 text-neon-blue" />
              <span className="text-sm text-neon-blue font-medium">AI-Powered Analytics</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Smarter Football Bets,{' '}
            <span className="bg-gradient-to-r from-neon-blue via-neon-lime to-neon-blue bg-clip-text text-transparent">
              Backed by Real-Time AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Live stats, 20+ leagues, deep insights. Win smarter with data-driven predictions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold px-8 py-4 text-lg rounded-xl"
            >
              <Target className="h-5 w-5 mr-2" />
              View Today's Picks
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Explore Matches
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-neon-blue mb-1">20+</div>
              <div className="text-sm text-gray-400">Leagues</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-neon-lime mb-1">87%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-neon-blue mb-1">Live</div>
              <div className="text-sm text-gray-400">Odds</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-neon-lime mb-1">Real-time</div>
              <div className="text-sm text-gray-400">Analytics</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
