
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { WhatsAppGenerator } from './WhatsAppGenerator';
import { useEnhancedBusinessViews } from '@/hooks/useEnhancedBusinessViews';
import { formatDate } from '@/utils/formatters';

export const CustomerCommunications = () => {
  const [selectedCharter, setSelectedCharter] = useState<any>(null);
  
  const {
    data: charters,
    loading
  } = useEnhancedBusinessViews({
    timeFilter: '7',
    boatFilter: 'all',
    statusFilter: 'booked_prebooked',
    viewMode: 'operations'
  });

  // Filter charters that need communication
  const pendingCommunications = charters.filter(charter => 
    !charter.cleared_for_departure || charter.outstanding_amount > 0
  );

  const getCommunicationPriority = (charter: any) => {
    const daysUntilCharter = Math.ceil(
      (new Date(charter.charter_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilCharter <= 1) return 'urgent';
    if (daysUntilCharter <= 3) return 'high';
    return 'normal';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const CommunicationCard = ({ charter }: { charter: any }) => {
    const priority = getCommunicationPriority(charter);
    const daysUntil = Math.ceil(
      (new Date(charter.charter_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          selectedCharter?.locator === charter.locator ? 'ring-2 ring-zatara-blue' : ''
        }`}
        onClick={() => setSelectedCharter(charter)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{charter.guest_name}</CardTitle>
            <Badge className={getPriorityColor(priority)}>
              {priority.toUpperCase()}
            </Badge>
          </div>
          <CardDescription>
            {charter.boat} • {formatDate(charter.charter_date)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Days until charter:</span>
              <span className="font-medium">{daysUntil} days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Outstanding amount:</span>
              <span className="font-medium">€{charter.outstanding_amount || 0}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              {charter.pre_departure_checks ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-500" />
              )}
              <span>Pre-departure checks</span>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button size="sm" variant="outline" className="flex-1">
              <MessageCircle className="h-3 w-3 mr-1" />
              WhatsApp
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CommunicationQueue = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Communication Queue</h3>
        <Badge variant="outline">{pendingCommunications.length} pending</Badge>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
        </div>
      ) : pendingCommunications.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">All communications up to date!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingCommunications.map((charter) => (
            <CommunicationCard key={charter.locator} charter={charter} />
          ))}
        </div>
      )}
    </div>
  );

  const CommunicationTemplates = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Booking Confirmations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Send confirmation messages for new bookings</p>
            <Button size="sm" className="w-full">
              <Mail className="h-3 w-3 mr-2" />
              Send Confirmations
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Remind clients about outstanding payments</p>
            <Button size="sm" variant="outline" className="w-full">
              <Clock className="h-3 w-3 mr-2" />
              Send Reminders
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pre-departure Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Send charter details and meeting points</p>
            <Button size="sm" variant="outline" className="w-full">
              <MessageCircle className="h-3 w-3 mr-2" />
              Send Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Customer Communications</h1>
          <p className="text-zatara-blue">Manage all customer interactions and messaging</p>
        </div>
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queue">Communication Queue</TabsTrigger>
          <TabsTrigger value="templates">Templates & Actions</TabsTrigger>
          <TabsTrigger value="generator">Message Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <CommunicationQueue />
        </TabsContent>

        <TabsContent value="templates">
          <CommunicationTemplates />
        </TabsContent>

        <TabsContent value="generator">
          {selectedCharter ? (
            <WhatsAppGenerator charter={selectedCharter} />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a charter from the queue to generate messages</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
