-- Fix first 2 SECURITY DEFINER views: admin_control_panel and admin_field_mappings

-- Drop and recreate admin_control_panel without SECURITY DEFINER
DROP VIEW IF EXISTS public.admin_control_panel;

CREATE VIEW public.admin_control_panel AS 
SELECT 
    'bookings'::text AS component,
    'Manage all booking data'::text AS description,
    (SELECT COUNT(*) FROM bookings)::bigint AS total_count,
    (SELECT COUNT(*) FROM bookings WHERE booking_status IN ('confirmed', 'booked'))::bigint AS active_count
UNION ALL
SELECT 
    'operations'::text AS component,
    'Operations management'::text AS description,
    (SELECT COUNT(*) FROM operations)::bigint AS total_count,
    (SELECT COUNT(*) FROM operations WHERE cleared_for_departure = true)::bigint AS active_count;

-- Enable RLS on admin_control_panel
ALTER VIEW public.admin_control_panel SET (security_barrier = true);

-- Drop and recreate admin_field_mappings without SECURITY DEFINER  
DROP VIEW IF EXISTS public.admin_field_mappings;

CREATE VIEW public.admin_field_mappings AS
SELECT 
    afm.id,
    afm.andronautic_field,
    afm.supabase_field,
    afm.field_type,
    afm.is_mapped,
    afm.transformation_rule,
    afm.default_value,
    afm.created_at,
    afm.updated_at
FROM andronautic_field_mappings afm;

-- Enable RLS on admin_field_mappings
ALTER VIEW public.admin_field_mappings SET (security_barrier = true);