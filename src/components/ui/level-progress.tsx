
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, TrendingUp } from 'lucide-react';
import { AddictiveProgress } from './addictive-progress';
import { Badge } from './badge';

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXPForLevel: number;
  levelTitle: string;
  className?: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  currentXP,
  xpToNextLevel,
  totalXPForLevel,
  levelTitle,
  className = ""
}) => {
  const progressPercentage = (currentXP / totalXPForLevel) * 100;
  const xpNeeded = xpToNextLevel - currentXP;

  const getLevelColor = (level: number) => {
    if (level >= 50) return 'text-level-diamond';
    if (level >= 30) return 'text-level-platinum';
    if (level >= 20) return 'text-level-gold';
    if (level >= 10) return 'text-level-silver';
    return 'text-level-bronze';
  };

  const getLevelIcon = (level: number) => {
    if (level >= 30) return Crown;
    if (level >= 10) return Star;
    return TrendingUp;
  };

  const LevelIcon = getLevelIcon(currentLevel);

  return (
    <motion.div
      className={`bg-dark-card border border-achievement/30 rounded-xl p-4 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="level-indicator p-2 rounded-full">
            <LevelIcon className={`w-5 h-5 ${getLevelColor(currentLevel)}`} />
          </div>
          <div>
            <h3 className="font-bold text-white">Level {currentLevel}</h3>
            <p className="text-sm text-gray-400">{levelTitle}</p>
          </div>
        </div>
        
        <Badge className="bg-achievement/20 text-achievement border-achievement/30">
          {currentXP.toLocaleString()} XP
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progress to Level {currentLevel + 1}</span>
          <span className="text-achievement font-medium">
            {xpNeeded.toLocaleString()} XP needed
          </span>
        </div>
        
        <AddictiveProgress
          value={progressPercentage}
          psychology="achievement"
          showParticles={progressPercentage > 80}
          milestone={80}
          className="h-3"
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>{currentXP.toLocaleString()}</span>
          <span>{totalXPForLevel.toLocaleString()}</span>
        </div>
      </div>

      {/* Milestone rewards preview */}
      {progressPercentage > 75 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-reward/10 border border-reward/20 rounded-lg"
        >
          <div className="flex items-center gap-2 text-xs text-reward">
            <Star className="w-3 h-3" />
            <span>Almost there! Level up bonus: +500 coins</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LevelProgress;
