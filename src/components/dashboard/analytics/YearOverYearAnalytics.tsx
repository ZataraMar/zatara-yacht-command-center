
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Users, 
  Euro, 
  Calendar,
  Minus
} from 'lucide-react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const YearOverYearAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { bookings, loading } = useComprehensiveBookings();

  // Calculate year-over-year metrics
  const yearlyMetrics = useMemo(() => {
    const metrics: Record<number, any> = {};
    
    bookings.forEach(booking => {
      const year = booking.booking_year;
      const month = booking.booking_month;
      
      if (!metrics[year]) {
        metrics[year] = {
          year,
          totalBookings: 0,
          totalRevenue: 0,
          totalGuests: 0,
          avgBookingValue: 0,
          monthlyData: {},
          sourceBreakdown: {},
          boatBreakdown: {}
        };
      }
      
      // Monthly breakdown
      if (!metrics[year].monthlyData[month]) {
        metrics[year].monthlyData[month] = {
          month,
          bookings: 0,
          revenue: 0,
          guests: 0
        };
      }
      
      // Aggregate data
      metrics[year].totalBookings++;
      metrics[year].totalRevenue += booking.charter_total || 0;
      metrics[year].totalGuests += booking.total_guests || 0;
      
      metrics[year].monthlyData[month].bookings++;
      metrics[year].monthlyData[month].revenue += booking.charter_total || 0;
      metrics[year].monthlyData[month].guests += booking.total_guests || 0;
      
      // Source breakdown
      const source = booking.booking_source || 'unknown';
      metrics[year].sourceBreakdown[source] = (metrics[year].sourceBreakdown[source] || 0) + 1;
      
      // Boat breakdown
      const boat = booking.boat || 'unknown';
      metrics[year].boatBreakdown[boat] = (metrics[year].boatBreakdown[boat] || 0) + 1;
    });
    
    // Calculate averages
    Object.values(metrics).forEach((yearData: any) => {
      yearData.avgBookingValue = yearData.totalBookings > 0 
        ? yearData.totalRevenue / yearData.totalBookings 
        : 0;
    });
    
    return metrics;
  }, [bookings]);

  const years = Object.keys(yearlyMetrics).map(Number).sort((a, b) => b - a);
  
  // Calculate year-over-year changes
  const yearComparisons = useMemo(() => {
    const comparisons: any[] = [];
    
    for (let i = 0; i < years.length - 1; i++) {
      const currentYear = years[i];
      const previousYear = years[i + 1];
      
      const current = yearlyMetrics[currentYear];
      const previous = yearlyMetrics[previousYear];
      
      if (current && previous) {
        comparisons.push({
          currentYear,
          previousYear,
          bookingsChange: previous.totalBookings > 0 ? ((current.totalBookings - previous.totalBookings) / previous.totalBookings) * 100 : 0,
          revenueChange: previous.totalRevenue > 0 ? ((current.totalRevenue - previous.totalRevenue) / previous.totalRevenue) * 100 : 0,
          guestsChange: previous.totalGuests > 0 ? ((current.totalGuests - previous.totalGuests) / previous.totalGuests) * 100 : 0,
          avgValueChange: previous.avgBookingValue > 0 ? ((current.avgBookingValue - previous.avgBookingValue) / previous.avgBookingValue) * 100 : 0
        });
      }
    }
    
    return comparisons;
  }, [yearlyMetrics, years]);

  // Monthly comparison data for charts
  const monthlyComparisonData = useMemo(() => {
    const data: any[] = [];
    
    for (let month = 1; month <= 12; month++) {
      const monthData: any = {
        month: new Date(2023, month - 1).toLocaleDateString('en', { month: 'short' })
      };
      
      years.forEach(year => {
        const yearData = yearlyMetrics[year];
        const monthMetrics = yearData?.monthlyData[month];
        
        monthData[`revenue_${year}`] = monthMetrics?.revenue || 0;
        monthData[`bookings_${year}`] = monthMetrics?.bookings || 0;
        monthData[`guests_${year}`] = monthMetrics?.guests || 0;
      });
      
      data.push(monthData);
    }
    
    return data;
  }, [yearlyMetrics, years]);

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Year-over-Year Analytics</h1>
          <p className="text-zatara-blue">Compare business performance across multiple years</p>
        </div>
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
          placeholder="Filter date range"
        />
      </div>

      {/* Year Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {years.slice(0, 4).map(year => {
          const data = yearlyMetrics[year];
          return (
            <Card key={year}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{year}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bookings</span>
                    <span className="font-medium">{data.totalBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-medium">€{Math.round(data.totalRevenue).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Guests</span>
                    <span className="font-medium">{data.totalGuests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg Value</span>
                    <span className="font-medium">€{Math.round(data.avgBookingValue)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Year-over-Year Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Changes</CardTitle>
          <CardDescription>Percentage changes compared to previous year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {yearComparisons.map((comparison) => (
              <div key={`${comparison.currentYear}-${comparison.previousYear}`} className="border rounded-lg p-4">
                <h4 className="font-medium text-lg mb-3">
                  {comparison.currentYear} vs {comparison.previousYear}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(comparison.bookingsChange)}
                    <div>
                      <div className="text-sm text-gray-600">Bookings</div>
                      <div className={`font-medium ${getTrendColor(comparison.bookingsChange)}`}>
                        {comparison.bookingsChange > 0 ? '+' : ''}{comparison.bookingsChange.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(comparison.revenueChange)}
                    <div>
                      <div className="text-sm text-gray-600">Revenue</div>
                      <div className={`font-medium ${getTrendColor(comparison.revenueChange)}`}>
                        {comparison.revenueChange > 0 ? '+' : ''}{comparison.revenueChange.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(comparison.guestsChange)}
                    <div>
                      <div className="text-sm text-gray-600">Guests</div>
                      <div className={`font-medium ${getTrendColor(comparison.guestsChange)}`}>
                        {comparison.guestsChange > 0 ? '+' : ''}{comparison.guestsChange.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(comparison.avgValueChange)}
                    <div>
                      <div className="text-sm text-gray-600">Avg Value</div>
                      <div className={`font-medium ${getTrendColor(comparison.avgValueChange)}`}>
                        {comparison.avgValueChange > 0 ? '+' : ''}{comparison.avgValueChange.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Booking Trends</CardTitle>
              <CardDescription>Compare monthly performance across years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  {years.map((year, index) => (
                    <Bar 
                      key={year}
                      dataKey={`bookings_${year}`} 
                      fill={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}
                      name={`${year} Bookings`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue comparison across years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`€${Number(value).toLocaleString()}`, 'Revenue']} />
                  {years.map((year, index) => (
                    <Line 
                      key={year}
                      type="monotone" 
                      dataKey={`revenue_${year}`} 
                      stroke={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}
                      strokeWidth={2}
                      name={`${year} Revenue`}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Source Performance</CardTitle>
                <CardDescription>Booking sources by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {years.map(year => {
                    const sources = yearlyMetrics[year]?.sourceBreakdown || {};
                    const total = Object.values(sources).reduce((sum: number, count: any) => sum + Number(count), 0);
                    
                    return (
                      <div key={year} className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">{year} ({total} bookings)</h4>
                        <div className="space-y-1">
                          {Object.entries(sources).map(([source, count]: [string, any]) => (
                            <div key={source} className="flex items-center justify-between text-sm">
                              <span>{source}</span>
                              <div className="flex items-center space-x-2">
                                <span>{Number(count)}</span>
                                <Badge variant="outline">
                                  {total > 0 ? ((Number(count) / total) * 100).toFixed(1) : '0'}%
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Boat Performance</CardTitle>
                <CardDescription>Boat utilization by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {years.map(year => {
                    const boats = yearlyMetrics[year]?.boatBreakdown || {};
                    const total = Object.values(boats).reduce((sum: number, count: any) => sum + Number(count), 0);
                    
                    return (
                      <div key={year} className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">{year} ({total} bookings)</h4>
                        <div className="space-y-1">
                          {Object.entries(boats).map(([boat, count]: [string, any]) => (
                            <div key={boat} className="flex items-center justify-between text-sm">
                              <span>{boat}</span>
                              <div className="flex items-center space-x-2">
                                <span>{Number(count)}</span>
                                <Badge variant="outline">
                                  {total > 0 ? ((Number(count) / total) * 100).toFixed(1) : '0'}%
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
