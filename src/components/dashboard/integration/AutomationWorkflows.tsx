
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Mail, 
  Bell,
  Workflow,
  Play,
  Pause,
  Settings,
  Plus
} from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'inactive';
  last_run: string;
  success_rate: number;
}

export const AutomationWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'New Booking Welcome Sequence',
      description: 'Automatically send welcome message and charter details when a new booking is confirmed',
      trigger: 'Booking Confirmed',
      actions: ['Send WhatsApp welcome', 'Email charter details', 'Add to calendar'],
      status: 'active',
      last_run: '2024-06-15T14:30:00Z',
      success_rate: 98.5
    },
    {
      id: '2',
      name: 'Payment Reminder Automation',
      description: 'Send automatic payment reminders for outstanding balances 24h before charter',
      trigger: 'Outstanding Payment + 24h to Charter',
      actions: ['Send payment reminder', 'Update booking status', 'Notify operations'],
      status: 'active',
      last_run: '2024-06-15T09:00:00Z',
      success_rate: 92.3
    },
    {
      id: '3',
      name: 'Pre-Departure Checklist',
      description: 'Automatically create and assign pre-departure tasks to crew 2 hours before charter',
      trigger: '2 Hours Before Charter',
      actions: ['Create checklist', 'Assign to skipper', 'Send prep notification'],
      status: 'active',
      last_run: '2024-06-15T12:00:00Z',
      success_rate: 100
    },
    {
      id: '4',
      name: 'Post-Charter Follow-up',
      description: 'Send feedback request and photos 24 hours after charter completion',
      trigger: '24h After Charter End',
      actions: ['Send feedback form', 'Request review', 'Share charter photos'],
      status: 'inactive',
      last_run: '2024-06-14T16:00:00Z',
      success_rate: 87.1
    }
  ]);

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id 
          ? { ...workflow, status: workflow.status === 'active' ? 'inactive' : 'active' }
          : workflow
      )
    );
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-500';
  };

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes('Booking')) return <Calendar className="h-4 w-4" />;
    if (trigger.includes('Payment')) return <DollarSign className="h-4 w-4" />;
    if (trigger.includes('Charter')) return <Calendar className="h-4 w-4" />;
    return <Zap className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Integration & Automation</h2>
          <p className="text-zatara-blue">Automated workflows and system integrations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Automation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
              <Workflow className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold text-zatara-navy">1,247</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-zatara-navy">94.5%</p>
                <p className="text-xs text-green-600">Average</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-zatara-navy">24h</p>
                <p className="text-xs text-green-600">This week</p>
              </div>
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-zatara-blue/10 rounded">
                        {getTriggerIcon(workflow.trigger)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{workflow.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {workflow.description}
                        </CardDescription>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Trigger: {workflow.trigger}
                          </Badge>
                          <Badge className={`${getStatusColor(workflow.status)} text-white text-xs`}>
                            {workflow.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={workflow.status === 'active'}
                        onCheckedChange={() => toggleWorkflow(workflow.id)}
                      />
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Workflow Actions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Last Run</p>
                        <p className="font-medium">
                          {new Date(workflow.last_run).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Success Rate</p>
                        <p className="font-medium text-green-600">{workflow.success_rate}%</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          Test
                        </Button>
                        <Button size="sm" variant="outline">
                          View Logs
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business Integration</CardTitle>
              <CardDescription>Automated WhatsApp messaging for guest communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">WhatsApp Business API</h4>
                      <p className="text-sm text-gray-600">Connected and operational</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">Connected</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-2xl font-bold text-zatara-navy">1,247</h4>
                    <p className="text-sm text-gray-600">Messages Sent</p>
                    <p className="text-xs text-green-600">This month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-2xl font-bold text-zatara-navy">96.2%</h4>
                    <p className="text-sm text-gray-600">Delivery Rate</p>
                    <p className="text-xs text-green-600">Above average</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-2xl font-bold text-zatara-navy">78%</h4>
                    <p className="text-sm text-gray-600">Response Rate</p>
                    <p className="text-xs text-blue-600">Within 1 hour</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Message Templates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">Booking Confirmation</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">Pre-Charter Reminder</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">Payment Reminder</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">Post-Charter Thank You</span>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Andronautic Integration</CardTitle>
                <CardDescription>Real-time booking data synchronization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Connection Status</span>
                    <Badge className="bg-green-500 text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Sync</span>
                    <span className="text-sm">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sync Frequency</span>
                    <span className="text-sm">Every 5 minutes</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Configure Integration
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Integration</CardTitle>
                <CardDescription>Automated email communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>SMTP Status</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Daily Limit</span>
                    <span className="text-sm">500 emails</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sent Today</span>
                    <span className="text-sm">127 emails</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Configure SMTP
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>Sync charters with calendar systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-500 py-4">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Calendar integration available</p>
                    <Button className="mt-2" variant="outline">
                      Connect Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Processing</CardTitle>
                <CardDescription>Automated payment and invoice handling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-500 py-4">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Payment gateway integration</p>
                    <Button className="mt-2" variant="outline">
                      Configure Payments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-built templates for automated communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Message template editor will be integrated here</p>
                  <p className="text-sm">Create and manage automated message templates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
