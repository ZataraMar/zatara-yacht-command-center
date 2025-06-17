
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar, Star } from 'lucide-react';
import { useCustomerData } from '@/hooks/useCustomerData';

export const CustomerAnalytics = () => {
  const { customers, loading } = useCustomerData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No customer data available for analytics</p>
      </div>
    );
  }

  // Calculate analytics data
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + (customer.total_spent || 0), 0);
  const avgLifetimeValue = customers.reduce((sum, customer) => sum + (customer.customer_lifetime_value || 0), 0) / totalCustomers;
  const totalBookings = customers.reduce((sum, customer) => sum + (customer.total_bookings || 0), 0);

  // Segment distribution
  const segmentCounts = customers.reduce((acc, customer) => {
    const segment = customer.customer_segment || 'standard';
    acc[segment] = (acc[segment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(segmentCounts).map(([segment, count]) => ({
    name: segment,
    value: count,
    percentage: ((count / totalCustomers) * 100).toFixed(1)
  }));

  // Spending distribution
  const spendingRanges = [
    { range: '€0-500', min: 0, max: 500 },
    { range: '€500-1000', min: 500, max: 1000 },
    { range: '€1000-2500', min: 1000, max: 2500 },
    { range: '€2500-5000', min: 2500, max: 5000 },
    { range: '€5000+', min: 5000, max: Infinity }
  ];

  const spendingData = spendingRanges.map(({ range, min, max }) => ({
    range,
    customers: customers.filter(c => (c.total_spent || 0) >= min && (c.total_spent || 0) < max).length
  }));

  // Booking frequency data
  const bookingData = [
    { frequency: '1 booking', count: customers.filter(c => (c.total_bookings || 0) === 1).length },
    { frequency: '2-3 bookings', count: customers.filter(c => (c.total_bookings || 0) >= 2 && (c.total_bookings || 0) <= 3).length },
    { frequency: '4-5 bookings', count: customers.filter(c => (c.total_bookings || 0) >= 4 && (c.total_bookings || 0) <= 5).length },
    { frequency: '6+ bookings', count: customers.filter(c => (c.total_bookings || 0) >= 6).length }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-zatara-navy">{totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-zatara-navy">€{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Lifetime Value</p>
                <p className="text-2xl font-bold text-zatara-navy">€{Math.round(avgLifetimeValue).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-zatara-navy">{totalBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution of customers by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spending Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
            <CardDescription>Number of customers by spending range</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Frequency</CardTitle>
            <CardDescription>Customer loyalty by booking count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frequency" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers by Lifetime Value</CardTitle>
            <CardDescription>Your most valuable customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customers
                .sort((a, b) => (b.customer_lifetime_value || 0) - (a.customer_lifetime_value || 0))
                .slice(0, 5)
                .map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-zatara-blue rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{customer.full_name}</p>
                        <p className="text-sm text-gray-600">{customer.total_bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€{(customer.customer_lifetime_value || 0).toLocaleString()}</p>
                      <p className="text-sm text-gray-600">LTV</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
