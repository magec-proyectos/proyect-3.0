-- Update existing conversations table for direct messaging
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS conversation_type TEXT DEFAULT 'direct';
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS participant_ids UUID[] DEFAULT '{}';
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS last_message_content TEXT;

-- Create direct messages table (extending messages)
CREATE TABLE IF NOT EXISTS public.direct_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  message_content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  is_read BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  reply_to_id UUID REFERENCES public.direct_messages(id),
  attachments JSONB DEFAULT '[]',
  reactions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat participants table
CREATE TABLE IF NOT EXISTS public.chat_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_typing BOOLEAN DEFAULT false,
  typing_at TIMESTAMP WITH TIME ZONE,
  notifications_enabled BOOLEAN DEFAULT true,
  UNIQUE(conversation_id, user_id)
);

-- Enable RLS for new tables
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for direct_messages
CREATE POLICY "Users can view messages in their conversations" 
ON public.direct_messages 
FOR SELECT 
USING (
  sender_id = auth.uid() OR 
  recipient_id = auth.uid() OR
  conversation_id IN (
    SELECT conversation_id FROM public.chat_participants 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can send direct messages" 
ON public.direct_messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages" 
ON public.direct_messages 
FOR UPDATE 
USING (auth.uid() = sender_id);

-- RLS Policies for chat_participants
CREATE POLICY "Users can view their chat participations" 
ON public.chat_participants 
FOR SELECT 
USING (
  user_id = auth.uid() OR 
  conversation_id IN (
    SELECT conversation_id FROM public.chat_participants 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can join conversations" 
ON public.chat_participants 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their participation" 
ON public.chat_participants 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_direct_messages_conversation ON public.direct_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_sender ON public.direct_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_recipient ON public.direct_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_created_at ON public.direct_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_participants_conversation ON public.chat_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_user ON public.chat_participants(user_id);

-- Function to create or get direct conversation between two users
CREATE OR REPLACE FUNCTION public.get_or_create_direct_conversation(user1_id UUID, user2_id UUID)
RETURNS UUID AS $$
DECLARE
  conversation_uuid UUID;
  participant_array UUID[];
BEGIN
  -- Sort user IDs to ensure consistent ordering
  IF user1_id < user2_id THEN
    participant_array := ARRAY[user1_id, user2_id];
  ELSE
    participant_array := ARRAY[user2_id, user1_id];
  END IF;
  
  -- Try to find existing conversation
  SELECT id INTO conversation_uuid
  FROM public.conversations 
  WHERE conversation_type = 'direct' 
    AND participant_ids = participant_array
  LIMIT 1;
  
  -- If no conversation exists, create one
  IF conversation_uuid IS NULL THEN
    INSERT INTO public.conversations (
      conversation_type, 
      participant_ids,
      title,
      created_at
    ) VALUES (
      'direct',
      participant_array,
      'Direct Chat',
      now()
    ) RETURNING id INTO conversation_uuid;
    
    -- Add participants
    INSERT INTO public.chat_participants (conversation_id, user_id)
    VALUES 
      (conversation_uuid, user1_id),
      (conversation_uuid, user2_id);
  END IF;
  
  RETURN conversation_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to update conversation last message
CREATE OR REPLACE FUNCTION public.update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations 
  SET 
    last_message_at = NEW.created_at,
    last_message_content = NEW.message_content,
    updated_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for updating conversation
CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON public.direct_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_conversation_last_message();

-- Function to mark messages as read
CREATE OR REPLACE FUNCTION public.mark_messages_as_read(conv_id UUID, user_uuid UUID)
RETURNS void AS $$
BEGIN
  -- Mark all unread messages in conversation as read
  UPDATE public.direct_messages 
  SET is_read = true
  WHERE conversation_id = conv_id 
    AND recipient_id = user_uuid 
    AND is_read = false;
    
  -- Update participant's last read time
  UPDATE public.chat_participants 
  SET last_read_at = now()
  WHERE conversation_id = conv_id 
    AND user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;