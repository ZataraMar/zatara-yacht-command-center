-- Fix next 2 SECURITY DEFINER views: charter_reconciliation_view and charters_2022

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

-- Drop and recreate charters_2022 without SECURITY DEFINER
DROP VIEW IF EXISTS public.charters_2022;

CREATE VIEW public.charters_2022 AS
SELECT 
    b.locator,
    b.start_date,
    b.end_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) AS guest_name,
    b.boat,
    b.booking_source,
    b.charter_total,
    b.total_guests,
    b.booking_status
FROM bookings b
WHERE EXTRACT(YEAR FROM b.start_date) = 2022;

-- Enable RLS on charters_2022
ALTER VIEW public.charters_2022 SET (security_barrier = true);