
import { useState, useCallback, useEffect } from 'react';
import { EnhancedNotification } from '@/components/ui/enhanced-notification';

interface UseEnhancedNotificationsReturn {
  notifications: EnhancedNotification[];
  addNotification: (notification: Omit<EnhancedNotification, 'id'>) => string;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addAchievementNotification: (title: string, description: string, data?: any) => void;
  addStreakNotification: (count: number, type: string) => void;
}

export const useEnhancedNotifications = (): UseEnhancedNotificationsReturn => {
  const [notifications, setNotifications] = useState<EnhancedNotification[]>([]);

  const addNotification = useCallback((notification: Omit<EnhancedNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: EnhancedNotification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-dismiss after duration if not persistent
    if (!notification.persistent && notification.duration !== 0) {
      setTimeout(() => {
        dismissNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const addAchievementNotification = useCallback((title: string, description: string, data?: any) => {
    addNotification({
      type: 'achievement',
      title: `🏆 ${title}`,
      message: description,
      duration: 8000,
      data,
      action: {
        label: 'View Achievement',
        onClick: () => {
          // Could open achievement modal
          console.log('View achievement:', data);
        }
      }
    });
  }, [addNotification]);

  const addStreakNotification = useCallback((count: number, type: string) => {
    const messages = {
      3: "You're on fire! 🔥",
      5: "Incredible streak! 💫",
      10: "Legendary performance! 👑",
      15: "Absolutely unstoppable! ⚡",
      20: "You're a prediction master! 🎯"
    };

    const milestone = Object.keys(messages)
      .map(Number)
      .sort((a, b) => b - a)
      .find(m => count >= m);

    if (milestone && count === milestone) {
      addNotification({
        type: 'streak',
        title: `${count} ${type} Streak!`,
        message: messages[milestone as keyof typeof messages],
        duration: 6000,
      });
    }
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications,
    addAchievementNotification,
    addStreakNotification,
  };
};

export default useEnhancedNotifications;
