
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Flame, DollarSign } from 'lucide-react';
import { AddictiveProgress } from './addictive-progress';
import { Badge } from './badge';
import { StreakCounter } from './streak-counter';

interface UserStatsCardProps {
  stats: {
    winRate: number;
    totalBets: number;
    profit: number;
    currentStreak: number;
    longestStreak: number;
    level: number;
    xp: number;
    xpToNext: number;
  };
  className?: string;
}

export const UserStatsCard: React.FC<UserStatsCardProps> = ({
  stats,
  className = ""
}) => {
  const winRateColor = stats.winRate >= 70 ? 'success' : stats.winRate >= 50 ? 'energy' : 'urgency';
  const profitColor = stats.profit >= 0 ? 'success' : 'urgency';

  return (
    <motion.div
      className={`bg-dark-card border border-gray-600/30 rounded-xl p-6 space-y-6 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Your Performance</h3>
        <Badge className="bg-level-gold/20 text-level-gold border-level-gold/30">
          Level {stats.level}
        </Badge>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="engagement-card p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className={`w-4 h-4 text-${winRateColor}`} />
            <span className="text-sm text-gray-400">Win Rate</span>
          </div>
          <div className={`text-2xl font-bold text-${winRateColor}`}>
            {stats.winRate}%
          </div>
        </div>

        <div className="engagement-card p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className={`w-4 h-4 text-${profitColor}`} />
            <span className="text-sm text-gray-400">Profit</span>
          </div>
          <div className={`text-2xl font-bold text-${profitColor}`}>
            ${stats.profit >= 0 ? '+' : ''}{stats.profit.toLocaleString()}
          </div>
        </div>

        <div className="engagement-card p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-focus" />
            <span className="text-sm text-gray-400">Total Bets</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.totalBets.toLocaleString()}
          </div>
        </div>

        <div className="engagement-card p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-energy" />
            <span className="text-sm text-gray-400">XP</span>
          </div>
          <div className="text-2xl font-bold text-energy">
            {stats.xp.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Level Progress</span>
          <span className="text-achievement font-medium">
            {stats.xpToNext} XP to next level
          </span>
        </div>
        
        <AddictiveProgress
          value={(stats.xp / (stats.xp + stats.xpToNext)) * 100}
          psychology="achievement"
          showParticles={stats.xp > stats.xpToNext * 0.8}
          className="h-2"
        />
      </div>

      {/* Streak Counter */}
      <StreakCounter
        currentStreak={stats.currentStreak}
        longestStreak={stats.longestStreak}
        type="win"
        className="mt-4"
      />

      {/* Achievement hints */}
      {stats.winRate >= 80 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-achievement/10 border border-achievement/20 rounded-lg"
        >
          <div className="flex items-center gap-2 text-sm text-achievement">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
            <span>Elite Performance! You're in the top 5% of users!</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserStatsCard;
