import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface PostUser {
  id: string;
  display_name: string;
  avatar_url?: string;
  username?: string;
}

export interface RealPost {
  id: string;
  user_id: string;
  content: string;
  prediction_type: string;
  match_info: any;
  prediction_details: any;
  confidence_level?: number;
  confidence_score?: number;
  stake_amount?: number;
  potential_return?: number;
  actual_return?: number;
  likes_count: number;
  comments_count: number;
  shares_count?: number;
  reactions_summary?: any;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  is_featured?: boolean;
  is_premium?: boolean;
  user_profiles?: PostUser;
}

export const useRealSocialData = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<RealPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [feedFilter, setFeedFilter] = useState('foryou');

  // Fetch posts from database
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      
      let query = supabase
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
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(20);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
        return;
      }

      setPosts((data || []) as unknown as RealPost[]);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new post
  const handleCreatePost = useCallback(async (content: string) => {
    if (!user) {
      toast.error('Please sign in to create posts');
      return;
    }

    if (!content.trim()) {
      toast.error('Please add content to your post');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
          prediction_type: 'general',
          match_info: { match: 'Custom Prediction' },
          prediction_details: { prediction: 'User Prediction' },
          confidence_level: 70,
          is_public: true
        })
        .select(`
          *,
          user_profiles!user_posts_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast.error('Failed to create post');
        return;
      }

      setPosts(prev => [data as unknown as RealPost, ...prev]);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error in handleCreatePost:', error);
      toast.error('Failed to create post');
    }
  }, [user]);

  // Handle reactions
  const handleReaction = useCallback(async (postId: string, reactionType: string) => {
    if (!user) {
      toast.error('Please sign in to react to posts');
      return;
    }

    try {
      // Check if user already reacted with this type
      const { data: existingReaction } = await supabase
        .from('post_reactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType)
        .single();

      if (existingReaction) {
        // Remove reaction
        const { error } = await supabase
          .from('post_reactions')
          .delete()
          .eq('id', existingReaction.id);

        if (error) throw error;
        toast.success('Reaction removed');
      } else {
        // Add reaction
        const { error } = await supabase
          .from('post_reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType
          });

        if (error) throw error;
        toast.success('Reaction added');
      }

      // Refresh posts to update counts
      fetchPosts();
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast.error('Failed to update reaction');
    }
  }, [user, fetchPosts]);

  // Get user reactions for posts
  const getUserReactions = useCallback(async (postIds: string[]) => {
    if (!user || postIds.length === 0) return {};

    try {
      const { data } = await supabase
        .from('post_reactions')
        .select('post_id, reaction_type')
        .eq('user_id', user.id)
        .in('post_id', postIds);

      const reactions: Record<string, string[]> = {};
      data?.forEach(reaction => {
        if (!reactions[reaction.post_id]) {
          reactions[reaction.post_id] = [];
        }
        reactions[reaction.post_id].push(reaction.reaction_type);
      });

      return reactions;
    } catch (error) {
      console.error('Error fetching user reactions:', error);
      return {};
    }
  }, [user]);

  // Handle share
  const handleShare = useCallback((post: RealPost) => {
    if (!user) {
      toast.error('Please sign in to share posts');
      return;
    }
    
    // For now, just copy link to clipboard
    const url = `${window.location.origin}/social?post=${post.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Post link copied to clipboard!');
  }, [user]);

  // Get filtered posts
  const getFilteredPosts = useCallback((filter: string) => {
    if (filter === 'following') {
      // For now, return all posts. In the future, filter by followed users
      return posts;
    }
    return posts;
  }, [posts]);

  // Initialize data
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    activeTab,
    feedFilter,
    setActiveTab,
    setFeedFilter,
    handleCreatePost,
    handleReaction,
    handleShare,
    getFilteredPosts,
    getUserReactions,
    refetchPosts: fetchPosts
  };
};