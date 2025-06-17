
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MonthlyComparisonData } from './types';
import { BreakdownAnalysis } from './BreakdownAnalysis';
import { BoatBreakdownAnalysis } from './BoatBreakdownAnalysis';
import { YearlyMetrics } from './types';

interface ChartTabsProps {
  monthlyComparisonData: MonthlyComparisonData[];
  years: number[];
  yearlyMetrics: Record<number, YearlyMetrics>;
}

export const ChartTabs: React.FC<ChartTabsProps> = ({ monthlyComparisonData, years, yearlyMetrics }) => {
  // Fixed color scheme to avoid duplicate yellows
  const getYearColor = (year: number, index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[index % colors.length];
  };

  return (
    <Tabs defaultValue="monthly" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
        <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        <TabsTrigger value="boats">Boat Breakdown</TabsTrigger>
        <TabsTrigger value="breakdown">Source Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Booking Trends</CardTitle>
            <CardDescription>Compare monthly performance across years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {years.map((year, index) => (
                  <Bar 
                    key={year}
                    dataKey={`bookings_${year}`} 
                    fill={getYearColor(year, index)}
                    name={`${year} Bookings`}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="revenue">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue comparison across years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`€${Number(value).toLocaleString()}`, 'Revenue']} />
                {years.map((year, index) => (
                  <Line 
                    key={year}
                    type="monotone" 
                    dataKey={`revenue_${year}`} 
                    stroke={getYearColor(year, index)}
                    strokeWidth={2}
                    name={`${year} Revenue`}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="boats">
        <BoatBreakdownAnalysis yearlyMetrics={yearlyMetrics} years={years} />
      </TabsContent>

      <TabsContent value="breakdown">
        <BreakdownAnalysis yearlyMetrics={yearlyMetrics} years={years} />
      </TabsContent>
    </Tabs>
  );
};
