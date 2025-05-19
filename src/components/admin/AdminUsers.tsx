
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  balance: number;
  joinDate: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    status: 'active',
    balance: 245.50,
    joinDate: '2023-05-12'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'active',
    balance: 1050.75,
    joinDate: '2023-06-24'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    status: 'suspended',
    balance: 0,
    joinDate: '2023-02-18'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    status: 'pending',
    balance: 75.25,
    joinDate: '2023-08-05'
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david@example.com',
    status: 'active',
    balance: 495.00,
    joinDate: '2023-01-30'
  },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended') => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    toast({
      title: `User ${newStatus === 'active' ? 'activated' : 'suspended'}`,
      description: `User account has been ${newStatus === 'active' ? 'activated' : 'suspended'} successfully.`
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <div className="relative max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-dark-lighter border-dark-border"
          />
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge 
                    className={`${
                      user.status === 'active' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 
                      user.status === 'suspended' ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 
                      'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                    } border-none`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>${user.balance.toFixed(2)}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right space-x-2">
                  {user.status === 'suspended' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(user.id, 'active')}
                    >
                      <UserCheck className="h-4 w-4 mr-1" /> Activate
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(user.id, 'suspended')}
                    >
                      <UserX className="h-4 w-4 mr-1" /> Suspend
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                  No users found. Try adjusting your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
