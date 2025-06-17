
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/SecureAuthContext';
import { canManageUsers } from '@/utils/authSecurity';
import { UserPlus, Users, Edit, Trash2, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['profiles']['Row'];
type UserProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type UserRole = Database['public']['Enums']['user_role'];

export const UserManagement = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: 'staff' as UserRole,
    company: 'Zatara Mar',
    phone: ''
  });

  const roleOptions = [
    { value: 'owners' as UserRole, label: 'Owner', description: 'Full system access' },
    { value: 'management' as UserRole, label: 'Management', description: 'Business operations and team oversight' },
    { value: 'team' as UserRole, label: 'Team Lead', description: 'Operations and guest management' },
    { value: 'skippers' as UserRole, label: 'Skipper', description: 'Boat operations and guest service' },
    { value: 'staff' as UserRole, label: 'Staff', description: 'General operations support' },
    { value: 'casual_staff' as UserRole, label: 'Casual Staff', description: 'Part-time support' },
    { value: 'charter_brokers' as UserRole, label: 'Charter Broker', description: 'Charter booking partner' },
    { value: 'charter_clients' as UserRole, label: 'Charter Client', description: 'Booking and charter access' },
    { value: 'boat_club_clients' as UserRole, label: 'Boat Club Member', description: 'Boat club access' }
  ];

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
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      // Create the profile entry
      const profileData: UserProfileInsert = {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        phone: newUser.phone,
        active: false // Set to false until they complete registration
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData);

      if (error) throw error;

      toast({
        title: "User Added",
        description: `${newUser.first_name} ${newUser.last_name} has been added. They will need to complete registration.`,
      });

      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        role: 'staff',
        company: 'Zatara Mar',
        phone: ''
      });
      setIsAddDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUser = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "User Updated",
        description: "User information has been updated successfully.",
      });

      fetchUsers();
      setEditingUser(null);
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    await handleUpdateUser(userId, { active: !currentStatus });
  };

  useEffect(() => {
    if (canManageUsers(profile?.role || null)) {
      fetchUsers();
    }
  }, [profile]);

  if (!canManageUsers(profile?.role || null)) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-500">You don't have permission to manage users.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zatara-blue"></div>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owners': return 'bg-purple-600 text-white';
      case 'management': return 'bg-purple-500 text-white';
      case 'team': return 'bg-blue-600 text-white';
      case 'skippers': return 'bg-blue-500 text-white';
      case 'staff': return 'bg-green-500 text-white';
      case 'charter_brokers': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zatara-navy">User Management</h2>
          <p className="text-zatara-blue">Manage team members and their access levels</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account. They will need to complete registration to activate their account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@zatara.es"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="+34 123 456 789"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} disabled={!newUser.email || !newUser.first_name}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                    onClick={() => toggleUserStatus(user.id, user.active || false)}
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
                  
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
    </div>
  );
};
