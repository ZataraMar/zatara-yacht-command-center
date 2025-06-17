
export const getCustomerSegmentColor = (segment: string) => {
  switch (segment?.toLowerCase()) {
    case 'vip':
      return 'bg-purple-100 text-purple-800';
    case 'loyal':
      return 'bg-blue-100 text-blue-800';
    case 'new':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getActivityStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
