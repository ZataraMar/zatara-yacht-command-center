
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, Anchor, TrendingUp, AlertTriangle, Clock, CheckCircle, Activity, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SecureAuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useSystemStatus } from '@/hooks/useSystemStatus';

export const DashboardHome = () => {
  const { profile } = useAuth();
  const { metrics, loading } = useDashboardData();
  const { systemStatus, overallHealth, loading: healthLoading } = useSystemStatus();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const MetricCard = ({ title, value, icon: Icon, color = "text-zatara-navy", description, href, trend }: any) => (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <Link to={href || '/dashboard/operations'} className="block">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className={`text-3xl font-bold ${color} group-hover:scale-105 transition-transform`}>{value}</p>
              {description && (
                <p className="text-xs text-gray-500 mt-2">{description}</p>
              )}
              {trend && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{trend}</span>
                </div>
              )}
            </div>
            <div className="p-4 bg-gradient-to-br from-zatara-blue/10 to-blue-100 rounded-full group-hover:from-zatara-blue/20 group-hover:to-blue-200 transition-colors">
              <Icon className="h-8 w-8 text-zatara-blue" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userRole = profile?.role || '';
  const isStaffOrHigher = ['team', 'agency', 'management', 'owner', 'staff', 'skippers'].includes(userRole);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-zatara-navy">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="bg-gradient-to-r from-zatara-blue/5 to-blue-50 p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zatara-navy mb-2">
              {getGreeting()}, {profile?.first_name}!
            </h1>
            <p className="text-lg text-zatara-blue">
              {isStaffOrHigher ? 
                'Here\'s your operations overview for today' : 
                'Welcome to your Zatara charter dashboard'
              }
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-br from-zatara-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">Z</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics for Staff */}
      {isStaffOrHigher && (
        <div>
          <h2 className="text-2xl font-semibold text-zatara-navy mb-6 flex items-center">
            <Activity className="h-6 w-6 mr-2" />
            Live Operations Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Today's Charters"
              value={metrics.todaysCharters}
              icon={Calendar}
              description="Active today"
              href="/dashboard/operations"
              color={metrics.todaysCharters > 0 ? "text-green-600" : "text-gray-500"}
            />
            <MetricCard
              title="Upcoming Charters"
              value={metrics.upcomingCharters}
              icon={Anchor}
              description="Next 7 days"
              href="/dashboard/operations"
              trend="+2 this week"
            />
            <MetricCard
              title="Revenue (YTD)"
              value={formatCurrency(metrics.totalRevenue)}
              icon={DollarSign}
              href="/dashboard/financials"
              trend="+12% vs last year"
            />
            <MetricCard
              title="Outstanding"
              value={formatCurrency(metrics.outstandingPayments)}
              icon={AlertTriangle}
              color={metrics.outstandingPayments > 0 ? "text-red-600" : "text-green-600"}
              href="/dashboard/operations?tab=reconciliation"
            />
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Total Guests (YTD)"
              value={metrics.totalGuests.toLocaleString()}
              icon={Users}
              description="Guest satisfaction: 4.8/5"
              trend="+15% vs last year"
            />
            <MetricCard
              title="Avg Charter Value"
              value={formatCurrency(metrics.avgCharterValue)}
              icon={TrendingUp}
              description="Target: €1,200"
              trend="+5% vs target"
            />
            <MetricCard
              title="Fleet Occupancy"
              value={`${metrics.occupancyRate.toFixed(1)}%`}
              icon={Percent}
              description="This month"
              color={metrics.occupancyRate > 70 ? "text-green-600" : "text-yellow-600"}
            />
          </div>
        </div>
      )}

      {/* Enhanced Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-zatara-navy mb-6 flex items-center">
          <CheckCircle className="h-6 w-6 mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isStaffOrHigher ? (
            <>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Live Charter Board</span>
                  </CardTitle>
                  <CardDescription>Real-time charter status and guest communications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Active charters</span>
                    <Badge variant={metrics.todaysCharters > 0 ? "default" : "secondary"}>
                      {metrics.todaysCharters}
                    </Badge>
                  </div>
                  <Link to="/dashboard/operations">
                    <Button className="w-full">View Live Board</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span>Charter Reconciliation</span>
                  </CardTitle>
                  <CardDescription>Pre-departure checklist and payment verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Pending items</span>
                    <Badge variant={metrics.pendingReconciliations > 0 ? "destructive" : "secondary"}>
                      {metrics.pendingReconciliations}
                    </Badge>
                  </div>
                  <Link to="/dashboard/operations?tab=reconciliation">
                    <Button variant="outline" className="w-full">Manage Reconciliation</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Business Analytics</span>
                  </CardTitle>
                  <CardDescription>Revenue insights and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(metrics.totalRevenue)}
                    </p>
                    <p className="text-sm text-gray-600">Year to date</p>
                  </div>
                  <Link to="/dashboard/operations?tab=analytics">
                    <Button variant="outline" className="w-full">View Analytics</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>My Bookings</span>
                  </CardTitle>
                  <CardDescription>View and manage your charter bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/bookings">
                    <Button className="w-full">View Bookings</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>Account Settings</span>
                  </CardTitle>
                  <CardDescription>Update your profile and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/settings">
                    <Button variant="outline" className="w-full">Manage Account</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Live System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              healthLoading ? 'bg-gray-400' : 
              overallHealth === 'healthy' ? 'bg-green-500 animate-pulse' : 
              overallHealth === 'warning' ? 'bg-yellow-500 animate-pulse' : 
              'bg-red-500 animate-pulse'
            }`}></div>
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {healthLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-zatara-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {systemStatus.map((status, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                  status.status === 'healthy' ? 'bg-green-50' : 
                  status.status === 'warning' ? 'bg-yellow-50' : 
                  'bg-red-50'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    status.status === 'healthy' ? 'bg-green-500' : 
                    status.status === 'warning' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium capitalize">{status.component.replace('_', ' ')}</p>
                    <p className={`text-xs ${
                      status.status === 'healthy' ? 'text-green-600' : 
                      status.status === 'warning' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>{status.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
