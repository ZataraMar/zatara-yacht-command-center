-- CRITICAL SECURITY FIXES - Phase 2: Fix remaining RLS issues

-- Enable RLS on all tables that still have RLS disabled
-- Based on linter errors, need to enable RLS on more tables

-- Check which tables still need RLS enabled and enable them
DO $$
DECLARE
    table_record RECORD;
BEGIN
    -- Get all tables in public schema without RLS enabled
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables t
        LEFT JOIN pg_class c ON c.relname = t.tablename AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = t.schemaname)
        WHERE schemaname = 'public' 
        AND (c.relrowsecurity IS FALSE OR c.relrowsecurity IS NULL)
        AND tablename NOT IN ('supabase_migrations', 'schema_migrations')
    LOOP
        -- Enable RLS for each table that doesn't have it
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_record.tablename);
        
        -- Add a default restrictive policy if the table doesn't have policies
        EXECUTE format('
            CREATE POLICY "Default security policy" 
            ON public.%I 
            FOR ALL 
            USING (default_staff_access())', 
            table_record.tablename);
            
        RAISE NOTICE 'Enabled RLS and added default policy for table: %', table_record.tablename;
    EXCEPTION WHEN OTHERS THEN
        -- Skip if policy already exists or other errors
        RAISE NOTICE 'Skipped table % due to: %', table_record.tablename, SQLERRM;
        CONTINUE;
    END LOOP;
END $$;

-- Fix remaining specific tables that were identified as having issues
-- These are tables that have policies but RLS disabled

-- Fix tables with existing policies but RLS disabled
ALTER TABLE IF EXISTS public.raw_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enhanced_boat_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.unavailabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.calendar_availability ENABLE ROW LEVEL SECURITY;

-- Add proper policies for these tables if they don't exist
CREATE POLICY IF NOT EXISTS "Staff access to raw bookings" 
ON public.raw_bookings 
FOR ALL 
USING (default_staff_access());

CREATE POLICY IF NOT EXISTS "Staff access to boat availability" 
ON public.enhanced_boat_availability 
FOR ALL 
USING (default_staff_access());

CREATE POLICY IF NOT EXISTS "Staff access to unavailabilities" 
ON public.unavailabilities 
FOR ALL 
USING (default_staff_access());

CREATE POLICY IF NOT EXISTS "Staff access to calendar availability" 
ON public.calendar_availability 
FOR ALL 
USING (default_staff_access());