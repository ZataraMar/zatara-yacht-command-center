
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Mail, Calendar, Star } from 'lucide-react';

interface Customer {
  id?: number;
  first_name?: string;
  last_name?: string;
  phone_primary?: string;
  email_primary?: string;
}

interface CustomerActionsProps {
  customer: Customer;
}

export const CustomerActions = ({ customer }: CustomerActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-zatara-blue" />
          <span>Customer Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Phone className="h-4 w-4 mr-2" />
          Call Customer
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          WhatsApp Message
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Follow-up
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Star className="h-4 w-4 mr-2" />
          Add to VIP
        </Button>
      </CardContent>
    </Card>
  );
};
