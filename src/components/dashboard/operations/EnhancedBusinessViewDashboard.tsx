
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedViewFilters } from './views/EnhancedViewFilters';
import { WhatsAppGenerator } from '../communications/WhatsAppGenerator';
import { EnhancedOperationsInput } from './views/EnhancedOperationsInput';
import { useRealTimeBookings } from '@/hooks/useRealTimeBookings';
import { DashboardMetrics } from './components/DashboardMetrics';
import { ViewRenderer } from './components/ViewRenderer';
import { useBookingFilters } from '@/hooks/useBookingFilters';
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

  const { bookings, loading, error, refetch } = useRealTimeBookings();

  console.log('Raw bookings data:', bookings?.slice(0, 3));

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">{getViewTitle()}</h1>
          <p className="text-zatara-blue">{getViewDescription()}</p>
        </div>
      </div>

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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
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
        
        <div className="space-y-6">
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
            <Card>
              <CardHeader>
                <CardTitle>Charter Tools</CardTitle>
                <CardDescription>
                  Select a charter from the list to access enhanced management tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center py-8">
                  Click on any charter to get started with WhatsApp generator and operations input
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
