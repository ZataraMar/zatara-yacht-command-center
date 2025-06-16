
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FinancialData } from '@/types/financial';
import { formatCurrency, mockMonthlyData } from '@/utils/financialUtils';

interface FinancialOverviewProps {
  financialData: FinancialData;
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({ financialData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Profit Trend (2024)</CardTitle>
          <CardDescription>Monthly financial performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMonthlyData}>
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
    </div>
  );
};
