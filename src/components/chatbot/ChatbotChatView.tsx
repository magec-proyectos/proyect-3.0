
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare, Bot, User } from 'lucide-react';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
  is_streaming?: boolean;
}

interface Agent {
  id: string;
  name: string;
  specialization: string;
}

interface ChatbotChatViewProps {
  messages: Message[];
  messagesLoading: boolean;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isSendingMessage: boolean;
  isCreatingConversation: boolean;
  currentAgent?: Agent;
  welcomeMessage?: string;
}

export const ChatbotChatView: React.FC<ChatbotChatViewProps> = ({
  messages,
  messagesLoading,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isSendingMessage,
  isCreatingConversation,
  currentAgent,
  welcomeMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ScrollArea className="flex-1 p-6 bg-white">
        {messagesLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : messages?.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h4>
            <p className="text-gray-600 text-sm max-w-xs mx-auto mb-4">
              {welcomeMessage || 'Ask me anything! I\'m here to help you get the most out of our platform.'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['How does it work?', 'Getting started', 'Best practices'].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {messages?.map((message, index) => (
              <motion.div 
                key={message.id} 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot size={14} className="text-white" />
                    </div>
                    <span className="font-medium">{currentAgent?.name || 'AI Assistant'}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">Just now</span>
                  </div>
                )}
                <div className={`${message.role === 'user' ? 'ml-8' : ''}`}>
                  <div className={`p-4 rounded-2xl text-sm transition-all ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto max-w-[85%] rounded-br-md shadow-lg'
                      : 'bg-gray-100 text-gray-900 max-w-[90%] rounded-bl-md hover:bg-gray-50'
                  } ${message.is_streaming ? 'animate-pulse' : ''}`}>
                    <div className="leading-relaxed">{message.content}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isSendingMessage && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Enhanced Input */}
      <form onSubmit={onSendMessage} className="p-6 border-t border-gray-200 bg-white">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="pr-12 py-3 bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl transition-all"
              disabled={isSendingMessage || isCreatingConversation}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!inputMessage.trim() || isSendingMessage || isCreatingConversation}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Send size={14} />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
