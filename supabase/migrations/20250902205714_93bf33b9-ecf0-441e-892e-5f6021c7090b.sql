-- Create stories table for 24-hour temporary predictions
CREATE TABLE public.user_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  prediction_type TEXT NOT NULL,
  prediction_content JSONB NOT NULL DEFAULT '{}',
  media_url TEXT,
  media_type TEXT DEFAULT 'text',
  background_color TEXT DEFAULT '#1a1b23',
  text_color TEXT DEFAULT '#ffffff',
  views_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for user_stories
CREATE POLICY "Users can view active stories"
ON public.user_stories
FOR SELECT
USING (expires_at > now());

CREATE POLICY "Users can create their own stories"
ON public.user_stories
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories"
ON public.user_stories
FOR UPDATE
USING (auth.uid() = user_id AND expires_at > now());

CREATE POLICY "Users can delete their own stories"
ON public.user_stories
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all stories"
ON public.user_stories
FOR ALL
USING (is_admin());

-- Create story_views table to track who viewed which stories
CREATE TABLE public.story_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.user_stories(id) ON DELETE CASCADE,
  viewer_id UUID NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to prevent duplicate views
CREATE UNIQUE INDEX story_views_unique ON public.story_views(story_id, viewer_id);

-- Enable RLS
ALTER TABLE public.story_views ENABLE ROW LEVEL SECURITY;

-- Create policies for story_views
CREATE POLICY "Users can view story views for their own stories"
ON public.story_views
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_stories 
    WHERE id = story_views.story_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create story views"
ON public.story_views
FOR INSERT
WITH CHECK (auth.uid() = viewer_id);

CREATE POLICY "Admins can manage all story views"
ON public.story_views
FOR ALL
USING (is_admin());

-- Create function to update story views count
CREATE OR REPLACE FUNCTION public.update_story_views_count()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.user_stories 
    SET views_count = views_count + 1
    WHERE id = NEW.story_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.user_stories 
    SET views_count = views_count - 1
    WHERE id = OLD.story_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for story views count
CREATE TRIGGER update_story_views_count_trigger
  AFTER INSERT OR DELETE ON public.story_views
  FOR EACH ROW
  EXECUTE FUNCTION public.update_story_views_count();

-- Create function to clean up expired stories
CREATE OR REPLACE FUNCTION public.cleanup_expired_stories()
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.user_stories 
  WHERE expires_at <= now();
END;
$$;