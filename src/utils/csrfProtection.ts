// Enhanced CSRF Protection and Security Utilities
import { supabase } from '@/integrations/supabase/client';

export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const storeCSRFToken = (token: string): void => {
  sessionStorage.setItem('csrf_token', token);
};

export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken === token && token.length === 64;
};

export const clearCSRFToken = (): void => {
  sessionStorage.removeItem('csrf_token');
};

// Enhanced rate limiting with user-specific tracking
const submissionTimes: { [key: string]: number[] } = {};

export const checkRateLimit = (formId: string, maxAttempts: number = 5, windowMs: number = 300000): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!submissionTimes[formId]) {
    submissionTimes[formId] = [];
  }
  
  // Clean old attempts
  submissionTimes[formId] = submissionTimes[formId].filter(time => time > windowStart);
  
  if (submissionTimes[formId].length >= maxAttempts) {
    return false; // Rate limit exceeded
  }
  
  submissionTimes[formId].push(now);
  return true;
};

// Log security events to audit table
export const logSecurityEvent = async (
  actionType: string,
  tableAffected?: string,
  recordId?: string,
  details?: any
): Promise<void> => {
  try {
    await supabase.rpc('log_security_event', {
      p_action_type: actionType,
      p_table_affected: tableAffected,
      p_record_id: recordId,
      p_new_values: details ? JSON.stringify(details) : null
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

// Enhanced XSS protection
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Content Security Policy helper
export const setSecureHeaders = (): void => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://maps.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://*.supabase.co;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s+/g, ' ').trim();
  document.head.appendChild(meta);
};

// Enhanced session validation
export const validateSession = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      await logSecurityEvent('session_validation_failed');
      return false;
    }
    
    // Check if session is close to expiring
    const now = new Date().getTime() / 1000;
    const expiresAt = session.expires_at || 0;
    
    if (expiresAt - now < 300) { // Less than 5 minutes
      await logSecurityEvent('session_near_expiry');
    }
    
    return true;
  } catch (error) {
    await logSecurityEvent('session_validation_error', undefined, undefined, { error: error.message });
    return false;
  }
};