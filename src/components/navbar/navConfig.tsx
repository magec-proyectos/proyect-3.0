
import { ReactNode } from 'react';
import { 
  Home, 
  Share2 
} from 'lucide-react';
import { 
  SportIcon, 
  CasinoIcon, 
  BlackjackIcon, 
  RouletteIcon 
} from './NavbarIcons';

export interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  subItems?: SubNavItem[];
}

export interface SubNavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

export const navItems: NavItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    icon: <Home size={18} className="text-soft-blue" /> 
  },
  { 
    path: '/sports', 
    label: 'Sports', 
    icon: <SportIcon size={18} className="text-soft-blue" />
  },
  { 
    path: '/casino', 
    label: 'Casino', 
    icon: <CasinoIcon size={18} className="text-soft-blue" />,
    subItems: [
      { path: '/blackjack', label: 'Blackjack', icon: <BlackjackIcon size={18} className="text-soft-blue" /> },
      { path: '/roulette', label: 'Roulette', icon: <RouletteIcon size={18} className="text-soft-blue" /> }
    ]
  },
  { 
    path: '/social', 
    label: 'Social', 
    icon: <Share2 size={18} className="text-soft-blue" /> 
  },
];
