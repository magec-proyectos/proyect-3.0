-- Fix security warnings by setting search_path for the notification functions
CREATE OR REPLACE FUNCTION public.notify_post_liked()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;

-- Fix security warnings by setting search_path for the notification functions
CREATE OR REPLACE FUNCTION public.notify_post_commented()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;

-- Fix security warnings by setting search_path for the notification functions
CREATE OR REPLACE FUNCTION public.notify_new_follower()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;