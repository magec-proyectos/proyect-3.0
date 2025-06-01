
// Enhanced color utility functions with solid colors and improved accessibility

export type SportType = 'football' | 'basketball' | 'americanFootball' | 'baseball' | 'tennis';

export type ColorVariant = 'primary' | 'secondary' | 'light' | 'dark' | 'accent';

export type StateType = 'success' | 'warning' | 'error' | 'info';

export type BettingStateType = 'win' | 'loss' | 'pending' | 'void' | 'favorite' | 'underdog';

// Enhanced sport color mappings with solid colors
export const sportColors = {
  football: {
    primary: '#2563eb', // Solid blue
    secondary: '#1d4ed8',
    light: '#eff6ff',
    dark: '#1e3a8a',
    accent: '#06b6d4',
  },
  basketball: {
    primary: '#ea580c', // Solid orange
    secondary: '#dc2626',
    light: '#fff7ed',
    dark: '#9a3412',
    accent: '#22c55e',
  },
  americanFootball: {
    primary: '#9333ea', // Solid purple
    secondary: '#7c2d12',
    light: '#faf5ff',
    dark: '#581c87',
    accent: '#ec4899',
  },
  baseball: {
    primary: '#22c55e', // Solid green
    secondary: '#16a34a',
    light: '#f0fdf4',
    dark: '#14532d',
    accent: '#f59e0b',
  },
  tennis: {
    primary: '#06b6d4', // Solid cyan
    secondary: '#0891b2',
    light: '#ecfeff',
    dark: '#164e63',
    accent: '#eab308',
  },
} as const;

// Enhanced state color mappings
export const stateColors = {
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',
} as const;

// Betting specific colors
export const bettingColors = {
  win: '#22c55e',
  loss: '#ef4444',
  pending: '#f59e0b',
  void: '#6b7280',
  favorite: '#fbbf24',
  underdog: '#8b5cf6',
  even: '#06b6d4',
  odd: '#ec4899'
} as const;

// Get sport color by type and variant
export const getSportColor = (sport: SportType, variant: ColorVariant = 'primary'): string => {
  return sportColors[sport]?.[variant] || sportColors.football.primary;
};

// Get state color
export const getStateColor = (state: StateType): string => {
  return stateColors[state];
};

// Get betting state color
export const getBettingColor = (state: BettingStateType): string => {
  return bettingColors[state];
};

// Enhanced Tailwind classes with solid colors
export const getSportClasses = (sport: SportType) => {
  const colorMap = {
    football: {
      bg: 'bg-blue-600',
      bgSecondary: 'bg-blue-700',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900',
      text: 'text-blue-600',
      textSecondary: 'text-blue-700',
      textContrast: 'text-white',
      border: 'border-blue-600',
      borderSecondary: 'border-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2',
      solid: 'bg-blue-600 hover:bg-blue-700', // Solid button style
      glow: 'shadow-blue-500/20',
    },
    basketball: {
      bg: 'bg-orange-600',
      bgSecondary: 'bg-orange-700',
      bgLight: 'bg-orange-50',
      bgDark: 'bg-orange-900',
      text: 'text-orange-600',
      textSecondary: 'text-orange-700',
      textContrast: 'text-white',
      border: 'border-orange-600',
      borderSecondary: 'border-orange-700',
      button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-2',
      solid: 'bg-orange-600 hover:bg-orange-700',
      glow: 'shadow-orange-500/20',
    },
    americanFootball: {
      bg: 'bg-purple-600',
      bgSecondary: 'bg-purple-700',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-900',
      text: 'text-purple-600',
      textSecondary: 'text-purple-700',
      textContrast: 'text-white',
      border: 'border-purple-600',
      borderSecondary: 'border-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-2',
      solid: 'bg-purple-600 hover:bg-purple-700',
      glow: 'shadow-purple-500/20',
    },
    baseball: {
      bg: 'bg-green-600',
      bgSecondary: 'bg-green-700',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900',
      text: 'text-green-600',
      textSecondary: 'text-green-700',
      textContrast: 'text-white',
      border: 'border-green-600',
      borderSecondary: 'border-green-700',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-2',
      solid: 'bg-green-600 hover:bg-green-700',
      glow: 'shadow-green-500/20',
    },
    tennis: {
      bg: 'bg-cyan-600',
      bgSecondary: 'bg-cyan-700',
      bgLight: 'bg-cyan-50',
      bgDark: 'bg-cyan-900',
      text: 'text-cyan-600',
      textSecondary: 'text-cyan-700',
      textContrast: 'text-white',
      border: 'border-cyan-600',
      borderSecondary: 'border-cyan-700',
      button: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-2',
      solid: 'bg-cyan-600 hover:bg-cyan-700',
      glow: 'shadow-cyan-500/20',
    },
  };
  
  return colorMap[sport] || colorMap.football;
};

// Enhanced state classes
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
      solid: 'bg-green-600 hover:bg-green-700',
    },
    warning: {
      bg: 'bg-amber-600',
      bgLight: 'bg-amber-50',
      bgDark: 'bg-amber-900',
      text: 'text-amber-600',
      textContrast: 'text-white',
      border: 'border-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-2',
      solid: 'bg-amber-600 hover:bg-amber-700',
    },
    error: {
      bg: 'bg-red-600',
      bgLight: 'bg-red-50',
      bgDark: 'bg-red-900',
      text: 'text-red-600',
      textContrast: 'text-white',
      border: 'border-red-600',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-2',
      solid: 'bg-red-600 hover:bg-red-700',
    },
    info: {
      bg: 'bg-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900',
      text: 'text-blue-600',
      textContrast: 'text-white',
      border: 'border-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2',
      solid: 'bg-blue-600 hover:bg-blue-700',
    },
  };
  
  return stateMap[state];
};

// Betting state classes
export const getBettingClasses = (state: BettingStateType) => {
  const bettingMap = {
    win: 'bg-green-600 text-white border-green-600',
    loss: 'bg-red-600 text-white border-red-600',
    pending: 'bg-amber-600 text-white border-amber-600',
    void: 'bg-gray-600 text-white border-gray-600',
    favorite: 'bg-yellow-600 text-white border-yellow-600',
    underdog: 'bg-purple-600 text-white border-purple-600',
    even: 'bg-cyan-600 text-white border-cyan-600',
    odd: 'bg-pink-600 text-white border-pink-600'
  };
  
  return bettingMap[state];
};

// Enhanced contrast calculation
export const getContrastTextColor = (backgroundColor: string): 'text-white' | 'text-black' => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const luminance = (0.299 * Math.pow(r/255, 2.2) + 0.587 * Math.pow(g/255, 2.2) + 0.114 * Math.pow(b/255, 2.2));
  
  return luminance > 0.179 ? 'text-black' : 'text-white';
};

// Interactive classes with better feedback
export const getInteractiveClasses = (variant: 'subtle' | 'moderate' | 'strong' = 'moderate') => {
  const variants = {
    subtle: 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    moderate: 'hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    strong: 'hover:scale-110 active:scale-90 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
  };
  
  return variants[variant];
};

// Enhanced glow effect with solid colors
export const getGlowEffect = (color: string, intensity: 'low' | 'medium' | 'high' = 'medium') => {
  const intensityMap = {
    low: '0 0 8px',
    medium: '0 0 16px',
    high: '0 0 24px',
  };
  
  return `${intensityMap[intensity]} ${color}30`;
};

// Focus ring colors
export const getFocusRingClasses = (sport: SportType) => {
  const focusMap = {
    football: 'focus:ring-blue-500',
    basketball: 'focus:ring-orange-500',
    americanFootball: 'focus:ring-purple-500',
    baseball: 'focus:ring-green-500',
    tennis: 'focus:ring-cyan-500',
  };
  
  return `${focusMap[sport]} focus:ring-offset-2 focus:outline-none`;
};

// Adaptive colors based on context
export const getAdaptiveColor = (context: 'gaming' | 'sports' | 'general', preference: 'vibrant' | 'subtle' = 'vibrant') => {
  const adaptiveColors = {
    gaming: {
      vibrant: {
        primary: '#2563eb',
        secondary: '#22c55e',
        accent: '#9333ea'
      },
      subtle: {
        primary: '#64748b',
        secondary: '#475569',
        accent: '#6b7280'
      }
    },
    sports: {
      vibrant: {
        primary: '#2563eb',
        secondary: '#ea580c',
        accent: '#22c55e'
      },
      subtle: {
        primary: '#475569',
        secondary: '#64748b',
        accent: '#6b7280'
      }
    },
    general: {
      vibrant: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#8b5cf6'
      },
      subtle: {
        primary: '#6b7280',
        secondary: '#9ca3af',
        accent: '#d1d5db'
      }
    }
  };
  
  return adaptiveColors[context][preference];
};

export default {
  getSportColor,
  getStateColor,
  getBettingColor,
  getSportClasses,
  getStateClasses,
  getBettingClasses,
  getContrastTextColor,
  getInteractiveClasses,
  getGlowEffect,
  getFocusRingClasses,
  getAdaptiveColor,
  sportColors,
  stateColors,
  bettingColors,
};
