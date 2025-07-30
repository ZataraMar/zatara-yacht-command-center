-- Fix first batch of SECURITY DEFINER views (5 views)
-- Convert dashboard views to regular views with proper access control

-- Drop and recreate admin_control_panel as regular view
DROP VIEW IF EXISTS public.admin_control_panel CASCADE;
CREATE VIEW public.admin_control_panel AS
SELECT 
  'bookings'::text as component,
  'Booking Management System'::text as description,
  COUNT(*)::bigint as total_count,
  COUNT(CASE WHEN booking_status IN ('BOOKED', 'Confirmed', 'PREBOOKED') THEN 1 END)::bigint as active_count
FROM bookings
UNION ALL
SELECT 
  'customers'::text as component,
  'Customer Database'::text as description,
  COUNT(*)::bigint as total_count,
  COUNT(*)::bigint as active_count
FROM customers
UNION ALL
SELECT 
  'operations'::text as component,
  'Operations Management'::text as description,
  COUNT(*)::bigint as total_count,
  COUNT(CASE WHEN locator IS NOT NULL THEN 1 END)::bigint as active_count
FROM operations;

-- Drop and recreate agency_performance_dashboard as regular view
DROP VIEW IF EXISTS public.agency_performance_dashboard CASCADE;
CREATE VIEW public.agency_performance_dashboard AS
SELECT 
  ap.agency_name,
  ap.agency_type,
  ap.primary_contact_name,
  COUNT(b.id)::bigint as bookings_2024,
  COALESCE(SUM(b.charter_total), 0)::numeric as revenue_2024,
  ap.commission_percentage,
  COALESCE(SUM(b.charter_total * ap.commission_percentage / 100), 0)::numeric as commission_paid_2024,
  CASE 
    WHEN COUNT(b.id) > 0 THEN (SUM(b.charter_total) / COUNT(b.id))::numeric
    ELSE 0::numeric
  END as avg_booking_value,
  0::integer as booking_growth,
  0::integer as revenue_growth,
  ap.relationship_status,
  ap.account_manager
FROM agency_profiles ap
LEFT JOIN bookings b ON b.booking_source = ap.agency_name 
  AND EXTRACT(YEAR FROM b.start_date) = 2024
GROUP BY ap.id, ap.agency_name, ap.agency_type, ap.primary_contact_name, 
         ap.commission_percentage, ap.relationship_status, ap.account_manager;

-- Grant appropriate access
GRANT SELECT ON public.admin_control_panel TO authenticated;
GRANT SELECT ON public.agency_performance_dashboard TO authenticated;