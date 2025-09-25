import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, BarChart3, Calendar, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualizedInfiniteScroll } from '@/hooks/useVirtualizedInfiniteScroll';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSocialQuery } from '@/hooks/useSocialQuery';
import RealPostItem from './RealPostItem';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from '@/components/ui/sonner';

interface OptimizedSocialFeedProps {
  user: any;
  feedFilter: string;
  onFilterChange: (filter: string) => void;
}

const OptimizedSocialFeed = forwardRef<{ focusComposer: () => void }, OptimizedSocialFeedProps>(({
  user,
  feedFilter,
  onFilterChange
}, ref) => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [userReactions, setUserReactions] = useState<Record<string, string[]>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  const {
    posts,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
    createPost,
    isCreatingPost,
    handleReaction,
    isUpdatingReaction,
    getUserReactions,
    refetch
  } = useSocialQuery();

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

  // Virtual scrolling setup
  const itemHeight = isMobile ? 350 : 320;
  const containerHeight = isMobile ? 600 : 700;

  const {
    containerRef,
    scrollerRef,
    virtualItems,
    totalSize,
    state
  } = useVirtualizedInfiniteScroll(posts, {
    itemHeight,
    containerHeight,
    overscan: isMobile ? 2 : 3,
    threshold: 0.3,
    loadMoreThreshold: 5
  }, async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  });

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }

    if (!postContent.trim()) {
      toast.error('Please add content to your post');
      return;
    }

    createPost(postContent);
    setPostContent('');
    setIsExpanded(false);
  };

  const handleReactionClick = useCallback((postId: string, reactionType: string) => {
    // Optimistic update for immediate feedback
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

    handleReaction({ postId, reactionType });
  }, [handleReaction]);

  const handleShare = useCallback((post: any) => {
    if (!user) {
      toast.error('Please sign in to share posts');
      return;
    }
    
    const url = `${window.location.origin}/social?post=${post.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Post link copied to clipboard!');
  }, [user]);

  // Error state
  if (error) {
    return (
      <Card className="bg-card border-border/50">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4">Unable to load posts. Please try again.</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

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
                animate={isExpanded ? { height: 'auto' } : { height: 60 }}
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-between pt-2 border-t border-border/30"
                  >
                    <div className="flex gap-2">
                      {[Image, BarChart3, Calendar].map((Icon, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon size={18} />
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setIsExpanded(false);
                          setPostContent('');
                        }}
                        disabled={isCreatingPost}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSubmit}
                        disabled={!postContent.trim() || isCreatingPost}
                      >
                        {isCreatingPost ? (
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
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-muted/30 p-1 rounded-lg">
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

        {/* Loading indicator and refresh */}
        <div className="flex items-center gap-2">
          {isFetching && !isLoading && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              Updating...
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
          </Button>
        </div>
      </div>

      {/* Virtualized Posts Feed */}
      {isLoading ? (
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
        <div
          ref={containerRef}
          className="relative overflow-auto rounded-lg"
          style={{ height: containerHeight }}
        >
          <div
            ref={scrollerRef}
            style={{ height: totalSize, position: 'relative' }}
          >
            <AnimatePresence mode="popLayout">
              {virtualItems.map(({ index, start, item }) => (
                <motion.div
                  key={`post-${item.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.2,
                    delay: Math.min(index * 0.02, 0.1)
                  }}
                  style={{
                    position: 'absolute',
                    top: start,
                    left: 0,
                    right: 0,
                    height: itemHeight,
                  }}
                  className="px-1"
                >
                  <div className="h-full p-2">
                    <RealPostItem
                      post={item}
                      userReactions={userReactions[item.id] || []}
                      onReaction={handleReactionClick}
                      onShare={handleShare}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading more indicator */}
            {isFetchingNextPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  top: totalSize,
                  left: 0,
                  right: 0,
                  height: 80,
                }}
                className="flex items-center justify-center"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LoadingSpinner />
                  <span>Loading more posts...</span>
                </div>
              </motion.div>
            )}

            {/* End of feed indicator */}
            {!hasNextPage && posts.length > 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  top: totalSize,
                  left: 0,
                  right: 0,
                  height: 60,
                }}
                className="flex items-center justify-center text-muted-foreground text-sm"
              >
                <div className="text-center py-4">
                  <div className="w-8 h-px bg-border mx-auto mb-2"></div>
                  <span className="text-xs">You're all caught up!</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Performance indicator for development */}
      {typeof window !== 'undefined' && import.meta.env.DEV && posts.length > 0 && (
        <div className="text-xs text-muted-foreground p-2 bg-muted rounded-md">
          📊 Rendering {state.visibleItems} of {posts.length} posts 
          (indexes {state.startIndex}-{state.endIndex})
          {state.isScrolling && ' • Scrolling'}
        </div>
      )}
    </div>
  );
});

OptimizedSocialFeed.displayName = 'OptimizedSocialFeed';

export default OptimizedSocialFeed;