
export interface YearlyMetrics {
  year: number;
  totalBookings: number;
  totalRevenue: number;
  totalGuests: number;
  avgBookingValue: number;
  monthlyData: Record<number, MonthlyMetrics>;
  sourceBreakdown: Record<string, number>;
  boatBreakdown: Record<string, number>;
}

export interface MonthlyMetrics {
  month: number;
  bookings: number;
  revenue: number;
  guests: number;
}

export interface YearComparison {
  currentYear: number;
  previousYear: number;
  bookingsChange: number;
  revenueChange: number;
  guestsChange: number;
  avgValueChange: number;
}

export interface MonthlyComparisonData {
  month: string;
  [key: string]: string | number;
}
