-- Create push_subscriptions table for storing user push notification subscriptions
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT,
  auth TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index on user_id to prevent duplicate subscriptions
CREATE UNIQUE INDEX push_subscriptions_user_id_unique ON public.push_subscriptions(user_id);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own push subscriptions"
ON public.push_subscriptions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create user_notifications table for storing notifications
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for user_notifications
CREATE POLICY "Users can view their own notifications"
ON public.user_notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications for users"
ON public.user_notifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications"
ON public.user_notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications"
ON public.user_notifications
FOR ALL
USING (is_admin());

-- Create function to send notifications for likes
CREATE OR REPLACE FUNCTION public.notify_post_liked()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for post author
  INSERT INTO public.user_notifications (user_id, title, message, type, link)
  SELECT 
    up.user_id,
    '❤️ New Like',
    (SELECT display_name FROM public.user_profiles WHERE user_id = NEW.user_id) || ' liked your prediction',
    'like',
    '/social'
  FROM public.user_posts up
  WHERE up.id = NEW.post_id
    AND up.user_id != NEW.user_id; -- Don't notify self-likes
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to send notifications for comments
CREATE OR REPLACE FUNCTION public.notify_post_commented()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for post author
  INSERT INTO public.user_notifications (user_id, title, message, type, link)
  SELECT 
    up.user_id,
    '💬 New Comment',
    (SELECT display_name FROM public.user_profiles WHERE user_id = NEW.user_id) || ' commented on your prediction',
    'comment',
    '/social'
  FROM public.user_posts up
  WHERE up.id = NEW.post_id
    AND up.user_id != NEW.user_id; -- Don't notify self-comments
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to send notifications for follows
CREATE OR REPLACE FUNCTION public.notify_new_follower()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for followed user
  INSERT INTO public.user_notifications (user_id, title, message, type, link)
  VALUES (
    NEW.following_id,
    '👥 New Follower',
    (SELECT display_name FROM public.user_profiles WHERE user_id = NEW.follower_id) || ' started following you!',
    'follow',
    '/profile'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;