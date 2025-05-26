
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, XCircle, TrendingUp, Star } from 'lucide-react';
import { Button } from './button';

export interface EnhancedNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'achievement' | 'streak';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  persistent?: boolean;
  data?: any;
}

interface EnhancedNotificationProps {
  notification: EnhancedNotification;
  onDismiss: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  achievement: Star,
  streak: TrendingUp,
};

const colorMap = {
  success: 'from-green-500/20 to-green-600/20 border-green-500/30',
  error: 'from-red-500/20 to-red-600/20 border-red-500/30',
  warning: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
  info: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  achievement: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  streak: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
};

const iconColorMap = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
  achievement: 'text-purple-400',
  streak: 'text-orange-400',
};

export const EnhancedNotificationComponent: React.FC<EnhancedNotificationProps> = ({
  notification,
  onDismiss
}) => {
  const Icon = iconMap[notification.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`
        relative p-4 rounded-lg border backdrop-blur-sm min-w-80 max-w-sm
        bg-gradient-to-r ${colorMap[notification.type]}
        shadow-lg hover:shadow-xl transition-shadow duration-300
      `}
    >
      {/* Glow effect for special notifications */}
      {(notification.type === 'achievement' || notification.type === 'streak') && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-30"
          animate={{
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.4)',
              '0 0 30px rgba(168, 85, 247, 0.6)',
              '0 0 20px rgba(168, 85, 247, 0.4)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <div className="flex items-start gap-3 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 25 }}
        >
          <Icon className={`w-5 h-5 ${iconColorMap[notification.type]} flex-shrink-0`} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h4
            className="font-semibold text-white mb-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {notification.title}
          </motion.h4>
          <motion.p
            className="text-sm text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {notification.message}
          </motion.p>
          
          {notification.action && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={notification.action.onClick}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {notification.action.label}
              </Button>
            </motion.div>
          )}
        </div>
        
        {!notification.persistent && (
          <motion.button
            onClick={() => onDismiss(notification.id)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
      
      {/* Progress bar for timed notifications */}
      {notification.duration && !notification.persistent && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: notification.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

interface EnhancedNotificationContainerProps {
  notifications: EnhancedNotification[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const EnhancedNotificationContainer: React.FC<EnhancedNotificationContainerProps> = ({
  notifications,
  onDismiss,
  position = 'top-right'
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-2`}>
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <EnhancedNotificationComponent
            key={notification.id}
            notification={notification}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedNotificationContainer;
