
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Conversation {
  id: string;
  title?: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

export const useChatbotConversations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Fetch user conversations
  const { data: conversations } = useQuery({
    queryKey: ['user-conversations'],
    queryFn: async (): Promise<Conversation[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, agent_id, created_at, updated_at')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user
  });

  // Create new conversation
  const createConversationMutation = useMutation({
    mutationFn: async (agentId: string): Promise<string> => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          agent_id: agentId,
          title: 'New Conversation'
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    },
    onSuccess: (conversationId) => {
      setCurrentConversationId(conversationId);
      queryClient.invalidateQueries({ queryKey: ['user-conversations'] });
    }
  });

  // Update conversation title
  const updateConversationMutation = useMutation({
    mutationFn: async ({ conversationId, title }: { conversationId: string; title: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('conversations')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', conversationId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-conversations'] });
    }
  });

  // Delete conversation
  const deleteConversationMutation = useMutation({
    mutationFn: async (conversationId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('conversations')
        .update({ is_active: false })
        .eq('id', conversationId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: (conversationId) => {
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
      }
      queryClient.invalidateQueries({ queryKey: ['user-conversations'] });
    }
  });

  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createConversation: createConversationMutation.mutateAsync,
    updateConversation: updateConversationMutation.mutateAsync,
    deleteConversation: deleteConversationMutation.mutateAsync,
    isCreatingConversation: createConversationMutation.isPending
  };
};
