
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard, BarChart3 } from 'lucide-react';

export const OutstandingPayments: React.FC = () => {
  return (
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
  );
};

export const FinancialForecasting: React.FC = () => {
  return (
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
  );
};
