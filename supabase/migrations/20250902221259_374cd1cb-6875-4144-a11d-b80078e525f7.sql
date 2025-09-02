-- Create reactions table
CREATE TABLE public.post_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'money', 'fire', 'lightning', 'surprised')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id, reaction_type)
);

-- Enable Row Level Security
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;

-- Create policies for post reactions
CREATE POLICY "Users can view all reactions" 
ON public.post_reactions 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own reactions" 
ON public.post_reactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions" 
ON public.post_reactions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update post reaction counts
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for reaction counts
CREATE TRIGGER update_post_reaction_counts_trigger
AFTER INSERT OR DELETE ON public.post_reactions
FOR EACH ROW
EXECUTE FUNCTION public.update_post_reaction_counts();

-- Add reactions_summary column to user_posts for caching reaction counts
ALTER TABLE public.user_posts 
ADD COLUMN reactions_summary JSONB DEFAULT '{
  "like": 0,
  "money": 0, 
  "fire": 0,
  "lightning": 0,
  "surprised": 0
}'::jsonb;

-- Function to get reaction counts for a post
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update reactions summary when reactions change
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating reactions summary
CREATE TRIGGER update_reactions_summary_trigger
AFTER INSERT OR DELETE ON public.post_reactions
FOR EACH ROW
EXECUTE FUNCTION public.update_reactions_summary();