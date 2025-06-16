
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
      const { data: bookings } = await supabase
        .from('bookings')
        .select('charter_total, paid_amount, outstanding_amount, booking_source')
        .gte('start_date', '2024-01-01');

      let totalRevenue = 0;
      let paidAmount = 0;
      let outstandingPayments = 0;
      let commissionFees = 0;

      bookings?.forEach(booking => {
        totalRevenue += booking.charter_total || 0;
        paidAmount += booking.paid_amount || 0;
        outstandingPayments += booking.outstanding_amount || 0;
        
        const revenue = booking.charter_total || 0;
        commissionFees += calculateCommission(revenue, booking.booking_source || '');
      });

      const estimatedCosts = totalRevenue * 0.55;
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
  }, []);

  return { financialData, loading };
};
