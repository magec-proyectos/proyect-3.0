-- Create private groups for VIP predictions
CREATE TABLE public.private_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  is_vip BOOLEAN NOT NULL DEFAULT false,
  max_members INTEGER DEFAULT 50,
  is_invite_only BOOLEAN NOT NULL DEFAULT true,
  cover_image_url TEXT,
  group_type TEXT NOT NULL DEFAULT 'prediction',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group memberships table
CREATE TABLE public.group_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.private_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  invited_by UUID,
  status TEXT NOT NULL DEFAULT 'active',
  UNIQUE(group_id, user_id)
);

-- Create group posts table for VIP content
CREATE TABLE public.group_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.private_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  prediction_type TEXT NOT NULL,
  match_info JSONB NOT NULL DEFAULT '{}',
  prediction_details JSONB NOT NULL DEFAULT '{}',
  is_vip_content BOOLEAN NOT NULL DEFAULT false,
  confidence_level INTEGER DEFAULT 70,
  stake_amount NUMERIC,
  potential_return NUMERIC,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group invitations table
CREATE TABLE public.group_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.private_groups(id) ON DELETE CASCADE,
  invited_user_id UUID NOT NULL,
  invited_by UUID NOT NULL,
  invitation_code TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.private_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for private_groups
CREATE POLICY "Users can view groups they are members of" 
ON public.private_groups 
FOR SELECT 
USING (
  id IN (
    SELECT group_id FROM public.group_memberships 
    WHERE user_id = auth.uid() AND status = 'active'
  )
);

CREATE POLICY "Users can create their own groups" 
ON public.private_groups 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Group owners can update their groups" 
ON public.private_groups 
FOR UPDATE 
USING (auth.uid() = owner_id);

-- RLS Policies for group_memberships
CREATE POLICY "Users can view memberships of their groups" 
ON public.group_memberships 
FOR SELECT 
USING (
  user_id = auth.uid() OR 
  group_id IN (
    SELECT group_id FROM public.group_memberships 
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "Users can join groups through invitations" 
ON public.group_memberships 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.group_invitations 
    WHERE invited_user_id = auth.uid() 
    AND group_id = group_memberships.group_id 
    AND status = 'pending'
    AND expires_at > now()
  )
);

-- RLS Policies for group_posts
CREATE POLICY "Group members can view group posts" 
ON public.group_posts 
FOR SELECT 
USING (
  group_id IN (
    SELECT group_id FROM public.group_memberships 
    WHERE user_id = auth.uid() AND status = 'active'
  )
);

CREATE POLICY "Group members can create posts in their groups" 
ON public.group_posts 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND
  group_id IN (
    SELECT group_id FROM public.group_memberships 
    WHERE user_id = auth.uid() AND status = 'active'
  )
);

CREATE POLICY "Users can update their own group posts" 
ON public.group_posts 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for group_invitations
CREATE POLICY "Users can view their own invitations" 
ON public.group_invitations 
FOR SELECT 
USING (invited_user_id = auth.uid());

CREATE POLICY "Group owners can create invitations" 
ON public.group_invitations 
FOR INSERT 
WITH CHECK (
  auth.uid() = invited_by AND
  group_id IN (
    SELECT group_id FROM public.group_memberships 
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- Create indexes for performance
CREATE INDEX idx_group_memberships_user_id ON public.group_memberships(user_id);
CREATE INDEX idx_group_memberships_group_id ON public.group_memberships(group_id);
CREATE INDEX idx_group_posts_group_id ON public.group_posts(group_id);
CREATE INDEX idx_group_posts_created_at ON public.group_posts(created_at DESC);
CREATE INDEX idx_group_invitations_user_id ON public.group_invitations(invited_user_id);

-- Create function to auto-add group owner as member
CREATE OR REPLACE FUNCTION public.add_group_owner_as_member()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.group_memberships (group_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically add owner as member
CREATE TRIGGER add_owner_as_member_trigger
  AFTER INSERT ON public.private_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.add_group_owner_as_member();

-- Create function to generate invitation codes
CREATE OR REPLACE FUNCTION public.generate_invitation_code()
RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(SUBSTRING(encode(gen_random_bytes(6), 'base64') FROM 1 FOR 8));
END;
$$ LANGUAGE plpgsql;