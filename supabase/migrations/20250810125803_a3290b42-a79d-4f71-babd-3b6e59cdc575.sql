-- Fix Critical Security Issues: Enable RLS and Create Policies

-- 1. Enable RLS on unprotected tables
ALTER TABLE public.betting_markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_teams ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.api_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_competitions ENABLE ROW LEVEL SECURITY;

-- 2. Create RLS policies for betting_markets
CREATE POLICY "Public can view active betting markets" 
ON public.betting_markets 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage betting markets" 
ON public.betting_markets 
FOR ALL 
USING (is_admin());

-- 3. Create RLS policies for sports_teams
CREATE POLICY "Public can view active sports teams" 
ON public.sports_teams 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage sports teams" 
ON public.sports_teams 
FOR ALL 
USING (is_admin());

-- 4. Create RLS policies for sports_competitions (admin only access)
CREATE POLICY "Public can view active competitions" 
ON public.sports_competitions 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage competitions" 
ON public.sports_competitions 
FOR ALL 
USING (is_admin());

-- 5. Create RLS policies for api_configurations (admin only access)
CREATE POLICY "Admins can manage API configurations" 
ON public.api_configurations 
FOR ALL 
USING (is_admin());

-- 6. Fix database function security - Add secure search_path
CREATE OR REPLACE FUNCTION public.verify_admin_password(input_username text, input_password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- Check if user exists and password matches using crypt
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE username = input_username 
    AND password_hash = crypt(input_password, password_hash)
    AND is_active = true
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.verify_admin_password_internal(input_username text, input_password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- Check if user exists and password matches using crypt
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE username = input_username 
    AND password_hash = crypt(input_password, password_hash)
    AND is_active = true
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$function$;

-- 7. Add audit table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id uuid NOT NULL,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs" 
ON public.admin_audit_log 
FOR SELECT 
USING (is_admin());

-- 8. Add failed login attempts tracking
CREATE TABLE IF NOT EXISTS public.failed_login_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL,
  ip_address inet NOT NULL,
  user_agent text,
  attempted_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.failed_login_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view failed login attempts" 
ON public.failed_login_attempts 
FOR SELECT 
USING (is_admin());

CREATE POLICY "System can log failed attempts" 
ON public.failed_login_attempts 
FOR INSERT 
WITH CHECK (true);