
import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardRoutes } from '@/components/dashboard/DashboardRoutes';
import { useAuth } from '@/contexts/SecureAuthContext';
import { isClientRole, isSkipper } from '@/utils/authSecurity';

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
    if (isSkipper(userRole)) {
      return <Navigate to="/dashboard/operations" replace />;
    }
  }

  return (
    <DashboardLayout>
      <DashboardRoutes userRole={userRole} profile={profile} />
    </DashboardLayout>
  );
};

export default Dashboard;
