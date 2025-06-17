
import { useState, useEffect } from 'react';
import { syncCustomersFromBookings, markAndronauticDataAsReal, autoMigrateAndronauticData } from '@/utils/customerSync';

export const useCustomerSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const performSync = async () => {
    setSyncing(true);
    setSyncStatus('Syncing customer data...');
    
    try {
      console.log('Starting customer sync process...');
      
      // First mark Andronautic data as real
      const markResult = await markAndronauticDataAsReal();
      if (!markResult.success) {
        throw new Error(markResult.error);
      }
      console.log('Marked Andronautic data as real');
      
      // Then run auto migration
      const migrateResult = await autoMigrateAndronauticData();
      if (!migrateResult.success) {
        throw new Error(migrateResult.error);
      }
      console.log('Auto migration completed');
      
      // Finally sync customers from bookings
      const syncResult = await syncCustomersFromBookings();
      if (!syncResult.success) {
        throw new Error(syncResult.error);
      }
      console.log('Customer sync completed');
      
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

  // Only run sync on first mount, not every time
  useEffect(() => {
    let hasRun = false;
    if (!hasRun) {
      hasRun = true;
      performSync();
    }
  }, []);

  return {
    syncing,
    syncStatus,
    performSync
  };
};
