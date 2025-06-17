import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Server,
  Users,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// ... keep existing code (interfaces and component logic)

export const SystemHealthMonitor = () => {
  // ... keep existing code (state and useEffect)

  const refreshHealth = async () => {
    setRefreshing(true);
    await fetchAllSystemData();
    setRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'action_required':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

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
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

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

      {/* Auto-Sync Status Overview */}
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

      {/* System Performance Overview */}
      {performance && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Database Size</p>
                  <p className="text-2xl font-bold text-zatara-navy">{performance.database_size}</p>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Connections</p>
                  <p className="text-2xl font-bold text-zatara-navy">{performance.active_connections}</p>
                </div>
                <Server className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-zatara-navy">{performance.total_bookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-zatara-navy">{performance.active_customers}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Health Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Health Checks</span>
          </CardTitle>
          <CardDescription>
            Automated monitoring of critical system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          {healthChecks.length > 0 ? (
            <div className="space-y-4">
              {healthChecks.map((check, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(check.status)}
                      <div>
                        <h3 className="font-medium capitalize">
                          {check.component.replace('_', ' ')}
                        </h3>
                        <p className="text-sm text-gray-600">{check.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(check.status)}>
                        {check.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(check.last_updated).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No health check data available</p>
              <p className="text-sm">System monitoring may not be configured</p>
            </div>
          )}
        </CardContent>
      </Card>

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
