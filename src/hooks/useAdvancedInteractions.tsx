
import { useState, useCallback, useRef } from 'react';

// Hook for managing loading states with feedback
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (asyncFunction: () => Promise<any>) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const result = await asyncFunction();
      setIsSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => setIsSuccess(false), 2000);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Reset error state after 5 seconds
      setTimeout(() => setError(null), 5000);
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    isLoading,
    isSuccess,
    error,
    execute,
    reset
  };
};

// Hook for managing visual feedback triggers
export const useVisualFeedback = () => {
  const [feedbackState, setFeedbackState] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    active: boolean;
  }>({ type: 'success', active: false });

  const triggerFeedback = useCallback((type: 'success' | 'error' | 'warning' | 'info', duration = 1000) => {
    setFeedbackState({ type, active: true });
    
    setTimeout(() => {
      setFeedbackState(prev => ({ ...prev, active: false }));
    }, duration);
  }, []);

  return {
    feedbackType: feedbackState.type,
    feedbackActive: feedbackState.active,
    triggerFeedback
  };
};

// Hook for managing hover states with debouncing
export const useHoverState = (delay = 150) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, delay);
  }, [delay]);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave
  };
};

// Hook for managing state transitions
export const useStateTransition = <T extends string | number>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const [previousState, setPreviousState] = useState<T | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = useCallback((newState: T, duration = 300) => {
    setPreviousState(state);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setState(newState);
      setTimeout(() => {
        setIsTransitioning(false);
      }, duration);
    }, 50);
  }, [state]);

  return {
    state,
    previousState,
    isTransitioning,
    transitionTo,
    setState
  };
};

// Hook for managing toast notifications
export const useToastNotifications = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  const addToast = useCallback((toast: Omit<typeof toasts[0], 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts
  };
};

export default {
  useLoadingState,
  useVisualFeedback,
  useHoverState,
  useStateTransition,
  useToastNotifications
};
