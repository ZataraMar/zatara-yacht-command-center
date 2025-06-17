
export const getRoleColor = (role: string) => {
  switch (role) {
    case 'owners':
      return 'bg-purple-600';
    case 'management':
      return 'bg-purple-500';
    case 'skippers':
      return 'bg-blue-500';
    case 'staff':
      return 'bg-green-500';
    case 'casual_staff':
      return 'bg-green-400';
    default:
      return 'bg-gray-500';
  }
};

export const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'owners':
      return 'default'; // Purple theme
    case 'management':
      return 'secondary';
    case 'skippers':
      return 'outline';
    case 'staff':
    case 'casual_staff':
      return 'outline';
    default:
      return 'outline';
  }
};

export const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'owners':
      return 'Owner';
    case 'management':
      return 'Management';
    case 'skippers':
      return 'Skipper';
    case 'staff':
      return 'Staff';
    case 'casual_staff':
      return 'Casual Staff';
    default:
      return 'Team Member';
  }
};

export const getInitials = (firstName: string, lastName: string) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}` || '??';
};

export const enrichStaffData = (data: any[]) => {
  return data?.map(member => ({
    ...member,
    // Add realistic mock data for demonstration
    last_shift: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    hours_this_week: Math.floor(Math.random() * 35) + 15,
    certifications: member.certifications || (member.role === 'skippers' ? ['RYA Day Skipper', 'VHF Radio'] : []),
    boat_access: member.boat_access || (member.role === 'owners' ? ['Zatara', 'PuraVida'] : ['PuraVida'])
  })) || [];
};
