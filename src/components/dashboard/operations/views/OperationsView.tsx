
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Anchor, Clock, MapPin, MessageCircle } from 'lucide-react';
import { BusinessViewRow } from '../types/businessViewTypes';

interface OperationsViewProps {
  data: BusinessViewRow[];
  getStatusColor: (status: string) => string;
  onCharterSelect?: (charter: any) => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({ data, getStatusColor, onCharterSelect }) => {
  const handleCharterClick = (charter: BusinessViewRow) => {
    if (onCharterSelect) {
      // Transform to expected format for tools
      const transformedCharter = {
        locator: charter.locator,
        guest_name: charter.guest_name,
        boat: charter.boat,
        charter_date: charter.charter_date,
        start_time: charter.start_time,
        total_guests: charter.total_guests,
        charter_total: charter.charter_total
      };
      onCharterSelect(transformedCharter);
    }
  };

  return (
    <div className="grid gap-4">
      {data.map((charter) => (
        <Card 
          key={charter.locator} 
          className={`border-l-4 border-zatara-blue transition-all duration-200 ${
            onCharterSelect ? 'cursor-pointer hover:shadow-lg hover:bg-gray-50' : ''
          }`}
          onClick={() => handleCharterClick(charter)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Anchor className="h-5 w-5 text-zatara-blue" />
                <span>{charter.boat} - {charter.locator}</span>
                <Badge className={getStatusColor(charter.status)}>
                  {charter.status}
                </Badge>
              </CardTitle>
              <div className="text-right">
                <div className="text-lg font-bold">€{charter.charter_total}</div>
                {onCharterSelect && (
                  <Button variant="outline" size="sm" className="mt-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Tools
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>
              {charter.guest_name} • {new Date(charter.charter_date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-zatara-navy">Schedule</h4>
              <div className="text-sm space-y-1">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>{charter.start_time} - {charter.end_time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3" />
                  <span>{charter.booking_source}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-zatara-navy">Operations</h4>
              <div className="text-sm space-y-1">
                {charter.crew_required && <div>👥 {charter.crew_required}</div>}
                {charter.equipment_required && <div>🏄 {charter.equipment_required}</div>}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-zatara-navy">F&B & Notes</h4>
              <div className="text-sm space-y-1">
                {charter.fnb_details && <div>🍽️ {charter.fnb_details}</div>}
                {charter.charter_notes && <div>📝 {charter.charter_notes}</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
