
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';

interface MonthlyData {
  month: string;
  monthNumber: number;
  [key: string]: number | string; // For dynamic year columns like "2022_bookings", "2023_revenue", etc.
}

export const MonthOnMonthAnalytics = () => {
  const { bookings, loading } = useComprehensiveBookings();

  const { monthlyComparisonData, availableYears } = useMemo(() => {
    if (!bookings || bookings.length === 0) {
      return { monthlyComparisonData: [], availableYears: [] };
    }

    // Get all unique years from the data
    const years = [...new Set(bookings.map(booking => new Date(booking.start_date).getFullYear()))].sort();
    
    // Get current month to limit display
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Create month data structure
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData: MonthlyData[] = [];

    for (let monthNum = 1; monthNum <= 12; monthNum++) {
      // Only show months up to current month if we're in the current year
      const shouldIncludeMonth = years.some(year => 
        year < currentYear || (year === currentYear && monthNum <= currentMonth)
      );

      if (!shouldIncludeMonth) continue;

      const monthData: MonthlyData = {
        month: monthNames[monthNum - 1],
        monthNumber: monthNum
      };

      // Calculate data for each year for this month
      years.forEach(year => {
        const monthBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.start_date);
          return bookingDate.getFullYear() === year && bookingDate.getMonth() + 1 === monthNum;
        });

        // Only include data if this month exists for this year (current year limitation)
        if (year < currentYear || (year === currentYear && monthNum <= currentMonth)) {
          monthData[`${year}_bookings`] = monthBookings.length;
          monthData[`${year}_revenue`] = monthBookings.reduce((sum, booking) => sum + (booking.charter_total || 0), 0);
          monthData[`${year}_guests`] = monthBookings.reduce((sum, booking) => sum + (booking.total_guests || 0), 0);
          monthData[`${year}_avg_value`] = monthBookings.length > 0 
            ? monthData[`${year}_revenue`] as number / monthBookings.length 
            : 0;
        }
      });

      monthlyData.push(monthData);
    }

    return { monthlyComparisonData: monthlyData, availableYears: years };
  }, [bookings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (!monthlyComparisonData.length) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No data available for month-on-month comparison</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zatara-navy">Month-on-Month Analysis</h2>
        <p className="text-gray-600">Compare performance across all years for each month</p>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookings">Bookings by Month</TabsTrigger>
          <TabsTrigger value="revenue">Revenue by Month</TabsTrigger>
          <TabsTrigger value="guests">Guests by Month</TabsTrigger>
          <TabsTrigger value="average">Avg Booking Value</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Bookings Comparison</CardTitle>
              <CardDescription>Number of bookings for each month across all years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {availableYears.map((year, index) => (
                    <Bar 
                      key={year}
                      dataKey={`${year}_bookings`}
                      fill={colors[index % colors.length]}
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
              <CardTitle>Monthly Revenue Comparison</CardTitle>
              <CardDescription>Revenue for each month across all years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [formatCurrency(value), 'Revenue']} />
                  <Legend />
                  {availableYears.map((year, index) => (
                    <Bar 
                      key={year}
                      dataKey={`${year}_revenue`}
                      fill={colors[index % colors.length]}
                      name={`${year} Revenue`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guests">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Guests Comparison</CardTitle>
              <CardDescription>Total guests for each month across all years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {availableYears.map((year, index) => (
                    <Line 
                      key={year}
                      type="monotone"
                      dataKey={`${year}_guests`}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      name={`${year} Guests`}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="average">
          <Card>
            <CardHeader>
              <CardTitle>Average Booking Value by Month</CardTitle>
              <CardDescription>Average charter value for each month across all years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [formatCurrency(value), 'Avg Value']} />
                  <Legend />
                  {availableYears.map((year, index) => (
                    <Line 
                      key={year}
                      type="monotone"
                      dataKey={`${year}_avg_value`}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      name={`${year} Avg Value`}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Growth Summary</CardTitle>
          <CardDescription>Month-by-month growth comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyComparisonData.map(monthData => {
              const currentYearBookings = monthData[`${new Date().getFullYear()}_bookings`] as number || 0;
              const lastYearBookings = monthData[`${new Date().getFullYear() - 1}_bookings`] as number || 0;
              const growth = lastYearBookings > 0 ? ((currentYearBookings - lastYearBookings) / lastYearBookings * 100) : 0;
              
              return (
                <div key={monthData.month} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{monthData.month}</h4>
                  <p className="text-sm text-gray-600">
                    {currentYearBookings} bookings ({growth > 0 ? '+' : ''}{growth.toFixed(1)}% vs last year)
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
