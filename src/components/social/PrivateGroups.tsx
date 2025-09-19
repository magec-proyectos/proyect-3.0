import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Crown, 
  Users, 
  Plus, 
  Shield, 
  Star, 
  Lock, 
  Copy,
  UserPlus,
  Settings,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import JoinGroupModal from './JoinGroupModal';

interface PrivateGroup {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  is_vip: boolean;
  max_members: number;
  is_invite_only: boolean;
  cover_image_url?: string;
  group_type: string;
  member_count: number;
  user_role?: string;
  created_at: string;
}

interface GroupFormData {
  name: string;
  description: string;
  is_vip: boolean;
  max_members: number;
  is_invite_only: boolean;
}

const PrivateGroups: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<PrivateGroup[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    is_vip: false,
    max_members: 50,
    is_invite_only: true
  });

  useEffect(() => {
    if (user) {
      fetchUserGroups();
    }
  }, [user]);

  const fetchUserGroups = async () => {
    try {
      setIsLoading(true);
      
      // Get groups where user is a member
      const { data: memberships, error } = await supabase
        .from('group_memberships')
        .select(`
          role,
          private_groups (
            id,
            name,
            description,
            owner_id,
            is_vip,
            max_members,
            is_invite_only,
            cover_image_url,
            group_type,
            created_at
          )
        `)
        .eq('user_id', user?.id)
        .eq('status', 'active');

      if (error) throw error;

      // Get member counts for each group
      const groupsWithCounts = await Promise.all(
        (memberships || []).map(async (membership: any) => {
          const { count } = await supabase
            .from('group_memberships')
            .select('*', { count: 'exact', head: true })
            .eq('group_id', membership.private_groups.id)
            .eq('status', 'active');

          return {
            ...membership.private_groups,
            member_count: count || 0,
            user_role: membership.role
          };
        })
      );

      setGroups(groupsWithCounts);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast({
        title: "Error",
        description: "Failed to load private groups",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createGroup = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('private_groups')
        .insert([
          {
            name: formData.name,
            description: formData.description,
            owner_id: user.id,
            is_vip: formData.is_vip,
            max_members: formData.max_members,
            is_invite_only: formData.is_invite_only
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Private group "${formData.name}" created successfully`
      });

      setIsCreateDialogOpen(false);
      setFormData({
        name: '',
        description: '',
        is_vip: false,
        max_members: 50,
        is_invite_only: true
      });
      
      fetchUserGroups();
    } catch (error) {
      console.error('Error creating group:', error);
      toast({
        title: "Error",
        description: "Failed to create private group",
        variant: "destructive"
      });
    }
  };

  const generateInviteCode = async (groupId: string) => {
    try {
      const { data, error } = await supabase.rpc('generate_invitation_code');
      if (error) throw error;

      const inviteCode = data;
      
      // Create invitation record
      await supabase
        .from('group_invitations')
        .insert([
          {
            group_id: groupId,
            invited_by: user?.id,
            invitation_code: inviteCode,
            invited_user_id: '00000000-0000-0000-0000-000000000000' // Placeholder for open invitation
          }
        ]);

      // Copy to clipboard
      await navigator.clipboard.writeText(inviteCode);
      
      toast({
        title: "Invite Code Generated!",
        description: `Code "${inviteCode}" copied to clipboard`
      });
    } catch (error) {
      console.error('Error generating invite:', error);
      toast({
        title: "Error",
        description: "Failed to generate invite code",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card border-border animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Private Groups</h2>
            <p className="text-sm text-muted-foreground">Exclusive VIP prediction communities</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsJoinDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            Join Group
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Create Private Group
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="VIP Predictions Club"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Exclusive predictions for premium members..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">VIP Group</Label>
                  <p className="text-xs text-muted-foreground">Enable premium features</p>
                </div>
                <Switch
                  checked={formData.is_vip}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_vip: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Invite Only</Label>
                  <p className="text-xs text-muted-foreground">Require invitation to join</p>
                </div>
                <Switch
                  checked={formData.is_invite_only}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_invite_only: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="max_members">Max Members</Label>
                <Input
                  id="max_members"
                  type="number"
                  value={formData.max_members}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_members: parseInt(e.target.value) || 50 }))}
                  min="5"
                  max="500"
                />
              </div>

              <Button 
                onClick={createGroup} 
                className="w-full"
                disabled={!formData.name.trim()}
              >
                Create Private Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
        
        {/* Join Group Modal */}
        <JoinGroupModal 
          open={isJoinDialogOpen}
          onOpenChange={setIsJoinDialogOpen}
          onGroupJoined={fetchUserGroups}
        />
      </div>

      {/* Groups List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {group.is_vip && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                        {group.name}
                      </CardTitle>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {group.is_invite_only && (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={group.is_vip ? "default" : "secondary"} className="text-xs">
                      {group.is_vip ? (
                        <>
                          <Star className="h-3 w-3 mr-1" />
                          VIP
                        </>
                      ) : (
                        'Standard'
                      )}
                    </Badge>
                    
                    <Badge variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      {group.member_count}/{group.max_members}
                    </Badge>
                    
                    {group.user_role === 'owner' && (
                      <Badge variant="outline" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Owner
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {group.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="flex-1 mr-2">
                      <Users className="h-4 w-4 mr-1" />
                      View Group
                    </Button>
                    
                    {group.user_role === 'owner' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          generateInviteCode(group.id);
                        }}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {groups.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Private Groups</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Create or join private groups to share exclusive VIP predictions with trusted members.
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Group
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PrivateGroups;