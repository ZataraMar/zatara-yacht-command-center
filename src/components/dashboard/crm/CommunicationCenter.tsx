
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Mail, Phone, Send, Users, Calendar } from 'lucide-react';

export const CommunicationCenter = () => {
  const [activeTemplate, setActiveTemplate] = useState('whatsapp');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Communication Center</h2>
          <p className="text-zatara-blue">Manage customer communications and campaigns</p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Send Campaign
        </Button>
      </div>

      <Tabs value={activeTemplate} onValueChange={setActiveTemplate} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Bulk Messages</span>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Scheduled</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Templates</CardTitle>
              <CardDescription>Pre-configured WhatsApp message templates for different boats and scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Zatara Premium Template</h4>
                    <p className="text-sm text-gray-600 mb-3">Luxury charter confirmation with captain details</p>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">PuraVida Standard Template</h4>
                    <p className="text-sm text-gray-600 mb-3">Standard charter with meeting point information</p>
                    <Button size="sm" variant="outline">Use Template</Button>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Manage email communications and automated sequences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">Email campaign management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Messaging</CardTitle>
              <CardDescription>Send messages to multiple customers at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">Bulk messaging tools coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Messages</CardTitle>
              <CardDescription>View and manage scheduled communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">No scheduled messages</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
