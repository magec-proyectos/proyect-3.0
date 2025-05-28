
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

interface LazyLoadingState {
  isVisible: boolean;
  hasLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    enabled = true
  } = options;

  const [state, setState] = useState<LazyLoadingState>({
    isVisible: false,
    hasLoaded: false,
    isLoading: false,
    error: null
  });

  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && !state.hasLoaded) {
      setState(prev => ({
        ...prev,
        isVisible: true,
        isLoading: true
      }));
    }
  }, [state.hasLoaded]);

  const markAsLoaded = useCallback((error?: Error) => {
    setState(prev => ({
      ...prev,
      hasLoaded: true,
      isLoading: false,
      error: error || null
    }));
  }, []);

  const retry = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      isLoading: true,
      hasLoaded: false
    }));
  }, []);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, threshold, rootMargin, handleIntersection]);

  return {
    elementRef,
    ...state,
    markAsLoaded,
    retry
  };
};

export default useLazyLoading;
