
import React, { useState, useMemo } from 'react';
import { useComprehensiveBookings } from '@/hooks/useComprehensiveBookings';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { calculateYearlyMetrics, calculateYearComparisons, generateMonthlyComparisonData } from './year-over-year/utils';
import { YearOverviewCards } from './year-over-year/YearOverviewCards';
import { YearComparisonsCard } from './year-over-year/YearComparisonsCard';
import { ChartTabs } from './year-over-year/ChartTabs';

export const YearOverYearAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { bookings, loading } = useComprehensiveBookings();

  // Calculate year-over-year metrics
  const yearlyMetrics = useMemo(() => calculateYearlyMetrics(bookings), [bookings]);

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
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
          placeholder="Filter date range"
        />
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
