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
    { id: 'home', icon: Home, label: 'Home', count: 0 },
    { id: 'explore', icon: Search, label: 'Explore', count: 0 },
    { id: 'notifications', icon: Bell, label: 'Notifications', count: notifications },
    { id: 'messages', icon: MessageCircle, label: 'Messages', count: messages },
    { id: 'profile', icon: User, label: 'Profile', count: 0 },
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-surface-primary/95 backdrop-blur-md border-t border-border lg:hidden z-50 safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center p-3 min-w-0 flex-1 rounded-xl group"
              whileTap={{ scale: 0.9 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  layoutId="mobileActiveTab"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? [0, -10, 10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      size={24} 
                      className={`transition-colors duration-200 ${
                        isActive 
                          ? 'text-primary' 
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`} 
                    />
                  </motion.div>
                  
                  {item.count > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Badge 
                        variant="destructive" 
                        className="w-5 h-5 flex items-center justify-center text-xs p-0 animate-pulse shadow-glow-orange"
                      >
                        {item.count > 9 ? '9+' : item.count}
                      </Badge>
                    </motion.div>
                  )}
                </div>
                
                <motion.span 
                  className={`text-xs mt-1 font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-primary opacity-100' 
                      : 'text-muted-foreground opacity-70 group-hover:opacity-100'
                  }`}
                  animate={{ 
                    scale: isActive ? 1 : 0.9,
                    fontWeight: isActive ? 600 : 500 
                  }}
                >
                  {item.label}
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileBottomNav;