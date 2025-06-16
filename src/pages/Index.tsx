import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RoleBasedRoute } from '@/components/auth/RoleBasedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isManagementOrOwner, isStaffOrHigher } from '@/utils/authSecurity';
import { Home } from 'lucide-react';

const Index = () => {
  const { user, profile, signOut } = useAuth();

  const userRole = profile?.role || '';
  const canViewFinancials = isManagementOrOwner(userRole);
  const canViewOperations = isStaffOrHigher(userRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Public Site
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zatara Mar Dashboard</h1>
                <p className="text-gray-600">Team Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-sm text-gray-600">
                  Welcome, {profile?.first_name} {profile?.last_name}
                </span>
                <div className="text-xs text-gray-500 capitalize">
                  Role: {profile?.role}
                </div>
              </div>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canViewOperations && (
            <Card>
              <CardHeader>
                <CardTitle>Today's Charters</CardTitle>
                <CardDescription>Active bookings and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">charters scheduled</p>
              </CardContent>
            </Card>
          )}

          {canViewOperations && (
            <Card>
              <CardHeader>
                <CardTitle>Fleet Status</CardTitle>
                <CardDescription>Boat availability and maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">8/10</p>
                <p className="text-sm text-gray-600">boats available</p>
              </CardContent>
            </Card>
          )}

          {canViewFinancials && (
            <Card>
              <CardHeader>
                <CardTitle>Revenue This Month</CardTitle>
                <CardDescription>Financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">€45,280</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Available actions based on your role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {canViewOperations && (
                  <>
                    <Button className="h-20 flex-col">
                      <span className="text-lg mb-1">📅</span>
                      <span>View Bookings</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <span className="text-lg mb-1">⚓</span>
                      <span>Fleet Management</span>
                    </Button>
                  </>
                )}
                
                {canViewOperations && (
                  <Button variant="outline" className="h-20 flex-col">
                    <span className="text-lg mb-1">👥</span>
                    <span>Team Schedule</span>
                  </Button>
                )}
                
                {canViewFinancials && (
                  <Button variant="outline" className="h-20 flex-col">
                    <span className="text-lg mb-1">📊</span>
                    <span>Reports</span>
                  </Button>
                )}

                {!canViewOperations && (
                  <Card className="col-span-full p-4">
                    <CardDescription className="text-center">
                      Welcome to Zatara Mar! Your account is set up for client services.
                      Contact your administrator if you need additional access.
                    </CardDescription>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-based content sections */}
        <RoleBasedRoute allowedRoles={['management', 'owners']}>
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Management Dashboard</CardTitle>
                <CardDescription>Executive overview and controls</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Management-only features and analytics go here.</p>
              </CardContent>
            </Card>
          </div>
        </RoleBasedRoute>
      </main>
    </div>
  );
};

export default Index;
