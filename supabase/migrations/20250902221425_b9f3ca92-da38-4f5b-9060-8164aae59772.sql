-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.update_post_reaction_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update the specific reaction count based on type
    CASE NEW.reaction_type
      WHEN 'like' THEN
        UPDATE public.user_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
      ELSE
        -- For other reactions, we'll handle them separately
        NULL;
    END CASE;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrease the specific reaction count based on type
    CASE OLD.reaction_type
      WHEN 'like' THEN
        UPDATE public.user_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
      ELSE
        -- For other reactions, we'll handle them separately
        NULL;
    END CASE;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix security warning for get_post_reactions function
CREATE OR REPLACE FUNCTION public.get_post_reactions(post_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  reaction_counts JSONB;
BEGIN
  SELECT jsonb_object_agg(reaction_type, count)
  INTO reaction_counts
  FROM (
    SELECT reaction_type, COUNT(*)::integer as count
    FROM public.post_reactions
    WHERE post_id = post_uuid
    GROUP BY reaction_type
  ) reaction_data;
  
  RETURN COALESCE(reaction_counts, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix security warning for update_reactions_summary function
CREATE OR REPLACE FUNCTION public.update_reactions_summary()
RETURNS TRIGGER AS $$
DECLARE
  target_post_id UUID;
  new_summary JSONB;
BEGIN
  -- Get the post_id from either NEW or OLD
  target_post_id := COALESCE(NEW.post_id, OLD.post_id);
  
  -- Get updated reaction counts
  new_summary := public.get_post_reactions(target_post_id);
  
  -- Update the post with new summary
  UPDATE public.user_posts 
  SET reactions_summary = new_summary
  WHERE id = target_post_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;