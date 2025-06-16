
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldsProps {
  isLogin: boolean;
  formData: {
    password: string;
    confirmPassword: string;
  };
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (field: string, value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

export const PasswordFields: React.FC<PasswordFieldsProps> = ({
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
    </>
  );
};
