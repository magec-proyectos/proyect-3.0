import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, User, Wallet } from 'lucide-react';
import StoriesRing from './StoriesRing';
import { RealPost } from '@/hooks/useRealSocialData';
const OptimizedSocialFeed = React.lazy(() => import('./OptimizedSocialFeed'));

interface SocialTabContentProps {
  activeTab: string;
  feedFilter: string;
  onFilterChange: (filter: string) => void;
  user: any;
  socialFeedRef: React.RefObject<{ focusComposer: () => void }>;
}

const EmptyState: React.FC<{ icon: React.ElementType; title: string; subtitle: string }> = ({
  icon: Icon,
  title,
  subtitle
}) => (
  <div className="spacing-lg">
    <h2 className="text-heading-lg font-heading text-foreground">{title}</h2>
    <div className="text-center spacing-4xl text-muted-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-16 h-16 mx-auto spacing-md bg-muted/20 rounded-full flex items-center justify-center"
      >
        <Icon size={32} />
      </motion.div>
      <p className="text-body-lg">{title}</p>
      <p className="text-body-sm">{subtitle}</p>
    </div>
  </div>
);

const SocialTabContent: React.FC<SocialTabContentProps> = ({
  activeTab,
  feedFilter,
  onFilterChange,
  user,
  socialFeedRef
}) => {
  switch (activeTab) {
    case 'home':
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <OptimizedSocialFeed
            ref={socialFeedRef}
            user={user}
            feedFilter={feedFilter}
            onFilterChange={onFilterChange}
          />
        </React.Suspense>
      );
      
    case 'explore':
      return (
        <div className="space-y-6">
          <StoriesRing />
          <React.Suspense fallback={<div>Loading...</div>}>
            <OptimizedSocialFeed
              user={user}
              feedFilter="trending"
              onFilterChange={onFilterChange}
            />
          </React.Suspense>
        </div>
      );
      
    case 'notifications':
      return (
        <EmptyState
          icon={Bell}
          title="No new notifications"
          subtitle="We'll notify you when something happens"
        />
      );
      
    case 'messages':
      return (
        <EmptyState
          icon={MessageCircle}
          title="No new messages"
          subtitle="Start a conversation with other predictors"
        />
      );
      
    case 'profile':
      return (
        <EmptyState
          icon={User}
          title="Profile in development"
          subtitle="Your betting statistics and achievements will appear here"
        />
      );
      
    case 'wallet':
      return (
        <EmptyState
          icon={Wallet}
          title="Wallet in development"
          subtitle="Manage your betting funds and earnings here"
        />
      );
      
    default:
      return null;
  }
};

export default SocialTabContent;