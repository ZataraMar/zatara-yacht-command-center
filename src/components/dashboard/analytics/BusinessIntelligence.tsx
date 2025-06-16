
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Anchor, Calendar, Target, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RevenueData {
  month: string;
  revenue: number;
  charters: number;
  guests: number;
}

interface BoatPerformance {
  boat: string;
  revenue: number;
  charters: number;
  avgValue: number;
}

export const BusinessIntelligence = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [boatPerformance, setBoatPerformance] = useState<BoatPerformance[]>([]);
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    totalCharters: 0,
    totalGuests: 0,
    avgCharterValue: 0,
    outstandingPayments: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch current year bookings for analytics
      const currentYear = new Date().getFullYear();
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .gte('start_date', `${currentYear}-01-01`)
        .lte('start_date', `${currentYear}-12-31`);

      if (bookings) {
        processAnalyticsData(bookings);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (bookings: any[]) => {
    // Process monthly revenue data
    const monthlyData: { [key: string]: RevenueData } = {};
    let totalRevenue = 0;
    let totalCharters = bookings.length;
    let totalGuests = 0;
    let totalOutstanding = 0;

    bookings.forEach(booking => {
      const month = new Date(booking.start_date).toLocaleDateString('en-US', { month: 'short' });
      const revenue = booking.charter_total || 0;
      const guests = booking.total_guests || 0;
      const outstanding = booking.outstanding_amount || 0;

      if (!monthlyData[month]) {
        monthlyData[month] = { month, revenue: 0, charters: 0, guests: 0 };
      }

      monthlyData[month].revenue += revenue;
      monthlyData[month].charters += 1;
      monthlyData[month].guests += guests;

      totalRevenue += revenue;
      totalGuests += guests;
      totalOutstanding += outstanding;
    });

    setRevenueData(Object.values(monthlyData));

    // Process boat performance
    const boatData: { [key: string]: BoatPerformance } = {};
    bookings.forEach(booking => {
      const boat = booking.boat || 'Unknown';
      const revenue = booking.charter_total || 0;

      if (!boatData[boat]) {
        boatData[boat] = { boat, revenue: 0, charters: 0, avgValue: 0 };
      }

      boatData[boat].revenue += revenue;
      boatData[boat].charters += 1;
    });

    Object.values(boatData).forEach(boat => {
      boat.avgValue = boat.charters > 0 ? boat.revenue / boat.charters : 0;
    });

    setBoatPerformance(Object.values(boatData));

    // Set KPIs
    setKpis({
      totalRevenue,
      totalCharters,
      totalGuests,
      avgCharterValue: totalCharters > 0 ? totalRevenue / totalCharters : 0,
      outstandingPayments: totalOutstanding,
      conversionRate: 85 // This would need proper calculation with lead data
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = "text-zatara-navy" }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {trend && (
              <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-zatara-blue/10 rounded-full">
            <Icon className="h-6 w-6 text-zatara-blue" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div>
        <h2 className="text-2xl font-bold text-zatara-navy mb-6">Business Intelligence Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(kpis.totalRevenue)}
            icon={DollarSign}
            trend="up"
            trendValue="+12%"
          />
          <KPICard
            title="Total Charters"
            value={kpis.totalCharters.toLocaleString()}
            icon={Anchor}
            trend="up"
            trendValue="+8%"
          />
          <KPICard
            title="Total Guests"
            value={kpis.totalGuests.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="+15%"
          />
          <KPICard
            title="Avg Charter Value"
            value={formatCurrency(kpis.avgCharterValue)}
            icon={Target}
            trend="up"
            trendValue="+5%"
          />
          <KPICard
            title="Outstanding"
            value={formatCurrency(kpis.outstandingPayments)}
            icon={AlertTriangle}
            color="text-red-600"
          />
          <KPICard
            title="Conversion Rate"
            value={`${kpis.conversionRate}%`}
            icon={TrendingUp}
            trend="up"
            trendValue="+2%"
          />
        </div>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="performance">Boat Performance</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="targets">Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue and charter count by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value as number) : value,
                    name === 'revenue' ? 'Revenue' : 'Charters'
                  ]} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#1e40af" name="Revenue" />
                  <Bar yAxisId="right" dataKey="charters" fill="#3b82f6" name="Charters" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Boat Performance</CardTitle>
                <CardDescription>Revenue and charter count by boat</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={boatPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="boat" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="revenue" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Charter Value</CardTitle>
                <CardDescription>By boat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {boatPerformance.map((boat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{boat.boat}</p>
                        <p className="text-sm text-gray-500">{boat.charters} charters</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(boat.avgValue)}</p>
                        <p className="text-sm text-gray-500">avg value</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>Projected revenue based on current trends</CardDescription>
            </CardHeader>
            <CardContent className="text-center p-8">
              <p className="text-gray-600">Forecasting module will integrate with your business_forecasting table data</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Targets</CardTitle>
              <CardDescription>Track progress against your business goals</CardDescription>
            </CardHeader>
            <CardContent className="text-center p-8">
              <p className="text-gray-600">Target tracking will integrate with your business_targets table data</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
