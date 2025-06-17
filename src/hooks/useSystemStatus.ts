
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SystemStatus {
  component: string;
  status: string;
  details: string;
  last_updated: string;
}

export const useSystemStatus = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');

  const checkSystemHealth = async () => {
    try {
      setLoading(true);
      
      // Call the system health check function
      const { data, error } = await supabase.rpc('system_health_check');
      
      if (error) {
        console.error('System health check failed:', error);
        setSystemStatus([{
          component: 'system_check',
          status: 'error',
          details: 'Health check function failed',
          last_updated: new Date().toISOString()
        }]);
        setOverallHealth('critical');
        return;
      }

      setSystemStatus(data || []);
      
      // Determine overall health
      const hasError = data?.some((status: SystemStatus) => status.status === 'error');
      const hasWarning = data?.some((status: SystemStatus) => status.status === 'warning');
      
      if (hasError) {
        setOverallHealth('critical');
      } else if (hasWarning) {
        setOverallHealth('warning');
      } else {
        setOverallHealth('healthy');
      }
      
    } catch (error) {
      console.error('Error checking system health:', error);
      setOverallHealth('critical');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSystemHealth();
    
    // Set up periodic health checks every 5 minutes
    const interval = setInterval(checkSystemHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    systemStatus,
    overallHealth,
    loading,
    refetch: checkSystemHealth
  };
};
