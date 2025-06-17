
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface StaffSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterRole: string;
  setFilterRole: (role: string) => void;
}

export const StaffSearchFilter: React.FC<StaffSearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole
}) => {
  return (
    <div className="flex space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search staff members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <select
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="all">All Roles</option>
        <option value="management">Management</option>
        <option value="skippers">Skippers</option>
        <option value="staff">Staff</option>
        <option value="owner">Owner</option>
      </select>
    </div>
  );
};
