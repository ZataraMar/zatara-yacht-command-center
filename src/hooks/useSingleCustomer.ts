
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer, CustomerHistory } from '@/types/customer';
import { transformDatabaseCustomerToCustomer, ensureCustomerDefaults } from '@/utils/customerDataTransform';

export const useSingleCustomer = (customerId: number) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerHistory, setCustomerHistory] = useState<CustomerHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get from customer_360_view first, fallback to customers table
      let { data: customerData, error: customerError } = await supabase
        .from('customer_360_view')
        .select('*')
        .eq('id', customerId)
        .single();

      if (customerError) {
        // Fallback to customers table with basic fields
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('customers')
          .select(`
            id, customer_key, full_name, first_name, last_name,
            phone_primary, email_primary, customer_status,
            total_bookings, total_spent, customer_lifetime_value,
            created_at, updated_at
          `)
          .eq('id', customerId)
          .single();

        if (fallbackError) {
          throw fallbackError;
        }
        
        customerData = transformDatabaseCustomerToCustomer(fallbackData);
      }

      setCustomer(ensureCustomerDefaults(customerData));

      // Fetch customer history
      const { data: historyData, error: historyError } = await supabase
        .from('customer_history')
        .select('*')
        .eq('customer_id', customerId)
        .order('booking_date', { ascending: false });

      if (historyError) {
        console.error('Error fetching customer history:', historyError);
      } else {
        setCustomerHistory(historyData || []);
      }

    } catch (err) {
      console.error('Error fetching customer data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  return {
    customer,
    customerHistory,
    loading,
    error,
    refetch: fetchCustomer
  };
};
