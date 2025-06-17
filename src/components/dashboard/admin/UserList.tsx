
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { UserCard } from './UserCard';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface UserListProps {
  users: UserProfile[];
  onToggleUserStatus: (userId: string, currentStatus: boolean) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onToggleUserStatus }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Members ({users.length})
        </CardTitle>
        <CardDescription>
          Manage user accounts, roles, and access permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onToggleStatus={onToggleUserStatus}
            />
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No users found. Add your first team member to get started.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
