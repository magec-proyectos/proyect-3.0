import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Home, Search, Bell, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications?: number;
  messages?: number;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  notifications = 0,
  messages = 0
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio', count: 0 },
    { id: 'explore', icon: Search, label: 'Explorar', count: 0 },
    { id: 'notifications', icon: Bell, label: 'Notificaciones', count: notifications },
    { id: 'messages', icon: MessageCircle, label: 'Mensajes', count: messages },
    { id: 'profile', icon: User, label: 'Perfil', count: 0 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center p-2 min-w-0 flex-1"
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  className={isActive ? 'text-primary' : 'text-muted-foreground'} 
                />
                {item.count > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs p-0"
                  >
                    {item.count > 9 ? '9+' : item.count}
                  </Badge>
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;