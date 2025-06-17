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

// Secure sign-up with proper role validation and enhanced error handling
export const secureSignUp = async (email: string, password: string, userData: any) => {
  const redirectUrl = `${window.location.origin}/`;
  
  // Validate role assignment - allow all account types
  const requestedRole = userData.role;
  const allowedRoles = ['charter_clients', 'boat_club_clients', 'agency', 'boat_owners'];
  
  if (!allowedRoles.includes(requestedRole)) {
    userData.role = 'charter_clients'; // Default to charter clients
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
    
    // Enhanced error handling for existing users
    if (error) {
      console.error('Signup error:', error.message);
      
      // Check for various user already exists scenarios
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

// SIMPLIFIED ROLE SYSTEM - OWNER GETS EVERYTHING
export const isOwner = (userRole: string | null): boolean => {
  return userRole === 'owner';
};

// For now, owner gets access to everything
export const hasFullAccess = (userRole: string | null): boolean => {
  return isOwner(userRole);
};

// Backward compatibility functions - simplified
export const isManagementOrOwner = (userRole: string | null): boolean => {
  return isOwner(userRole);
};

export const isStaffOrHigher = (userRole: string | null): boolean => {
  return isOwner(userRole);
};

export const isClientRole = (userRole: string | null): boolean => {
  return userRole === 'charter_clients' || userRole === 'boat_club_clients';
};

export const canManageUsers = (userRole: string | null): boolean => {
  return isOwner(userRole);
};

// Legacy function for compatibility
export const hasRole = (userRole: string | null, allowedRoles: string[]): boolean => {
  // If user is owner, they have access to everything
  if (isOwner(userRole)) return true;
  
  // Otherwise, only allow specific client roles
  return allowedRoles.includes(userRole || '');
};
