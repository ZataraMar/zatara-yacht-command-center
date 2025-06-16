
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SecureAuthContext';
import { SecureRoleBasedRoute } from '@/components/auth/SecureRoleBasedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isManagementOrOwner, isStaffOrHigher } from '@/utils/authSecurity';
import { Home, Calendar, Anchor, Users, BarChart3, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user, profile, signOut } = useAuth();

  const userRole = profile?.role || '';
  const canViewFinancials = isManagementOrOwner(userRole);
  const canViewOperations = isStaffOrHigher(userRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zatara-cream to-white">
      {/* Mobile-optimized header */}
      <header className="bg-white shadow-sm border-b border-zatara-blue/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 sm:py-6">
            {/* Logo and brand section */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button variant="outline" size="sm" asChild className="touch-target border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                <Link to="/">
                  <Home className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Public Site</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-responsive-md font-bold text-zatara-navy zatara-script">
                  Zatara Mar
                </h1>
                <p className="text-xs sm:text-sm text-zatara-blue font-medium">
                  Management Dashboard
                </p>
              </div>
            </div>
            
            {/* User info and actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-right hidden sm:block">
                <span className="text-sm text-zatara-navy font-medium">
                  {profile?.first_name} {profile?.last_name}
                </span>
                <div className="text-xs text-zatara-blue capitalize">
                  {profile?.role}
                </div>
              </div>
              <Button 
                onClick={signOut} 
                variant="outline" 
                size="sm"
                className="touch-target border-zatara-accent text-zatara-accent hover:bg-zatara-accent hover:text-zatara-navy"
              >
                <span className="hidden xs:inline">Sign Out</span>
                <span className="xs:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile-first stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {canViewOperations && (
            <Card className="bg-white shadow-sm border-zatara-blue/20 hover:shadow-md transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zatara-navy text-responsive-sm">Today's Charters</CardTitle>
                    <CardDescription className="text-zatara-blue">Active bookings</CardDescription>
                  </div>
                  <Calendar className="h-8 w-8 text-zatara-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl sm:text-3xl font-bold text-zatara-blue">12</p>
                <p className="text-sm text-zatara-navy/70">charters scheduled</p>
              </CardContent>
            </Card>
          )}

          {canViewOperations && (
            <Card className="bg-white shadow-sm border-zatara-blue/20 hover:shadow-md transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zatara-navy text-responsive-sm">Fleet Status</CardTitle>
                    <CardDescription className="text-zatara-blue">Boat availability</CardDescription>
                  </div>
                  <Anchor className="h-8 w-8 text-zatara-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl sm:text-3xl font-bold text-zatara-blue">8/10</p>
                <p className="text-sm text-zatara-navy/70">boats available</p>
              </CardContent>
            </Card>
          )}

          {canViewFinancials && (
            <Card className="bg-white shadow-sm border-zatara-blue/20 hover:shadow-md transition-shadow animate-fade-in sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zatara-navy text-responsive-sm">Revenue</CardTitle>
                    <CardDescription className="text-zatara-blue">This month</CardDescription>
                  </div>
                  <TrendingUp className="h-8 w-8 text-zatara-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl sm:text-3xl font-bold text-zatara-blue">€45,280</p>
                <p className="text-sm text-green-600 font-medium">+12% from last month</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mobile-optimized quick actions */}
        <Card className="bg-white shadow-sm border-zatara-blue/20 mb-6 sm:mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-zatara-navy text-responsive-md">Quick Actions</CardTitle>
            <CardDescription className="text-zatara-blue">Available actions based on your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {canViewOperations && (
                <>
                  <Button className="h-16 sm:h-20 flex-col gradient-zatara text-white hover:opacity-90 transition-opacity touch-target">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm font-medium">View Bookings</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex-col border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white transition-colors touch-target">
                    <Anchor className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm font-medium">Fleet</span>
                  </Button>
                </>
              )}
              
              {canViewOperations && (
                <Button variant="outline" className="h-16 sm:h-20 flex-col border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white transition-colors touch-target">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm font-medium">Team</span>
                </Button>
              )}
              
              {canViewFinancials && (
                <Button variant="outline" className="h-16 sm:h-20 flex-col border-zatara-accent text-zatara-accent hover:bg-zatara-accent hover:text-zatara-navy transition-colors touch-target">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm font-medium">Reports</span>
                </Button>
              )}

              {!canViewOperations && (
                <div className="col-span-2 lg:col-span-4 p-4 sm:p-6 text-center bg-zatara-cream rounded-lg">
                  <p className="text-zatara-navy font-medium mb-2">Welcome to Zatara Mar!</p>
                  <p className="text-sm text-zatara-blue">
                    Your account is set up for client services. Contact your administrator for additional access.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Management-only section */}
        <SecureRoleBasedRoute allowedRoles={['management', 'owners']}>
          <Card className="bg-gradient-to-r from-zatara-blue to-zatara-blue-dark text-white shadow-lg animate-slide-up">
            <CardHeader>
              <CardTitle className="text-white text-responsive-md">Management Dashboard</CardTitle>
              <CardDescription className="text-zatara-blue-light">Executive overview and controls</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zatara-blue-light mb-4">
                Management-only features and analytics go here.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <Button variant="secondary" size="sm" className="touch-target bg-white/20 text-white hover:bg-white/30">
                  Business Analytics
                </Button>
                <Button variant="secondary" size="sm" className="touch-target bg-white/20 text-white hover:bg-white/30">
                  Financial Reports
                </Button>
                <Button variant="secondary" size="sm" className="touch-target bg-white/20 text-white hover:bg-white/30 col-span-2 sm:col-span-1">
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </SecureRoleBasedRoute>
      </main>
    </div>
  );
};

export default Index;
