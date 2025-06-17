
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Calendar } from 'lucide-react';
import { getCustomerSegmentColor, getActivityStatusColor } from '../utils/badgeUtils';

interface Customer {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  customer_segment?: string;
  activity_status?: string;
  phone_primary?: string;
  email_primary?: string;
  last_booking_date?: string;
  total_bookings?: number;
  total_spent?: number;
  customer_lifetime_value?: number;
  created_at?: string;
}

interface CustomerBasicInfoProps {
  customer: Customer;
}

export const CustomerBasicInfo = ({ customer }: CustomerBasicInfoProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Customer Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-zatara-navy">
                {customer.full_name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Name not available'}
              </h3>
              <div className="flex items-center space-x-2 mt-2">
                {customer.customer_segment && (
                  <Badge className={getCustomerSegmentColor(customer.customer_segment)}>
                    {customer.customer_segment}
                  </Badge>
                )}
                {customer.activity_status && (
                  <Badge className={getActivityStatusColor(customer.activity_status)}>
                    {customer.activity_status}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {customer.phone_primary && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{customer.phone_primary}</span>
                </div>
              )}
              {customer.email_primary && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{customer.email_primary}</span>
                </div>
              )}
              {customer.last_booking_date && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Last booking: {new Date(customer.last_booking_date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Customer Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings:</span>
                  <span className="font-medium">{customer.total_bookings || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-medium">€{(customer.total_spent || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lifetime Value:</span>
                  <span className="font-medium">€{(customer.customer_lifetime_value || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Since:</span>
                  <span className="font-medium">
                    {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
