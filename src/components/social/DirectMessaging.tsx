import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmojiPicker } from '@/components/ui/emoji-picker';
import { 
  MessageCircle, 
  Send, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Plus,
  Smile,
  Paperclip,
  Check,
  CheckCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface DirectMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  message_content: string;
  is_read: boolean;
  created_at: string;
  sender_profile?: {
    display_name: string;
    avatar_url?: string;
  };
}

interface Conversation {
  id: string;
  participant_ids: string[];
  last_message_content?: string;
  last_message_at: string;
  unread_count?: number;
  other_user?: {
    id: string;
    display_name: string;
    avatar_url?: string;
    verification_tier: string;
  };
}

interface DirectMessagingProps {
  selectedUserId?: string;
  onClose?: () => void;
}

const DirectMessaging: React.FC<DirectMessagingProps> = ({ selectedUserId, onClose }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedUserId && user) {
      createOrOpenConversation(selectedUserId);
    }
  }, [selectedUserId, user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      markMessagesAsRead(selectedConversation);
      
      // Set up real-time subscription for new messages
      const subscription = supabase
        .channel(`conversation-${selectedConversation}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'direct_messages',
            filter: `conversation_id=eq.${selectedConversation}`
          },
          (payload) => {
            const newMessage = payload.new as DirectMessage;
            setMessages(prev => [...prev, newMessage]);
            
            // Mark as read if current user is recipient
            if (newMessage.recipient_id === user?.id) {
              markMessagesAsRead(selectedConversation);
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedConversation, user]);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          participant_ids,
          last_message_content,
          last_message_at,
          chat_participants!inner(user_id)
        `)
        .eq('conversation_type', 'direct')
        .contains('participant_ids', [user?.id])
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // Get other participants' profiles
      const conversationsWithProfiles = await Promise.all(
        (data || []).map(async (conv: any) => {
          const otherUserId = conv.participant_ids.find((id: string) => id !== user?.id);
          
          if (otherUserId) {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('display_name, avatar_url, verification_tier')
              .eq('user_id', otherUserId)
              .single();

            // Get unread count
            const { count } = await supabase
              .from('direct_messages')
              .select('*', { count: 'exact', head: true })
              .eq('conversation_id', conv.id)
              .eq('recipient_id', user?.id)
              .eq('is_read', false);

            return {
              ...conv,
              other_user: profile ? { id: otherUserId, ...profile } : undefined,
              unread_count: count || 0
            } as Conversation;
          }
          return conv;
        })
      );

      setConversations(conversationsWithProfiles.filter(conv => conv.other_user) as Conversation[]);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrOpenConversation = async (otherUserId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_or_create_direct_conversation', {
        user1_id: user?.id,
        user2_id: otherUserId
      });

      if (error) throw error;
      
      setSelectedConversation(data);
      fetchConversations(); // Refresh conversations list
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive"
      });
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('direct_messages')
        .select(`
          *,
          sender_profile:user_profiles!sender_id(display_name, avatar_url)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data as any || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    const conversation = conversations.find(c => c.id === selectedConversation);
    const recipientId = conversation?.other_user?.id;

    if (!recipientId) return;

    try {
      const { error } = await supabase
        .from('direct_messages')
        .insert([
          {
            conversation_id: selectedConversation,
            sender_id: user.id,
            recipient_id: recipientId,
            message_content: newMessage.trim()
          }
        ]);

      if (error) throw error;

      setNewMessage('');
      fetchConversations(); // Refresh to update last message
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  const markMessagesAsRead = async (conversationId: string) => {
    if (!user) return;

    try {
      await supabase.rpc('mark_messages_as_read', {
        conv_id: conversationId,
        user_uuid: user.id
      });
      
      fetchConversations(); // Refresh to update unread counts
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.other_user?.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="flex h-[600px] bg-card border border-border rounded-lg overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Messages
            </h2>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            )}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                    <div className="h-10 w-10 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                      <div className="h-3 bg-muted rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id ? 'bg-primary/10 border border-primary/30' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.other_user?.avatar_url} />
                        <AvatarFallback>
                          {conversation.other_user?.display_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Online status indicator could go here */}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">
                          {conversation.other_user?.display_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.last_message_content || 'No messages yet'}
                        </p>
                        {conversation.unread_count! > 0 && (
                          <Badge variant="default" className="text-xs min-w-5 h-5 flex items-center justify-center">
                            {conversation.unread_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedConv.other_user?.avatar_url} />
                  <AvatarFallback>
                    {selectedConv.other_user?.display_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConv.other_user?.display_name}</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.sender_id === user?.id ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm emoji-font" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>
                          {message.message_content}
                        </p>
                      </div>
                      
                      <div className={`flex items-center mt-1 space-x-1 ${
                        message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                      }`}>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </p>
                        {message.sender_id === user?.id && (
                          <div className="text-xs text-muted-foreground">
                            {message.is_read ? (
                              <CheckCheck className="h-3 w-3 text-primary" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <EmojiPicker
                      onEmojiSelect={(emoji) => setNewMessage(prev => prev + emoji)}
                      isOpen={showEmojiPicker}
                      onOpenChange={setShowEmojiPicker}
                    />
                  </div>
                </div>
                
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-sm text-muted-foreground">
                Choose a conversation from the sidebar to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessaging;