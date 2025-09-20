import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Search, Bell, MessageCircle, User, Wallet, Plus, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePost: () => void;
  notifications?: number;
  messages?: number;
}

const SocialSidebar: React.FC<SocialSidebarProps> = ({
  activeTab,
  onTabChange,
  onCreatePost,
  notifications = 0,
  messages = 0
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, count: 0 },
    { id: 'explore', label: 'Explore', icon: Search, count: 0 },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications },
    { id: 'messages', label: 'Messages', icon: MessageCircle, count: messages },
    { id: 'profile', label: 'Profile', icon: User, count: 0 },
    { id: 'wallet', label: 'Wallet', icon: Wallet, count: 0 },
  ];

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-surface-primary border-r border-border p-6 z-30 hidden lg:block"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.div key={item.id} variants={itemVariants}>
              <motion.button
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-full text-left transition-all group relative overflow-hidden
                  ${isActive 
                    ? 'bg-primary text-primary-foreground font-semibold shadow-elevation-2' 
                    : 'hover:bg-accent text-foreground hover:text-accent-foreground hover:shadow-elevation-1'
                  }
                `}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <Icon 
                    size={24} 
                    className={`transition-colors ${
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`} 
                  />
                  <span className="text-xl font-medium">{item.label}</span>
                  {item.count > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <Badge 
                        variant="destructive" 
                        className="animate-pulse shadow-glow-orange"
                      >
                        {item.count > 99 ? '99+' : item.count}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        variants={itemVariants}
        className="mt-8"
      >
        <Button 
          onClick={onCreatePost}
          className="w-full py-6 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elevation-3 hover:shadow-glow-blue transition-all duration-300"
          size="lg"
        >
          <Plus size={24} className="mr-3" />
          Post
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SocialSidebar;