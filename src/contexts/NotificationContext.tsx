
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';


export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}

interface NotificationContextProps {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

const MAX_NOTIFICATIONS = 50; // Limit to prevent storage quota issues

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Calculate unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        // Convert string timestamps back to Date objects and limit count
        const convertedNotifications = parsed
          .map((notification: any) => ({
            ...notification,
            timestamp: new Date(notification.timestamp)
          }))
          .slice(0, MAX_NOTIFICATIONS);
        setNotifications(convertedNotifications);
      }
    } catch (e) {
      console.error('Failed to load notifications from localStorage:', e);
      // Clear corrupted data
      localStorage.removeItem('notifications');
    }
  }, []);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    try {
      // Only keep the most recent notifications
      const limitedNotifications = notifications.slice(0, MAX_NOTIFICATIONS);
      localStorage.setItem('notifications', JSON.stringify(limitedNotifications));
    } catch (e) {
      console.error('Failed to save notifications to localStorage:', e);
      // If quota exceeded, try to save only the most recent 20
      try {
        const reducedNotifications = notifications.slice(0, 20);
        localStorage.setItem('notifications', JSON.stringify(reducedNotifications));
        setNotifications(reducedNotifications);
      } catch (fallbackError) {
        // Last resort: clear all notifications
        console.error('Critical storage error, clearing notifications');
        localStorage.removeItem('notifications');
        setNotifications([]);
      }
    }
  }, [notifications]);
  
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    
    // Add new notification and auto-prune to MAX_NOTIFICATIONS
    setNotifications(prev => [newNotification, ...prev].slice(0, MAX_NOTIFICATIONS));
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        clearNotification, 
        clearAllNotifications 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export default NotificationProvider;
export { useNotifications };
