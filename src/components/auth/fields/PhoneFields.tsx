
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageCircle, Mail } from 'lucide-react';

interface PhoneFieldsProps {
  formData: {
    phone: string;
    whatsappEnabled: boolean;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string | boolean) => void;
}

export const PhoneFields: React.FC<PhoneFieldsProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <>
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
    </>
  );
};
