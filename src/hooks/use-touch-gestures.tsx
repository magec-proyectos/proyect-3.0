
import { useState, useEffect, useRef, useCallback } from 'react';

interface TouchPosition {
  x: number;
  y: number;
}

interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
}

interface TouchGestureOptions {
  threshold?: number;
  velocityThreshold?: number;
  onSwipe?: (direction: SwipeDirection) => void;
  onTap?: () => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
}

export const useTouchGestures = (options: TouchGestureOptions = {}) => {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    onSwipe,
    onTap,
    onLongPress,
    onPinch
  } = options;

  const [isPressed, setIsPressed] = useState(false);
  const [startPos, setStartPos] = useState<TouchPosition>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<TouchPosition>({ x: 0, y: 0 });
  const [startTime, setStartTime] = useState(0);
  const [initialDistance, setInitialDistance] = useState(0);
  
  const longPressTimer = useRef<NodeJS.Timeout>();
  const elementRef = useRef<HTMLElement>(null);

  const calculateDistance = useCallback((touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const now = Date.now();
    
    setIsPressed(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setCurrentPos({ x: touch.clientX, y: touch.clientY });
    setStartTime(now);

    // Handle pinch gesture
    if (e.touches.length === 2) {
      const distance = calculateDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
    }

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      if (onLongPress) {
        onLongPress();
      }
    }, 500);
  }, [onLongPress, calculateDistance]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPressed) return;

    const touch = e.touches[0];
    setCurrentPos({ x: touch.clientX, y: touch.clientY });

    // Handle pinch gesture
    if (e.touches.length === 2 && onPinch) {
      const distance = calculateDistance(e.touches[0], e.touches[1]);
      const scale = distance / initialDistance;
      onPinch(scale);
    }

    // Clear long press timer on move
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }, [isPressed, onPinch, calculateDistance, initialDistance]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isPressed) return;

    const endTime = Date.now();
    const deltaX = currentPos.x - startPos.x;
    const deltaY = currentPos.y - startPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = endTime - startTime;
    const velocity = distance / duration;

    setIsPressed(false);

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    // Handle tap
    if (distance < 10 && duration < 300 && onTap) {
      onTap();
      return;
    }

    // Handle swipe
    if (distance > threshold && velocity > velocityThreshold && onSwipe) {
      let direction: 'left' | 'right' | 'up' | 'down';
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      onSwipe({ direction, distance, velocity });
    }
  }, [isPressed, currentPos, startPos, startTime, threshold, velocityThreshold, onSwipe, onTap]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    elementRef,
    isPressed,
    currentPos,
    startPos
  };
};
