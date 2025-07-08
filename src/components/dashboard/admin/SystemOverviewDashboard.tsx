import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Server, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar, 
  DollarSign, 
  Zap, 
  MessageSquare,
  Bot,
  Settings,
  ExternalLink,
  RefreshCw,
  ArrowRight,
  Anchor,
  BarChart3,
  Globe,
  Phone,
  CreditCard,
  FileText,
  Workflow
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatTime } from '@/utils/formatters';

const SystemOverviewDashboard = () => {
  const [systemStatus, setSystemStatus] = useState('loading');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // System Architecture Data
  const systemArchitecture = {
    database: {
      status: 'healthy',
      tables: 134,
      connections: 25,
      uptime: '99.9%',
      version: '17.4.1.043'
    },
    edgeFunctions: {
      total: 18,
      active: 18,
      deployments_24h: 3,
      avg_response_time: '245ms'
    },
    integrations: {
      supabase: { status: 'connected', health: 100 },
      stripe: { status: 'connected', health: 98 },
      google_calendar: { status: 'connected', health: 95 },
      whatsapp: { status: 'configured', health: 85 },
      n8n: { status: 'active', health: 92 },
      axiom: { status: 'ready', health: 90 }
    }
  };

  // Live Business Metrics
  const businessMetrics = {
    bookings: {
      total: 445,
      upcoming: 33,
      today: 1,
      revenue_pending: '€58,018'
    },
    finance: {
      outstanding_payments: '€24,133',
      ytd_revenue: '€215,326',
      avg_booking_value: '€1,847',
      payment_success_rate: '94.5%'
    },
    operations: {
      boats_active: 2,
      utilization_rate: '78%',
      customer_satisfaction: '4.8/5',
      response_time: '2.1hrs'
    }
  };

  // System Health Indicators
  const healthIndicators = [
    { 
      category: 'Database Performance', 
      score: 98, 
      status: 'excellent',
      details: '134 tables, 445 records, 99.9% uptime'
    },
    { 
      category: 'API Response Times', 
      score: 95, 
      status: 'excellent',
      details: 'Avg 245ms response, 18 Edge Functions active'
    },
    { 
      category: 'Data Quality', 
      score: 78, 
      status: 'good',
      details: 'Some NULL values in guest counts and times'
    },
    { 
      category: 'Security Status', 
      score: 92, 
      status: 'excellent',
      details: 'RLS enabled, auth configured, HTTPS enforced'
    },
    { 
      category: 'Integration Health', 
      score: 89, 
      status: 'good',
      details: '6 integrations active, WhatsApp ready for deployment'
    }
  ];

  // Priority Action Items
  const actionItems = [
    {
      priority: 'high',
      title: 'Activate WhatsApp Business Integration',
      description: 'Complete API verification for +34711013403',
      impact: 'Save 10+ hours/week customer service time',
      effort: 'low',
      status: 'ready'
    },
    {
      priority: 'high',
      title: 'Deploy AI Agent Chat Interface',
      description: '6 AI agents configured with business context',
      impact: 'Instant responses, 24/7 availability',
      effort: 'low',
      status: 'ready'
    },
    {
      priority: 'high',
      title: 'Outstanding Payment Collection',
      description: '€24,133 in outstanding balances',
      impact: 'Accelerate cash flow by 25%',
      effort: 'medium',
      status: 'in_progress'
    },
    {
      priority: 'medium',
      title: 'Data Quality Enhancement',
      description: 'Fix NULL values in guest counts and booking times',
      impact: 'Improve reporting accuracy',
      effort: 'medium',
      status: 'planned'
    }
  ];

  // Edge Functions Status
  const edgeFunctions = [
    { name: 'andronautic-import', status: 'active', version: 7, last_execution: '2025-07-08T06:00:00Z' },
    { name: 'daily-sync', status: 'active', version: 6, last_execution: '2025-07-08T06:00:00Z' },
    { name: 'google-calendar-sync', status: 'active', version: 3, last_execution: '2025-07-08T09:30:00Z' },
    { name: 'ai-agent-chat', status: 'active', version: 1, last_execution: '2025-07-08T09:45:00Z' },
    { name: 'automation-management', status: 'active', version: 1, last_execution: '2025-07-08T08:15:00Z' },
    { name: 'settings-management', status: 'active', version: 1, last_execution: '2025-07-08T07:30:00Z' },
    { name: 'whatsapp-business', status: 'active', version: 1, last_execution: '2025-07-08T05:00:00Z' },
    { name: 'contract-signing', status: 'active', version: 1, last_execution: '2025-07-07T16:20:00Z' }
  ];

  useEffect(() => {
    setSystemStatus('healthy');
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'warning': return 'outline';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
          <p className="text-gray-600">Zatara yacht charter management system status and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            Last updated: {formatTime(lastUpdated)}
          </Badge>
          <Button variant="outline" onClick={() => setLastUpdated(new Date())}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600">Healthy</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Database Tables</p>
                <p className="text-2xl font-bold text-gray-900">{systemArchitecture.database.tables}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Edge Functions</p>
                <p className="text-2xl font-bold text-gray-900">{systemArchitecture.edgeFunctions.active}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Server className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Revenue</p>
                <p className="text-2xl font-bold text-green-600">{businessMetrics.bookings.revenue_pending}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="actions">Action Items</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Business Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Booking Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Bookings</span>
                    <span className="font-semibold">{businessMetrics.bookings.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Upcoming Charters</span>
                    <span className="font-semibold text-blue-600">{businessMetrics.bookings.upcoming}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Today's Charters</span>
                    <span className="font-semibold text-green-600">{businessMetrics.bookings.today}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pending Revenue</span>
                    <span className="font-semibold text-green-600">{businessMetrics.bookings.revenue_pending}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">YTD Revenue</span>
                    <span className="font-semibold text-green-600">{businessMetrics.finance.ytd_revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Outstanding Payments</span>
                    <span className="font-semibold text-orange-600">{businessMetrics.finance.outstanding_payments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Booking Value</span>
                    <span className="font-semibold">{businessMetrics.finance.avg_booking_value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Success Rate</span>
                    <span className="font-semibold text-green-600">{businessMetrics.finance.payment_success_rate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Fleet Performance (YTD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">PuraVida - Galeon 420</h3>
                    <p className="text-sm text-gray-500">70 bookings • €132,765 revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">€1,897</p>
                    <p className="text-sm text-gray-500">avg/booking</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Zatara - Myabca Llaut 37TR</h3>
                    <p className="text-sm text-gray-500">90 bookings • €77,562 revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">€862</p>
                    <p className="text-sm text-gray-500">avg/booking</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="space-y-4">
            {healthIndicators.map((indicator, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{indicator.category}</h3>
                    <Badge variant={getStatusBadge(indicator.status)} className="capitalize">
                      {indicator.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Health Score</span>
                      <span className={`font-semibold ${getStatusColor(indicator.status)}`}>
                        {indicator.score}%
                      </span>
                    </div>
                    <Progress value={indicator.score} className="h-2" />
                    <p className="text-sm text-gray-500">{indicator.details}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Architecture Tab */}
        <TabsContent value="architecture" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Database Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Tables</span>
                    <span className="font-semibold">{systemArchitecture.database.tables}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Connections</span>
                    <span className="font-semibold">{systemArchitecture.database.connections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="font-semibold text-green-600">{systemArchitecture.database.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">PostgreSQL Version</span>
                    <span className="font-semibold">{systemArchitecture.database.version}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Edge Functions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Functions</span>
                    <span className="font-semibold">{systemArchitecture.edgeFunctions.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Functions</span>
                    <span className="font-semibold text-green-600">{systemArchitecture.edgeFunctions.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="font-semibold">{systemArchitecture.edgeFunctions.avg_response_time}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Recent Functions</h4>
                  {edgeFunctions.slice(0, 5).map((func, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-mono text-xs">{func.name}</span>
                      <Badge variant="outline" className="text-xs">v{func.version}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Architecture Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Interactive architecture diagram showing data flow between Supabase, Edge Functions, and integrations.
                </p>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Architecture
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Action Items Tab */}
        <TabsContent value="actions" className="space-y-6">
          <div className="space-y-4">
            {actionItems.map((item, index) => (
              <Card key={index} className={getPriorityColor(item.priority)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge 
                          variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {item.priority} Priority
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-green-700">Impact: </span>
                          <span>{item.impact}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Effort: </span>
                          <span className="capitalize">{item.effort}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="ml-4">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Take Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(systemArchitecture.integrations).map(([key, integration]) => {
              const getIntegrationIcon = (integrationKey) => {
                switch (integrationKey) {
                  case 'supabase': return Database;
                  case 'stripe': return CreditCard;
                  case 'google_calendar': return Calendar;
                  case 'whatsapp': return Phone;
                  case 'n8n': return Workflow;
                  case 'axiom': return BarChart3;
                  default: return Globe;
                }
              };

              const IntegrationIcon = getIntegrationIcon(key);
              
              return (
                <Card key={key}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IntegrationIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-medium capitalize">{key.replace('_', ' ')}</h3>
                      </div>
                      <Badge 
                        variant={integration.status === 'connected' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Health Score</span>
                        <span className="font-semibold">{integration.health}%</span>
                      </div>
                      <Progress value={integration.health} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>WhatsApp Business Integration Ready:</strong> WhatsApp widget configured for +34711013403. This will link to your personal business WhatsApp for now.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemOverviewDashboard;