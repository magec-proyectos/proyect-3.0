
import {
  Home,
  Gamepad2,
  Dices,
  Users,
  Trophy,
  Book,
  Settings,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: keyof typeof Icons;
}

export const Icons = {
  Home,
  Gamepad2,
  Dices,
  Users,
  Trophy,
  Book,
  Settings,
};

export const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: 'Home'
  },
  {
    label: 'Sports',
    path: '/sports',
    icon: 'Gamepad2'
  },
  {
    label: 'Casino',
    path: '/casino',
    icon: 'Dices'
  },
  {
    label: 'Social',
    path: '/social',
    icon: 'Users'
  },
  {
    label: 'Leaderboard',
    path: '/leaderboard',
    icon: 'Trophy'
  },
  {
    label: 'Legal',
    path: '/legal',
    icon: 'Book'
  },
  {
    label: 'Admin',
    path: '/admin',
    icon: 'Settings'
  }
];
