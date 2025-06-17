
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, CheckCircle, XCircle } from 'lucide-react';
import { getRoleBadgeColor, roleOptions } from '@/utils/userRoleUtils';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface UserCardProps {
  user: UserProfile;
  onToggleStatus: (userId: string, currentStatus: boolean) => void;
  onEdit?: (user: UserProfile) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onToggleStatus, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-zatara-blue rounded-full flex items-center justify-center text-white font-medium">
          {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">
            {user.first_name} {user.last_name}
          </h4>
          <p className="text-sm text-gray-500">{user.email}</p>
          {user.phone && (
            <p className="text-xs text-gray-400">{user.phone}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Badge className={getRoleBadgeColor(user.role || 'staff')}>
          {roleOptions.find(r => r.value === user.role)?.label || user.role}
        </Badge>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleStatus(user.id, user.active || false)}
          className="flex items-center gap-1"
        >
          {user.active ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600">Active</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-600">Inactive</span>
            </>
          )}
        </Button>
        
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
