
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, Users, Anchor, AlertTriangle, CheckCircle2, Settings, Database } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useFinancialData } from '@/hooks/useFinancialData';
import { DataAuditReport } from './admin/DataAuditReport';
import { formatCurrency } from '@/utils/financialUtils';

export const DashboardHome = () => {
  const { metrics, loading: dashboardLoading } = useDashboardData();
  const { financialData, loading: financialLoading } = useFinancialData();

  const loading = dashboardLoading || financialLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  const hasBookingData = metrics.todaysCharters > 0 || metrics.upcomingCharters > 0 || metrics.totalRevenue > 0;
  const hasFinancialData = financialData.total_revenue > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Dashboard Overview</h1>
          <p className="text-zatara-blue">Real-time charter business intelligence</p>
        </div>
      </div>

      {!hasBookingData && !hasFinancialData && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800">No Data Available</h3>
                <p className="text-sm text-yellow-700">
                  No booking or financial data found. Check the Data Audit tab to review your database tables.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="audit">Data Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {hasBookingData || hasFinancialData ? (
            <>
              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Today's Charters</p>
                        <p className="text-2xl font-bold text-zatara-navy">{metrics.todaysCharters}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-zatara-navy">
                          {formatCurrency(financialData.total_revenue)}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Outstanding Payments</p>
                        <p className="text-2xl font-bold text-red-600">
                          {formatCurrency(financialData.outstanding_payments)}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Guests</p>
                        <p className="text-2xl font-bold text-zatara-navy">{metrics.totalGuests}</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fleet Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Anchor className="h-5 w-5" />
                    <span>Fleet Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metrics.fleetStatus.map((boat, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{boat.name}</h3>
                          <Badge variant={boat.status === 'available' ? 'default' : 'secondary'}>
                            {boat.status}
                          </Badge>
                        </div>
                        {boat.nextCharter && (
                          <p className="text-sm text-gray-600">
                            Next: {new Date(boat.nextCharter.start_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Data Available</h3>
                <p className="text-gray-500 mb-4">
                  Connect your booking and financial data to see dashboard metrics
                </p>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Data Sources
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest charter activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics.recentCharters.length > 0 ? (
                <div className="space-y-4">
                  {metrics.recentCharters.map((charter, index) => (
                    <div key={index} className="border-l-4 border-zatara-blue pl-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{charter.guest_first_name} {charter.guest_surname}</p>
                          <p className="text-sm text-gray-600">
                            {charter.boat} • {new Date(charter.start_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge>{charter.booking_status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent charter activity found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <DataAuditReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};
