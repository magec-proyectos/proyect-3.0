
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FeedbackState {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
  visible: boolean;
  duration?: number;
}

interface VisualFeedbackProps {
  children: React.ReactNode;
  className?: string;
  feedbackPosition?: 'top' | 'bottom' | 'center';
  onFeedbackChange?: (state: FeedbackState) => void;
}

const feedbackIcons = {
  success: Check,
  error: X,
  warning: AlertCircle,
  info: Info,
  loading: Loader2
};

const feedbackColors = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-blue-500 text-white',
  loading: 'bg-gray-500 text-white'
};

export const VisualFeedback: React.FC<VisualFeedbackProps> = ({
  children,
  className,
  feedbackPosition = 'top',
  onFeedbackChange
}) => {
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: 'info',
    message: '',
    visible: false
  });
  const prefersReducedMotion = useReducedMotion();

  const showFeedback = (
    type: FeedbackState['type'],
    message: string,
    duration: number = 3000
  ) => {
    const newState: FeedbackState = {
      type,
      message,
      visible: true,
      duration
    };
    
    setFeedback(newState);
    onFeedbackChange?.(newState);

    if (duration > 0) {
      setTimeout(() => {
        setFeedback(prev => ({ ...prev, visible: false }));
      }, duration);
    }
  };

  const hideFeedback = () => {
    setFeedback(prev => ({ ...prev, visible: false }));
  };

  const positionClasses = {
    top: 'top-4 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const Icon = feedbackIcons[feedback.type];
  const isLoading = feedback.type === 'loading';

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: feedbackPosition === 'bottom' ? 20 : -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: feedbackPosition === 'bottom' ? 20 : -20, scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };

  return (
    <div className={cn("relative", className)}>
      {React.cloneElement(children as React.ReactElement, {
        showFeedback,
        hideFeedback,
        feedbackState: feedback
      })}
      
      <AnimatePresence>
        {feedback.visible && (
          <motion.div
            {...animationProps}
            className={cn(
              "fixed z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border",
              feedbackColors[feedback.type],
              positionClasses[feedbackPosition]
            )}
          >
            <Icon 
              className={cn(
                "w-5 h-5",
                isLoading && "animate-spin"
              )} 
            />
            <span className="font-medium">{feedback.message}</span>
            {!isLoading && (
              <button
                onClick={hideFeedback}
                className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hook for easier feedback management
export const useVisualFeedback = () => {
  const [feedbackRef, setFeedbackRef] = useState<{
    showFeedback: (type: FeedbackState['type'], message: string, duration?: number) => void;
    hideFeedback: () => void;
  } | null>(null);

  const showSuccess = (message: string, duration?: number) => {
    feedbackRef?.showFeedback('success', message, duration);
  };

  const showError = (message: string, duration?: number) => {
    feedbackRef?.showFeedback('error', message, duration);
  };

  const showWarning = (message: string, duration?: number) => {
    feedbackRef?.showFeedback('warning', message, duration);
  };

  const showInfo = (message: string, duration?: number) => {
    feedbackRef?.showFeedback('info', message, duration);
  };

  const showLoading = (message: string) => {
    feedbackRef?.showFeedback('loading', message, 0);
  };

  const hide = () => {
    feedbackRef?.hideFeedback();
  };

  return {
    setFeedbackRef,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    hide
  };
};

export default VisualFeedback;
