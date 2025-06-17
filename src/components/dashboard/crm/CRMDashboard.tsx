
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingsCenter } from './BookingsCenter';
import { CustomerList } from './CustomerList';
import { CustomerAnalytics } from './CustomerAnalytics';
import { CommunicationCenter } from './CommunicationCenter';
import { GuestExperience } from './GuestExperience';
import { FinancialReconciliation } from './FinancialReconciliation';
import { ExtrasManagement } from './ExtrasManagement';
import { BusinessIntelligence } from '../analytics/BusinessIntelligence';
import { YearOverYearAnalytics } from '../analytics/YearOverYearAnalytics';

export const CRMDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zatara-navy">CRM Dashboard</h1>
          <p className="text-zatara-blue">Complete customer relationship and financial management</p>
        </div>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="yearoveryear">Year/Year</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <BookingsCenter />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerList />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <FinancialReconciliation />
        </TabsContent>

        <TabsContent value="extras" className="space-y-6">
          <ExtrasManagement />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <BusinessIntelligence />
        </TabsContent>

        <TabsContent value="yearoveryear" className="space-y-6">
          <YearOverYearAnalytics />
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <CommunicationCenter />
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <GuestExperience />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <CustomerAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
