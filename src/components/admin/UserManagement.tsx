
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import UserStatsCards from './user-management/UserStatsCards';
import UserSearchAndFilters from './user-management/UserSearchAndFilters';
import UserTable from './user-management/UserTable';
import UserManagementPagination from './user-management/UserManagementPagination';

interface UserProfile {
  id: string;
  username: string | null;
  email: string | null;
  full_name: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  user_roles: Array<{
    role: 'admin' | 'moderator' | 'user';
  }>;
}

interface UserStats {
  total_users: number;
  active_users: number;
  new_this_month: number;
  admin_count: number;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const queryClient = useQueryClient();

  // Fetch user statistics
  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async (): Promise<UserStats> => {
      console.log('Fetching user statistics...');
      
      // Get total users count
      const { count: totalUsers, error: totalError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (totalError) {
        console.error('Error fetching total users:', totalError);
        throw totalError;
      }

      // Get active users count
      const { count: activeUsers, error: activeError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (activeError) {
        console.error('Error fetching active users:', activeError);
        throw activeError;
      }

      // Get new users this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: newThisMonth, error: newError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());

      if (newError) {
        console.error('Error fetching new users:', newError);
        throw newError;
      }

      // Get admin count
      const { count: adminCount, error: adminError } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');

      if (adminError) {
        console.error('Error fetching admin count:', adminError);
        throw adminError;
      }

      return {
        total_users: totalUsers || 0,
        active_users: activeUsers || 0,
        new_this_month: newThisMonth || 0,
        admin_count: adminCount || 0
      };
    }
  });

  // Fetch users with pagination and search
  const { data: usersData, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users', searchTerm, currentPage, pageSize],
    queryFn: async () => {
      console.log('Fetching users with search term:', searchTerm, 'page:', currentPage);
      
      let query = supabase
        .from('profiles')
        .select(`
          id,
          username,
          email,
          full_name,
          is_active,
          last_login,
          created_at
        `, { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply search filter
      if (searchTerm) {
        query = query.or(`username.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`);
      }

      // Apply pagination
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data: profiles, error, count } = await query;

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      // Fetch user roles separately for each user
      const usersWithRoles: UserProfile[] = [];
      
      if (profiles) {
        for (const profile of profiles) {
          const { data: roles, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);

          if (rolesError) {
            console.error('Error fetching roles for user:', profile.id, rolesError);
            // If we can't fetch roles, assign default user role
            usersWithRoles.push({
              ...profile,
              user_roles: [{ role: 'user' }]
            });
          } else {
            usersWithRoles.push({
              ...profile,
              user_roles: roles || [{ role: 'user' }]
            });
          }
        }
      }

      console.log('Fetched users with roles:', usersWithRoles);
      return {
        users: usersWithRoles,
        total: count || 0
      };
    }
  });

  // Update user status mutation
  const updateUserStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: isActive })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
      toast.success('User status updated successfully');
    },
    onError: (error) => {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  });

  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    updateUserStatusMutation.mutate({ userId, isActive: !currentStatus });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const totalPages = usersData ? Math.ceil(usersData.total / pageSize) : 0;

  if (usersError) {
    console.error('Users query error:', usersError);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-gradient-to-r from-soft-blue to-soft-cyan text-white">
          <UserPlus size={16} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <UserStatsCards userStats={userStats} isLoading={statsLoading} />

      {/* Search and Filters */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

          {/* Users Table */}
          <UserTable
            users={usersData?.users || []}
            isLoading={usersLoading}
            error={usersError}
            onToggleUserStatus={handleToggleUserStatus}
            isUpdating={updateUserStatusMutation.isPending}
          />

          {/* Pagination */}
          <UserManagementPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
