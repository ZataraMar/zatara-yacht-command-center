-- Fix next 2 SECURITY DEFINER views: customer_analytics_view and customer_insights_dashboard

-- Drop and recreate customer_analytics_view without SECURITY DEFINER
DROP VIEW IF EXISTS public.customer_analytics_view;

CREATE VIEW public.customer_analytics_view AS
SELECT 
    c.id,
    c.customer_key,
    c.first_name,
    c.last_name,
    c.full_name,
    c.email_primary,
    c.phone_primary,
    c.total_bookings,
    c.total_spent,
    c.last_booking_date,
    c.customer_lifetime_value,
    c.acquisition_source,
    c.customer_segment
FROM customers c;

-- Enable RLS on customer_analytics_view
ALTER VIEW public.customer_analytics_view SET (security_barrier = true);

-- Drop and recreate customer_insights_dashboard without SECURITY DEFINER
DROP VIEW IF EXISTS public.customer_insights_dashboard;

CREATE VIEW public.customer_insights_dashboard AS
SELECT 
    'total_customers' AS metric_name,
    COUNT(*)::bigint AS metric_value,
    'customers'::text AS metric_unit
FROM customers
UNION ALL
SELECT 
    'repeat_customers' AS metric_name,
    COUNT(*)::bigint AS metric_value,
    'customers'::text AS metric_unit
FROM customers 
WHERE total_bookings > 1
UNION ALL
SELECT 
    'average_clv' AS metric_name,
    COALESCE(AVG(customer_lifetime_value), 0)::bigint AS metric_value,
    'EUR'::text AS metric_unit
FROM customers;

-- Enable RLS on customer_insights_dashboard
ALTER VIEW public.customer_insights_dashboard SET (security_barrier = true);