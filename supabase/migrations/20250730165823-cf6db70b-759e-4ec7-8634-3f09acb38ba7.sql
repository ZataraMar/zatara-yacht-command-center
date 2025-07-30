-- Fix next 2 SECURITY DEFINER views: business_view_operations and business_view_puravida_skipper

-- Drop and recreate business_view_operations without SECURITY DEFINER
DROP VIEW IF EXISTS public.business_view_operations;

CREATE VIEW public.business_view_operations AS
SELECT 
    b.locator,
    b.start_date::date AS charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) AS guest_name,
    b.booking_source,
    b.start_time,
    b.end_time,
    b.boat,
    b.booking_status AS status,
    b.charter_total,
    o.fnb_details,
    o.crew_required,
    o.equipment_required,
    o.charter_notes,
    o.pre_departure_checks,
    o.cleared_for_departure,
    o.gps_coordinates,
    b.total_guests,
    b.paid_amount,
    b.outstanding_amount
FROM bookings b
LEFT JOIN operations o ON b.locator = o.locator;

-- Enable RLS on business_view_operations
ALTER VIEW public.business_view_operations SET (security_barrier = true);

-- Drop and recreate business_view_puravida_skipper without SECURITY DEFINER
DROP VIEW IF EXISTS public.business_view_puravida_skipper;

CREATE VIEW public.business_view_puravida_skipper AS
SELECT 
    b.locator,
    b.start_date::date AS charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) AS guest_full_name,
    b.guest_phone,
    b.start_time,
    b.end_time,
    b.total_guests,
    b.booking_status,
    o.charter_notes,
    o.fnb_details,
    o.equipment_required,
    o.pre_departure_checks,
    o.cleared_for_departure,
    o.gps_coordinates,
    b.boat
FROM bookings b
LEFT JOIN operations o ON b.locator = o.locator
WHERE b.boat = 'PuraVida';

-- Enable RLS on business_view_puravida_skipper
ALTER VIEW public.business_view_puravida_skipper SET (security_barrier = true);