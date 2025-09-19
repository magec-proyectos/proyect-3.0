import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, UserPlus, Crown, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface JoinGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGroupJoined: () => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ 
  open, 
  onOpenChange, 
  onGroupJoined 
}) => {
  const { user } = useAuth();
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [groupPreview, setGroupPreview] = useState<any>(null);

  const validateInviteCode = async (code: string) => {
    if (!code.trim()) {
      setGroupPreview(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('group_invitations')
        .select(`
          *,
          private_groups (
            id,
            name,
            description,
            is_vip,
            max_members
          )
        `)
        .eq('invitation_code', code.toUpperCase())
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        setGroupPreview(null);
        return;
      }

      // Get member count
      const { count } = await supabase
        .from('group_memberships')
        .select('*', { count: 'exact', head: true })
        .eq('group_id', data.private_groups.id)
        .eq('status', 'active');

      setGroupPreview({
        ...data.private_groups,
        member_count: count || 0,
        invitation_id: data.id
      });
    } catch (error) {
      console.error('Error validating invite code:', error);
      setGroupPreview(null);
    }
  };

  const joinGroup = async () => {
    if (!user || !groupPreview) return;

    try {
      setIsLoading(true);

      // Check if user is already a member
      const { data: existingMembership } = await supabase
        .from('group_memberships')
        .select('id')
        .eq('group_id', groupPreview.id)
        .eq('user_id', user.id)
        .single();

      if (existingMembership) {
        toast({
          title: "Already a member",
          description: "You are already a member of this group",
          variant: "destructive"
        });
        return;
      }

      // Add user to group
      const { error: membershipError } = await supabase
        .from('group_memberships')
        .insert([
          {
            group_id: groupPreview.id,
            user_id: user.id,
            role: 'member',
            status: 'active'
          }
        ]);

      if (membershipError) throw membershipError;

      // Mark invitation as used
      await supabase
        .from('group_invitations')
        .update({ status: 'accepted' })
        .eq('id', groupPreview.invitation_id);

      toast({
        title: "Welcome to the group!",
        description: `You've joined "${groupPreview.name}" successfully`
      });

      setInviteCode('');
      setGroupPreview(null);
      onOpenChange(false);
      onGroupJoined();
    } catch (error) {
      console.error('Error joining group:', error);
      toast({
        title: "Error",
        description: "Failed to join group. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (inviteCode.length >= 6) {
      validateInviteCode(inviteCode);
    } else {
      setGroupPreview(null);
    }
  }, [inviteCode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Join Private Group
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="invite-code">Invitation Code</Label>
            <Input
              id="invite-code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="Enter 8-character code"
              maxLength={8}
              className="font-mono tracking-wider"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ask a group member for an invitation code
            </p>
          </div>

          {groupPreview && (
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  {groupPreview.is_vip && (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  )}
                  {groupPreview.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  {groupPreview.is_vip && (
                    <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Crown className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                  
                  <Badge variant="outline" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {groupPreview.member_count}/{groupPreview.max_members}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {groupPreview.description || 'No description available'}
              </p>
              
              {groupPreview.member_count >= groupPreview.max_members && (
                <div className="text-sm text-destructive">
                  ⚠️ This group is at maximum capacity
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button 
              onClick={joinGroup}
              disabled={!groupPreview || isLoading || groupPreview.member_count >= groupPreview.max_members}
              className="flex-1"
            >
              {isLoading ? 'Joining...' : 'Join Group'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupModal;