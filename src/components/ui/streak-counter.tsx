
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  type: 'win' | 'prediction' | 'daily';
  className?: string;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  currentStreak,
  longestStreak,
  type,
  className = ""
}) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-red-400';
    if (streak >= 5) return 'text-orange-400';
    if (streak >= 3) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getStreakBackground = (streak: number) => {
    if (streak >= 10) return 'from-red-500/20 to-red-600/20';
    if (streak >= 5) return 'from-orange-500/20 to-orange-600/20';
    if (streak >= 3) return 'from-yellow-500/20 to-yellow-600/20';
    return 'from-gray-500/20 to-gray-600/20';
  };

  const typeLabels = {
    win: 'Win Streak',
    prediction: 'Prediction Streak',
    daily: 'Daily Streak'
  };

  return (
    <motion.div
      className={`p-4 rounded-xl bg-gradient-to-r ${getStreakBackground(currentStreak)} border border-gray-600/30 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Flame className={`w-5 h-5 ${getStreakColor(currentStreak)}`} />
          <span className="text-sm font-medium text-gray-300">{typeLabels[type]}</span>
        </div>
        {currentStreak > 0 && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame className={`w-4 h-4 ${getStreakColor(currentStreak)}`} />
          </motion.div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <motion.div
            className={`text-2xl font-bold ${getStreakColor(currentStreak)}`}
            key={currentStreak}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            {currentStreak}
          </motion.div>
          <div className="text-xs text-gray-400">Current</div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <TrendingUp className="w-3 h-3" />
            <span className="font-semibold">{longestStreak}</span>
          </div>
          <div className="text-xs text-gray-400">Best</div>
        </div>
      </div>
      
      {/* Progress bar to next milestone */}
      {currentStreak > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Next milestone</span>
            <span>{Math.ceil(currentStreak / 5) * 5}</span>
          </div>
          <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getStreakColor(currentStreak) === 'text-red-400' ? 'from-red-400 to-red-500' : 
                getStreakColor(currentStreak) === 'text-orange-400' ? 'from-orange-400 to-orange-500' :
                getStreakColor(currentStreak) === 'text-yellow-400' ? 'from-yellow-400 to-yellow-500' :
                'from-gray-400 to-gray-500'}`}
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentStreak % 5) / 5) * 100}%` 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StreakCounter;
