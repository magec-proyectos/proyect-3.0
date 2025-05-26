
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { 
  Users, 
  Search, 
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Calendar,
  Shield,
  Loader2
} from 'lucide-react';

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: boolean) => {
    return status 
      ? 'bg-green-500/20 text-green-400'
      : 'bg-red-500/20 text-red-400';
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-purple-500/20 text-purple-400',
      moderator: 'bg-blue-500/20 text-blue-400',
      user: 'bg-gray-500/20 text-gray-400'
    };
    return variants[role as keyof typeof variants] || variants.user;
  };

  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    updateUserStatusMutation.mutate({ userId, isActive: !currentStatus });
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-xl font-bold text-white">
                  {statsLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    userStats?.total_users || 0
                  )}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-xl font-bold text-white">
                  {statsLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    userStats?.active_users || 0
                  )}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">New This Month</p>
                <p className="text-xl font-bold text-white">
                  {statsLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    userStats?.new_this_month || 0
                  )}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Admins</p>
                <p className="text-xl font-bold text-white">
                  {statsLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    userStats?.admin_count || 0
                  )}
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search users by username, email, or name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pl-10 bg-dark-lighter border-dark-border text-white"
              />
            </div>
            <Button variant="outline" className="border-dark-border text-gray-400 hover:text-white">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          {/* Users Table */}
          {usersLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              <span className="ml-2 text-gray-400">Loading users...</span>
            </div>
          ) : usersError ? (
            <div className="text-center py-8">
              <p className="text-red-400">Error loading users. Please try again.</p>
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-dark-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-dark-border bg-dark-lighter">
                      <TableHead className="text-gray-300">User</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Role</TableHead>
                      <TableHead className="text-gray-300">Last Login</TableHead>
                      <TableHead className="text-gray-300">Joined</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData?.users.map((user) => (
                      <TableRow key={user.id} className="border-dark-border hover:bg-dark-lighter/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-soft-blue to-soft-cyan rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.username || user.full_name || 'Unknown'}</p>
                              <p className="text-gray-400 text-sm flex items-center gap-1">
                                <Mail size={12} />
                                {user.email || 'No email'}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(user.is_active)}>
                            {user.is_active ? 'active' : 'inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadge(user.user_roles[0]?.role || 'user')}>
                            {user.user_roles[0]?.role || 'user'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDate(user.last_login)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDate(user.created_at)}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                            disabled={updateUserStatusMutation.isPending}
                          >
                            {updateUserStatusMutation.isPending ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <MoreHorizontal size={16} />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = i + 1;
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              onClick={() => setCurrentPage(pageNumber)}
                              isActive={currentPage === pageNumber}
                              className="cursor-pointer"
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
