import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageCircle, Mail, AlertCircle, CheckCircle } from 'lucide-react';

interface PhoneFieldsProps {
  formData: {
    phone: string;
    whatsappEnabled: boolean;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string | boolean) => void;
}

const validatePhoneFormat = (phone: string): { isValid: boolean; message: string } => {
  if (!phone) return { isValid: false, message: 'Phone number is required' };
  
  // Remove any spaces or dashes for validation
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Must start with + followed by country code and number
  if (!cleanPhone.startsWith('+')) {
    return { isValid: false, message: 'Phone must start with country code (e.g., +34)' };
  }
  
  // Check if it matches international format: +[1-9][0-9]{1,14}
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(cleanPhone)) {
    if (cleanPhone.length < 8) {
      return { isValid: false, message: 'Phone number is too short' };
    }
    if (cleanPhone.length > 16) {
      return { isValid: false, message: 'Phone number is too long' };
    }
    return { isValid: false, message: 'Invalid phone number format' };
  }
  
  return { isValid: true, message: 'Valid phone number' };
};

export const PhoneFields: React.FC<PhoneFieldsProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  const phoneValidation = validatePhoneFormat(formData.phone);
  const showValidation = formData.phone.length > 0;

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
        <div className="relative">
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+34612345678"
            value={formData.phone} 
            onChange={e => onInputChange('phone', e.target.value)} 
            className={`${errors.phone || (!phoneValidation.isValid && showValidation) ? 'border-red-500' : showValidation && phoneValidation.isValid ? 'border-green-500' : ''}`}
            required 
          />
          {showValidation && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {phoneValidation.isValid ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          )}
        </div>
        
        {showValidation && (
          <div className={`text-xs flex items-center space-x-1 ${phoneValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {phoneValidation.isValid ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            <span>{phoneValidation.message}</span>
          </div>
        )}
        
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
    </>
  );
};
