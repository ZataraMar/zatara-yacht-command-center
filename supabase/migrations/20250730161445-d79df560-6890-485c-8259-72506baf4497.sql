-- Critical Security Fix: Fix overly permissive RLS policies
-- Address the most dangerous security vulnerabilities identified

-- 1. Fix auth_tokens table - restrict to token owners only
DROP POLICY IF EXISTS "Users can manage their own tokens" ON auth_tokens;
CREATE POLICY "Users can manage their own tokens" ON auth_tokens
FOR ALL USING (user_id = auth.uid());

-- 2. Add proper restrictive policies where missing
-- Fix any overly permissive policies with qual:true

-- Ensure profiles table has proper role-based access
DROP POLICY IF EXISTS "Allow authenticated users to read own profile" ON profiles;
CREATE POLICY "Allow authenticated users to read own profile" ON profiles
FOR SELECT USING (id = auth.uid() OR is_staff_or_higher());

DROP POLICY IF EXISTS "Allow authenticated users to update own profile" ON profiles;
CREATE POLICY "Allow authenticated users to update own profile" ON profiles
FOR UPDATE USING (id = auth.uid() OR is_management_or_owner());

-- 3. Enhance security for sensitive tables
-- Ensure boat_registry has proper staff access only
ALTER TABLE boat_registry ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Staff access to boat registry" ON boat_registry;
CREATE POLICY "Staff access to boat registry" ON boat_registry
FOR ALL USING (is_staff_or_higher());

-- 4. Secure admin_settings table
DROP POLICY IF EXISTS "Management and owners only" ON admin_settings;
CREATE POLICY "Management and owners only" ON admin_settings
FOR ALL USING (is_management_or_owner());

-- 5. Add security monitoring triggers
-- Trigger for tracking policy violations
CREATE OR REPLACE FUNCTION public.log_policy_violation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    table_name, operation_type, user_id, 
    business_context, data_sensitivity, automated_change
  ) VALUES (
    TG_TABLE_NAME, 'POLICY_VIOLATION', auth.uid()::text,
    'RLS policy prevented unauthorized access attempt', 'high', true
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 6. Enhance audit logging for security events
-- Ensure all sensitive operations are logged
CREATE OR REPLACE FUNCTION public.enhanced_security_audit()
RETURNS TRIGGER AS $$
DECLARE
    sensitive_tables TEXT[] := ARRAY['profiles', 'admin_settings', 'boat_registry', 'bookings'];
    user_role_value TEXT;
BEGIN
    -- Only audit sensitive tables
    IF TG_TABLE_NAME = ANY(sensitive_tables) THEN
        -- Get current user role
        SELECT role::text INTO user_role_value 
        FROM public.profiles 
        WHERE id = auth.uid();
        
        INSERT INTO audit_logs (
            table_name, record_id, operation_type, 
            old_values, new_values, user_id, user_role,
            data_sensitivity, automated_change, created_at
        ) VALUES (
            TG_TABLE_NAME, 
            COALESCE(NEW.id::TEXT, OLD.id::TEXT, 'unknown'),
            TG_OP,
            CASE WHEN TG_OP != 'INSERT' THEN row_to_json(OLD) END,
            CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW) END,
            auth.uid()::text, 
            user_role_value,
            'high', 
            false, 
            NOW()
        );
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply enhanced audit trigger to sensitive tables
DROP TRIGGER IF EXISTS enhanced_security_audit_trigger ON profiles;
CREATE TRIGGER enhanced_security_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON profiles
    FOR EACH ROW EXECUTE FUNCTION enhanced_security_audit();

DROP TRIGGER IF EXISTS enhanced_security_audit_trigger ON admin_settings;
CREATE TRIGGER enhanced_security_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON admin_settings
    FOR EACH ROW EXECUTE FUNCTION enhanced_security_audit();

-- 7. Create security monitoring view (with proper SECURITY INVOKER)
CREATE OR REPLACE VIEW public.security_monitoring_dashboard AS
SELECT 
    DATE(created_at) as audit_date,
    table_name,
    operation_type,
    COUNT(*) as operation_count,
    COUNT(DISTINCT user_id) as unique_users,
    data_sensitivity,
    MAX(created_at) as last_operation
FROM audit_logs 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), table_name, operation_type, data_sensitivity
ORDER BY audit_date DESC, operation_count DESC;

-- Apply RLS to the monitoring view
ALTER VIEW security_monitoring_dashboard SET (security_invoker = true);

-- 8. Log the security fixes
INSERT INTO audit_logs (
    table_name, operation_type, new_values, user_id, 
    data_sensitivity, automated_change, business_context
) VALUES (
    'security_policies', 'SECURITY_HARDENING', 
    '{"action": "critical_security_fixes", "policies_updated": 5, "triggers_added": 2, "monitoring_enabled": true}',
    'system', 'critical', true, 
    'Critical security hardening: fixed overly permissive RLS policies and enhanced monitoring'
);