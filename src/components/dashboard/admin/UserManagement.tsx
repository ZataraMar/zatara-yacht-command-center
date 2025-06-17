
import React, { useEffect, useState } from 'react';
import { UserList } from './UserList';
import { StaffInvitation } from './StaffInvitation';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['profiles']['Row'];

export const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Set up real-time subscription for user changes
    const channel = supabase
      .channel('user-management-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zatara-navy">User Management</h2>
            <p className="text-zatara-blue">Loading team members...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">User Management</h2>
          <p className="text-zatara-blue">Manage team members and access permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StaffInvitation />
        </div>
        <div className="lg:col-span-2">
          <UserList users={users} onToggleUserStatus={handleToggleUserStatus} />
        </div>
      </div>
    </div>
  );
};
