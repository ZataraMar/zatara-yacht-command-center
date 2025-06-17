
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Server, Calendar, Users } from 'lucide-react';

interface SystemPerformance {
  database_size: string;
  active_connections: number;
  total_bookings: number;
  active_customers: number;
}

interface PerformanceMetricsProps {
  performance: SystemPerformance | null;
}

export const PerformanceMetrics = ({ performance }: PerformanceMetricsProps) => {
  if (!performance) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Database Size</p>
              <p className="text-2xl font-bold text-zatara-navy">{performance.database_size}</p>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Connections</p>
              <p className="text-2xl font-bold text-zatara-navy">{performance.active_connections}</p>
            </div>
            <Server className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-zatara-navy">{performance.total_bookings}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-zatara-navy">{performance.active_customers}</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
