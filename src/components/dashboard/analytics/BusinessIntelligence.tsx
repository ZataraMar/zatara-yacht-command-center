
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Anchor, Calendar, Target, AlertTriangle } from 'lucide-react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { supabase } from '@/integrations/supabase/client';

interface RevenueData {
  month: string;
  revenue: number;
  charters: number;
  guests: number;
  year: number;
}

interface BoatPerformance {
  boat: string;
  revenue: number;
  charters: number;
  avgValue: number;
}

interface ForecastData {
  month: string;
  forecast: number;
  actual: number;
  target: number;
}

interface TargetData {
  metric: string;
  target: number;
  actual: number;
  progress: number;
}

export const BusinessIntelligence = () => {
  const { bookings, loading } = useComprehensiveBookings();
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [boatPerformance, setBoatPerformance] = useState<BoatPerformance[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [targetData, setTargetData] = useState<TargetData[]>([]);
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    totalCharters: 0,
    totalGuests: 0,
    avgCharterValue: 0,
    outstandingPayments: 0,
    conversionRate: 0
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      processAnalyticsData(bookings);
      fetchForecastingData();
      fetchTargetsData();
    }
  }, [bookings]);

  const processAnalyticsData = (bookingsData: any[]) => {
    // Process monthly revenue data with year separation
    const monthlyData: { [key: string]: RevenueData } = {};
    let totalRevenue = 0;
    let totalCharters = bookingsData.length;
    let totalGuests = 0;
    let totalOutstanding = 0;

    bookingsData.forEach(booking => {
      const date = new Date(booking.start_date);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month}-${year}`;
      const revenue = booking.charter_total || 0;
      const guests = booking.total_guests || 0;
      const outstanding = booking.outstanding_amount || 0;

      if (!monthlyData[key]) {
        monthlyData[key] = { month: `${month} ${year}`, revenue: 0, charters: 0, guests: 0, year };
      }

      monthlyData[key].revenue += revenue;
      monthlyData[key].charters += 1;
      monthlyData[key].guests += guests;

      totalRevenue += revenue;
      totalGuests += guests;
      totalOutstanding += outstanding;
    });

    setRevenueData(Object.values(monthlyData).sort((a, b) => a.year - b.year));

    // Process boat performance
    const boatData: { [key: string]: BoatPerformance } = {};
    bookingsData.forEach(booking => {
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

  const fetchForecastingData = async () => {
    try {
      const { data: forecasts, error } = await supabase
        .from('business_forecasting')
        .select('*')
        .order('forecast_year', { ascending: true })
        .order('forecast_month', { ascending: true });

      if (error) {
        console.error('Error fetching forecasting data:', error);
        return;
      }

      if (forecasts && forecasts.length > 0) {
        const forecastChartData = forecasts.map(forecast => ({
          month: `${forecast.forecast_month}/${forecast.forecast_year}`,
          forecast: forecast.total_revenue_forecast || 0,
          actual: 0, // Would be calculated from actual bookings
          target: forecast.charter_revenue_forecast || 0
        }));
        setForecastData(forecastChartData);
      }
    } catch (error) {
      console.error('Error processing forecasting data:', error);
    }
  };

  const fetchTargetsData = async () => {
    try {
      const { data: targets, error } = await supabase
        .from('business_targets')
        .select('*')
        .eq('target_year', new Date().getFullYear())
        .order('target_period', { ascending: true });

      if (error) {
        console.error('Error fetching targets data:', error);
        return;
      }

      if (targets && targets.length > 0) {
        const targetMetrics = targets.map(target => ({
          metric: `${target.target_period} Revenue`,
          target: target.total_revenue_target || 0,
          actual: kpis.totalRevenue, // Would be calculated properly per period
          progress: target.total_revenue_target > 0 ? (kpis.totalRevenue / target.total_revenue_target) * 100 : 0
        }));
        setTargetData(targetMetrics);
      }
    } catch (error) {
      console.error('Error processing targets data:', error);
    }
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

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-red-600 mb-2">Error loading analytics data</p>
            <p className="text-sm text-gray-600">{error}</p>
          </CardContent>
        </Card>
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
              <CardTitle>Multi-Year Revenue Trend</CardTitle>
              <CardDescription>Revenue and charter count across all years</CardDescription>
            </CardHeader>
            <CardContent>
              {revenueData.length > 0 ? (
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
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No revenue data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Boat Performance</CardTitle>
                <CardDescription>Revenue by boat across all years</CardDescription>
              </CardHeader>
              <CardContent>
                {boatPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={boatPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="boat" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="revenue" fill="#1e40af" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No boat performance data available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Charter Value</CardTitle>
                <CardDescription>By boat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {boatPerformance.length > 0 ? (
                    boatPerformance.map((boat, index) => (
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
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No boat data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>Forecasted vs actual revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              {forecastData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Line type="monotone" dataKey="forecast" stroke="#1e40af" name="Forecast" />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="#f59e0b" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p className="mb-4">No forecasting data available</p>
                  <p className="text-sm">Forecasts will be loaded from the business_forecasting table</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Targets Progress</CardTitle>
              <CardDescription>Track progress against {new Date().getFullYear()} business goals</CardDescription>
            </CardHeader>
            <CardContent>
              {targetData.length > 0 ? (
                <div className="space-y-4">
                  {targetData.map((target, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{target.metric}</h4>
                        <Badge variant={target.progress >= 100 ? "default" : target.progress >= 75 ? "secondary" : "destructive"}>
                          {target.progress.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Target: {formatCurrency(target.target)}</span>
                        <span>Actual: {formatCurrency(target.actual)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-zatara-blue h-2 rounded-full" 
                          style={{ width: `${Math.min(target.progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p className="mb-4">No targets data available</p>
                  <p className="text-sm">Targets will be loaded from the business_targets table</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
