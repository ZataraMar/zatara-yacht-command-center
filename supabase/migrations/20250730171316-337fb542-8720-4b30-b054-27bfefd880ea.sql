-- Fix next 2 SECURITY DEFINER views: customer_profile_enriched and customer_summary_view

-- Drop and recreate customer_profile_enriched without SECURITY DEFINER
DROP VIEW IF EXISTS public.customer_profile_enriched;

CREATE VIEW public.customer_profile_enriched AS
SELECT 
    c.id,
    c.customer_key,
    c.first_name,
    c.last_name,
    c.full_name,
    c.email_primary,
    c.phone_primary,
    c.nationality,
    c.total_bookings,
    c.total_spent,
    c.last_booking_date,
    c.customer_lifetime_value,
    c.acquisition_source,
    c.acquisition_date,
    CASE 
        WHEN c.total_bookings >= 5 THEN 'VIP'
        WHEN c.total_bookings >= 3 THEN 'Premium'
        WHEN c.total_bookings >= 2 THEN 'Loyal'
        ELSE 'Standard'
    END AS customer_tier
FROM customers c;

-- Enable RLS on customer_profile_enriched
ALTER VIEW public.customer_profile_enriched SET (security_barrier = true);

-- Drop and recreate customer_summary_view without SECURITY DEFINER
DROP VIEW IF EXISTS public.customer_summary_view;

CREATE VIEW public.customer_summary_view AS
SELECT 
    c.id,
    c.full_name,
    c.email_primary,
    c.phone_primary,
    c.total_bookings,
    c.total_spent,
    c.last_booking_date,
    c.acquisition_source,
    EXTRACT(DAYS FROM (CURRENT_DATE - c.last_booking_date))::integer AS days_since_last_booking
FROM customers c
WHERE c.total_bookings > 0;

-- Enable RLS on customer_summary_view
ALTER VIEW public.customer_summary_view SET (security_barrier = true);