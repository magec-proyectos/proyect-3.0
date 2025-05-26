
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut, CheckCircle } from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  last_login: string | null;
  is_active: boolean;
}

interface AdminDashboardHeaderProps {
  adminUser: AdminUser;
  onLogout: () => void;
}

const AdminDashboardHeader: React.FC<AdminDashboardHeaderProps> = ({ adminUser, onLogout }) => {
  return (
    <div className="bg-dark-card border-b border-dark-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-soft-blue to-soft-cyan rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, {adminUser.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              <CheckCircle size={14} className="mr-1" />
              Active Session
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
