
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface CustomerMetricsOverviewProps {
  totalCustomers: number;
  totalRevenue: number;
  avgLifetimeValue: number;
  totalBookings: number;
}

export const CustomerMetricsOverview = ({
  totalCustomers,
  totalRevenue,
  avgLifetimeValue,
  totalBookings
}: CustomerMetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-zatara-navy">{totalCustomers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-zatara-navy">€{totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Lifetime Value</p>
              <p className="text-2xl font-bold text-zatara-navy">€{Math.round(avgLifetimeValue).toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-zatara-navy">{totalBookings}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
