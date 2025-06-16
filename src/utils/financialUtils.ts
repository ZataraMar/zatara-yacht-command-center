
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};

export const calculateCommission = (revenue: number, platform: string): number => {
  switch (platform) {
    case 'ClickBoat':
      return revenue * 0.20;
    case 'Airbnb':
      return revenue * 0.15;
    case 'Andronautic':
      return revenue * 0.10;
    default:
      return 0;
  }
};

export const mockMonthlyData = [
  { month: 'Jan', revenue: 45000, costs: 28000, profit: 17000 },
  { month: 'Feb', revenue: 38000, costs: 25000, profit: 13000 },
  { month: 'Mar', revenue: 52000, costs: 32000, profit: 20000 },
  { month: 'Apr', revenue: 61000, costs: 35000, profit: 26000 },
  { month: 'May', revenue: 78000, costs: 42000, profit: 36000 },
  { month: 'Jun', revenue: 95000, costs: 48000, profit: 47000 }
];

export const mockExpenseBreakdown = [
  { name: 'Fuel', value: 18500, color: '#8884d8' },
  { name: 'Crew', value: 12000, color: '#82ca9d' },
  { name: 'Maintenance', value: 8500, color: '#ffc658' },
  { name: 'Food & Beverage', value: 6500, color: '#ff7300' },
  { name: 'Insurance', value: 4500, color: '#8dd1e1' },
  { name: 'Other', value: 3000, color: '#d084d0' }
];

export const mockPlatformCommissions = [
  { platform: 'Andronautic', revenue: 45000, commission: 4500, rate: 10 },
  { platform: 'ClickBoat', revenue: 28000, commission: 5600, rate: 20 },
  { platform: 'Airbnb', revenue: 22000, commission: 3300, rate: 15 },
  { platform: 'Direct', revenue: 35000, commission: 0, rate: 0 }
];
