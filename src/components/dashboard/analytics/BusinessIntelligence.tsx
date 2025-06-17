
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Anchor, Calendar, Target, AlertTriangle, Filter } from 'lucide-react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { supabase } from '@/integrations/supabase/client';
import { MonthOnMonthAnalytics } from './MonthOnMonthAnalytics';

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

interface KPIs {
  totalRevenue: number;
  totalCharters: number;
  totalGuests: number;
  avgCharterValue: number;
  outstandingPayments: number;
  conversionRate: number;
}

export const BusinessIntelligence = () => {
  const { bookings, loading, error } = useComprehensiveBookings();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [comparisonYear, setComparisonYear] = useState<string>('');
  
  // State declarations that were missing
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [boatPerformance, setBoatPerformance] = useState<BoatPerformance[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [targetData, setTargetData] = useState<TargetData[]>([]);
  const [kpis, setKpis] = useState<KPIs>({
    totalRevenue: 0,
    totalCharters: 0,
    totalGuests: 0,
    avgCharterValue: 0,
    outstandingPayments: 0,
    conversionRate: 0
  });
  
  // Get available years from bookings data
  const availableYears = useMemo(() => {
    if (!bookings || bookings.length === 0) return [];
    const years = [...new Set(bookings.map(booking => new Date(booking.start_date).getFullYear()))];
    return years.sort((a, b) => b - a);
  }, [bookings]);

  // Filter bookings based on selected year and month
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    
    return bookings.filter(booking => {
      const date = new Date(booking.start_date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      if (selectedYear !== 'all' && year !== parseInt(selectedYear)) return false;
      if (selectedMonth !== 'all' && month !== parseInt(selectedMonth)) return false;
      
      return true;
    });
  }, [bookings, selectedYear, selectedMonth]);

  useEffect(() => {
    if (filteredBookings && filteredBookings.length > 0) {
      processAnalyticsData(filteredBookings);
      fetchForecastingData();
      fetchTargetsData();
    }
  }, [filteredBookings]);

  const processAnalyticsData = (bookingsData: any[]) => {
    // Process monthly revenue data
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

    setRevenueData(Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(`${a.month.split(' ')[0]} 1, ${a.year}`);
      const dateB = new Date(`${b.month.split(' ')[0]} 1, ${b.year}`);
      return dateA.getTime() - dateB.getTime();
    }));

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

    // Calculate actual conversion rate from data
    const confirmedBookings = bookingsData.filter(b => 
      b.booking_status?.toLowerCase().includes('confirmed') || 
      b.booking_status?.toLowerCase().includes('booked')
    ).length;
    const actualConversionRate = totalCharters > 0 ? (confirmedBookings / totalCharters) * 100 : 0;

    // Set KPIs
    setKpis({
      totalRevenue,
      totalCharters,
      totalGuests,
      avgCharterValue: totalCharters > 0 ? totalRevenue / totalCharters : 0,
      outstandingPayments: totalOutstanding,
      conversionRate: actualConversionRate
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
        const forecastChartData = forecasts.map(forecast => {
          // Calculate actual revenue for this month/year from bookings
          const actualRevenue = filteredBookings
            .filter(booking => {
              const date = new Date(booking.start_date);
              return date.getFullYear() === forecast.forecast_year && 
                     date.getMonth() + 1 === forecast.forecast_month;
            })
            .reduce((sum, booking) => sum + (booking.charter_total || 0), 0);

          return {
            month: `${forecast.forecast_month}/${forecast.forecast_year}`,
            forecast: forecast.total_revenue_forecast || 0,
            actual: actualRevenue,
            target: forecast.charter_revenue_forecast || 0
          };
        });
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
        .eq('target_year', selectedYear !== 'all' ? parseInt(selectedYear) : new Date().getFullYear())
        .order('target_period', { ascending: true });

      if (error) {
        console.error('Error fetching targets data:', error);
        return;
      }

      if (targets && targets.length > 0) {
        const targetMetrics = targets.map(target => ({
          metric: `${target.target_period} Revenue`,
          target: target.total_revenue_target || 0,
          actual: kpis.totalRevenue,
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

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { trend: 'neutral', value: '0%' };
    const change = ((current - previous) / previous) * 100;
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
    };
  };

  const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = "text-zatara-navy" }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {trend && (
              <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
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

  const clearFilters = () => {
    setSelectedYear('all');
    setSelectedMonth('all');
    setComparisonYear('');
  };

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
      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Business Intelligence Dashboard</h2>
          <p className="text-gray-600">
            Showing data for {selectedYear === 'all' ? 'All Years' : selectedYear}
            {selectedMonth !== 'all' && ` - ${new Date(2023, parseInt(selectedMonth) - 1).toLocaleDateString('en', { month: 'long' })}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {new Date(2023, i).toLocaleDateString('en', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={clearFilters} size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(kpis.totalRevenue)}
          icon={DollarSign}
        />
        <KPICard
          title="Total Charters"
          value={kpis.totalCharters.toLocaleString()}
          icon={Anchor}
        />
        <KPICard
          title="Total Guests"
          value={kpis.totalGuests.toLocaleString()}
          icon={Users}
        />
        <KPICard
          title="Avg Charter Value"
          value={formatCurrency(kpis.avgCharterValue)}
          icon={Target}
        />
        <KPICard
          title="Outstanding"
          value={formatCurrency(kpis.outstandingPayments)}
          icon={AlertTriangle}
          color="text-red-600"
        />
        <KPICard
          title="Conversion Rate"
          value={`${kpis.conversionRate.toFixed(1)}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="monthonmonth" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="monthonmonth">Month-on-Month</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="performance">Boat Performance</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="targets">Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="monthonmonth" className="space-y-4">
          <MonthOnMonthAnalytics />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>
                Monthly revenue and charter count for filtered period ({filteredBookings.length} bookings)
              </CardDescription>
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
                  No revenue data available for selected filters
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
                <CardDescription>Revenue by boat for filtered period</CardDescription>
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
                <CardTitle>Average Charter Value by Boat</CardTitle>
                <CardDescription>Performance metrics</CardDescription>
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
              <CardTitle>Revenue Forecasting vs Actual</CardTitle>
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
                    <Line type="monotone" dataKey="forecast" stroke="#1e40af" name="Forecast" strokeWidth={2} />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" name="Actual" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#f59e0b" name="Target" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p className="mb-4">No forecasting data available</p>
                  <p className="text-sm">Add forecasts in the business_forecasting table to see comparisons</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Targets Progress</CardTitle>
              <CardDescription>
                Progress against {selectedYear !== 'all' ? selectedYear : new Date().getFullYear()} business goals
              </CardDescription>
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
                  <p className="text-sm">Add targets in the business_targets table to track progress</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
