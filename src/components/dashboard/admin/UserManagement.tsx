
import React from 'react';
import { UserList } from './UserList';
import { StaffInvitation } from './StaffInvitation';

export const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">User Management</h2>
          <p className="text-zatara-blue">Manage team members and access permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StaffInvitation />
        </div>
        <div className="lg:col-span-2">
          <UserList />
        </div>
      </div>
    </div>
  );
};
