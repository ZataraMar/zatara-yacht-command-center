
import React from 'react';
import { useAuth } from '@/contexts/SecureAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Anchor, 
  Users, 
  TrendingUp, 
  MapPin, 
  Phone,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export const DashboardHome = () => {
  const { profile } = useAuth();
  const userRole = profile?.role || '';

  const isClientRole = ['charter_clients', 'boat_club_clients'].includes(userRole);
  const isTeamRole = ['team', 'agency', 'management', 'owners', 'staff', 'skippers'].includes(userRole);

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'charter_clients':
        return {
          title: `Welcome back, ${profile?.first_name}!`,
          subtitle: "Your luxury charter experiences await",
          description: "Manage your bookings, explore new destinations, and connect with our team."
        };
      case 'boat_club_clients':
        return {
          title: `Welcome to the Club, ${profile?.first_name}!`,
          subtitle: "Your boat club membership dashboard",
          description: "Schedule your boat time, track usage, and connect with fellow members."
        };
      case 'agency':
        return {
          title: `Partner Dashboard - ${profile?.first_name}`,
          subtitle: "Agency management portal",
          description: "Manage client bookings, track commissions, and access promotional materials."
        };
      default:
        return {
          title: `Welcome back, ${profile?.first_name}!`,
          subtitle: "Zatara Team Dashboard",
          description: "Manage operations, track performance, and ensure exceptional guest experiences."
        };
    }
  };

  const welcome = getWelcomeMessage();

  // Sample data - in real implementation, fetch from your database
  const clientStats = {
    upcomingBookings: 2,
    totalBookings: 12,
    loyaltyPoints: 450,
    memberSince: '2023'
  };

  const teamStats = {
    todayCharters: 8,
    thisWeekBookings: 45,
    fleetUtilization: 78,
    pendingTasks: 3
  };

  if (isClientRole) {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-zatara-blue to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">{welcome.title}</CardTitle>
            <CardDescription className="text-blue-100">{welcome.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-blue-50">{welcome.description}</p>
          </CardContent>
        </Card>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-zatara-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{clientStats.upcomingBookings}</div>
              <p className="text-xs text-muted-foreground">bookings scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Total Trips</CardTitle>
                <Anchor className="h-4 w-4 text-zatara-gold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{clientStats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">amazing experiences</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Loyalty Points</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{clientStats.loyaltyPoints}</div>
              <p className="text-xs text-muted-foreground">points earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Member Since</CardTitle>
                <Users className="h-4 w-4 text-zatara-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{clientStats.memberSince}</div>
              <p className="text-xs text-muted-foreground">valued member</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions for Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Everything you need at your fingertips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gradient-zatara">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Book Charter</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col border-2 border-zatara-blue text-zatara-blue hover:bg-zatara-blue hover:text-white">
                <MapPin className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Explore Destinations</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col border-2 border-zatara-gold text-zatara-gold hover:bg-zatara-gold hover:text-zatara-navy">
                <Phone className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Contact Concierge</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTeamRole) {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-zatara-navy to-zatara-blue text-white">
          <CardHeader>
            <CardTitle className="text-2xl">{welcome.title}</CardTitle>
            <CardDescription className="text-blue-100">{welcome.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-blue-50">{welcome.description}</p>
          </CardContent>
        </Card>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Today's Charters</CardTitle>
                <Calendar className="h-4 w-4 text-zatara-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{teamStats.todayCharters}</div>
              <p className="text-xs text-muted-foreground">active bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">This Week</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{teamStats.thisWeekBookings}</div>
              <p className="text-xs text-muted-foreground">total bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Fleet Utilization</CardTitle>
                <Anchor className="h-4 w-4 text-zatara-gold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{teamStats.fleetUtilization}%</div>
              <p className="text-xs text-muted-foreground">efficiency rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zatara-navy">{teamStats.pendingTasks}</div>
              <p className="text-xs text-muted-foreground">require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Charter ZAT-2024-156 completed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">PuraVida maintenance scheduled</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New booking confirmed: ZAT-2024-157</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common operations and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-16 flex-col gradient-zatara">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">View Charters</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Anchor className="h-5 w-5 mb-1" />
                  <span className="text-xs">Fleet Status</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs">Team View</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <TrendingUp className="h-5 w-5 mb-1" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default view for other roles
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{welcome.title}</CardTitle>
          <CardDescription>{welcome.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{welcome.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};
