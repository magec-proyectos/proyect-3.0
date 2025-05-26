
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Crown, Award } from 'lucide-react';
import { Badge } from './badge';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'zap' | 'crown' | 'award';
  color: 'gold' | 'silver' | 'bronze' | 'blue' | 'green' | 'purple';
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  target: Target,
  zap: Zap,
  crown: Crown,
  award: Award,
};

const colorMap = {
  gold: 'from-yellow-400 to-yellow-600 text-yellow-900',
  silver: 'from-gray-300 to-gray-500 text-gray-800',
  bronze: 'from-orange-400 to-orange-600 text-orange-900',
  blue: 'from-blue-400 to-blue-600 text-blue-900',
  green: 'from-green-400 to-green-600 text-green-900',
  purple: 'from-purple-400 to-purple-600 text-purple-900',
};

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showProgress = false,
  onClick
}) => {
  const Icon = iconMap[achievement.icon];
  const isUnlocked = achievement.unlocked;

  return (
    <motion.div
      className={`relative ${sizeMap[size]} cursor-pointer`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={false}
      animate={isUnlocked ? { 
        rotateY: [0, 360],
        scale: [1, 1.2, 1]
      } : {}}
      transition={{ 
        rotateY: { duration: 0.8 },
        scale: { duration: 0.5 }
      }}
    >
      {/* Glow effect for unlocked achievements */}
      {isUnlocked && (
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorMap[achievement.color]} opacity-50 blur-sm`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Main badge */}
      <div className={`
        relative w-full h-full rounded-full border-2 flex items-center justify-center
        ${isUnlocked 
          ? `bg-gradient-to-r ${colorMap[achievement.color]} border-current shadow-lg` 
          : 'bg-gray-600 border-gray-500 text-gray-400'
        }
      `}>
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'}`} />
        
        {/* Progress indicator */}
        {showProgress && achievement.progress !== undefined && achievement.maxProgress && !isUnlocked && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-soft-blue to-soft-cyan"
                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
        
        {/* Unlock animation particles */}
        {isUnlocked && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 20,
                  y: Math.sin(i * 45 * Math.PI / 180) * 20,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementBadge;
