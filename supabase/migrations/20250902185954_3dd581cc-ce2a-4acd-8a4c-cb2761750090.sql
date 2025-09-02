-- Create user_profiles table with detailed statistics and gamification
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Profile Info
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  location TEXT,
  website TEXT,
  
  -- Statistics
  total_predictions INTEGER DEFAULT 0,
  correct_predictions INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0.00,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_winnings DECIMAL(12,2) DEFAULT 0.00,
  
  -- Level System
  level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  next_level_xp INTEGER DEFAULT 100,
  
  -- Badges and Achievements (JSON array of badge objects)
  badges JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  
  -- Social Statistics
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  likes_received INTEGER DEFAULT 0,
  comments_received INTEGER DEFAULT 0,
  
  -- Verification and Status
  is_verified BOOLEAN DEFAULT false,
  verification_tier TEXT DEFAULT 'none' CHECK (verification_tier IN ('none', 'verified', 'expert', 'legend')),
  
  -- Premium Features
  is_premium BOOLEAN DEFAULT false,
  premium_since TIMESTAMP WITH TIME ZONE,
  premium_tier TEXT DEFAULT 'none' CHECK (premium_tier IN ('none', 'basic', 'pro', 'vip')),
  
  -- Reputation System
  reputation_score INTEGER DEFAULT 0,
  trust_score DECIMAL(3,2) DEFAULT 0.00,
  
  -- Activity Tracking
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  join_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  total_login_days INTEGER DEFAULT 1,
  
  -- Preferences
  is_public BOOLEAN DEFAULT true,
  show_statistics BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.user_profiles 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all profiles" 
ON public.user_profiles 
FOR ALL 
USING (is_admin());

-- Create indexes for performance
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_user_profiles_level ON public.user_profiles(level);
CREATE INDEX idx_user_profiles_win_rate ON public.user_profiles(win_rate);
CREATE INDEX idx_user_profiles_reputation ON public.user_profiles(reputation_score);
CREATE INDEX idx_user_profiles_verification ON public.user_profiles(verification_tier);
CREATE INDEX idx_user_profiles_public ON public.user_profiles(is_public) WHERE is_public = true;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_profiles_updated_at();

-- Create function to auto-create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    user_id,
    display_name,
    join_date
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto-creating profile on user signup
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

-- Create function to calculate win rate
CREATE OR REPLACE FUNCTION public.update_user_win_rate(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles 
  SET win_rate = CASE 
    WHEN total_predictions > 0 
    THEN ROUND((correct_predictions::DECIMAL / total_predictions::DECIMAL) * 100, 2)
    ELSE 0.00
  END
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update user level based on XP
CREATE OR REPLACE FUNCTION public.update_user_level(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
  current_xp INTEGER;
  new_level INTEGER;
  xp_for_next INTEGER;
BEGIN
  SELECT experience_points INTO current_xp 
  FROM public.user_profiles 
  WHERE user_id = user_uuid;
  
  -- Calculate level (every 100 XP = 1 level, exponential growth)
  new_level := FLOOR(SQRT(current_xp / 100)) + 1;
  xp_for_next := (new_level * new_level) * 100;
  
  UPDATE public.user_profiles 
  SET 
    level = new_level,
    next_level_xp = xp_for_next
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;