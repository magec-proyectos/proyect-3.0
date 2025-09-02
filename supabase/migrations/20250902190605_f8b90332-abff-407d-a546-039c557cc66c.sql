-- Create user_posts table for prediction history
CREATE TABLE public.user_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Post Content
  content TEXT NOT NULL,
  prediction_type TEXT NOT NULL CHECK (prediction_type IN ('match_result', 'over_under', 'handicap', 'both_teams_score', 'correct_score', 'other')),
  
  -- Match Information
  match_info JSONB NOT NULL DEFAULT '{}'::jsonb, -- {home_team, away_team, league, match_date}
  prediction_details JSONB NOT NULL DEFAULT '{}'::jsonb, -- {prediction, odds, confidence, reasoning}
  
  -- Engagement
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  
  -- Status and Result
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'void', 'half_won', 'half_lost')),
  result_confirmed BOOLEAN DEFAULT false,
  result_confirmed_at TIMESTAMP WITH TIME ZONE,
  
  -- Performance tracking
  stake_amount DECIMAL(10,2),
  potential_return DECIMAL(10,2),
  actual_return DECIMAL(10,2) DEFAULT 0.00,
  
  -- Metadata
  is_premium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  confidence_score INTEGER CHECK (confidence_score >= 1 AND confidence_score <= 10),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public posts are viewable by everyone" 
ON public.user_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own posts" 
ON public.user_posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.user_posts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.user_posts 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all posts" 
ON public.user_posts 
FOR ALL 
USING (is_admin());

-- Create indexes for performance
CREATE INDEX idx_user_posts_user_id ON public.user_posts(user_id);
CREATE INDEX idx_user_posts_status ON public.user_posts(status);
CREATE INDEX idx_user_posts_created_at ON public.user_posts(created_at);
CREATE INDEX idx_user_posts_likes ON public.user_posts(likes_count);
CREATE INDEX idx_user_posts_featured ON public.user_posts(is_featured) WHERE is_featured = true;

-- Enable realtime
ALTER TABLE public.user_posts REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.user_posts;

-- Create function to update user stats when posts are created/updated
CREATE OR REPLACE FUNCTION public.update_user_stats_from_posts()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update posts count
    UPDATE public.user_profiles 
    SET posts_count = posts_count + 1
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- If result was confirmed, update prediction stats
    IF OLD.result_confirmed = false AND NEW.result_confirmed = true THEN
      UPDATE public.user_profiles 
      SET 
        total_predictions = total_predictions + 1,
        correct_predictions = CASE 
          WHEN NEW.status = 'won' THEN correct_predictions + 1
          ELSE correct_predictions
        END,
        current_streak = CASE 
          WHEN NEW.status = 'won' THEN current_streak + 1
          ELSE 0
        END,
        best_streak = CASE 
          WHEN NEW.status = 'won' AND current_streak + 1 > best_streak 
          THEN current_streak + 1
          ELSE best_streak
        END,
        total_winnings = total_winnings + COALESCE(NEW.actual_return, 0)
      WHERE user_id = NEW.user_id;
      
      -- Update win rate
      PERFORM public.update_user_win_rate(NEW.user_id);
    END IF;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update posts count
    UPDATE public.user_profiles 
    SET posts_count = posts_count - 1
    WHERE user_id = OLD.user_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$;

-- Create trigger for updating user stats
CREATE TRIGGER update_user_stats_from_posts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_stats_from_posts();

-- Create function to get user profile with stats
CREATE OR REPLACE FUNCTION public.get_user_profile_with_stats(profile_user_id UUID)
RETURNS TABLE(
  user_id UUID,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  location TEXT,
  website TEXT,
  level INTEGER,
  experience_points INTEGER,
  win_rate DECIMAL(5,2),
  total_predictions INTEGER,
  correct_predictions INTEGER,
  current_streak INTEGER,
  best_streak INTEGER,
  total_winnings DECIMAL(12,2),
  followers_count INTEGER,
  following_count INTEGER,
  posts_count INTEGER,
  likes_received INTEGER,
  is_verified BOOLEAN,
  verification_tier TEXT,
  reputation_score INTEGER,
  join_date TIMESTAMP WITH TIME ZONE,
  last_active TIMESTAMP WITH TIME ZONE,
  badges JSONB,
  achievements JSONB
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
    up.bio,
    up.avatar_url,
    up.banner_url,
    up.location,
    up.website,
    up.level,
    up.experience_points,
    up.win_rate,
    up.total_predictions,
    up.correct_predictions,
    up.current_streak,
    up.best_streak,
    up.total_winnings,
    up.followers_count,
    up.following_count,
    up.posts_count,
    up.likes_received,
    up.is_verified,
    up.verification_tier,
    up.reputation_score,
    up.join_date,
    up.last_active,
    up.badges,
    up.achievements
  FROM public.user_profiles up
  WHERE up.user_id = profile_user_id
    AND up.is_public = true;
END;
$$;