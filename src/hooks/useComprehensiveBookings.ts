
import { useState, useEffect } from 'react';
import { ComprehensiveBooking, BookingFilters } from '@/types/booking';
import { fetchCurrentBookings, fetchHistoricalBookings, applyClientSideFilters } from '@/services/bookingService';

export const useComprehensiveBookings = () => {
  const [bookings, setBookings] = useState<ComprehensiveBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async (filters?: BookingFilters) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching bookings with filters:', filters);

      // Fetch current bookings (2024+)
      const currentBookings = await fetchCurrentBookings(filters);
      console.log('Current bookings fetched:', currentBookings.length);

      // Fetch historical bookings from 2022 and 2023
      const historical2022 = await fetchHistoricalBookings(2022, filters);
      const historical2023 = await fetchHistoricalBookings(2023, filters);

      // Combine all bookings
      const allBookings = [...currentBookings, ...historical2022, ...historical2023];

      console.log('Total bookings combined:', allBookings.length, {
        current: currentBookings.length,
        '2022': historical2022.length,
        '2023': historical2023.length
      });

      // Apply client-side filters
      const filteredBookings = applyClientSideFilters(allBookings, filters);

      console.log('Final filtered bookings:', filteredBookings.length);
      setBookings(filteredBookings);
    } catch (err) {
      console.error('Error fetching comprehensive bookings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings
  };
};
