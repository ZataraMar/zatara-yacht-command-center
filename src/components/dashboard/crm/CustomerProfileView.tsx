
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCustomerData } from '@/hooks/useCustomerData';
import { CustomerHeader } from './components/CustomerHeader';
import { CustomerBasicInfo } from './components/CustomerBasicInfo';
import { CustomerMetricsCards } from './components/CustomerMetricsCards';
import { CustomerBookingHistory } from './components/CustomerBookingHistory';
import { CustomerInsights } from './components/CustomerInsights';

interface CustomerProfileViewProps {
  customerId: number;
}

export const CustomerProfileView = ({ customerId }: CustomerProfileViewProps) => {
  const { customer, customerHistory, loading, error, refetch } = useCustomerData(customerId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading customer data</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Customer not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CustomerHeader onRefetch={refetch} />

      {/* Customer Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CustomerBasicInfo customer={customer} />
        <CustomerMetricsCards customer={customer} />
      </div>

      <CustomerBookingHistory customerHistory={customerHistory} />
      <CustomerInsights customer={customer} />
    </div>
  );
};
