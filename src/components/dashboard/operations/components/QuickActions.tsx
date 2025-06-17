
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, RefreshCw, Download, Settings, Calendar, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsProps {
  onRefresh: () => void;
  onNewBooking?: () => void;
  onExportData?: () => void;
  onOpenSettings?: () => void;
  onOpenCalendar?: () => void;
  onBulkMessage?: () => void;
  bookingData?: any[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onRefresh,
  onNewBooking,
  onExportData,
  onOpenSettings,
  onOpenCalendar,
  onBulkMessage,
  bookingData = []
}) => {
  const { toast } = useToast();

  const handleExportData = () => {
    if (onExportData) {
      onExportData();
    } else {
      // Default export functionality
      const csvContent = generateCSVExport(bookingData);
      downloadCSV(csvContent, 'charter-data.csv');
      toast({
        title: "Data Exported",
        description: `Exported ${bookingData.length} charter records`,
      });
    }
  };

  const handleNewBooking = () => {
    if (onNewBooking) {
      onNewBooking();
    } else {
      toast({
        title: "New Booking",
        description: "Opening new booking form...",
      });
      // Navigate to new booking form
      window.open('/dashboard/operations#new-booking', '_blank');
    }
  };

  const handleOpenCalendar = () => {
    if (onOpenCalendar) {
      onOpenCalendar();
    } else {
      toast({
        title: "Calendar View",
        description: "Opening calendar interface...",
      });
      // Navigate to calendar view
      window.open('/dashboard/operations#calendar', '_blank');
    }
  };

  const handleBulkMessage = () => {
    if (onBulkMessage) {
      onBulkMessage();
    } else {
      toast({
        title: "Bulk Messaging",
        description: "Opening bulk WhatsApp message generator...",
      });
      // Navigate to bulk messaging
      window.open('/dashboard/automation#messaging', '_blank');
    }
  };

  const handleOpenSettings = () => {
    if (onOpenSettings) {
      onOpenSettings();
    } else {
      // Navigate to settings
      window.location.href = '/dashboard/settings';
    }
  };

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
        
        <Button 
          onClick={handleNewBooking} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
        
        <Button 
          onClick={handleExportData} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data ({bookingData.length})
        </Button>
        
        <Button 
          onClick={handleOpenCalendar} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Open Calendar
        </Button>
        
        <Button 
          onClick={handleBulkMessage} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Bulk Message
        </Button>
        
        <Button 
          onClick={handleOpenSettings} 
          variant="outline" 
          size="sm" 
          className="w-full justify-start"
        >
          <Settings className="h-4 w-4 mr-2" />
          View Settings
        </Button>
      </CardContent>
    </Card>
  );
};

// Helper functions for data export
const generateCSVExport = (data: any[]): string => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(value => 
      typeof value === 'string' ? `"${value}"` : value
    ).join(',')
  ).join('\n');
  
  return `${headers}\n${rows}`;
};

const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
