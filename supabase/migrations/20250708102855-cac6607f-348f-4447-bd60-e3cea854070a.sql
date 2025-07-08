-- Enhanced security audit function
CREATE OR REPLACE FUNCTION public.comprehensive_security_audit()
RETURNS TABLE(
    check_type TEXT,
    check_name TEXT,
    status TEXT,
    severity TEXT,
    description TEXT,
    recommendation TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check for tables without RLS
    RETURN QUERY
    SELECT 
        'rls_coverage'::TEXT as check_type,
        'Missing RLS on: ' || schemaname || '.' || tablename as check_name,
        'FAIL'::TEXT as status,
        'HIGH'::TEXT as severity,
        'Table does not have Row Level Security enabled'::TEXT as description,
        'Enable RLS: ALTER TABLE ' || schemaname || '.' || tablename || ' ENABLE ROW LEVEL SECURITY;'::TEXT as recommendation
    FROM pg_tables 
    WHERE schemaname = 'public' 
      AND tablename NOT IN (
          SELECT tablename 
          FROM pg_tables t
          JOIN pg_class c ON c.relname = t.tablename
          WHERE c.relrowsecurity = true AND t.schemaname = 'public'
      );

    -- Check for tables with policies
    RETURN QUERY
    SELECT 
        'rls_policies'::TEXT as check_type,
        'RLS Enabled: ' || tablename as check_name,
        'PASS'::TEXT as status,
        'INFO'::TEXT as severity,
        'Table has Row Level Security policies'::TEXT as description,
        'Monitor policy effectiveness'::TEXT as recommendation
    FROM pg_policies 
    WHERE schemaname = 'public'
    GROUP BY tablename;

    -- Check authentication functions
    RETURN QUERY
    SELECT 
        'auth_functions'::TEXT as check_type,
        'Authentication Functions'::TEXT as check_name,
        CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END as status,
        CASE WHEN COUNT(*) > 0 THEN 'INFO' ELSE 'MEDIUM' END as severity,
        'Security definer functions: ' || COUNT(*)::TEXT as description,
        'Ensure functions use SECURITY DEFINER appropriately'::TEXT as recommendation
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
      AND p.prosecdef = true;

    -- Check for overly permissive policies
    RETURN QUERY
    SELECT 
        'permissive_policies'::TEXT as check_type,
        'Permissive Policy: ' || policyname as check_name,
        'WARN'::TEXT as status,
        'MEDIUM'::TEXT as severity,
        'Policy on ' || tablename || ' may be overly permissive'::TEXT as description,
        'Review policy: ' || policyname || ' on table ' || tablename as recommendation
    FROM pg_policies 
    WHERE schemaname = 'public'
      AND (qual = 'true' OR with_check = 'true');

END;
$$;