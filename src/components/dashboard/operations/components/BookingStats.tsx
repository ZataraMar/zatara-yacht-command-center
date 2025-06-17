
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Anchor, Euro, Users, Calendar, Eye } from 'lucide-react';
import { BusinessViewRow } from '../types/businessViewTypes';

interface BookingStatsProps {
  data: BusinessViewRow[];
  timeFilter: string;
  onDrillDown?: (dataSource: string, data: any[], filters: any) => void;
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
  
  const zataraBookings = data.filter(b => b.boat?.toLowerCase().includes('zatara'));
  const puravidaBookings = data.filter(b => 
    b.boat?.toLowerCase().includes('puravida') || 
    b.boat?.toLowerCase().includes('pura vida')
  );
  
  const confirmedBookings = data.filter(b => b.status === 'confirmed');
  const pendingBookings = data.filter(b => b.status !== 'confirmed');

  const handleDrillDown = (statType: string, filteredData: any[], description: string) => {
    if (onDrillDown) {
      onDrillDown(`${statType}-analysis`, filteredData, {
        timeFilter,
        statType,
        description
      });
    }
  };

  const getTimeDescription = () => {
    const days = parseInt(timeFilter);
    if (days === 0) return 'today';
    if (days === 7) return 'this week';
    if (days === 30) return 'this month';
    return `next ${days} days`;
  };

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings.toString(),
      icon: Anchor,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      data: data,
      description: `All bookings for ${getTimeDescription()}`
    },
    {
      title: 'Total Revenue',
      value: `€${totalRevenue.toLocaleString()}`,
      icon: Euro,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      data: data.filter(b => b.charter_total > 0),
      description: `Revenue from ${getTimeDescription()}`
    },
    {
      title: 'Avg Booking Value',
      value: `€${avgBookingValue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      data: data,
      description: `Average value for ${getTimeDescription()}`
    },
    {
      title: 'Total Guests',
      value: totalGuests.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      data: data.filter(b => b.total_guests > 0),
      description: `Guest count for ${getTimeDescription()}`
    }
  ];

  const boatStats = [
    {
      title: 'Zatara Charters',
      value: zataraBookings.length.toString(),
      revenue: zataraBookings.reduce((sum, b) => sum + (b.charter_total || 0), 0),
      data: zataraBookings,
      color: 'border-blue-500'
    },
    {
      title: 'PuraVida Charters',
      value: puravidaBookings.length.toString(),
      revenue: puravidaBookings.reduce((sum, b) => sum + (b.charter_total || 0), 0),
      data: puravidaBookings,
      color: 'border-teal-500'
    }
  ];

  const statusStats = [
    {
      title: 'Confirmed',
      count: confirmedBookings.length,
      data: confirmedBookings,
      variant: 'default' as const
    },
    {
      title: 'Pending',
      count: pendingBookings.length,
      data: pendingBookings,
      variant: 'secondary' as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Booking Statistics</CardTitle>
        <p className="text-xs text-gray-600">Data for {getTimeDescription()}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.title}
                className={`p-3 rounded-lg ${stat.bgColor} border cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleDrillDown(stat.title.toLowerCase().replace(' ', '-'), stat.data, stat.description)}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.title}</div>
              </div>
            );
          })}
        </div>

        {/* Boat Breakdown */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">By Boat</div>
          {boatStats.map((boat) => (
            <div 
              key={boat.title}
              className={`p-2 border-l-4 ${boat.color} bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors`}
              onClick={() => handleDrillDown(boat.title.toLowerCase().replace(' ', '-'), boat.data, `${boat.title} bookings for ${getTimeDescription()}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{boat.title}</div>
                  <div className="text-xs text-gray-600">€{boat.revenue.toLocaleString()}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{boat.value}</Badge>
                  <Eye className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Breakdown */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">By Status</div>
          <div className="flex space-x-2">
            {statusStats.map((status) => (
              <Badge 
                key={status.title}
                variant={status.variant}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleDrillDown(status.title.toLowerCase(), status.data, `${status.title} bookings for ${getTimeDescription()}`)}
              >
                {status.title}: {status.count}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            {totalBookings > 0 && (
              <div>
                • {((confirmedBookings.length / totalBookings) * 100).toFixed(0)}% confirmed rate
              </div>
            )}
            {zataraBookings.length > 0 && puravidaBookings.length > 0 && (
              <div>
                • Zatara: {((zataraBookings.length / totalBookings) * 100).toFixed(0)}% | 
                  PuraVida: {((puravidaBookings.length / totalBookings) * 100).toFixed(0)}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
