
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface RealtimeBusinessViewFilters {
  timeFilter: string;
  boatFilter: string;
  statusFilter: string;
  viewMode: string;
}

export const useRealtimeBusinessViews = ({
  timeFilter,
  boatFilter,
  statusFilter,
  viewMode
}: RealtimeBusinessViewFilters) => {
  const { profile } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessView = async () => {
    if (!profile?.role) return;

    try {
      setLoading(true);
      setError(null);

      // Use the existing business view function since enhanced one may not exist
      const { data: result, error: dbError } = await supabase
        .rpc('get_business_view', {
          view_name: viewMode,
          time_forward: parseInt(timeFilter),
          boat_filter: boatFilter,
          status_filter: statusFilter,
          user_role: profile.role
        });

      if (dbError) {
        console.error('Business view function failed:', dbError);
        setError(dbError.message);
        setData([]);
      } else {
        // Ensure we always set an array
        const resultData = Array.isArray(result) ? result : (result ? [result] : []);
        setData(resultData);
      }

    } catch (err) {
      console.error('Error fetching business view:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessView();
  }, [timeFilter, boatFilter, statusFilter, viewMode, profile?.role]);

  // Set up real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('business-view-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          console.log('Bookings change detected:', payload);
          fetchBusinessView();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'operations'
        },
        (payload) => {
          console.log('Operations change detected:', payload);
          fetchBusinessView();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [viewMode, timeFilter, boatFilter, statusFilter]);

  return {
    data,
    loading,
    error,
    refetch: fetchBusinessView
  };
};
