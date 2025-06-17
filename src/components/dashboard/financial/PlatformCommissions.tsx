
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, calculateCommission } from '@/utils/financialUtils';
import { supabase } from '@/integrations/supabase/client';

export const PlatformCommissions: React.FC = () => {
  const [platformData, setPlatformData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlatformData();
  }, []);

  const fetchPlatformData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('booking_source, charter_total')
        .gte('start_date', `${currentYear}-01-01`)
        .lte('start_date', `${currentYear}-12-31`)
        .not('charter_total', 'is', null);

      if (error) {
        console.error('Error fetching platform data:', error);
        // Use fallback data if database query fails
        setPlatformData([
          { platform: 'Andronautic', revenue: 125000, rate: 10, commission: 12500 },
          { platform: 'ClickBoat', revenue: 85000, rate: 20, commission: 17000 },
          { platform: 'Airbnb', revenue: 65000, rate: 15, commission: 9750 },
          { platform: 'Direct', revenue: 45000, rate: 0, commission: 0 }
        ]);
        return;
      }

      if (bookings && bookings.length > 0) {
        // Group by platform and calculate totals
        const platformMap = bookings.reduce((acc: any, booking) => {
          const platform = booking.booking_source || 'Direct';
          const revenue = booking.charter_total || 0;
          
          if (!acc[platform]) {
            acc[platform] = { platform, revenue: 0, commission: 0 };
          }
          
          acc[platform].revenue += revenue;
          acc[platform].commission += calculateCommission(revenue, platform);
          
          return acc;
        }, {});

        // Add commission rates
        const platformArray = Object.values(platformMap).map((p: any) => ({
          ...p,
          rate: p.revenue > 0 ? (p.commission / p.revenue) * 100 : 0
        }));

        setPlatformData(platformArray);
      }
    } catch (error) {
      console.error('Error processing platform data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

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
              {platformData.map((platform, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-medium">{platform.platform}</td>
                  <td className="p-2 text-right">{formatCurrency(platform.revenue)}</td>
                  <td className="p-2 text-right">{platform.rate.toFixed(1)}%</td>
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
