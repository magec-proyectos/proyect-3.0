import React, { createContext, useContext, useEffect } from 'react';

const AccessibilityContext = createContext<{
  announceToScreenReader: (message: string) => void;
  setFocus: (elementId: string) => void;
  announcePageChange: (pageName: string) => void;
  reducedMotion: boolean;
  highContrast: boolean;
  toggleHighContrast: () => void;
} | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  
  // Create a hidden live region for screen reader announcements
  React.useEffect(() => {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);

    return () => {
      const existingRegion = document.getElementById('live-region');
      if (existingRegion) {
        document.body.removeChild(existingRegion);
      }
    };
  }, []);

  // Detect user preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(highContrastQuery.matches);
    
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };
    
    highContrastQuery.addEventListener('change', handleHighContrastChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  const announceToScreenReader = (message: string) => {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  };

  const setFocus = (elementId: string) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.focus();
      }
    }, 100);
  };

  const announcePageChange = (pageName: string) => {
    announceToScreenReader(`Navigated to ${pageName} page`);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev;
      document.documentElement.classList.toggle('high-contrast', newValue);
      localStorage.setItem('high-contrast', newValue.toString());
      announceToScreenReader(`High contrast ${newValue ? 'enabled' : 'disabled'}`);
      return newValue;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem('high-contrast');
    if (stored === 'true') {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const value = {
    announceToScreenReader,
    setFocus,
    announcePageChange,
    reducedMotion,
    highContrast,
    toggleHighContrast
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};