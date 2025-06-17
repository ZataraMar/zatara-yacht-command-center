
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

export const roleOptions = [
  { value: 'owners' as UserRole, label: 'Owner', description: 'Full system access' },
  { value: 'management' as UserRole, label: 'Management', description: 'Business operations and team oversight' },
  { value: 'boat_owners' as UserRole, label: 'Boat Owner', description: 'Fleet and boat management' },
  { value: 'skippers' as UserRole, label: 'Skipper', description: 'Boat operations and guest service' },
  { value: 'staff' as UserRole, label: 'Staff', description: 'General operations support' },
  { value: 'casual_staff' as UserRole, label: 'Casual Staff', description: 'Part-time support' },
  { value: 'charter_brokers' as UserRole, label: 'Charter Broker', description: 'Charter booking partner' },
  { value: 'charter_clients' as UserRole, label: 'Charter Client', description: 'Booking and charter access' },
  { value: 'boat_club_clients' as UserRole, label: 'Boat Club Member', description: 'Boat club access' }
];

export const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'owners': return 'bg-purple-600 text-white';
    case 'management': return 'bg-purple-500 text-white';
    case 'boat_owners': return 'bg-blue-600 text-white';
    case 'skippers': return 'bg-blue-500 text-white';
    case 'staff': return 'bg-green-500 text-white';
    case 'casual_staff': return 'bg-green-400 text-white';
    case 'charter_brokers': return 'bg-orange-500 text-white';
    case 'charter_clients': return 'bg-indigo-500 text-white';
    case 'boat_club_clients': return 'bg-teal-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};
