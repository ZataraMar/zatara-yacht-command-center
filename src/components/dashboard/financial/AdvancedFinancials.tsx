
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Calculator,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  CreditCard
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface FinancialData {
  total_revenue: number;
  total_costs: number;
  net_profit: number;
  gross_profit: number;
  profit_margin: number;
  outstanding_payments: number;
  paid_amount: number;
  commission_fees: number;
}

export const AdvancedFinancials = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    total_revenue: 0,
    total_costs: 0,
    net_profit: 0,
    gross_profit: 0,
    profit_margin: 0,
    outstanding_payments: 0,
    paid_amount: 0,
    commission_fees: 0
  });
  const [loading, setLoading] = useState(true);

  const monthlyData = [
    { month: 'Jan', revenue: 45000, costs: 28000, profit: 17000 },
    { month: 'Feb', revenue: 38000, costs: 25000, profit: 13000 },
    { month: 'Mar', revenue: 52000, costs: 32000, profit: 20000 },
    { month: 'Apr', revenue: 61000, costs: 35000, profit: 26000 },
    { month: 'May', revenue: 78000, costs: 42000, profit: 36000 },
    { month: 'Jun', revenue: 95000, costs: 48000, profit: 47000 }
  ];

  const expenseBreakdown = [
    { name: 'Fuel', value: 18500, color: '#8884d8' },
    { name: 'Crew', value: 12000, color: '#82ca9d' },
    { name: 'Maintenance', value: 8500, color: '#ffc658' },
    { name: 'Food & Beverage', value: 6500, color: '#ff7300' },
    { name: 'Insurance', value: 4500, color: '#8dd1e1' },
    { name: 'Other', value: 3000, color: '#d084d0' }
  ];

  const platformCommissions = [
    { platform: 'Andronautic', revenue: 45000, commission: 4500, rate: 10 },
    { platform: 'ClickBoat', revenue: 28000, commission: 5600, rate: 20 },
    { platform: 'Airbnb', revenue: 22000, commission: 3300, rate: 15 },
    { platform: 'Direct', revenue: 35000, commission: 0, rate: 0 }
  ];

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const { data: bookings } = await supabase
        .from('bookings')
        .select('charter_total, paid_amount, outstanding_amount, booking_source')
        .gte('start_date', '2024-01-01');

      let totalRevenue = 0;
      let paidAmount = 0;
      let outstandingPayments = 0;
      let commissionFees = 0;

      bookings?.forEach(booking => {
        totalRevenue += booking.charter_total || 0;
        paidAmount += booking.paid_amount || 0;
        outstandingPayments += booking.outstanding_amount || 0;
        
        // Calculate estimated commission based on platform
        const revenue = booking.charter_total || 0;
        switch (booking.booking_source) {
          case 'ClickBoat':
            commissionFees += revenue * 0.20;
            break;
          case 'Airbnb':
            commissionFees += revenue * 0.15;
            break;
          case 'Andronautic':
            commissionFees += revenue * 0.10;
            break;
          default:
            break;
        }
      });

      const estimatedCosts = totalRevenue * 0.55; // Estimate 55% cost ratio
      const grossProfit = totalRevenue - estimatedCosts;
      const netProfit = grossProfit - commissionFees;
      const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

      setFinancialData({
        total_revenue: totalRevenue,
        total_costs: estimatedCosts,
        net_profit: netProfit,
        gross_profit: grossProfit,
        profit_margin: profitMargin,
        outstanding_payments: outstandingPayments,
        paid_amount: paidAmount,
        commission_fees: commissionFees
      });
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
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

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {formatCurrency(financialData.total_revenue)}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% vs last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-zatara-navy">
                  {formatCurrency(financialData.net_profit)}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {financialData.profit_margin.toFixed(1)}% margin
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(financialData.outstanding_payments)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  15 pending payments
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commission Fees</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(financialData.commission_fees)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Platform commissions
                </p>
              </div>
              <Calculator className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">P&L Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
          <TabsTrigger value="commissions">Platform Commissions</TabsTrigger>
          <TabsTrigger value="outstanding">Outstanding Payments</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Profit Trend (2024)</CardTitle>
              <CardDescription>Monthly financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="costs" stroke="#dc2626" strokeWidth={2} name="Costs" />
                  <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={2} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Gross Revenue</span>
                    <span className="text-lg font-bold">{formatCurrency(financialData.total_revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Commission Fees</span>
                    <span className="text-lg font-bold text-red-600">-{formatCurrency(financialData.commission_fees)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Operating Costs</span>
                    <span className="text-lg font-bold text-red-600">-{formatCurrency(financialData.total_costs)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Net Profit</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(financialData.net_profit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Profit Margin</span>
                    <Badge className="bg-green-500 text-white">
                      {financialData.profit_margin.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Invoiced</span>
                    <span className="text-lg font-bold">{formatCurrency(financialData.total_revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Payments Received</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(financialData.paid_amount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Outstanding</span>
                    <span className="text-lg font-bold text-red-600">{formatCurrency(financialData.outstanding_payments)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Collection Rate</span>
                    <Badge className="bg-blue-500 text-white">
                      {((financialData.paid_amount / financialData.total_revenue) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Operating costs by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>Cost trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="costs" fill="#dc2626" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Commission Analysis</CardTitle>
              <CardDescription>Revenue and commission breakdown by booking platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Platform</th>
                      <th className="text-right p-2">Revenue</th>
                      <th className="text-right p-2">Commission Rate</th>
                      <th className="text-right p-2">Commission Fee</th>
                      <th className="text-right p-2">Net Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformCommissions.map((platform, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{platform.platform}</td>
                        <td className="p-2 text-right">{formatCurrency(platform.revenue)}</td>
                        <td className="p-2 text-right">{platform.rate}%</td>
                        <td className="p-2 text-right text-red-600">{formatCurrency(platform.commission)}</td>
                        <td className="p-2 text-right font-bold">{formatCurrency(platform.revenue - platform.commission)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outstanding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>Payments pending collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Outstanding payments tracking will be integrated here</p>
                  <p className="text-sm">Connect with your invoice management system</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecasting</CardTitle>
              <CardDescription>Revenue and profit projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Financial forecasting module will be integrated here</p>
                  <p className="text-sm">Based on historical data and business targets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
