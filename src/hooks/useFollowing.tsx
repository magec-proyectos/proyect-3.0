import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface UserFollow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export const useFollowing = () => {
  const { user } = useAuth();
  const [following, setFollowing] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's following and followers
  const fetchFollowData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get users this user is following
      const { data: followingData } = await supabase
        .from('user_follows')
        .select('following_id')
        .eq('follower_id', user.id);

      // Get users following this user
      const { data: followersData } = await supabase
        .from('user_follows')
        .select('follower_id')
        .eq('following_id', user.id);

      setFollowing(followingData?.map(f => f.following_id) || []);
      setFollowers(followersData?.map(f => f.follower_id) || []);
    } catch (error) {
      console.error('Error fetching follow data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Check if user is following someone
  const isFollowing = useCallback((userId: string) => {
    return following.includes(userId);
  }, [following]);

  // Follow a user
  const followUser = useCallback(async (userIdToFollow: string) => {
    if (!user) {
      toast.error('Please sign in to follow users');
      return;
    }

    if (user.id === userIdToFollow) {
      toast.error('You cannot follow yourself');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_follows')
        .insert({
          follower_id: user.id,
          following_id: userIdToFollow
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('You are already following this user');
        } else {
          console.error('Error following user:', error);
          toast.error('Failed to follow user');
        }
        return;
      }

      setFollowing(prev => [...prev, userIdToFollow]);
      toast.success('User followed successfully!');
    } catch (error) {
      console.error('Error in followUser:', error);
      toast.error('Failed to follow user');
    }
  }, [user]);

  // Unfollow a user
  const unfollowUser = useCallback(async (userIdToUnfollow: string) => {
    if (!user) {
      toast.error('Please sign in to unfollow users');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', userIdToUnfollow);

      if (error) {
        console.error('Error unfollowing user:', error);
        toast.error('Failed to unfollow user');
        return;
      }

      setFollowing(prev => prev.filter(id => id !== userIdToUnfollow));
      toast.success('User unfollowed');
    } catch (error) {
      console.error('Error in unfollowUser:', error);
      toast.error('Failed to unfollow user');
    }
  }, [user]);

  // Get posts from followed users
  const getFollowingFeed = useCallback(async () => {
    if (!user || following.length === 0) return [];

    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select(`
          *,
          user_profiles!user_posts_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .in('user_id', following)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching following feed:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getFollowingFeed:', error);
      return [];
    }
  }, [user, following]);

  // Set up real-time subscription for follow changes
  useEffect(() => {
    if (!user) return;

    fetchFollowData();

    const channel = supabase
      .channel(`follows_${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_follows',
          filter: `follower_id=eq.${user.id}`
        },
        () => {
          fetchFollowData();
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
        () => {
          fetchFollowData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchFollowData]);

  return {
    following,
    followers,
    loading,
    isFollowing,
    followUser,
    unfollowUser,
    getFollowingFeed,
    refetchFollowData: fetchFollowData
  };
};