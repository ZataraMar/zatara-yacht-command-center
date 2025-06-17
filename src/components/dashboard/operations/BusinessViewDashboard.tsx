
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewFilters } from './views/ViewFilters';
import { OperationsView } from './views/OperationsView';
import { FinanceView } from './views/FinanceView';
import { SkipperView } from './views/SkipperView';
import { useBusinessViewData } from '@/hooks/useBusinessViewData';
import { getStatusColor, getPaymentStatusColor } from './utils/statusColors';

export const BusinessViewDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('14');
  const [boatFilter, setBoatFilter] = useState('all');

  const {
    operationsData,
    financeData,
    zataraData,
    puravidaData,
    loading,
    refetch
  } = useBusinessViewData(timeFilter, boatFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ViewFilters
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        boatFilter={boatFilter}
        setBoatFilter={setBoatFilter}
        onRefresh={refetch}
      />

      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="zatara">Zatara</TabsTrigger>
          <TabsTrigger value="puravida">PuraVida</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <OperationsView data={operationsData} getStatusColor={getStatusColor} />
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <FinanceView data={financeData} getPaymentStatusColor={getPaymentStatusColor} />
        </TabsContent>

        <TabsContent value="zatara" className="space-y-4">
          <SkipperView 
            data={zataraData} 
            boatName="Zatara" 
            boatColor="blue" 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>

        <TabsContent value="puravida" className="space-y-4">
          <SkipperView 
            data={puravidaData} 
            boatName="PuraVida" 
            boatColor="teal" 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
