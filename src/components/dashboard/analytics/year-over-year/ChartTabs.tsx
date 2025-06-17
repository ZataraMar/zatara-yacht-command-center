
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MonthlyComparisonData } from './types';
import { BreakdownAnalysis } from './BreakdownAnalysis';
import { YearlyMetrics } from './types';

interface ChartTabsProps {
  monthlyComparisonData: MonthlyComparisonData[];
  years: number[];
  yearlyMetrics: Record<number, YearlyMetrics>;
}

export const ChartTabs: React.FC<ChartTabsProps> = ({ monthlyComparisonData, years, yearlyMetrics }) => {
  return (
    <Tabs defaultValue="monthly" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
        <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        <TabsTrigger value="breakdown">Breakdown Analysis</TabsTrigger>
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
                    fill={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}
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
                    stroke={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}
                    strokeWidth={2}
                    name={`${year} Revenue`}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="breakdown">
        <BreakdownAnalysis yearlyMetrics={yearlyMetrics} years={years} />
      </TabsContent>
    </Tabs>
  );
};
