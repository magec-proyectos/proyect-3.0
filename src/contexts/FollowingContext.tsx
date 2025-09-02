import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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
  level?: number;
  reputationScore?: number;
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
  loadSuggestedUsers: () => Promise<void>;
  loading: boolean;
}

const FollowingContext = createContext<FollowingContextType | undefined>(undefined);

export const FollowingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [following, setFollowing] = useState<FollowUser[]>([]);
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<FollowUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Convert user profile to FollowUser format
  const convertToFollowUser = (profile: any): FollowUser => {
    const getTier = (verificationTier: string): 'amateur' | 'pro' | 'expert' => {
      switch (verificationTier) {
        case 'expert':
        case 'legend':
          return 'expert';
        case 'verified':
          return 'pro';
        default:
          return 'amateur';
      }
    };

    return {
      id: profile.user_id,
      name: profile.display_name || 'Usuario',
      username: profile.display_name?.toLowerCase().replace(/\s+/g, '') || 'usuario',
      avatar: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.user_id}`,
      stats: {
        winRate: Number(profile.win_rate) || 0,
        totalPredictions: profile.total_predictions || 0,
        followers: profile.followers_count || 0,
        streak: profile.current_streak || 0,
      },
      verified: profile.is_verified || false,
      tier: getTier(profile.verification_tier),
      level: profile.level || 1,
      reputationScore: profile.reputation_score || 0,
    };
  };

  // Load user's following list
  const loadFollowing = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          following_id,
          user_profiles!user_follows_following_id_fkey(*)
        `)
        .eq('follower_id', user.id);

      if (error) throw error;

      const followingUsers = data?.map(item => 
        convertToFollowUser(item.user_profiles)
      ).filter(Boolean) || [];

      setFollowing(followingUsers);
    } catch (error) {
      console.error('Error loading following:', error);
    }
  };

  // Load user's followers list
  const loadFollowers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          follower_id,
          user_profiles!user_follows_follower_id_fkey(*)
        `)
        .eq('following_id', user.id);

      if (error) throw error;

      const followerUsers = data?.map(item => 
        convertToFollowUser(item.user_profiles)
      ).filter(Boolean) || [];

      setFollowers(followerUsers);
    } catch (error) {
      console.error('Error loading followers:', error);
    }
  };

  // Load suggested users using the database function
  const loadSuggestedUsers = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .rpc('get_suggested_users', {
          requesting_user_id: user.id,
          limit_count: 10
        });

      if (error) throw error;

      const suggested = data?.map(profile => convertToFollowUser(profile)) || [];
      setSuggestedUsers(suggested);
    } catch (error) {
      console.error('Error loading suggested users:', error);
      // Fallback to loading random active users
      await loadFallbackSuggested();
    } finally {
      setLoading(false);
    }
  };

  // Fallback method to load suggested users
  const loadFallbackSuggested = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .neq('user_id', user.id)
        .eq('is_public', true)
        .order('reputation_score', { ascending: false })
        .limit(10);

      if (error) throw error;

      const suggested = data?.map(profile => convertToFollowUser(profile)) || [];
      setSuggestedUsers(suggested);
    } catch (error) {
      console.error('Error loading fallback suggested users:', error);
    }
  };

  // Follow a user
  const followUser = async (userId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Inicia sesión para seguir usuarios');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_follows')
        .insert({
          follower_id: user.id,
          following_id: userId
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('Ya sigues a este usuario');
        } else {
          throw error;
        }
        return false;
      }

      // Move user from suggested to following
      const userToFollow = suggestedUsers.find(u => u.id === userId);
      if (userToFollow) {
        setFollowing(prev => [...prev, userToFollow]);
        setSuggestedUsers(prev => prev.filter(u => u.id !== userId));
        
        toast.success(`Ahora sigues a ${userToFollow.name}`, {
          description: 'Recibirás notificaciones de sus predicciones'
        });
      }

      return true;
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Error al seguir usuario');
      return false;
    }
  };

  // Unfollow a user
  const unfollowUser = async (userId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', userId);

      if (error) throw error;

      // Move user from following to suggested
      const userToUnfollow = following.find(u => u.id === userId);
      if (userToUnfollow) {
        setFollowing(prev => prev.filter(u => u.id !== userId));
        setSuggestedUsers(prev => [...prev, userToUnfollow]);
        
        toast.success(`Dejaste de seguir a ${userToUnfollow.name}`);
      }

      return true;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Error al dejar de seguir usuario');
      return false;
    }
  };

  const isFollowing = (userId: string): boolean => {
    return following.some(u => u.id === userId);
  };

  const getFollowingCount = (): number => following.length;
  const getFollowersCount = (): number => followers.length;

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to follow changes
    const followsChannel = supabase
      .channel('user_follows_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_follows',
          filter: `follower_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Follow change:', payload);
          // Reload following list on changes
          loadFollowing();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_follows',
          filter: `following_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Follower change:', payload);
          // Reload followers list on changes
          loadFollowers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(followsChannel);
    };
  }, [user]);

  // Load initial data
  useEffect(() => {
    if (user) {
      loadFollowing();
      loadFollowers();
      loadSuggestedUsers();
    } else {
      setFollowing([]);
      setFollowers([]);
      setSuggestedUsers([]);
    }
  }, [user]);

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
      loadSuggestedUsers,
      loading
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