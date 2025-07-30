-- Fix next 2 SECURITY DEFINER views: business_view_zatara_skipper and calendar_availability

-- Drop and recreate business_view_zatara_skipper without SECURITY DEFINER
DROP VIEW IF EXISTS public.business_view_zatara_skipper;

CREATE VIEW public.business_view_zatara_skipper AS
SELECT 
    b.locator,
    b.start_date::date AS charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) AS guest_full_name,
    b.guest_phone,
    b.start_time,
    b.end_time,
    b.total_guests,
    b.booking_status,
    b.booking_notes AS charter_notes,
    ''::text AS fnb_details,
    ''::text AS equipment_required,
    false AS pre_departure_checks,
    false AS cleared_for_departure,
    ''::text AS gps_coordinates,
    b.boat
FROM bookings b
WHERE b.boat = 'Zatara';

-- Enable RLS on business_view_zatara_skipper
ALTER VIEW public.business_view_zatara_skipper SET (security_barrier = true);

-- Drop and recreate calendar_availability without SECURITY DEFINER
DROP VIEW IF EXISTS public.calendar_availability;

CREATE VIEW public.calendar_availability AS
SELECT 
    ba.boat_name,
    ba.availability_date AS calendar_date,
    ba.time_slot_start AS start_time,
    ba.time_slot_end AS end_time,
    ba.availability_status,
    COALESCE(ba.booking_locator, '') AS blocking_reason,
    'boat_availability' AS source
FROM boat_availability ba;

-- Enable RLS on calendar_availability
ALTER VIEW public.calendar_availability SET (security_barrier = true);