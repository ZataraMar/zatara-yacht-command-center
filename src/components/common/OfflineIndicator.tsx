
import React from 'react';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { WifiOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const OfflineIndicator = () => {
  const { isOnline } = usePerformanceOptimization();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <Card className="bg-zatara-accent text-zatara-navy shadow-lg border-0">
        <CardContent className="flex items-center space-x-3 p-3">
          <WifiOff className="h-5 w-5" />
          <div>
            <p className="font-medium text-sm">Offline Mode</p>
            <p className="text-xs opacity-80">Some features may be limited</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
