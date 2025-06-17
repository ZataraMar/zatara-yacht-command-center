
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerProfileView } from './crm/CustomerProfileView';
import { TaskManagementCenter } from './automation/TaskManagementCenter';
import { SystemHealthMonitor } from './admin/SystemHealthMonitor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  CheckCircle2, 
  Activity, 
  BarChart3,
  Calendar,
  Database
} from 'lucide-react';

export const Phase2Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Phase 2 Advanced Management</h1>
          <p className="text-zatara-blue">CRM, Automation, and System Intelligence</p>
        </div>
      </div>

      {/* Phase 2 Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CRM System</p>
                <p className="text-2xl font-bold text-zatara-navy">Active</p>
                <p className="text-xs text-green-600">Customer 360° profiles</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Task Automation</p>
                <p className="text-2xl font-bold text-zatara-navy">Live</p>
                <p className="text-xs text-green-600">Workflow management</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-zatara-navy">Optimal</p>
                <p className="text-xs text-green-600">Real-time monitoring</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="crm" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="crm">CRM Dashboard</TabsTrigger>
          <TabsTrigger value="tasks">Task Center</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="crm" className="space-y-6">
          {/* Demo customer profile - in production this would be dynamic */}
          <CustomerProfileView customerId={1} />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <TaskManagementCenter />
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <SystemHealthMonitor />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Advanced Analytics</span>
              </CardTitle>
              <CardDescription>
                Predictive analytics and business intelligence dashboards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Available Analytics Views</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Customer 360° View - Complete customer profiles</li>
                    <li>• Boat Performance Dashboard - Utilization metrics</li>
                    <li>• Crew Efficiency Metrics - Performance tracking</li>
                    <li>• Financial Overview Extended - Advanced P&L</li>
                    <li>• Predictive Analytics - Forecasting models</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Business Functions</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Customer Lifetime Value calculation</li>
                    <li>• Booking conflict detection</li>
                    <li>• Optimal crew assignment</li>
                    <li>• Seasonal forecasting</li>
                    <li>• Performance reporting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Calendar & Scheduling</span>
              </CardTitle>
              <CardDescription>
                Advanced calendar management and scheduling system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Calendar integration dashboard will be implemented here</p>
                <div className="mt-4 text-sm space-y-1">
                  <p>• Boat availability management</p>
                  <p>• Crew scheduling optimization</p>
                  <p>• Automated conflict detection</p>
                  <p>• External calendar sync</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Automation Center</span>
              </CardTitle>
              <CardDescription>
                Workflow automation and trigger management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Active Automations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Booking confirmation → Task creation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Customer updates → History tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">New booking → Conflict detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Data changes → Audit logging</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">System Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Real-time data sync</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Automated notifications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Performance monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Data integrity checks</span>
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
