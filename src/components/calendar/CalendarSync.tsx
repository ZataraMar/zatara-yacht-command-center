import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Anchor,
  MapPin,
  Users,
  Euro
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AvailabilityData {
  calendar_date: string;
  availability_status: string;
  blocking_reason: string;
  source: string;
}

interface BookingData {
  locator: string;
  boat: string;
  start_date: string;
  guest_first_name: string;
  guest_surname: string;
  booking_status: string;
  charter_total: number;
}

interface CalendarSyncProps {
  boatName?: string;
}

export const CalendarSync = ({ boatName = 'Zatara - Myabca Llaut 37TR' }: CalendarSyncProps) => {
  const [availability, setAvailability] = useState<AvailabilityData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('idle');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [blockingReason, setBlockingReason] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    loadCalendarData();
  }, [boatName]);

  const loadCalendarData = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('google-calendar-sync', {
        body: {
          action: 'get_calendar_view',
          boat_name: boatName,
          date_range: {
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        }
      });

      if (error) throw error;

      setAvailability(data.availability || []);
      setBookings(data.bookings || []);
      
      console.log('📅 Calendar data loaded:', data);
      
      toast({
        title: "Calendar Loaded",
        description: `Found ${data.availability?.length || 0} availability entries and ${data.bookings?.length || 0} bookings`,
      });

    } catch (error) {
      console.error('Calendar sync error:', error);
      toast({
        title: "Error",
        description: "Failed to load calendar data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const syncBookingsToCalendar = async () => {
    try {
      setLoading(true);
      setSyncStatus('syncing');

      const { data, error } = await supabase.functions.invoke('google-calendar-sync', {
        body: {
          action: 'sync_bookings_to_calendar',
          boat_name: boatName
        }
      });

      if (error) throw error;

      setSyncStatus('completed');
      
      toast({
        title: "Sync Complete",
        description: `Synced ${data.synced_count} of ${data.total_bookings} bookings`,
      });

      // Reload calendar data
      await loadCalendarData();

    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (date: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('google-calendar-sync', {
        body: {
          action: 'check_availability',
          boat_name: boatName,
          date_range: { date }
        }
      });

      if (error) throw error;

      const status = data.available ? 'Available' : 'Not Available';
      const reason = data.blocking_reason || 'No conflicts';
      
      toast({
        title: `${date} - ${status}`,
        description: reason,
        variant: data.available ? 'default' : 'destructive',
      });

    } catch (error) {
      console.error('Availability check error:', error);
      toast({
        title: "Check Failed",
        description: "Failed to check availability",
        variant: "destructive",
      });
    }
  };

  const blockDate = async () => {
    if (!selectedDate || !blockingReason) {
      toast({
        title: "Missing Information",
        description: "Please select a date and provide a reason",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke('google-calendar-sync', {
        body: {
          action: 'block_dates',
          boat_name: boatName,
          date_range: {
            date: selectedDate,
            reason: blockingReason
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Date Blocked",
        description: `${selectedDate} has been blocked: ${blockingReason}`,
      });

      // Reset form and reload data
      setSelectedDate('');
      setBlockingReason('');
      await loadCalendarData();

    } catch (error) {
      console.error('Block date error:', error);
      toast({
        title: "Block Failed",
        description: "Failed to block date",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'booked':
        return <Anchor className="w-4 h-4 text-blue-600" />;
      case 'blocked':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'available': 'secondary' as const,
      'booked': 'default' as const,
      'blocked': 'destructive' as const
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Calendar Sync</h2>
          <p className="text-gray-600">Manage availability and sync with Google Calendar</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadCalendarData} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={syncBookingsToCalendar} disabled={loading}>
            <Calendar className="w-4 h-4 mr-2" />
            Sync Bookings
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      {syncStatus !== 'idle' && (
        <Alert>
          {syncStatus === 'syncing' && <RefreshCw className="h-4 w-4 animate-spin" />}
          {syncStatus === 'completed' && <CheckCircle className="h-4 w-4" />}
          {syncStatus === 'error' && <AlertTriangle className="h-4 w-4" />}
          <AlertTitle>
            {syncStatus === 'syncing' && 'Syncing...'}
            {syncStatus === 'completed' && 'Sync Complete'}
            {syncStatus === 'error' && 'Sync Error'}
          </AlertTitle>
          <AlertDescription>
            {syncStatus === 'syncing' && 'Syncing bookings to calendar availability...'}
            {syncStatus === 'completed' && 'All bookings have been synced to the calendar.'}
            {syncStatus === 'error' && 'Failed to sync bookings. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Block dates and check availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Blocking Reason</Label>
              <Select value={blockingReason} onValueChange={setBlockingReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Weather">Weather</SelectItem>
                  <SelectItem value="Owner Use">Owner Use</SelectItem>
                  <SelectItem value="Staff Training">Staff Training</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {blockingReason === 'Other' && (
              <div className="space-y-2">
                <Label htmlFor="customReason">Custom Reason</Label>
                <Textarea
                  id="customReason"
                  placeholder="Enter custom reason..."
                  value={blockingReason === 'Other' ? '' : blockingReason}
                  onChange={(e) => setBlockingReason(e.target.value)}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={() => selectedDate && checkAvailability(selectedDate)} 
                variant="outline" 
                disabled={!selectedDate || loading}
                className="flex-1"
              >
                Check Availability
              </Button>
              <Button 
                onClick={blockDate} 
                disabled={!selectedDate || !blockingReason || loading}
                className="flex-1"
              >
                Block Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar Summary</CardTitle>
            <CardDescription>Next 30 days for {boatName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {availability.filter(a => a.availability_status === 'available').length}
                  </div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {bookings.length}
                  </div>
                  <div className="text-sm text-gray-600">Booked</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {availability.filter(a => a.availability_status === 'blocked').length}
                  </div>
                  <div className="text-sm text-gray-600">Blocked</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Overview</CardTitle>
          <CardDescription>Current availability and bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availability.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No availability data</h3>
                <p className="text-gray-600">Click "Sync Bookings" to populate the calendar.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {availability.slice(0, 10).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.availability_status)}
                      <div>
                        <p className="font-medium">{new Date(item.calendar_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{item.blocking_reason || 'Available'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.availability_status)}
                      <Badge variant="outline">{item.source}</Badge>
                    </div>
                  </div>
                ))}
                
                {availability.length > 10 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={loadCalendarData}>
                      View All {availability.length} Entries
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      {bookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Upcoming confirmed bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.locator} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Anchor className="w-5 h-5 text-zatara-blue" />
                    <div>
                      <p className="font-medium">{booking.locator}</p>
                      <p className="text-sm text-gray-600">
                        {booking.guest_first_name} {booking.guest_surname} • {new Date(booking.start_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{booking.charter_total?.toLocaleString()}</p>
                    <Badge variant="default">{booking.booking_status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
