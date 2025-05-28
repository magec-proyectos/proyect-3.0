
// Enhanced color utility functions with modern design system

export type SportType = 'football' | 'basketball' | 'americanFootball' | 'baseball' | 'tennis';

export type ColorVariant = 'primary' | 'secondary' | 'light' | 'dark' | 'accent';

export type StateType = 'success' | 'warning' | 'error' | 'info';

// Modern sport color mappings with enhanced accessibility and better colors
export const sportColors = {
  football: {
    primary: '#0EA5E9', // Better blue - more vibrant and modern
    secondary: '#0284C7',
    light: '#F0F9FF',
    dark: '#0C4A6E',
    accent: '#06B6D4',
  },
  basketball: {
    primary: '#FF9800',
    secondary: '#F57C00',
    light: '#FFF3E0',
    dark: '#E65100',
    accent: '#22C55E', // Better green
  },
  americanFootball: {
    primary: '#9C27B0',
    secondary: '#7B1FA2',
    light: '#F3E5F5',
    dark: '#4A148C',
    accent: '#E91E63',
  },
  baseball: {
    primary: '#22C55E', // Better green - more vibrant
    secondary: '#16A34A',
    light: '#ECFEF3',
    dark: '#14532D',
    accent: '#FFC107',
  },
  tennis: {
    primary: '#059669',
    secondary: '#047857',
    light: '#ECFEF3',
    dark: '#064E3B',
    accent: '#CDDC39',
  },
} as const;

// Enhanced state color mappings with better colors
export const stateColors = {
  success: '#22C55E', // Better green
  warning: '#FFC107',
  error: '#F44336',
  info: '#0EA5E9', // Better blue
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
      bg: 'bg-sky-500', // Better blue class
      bgSecondary: 'bg-sky-600',
      bgLight: 'bg-sky-50',
      bgDark: 'bg-sky-900',
      text: 'text-sky-500',
      textSecondary: 'text-sky-600',
      border: 'border-sky-500',
      borderSecondary: 'border-sky-600',
      button: 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-500',
      gradient: 'from-sky-500 to-sky-600',
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
      bg: 'bg-green-500', // Better green class
      bgSecondary: 'bg-green-600',
      bgLight: 'bg-green-50',
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
      bg: 'bg-emerald-500',
      bgSecondary: 'bg-emerald-600',
      bgLight: 'bg-emerald-50',
      bgDark: 'bg-emerald-900',
      text: 'text-emerald-500',
      textSecondary: 'text-emerald-600',
      border: 'border-emerald-500',
      borderSecondary: 'border-emerald-600',
      button: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600',
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
