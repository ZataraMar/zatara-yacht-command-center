
export interface FinancialData {
  total_revenue: number;
  total_costs: number;
  net_profit: number;
  gross_profit: number;
  profit_margin: number;
  outstanding_payments: number;
  paid_amount: number;
  commission_fees: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  costs: number;
  profit: number;
}

export interface ExpenseBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface PlatformCommission {
  platform: string;
  revenue: number;
  commission: number;
  rate: number;
}
