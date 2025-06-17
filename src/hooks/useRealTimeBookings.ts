
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
  booking_notes: string; // Added this field
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
        .order('start_date', { ascending: true }); // Order by start_date to see chronological order

      if (fetchError) {
        console.error('Error fetching bookings:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Successfully fetched bookings:', data?.length || 0);
      console.log('Sample booking statuses:', data?.slice(0, 5).map(b => ({ 
        locator: b.locator, 
        status: b.booking_status, 
        guest: `${b.guest_first_name} ${b.guest_surname}`,
        date: b.start_date
      })));
      
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
