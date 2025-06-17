
import { useSingleCustomer } from './useSingleCustomer';
import { useCustomersList } from './useCustomersList';

export const useCustomerData = (customerId?: number) => {
  const singleCustomerHook = useSingleCustomer(customerId!);
  const customersListHook = useCustomersList();

  if (customerId) {
    return {
      customer: singleCustomerHook.customer,
      customerHistory: singleCustomerHook.customerHistory,
      customers: [],
      loading: singleCustomerHook.loading,
      error: singleCustomerHook.error,
      refetch: singleCustomerHook.refetch
    };
  }

  return {
    customer: null,
    customerHistory: [],
    customers: customersListHook.customers,
    loading: customersListHook.loading,
    error: customersListHook.error,
    refetch: customersListHook.refetch
  };
};
