
// Enhanced color utility functions with modern design system

export type SportType = 'football' | 'basketball' | 'americanFootball' | 'baseball' | 'tennis';

export type ColorVariant = 'primary' | 'secondary' | 'light' | 'dark' | 'accent';

export type StateType = 'success' | 'warning' | 'error' | 'info';

// Modern sport color mappings with enhanced accessibility
export const sportColors = {
  football: {
    primary: '#2196F3',
    secondary: '#1976D2',
    light: '#E3F2FD',
    dark: '#0D47A1',
    accent: '#03DAC6',
  },
  basketball: {
    primary: '#FF9800',
    secondary: '#F57C00',
    light: '#FFF3E0',
    dark: '#E65100',
    accent: '#4CAF50',
  },
  americanFootball: {
    primary: '#9C27B0',
    secondary: '#7B1FA2',
    light: '#F3E5F5',
    dark: '#4A148C',
    accent: '#E91E63',
  },
  baseball: {
    primary: '#4CAF50',
    secondary: '#388E3C',
    light: '#E8F5E8',
    dark: '#1B5E20',
    accent: '#FFC107',
  },
  tennis: {
    primary: '#009688',
    secondary: '#00695C',
    light: '#E0F2F1',
    dark: '#004D40',
    accent: '#CDDC39',
  },
} as const;

// Enhanced state color mappings
export const stateColors = {
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
} as const;

// Get sport color by type and variant
export const getSportColor = (sport: SportType, variant: ColorVariant = 'primary'): string => {
  return sportColors[sport]?.[variant] || sportColors.football.primary;
};

// Get state color
export const getStateColor = (state: StateType): string => {
  return stateColors[state];
};

// Enhanced Tailwind classes for sport colors with better design system
export const getSportClasses = (sport: SportType) => {
  const colorMap = {
    football: {
      bg: 'bg-blue-500',
      bgSecondary: 'bg-blue-600',
      bgLight: 'bg-blue-100',
      bgDark: 'bg-blue-900',
      text: 'text-blue-500',
      textSecondary: 'text-blue-600',
      border: 'border-blue-500',
      borderSecondary: 'border-blue-600',
      button: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      glow: 'shadow-glow-blue',
    },
    basketball: {
      bg: 'bg-orange-500',
      bgSecondary: 'bg-orange-600',
      bgLight: 'bg-orange-100',
      bgDark: 'bg-orange-900',
      text: 'text-orange-500',
      textSecondary: 'text-orange-600',
      border: 'border-orange-500',
      borderSecondary: 'border-orange-600',
      button: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      glow: 'shadow-glow-orange',
    },
    americanFootball: {
      bg: 'bg-purple-500',
      bgSecondary: 'bg-purple-600',
      bgLight: 'bg-purple-100',
      bgDark: 'bg-purple-900',
      text: 'text-purple-500',
      textSecondary: 'text-purple-600',
      border: 'border-purple-500',
      borderSecondary: 'border-purple-600',
      button: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      glow: 'shadow-glow-purple',
    },
    baseball: {
      bg: 'bg-green-500',
      bgSecondary: 'bg-green-600',
      bgLight: 'bg-green-100',
      bgDark: 'bg-green-900',
      text: 'text-green-500',
      textSecondary: 'text-green-600',
      border: 'border-green-500',
      borderSecondary: 'border-green-600',
      button: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
      gradient: 'from-green-500 to-green-600',
      glow: 'shadow-glow-green',
    },
    tennis: {
      bg: 'bg-teal-500',
      bgSecondary: 'bg-teal-600',
      bgLight: 'bg-teal-100',
      bgDark: 'bg-teal-900',
      text: 'text-teal-500',
      textSecondary: 'text-teal-600',
      border: 'border-teal-500',
      borderSecondary: 'border-teal-600',
      button: 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-500',
      gradient: 'from-teal-500 to-teal-600',
      glow: 'shadow-glow-green',
    },
  };
  
  return colorMap[sport] || colorMap.football;
};

// Enhanced state classes
export const getStateClasses = (state: StateType) => {
  return {
    bg: `bg-${state}-500`,
    bgLight: `bg-${state}-100`,
    bgDark: `bg-${state}-900`,
    text: `text-${state}-500`,
    border: `border-${state}-500`,
    button: `bg-${state}-500 hover:bg-${state}-600 focus:ring-${state}-500`,
    gradient: `from-${state}-500 to-${state}-600`,
  };
};

// Helper to get contrast text color with better algorithm
export const getContrastTextColor = (backgroundColor: string): 'text-white' | 'text-black' => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Using WCAG formula for better contrast calculation
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'text-black' : 'text-white';
};

// New utility functions for enhanced design system
export const getInteractiveClasses = (variant: 'subtle' | 'moderate' | 'strong' = 'moderate') => {
  const variants = {
    subtle: 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200',
    moderate: 'hover:scale-105 active:scale-95 transition-all duration-300',
    strong: 'hover:scale-110 active:scale-90 transition-all duration-300 hover:shadow-lg',
  };
  
  return variants[variant];
};

export const getGlowEffect = (color: string, intensity: 'low' | 'medium' | 'high' = 'medium') => {
  const intensityMap = {
    low: '0 0 10px',
    medium: '0 0 20px',
    high: '0 0 30px',
  };
  
  return `${intensityMap[intensity]} ${color}40`;
};

export default {
  getSportColor,
  getStateColor,
  getSportClasses,
  getStateClasses,
  getContrastTextColor,
  getInteractiveClasses,
  getGlowEffect,
};
