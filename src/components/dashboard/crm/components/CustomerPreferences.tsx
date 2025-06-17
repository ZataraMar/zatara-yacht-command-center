
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Anchor, Clock, MapPin, Users } from 'lucide-react';

interface Customer {
  preferred_boat?: string;
  preferred_time_slot?: string;
  communication_preference?: string;
  nationality?: string;
  special_requirements?: string[];
  dietary_restrictions?: string[];
  total_guests?: number;
}

interface CustomerPreferencesProps {
  customer: Customer;
}

export const CustomerPreferences = ({ customer }: CustomerPreferencesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-zatara-blue" />
          <span>Customer Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Anchor className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Preferred Boat</span>
            </div>
            <p className="text-sm text-gray-600">
              {customer.preferred_boat || 'No preference'}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Preferred Time</span>
            </div>
            <p className="text-sm text-gray-600">
              {customer.preferred_time_slot || 'No preference'}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Nationality</span>
            </div>
            <p className="text-sm text-gray-600">
              {customer.nationality || 'Not specified'}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Communication</span>
            </div>
            <p className="text-sm text-gray-600">
              {customer.communication_preference || 'Not specified'}
            </p>
          </div>
        </div>

        {customer.special_requirements && customer.special_requirements.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Special Requirements</p>
            <div className="flex flex-wrap gap-1">
              {customer.special_requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {customer.dietary_restrictions && customer.dietary_restrictions.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Dietary Restrictions</p>
            <div className="flex flex-wrap gap-1">
              {customer.dietary_restrictions.map((restriction, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
