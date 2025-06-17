
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FinancialMetrics } from './FinancialMetrics';
import { FinancialOverview } from './FinancialOverview';
import { ExpenseAnalysis } from './ExpenseAnalysis';
import { PlatformCommissions } from './PlatformCommissions';
import { OutstandingPayments, FinancialForecasting } from './PlaceholderTabs';

interface FinancialData {
  totalRevenue: number;
  totalCharters: number;
  avgCharterValue: number;
  outstandingPayments: number;
  monthlyData: any[];
  platformData: any[];
}

export const AdvancedFinancials = () => {
  const [financialData, setFinancialData] = React.useState<FinancialData>({
    totalRevenue: 0,
    totalCharters: 0,
    avgCharterValue: 0,
    outstandingPayments: 0,
    monthlyData: [],
    platformData: []
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const currentYear = new Date().getFullYear();
      
      // Fetch bookings data for current year
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('charter_total, outstanding_amount, booking_source, start_date')
        .gte('start_date', `${currentYear}-01-01`)
        .lte('start_date', `${currentYear}-12-31`);

      if (error) {
        console.error('Error fetching financial data:', error);
        return;
      }

      if (!bookings) {
        console.warn('No bookings data found');
        return;
      }

      // Process the data
      const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.charter_total || 0), 0);
      const outstandingPayments = bookings.reduce((sum, booking) => sum + (booking.outstanding_amount || 0), 0);
      const avgCharterValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;

      // Group by month for chart data
      const monthlyData = bookings.reduce((acc: any, booking) => {
        const month = new Date(booking.start_date).toLocaleDateString('en-US', { month: 'short' });
        if (!acc[month]) {
          acc[month] = { month, revenue: 0, charters: 0 };
        }
        acc[month].revenue += booking.charter_total || 0;
        acc[month].charters += 1;
        return acc;
      }, {});

      // Group by platform
      const platformData = bookings.reduce((acc: any, booking) => {
        const platform = booking.booking_source || 'Direct';
        if (!acc[platform]) {
          acc[platform] = { platform, revenue: 0, charters: 0 };
        }
        acc[platform].revenue += booking.charter_total || 0;
        acc[platform].charters += 1;
        return acc;
      }, {});

      setFinancialData({
        totalRevenue,
        totalCharters: bookings.length,
        avgCharterValue,
        outstandingPayments,
        monthlyData: Object.values(monthlyData),
        platformData: Object.values(platformData)
      });

    } catch (error) {
      console.error('Error processing financial data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <PlatformCommissions platformData={financialData.platformData} />
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
