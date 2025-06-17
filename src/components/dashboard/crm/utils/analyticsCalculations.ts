
import { Customer } from '@/types/customer';

export const calculateCustomerMetrics = (customers: Customer[]) => {
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + (customer.total_spent || 0), 0);
  const avgLifetimeValue = customers.reduce((sum, customer) => sum + (customer.customer_lifetime_value || 0), 0) / totalCustomers;
  const totalBookings = customers.reduce((sum, customer) => sum + (customer.total_bookings || 0), 0);

  return {
    totalCustomers,
    totalRevenue,
    avgLifetimeValue,
    totalBookings
  };
};

export const calculateSegmentData = (customers: Customer[]) => {
  const totalCustomers = customers.length;
  const segmentCounts = customers.reduce((acc, customer) => {
    const segment = customer.customer_segment || 'standard';
    acc[segment] = (acc[segment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(segmentCounts).map(([segment, count]) => ({
    name: segment,
    value: count,
    percentage: ((count / totalCustomers) * 100).toFixed(1)
  }));
};

export const calculateSpendingData = (customers: Customer[]) => {
  const spendingRanges = [
    { range: '€0-500', min: 0, max: 500 },
    { range: '€500-1000', min: 500, max: 1000 },
    { range: '€1000-2500', min: 1000, max: 2500 },
    { range: '€2500-5000', min: 2500, max: 5000 },
    { range: '€5000+', min: 5000, max: Infinity }
  ];

  return spendingRanges.map(({ range, min, max }) => ({
    range,
    customers: customers.filter(c => (c.total_spent || 0) >= min && (c.total_spent || 0) < max).length
  }));
};

export const calculateBookingFrequencyData = (customers: Customer[]) => {
  return [
    { frequency: '1 booking', count: customers.filter(c => (c.total_bookings || 0) === 1).length },
    { frequency: '2-3 bookings', count: customers.filter(c => (c.total_bookings || 0) >= 2 && (c.total_bookings || 0) <= 3).length },
    { frequency: '4-5 bookings', count: customers.filter(c => (c.total_bookings || 0) >= 4 && (c.total_bookings || 0) <= 5).length },
    { frequency: '6+ bookings', count: customers.filter(c => (c.total_bookings || 0) >= 6).length }
  ];
};

export const getTopCustomers = (customers: Customer[], limit: number = 5) => {
  return customers
    .sort((a, b) => (b.customer_lifetime_value || 0) - (a.customer_lifetime_value || 0))
    .slice(0, limit);
};
