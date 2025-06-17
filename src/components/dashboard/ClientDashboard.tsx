
import React from 'react';
import { SecureRoleBasedRoute } from '@/components/auth/SecureRoleBasedRoute';

export const ClientDashboard = () => {
  return (
    <SecureRoleBasedRoute allowedRoles={['charter_clients', 'boat_club_clients']}>
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-zatara-navy mb-4">My Bookings</h2>
        <p className="text-zatara-blue">Your booking management interface will be integrated here.</p>
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Welcome to the Zatara client portal. Your charter bookings and management tools will be available here soon.
          </p>
        </div>
      </div>
    </SecureRoleBasedRoute>
  );
};
