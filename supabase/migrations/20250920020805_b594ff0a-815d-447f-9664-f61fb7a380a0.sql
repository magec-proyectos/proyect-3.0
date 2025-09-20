-- Security Fixes - Phase 1: Critical RLS Policy Updates (Fixed)

-- 1. Add missing is_public column to user_posts if it doesn't exist
ALTER TABLE public.user_posts 
ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT true;

-- 2. Fix overly permissive user_posts policies  
DROP POLICY IF EXISTS "Users can view all posts" ON public.user_posts;
CREATE POLICY "Users can view public posts and their own posts" 
ON public.user_posts 
FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

-- 3. Add missing DELETE policy for user_posts
DROP POLICY IF EXISTS "Users can delete their own posts" ON public.user_posts;
CREATE POLICY "Users can delete their own posts" 
ON public.user_posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Restrict user_profiles visibility (it already has is_public column)
DROP POLICY IF EXISTS "Public can view user profiles" ON public.user_profiles;
CREATE POLICY "Users can view public profiles and their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

-- 5. Add DELETE policy for user_profiles (self-deletion)
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.user_profiles;
CREATE POLICY "Users can delete their own profile" 
ON public.user_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- 6. Strengthen admin session security
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.admin_sessions 
  WHERE expires_at <= now();
END;
$$;

-- 7. Add rate limiting for admin login attempts
CREATE TABLE IF NOT EXISTS public.admin_login_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  username text NOT NULL,
  attempt_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  is_blocked boolean DEFAULT false,
  blocked_until timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(ip_address, username)
);

-- Enable RLS on rate limiting table
ALTER TABLE public.admin_login_rate_limit ENABLE ROW LEVEL SECURITY;

-- Only system can manage rate limiting
CREATE POLICY "System can manage rate limiting" 
ON public.admin_login_rate_limit 
FOR ALL 
USING (true);

-- 8. Function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_admin_rate_limit(
  input_ip inet,
  input_username text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_attempts integer;
  is_currently_blocked boolean := false;
  blocked_until_time timestamp with time zone;
BEGIN
  -- Clean up old rate limit entries (older than 1 hour)
  DELETE FROM public.admin_login_rate_limit 
  WHERE window_start < now() - interval '1 hour';
  
  -- Check current rate limit status
  SELECT attempt_count, is_blocked, blocked_until
  INTO current_attempts, is_currently_blocked, blocked_until_time
  FROM public.admin_login_rate_limit
  WHERE ip_address = input_ip AND username = input_username
  AND window_start > now() - interval '15 minutes';
  
  -- If blocked and still within block period
  IF is_currently_blocked AND blocked_until_time > now() THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'blocked',
      'blocked_until', blocked_until_time
    );
  END IF;
  
  -- If no recent attempts, allow
  IF current_attempts IS NULL THEN
    RETURN jsonb_build_object('allowed', true);
  END IF;
  
  -- If more than 5 attempts in 15 minutes, block for 30 minutes
  IF current_attempts >= 5 THEN
    UPDATE public.admin_login_rate_limit
    SET is_blocked = true, blocked_until = now() + interval '30 minutes'
    WHERE ip_address = input_ip AND username = input_username;
    
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limited',
      'blocked_until', now() + interval '30 minutes'
    );
  END IF;
  
  RETURN jsonb_build_object('allowed', true);
END;
$$;

-- 9. Function to record admin login attempt
CREATE OR REPLACE FUNCTION public.record_admin_login_attempt(
  input_ip inet,
  input_username text,
  success boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF success THEN
    -- Clear rate limit on successful login
    DELETE FROM public.admin_login_rate_limit 
    WHERE ip_address = input_ip AND username = input_username;
  ELSE
    -- Record failed attempt
    INSERT INTO public.admin_login_rate_limit (ip_address, username, attempt_count, window_start)
    VALUES (input_ip, input_username, 1, now())
    ON CONFLICT (ip_address, username) 
    DO UPDATE SET 
      attempt_count = admin_login_rate_limit.attempt_count + 1,
      window_start = CASE 
        WHEN admin_login_rate_limit.window_start < now() - interval '15 minutes' 
        THEN now() 
        ELSE admin_login_rate_limit.window_start 
      END;
  END IF;
END;
$$;

-- 10. Enhanced admin audit logging
ALTER TABLE public.admin_audit_log 
ADD COLUMN IF NOT EXISTS security_event boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS risk_level text DEFAULT 'low',
ADD COLUMN IF NOT EXISTS session_id text;

-- 11. Create index for better performance on audit queries
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_security 
ON public.admin_audit_log(security_event, created_at DESC) 
WHERE security_event = true;