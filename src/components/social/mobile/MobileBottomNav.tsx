import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Search, 
  Bell, 
  MessageCircle, 
  User, 
  Wallet 
} from 'lucide-react';

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
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Search, label: 'Explore' },
    { id: 'notifications', icon: Bell, label: 'Notifications', count: notifications },
    { id: 'messages', icon: MessageCircle, label: 'Messages', count: messages },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-2 z-50"
    >
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200
              ${activeTab === item.id 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <item.icon 
                size={22} 
                className={`transition-all duration-200 ${
                  activeTab === item.id ? 'stroke-2' : 'stroke-1.5'
                }`}
              />
              {item.count && item.count > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center p-0 bg-destructive text-destructive-foreground"
                >
                  {item.count > 9 ? '9+' : item.count}
                </Badge>
              )}
            </div>
            <span className={`
              text-xs mt-1 transition-all duration-200
              ${activeTab === item.id ? 'font-semibold opacity-100' : 'font-normal opacity-70'}
            `}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileBottomNav;