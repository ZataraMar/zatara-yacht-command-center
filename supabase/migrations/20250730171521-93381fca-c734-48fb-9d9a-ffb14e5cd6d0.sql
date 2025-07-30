-- Fix next 2 SECURITY DEFINER views: enhanced_boat_availability and enhanced_booking_dashboard

-- Drop and recreate enhanced_boat_availability without SECURITY DEFINER
DROP VIEW IF EXISTS public.enhanced_boat_availability;

CREATE VIEW public.enhanced_boat_availability AS
SELECT 
    ba.id,
    ba.boat_name,
    ba.availability_date,
    ba.time_slot_start,
    ba.time_slot_end,
    ba.availability_status,
    ba.base_price,
    ba.current_price,
    ba.capacity_guests,
    ba.minimum_duration_hours,
    ba.maximum_duration_hours,
    ba.booking_locator,
    ba.seasonal_availability,
    ba.weather_dependent
FROM boat_availability ba;

-- Enable RLS on enhanced_boat_availability
ALTER VIEW public.enhanced_boat_availability SET (security_barrier = true);

-- Drop and recreate enhanced_booking_dashboard without SECURITY DEFINER
DROP VIEW IF EXISTS public.enhanced_booking_dashboard;

CREATE VIEW public.enhanced_booking_dashboard AS
SELECT 
    b.locator,
    b.start_date::date AS charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) AS guest_name,
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
    b.confirmation_sent,
    CASE 
        WHEN b.outstanding_amount = 0 AND b.contract_signed = true THEN 'Complete'
        WHEN b.outstanding_amount > 0 THEN 'Payment Pending'
        WHEN b.contract_signed = false THEN 'Contract Pending'
        ELSE 'Processing'
    END AS preparation_status
FROM bookings b;

-- Enable RLS on enhanced_booking_dashboard
ALTER VIEW public.enhanced_booking_dashboard SET (security_barrier = true);