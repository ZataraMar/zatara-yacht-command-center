
import React, { useState, useMemo } from 'react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MultiSelect } from '@/components/ui/multi-select';
import { DateRange } from 'react-day-picker';
import { calculateYearlyMetrics, calculateYearComparisons, generateMonthlyComparisonData } from './year-over-year/utils';
import { YearOverviewCards } from './year-over-year/YearOverviewCards';
import { YearComparisonsCard } from './year-over-year/YearComparisonsCard';
import { ChartTabs } from './year-over-year/ChartTabs';

export const YearOverYearAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const { bookings, loading } = useComprehensiveBookings();

  // Get unique booking statuses for the multi-select
  const statusOptions = useMemo(() => {
    if (!bookings || bookings.length === 0) {
      return [];
    }
    
    const uniqueStatuses = Array.from(new Set(bookings.map(booking => booking.booking_status)))
      .filter(status => status && status.trim() !== '')
      .sort();
    
    return uniqueStatuses.map(status => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      value: status
    }));
  }, [bookings]);

  // Filter bookings based on selected statuses
  const filteredBookings = useMemo(() => {
    if (!bookings || bookings.length === 0) {
      return [];
    }
    if (selectedStatuses.length === 0) {
      return bookings;
    }
    return bookings.filter(booking => selectedStatuses.includes(booking.booking_status));
  }, [bookings, selectedStatuses]);

  // Calculate year-over-year metrics with filtered data
  const yearlyMetrics = useMemo(() => calculateYearlyMetrics(filteredBookings), [filteredBookings]);

  const years = Object.keys(yearlyMetrics).map(Number).sort((a, b) => b - a);
  
  // Calculate year-over-year changes
  const yearComparisons = useMemo(() => calculateYearComparisons(yearlyMetrics, years), [yearlyMetrics, years]);

  // Monthly comparison data for charts
  const monthlyComparisonData = useMemo(() => generateMonthlyComparisonData(yearlyMetrics, years), [yearlyMetrics, years]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Year-over-Year Analytics</h1>
          <p className="text-zatara-blue">Compare business performance across multiple years</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="min-w-[200px]">
            <MultiSelect
              options={statusOptions}
              selected={selectedStatuses}
              onChange={setSelectedStatuses}
              placeholder="Filter by status..."
              className="w-full"
            />
          </div>
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
            placeholder="Filter date range"
          />
        </div>
      </div>

      <YearOverviewCards yearlyMetrics={yearlyMetrics} years={years} />

      <YearComparisonsCard yearComparisons={yearComparisons} />

      <ChartTabs 
        monthlyComparisonData={monthlyComparisonData} 
        years={years} 
        yearlyMetrics={yearlyMetrics}
      />
    </div>
  );
};
