
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface PremiumInteractionOptions {
  hapticFeedback?: boolean;
  soundFeedback?: boolean;
  visualFeedback?: boolean;
}

export const usePremiumInteractions = (options: PremiumInteractionOptions = {}) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const triggerHaptic = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!options.hapticFeedback) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50]
      };
      navigator.vibrate(patterns[intensity]);
    }
  }, [options.hapticFeedback]);

  const triggerSound = useCallback((type: 'click' | 'success' | 'error' = 'click') => {
    if (!options.soundFeedback) return;
    
    // Crear contexto de audio para efectos de sonido
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies = {
        click: 800,
        success: 1200,
        error: 300
      };
      
      oscillator.frequency.value = frequencies[type];
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.warn('Audio feedback not supported:', error);
    }
  }, [options.soundFeedback]);

  const createRippleEffect = useCallback((event: React.MouseEvent) => {
    if (!options.visualFeedback) return null;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    return (
      <motion.span
        className="absolute rounded-full bg-white/30 pointer-events-none"
        style={{
          width: size,
          height: size,
          left: x,
          top: y,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    );
  }, [options.visualFeedback]);

  const handleInteraction = useCallback((
    event: React.MouseEvent,
    type: 'click' | 'success' | 'error' = 'click'
  ) => {
    setIsInteracting(true);
    setInteractionCount(prev => prev + 1);
    
    triggerHaptic(type === 'error' ? 'heavy' : type === 'success' ? 'medium' : 'light');
    triggerSound(type);
    
    setTimeout(() => setIsInteracting(false), 200);
    
    return createRippleEffect(event);
  }, [triggerHaptic, triggerSound, createRippleEffect]);

  const getMotionProps = useCallback((variant: 'button' | 'card' | 'icon' = 'button') => {
    const variants = {
      button: {
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95, y: 0 },
        transition: { type: "spring", stiffness: 400, damping: 25 }
      },
      card: {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 300, damping: 30 }
      },
      icon: {
        whileHover: { scale: 1.2, rotate: 5 },
        whileTap: { scale: 0.9, rotate: -5 },
        transition: { type: "spring", stiffness: 500, damping: 25 }
      }
    };
    
    return variants[variant];
  }, []);

  const createFloatingAnimation = useCallback((delay: number = 0) => ({
    animate: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    }
  }), []);

  const createStaggeredAnimation = useCallback((itemCount: number) => ({
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }
    }
  }), []);

  return {
    isInteracting,
    interactionCount,
    handleInteraction,
    getMotionProps,
    createFloatingAnimation,
    createStaggeredAnimation,
    triggerHaptic,
    triggerSound,
    createRippleEffect
  };
};

export default usePremiumInteractions;
