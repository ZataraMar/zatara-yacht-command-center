
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

      let query = supabase
        .from('comprehensive_bookings_view')
        .select('*');

      // Apply filters
      if (filters?.startDate) {
        query = query.gte('booking_date', filters.startDate);
      }
      if (filters?.endDate) {
        query = query.lte('booking_date', filters.endDate);
      }
      if (filters?.boat && filters.boat !== 'all') {
        query = query.eq('boat', filters.boat);
      }
      if (filters?.source && filters.source !== 'all') {
        query = query.eq('booking_source', filters.source);
      }
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('booking_status', filters.status);
      }
      if (filters?.year) {
        query = query.eq('booking_year', filters.year);
      }

      query = query
        .order('start_date', { ascending: false })
        .limit(filters?.limit || 200);

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setBookings(data || []);
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
