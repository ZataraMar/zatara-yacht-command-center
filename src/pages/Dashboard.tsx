
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { DashboardOperations } from '@/components/dashboard/DashboardOperations';
import { FleetOverview } from '@/components/dashboard/fleet/FleetOverview';
import { StaffManagement } from '@/components/dashboard/team/StaffManagement';
import { AdvancedFinancials } from '@/components/dashboard/financial/AdvancedFinancials';
import { GuestExperience } from '@/components/dashboard/crm/GuestExperience';
import { OperationalExcellence } from '@/components/dashboard/operations/OperationalExcellence';
import { AdvancedReporting } from '@/components/dashboard/analytics/AdvancedReporting';
import { AutomationWorkflows } from '@/components/dashboard/integration/AutomationWorkflows';
import { UserManagement } from '@/components/dashboard/admin/UserManagement';
import { SecureRoleBasedRoute } from '@/components/auth/SecureRoleBasedRoute';
import { useAuth } from '@/contexts/SecureAuthContext';
import { isClientRole, isOwner } from '@/utils/authSecurity';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Handle users arriving from email verification
  useEffect(() => {
    // Check if user arrived from email verification (hash fragment present)
    if (location.hash && user && !loading) {
      // Clear the hash and ensure they're on the dashboard
      window.history.replaceState(null, '', '/dashboard');
    }
  }, [user, loading, location.hash]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto"></div>
          <p className="text-zatara-navy mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userRole = profile?.role || '';

  // Auto-redirect based on role when accessing dashboard root
  if (location.pathname === '/dashboard' && profile) {
    if (isClientRole(userRole)) {
      return <Navigate to="/dashboard/bookings" replace />;
    }
  }

  // Simple component wrapper for owner access
  const OwnerOnlyRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isOwner(userRole)) {
      return (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-zatara-navy mb-4">Access Restricted</h2>
          <p className="text-zatara-blue">This section is only available to the system owner.</p>
        </div>
      );
    }
    return <>{children}</>;
  };

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        
        {/* Owner gets access to everything */}
        <Route 
          path="/operations" 
          element={
            <OwnerOnlyRoute>
              <DashboardOperations />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/fleet" 
          element={
            <OwnerOnlyRoute>
              <FleetOverview />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/team" 
          element={
            <OwnerOnlyRoute>
              <StaffManagement />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <OwnerOnlyRoute>
              <UserManagement />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/financials" 
          element={
            <OwnerOnlyRoute>
              <AdvancedFinancials />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/guests" 
          element={
            <OwnerOnlyRoute>
              <GuestExperience />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/operations-excellence" 
          element={
            <OwnerOnlyRoute>
              <OperationalExcellence />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/analytics" 
          element={
            <OwnerOnlyRoute>
              <AdvancedReporting />
            </OwnerOnlyRoute>
          } 
        />
        
        <Route 
          path="/automation" 
          element={
            <OwnerOnlyRoute>
              <AutomationWorkflows />
            </OwnerOnlyRoute>
          } 
        />
        
        {/* Client Routes - Booking Management */}
        <Route 
          path="/bookings" 
          element={
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
          } 
        />
        
        {/* Settings - Available to all authenticated users */}
        <Route 
          path="/settings" 
          element={
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-zatara-navy mb-4">Account Settings</h2>
              <p className="text-zatara-blue">Profile and system settings will be available here.</p>
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Current role: <span className="font-medium capitalize">{userRole?.replace('_', ' ')}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Email: <span className="font-medium">{profile?.email}</span>
                </p>
              </div>
            </div>
          } 
        />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
