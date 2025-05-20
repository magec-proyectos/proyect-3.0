
import { ReactNode } from 'react';
import { 
  Home, 
  Share2 
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
    icon: <Home size={18} className="text-neon-blue" /> 
  },
  { 
    path: '/sports', 
    label: 'Sports', 
    icon: <SportIcon size={18} className="text-neon-blue" />,
    subItems: [
      { path: '/football', label: 'Football', icon: <FootballIcon size={18} className="text-neon-blue" /> },
      { path: '/basketball', label: 'Basketball', icon: <BasketballIcon size={18} className="text-neon-blue" /> },
      { path: '/american-football', label: 'American Football', icon: <AmericanFootballIcon size={18} className="text-neon-blue" /> }
    ]
  },
  { 
    path: '/casino', 
    label: 'Casino', 
    icon: <CasinoIcon size={18} className="text-neon-blue" />,
    subItems: [
      { path: '/blackjack', label: 'Blackjack', icon: <BlackjackIcon size={18} className="text-neon-blue" /> },
      { path: '/roulette', label: 'Roulette', icon: <RouletteIcon size={18} className="text-neon-blue" /> }
    ]
  },
  { 
    path: '/social', 
    label: 'Social', 
    icon: <Share2 size={18} className="text-neon-blue" /> 
  },
];
