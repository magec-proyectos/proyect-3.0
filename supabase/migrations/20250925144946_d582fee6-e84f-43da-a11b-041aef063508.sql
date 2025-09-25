-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.user_posts 
    SET comments_count = comments_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.user_posts 
    SET comments_count = GREATEST(0, comments_count - 1)
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION notify_comment_created()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Notify post author about new comment
  INSERT INTO public.user_notifications (user_id, title, message, type, link, metadata)
  SELECT 
    up.user_id,
    'New Comment',
    (SELECT display_name FROM public.user_profiles WHERE user_id = NEW.user_id) || ' commented on your post',
    'comment',
    '/social?post=' || NEW.post_id,
    jsonb_build_object('post_id', NEW.post_id, 'comment_id', NEW.id, 'commenter_id', NEW.user_id)
  FROM public.user_posts up
  WHERE up.id = NEW.post_id 
    AND up.user_id != NEW.user_id; -- Don't notify self-comments
  
  RETURN NEW;
END;
$$;