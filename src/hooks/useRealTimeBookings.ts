
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Booking {
  id: number;
  locator: string;
  start_date: string;
  end_date: string;
  boat: string;
  booking_source: string;
  guest_first_name: string;
  guest_surname: string;
  guest_phone: string;
  guest_email: string;
  charter_total: number;
  booking_status: string;
  total_guests: number;
  paid_amount: number;
  outstanding_amount: number;
  data_source: string;
  created_at: string;
  updated_at: string;
}

export const useRealTimeBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching real-time bookings data...');

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching bookings:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Successfully fetched bookings:', data?.length || 0);
      setBookings(data || []);
      setLastUpdate(new Date());

    } catch (err) {
      console.error('Error in fetchBookings:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Set up real-time subscription
    const channel = supabase
      .channel('bookings-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, (payload) => {
        console.log('Real-time booking update:', payload.eventType);
        // Safely access payload properties with type checking
        if (payload.new && typeof payload.new === 'object' && 'locator' in payload.new) {
          console.log('Updated booking locator:', payload.new.locator);
        }
        fetchBookings();
      })
      .subscribe();

    return () => {
      console.log('Cleaning up bookings subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    bookings,
    loading,
    error,
    lastUpdate,
    refetch: fetchBookings
  };
};
