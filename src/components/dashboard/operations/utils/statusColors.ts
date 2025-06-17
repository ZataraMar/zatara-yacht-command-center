
export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'bg-green-500 text-white';
    case 'pending': return 'bg-yellow-500 text-white';
    case 'cancelled': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'paid': return 'bg-green-100 text-green-800';
    case 'partial': return 'bg-yellow-100 text-yellow-800';
    case 'outstanding': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
