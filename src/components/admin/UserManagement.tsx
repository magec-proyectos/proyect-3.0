
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Calendar,
  Shield
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data - in a real app, this would come from your database
  const users = [
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      status: 'active',
      role: 'user',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      username: 'jane_smith',
      email: 'jane@example.com',
      status: 'active',
      role: 'moderator',
      lastLogin: '2024-01-14T15:45:00Z',
      createdAt: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      username: 'mike_wilson',
      email: 'mike@example.com',
      status: 'inactive',
      role: 'user',
      lastLogin: '2024-01-10T09:15:00Z',
      createdAt: '2024-01-03T00:00:00Z'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-500/20 text-green-400',
      inactive: 'bg-red-500/20 text-red-400',
      suspended: 'bg-yellow-500/20 text-yellow-400'
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-purple-500/20 text-purple-400',
      moderator: 'bg-blue-500/20 text-blue-400',
      user: 'bg-gray-500/20 text-gray-400'
    };
    return variants[role as keyof typeof variants] || variants.user;
  };

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
                <p className="text-xl font-bold text-white">1,234</p>
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
                <p className="text-xl font-bold text-white">1,089</p>
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
                <p className="text-xl font-bold text-white">123</p>
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
                <p className="text-xl font-bold text-white">12</p>
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
                placeholder="Search users by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-lighter border-dark-border text-white"
              />
            </div>
            <Button variant="outline" className="border-dark-border text-gray-400 hover:text-white">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          {/* Users Table */}
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-dark-border hover:bg-dark-lighter/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-soft-blue to-soft-cyan rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.username}</p>
                          <p className="text-gray-400 text-sm flex items-center gap-1">
                            <Mail size={12} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(user.lastLogin)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
