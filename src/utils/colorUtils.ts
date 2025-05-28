
// Enhanced color utility functions with improved contrast and accessibility

export type SportType = 'football' | 'basketball' | 'americanFootball' | 'baseball' | 'tennis';

export type ColorVariant = 'primary' | 'secondary' | 'light' | 'dark' | 'accent';

export type StateType = 'success' | 'warning' | 'error' | 'info';

// Enhanced sport color mappings with WCAG AA compliance
export const sportColors = {
  football: {
    primary: '#0B82F0', // Improved contrast - WCAG AA compliant
    secondary: '#0066CC',
    light: '#F0F8FF',
    dark: '#003D73',
    accent: '#0891B2',
  },
  basketball: {
    primary: '#E97316', // Enhanced orange with better contrast
    secondary: '#C2590C',
    light: '#FFF7ED',
    dark: '#9A3412',
    accent: '#15803D', // High contrast green
  },
  americanFootball: {
    primary: '#8B5CF6', // Improved purple with better accessibility
    secondary: '#7C3AED',
    light: '#F3F4F6',
    dark: '#581C87',
    accent: '#DC2626',
  },
  baseball: {
    primary: '#16A34A', // WCAG AA compliant green
    secondary: '#15803D',
    light: '#F0FDF4',
    dark: '#14532D',
    accent: '#F59E0B',
  },
  tennis: {
    primary: '#059669', // Enhanced emerald with better contrast
    secondary: '#047857',
    light: '#ECFEF3',
    dark: '#064E3B',
    accent: '#EAB308',
  },
} as const;

// Enhanced state color mappings with improved accessibility
export const stateColors = {
  success: '#16A34A', // WCAG AA compliant
  warning: '#D97706', // Better contrast than previous yellow
  error: '#DC2626', // High contrast red
  info: '#0B82F0', // Improved blue for accessibility
} as const;

// Enhanced contrast ratios for accessibility
export const contrastRatios = {
  text: {
    normal: 4.5, // WCAG AA normal text
    large: 3, // WCAG AA large text
    enhanced: 7, // WCAG AAA
  },
  ui: {
    graphical: 3, // WCAG AA for UI components
    nonText: 3, // WCAG AA for non-text elements
  }
} as const;

// Get sport color by type and variant
export const getSportColor = (sport: SportType, variant: ColorVariant = 'primary'): string => {
  return sportColors[sport]?.[variant] || sportColors.football.primary;
};

// Get state color
export const getStateColor = (state: StateType): string => {
  return stateColors[state];
};

// Enhanced Tailwind classes with improved accessibility
export const getSportClasses = (sport: SportType) => {
  const colorMap = {
    football: {
      bg: 'bg-blue-600', // Enhanced contrast
      bgSecondary: 'bg-blue-700',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900',
      text: 'text-blue-600',
      textSecondary: 'text-blue-700',
      textContrast: 'text-white', // High contrast text
      border: 'border-blue-600',
      borderSecondary: 'border-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2',
      gradient: 'from-blue-600 to-blue-700',
      glow: 'shadow-blue-500/20',
    },
    basketball: {
      bg: 'bg-orange-600', // Improved contrast
      bgSecondary: 'bg-orange-700',
      bgLight: 'bg-orange-50',
      bgDark: 'bg-orange-900',
      text: 'text-orange-600',
      textSecondary: 'text-orange-700',
      textContrast: 'text-white',
      border: 'border-orange-600',
      borderSecondary: 'border-orange-700',
      button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-2',
      gradient: 'from-orange-600 to-orange-700',
      glow: 'shadow-orange-500/20',
    },
    americanFootball: {
      bg: 'bg-purple-600', // Enhanced accessibility
      bgSecondary: 'bg-purple-700',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-900',
      text: 'text-purple-600',
      textSecondary: 'text-purple-700',
      textContrast: 'text-white',
      border: 'border-purple-600',
      borderSecondary: 'border-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-2',
      gradient: 'from-purple-600 to-purple-700',
      glow: 'shadow-purple-500/20',
    },
    baseball: {
      bg: 'bg-green-600', // WCAG AA compliant
      bgSecondary: 'bg-green-700',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900',
      text: 'text-green-600',
      textSecondary: 'text-green-700',
      textContrast: 'text-white',
      border: 'border-green-600',
      borderSecondary: 'border-green-700',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-2',
      gradient: 'from-green-600 to-green-700',
      glow: 'shadow-green-500/20',
    },
    tennis: {
      bg: 'bg-emerald-600', // Improved contrast
      bgSecondary: 'bg-emerald-700',
      bgLight: 'bg-emerald-50',
      bgDark: 'bg-emerald-900',
      text: 'text-emerald-600',
      textSecondary: 'text-emerald-700',
      textContrast: 'text-white',
      border: 'border-emerald-600',
      borderSecondary: 'border-emerald-700',
      button: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 focus:ring-offset-2',
      gradient: 'from-emerald-600 to-emerald-700',
      glow: 'shadow-emerald-500/20',
    },
  };
  
  return colorMap[sport] || colorMap.football;
};

// Enhanced state classes with improved accessibility
export const getStateClasses = (state: StateType) => {
  const stateMap = {
    success: {
      bg: 'bg-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900',
      text: 'text-green-600',
      textContrast: 'text-white',
      border: 'border-green-600',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-2',
      gradient: 'from-green-600 to-green-700',
    },
    warning: {
      bg: 'bg-amber-600',
      bgLight: 'bg-amber-50',
      bgDark: 'bg-amber-900',
      text: 'text-amber-600',
      textContrast: 'text-white',
      border: 'border-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-2',
      gradient: 'from-amber-600 to-amber-700',
    },
    error: {
      bg: 'bg-red-600',
      bgLight: 'bg-red-50',
      bgDark: 'bg-red-900',
      text: 'text-red-600',
      textContrast: 'text-white',
      border: 'border-red-600',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-2',
      gradient: 'from-red-600 to-red-700',
    },
    info: {
      bg: 'bg-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900',
      text: 'text-blue-600',
      textContrast: 'text-white',
      border: 'border-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2',
      gradient: 'from-blue-600 to-blue-700',
    },
  };
  
  return stateMap[state];
};

// Enhanced contrast calculation with WCAG standards
export const getContrastTextColor = (backgroundColor: string): 'text-white' | 'text-black' => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // WCAG luminance calculation
  const luminance = (0.299 * Math.pow(r/255, 2.2) + 0.587 * Math.pow(g/255, 2.2) + 0.114 * Math.pow(b/255, 2.2));
  
  // Return high contrast text color
  return luminance > 0.179 ? 'text-black' : 'text-white';
};

// Accessibility-focused interaction classes
export const getInteractiveClasses = (variant: 'subtle' | 'moderate' | 'strong' = 'moderate') => {
  const variants = {
    subtle: 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    moderate: 'hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    strong: 'hover:scale-110 active:scale-90 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
  };
  
  return variants[variant];
};

// Enhanced glow effect with accessibility considerations
export const getGlowEffect = (color: string, intensity: 'low' | 'medium' | 'high' = 'medium') => {
  const intensityMap = {
    low: '0 0 8px',
    medium: '0 0 16px',
    high: '0 0 24px',
  };
  
  return `${intensityMap[intensity]} ${color}30`; // Reduced opacity for accessibility
};

// New utility for focus ring colors
export const getFocusRingClasses = (sport: SportType) => {
  const focusMap = {
    football: 'focus:ring-blue-500',
    basketball: 'focus:ring-orange-500',
    americanFootball: 'focus:ring-purple-500',
    baseball: 'focus:ring-green-500',
    tennis: 'focus:ring-emerald-500',
  };
  
  return `${focusMap[sport]} focus:ring-offset-2 focus:outline-none`;
};

export default {
  getSportColor,
  getStateColor,
  getSportClasses,
  getStateClasses,
  getContrastTextColor,
  getInteractiveClasses,
  getGlowEffect,
  getFocusRingClasses,
  contrastRatios,
};
