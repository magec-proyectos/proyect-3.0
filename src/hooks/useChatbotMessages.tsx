
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
  is_streaming?: boolean;
}

export const useChatbotMessages = (currentConversationId: string | null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Fetch messages for current conversation
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['conversation-messages', currentConversationId],
    queryFn: async (): Promise<Message[]> => {
      if (!currentConversationId || !user) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('messages')
        .select('id, role, content, created_at')
        .eq('conversation_id', currentConversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      
      let result: Message[] = (data || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant' | 'system'
      }));

      // Add streaming message if currently streaming
      if (isStreaming && streamingMessage) {
        result = [...result, {
          id: 'streaming',
          role: 'assistant' as const,
          content: streamingMessage,
          created_at: new Date().toISOString(),
          is_streaming: true
        }];
      }
      
      return result;
    },
    enabled: !!currentConversationId && !!user
  });

  // Send message with streaming support
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, conversationId }: { message: string; conversationId: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      setIsStreaming(true);
      setStreamingMessage('');
      
      queryClient.invalidateQueries({ queryKey: ['conversation-messages', currentConversationId] });
      
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

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = '';

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  setIsStreaming(false);
                  setStreamingMessage('');
                  break;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    accumulatedMessage += parsed.content;
                    setStreamingMessage(accumulatedMessage);
                    queryClient.invalidateQueries({ queryKey: ['conversation-messages', currentConversationId] });
                  }
                } catch (e) {
                  console.error('Error parsing streaming data:', e);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      }

      return { success: true };
    },
    onSuccess: () => {
      setIsStreaming(false);
      setStreamingMessage('');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['conversation-messages', currentConversationId] });
      }, 100);
    },
    onError: () => {
      setIsStreaming(false);
      setStreamingMessage('');
    }
  });

  return {
    messages,
    messagesLoading,
    isSendingMessage: sendMessageMutation.isPending || isStreaming,
    sendMessage: sendMessageMutation.mutateAsync
  };
};
