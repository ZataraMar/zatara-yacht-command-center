
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, Euro, Users, Ship } from 'lucide-react';

interface BookingStatsProps {
  data: any[];
  timeFilter: string;
}

export const BookingStats: React.FC<BookingStatsProps> = ({ data, timeFilter }) => {
  const stats = React.useMemo(() => {
    const today = new Date();
    const filterDays = parseInt(timeFilter);
    
    const totalBookings = data.length;
    const totalRevenue = data.reduce((sum, booking) => sum + (booking.charter_total || 0), 0);
    const totalGuests = data.reduce((sum, booking) => sum + (booking.total_guests || 0), 0);
    
    const zataraBookings = data.filter(b => b.boat?.toLowerCase().includes('zatara')).length;
    const puravidaBookings = data.filter(b => b.boat?.toLowerCase().includes('puravida')).length;
    
    const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
    const avgGuestsPerBooking = totalBookings > 0 ? totalGuests / totalBookings : 0;
    
    const confirmedBookings = data.filter(b => 
      ['confirmed', 'booked', 'prebooked'].includes(b.status?.toLowerCase())
    ).length;
    
    const pendingBookings = data.filter(b => 
      ['option', 'request', 'pending'].includes(b.status?.toLowerCase())
    ).length;

    return {
      totalBookings,
      totalRevenue,
      totalGuests,
      zataraBookings,
      puravidaBookings,
      avgBookingValue,
      avgGuestsPerBooking,
      confirmedBookings,
      pendingBookings
    };
  }, [data, timeFilter]);

  const formatCurrency = (amount: number) => `€${amount.toLocaleString()}`;
  
  const getTimeLabel = () => {
    switch (timeFilter) {
      case '0': return 'Today';
      case '7': return 'Next 7 days';
      case '14': return 'Next 14 days';
      case '30': return 'Next 30 days';
      case '60': return 'Next 60 days';
      case '90': return 'Next 90 days';
      default: return 'Selected period';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Booking Statistics</span>
          <Badge variant="outline" className="text-xs">
            {getTimeLabel()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-gray-600">Total Bookings</span>
            </div>
            <div className="text-lg font-semibold text-zatara-navy">
              {stats.totalBookings}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Euro className="h-3 w-3 text-green-500" />
              <span className="text-xs text-gray-600">Total Revenue</span>
            </div>
            <div className="text-lg font-semibold text-green-600">
              {formatCurrency(stats.totalRevenue)}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3 text-purple-500" />
              <span className="text-xs text-gray-600">Total Guests</span>
            </div>
            <div className="text-lg font-semibold text-purple-600">
              {stats.totalGuests}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-gray-600">Avg Value</span>
            </div>
            <div className="text-lg font-semibold text-orange-600">
              {formatCurrency(stats.avgBookingValue)}
            </div>
          </div>
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Fleet Distribution</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-1">
                <Ship className="h-3 w-3 text-blue-500" />
                <span>Zatara</span>
              </span>
              <Badge variant="outline" className="text-xs">
                {stats.zataraBookings}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-1">
                <Ship className="h-3 w-3 text-teal-500" />
                <span>PuraVida</span>
              </span>
              <Badge variant="outline" className="text-xs">
                {stats.puravidaBookings}
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Booking Status</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Confirmed</span>
              <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                {stats.confirmedBookings}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Pending</span>
              <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                {stats.pendingBookings}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
