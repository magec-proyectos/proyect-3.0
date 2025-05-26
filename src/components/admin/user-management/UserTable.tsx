
import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserTableRow from './UserTableRow';

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

interface UserTableProps {
  users: UserProfile[];
  isLoading: boolean;
  error: any;
  onToggleUserStatus: (userId: string, currentStatus: boolean) => void;
  isUpdating: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  error,
  onToggleUserStatus,
  isUpdating
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <span className="ml-2 text-gray-400">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Error loading users. Please try again.</p>
      </div>
    );
  }

  return (
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
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onToggleStatus={onToggleUserStatus}
              isUpdating={isUpdating}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
