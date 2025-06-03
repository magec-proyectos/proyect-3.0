
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, TrendingUp, Users, Flame, AlertTriangle, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface StrategicNotification {
  id: string;
  type: 'winning' | 'trending' | 'fomo' | 'follower' | 'streak';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  data?: any;
}

const StrategicNotifications = () => {
  const [notifications, setNotifications] = useState<StrategicNotification[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Simular notificaciones estratégicas
    const mockNotifications: StrategicNotification[] = [
      {
        id: '1',
        type: 'winning',
        title: '¡Tu predicción está ganando! 🔥',
        message: 'Liverpool vs Arsenal - "Más de 2.5 goles" va 2-1 en el minuto 65',
        priority: 'high',
        timestamp: new Date(),
        action: {
          label: 'Ver partido',
          onClick: () => console.log('Ver partido en vivo')
        }
      },
      {
        id: '2',
        type: 'fomo',
        title: 'Tendencia HOT 📈',
        message: '12 usuarios están apostando a "Real Madrid victoria" AHORA',
        priority: 'medium',
        timestamp: new Date(Date.now() - 300000),
        action: {
          label: 'Ver predicción',
          onClick: () => console.log('Ver predicción trending')
        }
      },
      {
        id: '3',
        type: 'follower',
        title: 'Nuevo seguidor ⭐',
        message: 'Carlos Experto (@carlosbet) ahora te sigue',
        priority: 'low',
        timestamp: new Date(Date.now() - 600000)
      }
    ];

    setNotifications(mockNotifications);

    // Simular nuevas notificaciones
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification: StrategicNotification = {
          id: Date.now().toString(),
          type: 'trending',
          title: 'Predicción viral 🚀',
          message: `${Math.floor(Math.random() * 20 + 5)} usuarios están siguiendo esta predicción`,
          priority: 'medium',
          timestamp: new Date()
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [user]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'winning': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'fomo': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'follower': return <Users className="w-4 h-4 text-blue-400" />;
      case 'streak': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-500/5';
      case 'medium': return 'border-l-orange-500 bg-orange-500/5';
      default: return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!isVisible || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card className={`bg-dark-card border-dark-border border-l-4 ${getPriorityColor(notification.priority)} shadow-lg hover:shadow-xl transition-all`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-300 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                        {notification.action && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={notification.action.onClick}
                            className="text-xs px-2 py-1 h-auto bg-neon-blue/10 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="p-1 h-auto text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StrategicNotifications;
