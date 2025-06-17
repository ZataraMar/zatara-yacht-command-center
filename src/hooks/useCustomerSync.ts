
import { useState, useEffect } from 'react';
import { syncCustomersFromBookings, markAndronauticDataAsReal, autoMigrateAndronauticData } from '@/utils/customerSync';

export const useCustomerSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const performSync = async () => {
    setSyncing(true);
    setSyncStatus('Syncing customer data...');
    
    try {
      // First mark Andronautic data as real
      const markResult = await markAndronauticDataAsReal();
      if (!markResult.success) {
        throw new Error(markResult.error);
      }
      
      // Then run auto migration
      const migrateResult = await autoMigrateAndronauticData();
      if (!migrateResult.success) {
        throw new Error(migrateResult.error);
      }
      
      // Finally sync customers from bookings
      const syncResult = await syncCustomersFromBookings();
      if (!syncResult.success) {
        throw new Error(syncResult.error);
      }
      
      setSyncStatus('Customer data synced successfully');
      return true;
      
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus(`Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setSyncing(false);
    }
  };

  // Auto-sync on mount if no customer data exists
  useEffect(() => {
    performSync();
  }, []);

  return {
    syncing,
    syncStatus,
    performSync
  };
};
