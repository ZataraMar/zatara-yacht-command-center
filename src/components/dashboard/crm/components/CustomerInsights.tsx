
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Customer {
  customer_segment?: string;
  phone_primary?: string;
  total_bookings?: number;
  email_primary?: string;
}

interface CustomerInsightsProps {
  customer: Customer;
}

export const CustomerInsights = ({ customer }: CustomerInsightsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferences & Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Boat Preferences</h4>
              <p className="text-sm text-gray-600">
                Based on booking history, this customer prefers premium charters during peak season.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Communication Preferences</h4>
              <p className="text-sm text-gray-600">
                Primary contact: {customer.phone_primary ? 'WhatsApp/Phone' : 'Email'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customer.customer_segment === 'VIP' && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">VIP Treatment</p>
                <p className="text-xs text-purple-600">Offer premium services and personal attention</p>
              </div>
            )}
            {(customer.total_bookings || 0) > 3 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Loyalty Program</p>
                <p className="text-xs text-blue-600">Consider offering repeat customer discounts</p>
              </div>
            )}
            {!customer.email_primary && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Missing Email</p>
                <p className="text-xs text-yellow-600">Collect email for better communication</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
