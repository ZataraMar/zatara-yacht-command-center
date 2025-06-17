
import { ComprehensiveBooking } from '@/types/booking';
import { YearlyMetrics, YearComparison, MonthlyComparisonData } from './types';

export const calculateYearlyMetrics = (bookings: ComprehensiveBooking[]): Record<number, YearlyMetrics> => {
  const metrics: Record<number, YearlyMetrics> = {};
  
  bookings.forEach(booking => {
    const year = booking.booking_year;
    const month = booking.booking_month;
    
    if (!metrics[year]) {
      metrics[year] = {
        year,
        totalBookings: 0,
        totalRevenue: 0,
        totalGuests: 0,
        avgBookingValue: 0,
        monthlyData: {},
        sourceBreakdown: {},
        boatBreakdown: {}
      };
    }
    
    // Monthly breakdown
    if (!metrics[year].monthlyData[month]) {
      metrics[year].monthlyData[month] = {
        month,
        bookings: 0,
        revenue: 0,
        guests: 0
      };
    }
    
    // Aggregate data
    metrics[year].totalBookings++;
    metrics[year].totalRevenue += booking.charter_total || 0;
    metrics[year].totalGuests += booking.total_guests || 0;
    
    metrics[year].monthlyData[month].bookings++;
    metrics[year].monthlyData[month].revenue += booking.charter_total || 0;
    metrics[year].monthlyData[month].guests += booking.total_guests || 0;
    
    // Source breakdown
    const source = booking.booking_source || 'unknown';
    metrics[year].sourceBreakdown[source] = (metrics[year].sourceBreakdown[source] || 0) + 1;
    
    // Boat breakdown
    const boat = booking.boat || 'unknown';
    metrics[year].boatBreakdown[boat] = (metrics[year].boatBreakdown[boat] || 0) + 1;
  });
  
  // Calculate averages
  Object.values(metrics).forEach((yearData) => {
    yearData.avgBookingValue = yearData.totalBookings > 0 
      ? yearData.totalRevenue / yearData.totalBookings 
      : 0;
  });
  
  return metrics;
};

export const calculateYearComparisons = (yearlyMetrics: Record<number, YearlyMetrics>, years: number[]): YearComparison[] => {
  const comparisons: YearComparison[] = [];
  
  for (let i = 0; i < years.length - 1; i++) {
    const currentYear = years[i];
    const previousYear = years[i + 1];
    
    const current = yearlyMetrics[currentYear];
    const previous = yearlyMetrics[previousYear];
    
    if (current && previous) {
      comparisons.push({
        currentYear,
        previousYear,
        bookingsChange: previous.totalBookings > 0 ? ((current.totalBookings - previous.totalBookings) / previous.totalBookings) * 100 : 0,
        revenueChange: previous.totalRevenue > 0 ? ((current.totalRevenue - previous.totalRevenue) / previous.totalRevenue) * 100 : 0,
        guestsChange: previous.totalGuests > 0 ? ((current.totalGuests - previous.totalGuests) / previous.totalGuests) * 100 : 0,
        avgValueChange: previous.avgBookingValue > 0 ? ((current.avgBookingValue - previous.avgBookingValue) / previous.avgBookingValue) * 100 : 0
      });
    }
  }
  
  return comparisons;
};

export const generateMonthlyComparisonData = (yearlyMetrics: Record<number, YearlyMetrics>, years: number[]): MonthlyComparisonData[] => {
  const data: MonthlyComparisonData[] = [];
  
  for (let month = 1; month <= 12; month++) {
    const monthData: MonthlyComparisonData = {
      month: new Date(2023, month - 1).toLocaleDateString('en', { month: 'short' })
    };
    
    years.forEach(year => {
      const yearData = yearlyMetrics[year];
      const monthMetrics = yearData?.monthlyData[month];
      
      monthData[`revenue_${year}`] = monthMetrics?.revenue || 0;
      monthData[`bookings_${year}`] = monthMetrics?.bookings || 0;
      monthData[`guests_${year}`] = monthMetrics?.guests || 0;
    });
    
    data.push(monthData);
  }
  
  return data;
};
