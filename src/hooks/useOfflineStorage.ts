import { useState, useEffect } from 'react';

interface OfflineData {
  [key: string]: any;
}

export const useOfflineStorage = () => {
  const [offlineData, setOfflineData] = useState<OfflineData>({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load offline data from localStorage
    const stored = localStorage.getItem('zatara_offline_data');
    if (stored) {
      try {
        setOfflineData(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing offline data:', error);
      }
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const storeOfflineData = (key: string, data: any) => {
    const newOfflineData = { ...offlineData, [key]: data };
    setOfflineData(newOfflineData);
    localStorage.setItem('zatara_offline_data', JSON.stringify(newOfflineData));
  };

  const getOfflineData = (key: string) => {
    return offlineData[key];
  };

  const clearOfflineData = (key?: string) => {
    if (key) {
      const newOfflineData = { ...offlineData };
      delete newOfflineData[key];
      setOfflineData(newOfflineData);
      localStorage.setItem('zatara_offline_data', JSON.stringify(newOfflineData));
    } else {
      setOfflineData({});
      localStorage.removeItem('zatara_offline_data');
    }
  };

  const syncWhenOnline = async (syncFunction: () => Promise<void>) => {
    if (isOnline) {
      try {
        await syncFunction();
      } catch (error) {
        console.error('Sync error:', error);
      }
    }
  };

  return {
    offlineData,
    isOnline,
    storeOfflineData,
    getOfflineData,
    clearOfflineData,
    syncWhenOnline
  };
};