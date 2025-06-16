
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, UserCheck } from 'lucide-react';
import { AuthFormData } from '@/hooks/useAuthForm';
import { PersonalInfoFields } from './fields/PersonalInfoFields';
import { PhoneFields } from './fields/PhoneFields';
import { AccountTypeField } from './fields/AccountTypeField';
import { PasswordFields } from './fields/PasswordFields';

interface AuthFormFieldsProps {
  isLogin: boolean;
  formData: AuthFormData;
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

export const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  isLogin,
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword
}) => {
  return (
    <>
      {!isLogin && (
        <>
          <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded flex items-start space-x-2 mb-4">
            <UserCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Registration Available</strong>
              <p className="text-blue-600 mt-1">Create your account to access Zatara services. You'll receive an email confirmation after registration.</p>
            </div>
          </div>

          <PersonalInfoFields
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
          />
          
          <PhoneFields
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
          />
          
          <AccountTypeField
            formData={formData}
            onInputChange={onInputChange}
          />
          
          <div className="text-sm text-gray-600 bg-amber-50 p-3 rounded flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>After Registration:</strong> You'll receive an email confirmation. Once confirmed, if you selected WhatsApp, you'll need to verify your WhatsApp number in your profile settings.
            </div>
          </div>
        </>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input 
          id="email" 
          type="email" 
          value={formData.email} 
          onChange={e => onInputChange('email', e.target.value)} 
          className={errors.email ? 'border-red-500' : ''} 
          required 
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>
      
      <PasswordFields
        isLogin={isLogin}
        formData={formData}
        errors={errors}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onInputChange={onInputChange}
        onTogglePassword={onTogglePassword}
        onToggleConfirmPassword={onToggleConfirmPassword}
      />
      
      {isLogin && (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="rememberMe" 
            checked={formData.rememberMe} 
            onCheckedChange={checked => onInputChange('rememberMe', checked as boolean)} 
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
            Remember me
          </Label>
        </div>
      )}
    </>
  );
};
