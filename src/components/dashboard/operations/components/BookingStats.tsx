
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Euro, Calendar, Users, Ship } from 'lucide-react';
import { BusinessViewRow } from '../types/businessViewTypes';

interface BookingStatsProps {
  data: BusinessViewRow[];
  timeFilter: string;
  onDrillDown: (dataSource: string, data: any[], filters: any) => void;
}

export const BookingStats: React.FC<BookingStatsProps> = ({ 
  data, 
  timeFilter, 
  onDrillDown 
}) => {
  const totalBookings = data.length;
  const totalRevenue = data.reduce((sum, booking) => sum + (booking.charter_total || 0), 0);
  const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const totalGuests = data.reduce((sum, booking) => sum + (booking.total_guests || 0), 0);
  
  const zataraBookings = data.filter(b => b.boat?.toLowerCase().includes('zatara')).length;
  const puravidaBookings = data.filter(b => 
    b.boat?.toLowerCase().includes('puravida') || 
    b.boat?.toLowerCase().includes('pura vida')
  ).length;

  const confirmedBookings = data.filter(b => 
    ['confirmed', 'booked', 'prebooked'].includes(b.status?.toLowerCase() || '')
  ).length;

  const pendingBookings = data.filter(b => 
    ['option', 'request', 'pending'].includes(b.status?.toLowerCase() || '')
  ).length;

  const stats = [
    {
      title: 'Bookings',
      value: totalBookings.toLocaleString(),
      icon: Calendar,
      trend: totalBookings > 0 ? 'up' : 'neutral',
      subtitle: `${confirmedBookings} confirmed`,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: `€${Math.round(totalRevenue).toLocaleString()}`,
      icon: Euro,
      trend: totalRevenue > 0 ? 'up' : 'neutral',
      subtitle: `€${Math.round(avgBookingValue)} avg`,
      color: 'text-green-600'
    },
    {
      title: 'Guests',
      value: totalGuests.toLocaleString(),
      icon: Users,
      trend: totalGuests > 0 ? 'up' : 'neutral',
      subtitle: `${Math.round(totalGuests / Math.max(totalBookings, 1))} avg/charter`,
      color: 'text-purple-600'
    },
    {
      title: 'Fleet',
      value: `${zataraBookings + puravidaBookings}`,
      icon: Ship,
      trend: 'neutral',
      subtitle: `Z:${zataraBookings} P:${puravidaBookings}`,
      color: 'text-zatara-blue'
    }
  ];

  return (
    <div className="flex gap-2 w-full">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="flex-1 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-zatara-blue/30"
          onClick={() => onDrillDown('bookings', data, { stat: stat.title })}
        >
          <CardHeader className="p-2">
            <CardTitle className="text-xs font-medium text-gray-600 flex items-center justify-between">
              <span className="truncate">{stat.title}</span>
              <stat.icon className={`h-3 w-3 ${stat.color}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg leading-none">{stat.value}</div>
              {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
              {stat.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
