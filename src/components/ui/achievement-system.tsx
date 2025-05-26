
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Zap, Crown, Award, Flame } from 'lucide-react';
import { Badge } from './badge';
import { AddictiveButton } from './addictive-button';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'zap' | 'crown' | 'award' | 'flame';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  unlockedAt?: Date;
  reward?: {
    type: 'points' | 'multiplier' | 'unlock';
    value: number | string;
  };
}

interface AchievementSystemProps {
  achievements: Achievement[];
  onClaimReward?: (achievement: Achievement) => void;
  showNotifications?: boolean;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  target: Target,
  zap: Zap,
  crown: Crown,
  award: Award,
  flame: Flame,
};

const rarityStyles = {
  common: {
    gradient: 'from-gray-400 to-gray-600',
    glow: 'shadow-[0_0_20px_rgba(156,163,175,0.4)]',
    border: 'border-gray-400/30',
    text: 'text-gray-300'
  },
  rare: {
    gradient: 'from-blue-400 to-blue-600',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    border: 'border-blue-400/30',
    text: 'text-blue-300'
  },
  epic: {
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-[0_0_20px_rgba(147,51,234,0.4)]',
    border: 'border-purple-400/30',
    text: 'text-purple-300'
  },
  legendary: {
    gradient: 'from-yellow-400 to-orange-500',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-dopamine-pulse',
    border: 'border-yellow-400/50',
    text: 'text-yellow-300'
  }
};

const AchievementCard: React.FC<{
  achievement: Achievement;
  onClaim?: () => void;
}> = ({ achievement, onClaim }) => {
  const Icon = iconMap[achievement.icon];
  const styles = rarityStyles[achievement.rarity];
  const [showCelebration, setShowCelebration] = React.useState(false);

  React.useEffect(() => {
    if (achievement.unlocked && achievement.unlockedAt) {
      const unlockTime = new Date(achievement.unlockedAt).getTime();
      const now = Date.now();
      if (now - unlockTime < 5000) { // Show celebration for 5 seconds after unlock
        setShowCelebration(true);
        const timer = setTimeout(() => setShowCelebration(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [achievement.unlocked, achievement.unlockedAt]);

  return (
    <motion.div
      className={cn(
        "relative p-4 rounded-lg border backdrop-blur-sm",
        "bg-gradient-to-br from-dark-card/80 to-dark-card/40",
        styles.border,
        achievement.unlocked ? styles.glow : 'border-gray-600/30'
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Rarity indicator */}
      <div className="absolute -top-2 -right-2">
        <Badge className={cn(
          "text-xs font-bold border-0",
          `bg-gradient-to-r ${styles.gradient}`,
          achievement.unlocked ? 'text-white' : 'text-gray-400'
        )}>
          {achievement.rarity.toUpperCase()}
        </Badge>
      </div>

      {/* Celebration particles */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-reward rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos(i * 30 * Math.PI / 180) * 40,
                y: Math.sin(i * 30 * Math.PI / 180) * 40,
              }}
              transition={{
                duration: 1,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-3">
        <motion.div
          className={cn(
            "p-2 rounded-full border",
            achievement.unlocked 
              ? `bg-gradient-to-r ${styles.gradient} border-current` 
              : 'bg-gray-600 border-gray-500'
          )}
          animate={achievement.unlocked ? {
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.8 }}
        >
          <Icon className={cn(
            "w-6 h-6",
            achievement.unlocked ? "text-white" : "text-gray-400"
          )} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold mb-1",
            achievement.unlocked ? "text-white" : "text-gray-400"
          )}>
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            {achievement.description}
          </p>

          {/* Progress bar for incomplete achievements */}
          {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${styles.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(achievement.progress / achievement.maxProgress) * 100}%` 
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Reward information */}
          {achievement.reward && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400">Reward:</span>
              <Badge variant="outline" className="text-xs border-reward/30 text-reward">
                {achievement.reward.type === 'points' ? `+${achievement.reward.value} pts` :
                 achievement.reward.type === 'multiplier' ? `${achievement.reward.value}x boost` :
                 achievement.reward.value}
              </Badge>
            </div>
          )}

          {/* Claim button for unlocked achievements */}
          {achievement.unlocked && onClaim && (
            <AddictiveButton
              variant="reward"
              size="sm"
              onClick={onClaim}
              psychology="shimmer"
              className="mt-2"
            >
              Claim Reward
            </AddictiveButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementSystem: React.FC<AchievementSystemProps> = ({
  achievements,
  onClaimReward,
  showNotifications = true
}) => {
  const [filter, setFilter] = React.useState<'all' | 'unlocked' | 'locked'>('all');
  
  const filteredAchievements = React.useMemo(() => {
    return achievements.filter(achievement => {
      if (filter === 'unlocked') return achievement.unlocked;
      if (filter === 'locked') return !achievement.unlocked;
      return true;
    });
  }, [achievements, filter]);

  const stats = React.useMemo(() => {
    const unlocked = achievements.filter(a => a.unlocked).length;
    const total = achievements.length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    
    return { unlocked, total, percentage };
  }, [achievements]);

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              {stats.unlocked}/{stats.total} Unlocked
            </span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full progress-bar-addictive"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-reward font-medium">{stats.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2">
          {(['all', 'unlocked', 'locked'] as const).map((filterType) => (
            <AddictiveButton
              key={filterType}
              variant={filter === filterType ? 'focus' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </AddictiveButton>
          ))}
        </div>
      </div>

      {/* Achievement grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <AchievementCard
                achievement={achievement}
                onClaim={() => onClaimReward?.(achievement)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AchievementSystem;
