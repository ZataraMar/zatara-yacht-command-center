
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { FinancialData } from '@/types/financial';

interface FinancialOverviewProps {
  financialData: FinancialData;
}

export const FinancialOverview = ({ financialData }: FinancialOverviewProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  // Mock monthly data - replace with actual data from business_analytics table
  const monthlyData = [
    { month: 'Jan', revenue: 45000, costs: 25000, profit: 20000 },
    { month: 'Feb', revenue: 52000, costs: 28000, profit: 24000 },
    { month: 'Mar', revenue: 48000, costs: 26000, profit: 22000 },
    { month: 'Apr', revenue: 61000, costs: 32000, profit: 29000 },
    { month: 'May', revenue: 75000, costs: 38000, profit: 37000 },
    { month: 'Jun', revenue: 82000, costs: 42000, profit: 40000 },
  ];

  const profitTrendData = [
    { month: 'Jan', margin: 44.4 },
    { month: 'Feb', margin: 46.2 },
    { month: 'Mar', margin: 45.8 },
    { month: 'Apr', margin: 47.5 },
    { month: 'May', margin: 49.3 },
    { month: 'Jun', margin: 48.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue vs Costs Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Costs Analysis</CardTitle>
          <CardDescription>Monthly revenue, costs, and profit breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), undefined]}
                labelStyle={{ color: '#1e3a8a' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#1e40af" name="Revenue" />
              <Bar dataKey="costs" fill="#ef4444" name="Costs" />
              <Bar dataKey="profit" fill="#10b981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Margin Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Profit Margin Trend</span>
            </CardTitle>
            <CardDescription>Monthly profit margin percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Profit Margin']}
                />
                <Line 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Year-to-date performance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(financialData.total_revenue)}
                </p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12%</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Net Profit</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(financialData.net_profit)}
                </p>
              </div>
              <div className="flex items-center text-blue-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8%</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-amber-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-amber-800">Profit Margin</p>
                <p className="text-2xl font-bold text-amber-600">
                  {financialData.profit_margin.toFixed(1)}%
                </p>
              </div>
              <div className="flex items-center text-amber-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2%</span>
              </div>
            </div>

            {financialData.outstanding_payments > 0 && (
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-800">Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(financialData.outstanding_payments)}
                  </p>
                </div>
                <div className="flex items-center text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">Requires attention</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
