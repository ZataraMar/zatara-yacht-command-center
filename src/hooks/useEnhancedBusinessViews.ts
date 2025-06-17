
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';

interface BusinessViewFilters {
  view_name: string;
  time_forward: number;
  time_backward?: number;
  boat_filter: string;
  status_filter: string;
  user_role: string;
}

interface UseEnhancedBusinessViewsProps {
  timeFilter: string;
  boatFilter: string;
  statusFilter: string;
  viewMode: string;
}

export const useEnhancedBusinessViews = ({
  timeFilter,
  boatFilter,
  statusFilter,
  viewMode
}: UseEnhancedBusinessViewsProps) => {
  const { profile } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableViews, setAvailableViews] = useState<any[]>([]);

  const fetchBusinessView = async () => {
    if (!profile?.role) return;

    try {
      setLoading(true);
      setError(null);

      const filters: BusinessViewFilters = {
        view_name: viewMode,
        time_forward: parseInt(timeFilter),
        time_backward: 0,
        boat_filter: boatFilter,
        status_filter: statusFilter,
        user_role: profile.role
      };

      // Try using the dynamic function first
      const { data: dynamicData, error: dynamicError } = await supabase
        .rpc('get_business_view', filters);

      if (dynamicError) {
        console.warn('Dynamic view failed, falling back to static views:', dynamicError);
        
        // Fallback to static views based on viewMode
        let fallbackQuery;
        switch (viewMode) {
          case 'operations':
            fallbackQuery = supabase.from('business_view_operations').select('*');
            break;
          case 'finance':
            fallbackQuery = supabase.from('business_view_finance').select('*');
            break;
          case 'zatara':
            fallbackQuery = supabase.from('business_view_zatara_skipper').select('*');
            break;
          case 'puravida':
            fallbackQuery = supabase.from('business_view_puravida_skipper').select('*');
            break;
          default:
            fallbackQuery = supabase.from('bookings').select('*').limit(50);
        }

        const { data: fallbackData, error: fallbackError } = await fallbackQuery;
        
        if (fallbackError) throw fallbackError;
        setData(fallbackData || []);
      } else {
        setData(dynamicData || []);
      }

    } catch (err) {
      console.error('Error fetching business view:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableViews = async () => {
    if (!profile?.role) return;

    try {
      const { data: views, error } = await supabase
        .rpc('get_available_views', { user_role: profile.role });
      
      if (error) {
        console.warn('Available views function failed:', error);
        // Fallback views based on user role
        const fallbackViews = [
          { view_name: 'operations', display_name: '🔧 Operations', description: 'Operations management' },
          { view_name: 'finance', display_name: '💰 Finance', description: 'Financial tracking' }
        ];
        
        if (profile.role === 'skippers' || profile.role === 'operations' || profile.role === 'owner') {
          fallbackViews.push(
            { view_name: 'zatara', display_name: '⛵ Zatara', description: 'Zatara operations' },
            { view_name: 'puravida', display_name: '🚤 PuraVida', description: 'PuraVida operations' }
          );
        }
        
        setAvailableViews(fallbackViews);
      } else {
        setAvailableViews(views || []);
      }
    } catch (err) {
      console.error('Error fetching available views:', err);
      setAvailableViews([]);
    }
  };

  useEffect(() => {
    fetchAvailableViews();
  }, [profile?.role]);

  useEffect(() => {
    fetchBusinessView();
  }, [timeFilter, boatFilter, statusFilter, viewMode, profile?.role]);

  return {
    data,
    loading,
    error,
    availableViews,
    refetch: fetchBusinessView
  };
};
