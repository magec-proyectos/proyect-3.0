-- Create verification_requests table
CREATE TABLE public.verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Request details
  requested_tier TEXT NOT NULL CHECK (requested_tier IN ('verified', 'expert', 'legend')),
  reason TEXT NOT NULL,
  supporting_evidence JSONB DEFAULT '{}'::jsonb, -- {portfolio_url, social_links, achievements, etc}
  
  -- Admin review
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  
  -- Requirements check
  meets_requirements BOOLEAN DEFAULT false,
  requirements_details JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own verification requests" 
ON public.verification_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own verification requests" 
ON public.verification_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their pending requests" 
ON public.verification_requests 
FOR UPDATE 
USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins can manage all verification requests" 
ON public.verification_requests 
FOR ALL 
USING (is_admin());

-- Create indexes
CREATE INDEX idx_verification_requests_user_id ON public.verification_requests(user_id);
CREATE INDEX idx_verification_requests_status ON public.verification_requests(status);
CREATE INDEX idx_verification_requests_tier ON public.verification_requests(requested_tier);
CREATE INDEX idx_verification_requests_created_at ON public.verification_requests(created_at);

-- Enable realtime
ALTER TABLE public.verification_requests REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.verification_requests;

-- Create function to check verification requirements
CREATE OR REPLACE FUNCTION public.check_verification_requirements(user_uuid UUID, tier TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_data RECORD;
  requirements JSONB := '{}'::jsonb;
  meets_all BOOLEAN := true;
BEGIN
  -- Get user profile data
  SELECT * INTO profile_data 
  FROM public.user_profiles 
  WHERE user_id = user_uuid;
  
  IF profile_data IS NULL THEN
    RETURN jsonb_build_object(
      'meets_requirements', false,
      'error', 'Profile not found'
    );
  END IF;
  
  -- Check requirements based on tier
  CASE tier
    WHEN 'verified' THEN
      requirements := jsonb_build_object(
        'min_predictions', 50,
        'min_win_rate', 60.0,
        'min_followers', 25,
        'min_level', 5,
        'account_age_days', 30
      );
      
      IF profile_data.total_predictions < 50 THEN meets_all := false; END IF;
      IF profile_data.win_rate < 60.0 THEN meets_all := false; END IF;
      IF profile_data.followers_count < 25 THEN meets_all := false; END IF;
      IF profile_data.level < 5 THEN meets_all := false; END IF;
      IF profile_data.join_date > now() - INTERVAL '30 days' THEN meets_all := false; END IF;
      
    WHEN 'expert' THEN
      requirements := jsonb_build_object(
        'min_predictions', 200,
        'min_win_rate', 75.0,
        'min_followers', 100,
        'min_level', 15,
        'min_streak', 10,
        'account_age_days', 90
      );
      
      IF profile_data.total_predictions < 200 THEN meets_all := false; END IF;
      IF profile_data.win_rate < 75.0 THEN meets_all := false; END IF;
      IF profile_data.followers_count < 100 THEN meets_all := false; END IF;
      IF profile_data.level < 15 THEN meets_all := false; END IF;
      IF profile_data.best_streak < 10 THEN meets_all := false; END IF;
      IF profile_data.join_date > now() - INTERVAL '90 days' THEN meets_all := false; END IF;
      
    WHEN 'legend' THEN
      requirements := jsonb_build_object(
        'min_predictions', 500,
        'min_win_rate', 85.0,
        'min_followers', 500,
        'min_level', 30,
        'min_streak', 25,
        'min_reputation', 1000,
        'account_age_days', 180
      );
      
      IF profile_data.total_predictions < 500 THEN meets_all := false; END IF;
      IF profile_data.win_rate < 85.0 THEN meets_all := false; END IF;
      IF profile_data.followers_count < 500 THEN meets_all := false; END IF;
      IF profile_data.level < 30 THEN meets_all := false; END IF;
      IF profile_data.best_streak < 25 THEN meets_all := false; END IF;
      IF profile_data.reputation_score < 1000 THEN meets_all := false; END IF;
      IF profile_data.join_date > now() - INTERVAL '180 days' THEN meets_all := false; END IF;
  END CASE;
  
  RETURN jsonb_build_object(
    'meets_requirements', meets_all,
    'requirements', requirements,
    'current_stats', jsonb_build_object(
      'predictions', profile_data.total_predictions,
      'win_rate', profile_data.win_rate,
      'followers', profile_data.followers_count,
      'level', profile_data.level,
      'best_streak', profile_data.best_streak,
      'reputation', profile_data.reputation_score,
      'account_age_days', EXTRACT(days FROM now() - profile_data.join_date)
    )
  );
END;
$$;

-- Create function for automatic verification check
CREATE OR REPLACE FUNCTION public.auto_verify_user(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_data RECORD;
  verification_check JSONB;
  new_tier TEXT;
BEGIN
  -- Get current profile
  SELECT * INTO profile_data 
  FROM public.user_profiles 
  WHERE user_id = user_uuid;
  
  IF profile_data IS NULL THEN
    RETURN false;
  END IF;
  
  -- Don't downgrade existing verification
  IF profile_data.verification_tier IN ('expert', 'legend') THEN
    RETURN false;
  END IF;
  
  -- Check for legend tier first
  verification_check := public.check_verification_requirements(user_uuid, 'legend');
  IF (verification_check->>'meets_requirements')::boolean = true THEN
    new_tier := 'legend';
  ELSE
    -- Check for expert tier
    verification_check := public.check_verification_requirements(user_uuid, 'expert');
    IF (verification_check->>'meets_requirements')::boolean = true THEN
      new_tier := 'expert';
    ELSE
      -- Check for verified tier
      verification_check := public.check_verification_requirements(user_uuid, 'verified');
      IF (verification_check->>'meets_requirements')::boolean = true THEN
        new_tier := 'verified';
      ELSE
        RETURN false;
      END IF;
    END IF;
  END IF;
  
  -- Update user verification
  UPDATE public.user_profiles 
  SET 
    verification_tier = new_tier,
    is_verified = true,
    updated_at = now()
  WHERE user_id = user_uuid;
  
  RETURN true;
END;
$$;

-- Create trigger to auto-check verification when profile updates
CREATE OR REPLACE FUNCTION public.auto_check_verification()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only check if stats improved significantly
  IF NEW.total_predictions > OLD.total_predictions OR 
     NEW.win_rate > OLD.win_rate OR 
     NEW.followers_count > OLD.followers_count OR
     NEW.level > OLD.level THEN
    
    -- Perform auto-verification check
    PERFORM public.auto_verify_user(NEW.user_id);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for auto verification
CREATE TRIGGER auto_check_verification_trigger
  AFTER UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_check_verification();

-- Create function to approve verification request
CREATE OR REPLACE FUNCTION public.approve_verification_request(request_id UUID, admin_user_id UUID, notes TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_data RECORD;
BEGIN
  -- Get request details
  SELECT * INTO request_data 
  FROM public.verification_requests 
  WHERE id = request_id AND status = 'pending';
  
  IF request_data IS NULL THEN
    RETURN false;
  END IF;
  
  -- Update verification request
  UPDATE public.verification_requests 
  SET 
    status = 'approved',
    reviewed_by = admin_user_id,
    reviewed_at = now(),
    admin_notes = notes,
    updated_at = now()
  WHERE id = request_id;
  
  -- Update user profile
  UPDATE public.user_profiles 
  SET 
    verification_tier = request_data.requested_tier,
    is_verified = true,
    updated_at = now()
  WHERE user_id = request_data.user_id;
  
  RETURN true;
END;
$$;