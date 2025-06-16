
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffMember, StaffOverviewMetrics } from '@/types/staff';
import { enrichStaffData } from '@/utils/staffUtils';

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('active', true);

      if (error) throw error;

      const enrichedStaff = enrichStaffData(data);
      setStaff(enrichedStaff);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOverviewMetrics = (): StaffOverviewMetrics => {
    return {
      totalStaff: staff.length,
      activeSkippers: staff.filter(s => s.role === 'skippers').length,
      onDutyToday: 6, // Mock data
      avgHoursPerWeek: 32 // Mock data
    };
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return { 
    staff, 
    loading, 
    overviewMetrics: getOverviewMetrics(),
    refreshStaff: fetchStaff 
  };
};
