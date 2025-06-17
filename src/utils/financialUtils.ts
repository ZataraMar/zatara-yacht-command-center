
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

// Remove all mock data - these will be fetched from the database
export const getMonthlyFinancialData = async () => {
  // This function should fetch real data from Supabase
  throw new Error('Use real database queries instead of mock data');
};

export const getExpenseBreakdown = async () => {
  // This function should fetch real data from Supabase
  throw new Error('Use real database queries instead of mock data');
};

export const getPlatformCommissions = async () => {
  // This function should fetch real data from Supabase
  throw new Error('Use real database queries instead of mock data');
};
