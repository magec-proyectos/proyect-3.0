-- Fix critical security vulnerability in profiles table
-- Drop existing policies that may allow unauthorized access
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create secure policies that explicitly require authentication

-- Allow authenticated admins to view all profiles
CREATE POLICY "Authenticated admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND is_admin(auth.uid())
);

-- Allow authenticated admins to update all profiles
CREATE POLICY "Authenticated admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND is_admin(auth.uid())
);

-- Allow authenticated users to view their own profile only
CREATE POLICY "Authenticated users can view own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND auth.uid() = id
);

-- Allow authenticated users to update their own profile only
CREATE POLICY "Authenticated users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND auth.uid() = id
);

-- Ensure profiles table has proper RLS enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;