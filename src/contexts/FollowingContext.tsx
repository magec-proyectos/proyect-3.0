
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/sonner';

export interface FollowUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  stats: {
    winRate: number;
    totalPredictions: number;
    followers: number;
    streak: number;
  };
  verified: boolean;
  tier: 'amateur' | 'pro' | 'expert';
}

interface FollowingContextType {
  following: FollowUser[];
  followers: FollowUser[];
  suggestedUsers: FollowUser[];
  followUser: (userId: string) => Promise<boolean>;
  unfollowUser: (userId: string) => Promise<boolean>;
  isFollowing: (userId: string) => boolean;
  getFollowingCount: () => number;
  getFollowersCount: () => number;
  loadSuggestedUsers: () => void;
}

const FollowingContext = createContext<FollowingContextType | undefined>(undefined);

const mockUsers: FollowUser[] = [
  {
    id: '1',
    name: 'Carlos Experto',
    username: 'carlosbet',
    avatar: 'https://placehold.co/40',
    stats: { winRate: 85, totalPredictions: 243, followers: 1200, streak: 7 },
    verified: true,
    tier: 'expert'
  },
  {
    id: '2', 
    name: 'María Predictor',
    username: 'mariapredict',
    avatar: 'https://placehold.co/40',
    stats: { winRate: 78, totalPredictions: 156, followers: 890, streak: 4 },
    verified: true,
    tier: 'pro'
  },
  {
    id: '3',
    name: 'Diego Stats',
    username: 'diegostats',
    avatar: 'https://placehold.co/40', 
    stats: { winRate: 72, totalPredictions: 89, followers: 234, streak: 2 },
    verified: false,
    tier: 'pro'
  }
];

export const FollowingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [following, setFollowing] = useState<FollowUser[]>([]);
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<FollowUser[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSuggestedUsers();
    }
  }, [user]);

  const loadSuggestedUsers = () => {
    // Simular carga de usuarios sugeridos basados en actividad
    const suggested = mockUsers.filter(u => !following.find(f => f.id === u.id));
    setSuggestedUsers(suggested);
  };

  const followUser = async (userId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Inicia sesión para seguir usuarios');
      return false;
    }

    const userToFollow = mockUsers.find(u => u.id === userId);
    if (!userToFollow) return false;

    // Simular seguimiento
    setFollowing(prev => [...prev, userToFollow]);
    setSuggestedUsers(prev => prev.filter(u => u.id !== userId));
    
    toast.success(`Ahora sigues a ${userToFollow.name}`, {
      description: 'Recibirás notificaciones de sus predicciones'
    });

    return true;
  };

  const unfollowUser = async (userId: string): Promise<boolean> => {
    const userToUnfollow = following.find(u => u.id === userId);
    if (!userToUnfollow) return false;

    setFollowing(prev => prev.filter(u => u.id !== userId));
    setSuggestedUsers(prev => [...prev, userToUnfollow]);
    
    toast.success(`Dejaste de seguir a ${userToUnfollow.name}`);
    return true;
  };

  const isFollowing = (userId: string): boolean => {
    return following.some(u => u.id === userId);
  };

  const getFollowingCount = (): number => following.length;
  const getFollowersCount = (): number => followers.length;

  return (
    <FollowingContext.Provider value={{
      following,
      followers,
      suggestedUsers,
      followUser,
      unfollowUser,
      isFollowing,
      getFollowingCount,
      getFollowersCount,
      loadSuggestedUsers
    }}>
      {children}
    </FollowingContext.Provider>
  );
};

export const useFollowing = () => {
  const context = useContext(FollowingContext);
  if (!context) {
    throw new Error('useFollowing must be used within FollowingProvider');
  }
  return context;
};
