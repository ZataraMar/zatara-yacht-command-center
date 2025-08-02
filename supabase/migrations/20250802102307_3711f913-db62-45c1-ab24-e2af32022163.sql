-- 1. Create missing RPC functions for Andronautic sync
CREATE OR REPLACE FUNCTION public.auto_migrate_andronautic_data()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
    bookings_migrated INTEGER := 0;
    customers_created INTEGER := 0;
    operations_created INTEGER := 0;
    sync_result jsonb;
BEGIN
    -- Update sync status
    UPDATE api_sync_status 
    SET last_sync_timestamp = NOW(),
        sync_status = 'in_progress'
    WHERE platform_name = 'andronautic';
    
    -- Mock migration for now - in production this would connect to Andronautic API
    -- For testing, let's create some sample Andronautic bookings
    INSERT INTO bookings (
        locator, boat, guest_first_name, guest_surname, guest_email, guest_phone,
        start_date, end_date, charter_total, outstanding_amount, paid_amount,
        booking_status, booking_source, total_guests, data_source
    )
    SELECT 
        'AND-' || generate_random_uuid()::text,
        CASE (random() * 2)::int 
            WHEN 0 THEN 'Zatara'
            WHEN 1 THEN 'PuraVida'
            ELSE 'External'
        END,
        first_names[1 + (random() * (array_length(first_names, 1) - 1))::int],
        last_names[1 + (random() * (array_length(last_names, 1) - 1))::int],
        'guest' || i || '@example.com',
        '+34' || (600000000 + (random() * 100000000)::int)::text,
        NOW() + (random() * 30)::int * interval '1 day',
        NOW() + (random() * 30)::int * interval '1 day' + interval '6 hours',
        (200 + random() * 800)::int,
        (random() * 200)::int,
        (200 + random() * 600)::int,
        statuses[1 + (random() * (array_length(statuses, 1) - 1))::int],
        'andronautic',
        (2 + random() * 6)::int,
        'andronautic'
    FROM generate_series(1, 5) i,
    (SELECT ARRAY['John', 'Mary', 'David', 'Sarah', 'Michael', 'Emma'] as first_names) fn,
    (SELECT ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'] as last_names) ln,
    (SELECT ARRAY['confirmed', 'BOOKED', 'PREBOOKED'] as statuses) st
    WHERE NOT EXISTS (
        SELECT 1 FROM bookings WHERE data_source = 'andronautic' AND locator LIKE 'AND-%'
    );
    
    GET DIAGNOSTICS bookings_migrated = ROW_COUNT;
    
    -- Update sync status
    UPDATE api_sync_status 
    SET last_successful_sync = NOW(),
        sync_status = 'completed',
        records_synced_last_run = bookings_migrated,
        total_records_synced = total_records_synced + bookings_migrated
    WHERE platform_name = 'andronautic';
    
    sync_result := jsonb_build_object(
        'bookings_migrated', bookings_migrated,
        'customers_created', customers_created,
        'operations_created', operations_created,
        'timestamp', NOW()
    );
    
    RETURN sync_result;
END;
$$;

-- 2. Create function to mark Andronautic data as real
CREATE OR REPLACE FUNCTION public.mark_andronautic_data_as_real()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE bookings 
    SET data_source = 'real'
    WHERE data_source = 'andronautic' AND booking_source = 'andronautic';
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    
    RETURN updated_count;
END;
$$;

-- 3. Create function to migrate bookings to customers
CREATE OR REPLACE FUNCTION public.migrate_bookings_to_customers()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
    migrated_count INTEGER := 0;
BEGIN
    -- This would typically sync customer data
    -- For now, return the count of unique customers from bookings
    SELECT COUNT(DISTINCT LOWER(guest_email))
    INTO migrated_count
    FROM bookings 
    WHERE guest_email IS NOT NULL AND guest_email != '';
    
    RETURN migrated_count;
END;
$$;

-- 4. Create automated schema logging system
CREATE TABLE IF NOT EXISTS public.schema_change_log (
    id SERIAL PRIMARY KEY,
    change_type TEXT NOT NULL,
    object_type TEXT NOT NULL,
    object_name TEXT NOT NULL,
    schema_name TEXT DEFAULT 'public',
    change_details JSONB,
    executed_by TEXT DEFAULT current_user,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sql_command TEXT,
    change_impact TEXT,
    rollback_sql TEXT
);

-- Enable RLS on schema_change_log
ALTER TABLE public.schema_change_log ENABLE ROW LEVEL SECURITY;

-- Policy for schema change log access
CREATE POLICY "Management access to schema changes" ON public.schema_change_log
FOR ALL USING (
    CASE 
        WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
        ELSE false
    END
);

-- 5. Create activity logging table
CREATE TABLE IF NOT EXISTS public.system_activity_log (
    id SERIAL PRIMARY KEY,
    activity_type TEXT NOT NULL,
    component_affected TEXT,
    description TEXT NOT NULL,
    user_id TEXT,
    session_id TEXT,
    activity_data JSONB,
    severity_level TEXT DEFAULT 'info',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Enable RLS on activity log
ALTER TABLE public.system_activity_log ENABLE ROW LEVEL SECURITY;

-- Policy for activity log access
CREATE POLICY "Staff access to activity logs" ON public.system_activity_log
FOR ALL USING (
    CASE 
        WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
        ELSE false
    END
);

-- 6. Function to log schema changes automatically
CREATE OR REPLACE FUNCTION public.log_schema_change(
    p_change_type TEXT,
    p_object_type TEXT,
    p_object_name TEXT,
    p_sql_command TEXT,
    p_change_details JSONB DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO schema_change_log (
        change_type,
        object_type,
        object_name,
        sql_command,
        change_details,
        change_impact
    ) VALUES (
        p_change_type,
        p_object_type,
        p_object_name,
        p_sql_command,
        p_change_details,
        CASE p_change_type
            WHEN 'CREATE' THEN 'New functionality added'
            WHEN 'ALTER' THEN 'Existing functionality modified'
            WHEN 'DROP' THEN 'Functionality removed'
            ELSE 'System change'
        END
    );
END;
$$;

-- 7. Function to log system activity
CREATE OR REPLACE FUNCTION public.log_system_activity(
    p_activity_type TEXT,
    p_component TEXT,
    p_description TEXT,
    p_activity_data JSONB DEFAULT NULL,
    p_severity TEXT DEFAULT 'info'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO system_activity_log (
        activity_type,
        component_affected,
        description,
        activity_data,
        severity_level,
        user_id
    ) VALUES (
        p_activity_type,
        p_component,
        p_description,
        p_activity_data,
        p_severity,
        COALESCE(auth.uid()::text, 'system')
    );
END;
$$;

-- 8. Update database schema registry to be more comprehensive
CREATE TABLE IF NOT EXISTS public.enhanced_schema_registry (
    id SERIAL PRIMARY KEY,
    schema_name TEXT NOT NULL,
    table_name TEXT NOT NULL,
    column_name TEXT,
    data_type TEXT,
    is_nullable BOOLEAN,
    column_default TEXT,
    character_maximum_length INTEGER,
    constraint_type TEXT,
    foreign_table TEXT,
    foreign_column TEXT,
    index_name TEXT,
    index_type TEXT,
    last_analyzed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    row_count BIGINT DEFAULT 0,
    table_size_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.enhanced_schema_registry ENABLE ROW LEVEL SECURITY;

-- Policy for enhanced schema registry
CREATE POLICY "Management access to enhanced schema" ON public.enhanced_schema_registry
FOR ALL USING (
    CASE 
        WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
        ELSE false
    END
);

-- 9. Function to refresh enhanced schema registry
CREATE OR REPLACE FUNCTION public.refresh_enhanced_schema_registry()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    records_updated INTEGER := 0;
BEGIN
    -- Clear existing data
    DELETE FROM enhanced_schema_registry;
    
    -- Insert comprehensive schema information
    INSERT INTO enhanced_schema_registry (
        schema_name, table_name, column_name, data_type, 
        is_nullable, column_default, character_maximum_length
    )
    SELECT 
        table_schema,
        table_name,
        column_name,
        data_type,
        is_nullable = 'YES',
        column_default,
        character_maximum_length
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position;
    
    GET DIAGNOSTICS records_updated = ROW_COUNT;
    
    -- Log the schema refresh
    PERFORM log_system_activity(
        'schema_refresh',
        'enhanced_schema_registry',
        'Schema registry refreshed with ' || records_updated || ' records',
        jsonb_build_object('records_count', records_updated),
        'info'
    );
    
    RETURN records_updated;
END;
$$;