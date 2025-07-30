import React, { useEffect, useState } from 'react';
import { generateCSRFToken, storeCSRFToken, validateCSRFToken, checkRateLimit, logSecurityEvent } from '@/utils/csrfProtection';
import { sanitizeInput } from '@/utils/inputValidation';
import { toast } from '@/hooks/use-toast';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData, csrfToken: string) => Promise<void> | void;
  formId: string;
  className?: string;
  maxAttempts?: number;
  windowMs?: number;
}

export const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  formId,
  className = '',
  maxAttempts = 5,
  windowMs = 300000 // 5 minutes
}) => {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Generate and store CSRF token
    const token = generateCSRFToken();
    setCsrfToken(token);
    storeCSRFToken(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Rate limiting check
    if (!checkRateLimit(formId, maxAttempts, windowMs)) {
      toast({
        title: 'Rate limit exceeded',
        description: 'Too many submission attempts. Please wait before trying again.',
        variant: 'destructive'
      });
      await logSecurityEvent('rate_limit_exceeded', 'form_submission', formId);
      return;
    }

    // CSRF validation
    if (!validateCSRFToken(csrfToken)) {
      toast({
        title: 'Security validation failed',
        description: 'Form security token is invalid. Please refresh and try again.',
        variant: 'destructive'
      });
      await logSecurityEvent('csrf_validation_failed', 'form_submission', formId);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Sanitize all form inputs
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          formData.set(key, sanitizeInput(value));
        }
      }

      await onSubmit(formData, csrfToken);
      
      // Generate new CSRF token after successful submission
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      storeCSRFToken(newToken);
      
      await logSecurityEvent('secure_form_submitted', 'form_submission', formId);
    } catch (error: any) {
      toast({
        title: 'Submission failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive'
      });
      await logSecurityEvent('form_submission_error', 'form_submission', formId, { error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* CSRF Token Hidden Field */}
      <input type="hidden" name="csrf_token" value={csrfToken} />
      
      {/* Form ID for tracking */}
      <input type="hidden" name="form_id" value={formId} />
      
      {children}
      
      {isSubmitting && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Processing securely...</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default SecureForm;