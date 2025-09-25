import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  reduceMotion: boolean;
  focusVisible: boolean;
}

const AccessibilityContext = createContext<{
  announceToScreenReader: (message: string) => void;
  setFocus: (elementId: string) => void;
  announcePageChange: (pageName: string) => void;
  reducedMotion: boolean;
  highContrast: boolean;
  toggleHighContrast: () => void;
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: any) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetSettings: () => void;
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
  
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'medium',
    reduceMotion: false,
    focusVisible: true,
  });
  
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
      setSettings(prevSettings => ({ ...prevSettings, highContrast: newValue }));
      document.documentElement.classList.toggle('high-contrast', newValue);
      localStorage.setItem('high-contrast', newValue.toString());
      announceToScreenReader(`High contrast ${newValue ? 'enabled' : 'disabled'}`);
      return newValue;
    });
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
      announceToScreenReader(`${key} updated`);
      
      // Apply font size to document
      if (key === 'fontSize') {
        document.documentElement.setAttribute('data-font-size', value);
      }
      
      // Apply motion preference
      if (key === 'reduceMotion') {
        document.documentElement.classList.toggle('reduce-motion', value);
      }
      
      return newSettings;
    });
  };

  const fontSizes: AccessibilitySettings['fontSize'][] = ['small', 'medium', 'large', 'extra-large'];

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(settings.fontSize);
    if (currentIndex < fontSizes.length - 1) {
      updateSetting('fontSize', fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(settings.fontSize);
    if (currentIndex > 0) {
      updateSetting('fontSize', fontSizes[currentIndex - 1]);
    }
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      highContrast: false,
      fontSize: 'medium',
      reduceMotion: false,
      focusVisible: true,
    };
    setSettings(defaultSettings);
    setHighContrast(false);
    document.documentElement.classList.remove('high-contrast', 'reduce-motion');
    document.documentElement.setAttribute('data-font-size', 'medium');
    localStorage.removeItem('accessibility-settings');
    localStorage.removeItem('high-contrast');
    announceToScreenReader('Accessibility settings reset to default');
  };

  // Load saved settings on mount
  useEffect(() => {
    const stored = localStorage.getItem('high-contrast');
    if (stored === 'true') {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }

    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        document.documentElement.setAttribute('data-font-size', parsed.fontSize);
        if (parsed.reduceMotion) {
          document.documentElement.classList.add('reduce-motion');
        }
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }
  }, []);

  const value = {
    announceToScreenReader,
    setFocus,
    announcePageChange,
    reducedMotion,
    highContrast,
    toggleHighContrast,
    settings,
    updateSetting,
    increaseFontSize,
    decreaseFontSize,
    resetSettings,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};