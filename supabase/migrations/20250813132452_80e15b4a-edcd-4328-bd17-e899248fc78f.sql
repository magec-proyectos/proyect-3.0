-- Fix critical security vulnerability in admin_users table
-- Remove the overly permissive policy that allows public access
DROP POLICY IF EXISTS "Admin users can view their own data" ON public.admin_users;

-- Create a secure policy that only allows authenticated admin sessions to view admin data
CREATE POLICY "Only authenticated admins can view admin data" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.admin_sessions 
    WHERE admin_user_id = admin_users.id 
    AND expires_at > now()
    AND session_token IN (
      SELECT session_token 
      FROM public.admin_sessions 
      WHERE admin_user_id = admin_users.id 
      AND expires_at > now()
    )
  )
);

-- Ensure admin_users table has proper RLS enabled (should already be enabled)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;