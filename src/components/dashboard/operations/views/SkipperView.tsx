
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Anchor, Clock, Users, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SkipperViewRow {
  locator: string;
  charter_date: string;
  guest_full_name: string;
  guest_phone: string;
  start_time: string;
  end_time: string;
  total_guests: number;
  booking_status: string;
  charter_notes: string;
  fnb_details: string;
  equipment_required: string;
  pre_departure_checks: boolean;
  cleared_for_departure: boolean;
  gps_coordinates: string;
}

interface SkipperViewProps {
  data: SkipperViewRow[];
  boatName: string;
  boatColor: string;
  getStatusColor: (status: string) => string;
}

export const SkipperView: React.FC<SkipperViewProps> = ({ 
  data, 
  boatName, 
  boatColor, 
  getStatusColor 
}) => {
  return (
    <div className="grid gap-4">
      {data.map((charter) => (
        <Card key={charter.locator} className={`border-l-4 border-${boatColor}-500`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Anchor className={`h-5 w-5 text-${boatColor}-600`} />
                <span>{boatName} - {charter.locator}</span>
                <Badge className={getStatusColor(charter.booking_status)}>
                  {charter.booking_status}
                </Badge>
              </CardTitle>
              <div className="flex space-x-2">
                {charter.pre_departure_checks ? 
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                }
                {charter.cleared_for_departure ? 
                  <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                  <AlertCircle className="h-5 w-5 text-red-500" />
                }
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
