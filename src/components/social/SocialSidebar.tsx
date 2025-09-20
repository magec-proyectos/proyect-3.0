import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Search, 
  Bell, 
  MessageCircle, 
  User, 
  Wallet,
  Plus,
  Hash,
  TrendingUp,
  Sparkles
} from 'lucide-react';
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
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications },
    { id: 'messages', label: 'Messages', icon: MessageCircle, count: messages },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wallet', label: 'Wallet', icon: Wallet }
  ];

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 spacing-md border-r border-border/50 hidden lg:block"
    >
      <div className="sticky top-24 spacing-lg">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all duration-200 group
                ${activeTab === item.id 
                  ? 'bg-primary/10 text-primary font-semibold' 
                  : 'hover:bg-muted/50 text-foreground/70 hover:text-foreground'
                }
              `}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon size={24} className={`${activeTab === item.id ? 'text-primary' : 'group-hover:text-foreground'}`} />
              <span className="text-body-lg">{item.label}</span>
              {item.count && item.count > 0 && (
                <Badge 
                  variant="destructive" 
                  className="ml-auto h-5 px-2 text-xs bg-destructive text-destructive-foreground"
                >
                  {item.count}
                </Badge>
              )}
            </motion.button>
          ))}
        </nav>

        <motion.div
          variants={itemVariants}
          className="spacing-lg"
        >
          <Button 
            onClick={() => {
              const composer = document.querySelector('textarea[placeholder="What\'s happening?"]') as HTMLTextAreaElement;
              if (composer) {
                composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                composer.focus();
              }
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-body-lg rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            size="lg"
          >
            <Plus size={20} className="mr-2" />
            Post
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="spacing-lg"
        >
          <div className="flex items-center gap-2 text-body-sm font-semibold text-muted-foreground mb-3">
            <Sparkles size={16} />
            Trending
          </div>
          <div className="space-y-1">
            {['#ChampionsLeague', '#PremierLeague', '#BestBets'].map((topic, index) => (
              <motion.button
                key={topic}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-muted/30 transition-all group"
                whileHover={{ x: 4 }}
              >
                <Hash size={14} className="text-primary/60 group-hover:text-primary" />
                <span className="text-body-sm group-hover:text-foreground">{topic}</span>
                <TrendingUp size={12} className="ml-auto text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SocialSidebar;