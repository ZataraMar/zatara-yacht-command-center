-- Fix RLS policies for landing_page_bookings table to allow public booking submissions

-- Drop all existing INSERT policies that are causing conflicts
DROP POLICY IF EXISTS "Allow anonymous booking creation" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow public booking creation for payment gateway" ON public.landing_page_bookings;
DROP POLICY IF EXISTS "Allow public booking creation" ON public.landing_page_bookings;

-- Create one simple INSERT policy that works across all browsers and devices
CREATE POLICY "Allow public booking submissions" 
ON public.landing_page_bookings 
FOR INSERT 
WITH CHECK (true);

-- Verify staff policies remain intact (these should already exist)
-- Staff can view all landing page bookings
-- Staff can update landing page bookings  
-- Staff can delete landing page bookings