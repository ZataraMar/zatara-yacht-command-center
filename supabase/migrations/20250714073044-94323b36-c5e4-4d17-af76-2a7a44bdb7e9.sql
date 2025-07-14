-- Fix RLS policies for landing_page_bookings table to allow payment gateway bookings

-- Drop ALL existing policies to start clean
DROP POLICY IF EXISTS "Default security policy" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow anonymous booking submissions" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow public booking creation for payment gateway" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow public booking creation" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Staff can view all landing page bookings" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Staff can update landing page bookings" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Staff can delete landing page bookings" ON public.landing_page_bookings;

-- Create new comprehensive policies for landing_page_bookings
CREATE POLICY "Allow public booking creation for payment gateway" 
ON public.landing_page_bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Staff can view all landing page bookings" 
ON public.landing_page_bookings 
FOR SELECT 
USING (default_staff_access());

CREATE POLICY "Staff can update landing page bookings" 
ON public.landing_page_bookings 
FOR UPDATE 
USING (default_staff_access());

CREATE POLICY "Staff can delete landing page bookings" 
ON public.landing_page_bookings 
FOR DELETE 
USING (default_staff_access());

-- Add index for performance on booking lookups
CREATE INDEX IF NOT EXISTS idx_landing_page_bookings_created_at ON public.landing_page_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_landing_page_bookings_booking_reference ON public.landing_page_bookings(booking_reference);