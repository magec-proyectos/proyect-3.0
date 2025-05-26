
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ConversationSidebar } from './ConversationSidebar';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatbotHomeView } from './ChatbotHomeView';
import { ChatbotChatView } from './ChatbotChatView';
import { ChatbotHelpView } from './ChatbotHelpView';
import { AgentSelector } from './AgentSelector';
import { ChatbotNavigation } from './ChatbotNavigation';
import { useChatbotConversations } from '@/hooks/useChatbotConversations';
import { useChatbotMessages } from '@/hooks/useChatbotMessages';

interface Agent {
  id: string;
  name: string;
  description: string;
  specialization: string;
  avatar_url?: string;
}

interface ChatbotSettings {
  global_enabled: boolean;
  default_agent_id: string;
  max_conversation_length: number;
  chatbot_position: { bottom: string; right: string };
  welcome_message: string;
}

const GlobalChatbot: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'help' | 'agents' | 'settings'>('home');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Use our refactored hooks
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
    updateConversation,
    deleteConversation,
    isCreatingConversation
  } = useChatbotConversations();

  const {
    messages,
    messagesLoading,
    isSendingMessage,
    sendMessage
  } = useChatbotMessages(currentConversationId);

  // Fetch chatbot settings
  const { data: settings } = useQuery({
    queryKey: ['chatbot-settings'],
    queryFn: async (): Promise<ChatbotSettings> => {
      const { data, error } = await supabase
        .from('chatbot_settings')
        .select('setting_key, setting_value');

      if (error) {
        return {
          global_enabled: true,
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

      return {
        global_enabled: settingsObj.global_enabled !== false,
        default_agent_id: settingsObj.default_agent_id || '',
        max_conversation_length: settingsObj.max_conversation_length || 50,
        chatbot_position: settingsObj.chatbot_position || { bottom: '24px', right: '24px' },
        welcome_message: settingsObj.welcome_message || 'Hi! How can I help you today?'
      };
    },
    staleTime: 1000 * 60 * 5,
    retry: 1
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

      if (error) {
        console.error('Error fetching chatbot agents:', error);
        return [];
      }
      
      return data || [];
    },
    staleTime: 1000 * 60 * 10,
    retry: 1
  });

  const shouldShowChatbot = !authLoading && (settings?.global_enabled !== false);

  if (!shouldShowChatbot) {
    return null;
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !user) return;

    const messageToSend = inputMessage;
    setInputMessage('');
    
    try {
      if (!currentConversationId) {
        const selectedAgentId = settings?.default_agent_id || agents?.[0]?.id;
        if (selectedAgentId) {
          const newConversationId = await createConversation(selectedAgentId);
          await sendMessage({ message: messageToSend, conversationId: newConversationId });
        }
      } else {
        await sendMessage({ message: messageToSend, conversationId: currentConversationId });
      }
      setCurrentView('chat');
    } catch (error) {
      console.error('Failed to send message:', error);
      setInputMessage(messageToSend);
    }
  };

  const handleNewConversation = async (agentId?: string) => {
    if (!user) return;
    
    const selectedAgentId = agentId || settings?.default_agent_id || agents?.[0]?.id;
    if (selectedAgentId) {
      await createConversation(selectedAgentId);
      setCurrentView('chat');
    }
  };

  const currentAgent = agents?.find(agent => 
    conversations?.find(conv => conv.id === currentConversationId)?.agent_id === agent.id
  );

  const chatbotStyle = {
    position: 'fixed' as const,
    bottom: settings?.chatbot_position?.bottom || '24px',
    right: settings?.chatbot_position?.right || '24px',
    zIndex: 1000
  };

  return (
    <div style={chatbotStyle}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0.3 : 1, 
              y: isMinimized ? 200 : 0 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && !isMinimized && (
                <motion.div
                  initial={{ x: -340, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -340, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="absolute right-full mr-4 top-0"
                >
                  <ConversationSidebar
                    conversations={conversations || []}
                    currentConversationId={currentConversationId}
                    agents={agents || []}
                    onSelectConversation={(id) => {
                      setCurrentConversationId(id);
                      setCurrentView('chat');
                      setShowSidebar(false);
                    }}
                    onNewConversation={handleNewConversation}
                    onUpdateConversation={updateConversation}
                    onDeleteConversation={deleteConversation}
                    onClose={() => setShowSidebar(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Card className={`bg-white shadow-2xl flex flex-col overflow-hidden border-0 transition-all duration-300 ${
              isMinimized ? 'w-20 h-20 rounded-full' : 'w-80 md:w-96 h-[650px] rounded-2xl'
            }`}>
              {!isMinimized && (
                <>
                  <ChatbotHeader
                    currentView={currentView}
                    currentAgent={currentAgent}
                    showSidebar={showSidebar}
                    onViewChange={setCurrentView}
                    onToggleSidebar={() => setShowSidebar(!showSidebar)}
                    onMinimize={() => setIsMinimized(true)}
                    onClose={() => setIsOpen(false)}
                  />

                  {/* Content */}
                  <div className="flex-1 overflow-hidden bg-gray-50">
                    {currentView === 'home' && (
                      <ChatbotHomeView
                        onNewConversation={handleNewConversation}
                        onViewChange={setCurrentView}
                      />
                    )}

                    {currentView === 'help' && <ChatbotHelpView />}

                    {currentView === 'chat' && (
                      <ChatbotChatView
                        messages={messages || []}
                        messagesLoading={messagesLoading}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        onSendMessage={handleSendMessage}
                        isSendingMessage={isSendingMessage}
                        isCreatingConversation={isCreatingConversation}
                        currentAgent={currentAgent}
                        welcomeMessage={settings?.welcome_message}
                      />
                    )}

                    {currentView === 'agents' && (
                      <div className="p-6 bg-white">
                        <AgentSelector
                          agents={agents || []}
                          onSelectAgent={(agentId) => {
                            handleNewConversation(agentId);
                            setCurrentView('chat');
                          }}
                          currentAgentId={currentAgent?.id}
                        />
                      </div>
                    )}
                  </div>

                  {/* Bottom Navigation */}
                  {currentView === 'home' && (
                    <ChatbotNavigation
                      currentView={currentView}
                      onViewChange={setCurrentView}
                    />
                  )}
                </>
              )}

              {/* Minimized State */}
              {isMinimized && (
                <motion.div
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => setIsMinimized(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageSquare size={24} className="text-blue-600" />
                </motion.div>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-2xl hover:shadow-3xl border-0 transition-all duration-300 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 group"
            >
              <MessageSquare size={28} className="text-white group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalChatbot;
