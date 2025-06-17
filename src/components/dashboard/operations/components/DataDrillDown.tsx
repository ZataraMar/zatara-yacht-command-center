
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Download, Filter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataDrillDownProps {
  dataSource: string;
  data: any[];
  filters: any;
  onClose?: () => void;
}

export const DataDrillDown: React.FC<DataDrillDownProps> = ({
  dataSource,
  data,
  filters,
  onClose
}) => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const { toast } = useToast();

  const handleExportFiltered = () => {
    const csvContent = generateCSVExport(data);
    downloadCSV(csvContent, `${dataSource}-filtered-data.csv`);
    toast({
      title: "Filtered Data Exported",
      description: `Exported ${data.length} records from ${dataSource}`,
    });
  };

  const getDataSourceDescription = (source: string) => {
    const descriptions: Record<string, string> = {
      'real-time-bookings': 'Live booking data from Andronautic API',
      'weekly-forecast': 'Upcoming charters in the next 7 days',
      'zatara-operations': 'All operations data for Zatara boat',
      'puravida-operations': 'All operations data for PuraVida boat',
      'pending-operations': 'Bookings requiring immediate attention',
      'business-analytics': 'Performance metrics and trend analysis'
    };
    return descriptions[source] || 'Charter management data';
  };

  const getKeyFields = (record: any) => {
    const keyFields = ['locator', 'guest_name', 'boat', 'charter_date', 'charter_total', 'status'];
    return keyFields.filter(field => record.hasOwnProperty(field));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Data Source: {dataSource}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {getDataSourceDescription(dataSource)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{data.length} records</Badge>
            <Button onClick={handleExportFiltered} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            {onClose && (
              <Button onClick={onClose} size="sm" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium mb-2">Applied Filters:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {String(value)}
              </Badge>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Locator</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Boat</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((record, index) => (
                <TableRow key={record.locator || index}>
                  <TableCell className="font-medium">
                    {record.locator || 'N/A'}
                  </TableCell>
                  <TableCell>{record.guest_name || record.guest_full_name || 'N/A'}</TableCell>
                  <TableCell>{record.boat || 'N/A'}</TableCell>
                  <TableCell>
                    {record.charter_date ? new Date(record.charter_date).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {record.charter_total ? `€${record.charter_total.toLocaleString()}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={record.status === 'confirmed' ? 'default' : 'secondary'}>
                      {record.status || record.booking_status || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedRecord(record)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Record Details: {record.locator}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {selectedRecord && (
                            <div className="grid grid-cols-2 gap-4">
                              {Object.entries(selectedRecord).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <div className="text-sm font-medium text-gray-600 capitalize">
                                    {key.replace(/_/g, ' ')}
                                  </div>
                                  <div className="text-sm">
                                    {value !== null && value !== undefined ? String(value) : 'N/A'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {data.length > 10 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing first 10 of {data.length} records. Export to see all data.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper functions
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
