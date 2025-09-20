import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostItem, { Post } from './PostItem';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useVirtualizedInfiniteScroll } from '@/hooks/useVirtualizedInfiniteScroll';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface VirtualizedPostFeedProps {
  posts: Post[];
  likedPosts: number[];
  onLike: (postId: number) => void;
  onShare: (post: Post) => void;
  onAddComment: (postId: number, content: string) => void;
  onLoadMore?: () => Promise<void>;
}

const VirtualizedPostFeed: React.FC<VirtualizedPostFeedProps> = ({
  posts,
  likedPosts,
  onLike,
  onShare,
  onAddComment,
  onLoadMore
}) => {
  const isMobile = useIsMobile();
  const [refreshing, setRefreshing] = useState(false);

  // Dynamic item height based on device
  const itemHeight = useMemo(() => {
    return isMobile ? 320 : 280;
  }, [isMobile]);

  // Container height
  const containerHeight = useMemo(() => {
    return isMobile ? window.innerHeight - 200 : 600;
  }, [isMobile]);

  const {
    containerRef,
    scrollerRef,
    virtualItems,
    totalSize,
    loadMore,
    state
  } = useVirtualizedInfiniteScroll(posts, {
    itemHeight,
    containerHeight,
    overscan: isMobile ? 3 : 5,
    threshold: 0.2,
    loadMoreThreshold: 3
  }, onLoadMore);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would trigger a data refresh
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Loading state for when there are no posts
  if (posts.length === 0 && state.isFetchingNextPage) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with refresh and stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <TrendingUp size={16} />
          <span>{posts.length} posts</span>
          {state.isScrolling && (
            <span className="text-neon-blue">• Scrolling</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-gray-400 hover:text-white"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
        </Button>
      </div>

      {/* Virtualized container */}
      <div
        ref={containerRef}
        className="relative overflow-auto"
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
                  duration: 0.3,
                  delay: Math.min(index * 0.05, 0.3)
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
                  <PostItem
                    post={item}
                    isLiked={likedPosts.includes(item.id)}
                    onLike={onLike}
                    onShare={onShare}
                    onAddComment={onAddComment}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator at the bottom */}
          {state.isFetchingNextPage && (
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
              <div className="flex items-center gap-2 text-gray-400">
                <LoadingSpinner />
                <span>Loading more posts...</span>
              </div>
            </motion.div>
          )}

          {/* No more items indicator */}
          {!state.hasNextPage && posts.length > 0 && (
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
              className="flex items-center justify-center text-gray-500 text-sm"
            >
              <div className="text-center">
                <div className="w-12 h-px bg-gray-600 mx-auto mb-2"></div>
                You've reached the end
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Performance indicator for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 p-2 bg-dark-lighter rounded">
          Rendering {state.visibleItems} of {posts.length} items 
          (indexes {state.startIndex}-{state.endIndex})
        </div>
      )}
    </div>
  );
};

export default VirtualizedPostFeed;