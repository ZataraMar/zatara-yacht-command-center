
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b">
        <div>
          <h3 className="text-lg font-semibold text-zatara-navy">{dataSource.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
          <p className="text-sm text-gray-600">{getDataSourceDescription(dataSource)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-zatara-blue/10 text-zatara-navy">
            {data.length} records
          </Badge>
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

      {/* Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg border border-zatara-blue/20">
          <div className="text-sm font-medium text-zatara-navy mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs bg-white">
                {key.replace(/_/g, ' ')}: {String(value)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Data Table */}
      <Card className="border-zatara-blue/20">
        <CardContent className="p-0">
          <Table className="border-separate border-spacing-0">
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
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-center text-lg font-bold text-zatara-navy">
                            🫡 {record.boat?.toUpperCase() || 'BOAT'} CHARTER
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 text-sm">
                          {selectedRecord && (
                            <div className="space-y-2">
                              {/* Guest Info */}
                              <div className="border-b pb-2">
                                <div>🎫 Locator: <strong>{selectedRecord.locator || '?'}</strong></div>
                                <div>👤 Guest: <strong>{selectedRecord.guest_name || selectedRecord.guest_full_name || '?'}</strong></div>
                                <div>📅 Date: <strong>{selectedRecord.charter_date ? new Date(selectedRecord.charter_date).toLocaleDateString('en-GB') : '?'}</strong></div>
                                <div>⏰ Time: <strong>{selectedRecord.start_time || '?'} - {selectedRecord.end_time || '?'}</strong></div>
                                <div>👥 Guests: <strong>{selectedRecord.total_guests || '?'}</strong></div>
                              </div>

                              {/* Financial Status */}
                              <div className="border-b pb-2">
                                <div className="font-semibold text-zatara-navy mb-1">💰 FINANCIAL STATUS</div>
                                <div>💰 Total: <strong>€{selectedRecord.charter_total?.toLocaleString() || '0'}</strong></div>
                                <div className={selectedRecord.paid_amount > 0 ? 'text-green-600' : ''}>
                                  💳 Paid: <strong>€{selectedRecord.paid_amount?.toLocaleString() || '0'}</strong>
                                </div>
                                <div className={selectedRecord.outstanding_amount > 0 ? 'text-red-600' : ''}>
                                  ⚠️ Outstanding: <strong>€{selectedRecord.outstanding_amount?.toLocaleString() || '0'}</strong>
                                </div>
                                <div>📜 Contract Signed?: <strong>{selectedRecord.contract_signed ? '✅ YES' : '❌ NO'}</strong></div>
                              </div>

                              {/* Operations */}
                              <div className="border-b pb-2">
                                <div className="font-semibold text-zatara-navy mb-1">🫡 OPERATIONS</div>
                                <div>✅ Pre-checks?: <strong>{selectedRecord.pre_departure_checks ? '✅ DONE' : '⏳ PENDING'}</strong></div>
                                <div>🚦 Cleared?: <strong>{selectedRecord.cleared_for_departure ? '✅ YES' : '❌ NO'}</strong></div>
                                {selectedRecord.crew_required && <div>👥 Crew: <strong>{selectedRecord.crew_required}</strong></div>}
                                {selectedRecord.equipment_required && <div>🏄 Equipment: <strong>{selectedRecord.equipment_required}</strong></div>}
                                {selectedRecord.gps_coordinates && <div>📍 GPS: <strong>{selectedRecord.gps_coordinates}</strong></div>}
                              </div>

                              {/* Notes & Details */}
                              {(selectedRecord.charter_notes || selectedRecord.fnb_details) && (
                                <div className="border-b pb-2">
                                  <div className="font-semibold text-zatara-navy mb-1">📝 NOTES</div>
                                  {selectedRecord.charter_notes && (
                                    <div className="bg-yellow-50 p-2 rounded text-xs border-l-2 border-yellow-400">
                                      📝 Charter Notes: {selectedRecord.charter_notes}
                                    </div>
                                  )}
                                  {selectedRecord.fnb_details && (
                                    <div className="bg-blue-50 p-2 rounded text-xs border-l-2 border-blue-400 mt-2">
                                      🍽️ F&B Details: {selectedRecord.fnb_details}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Status */}
                              <div className="text-center">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zatara-blue/10 text-zatara-navy">
                                  📊 Status: <strong className="ml-1">{selectedRecord.status || selectedRecord.booking_status || 'Unknown'}</strong>
                                </div>
                              </div>
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
          
          {data.length > 10 && (
            <div className="p-4 text-center text-sm text-gray-600">
              Showing first 10 of {data.length} records. Export to see all data.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
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
