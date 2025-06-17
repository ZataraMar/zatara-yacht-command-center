
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, DollarSign, Users } from 'lucide-react';
import { BusinessViewRow } from '../types/businessViewTypes';

interface DashboardMetricsProps {
  data: BusinessViewRow[];
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ data }) => {
  if (!data.length) return null;

  const totalRevenue = data.reduce((sum, item) => sum + (item.charter_total || 0), 0);
  const totalCharters = data.length;
  const avgCharterValue = totalRevenue / totalCharters;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Charters</p>
              <p className="text-2xl font-bold text-zatara-navy">{totalCharters}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-zatara-navy">€{totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Charter Value</p>
              <p className="text-2xl font-bold text-zatara-navy">€{avgCharterValue.toFixed(0)}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
