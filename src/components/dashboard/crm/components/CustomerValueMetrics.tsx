
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Calendar, Award } from 'lucide-react';

interface Customer {
  customer_lifetime_value?: number;
  total_spent?: number;
  total_bookings?: number;
  average_booking_value?: number;
  customer_segment?: string;
  vip_status?: boolean;
  last_booking_date?: string;
}

interface CustomerValueMetricsProps {
  customer: Customer;
}

export const CustomerValueMetrics = ({ customer }: CustomerValueMetricsProps) => {
  const getSegmentColor = (segment: string) => {
    switch (segment?.toLowerCase()) {
      case 'vip': return 'bg-yellow-500 text-white';
      case 'premium': return 'bg-purple-500 text-white';
      case 'loyal': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-zatara-blue" />
          <span>Value Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Customer Segment</span>
          <Badge className={getSegmentColor(customer.customer_segment || 'standard')}>
            {customer.customer_segment || 'Standard'}
          </Badge>
        </div>

        {customer.vip_status && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">VIP Status</span>
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              VIP
            </Badge>
          </div>
        )}

        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Avg. Booking Value</p>
              <p className="text-sm font-medium">
                €{(customer.average_booking_value || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Last Booking</p>
              <p className="text-sm font-medium">
                {customer.last_booking_date 
                  ? new Date(customer.last_booking_date).toLocaleDateString()
                  : 'No bookings'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Loyalty Score</p>
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.min(5, Math.floor((customer.total_bookings || 0) / 2) + 1)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
