-- CRITICAL SECURITY FIXES - Phase 1: Database Security and RLS

-- 1. Enable RLS on tables that have policies but RLS disabled
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;

-- 2. Fix overly permissive policies - Replace 'true' policies with proper access control

-- Fix admin_settings - remove blanket 'true' policy and replace with proper access control
DROP POLICY IF EXISTS "Admin settings access" ON public.admin_settings;
CREATE POLICY "Admin settings management access" 
ON public.admin_settings 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Fix profiles table - prevent role escalation attacks
-- First drop existing policies
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create separate policies for different operations
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile (no role changes)" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add role change protection via trigger (since OLD/NEW refs don't work in RLS)
CREATE OR REPLACE FUNCTION prevent_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow role changes by management or owner
  IF OLD.role != NEW.role THEN
    -- Check if current user has management privileges
    IF NOT (
      SELECT CASE 
        WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
        ELSE false
      END
    ) THEN
      RAISE EXCEPTION 'Only management can change user roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to prevent role escalation
DROP TRIGGER IF EXISTS trigger_prevent_role_escalation ON public.profiles;
CREATE TRIGGER trigger_prevent_role_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION prevent_role_escalation();

-- Add separate policy for role management by admins only
CREATE POLICY "Management can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Fix raw_invoices - financial data should be restricted
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.raw_invoices;
CREATE POLICY "Management access to financial data" 
ON public.raw_invoices 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Fix user_activity_logs - should be restricted to appropriate roles
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.user_activity_logs;
CREATE POLICY "Staff access to activity logs" 
ON public.user_activity_logs 
FOR ALL 
USING (default_staff_access());

-- Fix seasonal_performance - business data should be restricted
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.seasonal_performance;
CREATE POLICY "Management access to performance data" 
ON public.seasonal_performance 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Add audit logging for sensitive operations
CREATE TABLE IF NOT EXISTS public.security_audit_history (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL,
  table_affected TEXT,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit table
ALTER TABLE public.security_audit_history ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admin access to security audit logs" 
ON public.security_audit_history 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_action_type TEXT,
  p_table_affected TEXT DEFAULT NULL,
  p_record_id TEXT DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_history (
    user_id,
    action_type,
    table_affected,
    record_id,
    old_values,
    new_values,
    created_at
  ) VALUES (
    auth.uid(),
    p_action_type,
    p_table_affected,
    p_record_id,
    p_old_values,
    p_new_values,
    NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;