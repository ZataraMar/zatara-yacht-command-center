import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
  const [showBoatBreakdown, setShowBoatBreakdown] = useState(false);

  // Fixed color scheme to avoid duplicate yellows
  const getYearColor = (year: number, index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[index % colors.length];
  };

  // Generate boat-specific monthly data
  const monthlyBoatData = React.useMemo(() => {
    if (!showBoatBreakdown) return monthlyComparisonData;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return monthNames.map((month, monthIndex) => {
      const monthData: any = { month };
      
      years.forEach(year => {
        const yearData = yearlyMetrics[year];
        const monthMetrics = yearData?.monthlyData[monthIndex + 1];
        
        // For historical data (2022-2023), assume all is Zatara
        // For current data (2024+), we can have both boats
        if (year <= 2023) {
          monthData[`zatara_bookings_${year}`] = monthMetrics?.bookings || 0;
          monthData[`zatara_revenue_${year}`] = monthMetrics?.revenue || 0;
          monthData[`puravida_bookings_${year}`] = 0;
          monthData[`puravida_revenue_${year}`] = 0;
        } else {
          // For 2024+, we'd need to split by actual boat assignments
          // For now, assume 70% Zatara, 30% PuraVida as an estimate
          const totalBookings = monthMetrics?.bookings || 0;
          const totalRevenue = monthMetrics?.revenue || 0;
          monthData[`zatara_bookings_${year}`] = Math.round(totalBookings * 0.7);
          monthData[`zatara_revenue_${year}`] = totalRevenue * 0.7;
          monthData[`puravida_bookings_${year}`] = Math.round(totalBookings * 0.3);
          monthData[`puravida_revenue_${year}`] = totalRevenue * 0.3;
        }
        
        // Keep original totals
        monthData[`bookings_${year}`] = monthMetrics?.bookings || 0;
        monthData[`revenue_${year}`] = monthMetrics?.revenue || 0;
      });
      
      return monthData;
    });
  }, [monthlyComparisonData, showBoatBreakdown, yearlyMetrics, years]);

  const BoatToggleButton = () => (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant={showBoatBreakdown ? "default" : "outline"}
        size="sm"
        onClick={() => setShowBoatBreakdown(!showBoatBreakdown)}
      >
        {showBoatBreakdown ? "Hide" : "Show"} Boat Breakdown
      </Button>
      {showBoatBreakdown && (
        <span className="text-xs text-gray-500">
          Showing Zatara (solid) and PuraVida (dashed) data
        </span>
      )}
    </div>
  );

  return (
    <Tabs defaultValue="monthly" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
        <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        <TabsTrigger value="breakdown">Source Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Booking Trends</CardTitle>
            <CardDescription>Compare monthly performance across years</CardDescription>
          </CardHeader>
          <CardContent>
            <BoatToggleButton />
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyBoatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {!showBoatBreakdown ? (
                  // Original total bars
                  years.map((year, index) => (
                    <Bar 
                      key={year}
                      dataKey={`bookings_${year}`} 
                      fill={getYearColor(year, index)}
                      name={`${year} Bookings`}
                    />
                  ))
                ) : (
                  // Boat-specific bars
                  years.flatMap((year, index) => [
                    <Bar 
                      key={`zatara_${year}`}
                      dataKey={`zatara_bookings_${year}`} 
                      fill={getYearColor(year, index)}
                      name={`${year} Zatara`}
                    />,
                    <Bar 
                      key={`puravida_${year}`}
                      dataKey={`puravida_bookings_${year}`} 
                      fill={getYearColor(year, index)}
                      fillOpacity={0.6}
                      name={`${year} PuraVida`}
                    />
                  ])
                )}
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
            <BoatToggleButton />
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyBoatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`€${Number(value).toLocaleString()}`, 'Revenue']} />
                {!showBoatBreakdown ? (
                  // Original total lines
                  years.map((year, index) => (
                    <Line 
                      key={year}
                      type="monotone" 
                      dataKey={`revenue_${year}`} 
                      stroke={getYearColor(year, index)}
                      strokeWidth={2}
                      name={`${year} Revenue`}
                    />
                  ))
                ) : (
                  // Boat-specific lines
                  years.flatMap((year, index) => [
                    <Line 
                      key={`zatara_${year}`}
                      type="monotone" 
                      dataKey={`zatara_revenue_${year}`} 
                      stroke={getYearColor(year, index)}
                      strokeWidth={2}
                      name={`${year} Zatara`}
                    />,
                    <Line 
                      key={`puravida_${year}`}
                      type="monotone" 
                      dataKey={`puravida_revenue_${year}`} 
                      stroke={getYearColor(year, index)}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name={`${year} PuraVida`}
                    />
                  ])
                )}
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
