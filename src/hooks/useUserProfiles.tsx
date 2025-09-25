import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface UserProfile {
  user_id: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
  location?: string;
  website?: string;
  level: number;
  experience_points: number;
  win_rate: number;
  total_predictions: number;
  correct_predictions: number;
  current_streak: number;
  best_streak: number;
  total_winnings: number;
  followers_count: number;
  following_count: number;
  posts_count: number;
  likes_received: number;
  is_verified: boolean;
  verification_tier: string;
  reputation_score: number;
  join_date: string;
  last_active?: string;
  badges?: any;
  achievements?: any;
  is_public: boolean;
  username?: string;
}

export const useUserProfiles = () => {
  const { user } = useAuth();
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [suggestedUsers, setSuggestedUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch current user's profile
  const fetchCurrentUserProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setCurrentUserProfile(data);
    } catch (error) {
      console.error('Error in fetchCurrentUserProfile:', error);
    }
  }, [user]);

  // Fetch suggested users
  const fetchSuggestedUsers = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('get_suggested_users', {
        requesting_user_id: user.id,
        limit_count: 10
      });

      if (error) {
        console.error('Error fetching suggested users:', error);
        return;
      }

      // Transform the returned data to match our interface
      const transformedUsers: UserProfile[] = (data || []).map(user => ({
        user_id: user.user_id,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        verification_tier: user.verification_tier,
        level: user.level,
        win_rate: user.win_rate,
        followers_count: user.followers_count,
        reputation_score: user.reputation_score,
        username: user.display_name.toLowerCase().replace(' ', ''),
        // Default values for required fields
        bio: '',
        experience_points: 0,
        total_predictions: 0,
        correct_predictions: 0,
        current_streak: 0,
        best_streak: 0,
        total_winnings: 0,
        following_count: 0,
        posts_count: 0,
        likes_received: 0,
        is_verified: false,
        join_date: new Date().toISOString(),
        badges: null,
        achievements: null,
        is_public: true
      }));
      setSuggestedUsers(transformedUsers);
    } catch (error) {
      console.error('Error in fetchSuggestedUsers:', error);
    }
  }, [user]);

  // Create user profile if it doesn't exist
  const ensureUserProfile = useCallback(async () => {
    if (!user) return;

    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

      if (!existingProfile) {
        // Create profile
        const { error } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            display_name: user.email?.split('@')[0] || 'Anonymous User',
            username: user.email?.split('@')[0]?.toLowerCase() || 'anonymous',
            is_public: true
          });

        if (error) {
          console.error('Error creating user profile:', error);
          return;
        }

        toast.success('Profile created successfully!');
        fetchCurrentUserProfile();
      }
    } catch (error) {
      console.error('Error in ensureUserProfile:', error);
    }
  }, [user, fetchCurrentUserProfile]);

  // Update user profile
  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user || !currentUserProfile) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating user profile:', error);
        toast.error('Failed to update profile');
        return;
      }

      setCurrentUserProfile(prev => prev ? { ...prev, ...updates } : null);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      toast.error('Failed to update profile');
    }
  }, [user, currentUserProfile]);

  // Initialize data
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        ensureUserProfile(),
        fetchCurrentUserProfile(),
        fetchSuggestedUsers()
      ]).finally(() => {
        setLoading(false);
      });
    } else {
      setCurrentUserProfile(null);
      setSuggestedUsers([]);
      setLoading(false);
    }
  }, [user, ensureUserProfile, fetchCurrentUserProfile, fetchSuggestedUsers]);

  return {
    currentUserProfile,
    suggestedUsers,
    loading,
    updateUserProfile,
    refetchProfile: fetchCurrentUserProfile,
    refetchSuggestedUsers: fetchSuggestedUsers
  };
};