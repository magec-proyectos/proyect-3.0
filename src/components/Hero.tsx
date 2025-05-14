
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, LineChart, Zap, History, Trophy, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Hero = () => {
  const [testMatch, setTestMatch] = useState<string>('');
  const [showPrediction, setShowPrediction] = useState(false);
  
  const handleTestPrediction = () => {
    if (testMatch) {
      setShowPrediction(true);
    }
  };
  
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
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-blue/20 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-neon-lime/10 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeIn}
          >
            <span className="gradient-text">Smarter Predictions</span> with AI.<br />
            <span className="text-white">Analyze, Predict, Win.</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10"
            variants={fadeIn}
          >
            Advanced AI algorithms analyze sports data and card games to give you the winning edge.
            Make informed decisions backed by real-time statistics.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={fadeIn}
          >
            <Link to="/football">
              <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black font-medium w-full sm:w-auto">
                Try Sports Analysis
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
            <Link to="/blackjack">
              <Button size="lg" variant="outline" className="border-neon-lime text-neon-lime hover:bg-neon-lime/10 w-full sm:w-auto">
                Try Casino Advisor
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Test Area */}
          <motion.div 
            className="mt-16 mb-16 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            <Card className="bg-dark-card/60 backdrop-blur-md border-dark-border">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Try it now</h2>
                <p className="text-gray-400 mb-6">Get an instant prediction for an upcoming match</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Select onValueChange={setTestMatch}>
                      <SelectTrigger className="bg-dark-lighter border-dark-border">
                        <SelectValue placeholder="Select a match" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark border-dark-border text-white">
                        <SelectItem value="liverpool_vs_arsenal">Liverpool vs Arsenal</SelectItem>
                        <SelectItem value="mancity_vs_chelsea">Man City vs Chelsea</SelectItem>
                        <SelectItem value="barcelona_vs_realmadrid">Barcelona vs Real Madrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleTestPrediction}
                    className="bg-neon-blue hover:bg-neon-blue/90 text-black"
                  >
                    Get Prediction
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
                
                {showPrediction && (
                  <motion.div 
                    className="mt-6 p-4 bg-dark-lighter rounded-lg border border-dark-border"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">Prediction</p>
                        <p className="text-lg font-medium">Home Win (60% probability)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Recommended</p>
                        <p className="text-neon-lime font-medium">Over 2.5 Goals</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Feature highlights */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            variants={staggerChildren}
          >
            <motion.div 
              className="bg-dark-card p-6 rounded-xl border border-dark-border"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-neon-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Predictions</h3>
              <p className="text-gray-400 text-sm">Advanced algorithms analyze thousands of data points for accurate predictions.</p>
            </motion.div>
            
            <motion.div 
              className="bg-dark-card p-6 rounded-xl border border-dark-border"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full bg-neon-lime/20 flex items-center justify-center mb-4 mx-auto">
                <LineChart className="text-neon-lime" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Analysis</h3>
              <p className="text-gray-400 text-sm">Get instant insights and statistical calculations as games unfold.</p>
            </motion.div>
            
            <motion.div 
              className="bg-dark-card p-6 rounded-xl border border-dark-border"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 mx-auto">
                <Trophy className="text-neon-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Rankings</h3>
              <p className="text-gray-400 text-sm">Join the community and climb the leaderboard with successful predictions.</p>
            </motion.div>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div 
            className="mt-16 flex justify-center"
            variants={fadeIn}
          >
            <div className="bg-dark-card px-6 py-3 rounded-lg border border-dark-border inline-flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border-2 border-dark-card">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Trusted by</p>
                <p className="text-white font-medium">10,000+ users</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
