
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, mockPlatformCommissions } from '@/utils/financialUtils';

export const PlatformCommissions: React.FC = () => {
  return (
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
              {mockPlatformCommissions.map((platform, index) => (
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
  );
};
