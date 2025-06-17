
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { YearlyMetrics } from './types';

interface YearOverviewCardsProps {
  yearlyMetrics: Record<number, YearlyMetrics>;
  years: number[];
}

export const YearOverviewCards: React.FC<YearOverviewCardsProps> = ({ yearlyMetrics, years }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {years.slice(0, 4).map(year => {
        const data = yearlyMetrics[year];
        return (
          <Card key={year}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{year}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bookings</span>
                  <span className="font-medium">{data.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-medium">€{Math.round(data.totalRevenue).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Guests</span>
                  <span className="font-medium">{data.totalGuests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Value</span>
                  <span className="font-medium">€{Math.round(data.avgBookingValue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
