
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input 
          id="firstName" 
          type="text" 
          value={formData.firstName} 
          onChange={e => onInputChange('firstName', e.target.value)} 
          className={errors.firstName ? 'border-red-500' : ''} 
          required 
        />
        {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input 
          id="lastName" 
          type="text" 
          value={formData.lastName} 
          onChange={e => onInputChange('lastName', e.target.value)} 
          className={errors.lastName ? 'border-red-500' : ''} 
          required 
        />
        {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
      </div>
    </div>
  );
};
