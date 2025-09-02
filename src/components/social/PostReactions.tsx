import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Reaction {
  type: 'like' | 'money' | 'fire' | 'lightning' | 'surprised';
  emoji: string;
  label: string;
  color: string;
}

export const REACTIONS: Reaction[] = [
  { type: 'like', emoji: '👍', label: 'Like', color: 'text-blue-500' },
  { type: 'money', emoji: '💰', label: 'Money', color: 'text-green-500' },
  { type: 'fire', emoji: '🔥', label: 'Fire', color: 'text-orange-500' },
  { type: 'lightning', emoji: '⚡', label: 'Lightning', color: 'text-yellow-500' },
  { type: 'surprised', emoji: '😱', label: 'Surprised', color: 'text-purple-500' },
];

interface PostReactionsProps {
  postId: number;
  currentReactions: Record<string, number>;
  userReactions: string[];
  onReactionUpdate: (postId: number, reactions: Record<string, number>, userReactions: string[]) => void;
}

const PostReactions: React.FC<PostReactionsProps> = ({
  postId,
  currentReactions,
  userReactions,
  onReactionUpdate,
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReaction = async (reactionType: string) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to react to posts",
          variant: "destructive",
        });
        return;
      }

      const hasReacted = userReactions.includes(reactionType);

      if (hasReacted) {
        // Remove reaction
        const { error } = await supabase
          .from('post_reactions')
          .delete()
          .eq('post_id', postId.toString())
          .eq('user_id', user.id)
          .eq('reaction_type', reactionType);

        if (error) throw error;

        // Update local state
        const newReactions = { ...currentReactions };
        newReactions[reactionType] = Math.max(0, (newReactions[reactionType] || 0) - 1);
        const newUserReactions = userReactions.filter(r => r !== reactionType);
        onReactionUpdate(postId, newReactions, newUserReactions);
      } else {
        // Add reaction
        const { error } = await supabase
          .from('post_reactions')
          .insert({
            post_id: postId.toString(),
            user_id: user.id,
            reaction_type: reactionType,
          });

        if (error) throw error;

        // Update local state
        const newReactions = { ...currentReactions };
        newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
        const newUserReactions = [...userReactions, reactionType];
        onReactionUpdate(postId, newReactions, newUserReactions);
      }

      setShowReactionPicker(false);
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalReactions = () => {
    return Object.values(currentReactions).reduce((sum, count) => sum + count, 0);
  };

  const getTopReactions = () => {
    return REACTIONS
      .filter(reaction => (currentReactions[reaction.type] || 0) > 0)
      .sort((a, b) => (currentReactions[b.type] || 0) - (currentReactions[a.type] || 0))
      .slice(0, 3);
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Main reaction button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 hover:text-neon-blue transition-all"
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          disabled={isLoading}
        >
          {userReactions.length > 0 ? (
            <span className="text-lg">
              {REACTIONS.find(r => r.type === userReactions[0])?.emoji || '👍'}
            </span>
          ) : (
            <Heart size={18} />
          )}
          <span>{getTotalReactions()}</span>
          <Plus size={14} className={`transition-transform ${showReactionPicker ? 'rotate-45' : ''}`} />
        </Button>

        {/* Reaction picker */}
        <AnimatePresence>
          {showReactionPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full left-0 mb-2 bg-dark-card border border-dark-border rounded-xl p-2 shadow-lg z-50"
            >
              <div className="flex gap-1">
                {REACTIONS.map((reaction) => (
                  <motion.button
                    key={reaction.type}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleReaction(reaction.type)}
                    className={`p-2 rounded-lg transition-all hover:bg-dark-lighter ${
                      userReactions.includes(reaction.type) 
                        ? 'bg-neon-blue/20 ring-1 ring-neon-blue/30' 
                        : 'hover:bg-dark-lighter'
                    }`}
                    title={reaction.label}
                  >
                    <span className="text-lg">{reaction.emoji}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Display top reactions */}
      {getTopReactions().length > 0 && (
        <div className="flex items-center gap-1 text-xs text-gray-400">
          {getTopReactions().map((reaction) => (
            <div key={reaction.type} className="flex items-center gap-0.5">
              <span>{reaction.emoji}</span>
              <span>{currentReactions[reaction.type]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostReactions;