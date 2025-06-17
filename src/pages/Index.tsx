
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SecureAuthContext';
import { SecureRoleBasedRoute } from '@/components/auth/SecureRoleBasedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isOwner, isClientRole } from '@/utils/authSecurity';
import { Home, Calendar, Anchor, Users, BarChart3, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const userRole = profile?.role || '';
  const userIsOwner = isOwner(userRole);

  // SIMPLIFIED: Only redirect clients, let all staff/management stay on Index
  useEffect(() => {
    if (user && profile) {
      console.log('User role:', userRole);
      // Only redirect clients to their bookings page
      if (isClientRole(userRole)) {
        console.log('Redirecting client to bookings');
        navigate('/dashboard/bookings');
      }
      // Staff and management can stay on the Index/dashboard overview
    }
  }, [user, profile, userRole, navigate]);

  // Show loading only for clients who will be redirected
  if (user && profile && isClientRole(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto"></div>
          <p className="text-zatara-navy mt-4">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mediterranean">
      {/* Luxury Mobile-optimized header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-elegant border-b border-zatara-gold/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center py-6 sm:py-8">
            {/* Logo and brand section */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="luxury-touch-target border-2 border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white rounded-luxury transition-all duration-300 hover:scale-105"
              >
                <Link to="/">
                  <Home className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline font-medium">Public Site</span>
                </Link>
              </Button>
              <div>
                <h1 className="zatara-luxury-script text-luxury-lg sm:text-luxury-xl text-zatara-navy">
                  Zatara Mar
                </h1>
                <p className="text-luxury-xs text-zatara-blue font-medium tracking-wide">
                  MANAGEMENT DASHBOARD
                </p>
              </div>
            </div>
            
            {/* User info and actions */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="text-right hidden md:block">
                <div className="text-luxury-sm text-zatara-navy font-semibold">
                  {profile?.first_name} {profile?.last_name}
                </div>
                <div className="text-luxury-xs text-zatara-gold capitalize font-medium">
                  {profile?.role}
                </div>
              </div>
              <Button 
                onClick={signOut} 
                variant="outline" 
                size="lg"
                className="luxury-touch-target border-2 border-zatara-gold text-zatara-gold hover:bg-zatara-gold hover:text-zatara-navy rounded-luxury transition-all duration-300 hover:scale-105 font-medium"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 sm:px-8 py-8 sm:py-12">
        {/* Luxury stats grid - Only show if owner */}
        {userIsOwner && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="bg-white/90 backdrop-blur-sm shadow-luxury border-2 border-zatara-blue/20 hover:shadow-elegant transition-all duration-300 hover:scale-105 rounded-luxury animate-fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zatara-navy text-luxury-lg font-playfair">Today's Charters</CardTitle>
                    <CardDescription className="text-zatara-blue text-luxury-xs font-medium">Active bookings</CardDescription>
                  </div>
                  <Calendar className="h-10 w-10 text-zatara-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-luxury-3xl font-bold text-zatara-blue mb-2">12</p>
                <p className="text-luxury-xs text-zatara-navy/70 font-medium">charters scheduled</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-luxury border-2 border-zatara-blue/20 hover:shadow-elegant transition-all duration-300 hover:scale-105 rounded-luxury animate-fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zatara-navy text-luxury-lg font-playfair">Fleet Status</CardTitle>
                    <CardDescription className="text-zatara-blue text-luxury-xs font-medium">Boat availability</CardDescription>
                  </div>
                  <Anchor className="h-10 w-10 text-zatara-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-luxury-3xl font-bold text-zatara-blue mb-2">8/10</p>
                <p className="text-luxury-xs text-zatara-navy/70 font-medium">boats available</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-gold border-2 border-zatara-gold/30 hover:shadow-elegant transition-all duration-300 hover:scale-105 rounded-luxury animate-fade-in sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zatara-navy text-luxury-lg font-playfair">Revenue</CardTitle>
                    <CardDescription className="text-zatara-blue text-luxury-xs font-medium">This month</CardDescription>
                  </div>
                  <TrendingUp className="h-10 w-10 text-zatara-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-luxury-3xl font-bold text-zatara-gold mb-2">€45,280</p>
                <p className="text-luxury-xs text-green-600 font-semibold">+12% from last month</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Luxury quick actions */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-elegant border-2 border-zatara-gold/20 mb-8 sm:mb-12 rounded-luxury animate-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="text-zatara-navy text-luxury-xl font-playfair">Quick Actions</CardTitle>
            <CardDescription className="text-zatara-blue text-luxury-sm font-medium">Available actions based on your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {userIsOwner && (
                <>
                  <Button 
                    asChild
                    className="h-20 sm:h-24 flex-col gradient-zatara text-white hover:shadow-luxury transition-all duration-300 hover:scale-105 luxury-touch-target rounded-luxury"
                  >
                    <Link to="/dashboard/operations">
                      <Calendar className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3" />
                      <span className="text-luxury-xs font-semibold">Operations</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild
                    className="h-20 sm:h-24 flex-col border-2 border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white transition-all duration-300 hover:scale-105 luxury-touch-target rounded-luxury"
                  >
                    <Link to="/dashboard/fleet">
                      <Anchor className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3" />
                      <span className="text-luxury-xs font-semibold">Fleet</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild
                    className="h-20 sm:h-24 flex-col border-2 border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white transition-all duration-300 hover:scale-105 luxury-touch-target rounded-luxury"
                  >
                    <Link to="/dashboard/team">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3" />
                      <span className="text-luxury-xs font-semibold">Team</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild
                    className="h-20 sm:h-24 flex-col border-2 border-zatara-gold text-zatara-gold hover:bg-zatara-gold hover:text-zatara-navy transition-all duration-300 hover:scale-105 luxury-touch-target rounded-luxury"
                  >
                    <Link to="/dashboard/analytics">
                      <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3" />
                      <span className="text-luxury-xs font-semibold">Analytics</span>
                    </Link>
                  </Button>
                </>
              )}

              {!userIsOwner && (
                <div className="col-span-2 lg:col-span-4 p-6 sm:p-8 text-center bg-zatara-cream/50 rounded-luxury border-2 border-zatara-gold/20">
                  <p className="text-zatara-navy font-semibold mb-3 text-luxury-sm">Welcome to Zatara Mar!</p>
                  <p className="text-luxury-xs text-zatara-blue leading-relaxed">
                    Your account is set up for client services. Contact your administrator for additional access.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Owner-only luxury section */}
        {userIsOwner && (
          <Card className="gradient-luxury text-white shadow-elegant rounded-luxury animate-slide-up border-2 border-zatara-gold/30">
            <CardHeader className="pb-6">
              <CardTitle className="text-white text-luxury-xl font-playfair">Owner Dashboard</CardTitle>
              <CardDescription className="text-zatara-blue-light text-luxury-sm font-medium">Full system control and oversight</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zatara-blue-light mb-6 text-luxury-sm leading-relaxed">
                Complete access to all system features and analytics.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  asChild
                  className="luxury-touch-target bg-white/20 text-white hover:bg-white/30 rounded-luxury font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Link to="/dashboard/analytics">Business Analytics</Link>
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  asChild
                  className="luxury-touch-target bg-white/20 text-white hover:bg-white/30 rounded-luxury font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Link to="/dashboard/financials">Financial Reports</Link>
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  asChild
                  className="luxury-touch-target bg-white/20 text-white hover:bg-white/30 rounded-luxury font-semibold transition-all duration-300 hover:scale-105 col-span-2 sm:col-span-1"
                >
                  <Link to="/dashboard/users">User Management</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
