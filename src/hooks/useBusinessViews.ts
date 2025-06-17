
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface BusinessViewFilters {
  view_name: string;
  time_forward: number;
  time_backward?: number;
  boat_filter: string;
  status_filter: string;
}

export const useBusinessViews = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [availableViews, setAvailableViews] = useState<any[]>([]);

  const fetchAvailableViews = async () => {
    try {
      const { data, error } = await supabase.rpc('get_available_views', {
        user_role: profile?.role || 'operations'
      });
      
      if (error) throw error;
      setAvailableViews(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching available views:', error);
      return [];
    }
  };

  const fetchBusinessView = async (filters: BusinessViewFilters) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_business_view', {
        ...filters,
        user_role: profile?.role || 'operations'
      });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching business view:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchDirectView = async (tableName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('charter_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFilterOptions = async () => {
    try {
      const { data, error } = await supabase.rpc('get_filter_options');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching filter options:', error);
      return {
        time_options: ['7 days', '14 days', '30 days'],
        boat_options: ['All Boats', 'Zatara Only', 'PuraVida Only', 'Both Boats'],
        status_options: ['Booked/Prebooked', 'Option Request', 'Cancelled', 'All']
      };
    }
  };

  useEffect(() => {
    if (profile?.role) {
      fetchAvailableViews();
    }
  }, [profile?.role]);

  return {
    loading,
    availableViews,
    fetchBusinessView,
    fetchDirectView,
    fetchAvailableViews,
    getFilterOptions
  };
};
