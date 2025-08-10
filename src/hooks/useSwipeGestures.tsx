import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  className?: string;
}

export const SwipeableContainer: React.FC<SwipeableProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  className
}) => {
  const [startTouch, setStartTouch] = useState<{ x: number; y: number } | null>(null);
  const [currentTouch, setCurrentTouch] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startTouch) return;
    const touch = e.touches[0];
    setCurrentTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!startTouch || !currentTouch) {
      setStartTouch(null);
      setCurrentTouch(null);
      return;
    }

    const deltaX = currentTouch.x - startTouch.x;
    const deltaY = currentTouch.y - startTouch.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (absDeltaX > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    } else {
      // Vertical swipe
      if (absDeltaY > threshold) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    setStartTouch(null);
    setCurrentTouch(null);
  };

  return (
    <div
      ref={containerRef}
      className={cn("touch-pan-y", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

// Hook for handling swipe gestures
export const useSwipeGestures = (
  elementRef: React.RefObject<HTMLElement>,
  callbacks: {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
  },
  threshold = 50
) => {
  const [startTouch, setStartTouch] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setStartTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startTouch) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startTouch.x;
      const deltaY = touch.clientY - startTouch.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (absDeltaX > threshold) {
          if (deltaX > 0 && callbacks.onSwipeRight) {
            callbacks.onSwipeRight();
          } else if (deltaX < 0 && callbacks.onSwipeLeft) {
            callbacks.onSwipeLeft();
          }
        }
      } else {
        // Vertical swipe
        if (absDeltaY > threshold) {
          if (deltaY > 0 && callbacks.onSwipeDown) {
            callbacks.onSwipeDown();
          } else if (deltaY < 0 && callbacks.onSwipeUp) {
            callbacks.onSwipeUp();
          }
        }
      }

      setStartTouch(null);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, callbacks, threshold, startTouch]);
};