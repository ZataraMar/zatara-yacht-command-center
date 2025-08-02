
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';
import { BusinessViewRow, FinanceViewRow, SkipperViewRow } from '@/components/dashboard/operations/types/businessViewTypes';

export const useBusinessViewData = (timeFilter: string, boatFilter: string) => {
  const { profile } = useAuth();
  const [operationsData, setOperationsData] = useState<BusinessViewRow[]>([]);
  const [financeData, setFinanceData] = useState<FinanceViewRow[]>([]);
  const [zataraData, setZataraData] = useState<SkipperViewRow[]>([]);
  const [puravidaData, setPuravidaData] = useState<SkipperViewRow[]>([]);
  const [availableViews, setAvailableViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBusinessViews = async () => {
    try {
      setLoading(true);
      
      // Get available views for current user role
      const { data: views } = await supabase.rpc('get_available_views', {
        user_role: profile?.role || 'operations'
      });
      setAvailableViews(views || []);

      // Fetch operations view using dynamic filtering
      const { data: operationsResult } = await supabase.rpc('get_business_view', {
        view_name: 'operations',
        time_forward: parseInt(timeFilter),
        boat_filter: boatFilter,
        status_filter: 'booked_prebooked',
        user_role: profile?.role || 'operations'
      });

      // Direct queries for specific business views
      const [financeResult, zataraResult, puravidaResult] = await Promise.all([
        supabase.from('business_view_finance').select('*').order('charter_date'),
        supabase.from('business_view_zatara_skipper').select('*').order('charter_date'),
        supabase.from('business_view_puravida_skipper').select('*').order('charter_date')
      ]);

      setOperationsData(operationsResult || []);
      // Transform finance data to match FinanceViewRow interface
      const transformedFinanceData: FinanceViewRow[] = (financeResult.data || []).map(item => ({
        ...item,
        guest_full_name: item.guest_name || '',
        payments_received: item.paid_amount || 0,
        total_paid: item.paid_amount || 0,
        balance_due: item.outstanding_amount || 0,
        payment_status: item.outstanding_amount > 0 ? 'pending' : 'paid'
      }));
      setFinanceData(transformedFinanceData);
      
      // Transform zatara data to include boat field
      const transformedZataraData: SkipperViewRow[] = (zataraResult.data || []).map(item => ({
        ...item,
        boat: 'Zatara'
      }));
      setZataraData(transformedZataraData);
      
      // Transform puravida data to include boat field
      const transformedPuravidaData: SkipperViewRow[] = (puravidaResult.data || []).map(item => ({
        ...item,
        boat: 'PuraVida'
      }));
      setPuravidaData(transformedPuravidaData);

    } catch (error) {
      console.error('Error fetching business views:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessViews();
  }, [profile?.role, timeFilter, boatFilter]);

  return {
    operationsData,
    financeData,
    zataraData,
    puravidaData,
    availableViews,
    loading,
    refetch: fetchBusinessViews
  };
};
