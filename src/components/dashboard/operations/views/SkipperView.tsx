
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Anchor, Clock, Users, Phone, AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { SkipperViewRow } from '../types/businessViewTypes';

interface SkipperViewProps {
  data: SkipperViewRow[];
  boatName: string;
  boatColor: string;
  getStatusColor: (status: string) => string;
  onCharterSelect?: (charter: any) => void;
}

export const SkipperView: React.FC<SkipperViewProps> = ({ 
  data, 
  boatName, 
  boatColor, 
  getStatusColor,
  onCharterSelect
}) => {
  const handleCharterClick = (charter: SkipperViewRow) => {
    if (onCharterSelect) {
      // Transform to expected format for tools
      const transformedCharter = {
        locator: charter.locator,
        guest_name: charter.guest_full_name,
        boat: boatName,
        charter_date: charter.charter_date,
        start_time: charter.start_time,
        total_guests: charter.total_guests,
        charter_total: 1500 // Default since not in skipper view
      };
      onCharterSelect(transformedCharter);
    }
  };

  return (
    <div className="grid gap-4">
      {data.map((charter) => (
        <Card 
          key={charter.locator} 
          className={`border-l-4 border-${boatColor}-500 transition-all duration-200 ${
            onCharterSelect ? 'cursor-pointer hover:shadow-lg hover:bg-gray-50' : ''
          }`}
          onClick={() => handleCharterClick(charter)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Anchor className={`h-5 w-5 text-${boatColor}-600`} />
                <span>{boatName} - {charter.locator}</span>
                <Badge className={getStatusColor(charter.booking_status)}>
                  {charter.booking_status}
                </Badge>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {charter.pre_departure_checks ? 
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                }
                {charter.cleared_for_departure ? 
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                  <AlertCircle className="h-5 w-5 text-red-500" />
                }
                {onCharterSelect && (
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Tools
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>
              {charter.guest_full_name} • {new Date(charter.charter_date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>{charter.start_time} - {charter.end_time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3" />
                <span>{charter.total_guests} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3" />
                <span>{charter.guest_phone}</span>
              </div>
            </div>
            {charter.fnb_details && (
              <div className={`bg-${boatColor}-50 p-2 rounded text-sm`}>
                <strong>F&B:</strong> {charter.fnb_details}
              </div>
            )}
            {charter.charter_notes && (
              <div className="bg-gray-50 p-2 rounded text-sm">
                <strong>Notes:</strong> {charter.charter_notes}
              </div>
            )}
            {charter.gps_coordinates && (
              <div className="text-xs text-gray-600">
                GPS: {charter.gps_coordinates}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
