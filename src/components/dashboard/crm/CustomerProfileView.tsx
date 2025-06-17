
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCustomerData } from '@/hooks/useCustomerData';
import { CustomerHeader } from './components/CustomerHeader';
import { CustomerBasicInfo } from './components/CustomerBasicInfo';
import { CustomerMetricsCards } from './components/CustomerMetricsCards';
import { CustomerBookingHistory } from './components/CustomerBookingHistory';
import { CustomerInsights } from './components/CustomerInsights';
import { CustomerActions } from './components/CustomerActions';
import { CustomerPreferences } from './components/CustomerPreferences';
import { CustomerValueMetrics } from './components/CustomerValueMetrics';

interface CustomerProfileViewProps {
  customerId?: number;
}

export const CustomerProfileView = ({ customerId }: CustomerProfileViewProps) => {
  // Use a default customer ID if none provided (for demo purposes)
  const effectiveCustomerId = customerId || 1;
  
  const { customer, customerHistory, loading, error, refetch } = useCustomerData(effectiveCustomerId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading customer profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading customer data</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="space-x-2">
          <Button onClick={refetch}>Retry</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 mb-4">Customer profile not found (ID: {effectiveCustomerId})</p>
        <p className="text-sm text-gray-500 mb-4">
          This may be because customer data hasn't been fully synced yet.
        </p>
        <Button onClick={refetch}>Try Loading Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CustomerHeader onRefetch={refetch} />

      {/* Customer Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CustomerBasicInfo customer={customer} />
          <CustomerPreferences customer={customer} />
          <CustomerActions customer={customer} />
        </div>
        <div className="space-y-6">
          <CustomerMetricsCards customer={customer} />
          <CustomerValueMetrics customer={customer} />
        </div>
      </div>

      <CustomerBookingHistory customerHistory={customerHistory} />
      <CustomerInsights customer={customer} />
    </div>
  );
};
