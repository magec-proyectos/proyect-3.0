
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Mail, MoreHorizontal, Loader2 } from 'lucide-react';

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

interface UserTableRowProps {
  user: UserProfile;
  onToggleStatus: (userId: string, currentStatus: boolean) => void;
  isUpdating: boolean;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onToggleStatus,
  isUpdating
}) => {
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

  return (
    <TableRow className="border-dark-border hover:bg-dark-lighter/50">
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
          onClick={() => onToggleStatus(user.id, user.is_active)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <MoreHorizontal size={16} />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
