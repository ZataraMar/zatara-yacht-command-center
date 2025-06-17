
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, RefreshCw, Download, Settings, Calendar, MessageSquare } from 'lucide-react';

interface QuickActionsProps {
  onRefresh: () => void;
  onNewBooking?: () => void;
  onExportData?: () => void;
  onOpenSettings?: () => void;
  onOpenCalendar?: () => void;
  onBulkMessage?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onRefresh,
  onNewBooking,
  onExportData,
  onOpenSettings,
  onOpenCalendar,
  onBulkMessage
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
        
        {onNewBooking && (
          <Button 
            onClick={onNewBooking} 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        )}
        
        {onExportData && (
          <Button 
            onClick={onExportData} 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        )}
        
        {onOpenCalendar && (
          <Button 
            onClick={onOpenCalendar} 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Open Calendar
          </Button>
        )}
        
        {onBulkMessage && (
          <Button 
            onClick={onBulkMessage} 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Bulk Message
          </Button>
        )}
        
        {onOpenSettings && (
          <Button 
            onClick={onOpenSettings} 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
          >
            <Settings className="h-4 w-4 mr-2" />
            View Settings
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
