
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, CheckCircle2 } from 'lucide-react';
import { useSystemHealthData } from '@/hooks/useSystemHealthData';
import { SyncStatusSection } from './components/SyncStatusSection';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { HealthChecksSection } from './components/HealthChecksSection';

export const SystemHealthMonitor = () => {
  const {
    loading,
    refreshing,
    syncingManually,
    syncStatus,
    importLogs,
    performance,
    healthChecks,
    triggerManualSync,
    refreshHealth
  } = useSystemHealthData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">System Health Monitor</h2>
          <p className="text-zatara-blue">Real-time system status and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={triggerManualSync} disabled={syncingManually} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${syncingManually ? 'animate-spin' : ''}`} />
            Manual Sync
          </Button>
          <Button onClick={refreshHealth} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <SyncStatusSection syncStatus={syncStatus} />

      {/* Recent Import Activity */}
      {importLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Recent Import Activity</span>
            </CardTitle>
            <CardDescription>
              Latest data synchronization operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {importLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${log.import_status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <span className="font-medium">{log.platform_source}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {log.records_successful} records • {log.import_trigger}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <PerformanceMetrics performance={performance} />
      <HealthChecksSection healthChecks={healthChecks} />

      {/* System Maintenance Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
          <CardDescription>
            Maintenance utilities and system management tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Data Migration</h4>
              <p className="text-sm text-gray-600 mb-3">
                Migrate existing bookings to customer profiles
              </p>
              <Button variant="outline" size="sm">
                Run Migration
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Data Cleanup</h4>
              <p className="text-sm text-gray-600 mb-3">
                Clean old logs and optimize database
              </p>
              <Button variant="outline" size="sm">
                Cleanup Data
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Performance Optimization</h4>
              <p className="text-sm text-gray-600 mb-3">
                Analyze and optimize system performance
              </p>
              <Button variant="outline" size="sm">
                Optimize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Current system configuration and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Database Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tables:</span>
                  <span>{performance?.table_count || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>
                    {performance ? new Date(performance.last_updated).toLocaleString() : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">System Features</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Automated audit logging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Real-time conflict detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Task automation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Customer lifecycle management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Andronautic auto-sync</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
