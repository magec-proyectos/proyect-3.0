import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, BarChart3, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import RealPostItem from './RealPostItem';
import { RealPost } from '@/hooks/useRealSocialData';
import LoadingSpinner from '@/components/LoadingSpinner';

interface RealSocialFeedProps {
  posts: RealPost[];
  loading?: boolean;
  feedFilter: string;
  onFilterChange: (filter: string) => void;
  onReaction: (postId: string, reactionType: string) => void;
  onShare: (post: RealPost) => void;
  onCreatePost: (content: string) => void;
  user: any;
  getUserReactions: (postIds: string[]) => Promise<Record<string, string[]>>;
}

const RealSocialFeed = forwardRef<{ focusComposer: () => void }, RealSocialFeedProps>(({
  posts,
  loading = false,
  feedFilter,
  onFilterChange,
  onReaction,
  onShare,
  onCreatePost,
  user,
  getUserReactions
}, ref) => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userReactions, setUserReactions] = useState<Record<string, string[]>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focusComposer: () => {
      textareaRef.current?.focus();
      setIsExpanded(true);
    }
  }));

  // Fetch user reactions when posts change
  useEffect(() => {
    if (posts.length > 0) {
      const postIds = posts.map(post => post.id);
      getUserReactions(postIds).then(setUserReactions);
    }
  }, [posts, getUserReactions]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }

    if (!postContent.trim()) {
      toast.error('Please add content to your post');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreatePost(postContent);
      setPostContent('');
      setIsExpanded(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const expandedVariants = {
    collapsed: { height: 60 },
    expanded: { height: 'auto' }
  };

  const actionButtonsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const handleReactionClick = (postId: string, reactionType: string) => {
    onReaction(postId, reactionType);
    // Optimistically update local state
    setUserReactions(prev => {
      const postReactions = prev[postId] || [];
      const hasReaction = postReactions.includes(reactionType);
      return {
        ...prev,
        [postId]: hasReaction 
          ? postReactions.filter(r => r !== reactionType)
          : [...postReactions, reactionType]
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Post Composer */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar_url || 'https://placehold.co/40'} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                {user?.name?.substring(0, 2) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <motion.div
                variants={expandedVariants}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                className="overflow-hidden"
              >
                <Textarea
                  ref={textareaRef}
                  placeholder="Share your next winning prediction..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  className="min-h-[60px] border-none resize-none text-body-md placeholder:text-muted-foreground bg-transparent"
                />
              </motion.div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    variants={actionButtonsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex items-center justify-between pt-2 border-t border-border/30"
                  >
                    <div className="flex gap-2">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Image size={18} />
                      </motion.button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <BarChart3 size={18} />
                      </motion.button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Calendar size={18} />
                      </motion.button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setIsExpanded(false);
                          setPostContent('');
                        }}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSubmit}
                        disabled={!postContent.trim() || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          'Post Prediction'
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Filter Tabs */}
      <div className="flex gap-1 bg-muted/30 p-1 rounded-lg w-fit">
        {[
          { key: 'foryou', label: 'For you' },
          { key: 'following', label: 'Following' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`px-4 py-2 rounded-md text-body-sm font-medium transition-all relative ${
              feedFilter === tab.key
                ? 'text-primary bg-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {feedFilter === tab.key && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : posts.length === 0 ? (
          <Card className="bg-card border-border/50">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground text-body-md">No predictions yet. Be the first to share!</p>
            </CardContent>
          </Card>
        ) : (
          <AnimatePresence mode="wait">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <RealPostItem
                  post={post}
                  userReactions={userReactions[post.id] || []}
                  onReaction={handleReactionClick}
                  onShare={onShare}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

RealSocialFeed.displayName = 'RealSocialFeed';

export default RealSocialFeed;