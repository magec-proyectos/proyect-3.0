
import React from 'react';
import { Home, Share2 } from 'lucide-react';

// Sport Icon with improved styling
export const SportIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
    <path d="M8 12c0-4.4 1.8-8 4-8s4 3.6 4 8-1.8 8-4 8-4-3.6-4-8z" />
  </svg>
);

// Improved Football Icon (Soccer ball)
export const FootballIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v4.5" />
    <path d="M12 17.5v4.5" />
    <path d="M4.2 5.8l3.2 3.2" />
    <path d="M16.6 15l3.2 3.2" />
    <path d="M2 12h4.5" />
    <path d="M17.5 12h4.5" />
    <path d="M4.2 18.2l3.2-3.2" />
    <path d="M16.6 9l3.2-3.2" />
  </svg>
);

// Improved Basketball Icon
export const BasketballIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M4.93 4.93a20 20 0 0 1 14.14 14.14" />
    <path d="M19.07 4.93a20 20 0 0 0-14.14 14.14" />
    <path d="M12 2a20 20 0 0 0 0 20" />
    <path d="M2 12h20" />
  </svg>
);

// Improved American Football Icon
export const AmericanFootballIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <ellipse cx="12" cy="12" rx="9" ry="6" />
    <path d="M7 12h10" />
    <path d="M8 8.5v7" />
    <path d="M16 8.5v7" />
    <path d="M5 10.5v3" />
    <path d="M19 10.5v3" />
  </svg>
);

// Improved Casino Chip Icon with glow effect
export const CasinoIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} filter drop-shadow-sm`}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="m16.24 16.24 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="m16.24 7.76 2.83-2.83" />
  </svg>
);

// Improved Playing Cards Icon (Blackjack)
export const BlackjackIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="14" height="18" rx="2" />
    <path d="m10 7-2.5 2.5L10 12" />
    <path d="M7.5 9.5H12" />
    <rect x="7" y="3" width="14" height="18" rx="2" transform="rotate(6 7 3)" />
  </svg>
);

// Improved Roulette Wheel Icon
export const RouletteIcon = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} hover:animate-spin-slow`}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4 12H2" />
    <path d="M22 12h-4" />
    <path d="m6.34 6.34-2.12-2.12" />
    <path d="m19.78 19.78-2.12-2.12" />
    <path d="m19.78 4.22-2.12 2.12" />
    <path d="m6.34 17.66-2.12 2.12" />
    <path d="M12 12 9 7" />
  </svg>
);

// Export all the icon components
export const navbarIcons = {
  Home,
  Share2,
  SportIcon,
  FootballIcon,
  BasketballIcon,
  AmericanFootballIcon,
  CasinoIcon,
  BlackjackIcon,
  RouletteIcon
};
