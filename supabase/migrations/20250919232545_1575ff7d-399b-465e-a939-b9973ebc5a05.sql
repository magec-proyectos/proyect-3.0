-- Fix security issues: Set proper search path for functions
CREATE OR REPLACE FUNCTION public.add_group_owner_as_member()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.group_memberships (group_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.generate_invitation_code()
RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(SUBSTRING(encode(gen_random_bytes(6), 'base64') FROM 1 FOR 8));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;