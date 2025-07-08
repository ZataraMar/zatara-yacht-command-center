import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Database, 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  Activity,
  Calendar,
  DollarSign,
  Users,
  Anchor,
  RefreshCw,
  ExternalLink,
  Upload,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AutomationManagementDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [automationStats, setAutomationStats] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [axiomDatasets, setAxiomDatasets] = useState([]);
  const [businessMetrics, setBusinessMetrics] = useState(null);

  // Sample data (would come from your Edge Functions)
  const sampleAutomationStats = {
    total_workflows: 7,
    active_workflows: 6,
    total_executions: 1247,
    success_rate: '94.2%',
    recent_success_rate_7d: '96.1%',
    avg_execution_time: '3.2s'
  };

  const sampleWorkflows = [
    {
      id: 1,
      workflow_id: 'yacht_inquiry_processing',
      workflow_name: 'Yacht Charter Inquiry Processing',
      category: 'bookings',
      is_active: true,
      execution_count: 342,
      success_count: 325,
      error_count: 17,
      last_execution: '2025-07-08T09:45:00Z',
      trigger_type: 'webhook'
    },
    {
      id: 2,
      workflow_id: 'booking_confirmation_flow',
      workflow_name: 'Booking Confirmation Automation',
      category: 'communications',
      is_active: true,
      execution_count: 156,
      success_count: 152,
      error_count: 4,
      last_execution: '2025-07-08T08:30:00Z',
      trigger_type: 'event'
    },
    {
      id: 3,
      workflow_id: 'payment_reminder_system',
      workflow_name: 'Payment Reminder Automation',
      category: 'finance',
      is_active: true,
      execution_count: 89,
      success_count: 84,
      error_count: 5,
      last_execution: '2025-07-08T07:00:00Z',
      trigger_type: 'scheduled'
    },
    {
      id: 4,
      workflow_id: 'daily_operations_sync',
      workflow_name: 'Daily Operations Sync',
      category: 'operations',
      is_active: true,
      execution_count: 45,
      success_count: 44,
      error_count: 1,
      last_execution: '2025-07-08T06:00:00Z',
      trigger_type: 'scheduled'
    }
  ];

  const sampleExecutions = [
    { id: 1, workflow_name: 'Yacht Charter Inquiry Processing', status: 'success', started_at: '2025-07-08T09:45:00Z', duration_seconds: 2.3 },
    { id: 2, workflow_name: 'Booking Confirmation Automation', status: 'success', started_at: '2025-07-08T08:30:00Z', duration_seconds: 1.8 },
    { id: 3, workflow_name: 'Payment Reminder Automation', status: 'success', started_at: '2025-07-08T07:00:00Z', duration_seconds: 4.1 },
    { id: 4, workflow_name: 'Daily Operations Sync', status: 'error', started_at: '2025-07-08T06:00:00Z', duration_seconds: 0.5 },
    { id: 5, workflow_name: 'Yacht Charter Inquiry Processing', status: 'success', started_at: '2025-07-08T05:22:00Z', duration_seconds: 3.2 }
  ];

  const sampleAxiomDatasets = [
    { 
      dataset_name: 'zatara_bookings', 
      total_events: 12847, 
      last_ingest: '2025-07-08T09:30:00Z',
      retention_days: 90,
      is_active: true
    },
    { 
      dataset_name: 'zatara_operations', 
      total_events: 5683, 
      last_ingest: '2025-07-08T08:15:00Z',
      retention_days: 30,
      is_active: true
    },
    { 
      dataset_name: 'zatara_finances', 
      total_events: 8934, 
      last_ingest: '2025-07-08T07:45:00Z',
      retention_days: 365,
      is_active: true
    },
    { 
      dataset_name: 'zatara_customer_interactions', 
      total_events: 3421, 
      last_ingest: '2025-07-08T09:00:00Z',
      retention_days: 90,
      is_active: true
    }
  ];

  const sampleBusinessMetrics = {
    revenue_30d: '€18,450',
    bookings_30d: 23,
    upcoming_bookings: 33,
    outstanding_payments: '€24,133',
    avg_booking_value: '€1,847'
  };

  useEffect(() => {
    // Initialize with sample data
    setAutomationStats(sampleAutomationStats);
    setWorkflows(sampleWorkflows);
    setExecutions(sampleExecutions);
    setAxiomDatasets(sampleAxiomDatasets);
    setBusinessMetrics(sampleBusinessMetrics);
  }, []);

  const triggerWorkflow = async (workflowId, triggerData = {}) => {
    setIsLoading(true);
    try {
      // TODO: Call your Edge Function: automation-management/trigger-workflow
      console.log(`Triggering workflow: ${workflowId}`, triggerData);
      
      // Add new execution to the list
      const newExecution = {
        id: executions.length + 1,
        workflow_name: workflows.find(w => w.workflow_id === workflowId)?.workflow_name || 'Unknown',
        status: 'running',
        started_at: new Date().toISOString(),
        duration_seconds: null
      };
      
      setExecutions(prev => [newExecution, ...prev]);
      
      // Simulate completion after 2 seconds
      setTimeout(() => {
        setExecutions(prev => prev.map(exec => 
          exec.id === newExecution.id 
            ? { ...exec, status: 'success', duration_seconds: Math.random() * 5 + 1 }
            : exec
        ));
      }, 2000);
      
    } catch (error) {
      console.error('Error triggering workflow:', error);
    }
    setIsLoading(false);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'bookings': return Calendar;
      case 'communications': return Users;
      case 'finance': return DollarSign;
      case 'operations': return Anchor;
      default: return Zap;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'bookings': return 'bg-green-500';
      case 'communications': return 'bg-blue-500';
      case 'finance': return 'bg-yellow-500';
      case 'operations': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'running': return RefreshCw;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automation Management</h1>
          <p className="text-gray-600">Monitor and control N8N workflows and Axiom analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-gray-900">
                  {automationStats?.active_workflows || 0}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate (7d)</p>
                <p className="text-2xl font-bold text-green-600">
                  {automationStats?.recent_success_rate_7d || '0%'}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Execution Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {automationStats?.avg_execution_time || '0s'}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Executions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {automationStats?.total_executions || 0}
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflows">N8N Workflows</TabsTrigger>
          <TabsTrigger value="executions">Execution History</TabsTrigger>
          <TabsTrigger value="axiom">Axiom Analytics</TabsTrigger>
          <TabsTrigger value="metrics">Business Metrics</TabsTrigger>
        </TabsList>

        {/* N8N Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Active Workflows
                </div>
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open N8N
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => {
                  const CategoryIcon = getCategoryIcon(workflow.category);
                  const successRate = workflow.execution_count > 0 
                    ? (workflow.success_count / workflow.execution_count * 100).toFixed(1)
                    : 0;
                  
                  return (
                    <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getCategoryColor(workflow.category)}`}>
                          <CategoryIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{workflow.workflow_name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="capitalize">{workflow.category}</span>
                            <span>•</span>
                            <span>{workflow.execution_count} executions</span>
                            <span>•</span>
                            <span>{successRate}% success rate</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={workflow.trigger_type === 'scheduled' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {workflow.trigger_type}
                        </Badge>
                        
                        <Badge 
                          variant={workflow.is_active ? 'default' : 'destructive'}
                        >
                          {workflow.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        
                        <Button
                          size="sm"
                          onClick={() => triggerWorkflow(workflow.workflow_id)}
                          disabled={!workflow.is_active || isLoading}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Trigger
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Execution History Tab */}
        <TabsContent value="executions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Executions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {executions.map((execution) => {
                  const StatusIcon = getStatusIcon(execution.status);
                  
                  return (
                    <div key={execution.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(execution.status)} ${execution.status === 'running' ? 'animate-spin' : ''}`} />
                        <div>
                          <p className="font-medium">{execution.workflow_name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(execution.started_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {execution.duration_seconds && (
                          <span className="text-sm text-gray-500">
                            {execution.duration_seconds.toFixed(1)}s
                          </span>
                        )}
                        <Badge 
                          variant={execution.status === 'success' ? 'default' : execution.status === 'error' ? 'destructive' : 'secondary'}
                          className="capitalize"
                        >
                          {execution.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Axiom Analytics Tab */}
        <TabsContent value="axiom" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Dataset Overview
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Axiom
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {axiomDatasets.map((dataset, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{dataset.dataset_name}</h3>
                        <p className="text-sm text-gray-500">
                          {dataset.total_events.toLocaleString()} events • {dataset.retention_days} days retention
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={dataset.is_active ? 'default' : 'secondary'}>
                          {dataset.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Query
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Ingestion Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      Axiom integration ready. Configure your API token to start ingesting data.
                    </p>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Axiom
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue (30d)</p>
                    <p className="text-2xl font-bold text-green-600">
                      {businessMetrics?.revenue_30d || '€0'}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bookings (30d)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {businessMetrics?.bookings_30d || 0}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Outstanding</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {businessMetrics?.outstanding_payments || '€0'}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Automation Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Time Savings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Booking Confirmations</span>
                      <span className="text-sm font-medium">4.2 hrs/week</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Payment Reminders</span>
                      <span className="text-sm font-medium">2.8 hrs/week</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Reporting</span>
                      <span className="text-sm font-medium">1.5 hrs/week</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Process Efficiency</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium text-green-600">-68%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Manual Errors</span>
                      <span className="text-sm font-medium text-green-600">-82%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Satisfaction</span>
                      <span className="text-sm font-medium text-green-600">+24%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue per Hour</span>
                      <span className="text-sm font-medium text-green-600">+15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationManagementDashboard;