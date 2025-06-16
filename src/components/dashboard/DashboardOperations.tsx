
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveCharterBoard } from './operations/LiveCharterBoard';
import { CharterReconciliation } from './operations/CharterReconciliation';
import { BusinessIntelligence } from './analytics/BusinessIntelligence';
import { CustomerCommunications } from './communications/CustomerCommunications';

export const DashboardOperations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">Operations Center</h1>
          <p className="text-zatara-blue">Real-time charter management and business intelligence</p>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">Live Charters</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <LiveCharterBoard />
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <CharterReconciliation />
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <CustomerCommunications />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <BusinessIntelligence />
        </TabsContent>
      </Tabs>
    </div>
  );
};
