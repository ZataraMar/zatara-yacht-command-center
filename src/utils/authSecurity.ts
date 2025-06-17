
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
  const allowedRoles = ['charter_clients', 'boat_club_clients', 'agency', 'team'];
  
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

// Define role hierarchy levels
const ROLE_LEVELS = {
  'owners': 100,
  'management': 80,
  'team': 60,
  'agency': 60,
  'skippers': 50,
  'staff': 40,
  'casual_staff': 30,
  'charter_clients': 20,
  'boat_club_clients': 20
};

// Enhanced role-based access control with hierarchy
export const hasRole = (userRole: string | null, allowedRoles: string[]): boolean => {
  if (!userRole) return false;
  
  const userLevel = ROLE_LEVELS[userRole as keyof typeof ROLE_LEVELS] || 0;
  
  // Check if user role is directly in allowed roles
  if (allowedRoles.includes(userRole)) return true;
  
  // Check if user has sufficient hierarchy level for any allowed role
  return allowedRoles.some(role => {
    const requiredLevel = ROLE_LEVELS[role as keyof typeof ROLE_LEVELS] || 0;
    return userLevel >= requiredLevel;
  });
};

export const isOwner = (userRole: string | null): boolean => {
  return userRole === 'owners';
};

export const isManagementOrOwner = (userRole: string | null): boolean => {
  return hasRole(userRole, ['management', 'owners']);
};

export const isStaffOrHigher = (userRole: string | null): boolean => {
  return hasRole(userRole, ['staff', 'skippers', 'management', 'owners', 'casual_staff', 'team']);
};

export const isClientRole = (userRole: string | null): boolean => {
  return hasRole(userRole, ['charter_clients', 'boat_club_clients']);
};

export const isAgencyOrTeam = (userRole: string | null): boolean => {
  return hasRole(userRole, ['agency', 'team']);
};

export const canManageUsers = (userRole: string | null): boolean => {
  return hasRole(userRole, ['owners', 'management']);
};
