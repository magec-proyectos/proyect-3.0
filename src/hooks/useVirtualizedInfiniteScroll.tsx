import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface VirtualizedScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  threshold?: number;
  loadMoreThreshold?: number;
}

interface VirtualizedScrollState {
  startIndex: number;
  endIndex: number;
  visibleItems: number;
  scrollTop: number;
  isScrolling: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

interface VirtualizedScrollHook<T> {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollerRef: React.RefObject<HTMLDivElement>;
  virtualItems: Array<{
    index: number;
    start: number;
    size: number;
    item: T;
  }>;
  totalSize: number;
  loadMore: () => void;
  state: VirtualizedScrollState;
}

export const useVirtualizedInfiniteScroll = <T,>(
  items: T[],
  options: VirtualizedScrollOptions,
  onLoadMore?: () => Promise<void>
): VirtualizedScrollHook<T> => {
  const {
    itemHeight,
    containerHeight,
    overscan = 5,
    threshold = 0.1,
    loadMoreThreshold = 3
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  // Calculate visible range
  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight)
    );

    const startIdx = Math.max(0, visibleStart - overscan);
    const endIdx = Math.min(items.length - 1, visibleEnd + overscan);
    const visibleCount = endIdx - startIdx + 1;

    return {
      startIndex: startIdx,
      endIndex: endIdx,
      visibleItems: visibleCount
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Create virtual items
  const virtualItems = useMemo(() => {
    const result = [];
    for (let i = startIndex; i <= endIndex; i++) {
      result.push({
        index: i,
        start: i * itemHeight,
        size: itemHeight,
        item: items[i]
      });
    }
    return result;
  }, [startIndex, endIndex, itemHeight, items]);

  // Total size for the scrollable container
  const totalSize = items.length * itemHeight;

  // Handle scroll events
  const handleScroll = useCallback((e: Event) => {
    const element = e.target as HTMLDivElement;
    setScrollTop(element.scrollTop);
    setIsScrolling(true);

    // Clear existing timeout and set new one
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    // Check if we need to load more items
    const { scrollTop: currentScrollTop, scrollHeight, clientHeight } = element;
    const scrollPercentage = (currentScrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercentage > (1 - threshold) && hasNextPage && !isFetchingNextPage) {
      loadMore();
    }
  }, [hasNextPage, isFetchingNextPage, threshold]);

  // Load more function
  const loadMore = useCallback(async () => {
    if (isFetchingNextPage || !hasNextPage || !onLoadMore) return;

    setIsFetchingNextPage(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [isFetchingNextPage, hasNextPage, onLoadMore]);

  // Set up scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  // Update hasNextPage based on items length
  useEffect(() => {
    // This is a simple heuristic - in a real app, this would come from your API
    setHasNextPage(items.length % 10 === 0 && items.length > 0);
  }, [items.length]);

  const state: VirtualizedScrollState = {
    startIndex,
    endIndex,
    visibleItems,
    scrollTop,
    isScrolling,
    hasNextPage,
    isFetchingNextPage
  };

  return {
    containerRef,
    scrollerRef,
    virtualItems,
    totalSize,
    loadMore,
    state
  };
};

export default useVirtualizedInfiniteScroll;