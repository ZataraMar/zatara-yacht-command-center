-- Fix next 2 SECURITY DEFINER views: enhanced_booking_dashboard and financial_dashboard

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

-- Drop and recreate financial_dashboard without SECURITY DEFINER
DROP VIEW IF EXISTS public.financial_dashboard;

CREATE VIEW public.financial_dashboard AS
SELECT 
    'total_revenue' AS metric_name,
    COALESCE(SUM(charter_total), 0) AS metric_value,
    'EUR' AS metric_unit,
    CURRENT_DATE AS calculation_date
FROM bookings 
WHERE booking_status IN ('confirmed', 'booked', 'completed')
UNION ALL
SELECT 
    'outstanding_payments' AS metric_name,
    COALESCE(SUM(outstanding_amount), 0) AS metric_value,
    'EUR' AS metric_unit,
    CURRENT_DATE AS calculation_date
FROM bookings 
WHERE outstanding_amount > 0
UNION ALL
SELECT 
    'completed_bookings' AS metric_name,
    COUNT(*)::numeric AS metric_value,
    'bookings' AS metric_unit,
    CURRENT_DATE AS calculation_date
FROM bookings 
WHERE booking_status = 'completed';

-- Enable RLS on financial_dashboard
ALTER VIEW public.financial_dashboard SET (security_barrier = true);