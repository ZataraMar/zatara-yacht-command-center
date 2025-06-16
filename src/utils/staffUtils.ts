
export const getRoleColor = (role: string) => {
  switch (role) {
    case 'management':
      return 'bg-purple-500';
    case 'owners':
      return 'bg-gold-500';
    case 'skippers':
      return 'bg-blue-500';
    case 'staff':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const enrichStaffData = (data: any[]) => {
  return data?.map(member => ({
    ...member,
    last_shift: '2024-06-15',
    hours_this_week: Math.floor(Math.random() * 40) + 10,
    certifications: member.certifications || [],
    boat_access: member.boat_access || []
  })) || [];
};
