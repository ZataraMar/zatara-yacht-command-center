
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Mail, Calendar, Send, Users } from 'lucide-react';

export const CommunicationCenter = () => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Communication Center</h2>
          <p className="text-zatara-blue">Manage customer communications and campaigns</p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send WhatsApp Message
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Email Campaign
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Schedule Follow-up Call
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Create Reminder
            </Button>
          </CardContent>
        </Card>

        {/* Message Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Message Templates</CardTitle>
            <CardDescription>Pre-built templates for common communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Booking Confirmation</h4>
                <Badge>WhatsApp</Badge>
              </div>
              <p className="text-sm text-gray-600">Thank you for booking with Zatara...</p>
              <Button size="sm" className="mt-2">Use Template</Button>
            </div>
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Follow-up After Charter</h4>
                <Badge>Email</Badge>
              </div>
              <p className="text-sm text-gray-600">We hope you enjoyed your charter...</p>
              <Button size="sm" className="mt-2">Use Template</Button>
            </div>
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Special Offer</h4>
                <Badge>Campaign</Badge>
              </div>
              <p className="text-sm text-gray-600">Exclusive offer for valued customers...</p>
              <Button size="sm" className="mt-2">Use Template</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Communications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Communications</CardTitle>
            <CardDescription>Latest customer interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-green-500 pl-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">John Smith</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600">WhatsApp: Booking confirmed</p>
              <Badge variant="outline" className="mt-1">Sent</Badge>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Maria Garcia</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <p className="text-sm text-gray-600">Email: Follow-up survey</p>
              <Badge variant="outline" className="mt-1">Delivered</Badge>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">VIP Customers</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
              <p className="text-sm text-gray-600">Campaign: Summer specials</p>
              <Badge variant="outline" className="mt-1">Scheduled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Message Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send New Message</CardTitle>
          <CardDescription>Create and send a new communication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Message Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Recipient Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Customer</SelectItem>
                <SelectItem value="segment">Customer Segment</SelectItem>
                <SelectItem value="all">All Customers</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Template</SelectItem>
                <SelectItem value="booking">Booking Confirmation</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="offer">Special Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Input placeholder="Subject (for email)" />
          
          <Textarea 
            placeholder="Message content..."
            rows={6}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline">Save as Template</Button>
              <Button variant="outline">Schedule</Button>
            </div>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold text-zatara-navy">247</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Rate</p>
                <p className="text-2xl font-bold text-zatara-navy">78%</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-zatara-navy">34%</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-zatara-navy">3</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
