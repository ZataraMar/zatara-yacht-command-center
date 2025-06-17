
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FinancialData } from '@/types/financial';
import { calculateCommission } from '@/utils/financialUtils';

export const useFinancialData = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    total_revenue: 0,
    total_costs: 0,
    net_profit: 0,
    gross_profit: 0,
    profit_margin: 0,
    outstanding_payments: 0,
    paid_amount: 0,
    commission_fees: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchFinancialData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      
      // Fetch current year bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('charter_total, paid_amount, outstanding_amount, booking_source')
        .gte('start_date', `${currentYear}-01-01`);

      // Fetch historical data for cost ratio calculation using correct column names
      const { data: historicalData } = await supabase
        .from('charters_2023')
        .select('charter_total_net, fuel_costs, food_costs, crew_costs, boat_cost');

      let totalRevenue = 0;
      let paidAmount = 0;
      let outstandingPayments = 0;
      let commissionFees = 0;

      // Process current year bookings
      bookings?.forEach(booking => {
        totalRevenue += booking.charter_total || 0;
        paidAmount += booking.paid_amount || 0;
        outstandingPayments += booking.outstanding_amount || 0;
        
        const revenue = booking.charter_total || 0;
        commissionFees += calculateCommission(revenue, booking.booking_source || '');
      });

      // Calculate estimated costs based on historical data and industry standards
      let estimatedCosts = 0;
      if (historicalData && historicalData.length > 0) {
        const historicalCostRatio = historicalData.reduce((acc, charter) => {
          const revenue = charter.charter_total_net || 0;
          const costs = (charter.fuel_costs || 0) + (charter.food_costs || 0) + (charter.crew_costs || 0) + (charter.boat_cost || 0);
          return acc + (revenue > 0 ? costs / revenue : 0);
        }, 0) / historicalData.length;
        
        estimatedCosts = totalRevenue * Math.max(historicalCostRatio, 0.4); // Minimum 40% cost ratio
      } else {
        estimatedCosts = totalRevenue * 0.55; // Default 55% cost ratio
      }

      const grossProfit = totalRevenue - estimatedCosts;
      const netProfit = grossProfit - commissionFees;
      const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

      setFinancialData({
        total_revenue: totalRevenue,
        total_costs: estimatedCosts,
        net_profit: netProfit,
        gross_profit: grossProfit,
        profit_margin: profitMargin,
        outstanding_payments: outstandingPayments,
        paid_amount: paidAmount,
        commission_fees: commissionFees
      });

    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();

    // Set up real-time subscription for financial updates
    const channel = supabase
      .channel('financial-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, () => {
        fetchFinancialData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { financialData, loading, refetch: fetchFinancialData };
};
