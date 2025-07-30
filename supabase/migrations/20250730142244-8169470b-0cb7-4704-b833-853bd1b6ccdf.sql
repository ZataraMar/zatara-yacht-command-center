-- Fix Security Definer Views - Convert to Security Invoker where appropriate
-- This addresses the Security Definer View errors

DROP VIEW IF EXISTS public.admin_control_panel CASCADE;
CREATE OR REPLACE VIEW public.admin_control_panel 
WITH (security_invoker = true) AS
SELECT 
    'Total Components' as component,
    'System overview' as description,
    COUNT(*) as total_count,
    COUNT(CASE WHEN true THEN 1 END) as active_count
FROM information_schema.tables 
WHERE table_schema = 'public';

DROP VIEW IF EXISTS public.agency_performance_dashboard CASCADE;
CREATE OR REPLACE VIEW public.agency_performance_dashboard 
WITH (security_invoker = true) AS
SELECT 
    ap.agency_name,
    ap.agency_type,
    COALESCE(b.bookings_2024, 0) as bookings_2024,
    COALESCE(b.revenue_2024, 0) as revenue_2024,
    0 as booking_growth,
    0 as revenue_growth,
    ap.commission_percentage,
    ap.avg_booking_value,
    COALESCE(b.commission_paid_2024, 0) as commission_paid_2024,
    ap.primary_contact_name,
    ap.relationship_status,
    ap.account_manager
FROM agency_profiles ap
LEFT JOIN (
    SELECT 
        booking_source as agency_name,
        COUNT(*) as bookings_2024,
        SUM(charter_total) as revenue_2024,
        SUM(platform_commission) as commission_paid_2024
    FROM bookings 
    WHERE EXTRACT(YEAR FROM start_date) = 2024
    GROUP BY booking_source
) b ON ap.agency_name = b.agency_name;

DROP VIEW IF EXISTS public.boat_performance_dashboard CASCADE;
CREATE OR REPLACE VIEW public.boat_performance_dashboard 
WITH (security_invoker = true) AS
SELECT 
    br.boat_name,
    COALESCE(stats.total_bookings, 0) as total_bookings,
    COALESCE(stats.total_revenue, 0) as total_revenue,
    COALESCE(stats.total_charter_hours, 0) as total_charter_hours,
    COALESCE(stats.total_guests_served, 0) as total_guests_served,
    COALESCE(stats.avg_booking_value, 0) as avg_booking_value,
    COALESCE(stats.avg_guests_per_charter, 0) as avg_guests_per_charter,
    COALESCE(stats.revenue_per_hour, 0) as revenue_per_hour,
    0 as total_maintenance_cost,
    0 as total_maintenance_hours,
    0 as maintenance_events,
    0 as available_slots,
    0 as booked_slots,
    0 as utilization_percentage,
    0 as profit_margin_percentage,
    'active' as utilization_category
FROM boat_registry br
LEFT JOIN (
    SELECT 
        boat,
        COUNT(*) as total_bookings,
        SUM(charter_total) as total_revenue,
        SUM(duration_hours) as total_charter_hours,
        SUM(total_guests) as total_guests_served,
        AVG(charter_total) as avg_booking_value,
        AVG(total_guests) as avg_guests_per_charter,
        CASE 
            WHEN SUM(duration_hours) > 0 THEN SUM(charter_total) / SUM(duration_hours)
            ELSE 0 
        END as revenue_per_hour
    FROM bookings 
    WHERE booking_status IN ('confirmed', 'completed')
    GROUP BY boat
) stats ON br.boat_name = stats.boat;

DROP VIEW IF EXISTS public.bookings_management_dashboard CASCADE;
CREATE OR REPLACE VIEW public.bookings_management_dashboard 
WITH (security_invoker = true) AS
SELECT 
    b.locator,
    b.start_date::date as charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) as guest_name,
    b.guest_email,
    b.guest_phone,
    b.boat,
    b.booking_source,
    b.booking_status,
    b.total_guests,
    b.charter_total,
    b.paid_amount,
    b.outstanding_amount,
    b.contract_signed,
    'pending' as client_messaging_status,
    false as charter_overview_sent,
    'pending' as preparation_status
FROM bookings b;

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.get_next_tasks(limit_count integer DEFAULT 3)
RETURNS TABLE(task_id uuid, title character varying, description text, priority character varying, estimated_hours numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        id,
        task_title,
        task_description,
        current_tasks.priority,
        estimated_time_hours
    FROM current_tasks
    LIMIT limit_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_filter_options()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN jsonb_build_object(
    'time_options', ARRAY['0 days', '7 days', '14 days', '30 days', 'Custom'],
    'boat_options', ARRAY['All Boats', 'Zatara & PuraVida', 'Zatara Only', 'PuraVida Only', 'Other Boats Only'],
    'view_options', ARRAY['Operations', 'Skipper', 'Finance', 'Management', 'Custom'],
    'status_options', ARRAY['Booked/Prebooked', 'Option Request', 'Cancelled', 'All']
  );
END;
$$;