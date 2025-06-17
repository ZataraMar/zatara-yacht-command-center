
import { supabase } from '@/integrations/supabase/client';
import { ComprehensiveBooking, BookingFilters } from '@/types/booking';
import { transformCurrentBooking, transformHistoricalBooking } from '@/utils/bookingTransformers';

export const fetchCurrentBookings = async (filters?: BookingFilters): Promise<ComprehensiveBooking[]> => {
  let currentQuery = supabase
    .from('bookings')
    .select('*')
    .eq('data_source', 'real');

  if (filters?.startDate) {
    currentQuery = currentQuery.gte('start_date', filters.startDate);
  }
  if (filters?.endDate) {
    currentQuery = currentQuery.lte('start_date', filters.endDate);
  }
  if (filters?.boats && filters.boats.length > 0) {
    currentQuery = currentQuery.in('boat', filters.boats);
  }
  if (filters?.sources && filters.sources.length > 0) {
    currentQuery = currentQuery.in('booking_source', filters.sources);
  }
  if (filters?.statuses && filters.statuses.length > 0) {
    currentQuery = currentQuery.in('booking_status', filters.statuses);
  }

  const { data: currentBookings, error: currentError } = await currentQuery
    .order('start_date', { ascending: false })
    .limit(filters?.limit || 500);

  if (currentError) {
    console.error('Error fetching current bookings:', currentError);
    return [];
  }

  return (currentBookings || []).map(transformCurrentBooking);
};

export const fetchHistoricalBookings = async (year: number, filters?: BookingFilters): Promise<ComprehensiveBooking[]> => {
  const shouldFetch = !filters?.years || filters.years.includes(year);
  if (!shouldFetch) return [];

  // Use a dynamic query approach to handle table names
  const { data: historicalData, error } = await supabase.rpc('get_historical_bookings', {
    target_year: year,
    start_date_filter: filters?.startDate,
    end_date_filter: filters?.endDate
  });

  if (error) {
    console.warn(`Error fetching ${year} data:`, error);
    
    // Fallback to direct table query if RPC doesn't exist
    try {
      const tableName = year === 2022 ? 'charters_2022' : 'charters_2023';
      const { data: fallbackData, error: fallbackError } = await supabase
        .from(tableName as any)
        .select('*')
        .not('charter_date', 'is', null)
        .order('charter_date', { ascending: false })
        .limit(200);

      if (fallbackError) {
        console.warn(`Fallback query failed for ${year}:`, fallbackError);
        return [];
      }

      return (fallbackData || []).map(charter => transformHistoricalBooking(charter, year));
    } catch (fallbackErr) {
      console.warn(`All queries failed for ${year}:`, fallbackErr);
      return [];
    }
  }

  return (historicalData || []).map(charter => transformHistoricalBooking(charter, year));
};

export const applyClientSideFilters = (
  bookings: ComprehensiveBooking[], 
  filters?: BookingFilters
): ComprehensiveBooking[] => {
  let filteredBookings = [...bookings];

  // Apply date range filters to historical data
  if (filters?.startDate || filters?.endDate) {
    filteredBookings = filteredBookings.filter(booking => {
      const bookingDate = new Date(booking.start_date);
      if (filters.startDate && bookingDate < new Date(filters.startDate)) return false;
      if (filters.endDate && bookingDate > new Date(filters.endDate)) return false;
      return true;
    });
  }

  // Apply boat filters to historical data
  if (filters?.boats && filters.boats.length > 0) {
    filteredBookings = filteredBookings.filter(booking => 
      filters.boats!.some(boat => booking.boat.toLowerCase().includes(boat.toLowerCase()))
    );
  }

  // Apply source filters
  if (filters?.sources && filters.sources.length > 0) {
    filteredBookings = filteredBookings.filter(booking => 
      filters.sources!.includes(booking.booking_source)
    );
  }

  // Apply status filters
  if (filters?.statuses && filters.statuses.length > 0) {
    filteredBookings = filteredBookings.filter(booking => 
      filters.statuses!.includes(booking.booking_status)
    );
  }

  // Sort by date descending
  filteredBookings.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  // Apply limit
  if (filters?.limit) {
    filteredBookings = filteredBookings.slice(0, filters.limit);
  }

  return filteredBookings;
};
