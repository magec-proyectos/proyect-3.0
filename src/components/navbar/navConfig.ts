
import { ReactNode } from 'react';
import { 
  Home, 
  Share2,
  Square
} from 'lucide-react';
import { 
  SportIcon, 
  FootballIcon, 
  BasketballIcon, 
  AmericanFootballIcon, 
  CasinoIcon, 
  BlackjackIcon, 
  RouletteIcon 
} from './NavbarIcons';

export interface SubNavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

export interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  subItems?: SubNavItem[];
}

export const navItems: NavItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    icon: <Home size={18} className="text-neon-blue" /> 
  },
  { 
    path: '/football', 
    label: 'Football', 
    icon: <FootballIcon size={18} className="text-neon-blue" />
  },
  { 
    path: '/basketball', 
    label: 'Basketball', 
    icon: <BasketballIcon size={18} className="text-neon-blue" />
  },
  { 
    path: '/american-football', 
    label: 'American Football', 
    icon: <AmericanFootballIcon size={18} className="text-neon-blue" />
  },
  { 
    path: '/square', 
    label: 'Square', 
    icon: <Square size={18} className="text-neon-blue" />
  },
];
