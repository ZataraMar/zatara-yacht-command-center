
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, Clock, CheckCircle, Phone, Mail, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Communication {
  id: number;
  locator: string;
  client_messaging_status: string;
  whatsapp_message_sent: boolean;
  charter_overview_sent: boolean;
  message_template_used: string;
  custom_message: string;
  sent_at: string;
  created_at: string;
}

interface Charter {
  locator: string;
  guest_first_name: string;
  guest_surname: string;
  guest_phone: string;
  guest_email: string;
  boat: string;
  start_date: string;
  total_guests: number;
  charter_total: number;
}

export const CustomerCommunications = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [upcomingCharters, setUpcomingCharters] = useState<Charter[]>([]);
  const [selectedCharter, setSelectedCharter] = useState<string>('');
  const [messageTemplate, setMessageTemplate] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch communications
      const { data: comms } = await supabase
        .from('customer_communications')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch upcoming charters that need communication
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const { data: charters } = await supabase
        .from('bookings')
        .select('locator, guest_first_name, guest_surname, guest_phone, guest_email, boat, start_date, total_guests, charter_total')
        .gte('start_date', new Date().toISOString().split('T')[0])
        .lte('start_date', nextWeek)
        .order('start_date', { ascending: true });

      setCommunications(comms || []);
      setUpcomingCharters(charters || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const messageTemplates = {
    welcome: {
      name: 'Welcome Message',
      template: `Hello {guest_name}! 

Welcome to Zatara Mar! We're excited to have you aboard {boat} on {date}.

Your charter details:
• Date: {date}
• Guests: {guests}
• Boat: {boat}
• Meeting Point: Port Adriano

We'll send you detailed information closer to your charter date. If you have any questions, please don't hesitate to contact us.

Looking forward to an amazing day on the water!

Best regards,
The Zatara Team`
    },
    reminder: {
      name: '48h Reminder',
      template: `Hi {guest_name},

Your charter with Zatara Mar is in 48 hours! 

Charter Details:
• Date: {date}
• Time: Departure at 10:00 AM
• Boat: {boat}
• Guests: {guests}
• Meeting Point: Port Adriano Marina

What to bring:
• Sunscreen & sunglasses
• Swimwear & towels
• Valid ID/Passport

Weather looks perfect! We can't wait to show you the beautiful coast of Mallorca.

See you soon!
The Zatara Team`
    },
    payment: {
      name: 'Payment Reminder',
      template: `Hello {guest_name},

We hope you're excited about your upcoming charter on {date}!

We still need to receive your final payment of €{outstanding} to complete your booking.

Please make the payment at your earliest convenience to ensure your charter goes ahead as planned.

Payment methods:
• Bank Transfer
• Cash on arrival
• Card payment on arrival

If you have any questions about payment, please contact us immediately.

Thank you!
The Zatara Team`
    }
  };

  const generateMessage = (template: string, charter: Charter) => {
    return template
      .replace(/{guest_name}/g, `${charter.guest_first_name} ${charter.guest_surname}`)
      .replace(/{boat}/g, charter.boat)
      .replace(/{date}/g, new Date(charter.start_date).toLocaleDateString())
      .replace(/{guests}/g, charter.total_guests.toString())
      .replace(/{outstanding}/g, '500'); // This would come from actual outstanding amount
  };

  const sendMessage = async () => {
    if (!selectedCharter || (!messageTemplate && !customMessage)) {
      toast({
        title: "Error",
        description: "Please select a charter and message template or enter a custom message.",
        variant: "destructive"
      });
      return;
    }

    try {
      const charter = upcomingCharters.find(c => c.locator === selectedCharter);
      if (!charter) return;

      const finalMessage = customMessage || 
        (messageTemplate ? generateMessage(messageTemplates[messageTemplate as keyof typeof messageTemplates].template, charter) : '');

      // Save communication record
      const { error } = await supabase
        .from('customer_communications')
        .insert({
          locator: selectedCharter,
          client_messaging_status: 'sent',
          whatsapp_message_sent: true,
          message_template_used: messageTemplate || 'custom',
          custom_message: finalMessage,
          sent_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: `Message sent to ${charter.guest_first_name} ${charter.guest_surname}`,
      });

      // Reset form
      setSelectedCharter('');
      setMessageTemplate('');
      setCustomMessage('');
      
      // Refresh data
      fetchData();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
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
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <MessageCircle className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Customer Communications</h2>
          <p className="text-sm text-zatara-blue">Manage guest communications and messaging</p>
        </div>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Messages</TabsTrigger>
          <TabsTrigger value="history">Communication History</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Customer Message</CardTitle>
              <CardDescription>Send WhatsApp or email messages to upcoming charter guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Charter</label>
                  <Select value={selectedCharter} onValueChange={setSelectedCharter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a charter..." />
                    </SelectTrigger>
                    <SelectContent>
                      {upcomingCharters.map((charter) => (
                        <SelectItem key={charter.locator} value={charter.locator}>
                          {charter.guest_first_name} {charter.guest_surname} - {charter.boat} ({new Date(charter.start_date).toLocaleDateString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Template</label>
                  <Select value={messageTemplate} onValueChange={setMessageTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(messageTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedCharter && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Guest Information</h4>
                  {(() => {
                    const charter = upcomingCharters.find(c => c.locator === selectedCharter);
                    return charter ? (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-blue-600" />
                          <span>{charter.guest_first_name} {charter.guest_surname}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span>{charter.guest_phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span>{new Date(charter.start_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <span>{charter.guest_email}</span>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Message Content</label>
                <Textarea
                  placeholder={messageTemplate ? "Template will be populated here..." : "Enter your custom message..."}
                  value={customMessage || (messageTemplate && selectedCharter ? 
                    generateMessage(messageTemplates[messageTemplate as keyof typeof messageTemplates].template, 
                      upcomingCharters.find(c => c.locator === selectedCharter)!) : '')}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={10}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={sendMessage} className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send WhatsApp Message</span>
                </Button>
                <Button variant="outline" onClick={sendMessage} className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Recent messages sent to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No communications found</p>
                ) : (
                  communications.map((comm) => (
                    <div key={comm.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">Locator: {comm.locator}</span>
                          {getStatusBadge(comm.client_messaging_status)}
                          {comm.whatsapp_message_sent && (
                            <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>WhatsApp</span>
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(comm.sent_at || comm.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Template: {comm.message_template_used}
                      </p>
                      {comm.custom_message && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          {comm.custom_message.substring(0, 150)}...
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(messageTemplates).map(([key, template]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 h-32 overflow-y-auto">
                    {template.template}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={() => setMessageTemplate(key)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
