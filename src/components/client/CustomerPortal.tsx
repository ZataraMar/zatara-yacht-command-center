import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Euro, 
  Clock, 
  Phone, 
  Mail,
  CreditCard,
  Download,
  Settings,
  LogOut,
  Anchor,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';
import { ZataraLogo } from '@/components/common/ZataraLogo';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CustomerData {
  customer_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  member_since: string;
  total_bookings: number;
  upcoming_bookings: number;
  completed_bookings: number;
  total_spent: number;
  total_outstanding: number;
}

interface BookingData {
  locator: string;
  boat: string;
  start_date: string;
  guest_count: number;
  total_amount: number;
  status: string;
  outstanding: number;
  guest_email: string;
  guest_phone: string;
}

export const CustomerPortal = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const customerId = localStorage.getItem('zatara_customer_id');
    const customerEmail = localStorage.getItem('zatara_customer_email');
    
    if (!customerId || !customerEmail) {
      window.location.href = '/client-login';
      return;
    }

    fetchCustomerData(parseInt(customerId));
  };

  const fetchCustomerData = async (customerId: number) => {
    try {
      setLoading(true);

      // Get customer dashboard data
      const { data: customerInfo, error: customerError } = await supabase
        .from('customer_dashboard_view')
        .select('*')
        .eq('customer_id', customerId)
        .single();

      if (customerError) throw customerError;

      setCustomerData(customerInfo);

      // Get customer bookings
      const { data: customerBookings, error: bookingsError } = await supabase
        .from('customer_booking_access')
        .select(`
          booking_id,
          bookings (
            locator,
            boat,
            start_date,
            end_date,
            total_guests,
            charter_total,
            outstanding_amount,
            booking_status,
            guest_email,
            guest_phone,
            guest_first_name,
            guest_surname,
            booking_source,
            start_time,
            end_time
          )
        `)
        .eq('customer_id', customerId);

      if (bookingsError) throw bookingsError;

      const formattedBookings = customerBookings
        .map(cb => cb.bookings)
        .filter(b => b)
        .map(booking => ({
          locator: booking.locator,
          boat: booking.boat,
          start_date: booking.start_date,
          guest_count: booking.total_guests || 0,
          total_amount: booking.charter_total || 0,
          status: booking.booking_status,
          outstanding: booking.outstanding_amount || 0,
          guest_email: booking.guest_email,
          guest_phone: booking.guest_phone,
          start_time: booking.start_time,
          end_time: booking.end_time,
          booking_source: booking.booking_source
        }));

      setBookings(formattedBookings);

      toast({
        title: "Welcome back!",
        description: `Loaded ${formattedBookings.length} bookings`,
      });

    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zatara_customer_id');
    localStorage.removeItem('zatara_customer_email');
    localStorage.removeItem('zatara_customer_name');
    window.location.href = '/client-login';
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'BOOKED': { variant: 'default' as const, label: 'Confirmed' },
      'Confirmed': { variant: 'default' as const, label: 'Confirmed' },
      'PREBOOKED': { variant: 'secondary' as const, label: 'Pre-booked' },
      'CANCELLED': { variant: 'destructive' as const, label: 'Cancelled' }
    };

    const statusInfo = statusMap[status] || { variant: 'outline' as const, label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto"></div>
          <p className="text-zatara-navy mt-4">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!customerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">Unable to load your customer data.</p>
            <Button onClick={() => window.location.href = '/client-login'}>
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <ZataraLogo variant="full" size="md" />
              <div className="border-l pl-4">
                <h1 className="text-xl font-semibold text-zatara-navy">My Bookings</h1>
                <p className="text-sm text-gray-600">Welcome back, {customerData.first_name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-zatara-navy">{customerData.total_bookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-zatara-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Trips</p>
                  <p className="text-2xl font-bold text-green-600">{customerData.upcoming_bookings}</p>
                </div>
                <Anchor className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-zatara-blue">{formatCurrency(customerData.total_spent)}</p>
                </div>
                <Euro className="w-8 h-8 text-zatara-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outstanding</p>
                  <p className={`text-2xl font-bold ${customerData.total_outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(customerData.total_outstanding)}
                  </p>
                </div>
                <CreditCard className={`w-8 h-8 ${customerData.total_outstanding > 0 ? 'text-red-600' : 'text-green-600'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Outstanding Payments Alert */}
        {customerData.total_outstanding > 0 && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You have {formatCurrency(customerData.total_outstanding)} in outstanding payments. 
              <Button variant="link" className="p-0 ml-2 h-auto">
                Pay Now
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Your Bookings
            </CardTitle>
            <CardDescription>
              View and manage your yacht charter bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Anchor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600">You don't have any bookings yet.</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.locator} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-zatara-navy">{booking.locator}</h3>
                        <p className="text-gray-600">{booking.boat}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(booking.status)}
                        {booking.outstanding > 0 && (
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(booking.outstanding)} due
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{formatDate(booking.start_date)}</p>
                          <p className="text-sm text-gray-600">Full day charter</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{booking.guest_count || 'Not specified'} guests</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{formatCurrency(booking.total_amount)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Contract
                        </Button>
                        {booking.outstanding > 0 && (
                          <Button size="sm">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay {formatCurrency(booking.outstanding)}
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {booking.guest_email && (
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        )}
                        {booking.guest_phone && (
                          <Button variant="ghost" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
