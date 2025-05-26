
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Users, TrendingUp } from 'lucide-react';
import { AddictiveButton } from '@/components/ui/addictive-button';
import { AddictiveProgress } from '@/components/ui/addictive-progress';
import { Badge } from '@/components/ui/badge';
import { StreakCounter } from '@/components/ui/streak-counter';
import { UserStatsCard } from '@/components/ui/user-stats-card';
import FootballTabs from '@/components/football/FootballTabs';

const Sports = () => {
  const [activeTab, setActiveTab] = useState('matches');
  
  // Mock user stats
  const userStats = {
    winRate: 73,
    totalBets: 156,
    profit: 2840,
    currentStreak: 5,
    longestStreak: 12,
    level: 8,
    xp: 3240,
    xpToNext: 760,
  };

  const todaysPicks = [
    { 
      match: 'Arsenal vs Chelsea', 
      prediction: 'Arsenal Win', 
      confidence: 85,
      odds: 2.1 
    },
    { 
      match: 'Man City vs Liverpool', 
      prediction: 'Over 2.5 Goals', 
      confidence: 78,
      odds: 1.8 
    },
    { 
      match: 'Barcelona vs Real Madrid', 
      prediction: 'Barcelona Win', 
      confidence: 92,
      odds: 2.4 
    },
  ];

  return (
    <div className="min-h-screen bg-dark pt-16">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-dark to-dark-darker overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(33,150,243,0.1)_0%,_transparent_50%)]" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-focus/20 rounded-full blur-2xl animate-float-gentle" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-success/20 text-success border-success/30 animate-pulse-soft">
                    <Trophy className="w-3 h-3 mr-1" />
                    Live Predictions
                  </Badge>
                  <Badge className="bg-focus/20 text-focus border-focus/30 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
                    <Target className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Smart Football</span>
                  <br />
                  <span className="bg-gradient-to-r from-focus via-energy to-success bg-clip-text text-transparent">
                    Betting Predictions
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-6 max-w-2xl">
                  Get AI-powered insights for football matches with 
                  <span className="text-focus font-semibold"> real-time analysis</span> and 
                  <span className="text-success font-semibold"> expert predictions</span>
                </p>

                <div className="flex flex-wrap gap-4">
                  <AddictiveButton
                    variant="focus"
                    size="lg"
                    psychology="dopamine"
                    className="px-8"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    View Live Matches
                  </AddictiveButton>
                  
                  <AddictiveButton
                    variant="outline"
                    size="lg"
                    psychology="shimmer"
                    className="px-8"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                  </AddictiveButton>
                </div>
              </motion.div>

              {/* Today's Top Picks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-reward rounded-full animate-scarcity-blink"></div>
                  Today's AI Picks
                  <Badge className="bg-urgency/20 text-urgency border-urgency/30 animate-fomo-pulse">
                    Hot
                  </Badge>
                </h3>
                
                <div className="space-y-3">
                  {todaysPicks.map((pick, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="engagement-card p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{pick.match}</h4>
                          <p className="text-sm text-focus">{pick.prediction}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-reward">{pick.odds}</div>
                          <div className="text-xs text-gray-400">odds</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">AI Confidence</span>
                          <span className="text-energy font-medium">{pick.confidence}%</span>
                        </div>
                        <AddictiveProgress
                          value={pick.confidence}
                          psychology="success"
                          showParticles={pick.confidence > 85}
                          className="h-2"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Stats */}
              <UserStatsCard stats={userStats} />
              
              {/* Current Streak */}
              <StreakCounter
                currentStreak={userStats.currentStreak}
                longestStreak={userStats.longestStreak}
                type="prediction"
              />
              
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-dark-card border border-gray-600/30 rounded-lg p-4"
              >
                <h4 className="font-semibold text-white mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <AddictiveButton
                    variant="achievement"
                    className="w-full"
                    psychology="burst"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Daily Challenge
                  </AddictiveButton>
                  
                  <AddictiveButton
                    variant="energy"
                    className="w-full"
                    psychology="shimmer"
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Boost Prediction
                  </AddictiveButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <FootballTabs />
        </div>
      </section>
    </div>
  );
};

export default Sports;
