-- Create user_follows table for following/followers relationships
CREATE TABLE public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure a user can't follow the same person twice
  UNIQUE(follower_id, following_id),
  
  -- Ensure a user can't follow themselves
  CHECK(follower_id != following_id)
);

-- Enable RLS
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all follow relationships" 
ON public.user_follows 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own follow relationships" 
ON public.user_follows 
FOR INSERT 
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follow relationships" 
ON public.user_follows 
FOR DELETE 
USING (auth.uid() = follower_id);

CREATE POLICY "Admins can manage all follow relationships" 
ON public.user_follows 
FOR ALL 
USING (is_admin());

-- Create indexes for performance
CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);
CREATE INDEX idx_user_follows_created_at ON public.user_follows(created_at);

-- Enable realtime for follows table
ALTER TABLE public.user_follows REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.user_follows;

-- Enable realtime for user_profiles table
ALTER TABLE public.user_profiles REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.user_profiles;

-- Create function to update follower/following counts
CREATE OR REPLACE FUNCTION public.update_follow_counts()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update following count for follower
    UPDATE public.user_profiles 
    SET following_count = following_count + 1
    WHERE user_id = NEW.follower_id;
    
    -- Update followers count for followed user
    UPDATE public.user_profiles 
    SET followers_count = followers_count + 1
    WHERE user_id = NEW.following_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update following count for follower
    UPDATE public.user_profiles 
    SET following_count = following_count - 1
    WHERE user_id = OLD.follower_id;
    
    -- Update followers count for followed user
    UPDATE public.user_profiles 
    SET followers_count = followers_count - 1
    WHERE user_id = OLD.following_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$;

-- Create triggers to automatically update follow counts
CREATE TRIGGER update_follow_counts_trigger
  AFTER INSERT OR DELETE ON public.user_follows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_follow_counts();

-- Create function to get suggested users (users with high engagement not being followed)
CREATE OR REPLACE FUNCTION public.get_suggested_users(requesting_user_id UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  user_id UUID,
  display_name TEXT,
  avatar_url TEXT,
  verification_tier TEXT,
  level INTEGER,
  win_rate DECIMAL(5,2),
  followers_count INTEGER,
  reputation_score INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.user_id,
    up.display_name,
    up.avatar_url,
    up.verification_tier,
    up.level,
    up.win_rate,
    up.followers_count,
    up.reputation_score
  FROM public.user_profiles up
  WHERE up.user_id != requesting_user_id
    AND up.is_public = true
    AND up.user_id NOT IN (
      SELECT uf.following_id 
      FROM public.user_follows uf 
      WHERE uf.follower_id = requesting_user_id
    )
  ORDER BY 
    up.reputation_score DESC,
    up.followers_count DESC,
    up.win_rate DESC
  LIMIT limit_count;
END;
$$;