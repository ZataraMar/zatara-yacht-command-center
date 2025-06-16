
import { useState } from 'react';
import { signInSchema, signUpSchema, sanitizeInput } from '@/utils/inputValidation';

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  whatsappEnabled: boolean;
  role: string;
  rememberMe: boolean;
}

export const useAuthForm = (isLogin: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    whatsappEnabled: false,
    role: 'charter_clients',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const schema = isLogin ? signInSchema : signUpSchema;
    const dataToValidate = isLogin ? {
      email: formData.email,
      password: formData.password
    } : formData;
    
    // Check password confirmation for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return false;
    }
    
    // Additional real-time phone validation for signup
    if (!isLogin) {
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(formData.phone)) {
        setErrors({ phone: 'Please enter a valid international phone number' });
        return false;
      }
    }
    
    try {
      schema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (typeof value === 'string') {
      const sanitizedValue = sanitizeInput(value);
      setFormData(prev => ({
        ...prev,
        [field]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Clear confirm password error when either password field changes
    if ((field === 'password' || field === 'confirmPassword') && errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
  };

  return {
    formData,
    errors,
    validateForm,
    handleInputChange,
    setFormData
  };
};
