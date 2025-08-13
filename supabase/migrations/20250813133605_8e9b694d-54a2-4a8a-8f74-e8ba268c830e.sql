-- Fix critical security vulnerability in admin_sessions table
-- Remove the overly permissive policy that allows public access to all session data
DROP POLICY IF EXISTS "Admin sessions can be managed" ON public.admin_sessions;

-- Create secure policies for admin sessions

-- Allow system to create new sessions during login
CREATE POLICY "System can create admin sessions" 
ON public.admin_sessions 
FOR INSERT 
WITH CHECK (true);

-- Allow session verification for valid sessions only (needed for authentication flow)
CREATE POLICY "Sessions can be verified for authentication" 
ON public.admin_sessions 
FOR SELECT 
USING (
  -- Only allow reading sessions that are not expired
  expires_at > now()
);

-- Allow updating sessions (for extending session time if needed)
CREATE POLICY "Valid sessions can be updated" 
ON public.admin_sessions 
FOR UPDATE 
USING (
  expires_at > now()
) 
WITH CHECK (
  expires_at > now()
);

-- Allow deleting sessions for logout
CREATE POLICY "Sessions can be deleted for logout" 
ON public.admin_sessions 
FOR DELETE 
USING (true);

-- Ensure admin_sessions table has proper RLS enabled
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;