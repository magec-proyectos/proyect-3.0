import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, User, Wallet } from 'lucide-react';
import StoriesRing from './StoriesRing';
import { RealPost } from '@/hooks/useRealSocialData';
import RealSocialFeed from './RealSocialFeed';

interface SocialTabContentProps {
  activeTab: string;
  posts: RealPost[];
  loading?: boolean;
  feedFilter: string;
  onFilterChange: (filter: string) => void;
  onReaction: (postId: string, reactionType: string) => void;
  onShare: (post: RealPost) => void;
  onCreatePost: (content: string) => void;
  user: any;
  socialFeedRef: React.RefObject<{ focusComposer: () => void }>;
  getUserReactions: (postIds: string[]) => Promise<Record<string, string[]>>;
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
  posts,
  loading = false,
  feedFilter,
  onFilterChange,
  onReaction,
  onShare,
  onCreatePost,
  user,
  socialFeedRef,
  getUserReactions
}) => {
  switch (activeTab) {
    case 'home':
      return (
        <RealSocialFeed
          ref={socialFeedRef}
          posts={posts}
          loading={loading}
          feedFilter={feedFilter}
          onFilterChange={onFilterChange}
          onReaction={onReaction}
          onShare={onShare}
          onCreatePost={onCreatePost}
          user={user}
          getUserReactions={getUserReactions}
        />
      );
      
    case 'explore':
      return (
        <div className="space-y-6">
          <StoriesRing />
          <RealSocialFeed
            posts={posts.filter(post => post.likes_count > 3)}
            loading={loading}
            feedFilter="trending"
            onFilterChange={onFilterChange}
            onReaction={onReaction}
            onShare={onShare}
            onCreatePost={onCreatePost}
            user={user}
            getUserReactions={getUserReactions}
          />
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