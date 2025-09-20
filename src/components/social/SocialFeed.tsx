import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Image, Smile, BarChart3, Sparkles, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import VirtualizedPostFeed from './VirtualizedPostFeed';
import { Post } from './PostItem';

interface SocialFeedProps {
  posts: Post[];
  likedPosts: number[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onAddComment: (postId: number, content: string) => void;
  onCreatePost: (content: string) => void;
  user?: any;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  likedPosts,
  filter,
  onFilterChange,
  onLike,
  onShare,
  onAddComment,
  onCreatePost,
  user
}) => {
  const [postContent, setPostContent] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);

  const filters = [
    { id: 'foryou', label: 'For you', icon: Sparkles },
    { id: 'following', label: 'Following', icon: BarChart3 },
  ];

  const handleSubmitPost = () => {
    if (!user) {
      toast.error('Please sign in to post', {
        description: 'Create an account or sign in to share your predictions'
      });
      return;
    }
    
    if (postContent.trim()) {
      onCreatePost(postContent);
      setPostContent('');
      setIsExpanded(false);
      toast.success('Post shared successfully! 🎉', {
        description: 'Your prediction has been shared with the community'
      });
    }
  };

  const handleTextareaFocus = () => {
    setIsExpanded(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Create post - Always visible at top */}
      <motion.div 
        className="border-b border-border pb-6 mb-6 bg-surface-primary rounded-t-xl"
        variants={itemVariants}
      >
        <div className="flex gap-4 p-6">
          <Avatar className="w-12 h-12 ring-2 ring-border">
            <AvatarImage src={user?.avatar || 'https://placehold.co/48'} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
              {user?.name?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <motion.div
              animate={{ height: isExpanded ? 'auto' : '60px' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Textarea
                placeholder={user ? "What's happening?" : "Sign in to share your predictions"}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onFocus={handleTextareaFocus}
                disabled={!user}
                className="border-none resize-none p-0 text-xl placeholder:text-muted-foreground focus-visible:ring-0 bg-transparent min-h-[60px]"
                rows={isExpanded ? 4 : 1}
              />
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center justify-between pt-4 border-t border-border"
                >
                  <div className="flex gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-3 hover:bg-primary/10 rounded-full transition-all hover:scale-105"
                      disabled={!user}
                      onClick={() => toast.info('📸 Image upload coming soon!')}
                    >
                      <Image size={20} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-3 hover:bg-primary/10 rounded-full transition-all hover:scale-105"
                      disabled={!user}
                      onClick={() => toast.info('📊 Prediction charts coming soon!')}
                    >
                      <BarChart3 size={20} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-3 hover:bg-primary/10 rounded-full transition-all hover:scale-105"
                      disabled={!user}
                      onClick={() => toast.info('😀 Emoji picker coming soon!')}
                    >
                      <Smile size={20} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-3 hover:bg-primary/10 rounded-full transition-all hover:scale-105"
                      disabled={!user}
                      onClick={() => toast.info('🗓️ Schedule post coming soon!')}
                    >
                      <Calendar size={20} />
                    </Button>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    {postContent.length > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {280 - postContent.length}
                      </span>
                    )}
                    <Button 
                      onClick={handleSubmitPost}
                      disabled={!postContent.trim() || !user}
                      className="rounded-full px-8 font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elevation-2 hover:shadow-glow-blue transition-all duration-300"
                      size="sm"
                    >
                      {user ? 'Post' : 'Sign in'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div 
        className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10"
        variants={itemVariants}
      >
        <div className="flex">
          {filters.map((filterOption) => {
            const Icon = filterOption.icon;
            const isActive = filter === filterOption.id;
            
            return (
              <motion.button
                key={filterOption.id}
                onClick={() => onFilterChange(filterOption.id)}
                className={`flex-1 relative flex items-center justify-center gap-2 py-4 font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} />
                {filterOption.label}
                
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Posts feed */}
      <motion.div 
        className="pt-6"
        variants={itemVariants}
      >
        <VirtualizedPostFeed 
          posts={posts}
          likedPosts={likedPosts}
          onLike={onLike}
          onShare={onShare}
          onAddComment={onAddComment}
          onLoadMore={async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SocialFeed;