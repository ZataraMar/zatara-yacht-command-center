-- Fix RLS policies for landing_page_bookings table to allow public inserts from payment gateway

-- First check if table exists and drop existing conflicting policies
DROP POLICY IF EXISTS "Default security policy" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow anonymous booking submissions" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow public booking creation for payment gateway" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Staff can view all landing page bookings" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Staff can update landing page bookings" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Staff can delete landing page bookings" ON public.landing_page_bookings;

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.landing_page_bookings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_reference text UNIQUE,
    experience_type text NOT NULL,
    booking_date date NOT NULL,
    booking_time text NOT NULL,
    guest_count integer NOT NULL,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text,
    special_requests text,
    total_amount numeric NOT NULL,
    payment_status text DEFAULT 'pending',
    stripe_session_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on the table
ALTER TABLE public.landing_page_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies that allow public inserts but restrict other operations to staff
CREATE POLICY "Allow public booking creation" 
ON public.landing_page_bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Staff can view all landing page bookings" 
ON public.landing_page_bookings 
FOR SELECT 
USING (
    CASE 
        WHEN auth.role() = 'authenticated' THEN COALESCE(default_staff_access(), false)
        ELSE false 
    END
);

CREATE POLICY "Staff can update landing page bookings" 
ON public.landing_page_bookings 
FOR UPDATE 
USING (
    CASE 
        WHEN auth.role() = 'authenticated' THEN COALESCE(default_staff_access(), false)
        ELSE false 
    END
);

CREATE POLICY "Staff can delete landing page bookings" 
ON public.landing_page_bookings 
FOR DELETE 
USING (
    CASE 
        WHEN auth.role() = 'authenticated' THEN COALESCE(default_staff_access(), false)
        ELSE false 
    END
);

-- Create trigger for auto-generating booking reference if it doesn't exist
CREATE OR REPLACE FUNCTION public.generate_lp_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_reference IS NULL THEN
        NEW.booking_reference = 'MS-' || EXTRACT(EPOCH FROM NOW())::text;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_lp_booking_reference ON public.landing_page_bookings;
CREATE TRIGGER trigger_generate_lp_booking_reference
    BEFORE INSERT ON public.landing_page_bookings
    FOR EACH ROW
    EXECUTE FUNCTION generate_lp_booking_reference();

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_landing_page_bookings_created_at ON public.landing_page_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_landing_page_bookings_booking_reference ON public.landing_page_bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_landing_page_bookings_email ON public.landing_page_bookings(customer_email);