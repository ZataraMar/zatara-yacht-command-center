
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EnhancedViewFilters } from './views/EnhancedViewFilters';
import { WhatsAppGenerator } from '../communications/WhatsAppGenerator';
import { EnhancedOperationsInput } from './views/EnhancedOperationsInput';
import { useRealTimeBookings } from '@/hooks/useRealTimeBookings';
import { DashboardMetrics } from './components/DashboardMetrics';
import { ViewRenderer } from './components/ViewRenderer';
import { useBookingFilters } from '@/hooks/useBookingFilters';
import { QuickActions } from './components/QuickActions';
import { FilterPresets } from './components/FilterPresets';
import { BookingStats } from './components/BookingStats';
import { DataDrillDown } from './components/DataDrillDown';
import { 
  transformToBusinessView, 
  transformToFinanceView, 
  transformToSkipperView 
} from './utils/dataTransformers';

export const EnhancedBusinessViewDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('14');
  const [boatFilter, setBoatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('operations');
  const [selectedCharter, setSelectedCharter] = useState<any>(null);
  const [drillDownData, setDrillDownData] = useState<{
    dataSource: string;
    data: any[];
    filters: any;
  } | null>(null);

  const { bookings, loading, error, refetch } = useRealTimeBookings();

  const { filteredBookings, availableViews } = useBookingFilters(
    bookings, 
    timeFilter, 
    boatFilter, 
    statusFilter
  );

  // Transform bookings to different view formats
  const transformedData = React.useMemo(() => transformToBusinessView(filteredBookings), [filteredBookings]);
  const financeData = React.useMemo(() => transformToFinanceView(filteredBookings), [filteredBookings]);
  const skipperData = React.useMemo(() => transformToSkipperView(filteredBookings), [filteredBookings]);

  const getViewTitle = () => {
    const view = availableViews.find(v => v.view_name === viewMode);
    return view?.display_name || '📊 Business Dashboard';
  };

  const getViewDescription = () => {
    const view = availableViews.find(v => v.view_name === viewMode);
    return view?.description || 'Charter business intelligence';
  };

  const handleApplyPreset = (preset: any) => {
    if (preset.filters.timeFilter) setTimeFilter(preset.filters.timeFilter);
    if (preset.filters.boatFilter) setBoatFilter(preset.filters.boatFilter);
    if (preset.filters.statusFilter) setStatusFilter(preset.filters.statusFilter);
    if (preset.filters.viewMode) setViewMode(preset.filters.viewMode);
  };

  const handleDataDrillDown = (dataSource: string, data: any[], filters: any) => {
    setDrillDownData({ dataSource, data, filters });
  };

  const handleQuickActions = {
    onRefresh: refetch,
    onNewBooking: () => console.log('New booking action'),
    onExportData: () => {
      // Use the enhanced export with current data
      const csvContent = generateCSVExport(transformedData);
      downloadCSV(csvContent, 'current-view-data.csv');
    },
    onOpenCalendar: () => console.log('Open calendar action'),
    onBulkMessage: () => console.log('Bulk message action'),
    onOpenSettings: () => console.log('Open settings action')
  };

  return (
    <div className="space-y-6">

      <EnhancedViewFilters
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        boatFilter={boatFilter}
        setBoatFilter={setBoatFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        availableViews={availableViews}
        onRefresh={refetch}
        loading={loading}
        resultCount={transformedData.length}
      />

      <DashboardMetrics data={transformedData} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <ViewRenderer
            viewMode={viewMode}
            transformedData={transformedData}
            financeData={financeData}
            skipperData={skipperData}
            loading={loading}
            error={error}
            onCharterSelect={setSelectedCharter}
          />
        </div>
        
        <div className="space-y-4">
          {selectedCharter && (
            <>
              <WhatsAppGenerator charter={selectedCharter} />
              <EnhancedOperationsInput 
                charter={selectedCharter}
                onSave={() => refetch()}
              />
            </>
          )}
          
          {!selectedCharter && (
            <>
              <BookingStats 
                data={transformedData} 
                timeFilter={timeFilter}
                onDrillDown={handleDataDrillDown}
              />
              
              <FilterPresets 
                onApplyPreset={handleApplyPreset}
                currentFilters={{ timeFilter, boatFilter, statusFilter, viewMode }}
                bookingData={transformedData}
              />
              
              <QuickActions 
                {...handleQuickActions} 
                bookingData={transformedData}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Charter Tools</CardTitle>
                  <CardDescription className="text-xs">
                    Select a charter to access management tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500 text-center py-4">
                    Click on any charter to get started with WhatsApp generator and operations input
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Data Drill Down Dialog */}
      <Dialog open={!!drillDownData} onOpenChange={() => setDrillDownData(null)}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          {drillDownData && (
            <DataDrillDown
              dataSource={drillDownData.dataSource}
              data={drillDownData.data}
              filters={drillDownData.filters}
              onClose={() => setDrillDownData(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper functions for CSV export
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
