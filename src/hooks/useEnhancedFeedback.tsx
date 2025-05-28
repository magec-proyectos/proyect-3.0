
import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export interface FeedbackOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
  showConfetti?: boolean;
  haptic?: boolean;
}

export interface FeedbackState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  position: 'top' | 'bottom' | 'center';
}

export const useEnhancedFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackState>({
    isVisible: false,
    message: '',
    type: 'info',
    position: 'top'
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  const showFeedback = useCallback((message: string, options: FeedbackOptions = {}) => {
    const {
      type = 'info',
      duration = 3000,
      position = 'top',
      showConfetti = false,
      haptic = false
    } = options;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Haptic feedback for mobile devices
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(type === 'success' ? [100, 50, 100] : [200]);
    }

    // Show confetti for success messages
    if (showConfetti && type === 'success') {
      // Trigger confetti animation
      console.log('🎉 Confetti animation triggered');
    }

    setFeedback({
      isVisible: true,
      message,
      type,
      position
    });

    // Auto-hide after duration
    timeoutRef.current = setTimeout(() => {
      setFeedback(prev => ({ ...prev, isVisible: false }));
    }, duration);
  }, []);

  const hideFeedback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setFeedback(prev => ({ ...prev, isVisible: false }));
  }, []);

  const showSuccess = useCallback((message: string, options?: Omit<FeedbackOptions, 'type'>) => {
    showFeedback(message, { ...options, type: 'success', showConfetti: true });
  }, [showFeedback]);

  const showError = useCallback((message: string, options?: Omit<FeedbackOptions, 'type'>) => {
    showFeedback(message, { ...options, type: 'error', haptic: true });
  }, [showFeedback]);

  const showWarning = useCallback((message: string, options?: Omit<FeedbackOptions, 'type'>) => {
    showFeedback(message, { ...options, type: 'warning' });
  }, [showFeedback]);

  const showInfo = useCallback((message: string, options?: Omit<FeedbackOptions, 'type'>) => {
    showFeedback(message, { ...options, type: 'info' });
  }, [showFeedback]);

  return {
    feedback,
    showFeedback,
    hideFeedback,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export default useEnhancedFeedback;
