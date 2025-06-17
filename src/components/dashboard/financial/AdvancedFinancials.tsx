
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText } from 'lucide-react';
import { useFinancialData } from '@/hooks/useFinancialData';
import { FinancialMetrics } from './FinancialMetrics';
import { FinancialOverview } from './FinancialOverview';
import { ExpenseAnalysis } from './ExpenseAnalysis';
import { PlatformCommissions } from './PlatformCommissions';
import { OutstandingPayments, FinancialForecasting } from './PlaceholderTabs';

export const AdvancedFinancials = () => {
  const { financialData, loading } = useFinancialData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">Financial Management</h2>
          <p className="text-zatara-blue">Comprehensive financial analysis and reporting</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
        </div>
      </div>

      <FinancialMetrics financialData={financialData} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">P&L Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
          <TabsTrigger value="commissions">Platform Commissions</TabsTrigger>
          <TabsTrigger value="outstanding">Outstanding Payments</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <FinancialOverview financialData={financialData} />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <ExpenseAnalysis />
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <PlatformCommissions />
        </TabsContent>

        <TabsContent value="outstanding" className="space-y-6">
          <OutstandingPayments />
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <FinancialForecasting />
        </TabsContent>
      </Tabs>
    </div>
  );
};
