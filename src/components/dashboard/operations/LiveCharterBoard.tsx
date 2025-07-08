
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Phone, MapPin, AlertCircle, CheckCircle2, Anchor, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatTime } from '@/utils/formatters';

interface Charter {
  id: number;
  locator: string;
  boat: string;
  guest_first_name: string;
  guest_surname: string;
  guest_phone: string;
  guest_email: string;
  start_date: string;
  end_date: string;
  total_guests: number;
  charter_total: number;
  booking_status: string;
  paid_amount: number;
  outstanding_amount: number;
  data_source?: string;
}

export const LiveCharterBoard = () => {
  const [todaysCharters, setTodaysCharters] = useState<Charter[]>([]);
  const [upcomingCharters, setUpcomingCharters] = useState<Charter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    fetchCharters();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('charter-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, (payload) => {
        console.log('Bookings change detected:', payload);
        fetchCharters();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCharters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching charter data...');
      
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Get all bookings and then filter
      const { data: allBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .not('start_date', 'is', null)
        .order('start_date', { ascending: true });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        setError('Failed to fetch charter data: ' + bookingsError.message);
        return;
      }

      console.log('Fetched bookings:', allBookings?.length || 0);

      if (!allBookings || allBookings.length === 0) {
        console.log('No bookings found');
        setTodaysCharters([]);
        setUpcomingCharters([]);
        setError('No charter bookings found in the system');
        return;
      }

      // Filter today's charters
      const todayData = allBookings.filter(booking => {
        const bookingDate = new Date(booking.start_date).toISOString().split('T')[0];
        return bookingDate === today;
      });

      // Filter upcoming charters (next 7 days, excluding today)
      const upcomingData = allBookings.filter(booking => {
        const bookingDate = new Date(booking.start_date).toISOString().split('T')[0];
        return bookingDate > today && bookingDate <= nextWeek;
      });

      console.log('Today\'s charters:', todayData.length);
      console.log('Upcoming charters:', upcomingData.length);

      setTodaysCharters(todayData || []);
      setUpcomingCharters(upcomingData || []);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('Error fetching charters:', error);
      setError('Failed to load charter data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatus = (charter: Charter) => {
    if (!charter.outstanding_amount || charter.outstanding_amount <= 0) {
      return { status: 'Paid', color: 'bg-green-100 text-green-800' };
    }
    if (charter.paid_amount && charter.paid_amount > 0) {
      return { status: 'Partial', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { status: 'Outstanding', color: 'bg-red-100 text-red-800' };
  };

  const CharterCard = ({ charter, isToday }: { charter: Charter, isToday: boolean }) => {
    const paymentStatus = getPaymentStatus(charter);
    
    return (
      <Card className={`${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Anchor className="h-5 w-5 text-zatara-blue" />
              <span>{charter.boat || 'Unknown Boat'}</span>
              <Badge className={`${getStatusColor(charter.booking_status)} text-white`}>
                {charter.booking_status || 'Unknown'}
              </Badge>
            </CardTitle>
            <Badge className={paymentStatus.color}>
              {paymentStatus.status}
            </Badge>
          </div>
          <CardDescription className="text-sm">
            Locator: {charter.locator}
            {charter.data_source && (
              <span className="ml-2 text-xs text-gray-500">({charter.data_source})</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {new Date(charter.start_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {formatTime(charter.start_date)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{charter.total_guests || 1} guests</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">€{charter.charter_total || 0}</span>
            </div>
          </div>
          
          <div className="border-t pt-3">
            <p className="font-medium">
              {charter.guest_first_name || 'Unknown'} {charter.guest_surname || 'Guest'}
            </p>
            {charter.guest_phone && (
              <div className="flex items-center space-x-2 mt-1">
                <Phone className="h-3 w-3 text-gray-500" />
                <span className="text-sm text-gray-600">{charter.guest_phone}</span>
              </div>
            )}
          </div>

          {charter.outstanding_amount > 0 && (
            <div className="bg-red-50 p-2 rounded border border-red-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">
                  Outstanding: €{charter.outstanding_amount}
                </span>
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <MapPin className="h-3 w-3 mr-1" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading charter data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zatara-navy">Live Charter Board</h2>
          {lastUpdate && (
            <p className="text-sm text-zatara-blue">
              Last updated: {formatTime(lastUpdate)}
            </p>
          )}
        </div>
        <Button onClick={fetchCharters} variant="outline" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Charters */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zatara-navy">Today's Charters</h2>
            <p className="text-sm text-zatara-blue">{todaysCharters.length} charter(s) scheduled</p>
          </div>
        </div>
        
        {todaysCharters.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">No charters scheduled for today</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaysCharters.map((charter) => (
              <CharterCard key={charter.id} charter={charter} isToday={true} />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Charters */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-full">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zatara-navy">Upcoming Charters</h2>
            <p className="text-sm text-zatara-blue">Next 7 days ({upcomingCharters.length} charter(s))</p>
          </div>
        </div>
        
        {upcomingCharters.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming charters in the next 7 days</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingCharters.map((charter) => (
              <CharterCard key={charter.id} charter={charter} isToday={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
