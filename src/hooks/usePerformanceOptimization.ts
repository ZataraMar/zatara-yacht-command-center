
import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  isOnline: boolean;
  connectionType: string;
  isSlowConnection: boolean;
  prefersReducedMotion: boolean;
}

export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isOnline: navigator.onLine,
    connectionType: 'unknown',
    isSlowConnection: false,
    prefersReducedMotion: false,
  });

  const updateConnectionInfo = useCallback(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const isSlowConnection = 
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' || 
        (connection.downlink && connection.downlink < 1.5);
      
      setMetrics(prev => ({
        ...prev,
        connectionType: connection.effectiveType || 'unknown',
        isSlowConnection,
      }));
    }
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setMetrics(prev => ({
      ...prev,
      prefersReducedMotion,
    }));

    // Listen for online/offline events
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Monitor connection changes
    updateConnectionInfo();
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, [updateConnectionInfo]);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    if (!metrics.isSlowConnection) {
      // Preload critical images
      const criticalImages = [
        '/lovable-uploads/83fe3d22-8bf7-47d2-9462-1954772ef062.png',
        '/lovable-uploads/c2ba532a-b378-4225-bbe6-7b4846e018fd.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    }
  }, [metrics.isSlowConnection]);

  // Optimize animations based on performance
  const getAnimationClass = useCallback((normalClass: string, reducedClass: string = '') => {
    if (metrics.prefersReducedMotion || metrics.isSlowConnection) {
      return reducedClass;
    }
    return normalClass;
  }, [metrics.prefersReducedMotion, metrics.isSlowConnection]);

  return {
    ...metrics,
    preloadCriticalResources,
    getAnimationClass,
  };
};
