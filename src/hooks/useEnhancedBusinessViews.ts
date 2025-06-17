
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';
import { useRealtimeBusinessViews } from './useRealtimeBusinessViews';

interface BusinessViewFilters {
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
}: BusinessViewFilters) => {
  const { profile } = useAuth();
  const [availableViews, setAvailableViews] = useState<any[]>([]);

  // Use the realtime hook for data
  const {
    data,
    loading,
    error,
    refetch
  } = useRealtimeBusinessViews({
    timeFilter,
    boatFilter,
    statusFilter,
    viewMode
  });

  const fetchAvailableViews = async () => {
    if (!profile?.role) return;

    try {
      // Try using the enhanced function first
      const { data: views, error } = await supabase
        .rpc('get_available_views', { user_role: profile.role });
      
      if (error) {
        console.warn('Available views function failed, using fallback');
        // Fallback views based on user role
        const fallbackViews = [
          { 
            view_name: 'operations', 
            display_name: '🔧 Operations', 
            view_type: 'operations',
            description: 'Operations management' 
          },
          { 
            view_name: 'finance', 
            display_name: '💰 Finance', 
            view_type: 'finance',
            description: 'Financial tracking' 
          }
        ];
        
        if (profile.role === 'skippers' || profile.role === 'operations' || profile.role === 'owner') {
          fallbackViews.push(
            { 
              view_name: 'zatara', 
              display_name: '⛵ Zatara', 
              view_type: 'skipper',
              description: 'Zatara operations' 
            },
            { 
              view_name: 'puravida', 
              display_name: '🚤 PuraVida', 
              view_type: 'skipper',
              description: 'PuraVida operations' 
            }
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

  return {
    data,
    loading,
    error,
    availableViews,
    refetch
  };
};
