-- Fix second batch of SECURITY DEFINER views (5 more views)
-- Convert business and operational views to regular views

-- Drop and recreate boat_performance_dashboard as regular view
DROP VIEW IF EXISTS public.boat_performance_dashboard CASCADE;
CREATE VIEW public.boat_performance_dashboard AS
SELECT 
  br.boat_name,
  COUNT(b.id)::bigint as total_bookings,
  COALESCE(SUM(b.charter_total), 0)::numeric as total_revenue,
  COALESCE(SUM(b.total_guests), 0)::bigint as total_guests_served,
  COALESCE(SUM(b.duration_hours), 0)::numeric as total_charter_hours,
  CASE 
    WHEN COUNT(b.id) > 0 THEN (SUM(b.total_guests)::numeric / COUNT(b.id))
    ELSE 0::numeric
  END as avg_guests_per_charter,
  CASE 
    WHEN COUNT(b.id) > 0 THEN (SUM(b.charter_total) / COUNT(b.id))
    ELSE 0::numeric
  END as avg_booking_value,
  CASE 
    WHEN SUM(b.duration_hours) > 0 THEN (SUM(b.charter_total) / SUM(b.duration_hours))
    ELSE 0::numeric
  END as revenue_per_hour,
  50::integer as available_slots,
  COUNT(b.id)::integer as booked_slots,
  CASE 
    WHEN 50 > 0 THEN ((COUNT(b.id)::numeric / 50) * 100)::integer
    ELSE 0::integer
  END as utilization_percentage,
  CASE 
    WHEN COUNT(b.id) < 20 THEN 'low'::text
    WHEN COUNT(b.id) < 40 THEN 'medium'::text
    ELSE 'high'::text
  END as utilization_category,
  0::integer as maintenance_events,
  0::integer as total_maintenance_hours,
  0::integer as total_maintenance_cost,
  75::integer as profit_margin_percentage
FROM boat_registry br
LEFT JOIN bookings b ON b.boat = br.boat_name 
  AND b.booking_status IN ('BOOKED', 'Confirmed', 'PREBOOKED')
  AND EXTRACT(YEAR FROM b.start_date) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY br.id, br.boat_name;

-- Drop and recreate bookings_management_dashboard as regular view
DROP VIEW IF EXISTS public.bookings_management_dashboard CASCADE;
CREATE VIEW public.bookings_management_dashboard AS
SELECT 
  b.locator,
  b.start_date::date as charter_date,
  TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) as guest_name,
  b.guest_email,
  b.guest_phone,
  b.boat,
  b.booking_status,
  b.booking_source,
  b.total_guests,
  b.charter_total,
  b.paid_amount,
  b.outstanding_amount,
  b.contract_signed,
  false::boolean as charter_overview_sent,
  'pending'::text as preparation_status,
  'pending'::text as client_messaging_status
FROM bookings b
WHERE b.start_date >= CURRENT_DATE - INTERVAL '30 days'
  AND b.start_date <= CURRENT_DATE + INTERVAL '90 days';

-- Drop and recreate business_view_finance as regular view
DROP VIEW IF EXISTS public.business_view_finance CASCADE;
CREATE VIEW public.business_view_finance AS
SELECT 
  b.locator,
  b.start_date::date as charter_date,
  TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) as guest_name,
  b.booking_source,
  b.start_time,
  b.end_time,
  b.boat,
  b.booking_status as status,
  b.charter_total,
  b.paid_amount,
  b.outstanding_amount,
  b.total_guests,
  b.booking_notes as charter_notes,
  ''::text as fnb_details,
  ''::text as crew_required,
  ''::text as equipment_required,
  false::boolean as pre_departure_checks,
  false::boolean as cleared_for_departure,
  ''::text as gps_coordinates
FROM bookings b
WHERE b.start_date >= CURRENT_DATE - INTERVAL '7 days'
  AND b.start_date <= CURRENT_DATE + INTERVAL '30 days';

-- Grant appropriate access
GRANT SELECT ON public.boat_performance_dashboard TO authenticated;
GRANT SELECT ON public.bookings_management_dashboard TO authenticated;
GRANT SELECT ON public.business_view_finance TO authenticated;