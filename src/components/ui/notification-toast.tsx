
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Trophy, Zap } from 'lucide-react';
import { AddictiveButton } from './addictive-button';

interface NotificationToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'achievement' | 'reward';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  achievement: Trophy,
  reward: Zap,
};

const styleMap = {
  success: {
    bg: 'bg-success/20 border-success/30',
    icon: 'text-success',
    title: 'text-success',
  },
  error: {
    bg: 'bg-urgency/20 border-urgency/30',
    icon: 'text-urgency',
    title: 'text-urgency',
  },
  info: {
    bg: 'bg-focus/20 border-focus/30',
    icon: 'text-focus',
    title: 'text-focus',
  },
  achievement: {
    bg: 'bg-achievement/20 border-achievement/30',
    icon: 'text-achievement',
    title: 'text-achievement',
  },
  reward: {
    bg: 'bg-reward/20 border-reward/30',
    icon: 'text-reward',
    title: 'text-reward',
  },
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action,
}) => {
  const Icon = iconMap[type];
  const styles = styleMap[type];

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className={`
        relative p-4 rounded-lg border backdrop-blur-sm max-w-sm w-full
        ${styles.bg}
        ${type === 'achievement' ? 'achievement-glow' : ''}
        ${type === 'reward' ? 'animate-dopamine-pulse' : ''}
      `}
    >
      {/* Progress bar for timed notifications */}
      {duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}

      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 mt-0.5 ${styles.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${styles.title}`}>
            {title}
          </h4>
          <p className="text-sm text-gray-300 mt-1">
            {message}
          </p>
          
          {action && (
            <div className="mt-3">
              <AddictiveButton
                variant={type === 'reward' ? 'reward' : type === 'achievement' ? 'achievement' : 'outline'}
                size="sm"
                onClick={action.onClick}
                psychology={type === 'reward' ? 'dopamine' : type === 'achievement' ? 'burst' : 'none'}
              >
                {action.label}
              </AddictiveButton>
            </div>
          )}
        </div>
        
        <AddictiveButton
          variant="ghost"
          size="icon"
          onClick={() => onClose(id)}
          className="flex-shrink-0 h-6 w-6 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </AddictiveButton>
      </div>

      {/* Celebration particles for achievements */}
      {type === 'achievement' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-achievement rounded-full"
              style={{
                top: '20%',
                left: '20%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos(i * 60 * Math.PI / 180) * 30,
                y: Math.sin(i * 60 * Math.PI / 180) * 30,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default NotificationToast;
