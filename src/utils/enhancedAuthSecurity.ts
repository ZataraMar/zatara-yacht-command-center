
import { supabase } from '@/integrations/supabase/client';
import { AUTH_CONFIG } from './authConfig';

// Enhanced auth state cleanup with cruise.zatara.es support
export const enhancedCleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
  
  // Clear any Zatara-specific tokens
  localStorage.removeItem('zatara_auth_state');
  localStorage.removeItem('zatara_user_preferences');
};

// Enhanced secure sign-in with proper URL configuration
export const enhancedSecureSignIn = async (email: string, password: string) => {
  try {
    // Clean up existing state
    enhancedCleanupAuthState();
    
    // Attempt global sign out to ensure clean state
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.log('Global signout attempt completed');
    }
    
    // Sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Redirect to appropriate URL based on environment
      const redirectUrl = AUTH_CONFIG.getEmailRedirectUrl();
      window.location.href = redirectUrl;
    }
    
    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Enhanced secure sign-up with cruise.zatara.es configuration
export const enhancedSecureSignUp = async (email: string, password: string, userData: any) => {
  const redirectUrl = AUTH_CONFIG.getEmailRedirectUrl();
  
  // Validate role assignment
  const requestedRole = userData.role;
  const allowedRoles = ['charter_clients', 'boat_club_clients', 'agency', 'team'];
  
  if (!allowedRoles.includes(requestedRole)) {
    userData.role = 'charter_clients';
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });
    
    if (error) {
      console.error('Signup error:', error.message);
      
      if (error.message.includes('already') || 
          error.message.includes('registered') ||
          error.message.includes('User already registered')) {
        return { 
          data: null, 
          error: { 
            ...error, 
            message: 'User already registered' 
          } 
        };
      }
    }
    
    return { data, error };
  } catch (error: any) {
    console.error('Signup exception:', error);
    return { data: null, error };
  }
};

// Enhanced secure sign-out with proper cleanup
export const enhancedSecureSignOut = async () => {
  try {
    // Clean up auth state first
    enhancedCleanupAuthState();
    
    // Attempt global sign out
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    // Redirect to auth page
    window.location.href = '/auth';
  } catch (error) {
    console.error('Sign out error:', error);
    // Force navigation even if signout fails
    window.location.href = '/auth';
  }
};
