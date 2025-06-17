
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

      // Use the enhanced business view function
      const { data: result, error: dbError } = await supabase
        .rpc('get_enhanced_business_view', {
          view_name: viewMode,
          time_filter: parseInt(timeFilter),
          boat_filter: boatFilter,
          status_filter: statusFilter
        });

      if (dbError) {
        console.warn('Enhanced function failed, falling back:', dbError);
        
        // Fallback to existing function
        const { data: fallbackData, error: fallbackError } = await supabase
          .rpc('get_business_view', {
            view_name: viewMode,
            time_forward: parseInt(timeFilter),
            boat_filter: boatFilter,
            status_filter: statusFilter,
            user_role: profile.role
          });
        
        if (fallbackError) throw fallbackError;
        setData(fallbackData || []);
      } else {
        setData(result || []);
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
