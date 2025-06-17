
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { YearComparison } from './types';
import { getTrendIcon, getTrendColor } from './TrendHelpers';

interface YearComparisonsCardProps {
  yearComparisons: YearComparison[];
}

export const YearComparisonsCard: React.FC<YearComparisonsCardProps> = ({ yearComparisons }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-over-Year Changes</CardTitle>
        <CardDescription>Percentage changes compared to previous year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {yearComparisons.map((comparison) => (
            <div key={`${comparison.currentYear}-${comparison.previousYear}`} className="border rounded-lg p-4">
              <h4 className="font-medium text-lg mb-3">
                {comparison.currentYear} vs {comparison.previousYear}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  {getTrendIcon(comparison.bookingsChange)}
                  <div>
                    <div className="text-sm text-gray-600">Bookings</div>
                    <div className={`font-medium ${getTrendColor(comparison.bookingsChange)}`}>
                      {comparison.bookingsChange > 0 ? '+' : ''}{comparison.bookingsChange.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getTrendIcon(comparison.revenueChange)}
                  <div>
                    <div className="text-sm text-gray-600">Revenue</div>
                    <div className={`font-medium ${getTrendColor(comparison.revenueChange)}`}>
                      {comparison.revenueChange > 0 ? '+' : ''}{comparison.revenueChange.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getTrendIcon(comparison.guestsChange)}
                  <div>
                    <div className="text-sm text-gray-600">Guests</div>
                    <div className={`font-medium ${getTrendColor(comparison.guestsChange)}`}>
                      {comparison.guestsChange > 0 ? '+' : ''}{comparison.guestsChange.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getTrendIcon(comparison.avgValueChange)}
                  <div>
                    <div className="text-sm text-gray-600">Avg Value</div>
                    <div className={`font-medium ${getTrendColor(comparison.avgValueChange)}`}>
                      {comparison.avgValueChange > 0 ? '+' : ''}{comparison.avgValueChange.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
