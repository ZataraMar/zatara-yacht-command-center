
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SyncStatus {
  platform_name: string;
  sync_status: string;
  consecutive_failures: number;
  records_synced_last_run: number;
  last_successful_sync: string | null;
}

interface ImportLog {
  platform_source: string;
  import_status: string;
  records_successful: number;
  import_trigger: string;
  created_at: string;
}

interface SystemPerformance {
  database_size: string;
  active_connections: number;
  total_bookings: number;
  active_customers: number;
  table_count: number;
  last_updated: string;
}

interface HealthCheck {
  component: string;
  status: string;
  details: string;
  last_updated: string;
}

export const useSystemHealthData = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [syncingManually, setSyncingManually] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus[]>([]);
  const [importLogs, setImportLogs] = useState<ImportLog[]>([]);
  const [performance, setPerformance] = useState<SystemPerformance | null>(null);
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);

  const fetchSyncStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('api_sync_status')
        .select('*')
        .order('last_successful_sync', { ascending: false });

      if (error) throw error;
      setSyncStatus(data || []);
    } catch (error) {
      console.error('Error fetching sync status:', error);
    }
  };

  const fetchImportLogs = async () => {
    try {
      // Mock data since we don't have import_logs table
      const mockLogs: ImportLog[] = [
        {
          platform_source: 'Andronautic',
          import_status: 'completed',
          records_successful: 25,
          import_trigger: 'scheduled',
          created_at: new Date().toISOString()
        }
      ];
      setImportLogs(mockLogs);
    } catch (error) {
      console.error('Error fetching import logs:', error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      // Mock performance data
      const mockPerformance: SystemPerformance = {
        database_size: '2.3 GB',
        active_connections: 12,
        total_bookings: 1,
        active_customers: 45,
        table_count: 25,
        last_updated: new Date().toISOString()
      };
      setPerformance(mockPerformance);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const fetchHealthChecks = async () => {
    try {
      // Mock health check data
      const mockHealthChecks: HealthCheck[] = [
        {
          component: 'database_connection',
          status: 'healthy',
          details: 'All database connections are responding normally',
          last_updated: new Date().toISOString()
        },
        {
          component: 'api_endpoints',
          status: 'healthy',
          details: 'All API endpoints are responding within acceptable limits',
          last_updated: new Date().toISOString()
        }
      ];
      setHealthChecks(mockHealthChecks);
    } catch (error) {
      console.error('Error fetching health checks:', error);
    }
  };

  const fetchAllSystemData = async () => {
    await Promise.all([
      fetchSyncStatus(),
      fetchImportLogs(),
      fetchPerformanceData(),
      fetchHealthChecks()
    ]);
  };

  const triggerManualSync = async () => {
    setSyncingManually(true);
    try {
      // Simulate manual sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      await fetchSyncStatus();
    } catch (error) {
      console.error('Manual sync failed:', error);
    } finally {
      setSyncingManually(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await fetchAllSystemData();
      setLoading(false);
    };

    initializeData();
  }, []);

  const refreshHealth = async () => {
    setRefreshing(true);
    await fetchAllSystemData();
    setRefreshing(false);
  };

  return {
    loading,
    refreshing,
    syncingManually,
    syncStatus,
    importLogs,
    performance,
    healthChecks,
    fetchAllSystemData,
    triggerManualSync,
    refreshHealth
  };
};
