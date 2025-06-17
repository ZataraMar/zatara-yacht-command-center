
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer } from '@/types/customer';
import { transformDatabaseCustomerToCustomer, ensureCustomerDefaults } from '@/utils/customerDataTransform';

export const useCustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try customer_360_view first, fallback to customers table
      let { data: customersData, error: customersError } = await supabase
        .from('customer_360_view')
        .select('*')
        .order('customer_lifetime_value', { ascending: false })
        .limit(50);

      if (customersError) {
        // Fallback to customers table
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('customers')
          .select(`
            id, customer_key, full_name, first_name, last_name,
            phone_primary, email_primary, customer_status,
            total_bookings, total_spent, customer_lifetime_value,
            created_at, updated_at
          `)
          .order('total_spent', { ascending: false })
          .limit(50);

        if (fallbackError) {
          throw fallbackError;
        }
        
        customersData = fallbackData?.map(transformDatabaseCustomerToCustomer) || [];
      }

      setCustomers(customersData?.map(ensureCustomerDefaults) || []);

    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers
  };
};
