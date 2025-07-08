import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  RefreshCw, 
  Block,
  CheckCircle, 
  XCircle, 
  Anchor,
  Euro,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BookingData {
  locator: string;
  boat: string;
  start_date: string;
  guest_first_name: string;
  guest_surname: string;
  booking_status: string;
  charter_total: number;
}

interface CalendarStats {
  available_count: number;
  booked_count: number;
  blocked_count: number;
}

export const CompactCalendarSync = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [stats, setStats] = useState<CalendarStats>({ available_count: 0, booked_count: 0, blocked_count: 0 });
  const [loading, setLoading] = useState(false);
  const [blockDate, setBlockDate] = useState<string>('');
  const [blockReason, setBlockReason] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('google-calendar-sync', {
        body: {
          action: 'get_calendar_view',
          boat_name: 'Zatara - Myabca Llaut 37TR',
          date_range: {
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        }
      });

      if (error) throw error;
      
      setBookings(data.bookings || []);
      setStats(data.summary || { available_count: 0, booked_count: 0, blocked_count: 0 });
      
    } catch (error) {
      console.error('Load error:', error);
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const quickBlock = async () => {
    if (!blockDate || !blockReason) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.functions.invoke('google-calendar-sync', {
        body: {
          action: 'block_dates',
          boat_name: 'Zatara - Myabca Llaut 37TR',
          date_range: { date: blockDate, reason: blockReason }
        }
      });

      if (error) throw error;
      
      toast({ title: "Blocked", description: `${blockDate} blocked: ${blockReason}` });
      setBlockDate('');
      setBlockReason('');
      await loadData();
      
    } catch (error) {
      toast({ title: "Error", description: "Failed to block date", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit',
      weekday: 'short'
    });
  };

  const formatCurrency = (amount: number) => {
    return `€${amount?.toLocaleString() || 0}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-zatara-navy">Calendar Control</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              <CheckCircle className="w-3 h-3 mr-1" />
              {stats.available_count} Available
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              <Anchor className="w-3 h-3 mr-1" />
              {stats.booked_count} Booked
            </Badge>
            <Badge variant="outline" className="bg-red-50">
              <XCircle className="w-3 h-3 mr-1" />
              {stats.blocked_count} Blocked
            </Badge>
          </div>
        </div>
        <Button onClick={loadData} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Block */}
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center">
              <Block className="w-4 h-4 mr-2" />
              Quick Block
            </h3>
            <div className="space-y-2">
              <Input
                type="date"
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="text-sm"
              />
              <Select value={blockReason} onValueChange={setBlockReason}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Weather">Weather</SelectItem>
                  <SelectItem value="Owner Use">Owner Use</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={quickBlock} 
                disabled={!blockDate || !blockReason || loading}
                className="w-full text-sm"
                size="sm"
              >
                Block Date
              </Button>
            </div>
          </div>
        </Card>

        {/* Revenue Summary */}
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center">
              <Euro className="w-4 h-4 mr-2" />
              Next 7 Days Revenue
            </h3>
            <div className="space-y-1">
              {bookings
                .filter(b => new Date(b.start_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                .reduce((acc, booking) => acc + (booking.charter_total || 0), 0) > 0 && (
                <div className="text-2xl font-bold text-zatara-blue">
                  {formatCurrency(bookings
                    .filter(b => new Date(b.start_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                    .reduce((acc, booking) => acc + (booking.charter_total || 0), 0)
                  )}
                </div>
              )}
              <div className="text-xs text-gray-600">
                {bookings.filter(b => new Date(b.start_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length} bookings
              </div>
            </div>
          </div>
        </Card>

        {/* Today's Status */}
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Today ({new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})
            </h3>
            {(() => {
              const todayBooking = bookings.find(b => 
                new Date(b.start_date).toDateString() === new Date().toDateString()
              );
              return todayBooking ? (
                <div className="space-y-1">
                  <div className="font-medium text-sm">{todayBooking.guest_first_name} {todayBooking.guest_surname}</div>
                  <div className="text-xs text-gray-600">{todayBooking.locator}</div>
                  <div className="font-semibold text-zatara-blue">{formatCurrency(todayBooking.charter_total)}</div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">No bookings today</div>
              );
            })()}
          </div>
        </Card>
      </div>

      {/* Compact Bookings List */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Upcoming Bookings (Next 14 Days)</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {bookings
            .filter(booking => {
              const bookingDate = new Date(booking.start_date);
              const now = new Date();
              const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
              return bookingDate >= now && bookingDate <= twoWeeksFromNow;
            })
            .slice(0, 10)
            .map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 text-xs font-mono text-gray-600">
                    {formatDate(booking.start_date)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {booking.guest_first_name} {booking.guest_surname}
                    </div>
                    <div className="text-xs text-gray-500">{booking.locator}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-zatara-blue">
                    {formatCurrency(booking.charter_total)}
                  </div>
                  <Badge 
                    className={`text-xs ${getStatusColor(booking.booking_status)}`}
                    variant="outline"
                  >
                    {booking.booking_status}
                  </Badge>
                </div>
              </div>
            ))}
          
          {bookings.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No upcoming bookings
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};