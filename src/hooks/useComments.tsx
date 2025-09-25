import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_comment_id?: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  user_profiles?: {
    user_id: string;
    display_name: string;
    avatar_url?: string;
    username?: string;
  };
  replies?: Comment[];
}

export const useComments = (postId: string) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments for a post
  const fetchComments = useCallback(async () => {
    if (!postId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          user_profiles!post_comments_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .eq('post_id', postId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      // Organize comments into threads (parent comments with replies)
      const commentMap = new Map<string, Comment>();
      const rootComments: Comment[] = [];

      // First pass: create all comments
      data?.forEach(comment => {
        const commentWithReplies = { 
          ...comment, 
          replies: [],
          user_profiles: comment.user_profiles as any // Type assertion for now
        };
        commentMap.set(comment.id, commentWithReplies);
      });

      // Second pass: organize into threads
      data?.forEach(comment => {
        const commentWithReplies = commentMap.get(comment.id)!;
        if (comment.parent_comment_id) {
          const parent = commentMap.get(comment.parent_comment_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(commentWithReplies);
          }
        } else {
          rootComments.push(commentWithReplies);
        }
      });

      setComments(rootComments);
    } catch (error) {
      console.error('Error in fetchComments:', error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  // Add a new comment
  const addComment = useCallback(async (content: string, parentCommentId?: string) => {
    if (!user || !content.trim()) {
      toast.error('Please sign in and provide comment content');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: content.trim(),
          parent_comment_id: parentCommentId || null
        })
        .select(`
          *,
          user_profiles!post_comments_user_id_fkey (
            user_id,
            display_name,
            avatar_url,
            username
          )
        `)
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        toast.error('Failed to add comment');
        return;
      }

      // Refresh comments to get updated list
      fetchComments();
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error in addComment:', error);
      toast.error('Failed to add comment');
    }
  }, [user, postId, fetchComments]);

  // Delete a comment
  const deleteComment = useCallback(async (commentId: string) => {
    if (!user) {
      toast.error('Please sign in to delete comments');
      return;
    }

    try {
      const { error } = await supabase
        .from('post_comments')
        .update({ is_deleted: true })
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting comment:', error);
        toast.error('Failed to delete comment');
        return;
      }

      fetchComments();
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Error in deleteComment:', error);
      toast.error('Failed to delete comment');
    }
  }, [user, fetchComments]);

  // Set up real-time subscription for comments
  useEffect(() => {
    if (!postId) return;

    fetchComments();

    const channel = supabase
      .channel(`comments_${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_comments',
          filter: `post_id=eq.${postId}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, fetchComments]);

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    refetchComments: fetchComments
  };
};