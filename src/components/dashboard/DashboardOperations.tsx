
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedBusinessViewDashboard } from './operations/EnhancedBusinessViewDashboard';
import { CharterReconciliation } from './operations/CharterReconciliation';
import { BusinessIntelligence } from './analytics/BusinessIntelligence';
import { CustomerCommunications } from './communications/CustomerCommunications';
import { LiveCharterBoard } from './operations/LiveCharterBoard';

export const DashboardOperations = () => {
  return (
    <div className="space-y-6">

      <Tabs defaultValue="enhanced-views" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="enhanced-views">Enhanced Views</TabsTrigger>
          <TabsTrigger value="live-board">Live Board</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced-views" className="space-y-6">
          <EnhancedBusinessViewDashboard />
        </TabsContent>

        <TabsContent value="live-board" className="space-y-6">
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
