
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardMetrics {
  todaysCharters: number;
  upcomingCharters: number;
  totalRevenue: number;
  outstandingPayments: number;
  pendingReconciliations: number;
  totalGuests: number;
  avgCharterValue: number;
  occupancyRate: number;
  recentCharters: any[];
  fleetStatus: any[];
}

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    todaysCharters: 0,
    upcomingCharters: 0,
    totalRevenue: 0,
    outstandingPayments: 0,
    pendingReconciliations: 0,
    totalGuests: 0,
    avgCharterValue: 0,
    occupancyRate: 0,
    recentCharters: [],
    fleetStatus: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const currentYear = new Date().getFullYear();

      // Parallel data fetching for better performance
      const [
        todayChartersResult,
        upcomingChartersResult,
        yearRevenueResult,
        pendingReconResult,
        recentChartersResult
      ] = await Promise.all([
        // Today's charters
        supabase
          .from('bookings')
          .select('*')
          .gte('start_date', today)
          .lt('start_date', today + 'T23:59:59'),
        
        // Upcoming charters
        supabase
          .from('bookings')
          .select('*')
          .gt('start_date', today + 'T23:59:59')
          .lte('start_date', nextWeek),
        
        // Year revenue and outstanding
        supabase
          .from('bookings')
          .select('charter_total, outstanding_amount, total_guests')
          .gte('start_date', `${currentYear}-01-01`),
        
        // Pending reconciliations
        supabase
          .from('charter_reconciliation')
          .select('*')
          .eq('preparation_status', 'pending'),
        
        // Recent charters for activity feed
        supabase
          .from('bookings')
          .select('*')
          .order('start_date', { ascending: false })
          .limit(5)
      ]);

      // Calculate metrics
      let totalRevenue = 0;
      let outstandingPayments = 0;
      let totalGuests = 0;
      let charterCount = 0;

      yearRevenueResult.data?.forEach(booking => {
        totalRevenue += booking.charter_total || 0;
        outstandingPayments += booking.outstanding_amount || 0;
        totalGuests += booking.total_guests || 0;
        if (booking.charter_total > 0) charterCount++;
      });

      const avgCharterValue = charterCount > 0 ? totalRevenue / charterCount : 0;
      
      // Calculate occupancy rate (simplified - you can enhance this based on your business logic)
      const daysInYear = new Date().getDate() + (new Date().getMonth() * 30);
      const availableSlots = daysInYear * 2; // Assuming 2 slots per day
      const occupancyRate = charterCount > 0 ? (charterCount / availableSlots) * 100 : 0;

      // Fleet status (mock data - replace with actual fleet management data)
      const fleetStatus = [
        { name: 'Zatara', status: 'available', nextCharter: todayChartersResult.data?.find(c => c.boat === 'Zatara') },
        { name: 'PuraVida', status: 'available', nextCharter: todayChartersResult.data?.find(c => c.boat === 'PuraVida') }
      ];

      setMetrics({
        todaysCharters: todayChartersResult.data?.length || 0,
        upcomingCharters: upcomingChartersResult.data?.length || 0,
        totalRevenue,
        outstandingPayments,
        pendingReconciliations: pendingReconResult.data?.length || 0,
        totalGuests,
        avgCharterValue,
        occupancyRate,
        recentCharters: recentChartersResult.data || [],
        fleetStatus
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time subscriptions
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, () => {
        fetchDashboardData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'charter_reconciliation'
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { metrics, loading, refetch: fetchDashboardData };
};
