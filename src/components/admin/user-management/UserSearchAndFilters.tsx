
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface UserSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UserSearchAndFilters: React.FC<UserSearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          placeholder="Search users by username, email, or name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-dark-lighter border-dark-border text-white"
        />
      </div>
      <Button variant="outline" className="border-dark-border text-gray-400 hover:text-white">
        <Filter size={16} className="mr-2" />
        Filters
      </Button>
    </div>
  );
};

export default UserSearchAndFilters;
