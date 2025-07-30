
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AccountTypeFieldProps {
  formData: {
    role: string;
  };
  onInputChange: (field: string, value: string) => void;
}

// Only allow client roles for self-signup (security fix)
const accountTypes = [
  { value: 'charter_clients', label: 'Charter Client' },
  { value: 'boat_club_clients', label: 'Boat Club Member' }
];

export const AccountTypeField: React.FC<AccountTypeFieldProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="role">Account Type *</Label>
      <Select value={formData.role} onValueChange={value => onInputChange('role', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select your account type" />
        </SelectTrigger>
        <SelectContent>
          {accountTypes.map(accountType => (
            <SelectItem key={accountType.value} value={accountType.value}>
              {accountType.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
