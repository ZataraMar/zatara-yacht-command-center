
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface SyncStatus {
  platform_name: string;
  sync_status: string;
  consecutive_failures: number;
  records_synced_last_run: number;
  last_successful_sync: string | null;
}

interface SyncStatusSectionProps {
  syncStatus: SyncStatus[];
}

export const SyncStatusSection = ({ syncStatus }: SyncStatusSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'action_required':
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyncStatusIcon = (status: string, consecutiveFailures: number) => {
    if (consecutiveFailures > 0) {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
    
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'syncing':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <RefreshCw className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5" />
          <span>Andronautic Auto-Sync Status</span>
        </CardTitle>
        <CardDescription>
          Real-time data integration monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        {syncStatus.length > 0 ? (
          <div className="space-y-4">
            {syncStatus.map((sync, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getSyncStatusIcon(sync.sync_status, sync.consecutive_failures)}
                    <div>
                      <h3 className="font-medium capitalize">
                        {sync.platform_name} Integration
                      </h3>
                      <p className="text-sm text-gray-600">
                        Last sync: {sync.records_synced_last_run} records
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(sync.sync_status)}>
                      {sync.sync_status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {sync.last_successful_sync ? new Date(sync.last_successful_sync).toLocaleString() : 'Never'}
                    </span>
                  </div>
                </div>
                {sync.consecutive_failures > 0 && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-red-700 text-sm">
                    ⚠️ {sync.consecutive_failures} consecutive sync failures detected
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <RefreshCw className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No sync configurations found</p>
            <p className="text-sm">Auto-sync may not be configured</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
