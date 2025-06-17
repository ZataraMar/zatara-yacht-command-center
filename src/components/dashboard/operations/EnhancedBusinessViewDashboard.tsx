
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, BarChart3, Users, DollarSign } from 'lucide-react';
import { EnhancedViewFilters } from './views/EnhancedViewFilters';
import { OperationsView } from './views/OperationsView';
import { FinanceView } from './views/FinanceView';
import { SkipperView } from './views/SkipperView';
import { WhatsAppGenerator } from '../communications/WhatsAppGenerator';
import { EnhancedOperationsInput } from './views/EnhancedOperationsInput';
import { useEnhancedBusinessViews } from '@/hooks/useEnhancedBusinessViews';
import { getStatusColor, getPaymentStatusColor } from './utils/statusColors';

export const EnhancedBusinessViewDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('14');
  const [boatFilter, setBoatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('booked_prebooked');
  const [viewMode, setViewMode] = useState('operations');
  const [selectedCharter, setSelectedCharter] = useState<any>(null);

  const {
    data,
    loading,
    error,
    availableViews,
    refetch
  } = useEnhancedBusinessViews({
    timeFilter,
    boatFilter,
    statusFilter,
    viewMode
  });

  const getViewTitle = () => {
    const view = availableViews.find(v => v.view_name === viewMode);
    return view?.display_name || '📊 Business Dashboard';
  };

  const getViewDescription = () => {
    const view = availableViews.find(v => v.view_name === viewMode);
    return view?.description || 'Charter business intelligence';
  };

  const renderMetrics = () => {
    if (!data.length) return null;

    const totalRevenue = data.reduce((sum, item) => sum + (item.charter_total || 0), 0);
    const totalCharters = data.length;
    const avgCharterValue = totalRevenue / totalCharters;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Charters</p>
                <p className="text-2xl font-bold text-zatara-navy">{totalCharters}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-zatara-navy">€{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Charter Value</p>
                <p className="text-2xl font-bold text-zatara-navy">€{avgCharterValue.toFixed(0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderViewContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!data.length) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No charters found for the selected filters.</p>
          </CardContent>
        </Card>
      );
    }

    switch (viewMode) {
      case 'operations':
        return (
          <OperationsView 
            data={data} 
            getStatusColor={getStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      case 'finance':
        return (
          <FinanceView 
            data={data} 
            getPaymentStatusColor={getPaymentStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      case 'zatara':
        return (
          <SkipperView 
            data={data} 
            boatName="Zatara" 
            boatColor="blue" 
            getStatusColor={getStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      case 'puravida':
        return (
          <SkipperView 
            data={data} 
            boatName="PuraVida" 
            boatColor="teal" 
            getStatusColor={getStatusColor}
            onCharterSelect={setSelectedCharter}
          />
        );
      default:
        return <div>View not implemented</div>;
    }
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
        resultCount={data.length}
      />

      {renderMetrics()}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {renderViewContent()}
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
