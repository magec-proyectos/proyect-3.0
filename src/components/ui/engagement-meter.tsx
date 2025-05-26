
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Users } from 'lucide-react';
import { AddictiveProgress } from './addictive-progress';

interface EngagementMeterProps {
  value: number; // 0-100
  label: string;
  type: 'energy' | 'focus' | 'social';
  showBoost?: boolean;
  className?: string;
}

const typeConfig = {
  energy: {
    icon: Zap,
    color: 'energy',
    psychology: 'energy' as const,
  },
  focus: {
    icon: TrendingUp,
    color: 'focus',
    psychology: 'achievement' as const,
  },
  social: {
    icon: Users,
    color: 'success',
    psychology: 'success' as const,
  },
};

export const EngagementMeter: React.FC<EngagementMeterProps> = ({
  value,
  label,
  type,
  showBoost = false,
  className = ""
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;
  
  const getStatus = (val: number) => {
    if (val >= 80) return { text: 'Excellent', glow: true };
    if (val >= 60) return { text: 'Good', glow: false };
    if (val >= 40) return { text: 'Average', glow: false };
    return { text: 'Needs Boost', glow: false };
  };

  const status = getStatus(value);

  return (
    <motion.div
      className={`bg-dark-card border border-gray-600/30 rounded-lg p-4 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full bg-${config.color}/20`}>
            <Icon className={`w-4 h-4 text-${config.color}`} />
          </div>
          <span className="font-medium text-white">{label}</span>
        </div>
        
        <div className="text-right">
          <div className={`text-lg font-bold text-${config.color}`}>
            {value}%
          </div>
          <div className={`text-xs ${status.glow ? `text-${config.color}` : 'text-gray-400'}`}>
            {status.text}
          </div>
        </div>
      </div>

      <AddictiveProgress
        value={value}
        psychology={config.psychology}
        showParticles={value > 75}
        milestone={80}
        glowIntensity={status.glow ? 'high' : 'medium'}
        className="mb-2"
      />

      {showBoost && value < 60 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-reward/10 border border-reward/20 rounded text-xs"
        >
          <div className="flex items-center gap-1 text-reward">
            <Zap className="w-3 h-3" />
            <span>Complete daily challenges to boost your {label.toLowerCase()}!</span>
          </div>
        </motion.div>
      )}

      {status.glow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              `0 0 20px rgba(var(--${config.color}), 0.3)`,
              `0 0 30px rgba(var(--${config.color}), 0.5)`,
              `0 0 20px rgba(var(--${config.color}), 0.3)`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default EngagementMeter;
