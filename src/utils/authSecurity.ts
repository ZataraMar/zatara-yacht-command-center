
import { supabase } from '@/integrations/supabase/client';

// Enhanced auth state cleanup to prevent limbo states
export const cleanupAuthState = () => {
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
};

// Secure sign-in with state cleanup
export const secureSignIn = async (email: string, password: string) => {
  try {
    // Clean up existing state
    cleanupAuthState();
    
    // Attempt global sign out to ensure clean state
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
      console.log('Global signout attempt completed');
    }
    
    // Sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Force page reload for clean state
      window.location.href = '/';
    }
    
    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Secure sign-up with proper role validation
export const secureSignUp = async (email: string, password: string, userData: any) => {
  const redirectUrl = `${window.location.origin}/`;
  
  // Validate role assignment - restrict management/owners roles
  const requestedRole = userData.role;
  const allowedPublicRoles = ['staff', 'charter_clients', 'boat_club_clients', 'charter_brokers'];
  
  if (!allowedPublicRoles.includes(requestedRole)) {
    userData.role = 'charter_clients'; // Default to safest role
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: userData
    }
  });
  
  return { data, error };
};

// Secure sign-out with cleanup
export const secureSignOut = async () => {
  try {
    // Clean up auth state first
    cleanupAuthState();
    
    // Attempt global sign out
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    // Force page reload for clean state
    window.location.href = '/auth';
  } catch (error) {
    console.error('Sign out error:', error);
    // Force navigation even if signout fails
    window.location.href = '/auth';
  }
};

// Role-based access control helpers
export const hasRole = (userRole: string | null, allowedRoles: string[]): boolean => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};

export const isManagementOrOwner = (userRole: string | null): boolean => {
  return hasRole(userRole, ['management', 'owners']);
};

export const isStaffOrHigher = (userRole: string | null): boolean => {
  return hasRole(userRole, ['staff', 'skippers', 'management', 'owners', 'casual_staff']);
};
