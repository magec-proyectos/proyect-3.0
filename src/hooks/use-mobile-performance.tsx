import { useState, useEffect, useCallback, useRef } from 'react';
import { useIsMobile } from './use-mobile';

interface MobilePerformanceOptions {
  lazyLoadOffset?: number;
  batchSize?: number;
  throttleMs?: number;
  enableVirtualization?: boolean;
}

export const useMobilePerformance = (options: MobilePerformanceOptions = {}) => {
  const {
    lazyLoadOffset = 300,
    batchSize = 10,
    throttleMs = 100,
    enableVirtualization = true
  } = options;

  const isMobile = useIsMobile();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [loadedBatches, setLoadedBatches] = useState(1);
  const observerRef = useRef<IntersectionObserver>();
  const throttleRef = useRef<NodeJS.Timeout>();

  // Intersection Observer for lazy loading
  const setupIntersectionObserver = useCallback(() => {
    if (!isMobile || !enableVirtualization) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleIndexes: number[] = [];
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            visibleIndexes.push(index);
          }
        });

        setVisibleItems(prev => {
          const newVisible = [...new Set([...prev, ...visibleIndexes])];
          return newVisible;
        });
      },
      {
        rootMargin: `${lazyLoadOffset}px`,
        threshold: 0.1
      }
    );
  }, [isMobile, enableVirtualization, lazyLoadOffset]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (!isMobile || throttleRef.current) return;

    throttleRef.current = setTimeout(() => {
      // Check if we need to load more content
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition > documentHeight * 0.8) {
        setLoadedBatches(prev => prev + 1);
      }
      
      throttleRef.current = undefined;
    }, throttleMs);
  }, [isMobile, throttleMs]);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (!isMobile) return;
    
    // Reset visibility calculations on resize
    setVisibleItems([]);
    setupIntersectionObserver();
  }, [isMobile, setupIntersectionObserver]);

  // Memory optimization - cleanup non-visible items
  const optimizeMemory = useCallback(() => {
    if (!isMobile) return;

    // Keep only visible items and a small buffer
    const bufferSize = batchSize;
    const minVisible = Math.min(...visibleItems);
    const maxVisible = Math.max(...visibleItems);
    
    const optimizedVisible = visibleItems.filter(
      index => index >= minVisible - bufferSize && index <= maxVisible + bufferSize
    );
    
    setVisibleItems(optimizedVisible);
  }, [isMobile, visibleItems, batchSize]);

  // Performance monitoring
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    scrollFPS: 0
  });

  const measurePerformance = useCallback(() => {
    if (!isMobile) return;

    const startTime = performance.now();
    
    // Measure render time
    requestAnimationFrame(() => {
      const renderTime = performance.now() - startTime;
      
      setPerformanceMetrics(prev => ({
        ...prev,
        renderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
      }));
    });
  }, [isMobile]);

  useEffect(() => {
    setupIntersectionObserver();
    
    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      
      // Cleanup memory periodically
      const memoryCleanup = setInterval(optimizeMemory, 10000);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        clearInterval(memoryCleanup);
        
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        
        if (throttleRef.current) {
          clearTimeout(throttleRef.current);
        }
      };
    }
  }, [isMobile, handleScroll, handleResize, optimizeMemory, setupIntersectionObserver]);

  // Observer element helper
  const observeElement = useCallback((element: HTMLElement, index: number) => {
    if (observerRef.current && element) {
      element.setAttribute('data-index', index.toString());
      observerRef.current.observe(element);
    }
  }, []);

  // Virtual list helpers
  const getItemsToRender = useCallback((totalItems: number) => {
    if (!isMobile || !enableVirtualization) {
      return Array.from({ length: Math.min(totalItems, loadedBatches * batchSize) }, (_, i) => i);
    }
    
    const itemsToLoad = loadedBatches * batchSize;
    return visibleItems.filter(index => index < Math.min(totalItems, itemsToLoad));
  }, [isMobile, enableVirtualization, visibleItems, loadedBatches, batchSize]);

  return {
    visibleItems,
    loadedBatches,
    observeElement,
    getItemsToRender,
    measurePerformance,
    performanceMetrics,
    isMobile,
    shouldOptimize: isMobile && enableVirtualization
  };
};
