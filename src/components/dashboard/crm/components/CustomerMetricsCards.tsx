
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Calendar, TrendingUp } from 'lucide-react';

interface Customer {
  customer_lifetime_value?: number;
  total_bookings?: number;
  total_spent?: number;
}

interface CustomerMetricsCardsProps {
  customer: Customer;
}

export const CustomerMetricsCards = ({ customer }: CustomerMetricsCardsProps) => {
  return (
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
  );
};
