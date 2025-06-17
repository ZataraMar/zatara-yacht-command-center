
export const getCustomerSegmentColor = (segment: string) => {
  switch (segment?.toLowerCase()) {
    case 'vip':
      return 'bg-yellow-500 text-white';
    case 'premium':
      return 'bg-purple-500 text-white';
    case 'loyal':
      return 'bg-blue-500 text-white';
    case 'standard':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

export const getActivityStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-500 text-white';
    case 'inactive':
      return 'bg-red-500 text-white';
    case 'pending':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getBookingStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
    case 'completed':
      return 'bg-green-500 text-white';
    case 'pending':
    case 'prebooked':
      return 'bg-yellow-500 text-white';
    case 'cancelled':
      return 'bg-red-500 text-white';
    case 'option':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};
