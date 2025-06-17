
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

  try {
    // Use correct table names for historical data
    const tableName = year === 2022 ? 'charters_2022' : year === 2023 ? 'charters_2023' : null;
    
    if (!tableName) {
      console.warn(`No table available for year ${year}`);
      return [];
    }
    
    console.log(`Fetching data from table: ${tableName} for year ${year}`);
    
    const { data: historicalData, error } = await supabase
      .from(tableName as any)
      .select('*')
      .not('charter_date', 'is', null)
      .order('charter_date', { ascending: false });

    if (error) {
      console.error(`Error fetching ${year} data from ${tableName}:`, error);
      return [];
    }

    console.log(`Raw ${year} data fetched:`, historicalData?.length || 0);
    
    if (!historicalData || historicalData.length === 0) {
      console.warn(`No data found in ${tableName}`);
      return [];
    }

    const transformedData = historicalData.map(charter => transformHistoricalBooking(charter, year));
    console.log(`Transformed ${year} bookings:`, transformedData.length);
    
    return transformedData;
  } catch (fallbackErr) {
    console.error(`All queries failed for ${year}:`, fallbackErr);
    return [];
  }
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
