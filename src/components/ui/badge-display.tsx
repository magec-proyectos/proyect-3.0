import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Target, 
  Crown, 
  Flame, 
  Zap, 
  Star, 
  Users, 
  TrendingUp, 
  Heart, 
  DollarSign, 
  Gem, 
  Shield, 
  Clock, 
  CheckCircle, 
  Moon, 
  Calendar, 
  UserCheck, 
  Crosshair,
  LucideIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

// Icon mapping for badges
const ICON_MAP: Record<string, LucideIcon> = {
  'trophy': Trophy,
  'target': Target,
  'crown': Crown,
  'flame': Flame,
  'zap': Zap,
  'star': Star,
  'users': Users,
  'trending-up': TrendingUp,
  'heart': Heart,
  'dollar-sign': DollarSign,
  'gem': Gem,
  'shield': Shield,
  'clock': Clock,
  'check-circle': CheckCircle,
  'moon': Moon,
  'calendar': Calendar,
  'user-check': UserCheck,
  'crosshair': Crosshair,
};

interface BadgeData {
  badge_key: string;
  name: string;
  description: string;
  icon_name: string;
  color_scheme: string;
  rarity: string;
  category: string;
  level?: number;
  earned_at?: string;
  earned_for?: any;
}

interface BadgeDisplayProps {
  badge: BadgeData;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badge,
  size = 'md',
  showTooltip = true,
  animated = true,
  className = ''
}) => {
  const getColorScheme = (colorScheme: string, rarity: string) => {
    const rarityMultiplier = rarity === 'legendary' ? 'saturate-150' : 
                           rarity === 'epic' ? 'saturate-125' : 
                           rarity === 'rare' ? 'saturate-110' : '';

    switch (colorScheme) {
      case 'gold':
        return `bg-gradient-to-br from-yellow-400 to-yellow-600 ${rarityMultiplier}`;
      case 'silver':
        return `bg-gradient-to-br from-gray-300 to-gray-500 ${rarityMultiplier}`;
      case 'bronze':
        return `bg-gradient-to-br from-orange-400 to-orange-600 ${rarityMultiplier}`;
      case 'purple':
        return `bg-gradient-to-br from-purple-400 to-purple-600 ${rarityMultiplier}`;
      case 'red':
        return `bg-gradient-to-br from-red-400 to-red-600 ${rarityMultiplier}`;
      case 'green':
        return `bg-gradient-to-br from-green-400 to-green-600 ${rarityMultiplier}`;
      case 'orange':
        return `bg-gradient-to-br from-orange-400 to-orange-600 ${rarityMultiplier}`;
      case 'blue':
      default:
        return `bg-gradient-to-br from-blue-400 to-blue-600 ${rarityMultiplier}`;
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'lg':
        return 'w-16 h-16 text-base';
      case 'xl':
        return 'w-20 h-20 text-lg';
      default:
        return 'w-12 h-12 text-sm';
    }
  };

  const getIconSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-10 h-10';
      default:
        return 'w-6 h-6';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'shadow-lg shadow-yellow-500/50 ring-2 ring-yellow-400/50';
      case 'epic':
        return 'shadow-lg shadow-purple-500/50 ring-1 ring-purple-400/50';
      case 'rare':
        return 'shadow-md shadow-blue-500/30 ring-1 ring-blue-400/30';
      default:
        return 'shadow-sm';
    }
  };

  const IconComponent = ICON_MAP[badge.icon_name] || Trophy;

  const badgeElement = (
    <motion.div
      initial={animated ? { scale: 0, rotate: -180 } : undefined}
      animate={animated ? { scale: 1, rotate: 0 } : undefined}
      whileHover={animated ? { scale: 1.1, y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`
        relative rounded-full 
        ${getSizeClasses(size)}
        ${getColorScheme(badge.color_scheme, badge.rarity)}
        ${getRarityGlow(badge.rarity)}
        flex items-center justify-center
        cursor-pointer
        ${className}
      `}
      title={showTooltip ? `${badge.name}: ${badge.description}` : undefined}
    >
      <IconComponent className={`${getIconSize(size)} text-white drop-shadow-sm`} />
      
      {/* Rarity indicator */}
      {badge.rarity === 'legendary' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-yellow-300/50"
        />
      )}
      
      {/* Level indicator for progressive badges */}
      {badge.level && badge.level > 1 && (
        <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-gray-300">
          {badge.level}
        </div>
      )}
    </motion.div>
  );

  return badgeElement;
};

interface BadgeGridProps {
  badges: BadgeData[];
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  maxDisplay = 10,
  size = 'md',
  className = ''
}) => {
  const displayBadges = badges.slice(0, maxDisplay);
  const remainingCount = badges.length - maxDisplay;

  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`}>
      {displayBadges.map((badge, index) => (
        <motion.div
          key={badge.badge_key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <BadgeDisplay badge={badge} size={size} />
        </motion.div>
      ))}
      
      {remainingCount > 0 && (
        <Badge 
          variant="outline" 
          className="border-gray-600 text-gray-400 bg-dark-card"
        >
          +{remainingCount}
        </Badge>
      )}
    </div>
  );
};

interface CategoryBadgesProps {
  badges: BadgeData[];
  category: string;
  title: string;
  description?: string;
}

const CategoryBadges: React.FC<CategoryBadgesProps> = ({
  badges,
  category,
  title,
  description
}) => {
  const categoryBadges = badges.filter(badge => badge.category === category);

  if (categoryBadges.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>
      <BadgeGrid badges={categoryBadges} maxDisplay={20} size="lg" />
    </div>
  );
};

interface BadgeStatsProps {
  badges: BadgeData[];
}

const BadgeStats: React.FC<BadgeStatsProps> = ({ badges }) => {
  const rarityCount = badges.reduce((acc, badge) => {
    acc[badge.rarity] = (acc[badge.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryCount = badges.reduce((acc, badge) => {
    acc[badge.category] = (acc[badge.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-dark-card p-4 rounded border border-dark-border text-center">
        <div className="text-2xl font-bold text-white mb-1">
          {badges.length}
        </div>
        <div className="text-xs text-gray-400">Total Badges</div>
      </div>
      
      <div className="bg-dark-card p-4 rounded border border-dark-border text-center">
        <div className="text-2xl font-bold text-yellow-400 mb-1">
          {rarityCount.legendary || 0}
        </div>
        <div className="text-xs text-gray-400">Legendary</div>
      </div>
      
      <div className="bg-dark-card p-4 rounded border border-dark-border text-center">
        <div className="text-2xl font-bold text-purple-400 mb-1">
          {rarityCount.epic || 0}
        </div>
        <div className="text-xs text-gray-400">Epic</div>
      </div>
      
      <div className="bg-dark-card p-4 rounded border border-dark-border text-center">
        <div className="text-2xl font-bold text-blue-400 mb-1">
          {rarityCount.rare || 0}
        </div>
        <div className="text-xs text-gray-400">Rare</div>
      </div>
    </div>
  );
};

export { BadgeDisplay, BadgeGrid, CategoryBadges, BadgeStats };
export type { BadgeData };