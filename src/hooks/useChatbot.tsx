
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface Agent {
  id: string;
  name: string;
  description: string;
  specialization: string;
  avatar_url?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  title?: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

interface ChatbotSettings {
  global_enabled: boolean;
  default_agent_id: string;
  max_conversation_length: number;
  chatbot_position: { bottom: string; right: string };
  welcome_message: string;
}

export const useChatbot = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch chatbot settings
  const { data: settings } = useQuery({
    queryKey: ['chatbot-settings'],
    queryFn: async (): Promise<ChatbotSettings> => {
      const { data, error } = await supabase
        .from('chatbot_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      const settingsObj: any = {};
      data?.forEach(setting => {
        settingsObj[setting.setting_key] = setting.setting_value;
      });

      return {
        global_enabled: settingsObj.global_enabled || false,
        default_agent_id: settingsObj.default_agent_id || '',
        max_conversation_length: settingsObj.max_conversation_length || 50,
        chatbot_position: settingsObj.chatbot_position || { bottom: '24px', right: '24px' },
        welcome_message: settingsObj.welcome_message || 'Hi! How can I help you today?'
      };
    }
  });

  // Fetch available agents
  const { data: agents } = useQuery({
    queryKey: ['chatbot-agents'],
    queryFn: async (): Promise<Agent[]> => {
      const { data, error } = await supabase
        .from('chatbot_agents')
        .select('id, name, description, specialization, avatar_url')
        .eq('is_active', true)
        .order('specialization');

      if (error) throw error;
      return data || [];
    }
  });

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

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Fetch messages for current conversation
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['conversation-messages', currentConversationId],
    queryFn: async (): Promise<Message[]> => {
      if (!currentConversationId) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select('id, role, content, created_at')
        .eq('conversation_id', currentConversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentConversationId
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

  // Send message
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, conversationId }: { message: string; conversationId: string }) => {
      const response = await fetch('/api/v1/chat-completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          conversationId,
          message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation-messages', currentConversationId] });
      queryClient.invalidateQueries({ queryKey: ['user-conversations'] });
    }
  });

  const startNewConversation = async (agentId?: string) => {
    const selectedAgentId = agentId || settings?.default_agent_id || agents?.[0]?.id;
    if (selectedAgentId) {
      await createConversationMutation.mutateAsync(selectedAgentId);
    }
  };

  const sendMessage = async (message: string) => {
    if (!currentConversationId) {
      await startNewConversation();
      // Wait for conversation to be created
      if (currentConversationId) {
        await sendMessageMutation.mutateAsync({ message, conversationId: currentConversationId });
      }
    } else {
      await sendMessageMutation.mutateAsync({ message, conversationId: currentConversationId });
    }
  };

  const selectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  return {
    // State
    isOpen,
    setIsOpen,
    currentConversationId,
    
    // Data
    settings,
    agents,
    conversations,
    messages,
    messagesLoading,
    
    // Actions
    startNewConversation,
    sendMessage,
    selectConversation,
    
    // Loading states
    isCreatingConversation: createConversationMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending
  };
};
