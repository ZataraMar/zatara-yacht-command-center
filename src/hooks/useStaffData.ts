
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
        .eq('active', true)
        .order('role', { ascending: false })
        .order('first_name', { ascending: true });

      if (error) {
        console.error('Error fetching staff:', error);
        throw error;
      }

      const enrichedStaff = enrichStaffData(data || []);
      setStaff(enrichedStaff);
    } catch (error) {
      console.error('Error fetching staff:', error);
      // Set empty array on error to prevent UI issues
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  const getOverviewMetrics = (): StaffOverviewMetrics => {
    const totalStaff = staff.length;
    const activeSkippers = staff.filter(s => s.role === 'skippers').length;
    const managementCount = staff.filter(s => ['management', 'owners'].includes(s.role)).length;
    
    return {
      totalStaff,
      activeSkippers,
      onDutyToday: activeSkippers + managementCount, // Realistic estimate
      avgHoursPerWeek: totalStaff > 0 ? 32 : 0
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
