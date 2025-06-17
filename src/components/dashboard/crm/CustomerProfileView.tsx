
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  Heart,
  Phone,
  Mail,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/financialUtils';

interface Customer360 {
  id: number;
  full_name: string;
  phone_primary: string;
  email_primary: string;
  nationality: string;
  customer_status: string;
  customer_segment: string;
  total_bookings: number;
  total_spent: number;
  customer_lifetime_value: number;
  avg_satisfaction_score: number;
  last_booking_date: string;
  activity_status: string;
}

interface CustomerHistory {
  booking_locator: string;
  booking_date: string;
  boat_used: string;
  total_value: number;
  guests_count: number;
  booking_source: string;
  seasonal_period: string;
}

export const CustomerProfileView = ({ customerId }: { customerId: number }) => {
  const [customer, setCustomer] = useState<Customer360 | null>(null);
  const [bookingHistory, setBookingHistory] = useState<CustomerHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      
      // Fetch customer 360 view
      const { data: customerData, error: customerError } = await supabase
        .from('customer_360_view')
        .select('*')
        .eq('id', customerId)
        .single();

      if (customerError) {
        console.error('Error fetching customer:', customerError);
        return;
      }

      // Fetch customer booking history
      const { data: historyData, error: historyError } = await supabase
        .from('customer_history')
        .select('*')
        .eq('customer_id', customerId)
        .order('booking_date', { ascending: false });

      if (historyError) {
        console.error('Error fetching history:', historyError);
        return;
      }

      setCustomer(customerData);
      setBookingHistory(historyData || []);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'VIP': return 'bg-gold-500 text-white';
      case 'Loyal': return 'bg-blue-500 text-white';
      case 'Regular': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Customer not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(customer.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-zatara-navy">{customer.full_name}</h2>
                <Badge className={getSegmentColor(customer.customer_segment)}>
                  {customer.customer_segment}
                </Badge>
                <Badge variant={customer.activity_status === 'active' ? 'default' : 'secondary'}>
                  {customer.activity_status}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{customer.phone_primary}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{customer.email_primary}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{customer.nationality}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Customer Lifetime Value</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(customer.customer_lifetime_value)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-zatara-navy">{customer.total_bookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {formatCurrency(customer.total_spent)}
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
                <p className="text-sm font-medium text-gray-600">Satisfaction Score</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {customer.avg_satisfaction_score?.toFixed(1) || 'N/A'}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Booking</p>
                <p className="text-sm font-bold text-zatara-navy">
                  {customer.last_booking_date ? 
                    new Date(customer.last_booking_date).toLocaleDateString() : 
                    'Never'
                  }
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details */}
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Booking History</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>Complete charter history and details</CardDescription>
            </CardHeader>
            <CardContent>
              {bookingHistory.length > 0 ? (
                <div className="space-y-4">
                  {bookingHistory.map((booking, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{booking.booking_locator}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.booking_date).toLocaleDateString()} • {booking.boat_used}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">{booking.guests_count} guests</Badge>
                            <Badge variant="outline">{booking.booking_source}</Badge>
                            <Badge variant="outline">{booking.seasonal_period}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(booking.total_value)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No booking history found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Preferences</CardTitle>
              <CardDescription>Dietary restrictions, boat preferences, and special requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                <p>Preferences data will be integrated from customer_preferences table</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Booking patterns and lifecycle analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Booking Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Booking Value:</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(customer.total_spent / customer.total_bookings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Status:</span>
                      <span className="text-sm font-medium">{customer.customer_status}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Growth Potential</h4>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">High CLV customer</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
