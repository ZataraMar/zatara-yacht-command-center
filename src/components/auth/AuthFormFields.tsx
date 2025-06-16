
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, AlertTriangle, MessageCircle, Mail } from 'lucide-react';
import { AuthFormData } from '@/hooks/useAuthForm';

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

const publicUserRoles = [{
  value: 'charter_clients',
  label: 'Charter Client'
}, {
  value: 'boat_club_clients',
  label: 'Boat Club Client'
}, {
  value: 'charter_brokers',
  label: 'Charter Broker'
}];

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
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+34612345678"
              value={formData.phone} 
              onChange={e => onInputChange('phone', e.target.value)} 
              className={errors.phone ? 'border-red-500' : ''} 
              required 
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            <p className="text-xs text-gray-600">
              Enter your phone number in international format (e.g., +34612345678)
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Is this your WhatsApp number? *</Label>
            <RadioGroup 
              value={formData.whatsappEnabled.toString()} 
              onValueChange={(value) => onInputChange('whatsappEnabled', value === 'true')}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="whatsapp-yes" />
                <Label htmlFor="whatsapp-yes" className="text-sm font-normal cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="whatsapp-no" />
                <Label htmlFor="whatsapp-no" className="text-sm font-normal cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2 mb-2">
                <MessageCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong className="text-blue-800">WhatsApp updates:</strong>
                  <span className="text-blue-700"> ~5 minutes</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong className="text-blue-800">Email updates:</strong>
                  <span className="text-blue-700"> up to 48 hours</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={formData.role} onValueChange={value => onInputChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {publicUserRoles.map(roleOption => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    {roleOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Note:</strong> Staff and management accounts require approval. 
              Contact your administrator if you need elevated access.
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
      
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            value={formData.password} 
            onChange={e => onInputChange('password', e.target.value)} 
            className={errors.password ? 'border-red-500 pr-10' : 'pr-10'} 
            required 
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" 
            onClick={onTogglePassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
          </Button>
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        {!isLogin && (
          <p className="text-xs text-gray-600">
            Password must be at least 8 characters with uppercase, lowercase, and number
          </p>
        )}
      </div>
      
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              value={formData.confirmPassword} 
              onChange={e => onInputChange('confirmPassword', e.target.value)} 
              className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'} 
              required 
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" 
              onClick={onToggleConfirmPassword}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
      )}
      
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
