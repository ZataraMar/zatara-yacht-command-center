
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, CreditCard, Calculator, AlertTriangle } from 'lucide-react';
import { FinancialData } from '@/types/financial';
import { formatCurrency } from '@/utils/financialUtils';

interface FinancialMetricsProps {
  financialData: FinancialData;
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ financialData }) => {
  // Check if we have any real financial data
  const hasData = financialData.total_revenue > 0 || financialData.outstanding_payments > 0;

  if (!hasData) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">No Financial Data Available</h3>
              <p className="text-sm text-yellow-700">
                No booking revenue or payment data found in the database. Please ensure your booking data is properly imported.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-zatara-navy">
                {formatCurrency(financialData.total_revenue)}
              </p>
              {financialData.total_revenue > 0 && (
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Real data from bookings
                </p>
              )}
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
              {financialData.profit_margin > 0 && (
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {financialData.profit_margin.toFixed(1)}% margin
                </p>
              )}
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
              {financialData.outstanding_payments > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  Requires attention
                </p>
              )}
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
  );
};
