
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bot,
  Plus,
  Edit,
  Trash2,
  Save,
  MessageSquare,
  Settings,
  Users,
  BarChart3
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  specialization: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

interface ChatbotSettings {
  id: string;
  setting_key: string;
  setting_value: any;
  description: string;
}

const ChatbotManagement = () => {
  const queryClient = useQueryClient();
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [showNewAgentForm, setShowNewAgentForm] = useState(false);

  // Fetch agents
  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ['admin-chatbot-agents'],
    queryFn: async (): Promise<Agent[]> => {
      const { data, error } = await supabase
        .from('chatbot_agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  // Fetch settings
  const { data: settings } = useQuery({
    queryKey: ['admin-chatbot-settings'],
    queryFn: async (): Promise<ChatbotSettings[]> => {
      const { data, error } = await supabase
        .from('chatbot_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      return data || [];
    }
  });

  // Update agent
  const updateAgentMutation = useMutation({
    mutationFn: async (agent: Partial<Agent> & { id: string }) => {
      const { data, error } = await supabase
        .from('chatbot_agents')
        .update(agent)
        .eq('id', agent.id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chatbot-agents'] });
      setEditingAgent(null);
      toast.success('Agent updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update agent: ' + error.message);
    }
  });

  // Create agent
  const createAgentMutation = useMutation({
    mutationFn: async (agent: Omit<Agent, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('chatbot_agents')
        .insert(agent);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chatbot-agents'] });
      setShowNewAgentForm(false);
      toast.success('Agent created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create agent: ' + error.message);
    }
  });

  // Update setting
  const updateSettingMutation = useMutation({
    mutationFn: async ({ settingKey, value }: { settingKey: string; value: any }) => {
      const { data, error } = await supabase
        .from('chatbot_settings')
        .update({ setting_value: value })
        .eq('setting_key', settingKey);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chatbot-settings'] });
      toast.success('Setting updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update setting: ' + error.message);
    }
  });

  const getSettingValue = (key: string, defaultValue: any = '') => {
    const setting = settings?.find(s => s.setting_key === key);
    return setting?.setting_value || defaultValue;
  };

  const handleUpdateSetting = (key: string, value: any) => {
    updateSettingMutation.mutate({ settingKey: key, value });
  };

  const AgentForm = ({ agent, onSave, onCancel }: {
    agent?: Agent;
    onSave: (agentData: any) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: agent?.name || '',
      description: agent?.description || '',
      system_prompt: agent?.system_prompt || '',
      specialization: agent?.specialization || 'general',
      avatar_url: agent?.avatar_url || '',
      is_active: agent?.is_active ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">
            {agent ? 'Edit Agent' : 'Create New Agent'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-dark-lighter border-dark-border text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="specialization" className="text-white">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="bg-dark-lighter border-dark-border text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-dark-lighter border-dark-border text-white"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="system_prompt" className="text-white">System Prompt</Label>
              <Textarea
                id="system_prompt"
                value={formData.system_prompt}
                onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                className="bg-dark-lighter border-dark-border text-white"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="avatar_url" className="text-white">Avatar URL (optional)</Label>
              <Input
                id="avatar_url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="bg-dark-lighter border-dark-border text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active" className="text-white">Active</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="bg-soft-blue hover:bg-soft-blue/80">
                <Save size={16} className="mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Chatbot Management</h2>
          <p className="text-gray-400">Manage AI agents and chatbot settings</p>
        </div>
      </div>

      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-dark-card">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">AI Agents</h3>
              <Button
                onClick={() => setShowNewAgentForm(true)}
                className="bg-soft-blue hover:bg-soft-blue/80"
              >
                <Plus size={16} className="mr-2" />
                Add Agent
              </Button>
            </div>

            {showNewAgentForm && (
              <AgentForm
                onSave={(agentData) => createAgentMutation.mutate(agentData)}
                onCancel={() => setShowNewAgentForm(false)}
              />
            )}

            {editingAgent && (
              <AgentForm
                agent={editingAgent}
                onSave={(agentData) => updateAgentMutation.mutate({ ...agentData, id: editingAgent.id })}
                onCancel={() => setEditingAgent(null)}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {agents?.map((agent) => (
                <Card key={agent.id} className="bg-dark-card border-dark-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-soft-blue to-soft-cyan rounded-full flex items-center justify-center">
                          <Bot className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{agent.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {agent.specialization}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={agent.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                          {agent.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingAgent(agent)}
                          className="text-gray-400 hover:text-white p-1"
                        >
                          <Edit size={16} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{agent.description}</p>
                    <p className="text-gray-500 text-xs">{agent.system_prompt.substring(0, 100)}...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings size={20} />
                Chatbot Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable Chatbot</Label>
                  <p className="text-sm text-gray-400">Allow users to access the chatbot</p>
                </div>
                <Switch
                  checked={getSettingValue('global_enabled', false)}
                  onCheckedChange={(checked) => handleUpdateSetting('global_enabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Welcome Message</Label>
                <Textarea
                  value={getSettingValue('welcome_message', '')}
                  onChange={(e) => handleUpdateSetting('welcome_message', e.target.value)}
                  className="bg-dark-lighter border-dark-border text-white"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Max Conversation Length</Label>
                <Input
                  type="number"
                  value={getSettingValue('max_conversation_length', 50)}
                  onChange={(e) => handleUpdateSetting('max_conversation_length', parseInt(e.target.value))}
                  className="bg-dark-lighter border-dark-border text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 size={20} />
                Chatbot Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Analytics dashboard coming soon</p>
                <p className="text-gray-500 text-sm">Track conversations, popular agents, and user engagement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotManagement;
