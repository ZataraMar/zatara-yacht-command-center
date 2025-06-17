
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { YearlyMetrics } from './types';

interface BreakdownAnalysisProps {
  yearlyMetrics: Record<number, YearlyMetrics>;
  years: number[];
}

export const BreakdownAnalysis: React.FC<BreakdownAnalysisProps> = ({ yearlyMetrics, years }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Source Performance</CardTitle>
          <CardDescription>Booking sources by year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {years.map(year => {
              const sources = yearlyMetrics[year]?.sourceBreakdown || {};
              const sourceEntries = Object.entries(sources).map(([source, count]) => [source, Number(count)] as [string, number]);
              const total = sourceEntries.reduce((sum, [, count]) => sum + count, 0);
              
              return (
                <div key={year} className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">{year} ({total} bookings)</h4>
                  <div className="space-y-1">
                    {sourceEntries.map(([source, count]) => (
                      <div key={source} className="flex items-center justify-between text-sm">
                        <span>{source}</span>
                        <div className="flex items-center space-x-2">
                          <span>{count}</span>
                          <Badge variant="outline">
                            {total > 0 ? ((count / total) * 100).toFixed(1) : '0'}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boat Performance</CardTitle>
          <CardDescription>Boat utilization by year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {years.map(year => {
              const boats = yearlyMetrics[year]?.boatBreakdown || {};
              const boatEntries = Object.entries(boats).map(([boat, count]) => [boat, Number(count)] as [string, number]);
              const total = boatEntries.reduce((sum, [, count]) => sum + count, 0);
              
              return (
                <div key={year} className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">{year} ({total} bookings)</h4>
                  <div className="space-y-1">
                    {boatEntries.map(([boat, count]) => (
                      <div key={boat} className="flex items-center justify-between text-sm">
                        <span>{boat}</span>
                        <div className="flex items-center space-x-2">
                          <span>{count}</span>
                          <Badge variant="outline">
                            {total > 0 ? ((count / total) * 100).toFixed(1) : '0'}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
