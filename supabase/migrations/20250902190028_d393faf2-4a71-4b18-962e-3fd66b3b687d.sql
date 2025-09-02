-- Fix security warnings by adding proper search_path to functions

-- Update update_user_profiles_updated_at function
CREATE OR REPLACE FUNCTION public.update_user_profiles_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update handle_new_user_profile function  
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Update update_user_win_rate function
CREATE OR REPLACE FUNCTION public.update_user_win_rate(user_uuid UUID)
RETURNS VOID 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.user_profiles 
  SET win_rate = CASE 
    WHEN total_predictions > 0 
    THEN ROUND((correct_predictions::DECIMAL / total_predictions::DECIMAL) * 100, 2)
    ELSE 0.00
  END
  WHERE user_id = user_uuid;
END;
$$;

-- Update update_user_level function
CREATE OR REPLACE FUNCTION public.update_user_level(user_uuid UUID)
RETURNS VOID 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;