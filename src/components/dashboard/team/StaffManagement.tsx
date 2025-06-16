
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/SecureAuthContext';
import { useStaffData } from '@/hooks/useStaffData';
import { StaffOverviewCards } from './StaffOverviewCards';
import { StaffSearchFilter } from './StaffSearchFilter';
import { StaffCard } from './StaffCard';

export const StaffManagement = () => {
  const { profile } = useAuth();
  const { staff, loading, overviewMetrics } = useStaffData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredStaff = staff.filter(member => {
    const matchesSearch = `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Staff Management</h2>
          <p className="text-zatara-blue">Manage team members and assignments</p>
        </div>
        {(profile?.role === 'management' || profile?.role === 'owners') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        )}
      </div>

      <StaffOverviewCards metrics={overviewMetrics} />

      <StaffSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <StaffCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
