
import React from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Users, Award } from 'lucide-react';
import { AddictiveButton } from '@/components/ui/addictive-button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark to-dark-darker">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,193,7,0.1)_0%,_transparent_50%)]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-reward/20 rounded-full blur-3xl animate-float-gentle" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-achievement/20 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <Badge className="bg-success/20 text-success border-success/30 animate-pulse-soft">
              <Award className="w-3 h-3 mr-1" />
              #1 AI Betting Platform
            </Badge>
            <Badge className="bg-achievement/20 text-achievement border-achievement/30 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
              <Users className="w-3 h-3 mr-1" />
              50K+ Active Users
            </Badge>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">AI-Powered</span>
          <br />
          <span className="bg-gradient-to-r from-reward via-energy to-achievement bg-clip-text text-transparent animate-shimmer">
            Sports Betting
          </span>
          <br />
          <span className="text-white">Revolution</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Join thousands of successful bettors using our advanced AI to make 
          <span className="text-reward font-semibold"> data-driven predictions</span> and 
          <span className="text-success font-semibold"> maximize profits</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <AddictiveButton
            variant="reward"
            size="lg"
            psychology="dopamine"
            className="text-lg px-8 py-4 min-w-[200px] shadow-2xl"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Free Trial
          </AddictiveButton>
          
          <AddictiveButton
            variant="outline"
            size="lg"
            psychology="shimmer"
            className="text-lg px-8 py-4 min-w-[200px]"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            View Live Predictions
          </AddictiveButton>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="engagement-card p-6 rounded-xl">
            <div className="text-3xl font-bold text-reward mb-2">89%</div>
            <div className="text-gray-300">Win Rate</div>
          </div>
          <div className="engagement-card p-6 rounded-xl">
            <div className="text-3xl font-bold text-success mb-2">$2.4M+</div>
            <div className="text-gray-300">Total Winnings</div>
          </div>
          <div className="engagement-card p-6 rounded-xl">
            <div className="text-3xl font-bold text-achievement mb-2">24/7</div>
            <div className="text-gray-300">AI Analysis</div>
          </div>
        </motion.div>

        {/* Urgency indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-urgency/20 border border-urgency/30 rounded-full text-urgency animate-fomo-pulse">
            <div className="w-2 h-2 bg-urgency rounded-full animate-scarcity-blink"></div>
            <span className="text-sm font-medium">Limited spots available - Join today!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
