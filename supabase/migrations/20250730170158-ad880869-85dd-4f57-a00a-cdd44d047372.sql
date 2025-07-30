-- Fix next 2 SECURITY DEFINER views: charter_reconciliation_view and comprehensive_analytics_dashboard

-- Drop and recreate charter_reconciliation_view without SECURITY DEFINER
DROP VIEW IF EXISTS public.charter_reconciliation_view;

CREATE VIEW public.charter_reconciliation_view AS
SELECT 
    b.locator,
    b.start_date::date AS charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) AS guest_full_name,
    b.boat,
    b.booking_source,
    b.charter_total,
    b.outstanding_amount,
    b.paid_amount,
    (b.charter_total - COALESCE(b.paid_amount, 0)) AS balance_due,
    CASE 
        WHEN b.outstanding_amount = 0 THEN 'paid'
        WHEN b.outstanding_amount > 0 THEN 'outstanding'
        ELSE 'overpaid'
    END AS payment_status
FROM bookings b;

-- Enable RLS on charter_reconciliation_view
ALTER VIEW public.charter_reconciliation_view SET (security_barrier = true);

-- Drop and recreate comprehensive_analytics_dashboard without SECURITY DEFINER
DROP VIEW IF EXISTS public.comprehensive_analytics_dashboard;

CREATE VIEW public.comprehensive_analytics_dashboard AS
SELECT 
    'bookings' AS metric_category,
    COUNT(*)::bigint AS total_count,
    COALESCE(SUM(charter_total), 0) AS total_value,
    COALESCE(AVG(charter_total), 0) AS average_value
FROM bookings
WHERE booking_status IN ('confirmed', 'booked')
UNION ALL
SELECT 
    'revenue' AS metric_category,
    COUNT(*)::bigint AS total_count,
    COALESCE(SUM(charter_total), 0) AS total_value,
    COALESCE(AVG(charter_total), 0) AS average_value
FROM bookings
WHERE paid_amount > 0;

-- Enable RLS on comprehensive_analytics_dashboard
ALTER VIEW public.comprehensive_analytics_dashboard SET (security_barrier = true);