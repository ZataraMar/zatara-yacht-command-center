
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus } from 'lucide-react';
import { roleOptions } from '@/utils/userRoleUtils';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];
type UserProfileInsert = Database['public']['Tables']['profiles']['Insert'];

interface AddUserDialogProps {
  onUserAdded: () => void;
}

export const AddUserDialog: React.FC<AddUserDialogProps> = ({ onUserAdded }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: 'staff' as UserRole,
    company: 'Zatara Mar',
    phone: ''
  });

  const handleAddUser = async () => {
    try {
      // Generate a UUID for the new profile
      const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        email_confirm: true,
        user_metadata: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          role: newUser.role,
          company: newUser.company,
          phone: newUser.phone
        }
      });

      if (createError) throw createError;

      if (user) {
        // Create the profile entry with the user ID
        const profileData: UserProfileInsert = {
          id: user.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          role: newUser.role,
          company: newUser.company,
          phone: newUser.phone,
          active: true,
          whatsapp_enabled: false
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData);

        if (profileError) throw profileError;

        toast({
          title: "User Added",
          description: `${newUser.first_name} ${newUser.last_name} has been added successfully.`,
        });

        setNewUser({
          first_name: '',
          last_name: '',
          email: '',
          role: 'staff',
          company: 'Zatara Mar',
          phone: ''
        });
        setIsOpen(false);
        onUserAdded();
      }
    } catch (error: any) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            Create a new user account. They will receive their login credentials via email.
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddUser} disabled={!newUser.email || !newUser.first_name}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
