
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DataAuditResult {
  table: string;
  recordCount: number;
  hasData: boolean;
  sampleRecord: any;
  issues: string[];
}

export const useDataAudit = () => {
  const [auditResults, setAuditResults] = useState<DataAuditResult[]>([]);
  const [loading, setLoading] = useState(true);

  const auditTable = async (tableName: string): Promise<DataAuditResult> => {
    try {
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(1);

      const issues: string[] = [];
      
      if (error) {
        issues.push(`Database error: ${error.message}`);
      }
      
      if (!count || count === 0) {
        issues.push('No data found in table');
      }

      return {
        table: tableName,
        recordCount: count || 0,
        hasData: !!data && data.length > 0,
        sampleRecord: data?.[0] || null,
        issues
      };
    } catch (error) {
      return {
        table: tableName,
        recordCount: 0,
        hasData: false,
        sampleRecord: null,
        issues: [`Error accessing table: ${error}`]
      };
    }
  };

  const performAudit = async () => {
    const tablesToAudit = [
      'bookings',
      'charters_2022',
      'charters_2023', 
      'business_analytics',
      'business_forecasting',
      'business_targets',
      'seasonal_performance',
      'operations',
      'customer_communications',
      'charter_reconciliation'
    ];

    const results = await Promise.all(
      tablesToAudit.map(table => auditTable(table))
    );

    setAuditResults(results);
    setLoading(false);
  };

  useEffect(() => {
    performAudit();
  }, []);

  return { auditResults, loading, refetch: performAudit };
};
