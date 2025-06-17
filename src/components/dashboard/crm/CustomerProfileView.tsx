
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  MapPin,
  Star,
  MessageSquare,
  History
} from 'lucide-react';
import { useCustomerData } from '@/hooks/useCustomerData';

interface CustomerProfileViewProps {
  customerId: number;
}

export const CustomerProfileView = ({ customerId }: CustomerProfileViewProps) => {
  const { customer, customerHistory, loading, error, refetch } = useCustomerData(customerId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading customer data</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Customer not found</p>
      </div>
    );
  }

  const getCustomerSegmentColor = (segment: string) => {
    switch (segment?.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'loyal':
        return 'bg-blue-100 text-blue-800';
      case 'new':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Customer 360° Profile</h2>
          <p className="text-zatara-blue">Complete customer relationship management</p>
        </div>
        <Button onClick={refetch}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Customer
        </Button>
      </div>

      {/* Customer Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-zatara-navy">
                    {customer.full_name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Name not available'}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    {customer.customer_segment && (
                      <Badge className={getCustomerSegmentColor(customer.customer_segment)}>
                        {customer.customer_segment}
                      </Badge>
                    )}
                    {customer.activity_status && (
                      <Badge className={getActivityStatusColor(customer.activity_status)}>
                        {customer.activity_status}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {customer.phone_primary && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{customer.phone_primary}</span>
                    </div>
                  )}
                  {customer.email_primary && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{customer.email_primary}</span>
                    </div>
                  )}
                  {customer.last_booking_date && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Last booking: {new Date(customer.last_booking_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Customer Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="font-medium">{customer.total_bookings || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-medium">€{(customer.total_spent || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lifetime Value:</span>
                      <span className="font-medium">€{(customer.customer_lifetime_value || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Since:</span>
                      <span className="font-medium">
                        {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lifetime Value</p>
                  <p className="text-2xl font-bold text-zatara-navy">
                    €{(customer.customer_lifetime_value || 0).toLocaleString()}
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
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-zatara-navy">{customer.total_bookings || 0}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Booking</p>
                  <p className="text-2xl font-bold text-zatara-navy">
                    €{customer.total_bookings ? Math.round((customer.total_spent || 0) / customer.total_bookings).toLocaleString() : '0'}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Booking History</span>
          </CardTitle>
          <CardDescription>
            Complete history of customer charter bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customerHistory.length > 0 ? (
            <div className="space-y-4">
              {customerHistory.map((booking, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-zatara-blue rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{booking.booking_locator}</h4>
                        <p className="text-sm text-gray-600">
                          {booking.boat_used} • {booking.guests_count} guests • {booking.seasonal_period}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.booking_date).toLocaleDateString()} • {booking.booking_source}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{booking.total_value.toLocaleString()}</p>
                      {booking.repeat_booking && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Repeat</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No booking history found</p>
              <p className="text-sm">This customer may be new or have incomplete data</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferences & Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Boat Preferences</h4>
                <p className="text-sm text-gray-600">
                  Based on booking history, this customer prefers premium charters during peak season.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Communication Preferences</h4>
                <p className="text-sm text-gray-600">
                  Primary contact: {customer.phone_primary ? 'WhatsApp/Phone' : 'Email'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customer.customer_segment === 'VIP' && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-800">VIP Treatment</p>
                  <p className="text-xs text-purple-600">Offer premium services and personal attention</p>
                </div>
              )}
              {customer.total_bookings > 3 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Loyalty Program</p>
                  <p className="text-xs text-blue-600">Consider offering repeat customer discounts</p>
                </div>
              )}
              {!customer.email_primary && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Missing Email</p>
                  <p className="text-xs text-yellow-600">Collect email for better communication</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
