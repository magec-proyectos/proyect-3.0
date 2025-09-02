import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UsePostReactionsProps {
  postId: number;
  initialReactions?: Record<string, number>;
}

export const usePostReactions = ({ postId, initialReactions = {} }: UsePostReactionsProps) => {
  const [reactions, setReactions] = useState<Record<string, number>>(initialReactions);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        // Get current user reactions for this post
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: userReactionData } = await supabase
            .from('post_reactions')
            .select('reaction_type')
            .eq('post_id', postId.toString())
            .eq('user_id', user.id);

          if (userReactionData) {
            setUserReactions(userReactionData.map(r => r.reaction_type));
          }
        }

        // Get all reactions for this post
        const { data: allReactions } = await supabase
          .from('post_reactions')
          .select('reaction_type')
          .eq('post_id', postId.toString());

        if (allReactions) {
          const reactionCounts: Record<string, number> = {};
          allReactions.forEach(reaction => {
            reactionCounts[reaction.reaction_type] = (reactionCounts[reaction.reaction_type] || 0) + 1;
          });
          setReactions(reactionCounts);
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReactions();
  }, [postId]);

  const updateReactions = (newReactions: Record<string, number>, newUserReactions: string[]) => {
    setReactions(newReactions);
    setUserReactions(newUserReactions);
  };

  return {
    reactions,
    userReactions,
    loading,
    updateReactions,
  };
};