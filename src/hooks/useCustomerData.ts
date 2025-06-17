
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Customer {
  id: number;
  customer_key: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone_primary: string;
  email_primary: string;
  customer_status: string;
  total_bookings: number;
  total_spent: number;
  customer_lifetime_value: number;
  customer_segment: string;
  activity_status: string;
  last_booking_date: string;
  created_at: string;
  updated_at: string;
  // Additional fields from customer_360_view
  acquisition_source?: string;
  acquisition_date?: string;
  average_booking_value?: number;
  average_review_rating?: number;
  avg_satisfaction_score?: number;
  preferred_boat?: string;
  preferred_time_slot?: string;
  communication_preference?: string;
  nationality?: string;
  special_requirements?: string;
  vip_status?: boolean;
  referral_source?: string;
  marketing_consent?: boolean;
  data_source?: string;
  // Additional optional fields for completeness
  dietary_restrictions?: string;
  favorite_boat?: string;
  last_contact_date?: string;
  last_contact_method?: string;
}

interface CustomerHistory {
  id: number;
  customer_id: number;
  booking_locator: string;
  booking_date: string;
  boat_used: string;
  guests_count: number;
  total_value: number;
  booking_source: string;
  seasonal_period: string;
  repeat_booking: boolean;
}

export const useCustomerData = (customerId?: number) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerHistory, setCustomerHistory] = useState<CustomerHistory[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch single customer data
  const fetchCustomer = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      // Try to get from customer_360_view first, fallback to customers table
      let { data: customerData, error: customerError } = await supabase
        .from('customer_360_view')
        .select('*')
        .eq('id', id)
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
          .eq('id', id)
          .single();

        if (fallbackError) {
          throw fallbackError;
        }
        
        // Map fallback data to include missing fields with defaults
        customerData = {
          ...fallbackData,
          customer_segment: 'standard',
          activity_status: 'active',
          last_booking_date: fallbackData.created_at,
          acquisition_source: 'unknown',
          acquisition_date: fallbackData.created_at,
          average_booking_value: 0,
          average_review_rating: 0,
          avg_satisfaction_score: 0,
          dietary_restrictions: '',
          favorite_boat: '',
          last_contact_date: '',
          last_contact_method: ''
        };
      }

      setCustomer(customerData as Customer);

      // Fetch customer history
      const { data: historyData, error: historyError } = await supabase
        .from('customer_history')
        .select('*')
        .eq('customer_id', id)
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

  // Fetch all customers
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
        
        // Map fallback data to include missing fields with defaults
        customersData = fallbackData?.map(customer => ({
          ...customer,
          customer_segment: 'standard',
          activity_status: 'active',
          last_booking_date: customer.created_at,
          acquisition_source: 'unknown',
          acquisition_date: customer.created_at,
          average_booking_value: 0,
          average_review_rating: 0,
          avg_satisfaction_score: 0,
          dietary_restrictions: '',
          favorite_boat: '',
          last_contact_date: '',
          last_contact_method: ''
        } as Customer)) || [];
      }

      setCustomers(customersData as Customer[]);

    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchCustomer(customerId);
    } else {
      fetchCustomers();
    }
  }, [customerId]);

  return {
    customer,
    customerHistory,
    customers,
    loading,
    error,
    refetch: customerId ? () => fetchCustomer(customerId) : fetchCustomers
  };
};
