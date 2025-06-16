
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, Anchor, TrendingUp, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

export const DashboardHome = () => {
  const { profile } = useAuth();
  const [metrics, setMetrics] = useState({
    todaysCharters: 0,
    upcomingCharters: 0,
    totalRevenue: 0,
    outstandingPayments: 0,
    pendingReconciliations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Today's charters
      const { data: todayCharters } = await supabase
        .from('bookings')
        .select('id')
        .gte('start_date', today)
        .lt('start_date', today + 'T23:59:59');

      // Upcoming charters
      const { data: upcomingCharters } = await supabase
        .from('bookings')
        .select('id')
        .gt('start_date', today + 'T23:59:59')
        .lte('start_date', nextWeek);

      // Revenue and payments
      const { data: revenue } = await supabase
        .from('bookings')
        .select('charter_total, outstanding_amount')
        .gte('start_date', '2024-01-01');

      let totalRevenue = 0;
      let outstandingPayments = 0;
      
      revenue?.forEach(booking => {
        totalRevenue += booking.charter_total || 0;
        outstandingPayments += booking.outstanding_amount || 0;
      });

      // Pending reconciliations
      const { data: pendingRecon } = await supabase
        .from('charter_reconciliation')
        .select('id')
        .eq('preparation_status', 'pending');

      setMetrics({
        todaysCharters: todayCharters?.length || 0,
        upcomingCharters: upcomingCharters?.length || 0,
        totalRevenue,
        outstandingPayments,
        pendingReconciliations: pendingRecon?.length || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const MetricCard = ({ title, value, icon: Icon, color = "text-zatara-navy", description, href }: any) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <Link to={href || '/dashboard/operations'}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}
            </div>
            <div className="p-3 bg-zatara-blue/10 rounded-full">
              <Icon className="h-6 w-6 text-zatara-blue" />
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
  const isStaffOrHigher = ['team', 'agency', 'management', 'owners', 'staff', 'skippers'].includes(userRole);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zatara-navy">
          {getGreeting()}, {profile?.first_name}!
        </h1>
        <p className="text-zatara-blue mt-2">
          {isStaffOrHigher ? 
            'Here\'s your operations overview for today' : 
            'Welcome to your Zatara Mar dashboard'
          }
        </p>
      </div>

      {/* Key Metrics for Staff */}
      {isStaffOrHigher && (
        <div>
          <h2 className="text-xl font-semibold text-zatara-navy mb-4">Operations Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Today's Charters"
              value={metrics.todaysCharters}
              icon={Calendar}
              description="Scheduled for today"
              href="/dashboard/operations"
            />
            <MetricCard
              title="Upcoming Charters"
              value={metrics.upcomingCharters}
              icon={Anchor}
              description="Next 7 days"
              href="/dashboard/operations"
            />
            <MetricCard
              title="Total Revenue (YTD)"
              value={formatCurrency(metrics.totalRevenue)}
              icon={DollarSign}
              href="/dashboard/operations?tab=analytics"
            />
            <MetricCard
              title="Outstanding Payments"
              value={formatCurrency(metrics.outstandingPayments)}
              icon={AlertTriangle}
              color="text-red-600"
              href="/dashboard/operations?tab=reconciliation"
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-zatara-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isStaffOrHigher ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Live Charter Board</span>
                  </CardTitle>
                  <CardDescription>View today's charters and real-time status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/operations">
                    <Button className="w-full">View Live Board</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Charter Reconciliation</span>
                  </CardTitle>
                  <CardDescription>Pre-departure checklist and preparation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Pending items</span>
                    <Badge variant="outline">{metrics.pendingReconciliations}</Badge>
                  </div>
                  <Link to="/dashboard/operations?tab=reconciliation">
                    <Button variant="outline" className="w-full">Manage Reconciliation</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span>Business Analytics</span>
                  </CardTitle>
                  <CardDescription>Revenue trends and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/operations?tab=analytics">
                    <Button variant="outline" className="w-full">View Analytics</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
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

              <Card>
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

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Database Connection</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Communication System</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
