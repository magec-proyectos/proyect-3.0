import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  reduceMotion: boolean;
  focusVisible: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'medium',
  reduceMotion: false,
  focusVisible: true,
  screenReader: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize settings from localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    if (!isInitialized) return;
    
    const root = document.documentElement;
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size
    root.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large');
    root.classList.add(`font-${settings.fontSize}`);

    // Reduced motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }

    // Save to localStorage
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error);
    }
  }, [settings, isInitialized]);

  // Check for system preferences after initialization
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setSettings(prev => ({ ...prev, reduceMotion: true }));
      }

      const contrastQuery = window.matchMedia('(prefers-contrast: high)');
      if (contrastQuery.matches) {
        setSettings(prev => ({ ...prev, highContrast: true }));
      }
    } catch (error) {
      console.warn('Failed to check system preferences:', error);
    }
  }, [isInitialized]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const fontSizes: AccessibilitySettings['fontSize'][] = ['small', 'medium', 'large', 'extra-large'];

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(settings.fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setSettings(prev => ({ ...prev, fontSize: fontSizes[currentIndex + 1] }));
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(settings.fontSize);
    if (currentIndex > 0) {
      setSettings(prev => ({ ...prev, fontSize: fontSizes[currentIndex - 1] }));
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSetting,
    toggleHighContrast,
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