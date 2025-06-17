
import React from 'react';
import { useCustomerData } from '@/hooks/useCustomerData';
import { CustomerMetricsOverview } from './components/CustomerMetricsOverview';
import { CustomerAnalyticsCharts } from './components/CustomerAnalyticsCharts';
import { TopCustomersList } from './components/TopCustomersList';
import {
  calculateCustomerMetrics,
  calculateSegmentData,
  calculateSpendingData,
  calculateBookingFrequencyData,
  getTopCustomers
} from './utils/analyticsCalculations';

export const CustomerAnalytics = () => {
  const { customers, loading } = useCustomerData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No customer data available for analytics</p>
      </div>
    );
  }

  // Calculate all analytics data
  const metrics = calculateCustomerMetrics(customers);
  const segmentData = calculateSegmentData(customers);
  const spendingData = calculateSpendingData(customers);
  const bookingData = calculateBookingFrequencyData(customers);
  const topCustomers = getTopCustomers(customers, 5);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <CustomerMetricsOverview
        totalCustomers={metrics.totalCustomers}
        totalRevenue={metrics.totalRevenue}
        avgLifetimeValue={metrics.avgLifetimeValue}
        totalBookings={metrics.totalBookings}
      />

      {/* Charts */}
      <CustomerAnalyticsCharts
        segmentData={segmentData}
        spendingData={spendingData}
        bookingData={bookingData}
      />

      {/* Top Customers */}
      <TopCustomersList customers={topCustomers} />
    </div>
  );
};
