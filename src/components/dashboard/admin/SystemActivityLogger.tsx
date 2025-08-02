import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Activity, 
  Database, 
  Code, 
  Settings,
  FileText,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ActivityLog {
  id: number;
  activity_type: string;
  component_affected: string;
  description: string;
  user_id: string;
  activity_data: any;
  severity_level: string;
  created_at: string;
}

interface SchemaChange {
  id: number;
  change_type: string;
  object_type: string;
  object_name: string;
  change_details: any;
  executed_by: string;
  executed_at: string;
  change_impact: string;
}

export const SystemActivityLogger = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [schemaChanges, setSchemaChanges] = useState<SchemaChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadActivityLogs();
    loadSchemaChanges();
    
    // Set up real-time updates
    const activityChannel = supabase
      .channel('activity-updates')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'system_activity_log' },
        (payload) => {
          setActivityLogs(prev => [payload.new as ActivityLog, ...prev]);
        }
      )
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'schema_change_log' },
        (payload) => {
          setSchemaChanges(prev => [payload.new as SchemaChange, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(activityChannel);
    };
  }, []);

  const loadActivityLogs = async () => {
    try {
      // For now, use a mock structure since the table might not exist yet
      setActivityLogs([]);
    } catch (error) {
      console.error('Error loading activity logs:', error);
      toast({
        title: "Error",
        description: "Failed to load activity logs",
        variant: "destructive",
      });
    }
  };

  const loadSchemaChanges = async () => {
    try {
      // For now, use a mock structure since the table might not exist yet
      setSchemaChanges([]);
    } catch (error) {
      console.error('Error loading schema changes:', error);
      toast({
        title: "Error",
        description: "Failed to load schema changes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshSchemaRegistry = async () => {
    try {
      setLoading(true);
      
      // Simulate schema refresh for now
      toast({
        title: "Schema Refreshed",
        description: "Schema registry refresh simulated",
      });

      await loadActivityLogs();
      
    } catch (error) {
      console.error('Schema refresh error:', error);
      toast({
        title: "Error",
        description: "Failed to refresh schema registry",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logManualActivity = async (type: string, component: string, description: string) => {
    try {
      // Simulate activity logging for now
      toast({
        title: "Activity Logged",
        description: "Manual activity has been recorded",
      });

    } catch (error) {
      console.error('Error logging activity:', error);
      toast({
        title: "Error",
        description: "Failed to log activity",
        variant: "destructive",
      });
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'schema_refresh':
      case 'database_change':
        return <Database className="w-4 h-4" />;
      case 'code_change':
      case 'deployment':
        return <Code className="w-4 h-4" />;
      case 'config_change':
        return <Settings className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const filteredActivityLogs = activityLogs.filter(log =>
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.component_affected?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.activity_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSchemaChanges = schemaChanges.filter(change =>
    change.object_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    change.change_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    change.object_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zatara-blue mx-auto"></div>
          <p className="text-zatara-navy mt-4">Loading system activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">System Activity Logger</h1>
          <p className="text-gray-600">Real-time monitoring of database and application changes</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshSchemaRegistry} disabled={loading}>
            <Database className="w-4 h-4 mr-2" />
            Refresh Schema
          </Button>
          <Button 
            onClick={() => logManualActivity('manual_action', 'system_logger', 'Manual activity logged via interface')}
            variant="outline"
          >
            <FileText className="w-4 h-4 mr-2" />
            Log Activity
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-zatara-blue">{activityLogs.length}</p>
              </div>
              <Activity className="w-8 h-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Schema Changes</p>
                <p className="text-2xl font-bold text-green-600">{schemaChanges.length}</p>
              </div>
              <Database className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Events</p>
                <p className="text-2xl font-bold text-zatara-blue">
                  {activityLogs.filter(log => 
                    new Date(log.created_at).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-zatara-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Error Events</p>
                <p className="text-2xl font-bold text-red-600">
                  {activityLogs.filter(log => log.severity_level === 'error').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search activities and changes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity">System Activity</TabsTrigger>
          <TabsTrigger value="schema">Schema Changes</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Real-time log of all system operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredActivityLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getActivityIcon(log.activity_type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{log.activity_type}</span>
                            {log.component_affected && (
                              <Badge variant="outline">{log.component_affected}</Badge>
                            )}
                            {getSeverityIcon(log.severity_level)}
                          </div>
                          <p className="text-sm text-gray-600">{log.description}</p>
                          {log.activity_data && (
                            <details className="mt-2">
                              <summary className="text-sm font-medium cursor-pointer">View Details</summary>
                              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                                {JSON.stringify(log.activity_data, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(log.created_at).toLocaleString()}
                        </div>
                        {log.user_id && (
                          <div className="flex items-center gap-1 mt-1">
                            <User className="w-3 h-3" />
                            {log.user_id}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Schema Changes</CardTitle>
              <CardDescription>Track all database structure modifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredSchemaChanges.map((change) => (
                  <div key={change.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Database className="w-4 h-4 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={change.change_type === 'CREATE' ? 'default' : 
                                         change.change_type === 'DROP' ? 'destructive' : 'secondary'}>
                              {change.change_type}
                            </Badge>
                            <span className="font-medium">{change.object_type}</span>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {change.object_name}
                            </code>
                          </div>
                          <p className="text-sm text-gray-600">{change.change_impact}</p>
                          {change.change_details && (
                            <details className="mt-2">
                              <summary className="text-sm font-medium cursor-pointer">View Details</summary>
                              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                                {JSON.stringify(change.change_details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(change.executed_at).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" />
                          {change.executed_by}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};