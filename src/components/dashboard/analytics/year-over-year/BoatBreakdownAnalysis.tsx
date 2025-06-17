
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { YearlyMetrics } from './types';

interface BoatBreakdownAnalysisProps {
  yearlyMetrics: Record<number, YearlyMetrics>;
  years: number[];
}

export const BoatBreakdownAnalysis: React.FC<BoatBreakdownAnalysisProps> = ({ yearlyMetrics, years }) => {
  // Generate boat performance data by year
  const boatPerformanceData = React.useMemo(() => {
    const boats = new Set<string>();
    
    // Collect all boat names across years
    Object.values(yearlyMetrics).forEach(yearData => {
      Object.keys(yearData.boatBreakdown || {}).forEach(boat => {
        boats.add(boat);
      });
    });
    
    return Array.from(boats).map(boat => {
      const boatData: any = { boat };
      
      years.forEach(year => {
        const yearData = yearlyMetrics[year];
        boatData[`bookings_${year}`] = yearData?.boatBreakdown[boat] || 0;
        
        // Calculate revenue per boat (simplified calculation)
        const totalBookings = yearData?.totalBookings || 0;
        const boatBookings = yearData?.boatBreakdown[boat] || 0;
        const boatRevenueShare = totalBookings > 0 ? (boatBookings / totalBookings) * (yearData?.totalRevenue || 0) : 0;
        boatData[`revenue_${year}`] = boatRevenueShare;
      });
      
      return boatData;
    });
  }, [yearlyMetrics, years]);

  // Generate monthly boat performance data
  const monthlyBoatData = React.useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return monthNames.map((month, monthIndex) => {
      const monthData: any = { month };
      
      years.forEach(year => {
        const yearData = yearlyMetrics[year];
        const monthMetrics = yearData?.monthlyData[monthIndex + 1];
        
        // For now, assume all bookings are Zatara for historical data
        // This can be enhanced when we have more detailed boat assignment data
        monthData[`zatara_${year}`] = monthMetrics?.bookings || 0;
        monthData[`puravida_${year}`] = 0; // No PuraVida data for historical years
      });
      
      return monthData;
    });
  }, [yearlyMetrics, years]);

  const getYearColor = (year: number, index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Boat Performance Comparison</CardTitle>
          <CardDescription>Bookings and revenue by boat across years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bookings by Boat */}
            <div>
              <h4 className="text-sm font-medium mb-4">Bookings by Boat</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={boatPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="boat" />
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
            </div>

            {/* Revenue by Boat */}
            <div>
              <h4 className="text-sm font-medium mb-4">Revenue by Boat</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={boatPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="boat" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`€${Number(value).toLocaleString()}`, 'Revenue']} />
                  {years.map((year, index) => (
                    <Bar 
                      key={year}
                      dataKey={`revenue_${year}`} 
                      fill={getYearColor(year, index)}
                      name={`${year} Revenue`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Boat Performance Trends</CardTitle>
          <CardDescription>Monthly booking patterns by boat</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyBoatData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {years.map((year, index) => (
                <Line 
                  key={`zatara_${year}`}
                  type="monotone" 
                  dataKey={`zatara_${year}`} 
                  stroke={getYearColor(year, index)}
                  strokeWidth={2}
                  name={`Zatara ${year}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boat Performance Summary</CardTitle>
          <CardDescription>Key metrics by boat and year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {years.map((year, index) => (
              <div key={year} className="border rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: getYearColor(year, index) }}
                  />
                  {year} Performance
                </h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(yearlyMetrics[year]?.boatBreakdown || {}).map(([boat, bookings]) => {
                    const totalBookings = yearlyMetrics[year]?.totalBookings || 0;
                    const percentage = totalBookings > 0 ? ((bookings as number / totalBookings) * 100).toFixed(1) : '0';
                    
                    return (
                      <div key={boat} className="flex justify-between">
                        <span>{boat}:</span>
                        <span>{bookings} ({percentage}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
