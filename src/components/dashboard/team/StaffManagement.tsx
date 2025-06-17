
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users, Calendar, FileText } from 'lucide-react';
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
    const matchesSearch = `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
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

  const isOwnerOrManagement = profile?.role === 'owners' || profile?.role === 'management';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Team Management</h2>
          <p className="text-zatara-blue">Manage crew assignments and schedules</p>
        </div>
        <div className="flex gap-3">
          {isOwnerOrManagement && (
            <>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reports
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Staff
              </Button>
            </>
          )}
        </div>
      </div>

      <StaffOverviewCards metrics={overviewMetrics} />

      {/* Welcome message for owners */}
      {profile?.role === 'owners' && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900">Welcome to Zatara Management Portal</h3>
              <p className="text-purple-700 text-sm mt-1">
                As an owner, you have full access to all business operations, analytics, and team management features.
              </p>
            </div>
          </div>
        </div>
      )}

      <StaffSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
      />

      {staff.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-500 mb-6">Start by adding your first team member to get started.</p>
          {isOwnerOrManagement && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add First Team Member
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      )}

      {filteredStaff.length === 0 && staff.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No team members match your current filters.</p>
          <Button 
            variant="ghost" 
            onClick={() => {
              setSearchTerm('');
              setFilterRole('all');
            }}
            className="mt-2"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};
