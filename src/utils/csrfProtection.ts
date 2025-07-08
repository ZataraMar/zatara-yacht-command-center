// CSRF Protection utility for forms
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

// Rate limiting for forms (simple client-side protection)
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