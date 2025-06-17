
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ComprehensiveBooking {
  id: number;
  locator: string;
  start_date: string;
  end_date: string;
  boat: string;
  booking_source: string;
  guest_first_name: string;
  guest_surname: string;
  guest_full_name: string;
  guest_phone?: string;
  guest_email?: string;
  nationality?: string;
  charter_total: number;
  paid_amount: number;
  outstanding_amount: number;
  booking_status: string;
  total_guests: number;
  booking_notes?: string;
  created_at: string;
  updated_at: string;
  data_period: string;
  booking_year: number;
  booking_month: number;
  booking_date: string;
}

export const useComprehensiveBookings = () => {
  const [bookings, setBookings] = useState<ComprehensiveBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async (filters?: {
    startDate?: string;
    endDate?: string;
    boat?: string;
    source?: string;
    status?: string;
    year?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch current bookings
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
      if (filters?.boat && filters.boat !== 'all') {
        currentQuery = currentQuery.eq('boat', filters.boat);
      }
      if (filters?.source && filters.source !== 'all') {
        currentQuery = currentQuery.eq('booking_source', filters.source);
      }
      if (filters?.status && filters.status !== 'all') {
        currentQuery = currentQuery.eq('booking_status', filters.status);
      }

      const { data: currentBookings, error: currentError } = await currentQuery
        .order('start_date', { ascending: false })
        .limit(100);

      if (currentError) throw currentError;

      // Transform current bookings
      const transformedCurrent: ComprehensiveBooking[] = (currentBookings || []).map(booking => ({
        id: booking.id,
        locator: booking.locator || '',
        start_date: booking.start_date,
        end_date: booking.end_date,
        boat: booking.boat || '',
        booking_source: booking.booking_source || '',
        guest_first_name: booking.guest_first_name || '',
        guest_surname: booking.guest_surname || '',
        guest_full_name: `${booking.guest_first_name || ''} ${booking.guest_surname || ''}`.trim(),
        guest_phone: booking.guest_phone,
        guest_email: booking.guest_email,
        nationality: booking.nationality,
        charter_total: booking.charter_total || 0,
        paid_amount: booking.paid_amount || 0,
        outstanding_amount: booking.outstanding_amount || 0,
        booking_status: booking.booking_status || '',
        total_guests: booking.total_guests || 0,
        booking_notes: booking.booking_notes,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
        data_period: 'current',
        booking_year: new Date(booking.start_date).getFullYear(),
        booking_month: new Date(booking.start_date).getMonth() + 1,
        booking_date: booking.start_date.split('T')[0]
      }));

      // Fetch historical bookings from 2022
      const { data: historical2022, error: hist2022Error } = await supabase
        .from('charters_2022')
        .select('*')
        .not('charter_date', 'is', null)
        .order('charter_date', { ascending: false })
        .limit(50);

      if (hist2022Error) console.warn('Error fetching 2022 data:', hist2022Error);

      // Fetch historical bookings from 2023
      const { data: historical2023, error: hist2023Error } = await supabase
        .from('charters_2023')
        .select('*')
        .not('charter_date', 'is', null)
        .order('charter_date', { ascending: false })
        .limit(50);

      if (hist2023Error) console.warn('Error fetching 2023 data:', hist2023Error);

      // Transform historical data
      const transformed2022: ComprehensiveBooking[] = (historical2022 || []).map(charter => ({
        id: 2022000000 + charter.id,
        locator: charter.clickboat_ref || `HIST2022-${charter.id}`,
        start_date: new Date(charter.charter_date).toISOString(),
        end_date: new Date(new Date(charter.charter_date).getTime() + (charter.charter_days || 1) * 24 * 60 * 60 * 1000).toISOString(),
        boat: 'Zatara',
        booking_source: charter.booking_source || 'historical_2022',
        guest_first_name: charter.customer_name?.split(' ')[0] || '',
        guest_surname: charter.customer_name?.split(' ').slice(1).join(' ') || '',
        guest_full_name: charter.customer_name || '',
        guest_phone: undefined,
        guest_email: undefined,
        nationality: undefined,
        charter_total: charter.charter_total_net || charter.direct_hire_gross || charter.clickboat_gross_amount || charter.airbnb_gross_amount || 0,
        paid_amount: charter.charter_total_net || charter.direct_hire_net || charter.clickboat_payout || charter.airbnb_payout || 0,
        outstanding_amount: 0,
        booking_status: 'completed',
        total_guests: charter.pax || 0,
        booking_notes: charter.notes,
        created_at: charter.created_at,
        updated_at: charter.updated_at,
        data_period: '2022_historical',
        booking_year: 2022,
        booking_month: new Date(charter.charter_date).getMonth() + 1,
        booking_date: charter.charter_date
      }));

      const transformed2023: ComprehensiveBooking[] = (historical2023 || []).map(charter => ({
        id: 2023000000 + charter.id,
        locator: charter.clickboat_ref || `HIST2023-${charter.id}`,
        start_date: new Date(charter.charter_date).toISOString(),
        end_date: new Date(new Date(charter.charter_date).getTime() + (charter.charter_days || 1) * 24 * 60 * 60 * 1000).toISOString(),
        boat: 'Zatara',
        booking_source: charter.booking_source || 'historical_2023',
        guest_first_name: charter.customer_name?.split(' ')[0] || '',
        guest_surname: charter.customer_name?.split(' ').slice(1).join(' ') || '',
        guest_full_name: charter.customer_name || '',
        guest_phone: undefined,
        guest_email: undefined,
        nationality: undefined,
        charter_total: charter.charter_total_net || charter.direct_hire_gross || charter.clickboat_gross_amount || charter.airbnb_gross_amount || 0,
        paid_amount: charter.charter_total_net || charter.direct_hire_net || charter.clickboat_payout || charter.airbnb_payout || 0,
        outstanding_amount: 0,
        booking_status: 'completed',
        total_guests: charter.pax || 0,
        booking_notes: charter.notes,
        created_at: charter.created_at,
        updated_at: charter.created_at || new Date(charter.charter_date).toISOString(),
        data_period: '2023_historical',
        booking_year: 2023,
        booking_month: new Date(charter.charter_date).getMonth() + 1,
        booking_date: charter.charter_date
      }));

      // Combine all bookings
      const allBookings = [...transformedCurrent, ...transformed2022, ...transformed2023];

      // Apply additional filters if needed
      let filteredBookings = allBookings;
      if (filters?.year) {
        filteredBookings = filteredBookings.filter(b => b.booking_year === filters.year);
      }

      // Sort by date descending
      filteredBookings.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

      // Apply limit
      if (filters?.limit) {
        filteredBookings = filteredBookings.slice(0, filters.limit);
      }

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
