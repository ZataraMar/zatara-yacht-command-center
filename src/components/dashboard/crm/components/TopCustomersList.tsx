
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Customer } from '@/types/customer';

interface TopCustomersListProps {
  customers: Customer[];
}

export const TopCustomersList = ({ customers }: TopCustomersListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers by Lifetime Value</CardTitle>
        <CardDescription>Your most valuable customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {customers.map((customer, index) => (
            <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-zatara-blue rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{customer.full_name}</p>
                  <p className="text-sm text-gray-600">{customer.total_bookings} bookings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">€{(customer.customer_lifetime_value || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-600">LTV</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
