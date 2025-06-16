
// Authentication configuration for cruise.zatara.es
export const AUTH_CONFIG = {
  // Production URLs for cruise.zatara.es
  SITE_URL: 'https://cruise.zatara.es',
  REDIRECT_URLS: [
    'https://cruise.zatara.es',
    'https://cruise.zatara.es/auth',
    'https://cruise.zatara.es/dashboard',
    // Development fallback (current preview URL will need to be added in Supabase dashboard)
    window.location.origin,
    `${window.location.origin}/auth`,
    `${window.location.origin}/dashboard`
  ],
  
  // Email redirect configuration
  getEmailRedirectUrl: () => {
    // Use cruise.zatara.es in production, current origin in development
    if (window.location.hostname.includes('cruise.zatara.es')) {
      return 'https://cruise.zatara.es/dashboard';
    }
    return `${window.location.origin}/dashboard`;
  },
  
  // Password reset redirect
  getPasswordResetUrl: () => {
    if (window.location.hostname.includes('cruise.zatara.es')) {
      return 'https://cruise.zatara.es/auth?mode=reset';
    }
    return `${window.location.origin}/auth?mode=reset`;
  }
};

// Instructions for Supabase configuration
export const SUPABASE_CONFIG_INSTRUCTIONS = `
Configure these URLs in your Supabase Dashboard under Authentication > URL Configuration:

Site URL: https://cruise.zatara.es

Redirect URLs (add all of these):
- https://cruise.zatara.es/**
- ${window.location.origin}/**

For development, also add your current preview URL to the redirect URLs list.
`;
