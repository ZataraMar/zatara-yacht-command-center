-- 1. Drop and recreate the auto_migrate function
DROP FUNCTION IF EXISTS public.auto_migrate_andronautic_data();

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
        'AND-' || gen_random_uuid()::text,
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

-- 2. Test the sync function
SELECT auto_migrate_andronautic_data();