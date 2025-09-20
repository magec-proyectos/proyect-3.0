import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Search, Bell, MessageCircle, User, Wallet, Plus } from 'lucide-react';
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
    { id: 'home', label: 'Inicio', icon: Home, count: 0 },
    { id: 'explore', label: 'Explorar', icon: Search, count: 0 },
    { id: 'notifications', label: 'Notificaciones', icon: Bell, count: notifications },
    { id: 'messages', label: 'Mensajes', icon: MessageCircle, count: messages },
    { id: 'profile', label: 'Perfil', icon: User, count: 0 },
    { id: 'wallet', label: 'Wallet', icon: Wallet, count: 0 },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border p-4 z-30 hidden lg:block">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-full text-left transition-all
                ${isActive 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'hover:bg-accent text-foreground hover:text-accent-foreground'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={24} className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'} />
              <span className="text-xl">{item.label}</span>
              {item.count > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {item.count > 99 ? '99+' : item.count}
                </Badge>
              )}
            </motion.button>
          );
        })}
      </div>
      
      <Button 
        onClick={onCreatePost}
        className="w-full mt-8 py-4 text-lg font-semibold rounded-full"
        size="lg"
      >
        <Plus size={20} className="mr-2" />
        Postear
      </Button>
    </div>
  );
};

export default SocialSidebar;