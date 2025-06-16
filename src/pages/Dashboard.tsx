
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { SecureRoleBasedRoute } from '@/components/auth/SecureRoleBasedRoute';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        
        {/* Client Routes */}
        <Route 
          path="/bookings" 
          element={
            <SecureRoleBasedRoute allowedRoles={['charter_clients', 'boat_club_clients']}>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-zatara-navy mb-4">My Bookings</h2>
                <p className="text-zatara-blue">Your booking management interface will be integrated here.</p>
              </div>
            </SecureRoleBasedRoute>
          } 
        />
        
        {/* Team Routes */}
        <Route 
          path="/charters" 
          element={
            <SecureRoleBasedRoute allowedRoles={['team', 'agency', 'management', 'owners', 'staff', 'skippers']}>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-zatara-navy mb-4">Charter Management</h2>
                <p className="text-zatara-blue">Charter management dashboard will be integrated here.</p>
              </div>
            </SecureRoleBasedRoute>
          } 
        />
        
        <Route 
          path="/fleet" 
          element={
            <SecureRoleBasedRoute allowedRoles={['team', 'management', 'owners', 'staff', 'skippers']}>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-zatara-navy mb-4">Fleet Management</h2>
                <p className="text-zatara-blue">Fleet management interface will be integrated here.</p>
              </div>
            </SecureRoleBasedRoute>
          } 
        />
        
        <Route 
          path="/team" 
          element={
            <SecureRoleBasedRoute allowedRoles={['management', 'owners']}>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-zatara-navy mb-4">Team Management</h2>
                <p className="text-zatara-blue">Team management tools will be integrated here.</p>
              </div>
            </SecureRoleBasedRoute>
          } 
        />
        
        <Route 
          path="/analytics" 
          element={
            <SecureRoleBasedRoute allowedRoles={['management', 'owners', 'agency']}>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-zatara-navy mb-4">Analytics Dashboard</h2>
                <p className="text-zatara-blue">Business analytics and reporting interface will be integrated here.</p>
              </div>
            </SecureRoleBasedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-zatara-navy mb-4">Account Settings</h2>
              <p className="text-zatara-blue">Profile and WhatsApp verification settings will be available here.</p>
            </div>
          } 
        />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
