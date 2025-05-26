
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
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch chatbot settings - works for both authenticated and unauthenticated users
  const { data: settings } = useQuery({
    queryKey: ['chatbot-settings'],
    queryFn: async (): Promise<ChatbotSettings> => {
      console.log('Fetching chatbot settings...');
      const { data, error } = await supabase
        .from('chatbot_settings')
        .select('setting_key, setting_value');

      if (error) {
        console.error('Error fetching chatbot settings:', error);
        // Return default settings if there's an error
        return {
          global_enabled: true, // Default to enabled
          default_agent_id: '',
          max_conversation_length: 50,
          chatbot_position: { bottom: '24px', right: '24px' },
          welcome_message: 'Hi! How can I help you today?'
        };
      }

      const settingsObj: any = {};
      data?.forEach(setting => {
        settingsObj[setting.setting_key] = setting.setting_value;
      });

      const result = {
        global_enabled: settingsObj.global_enabled !== false, // Default to true if not set
        default_agent_id: settingsObj.default_agent_id || '',
        max_conversation_length: settingsObj.max_conversation_length || 50,
        chatbot_position: settingsObj.chatbot_position || { bottom: '24px', right: '24px' },
        welcome_message: settingsObj.welcome_message || 'Hi! How can I help you today?'
      };

      console.log('Chatbot settings loaded:', result);
      return result;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1 // Only retry once on failure
  });

  // Fetch available agents - works for both authenticated and unauthenticated users
  const { data: agents } = useQuery({
    queryKey: ['chatbot-agents'],
    queryFn: async (): Promise<Agent[]> => {
      console.log('Fetching chatbot agents...');
      const { data, error } = await supabase
        .from('chatbot_agents')
        .select('id, name, description, specialization, avatar_url')
        .eq('is_active', true)
        .order('specialization');

      if (error) {
        console.error('Error fetching chatbot agents:', error);
        return [];
      }
      
      console.log('Chatbot agents loaded:', data?.length || 0, 'agents');
      return data || [];
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    retry: 1
  });

  // Fetch user conversations - only for authenticated users
  const { data: conversations } = useQuery({
    queryKey: ['user-conversations'],
    queryFn: async (): Promise<Conversation[]> => {
      if (!user) {
        console.log('No user, skipping conversations fetch');
        return [];
      }
      
      console.log('Fetching user conversations...');
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
      
      console.log('User conversations loaded:', data?.length || 0, 'conversations');
      return data || [];
    },
    enabled: !!user && !authLoading
  });

  // Fetch messages for current conversation - only for authenticated users
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['conversation-messages', currentConversationId],
    queryFn: async (): Promise<Message[]> => {
      if (!currentConversationId || !user) {
        console.log('No conversation ID or user, skipping messages fetch');
        return [];
      }
      
      console.log('Fetching messages for conversation:', currentConversationId);
      const { data, error } = await supabase
        .from('messages')
        .select('id, role, content, created_at')
        .eq('conversation_id', currentConversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      
      // Ensure proper typing for message roles
      const result = (data || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant' | 'system'
      }));
      
      console.log('Messages loaded:', result.length, 'messages');
      return result;
    },
    enabled: !!currentConversationId && !!user && !authLoading
  });

  // Create new conversation - requires authentication
  const createConversationMutation = useMutation({
    mutationFn: async (agentId: string): Promise<string> => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Creating new conversation with agent:', agentId);
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
      console.log('New conversation created:', data.id);
      return data.id;
    },
    onSuccess: (conversationId) => {
      setCurrentConversationId(conversationId);
      queryClient.invalidateQueries({ queryKey: ['user-conversations'] });
    }
  });

  // Send message - requires authentication
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, conversationId }: { message: string; conversationId: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Sending message to conversation:', conversationId);
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
    if (!user) {
      console.log('Cannot start conversation: user not authenticated');
      return;
    }
    
    const selectedAgentId = agentId || settings?.default_agent_id || agents?.[0]?.id;
    if (selectedAgentId) {
      await createConversationMutation.mutateAsync(selectedAgentId);
    }
  };

  const sendMessage = async (message: string) => {
    if (!user) {
      console.log('Cannot send message: user not authenticated');
      return;
    }
    
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
