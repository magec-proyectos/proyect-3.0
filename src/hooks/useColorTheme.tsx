
import { useMemo } from 'react';

// Enhanced color theme system
export const COLOR_THEMES = {
  sport: {
    football: {
      primary: 'hsl(142, 76%, 36%)', // Better green
      secondary: 'hsl(199, 89%, 48%)', // Better blue
      accent: 'hsl(34, 88%, 55%)', // Orange
      background: 'hsl(0, 0%, 4%)',
      surface: 'hsl(0, 0%, 8%)',
      border: 'hsl(0, 0%, 15%)',
      text: {
        primary: 'hsl(0, 0%, 98%)',
        secondary: 'hsl(0, 0%, 75%)',
        muted: 'hsl(0, 0%, 55%)'
      }
    },
    basketball: {
      primary: 'hsl(24, 95%, 53%)', // Orange
      secondary: 'hsl(199, 89%, 48%)', // Blue
      accent: 'hsl(142, 76%, 36%)', // Green
      background: 'hsl(0, 0%, 4%)',
      surface: 'hsl(0, 0%, 8%)',
      border: 'hsl(0, 0%, 15%)',
      text: {
        primary: 'hsl(0, 0%, 98%)',
        secondary: 'hsl(0, 0%, 75%)',
        muted: 'hsl(0, 0%, 55%)'
      }
    },
    americanFootball: {
      primary: 'hsl(271, 81%, 56%)', // Purple
      secondary: 'hsl(330, 81%, 60%)', // Pink
      accent: 'hsl(199, 89%, 48%)', // Blue
      background: 'hsl(0, 0%, 4%)',
      surface: 'hsl(0, 0%, 8%)',
      border: 'hsl(0, 0%, 15%)',
      text: {
        primary: 'hsl(0, 0%, 98%)',
        secondary: 'hsl(0, 0%, 75%)',
        muted: 'hsl(0, 0%, 55%)'
      }
    }
  },
  state: {
    success: {
      50: 'hsl(142, 76%, 96%)',
      100: 'hsl(142, 76%, 91%)',
      500: 'hsl(142, 76%, 36%)',
      600: 'hsl(142, 76%, 32%)',
      900: 'hsl(142, 76%, 18%)',
    },
    warning: {
      50: 'hsl(48, 96%, 96%)',
      100: 'hsl(48, 96%, 91%)',
      500: 'hsl(48, 96%, 56%)',
      600: 'hsl(48, 96%, 52%)',
      900: 'hsl(48, 96%, 28%)',
    },
    error: {
      50: 'hsl(0, 84%, 96%)',
      100: 'hsl(0, 84%, 91%)',
      500: 'hsl(0, 84%, 60%)',
      600: 'hsl(0, 84%, 56%)',
      900: 'hsl(0, 84%, 32%)',
    },
    info: {
      50: 'hsl(199, 89%, 96%)',
      100: 'hsl(199, 89%, 91%)',
      500: 'hsl(199, 89%, 48%)',
      600: 'hsl(199, 89%, 44%)',
      900: 'hsl(199, 89%, 24%)',
    }
  }
} as const;

type SportTheme = keyof typeof COLOR_THEMES.sport;
type StateColor = keyof typeof COLOR_THEMES.state;

export const useColorTheme = () => {
  const theme = useMemo(() => ({
    // Get sport-specific theme
    getSportTheme: (sport: SportTheme) => COLOR_THEMES.sport[sport],
    
    // Get state color with shade
    getStateColor: (state: StateColor, shade: keyof typeof COLOR_THEMES.state.success = '500') => 
      COLOR_THEMES.state[state][shade],
    
    // Generate CSS custom properties for a sport theme
    generateCSSVars: (sport: SportTheme) => {
      const sportTheme = COLOR_THEMES.sport[sport];
      return {
        '--theme-primary': sportTheme.primary,
        '--theme-secondary': sportTheme.secondary,
        '--theme-accent': sportTheme.accent,
        '--theme-background': sportTheme.background,
        '--theme-surface': sportTheme.surface,
        '--theme-border': sportTheme.border,
        '--theme-text-primary': sportTheme.text.primary,
        '--theme-text-secondary': sportTheme.text.secondary,
        '--theme-text-muted': sportTheme.text.muted,
      };
    },
    
    // Get color for different contexts
    getContextualColor: (context: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info', sport?: SportTheme) => {
      if (sport && (context === 'primary' || context === 'secondary' || context === 'accent')) {
        return COLOR_THEMES.sport[sport][context];
      }
      
      if (context === 'success' || context === 'warning' || context === 'error' || context === 'info') {
        return COLOR_THEMES.state[context]['500'];
      }
      
      return COLOR_THEMES.sport.football.primary; // fallback
    },
    
    // Enhanced glassmorphism effects
    getGlassEffect: (sport?: SportTheme) => {
      const baseTheme = sport ? COLOR_THEMES.sport[sport] : COLOR_THEMES.sport.football;
      return {
        background: `${baseTheme.surface}CC`, // 80% opacity
        backdropFilter: 'blur(16px) saturate(150%)',
        border: `1px solid ${baseTheme.border}80`, // 50% opacity
        boxShadow: `0 8px 32px ${baseTheme.background}40, inset 0 1px 0 ${baseTheme.text.primary}10`
      };
    },
    
    // Get hover state colors
    getHoverColor: (color: string, intensity: 'light' | 'medium' | 'strong' = 'medium') => {
      const opacities = {
        light: '10',
        medium: '20',
        strong: '30'
      };
      return `${color}${opacities[intensity]}`;
    }
  }), []);

  return theme;
};

export default useColorTheme;
