
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
    <div className="grid grid-cols-3 gap-2 mb-4">
      <Card className="min-h-0">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600">Charters</p>
              <p className="text-lg font-bold text-zatara-navy">{totalCharters}</p>
            </div>
            <BarChart3 className="h-5 w-5 text-blue-600 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>

      <Card className="min-h-0">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600">Revenue</p>
              <p className="text-lg font-bold text-zatara-navy">€{Math.ceil(totalRevenue).toLocaleString()}</p>
            </div>
            <DollarSign className="h-5 w-5 text-green-600 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>

      <Card className="min-h-0">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600">Avg Value</p>
              <p className="text-lg font-bold text-zatara-navy">€{Math.ceil(avgCharterValue).toLocaleString()}</p>
            </div>
            <Users className="h-5 w-5 text-purple-600 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
