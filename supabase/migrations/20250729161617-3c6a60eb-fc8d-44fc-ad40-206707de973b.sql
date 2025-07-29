-- CRITICAL SECURITY FIXES - Phase 2: Fix remaining RLS issues

-- Enable RLS on critical tables that still have it disabled
ALTER TABLE IF EXISTS public.raw_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enhanced_boat_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.unavailabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.calendar_availability ENABLE ROW LEVEL SECURITY;

-- Add proper policies for these tables (drop existing and recreate to avoid conflicts)
DROP POLICY IF EXISTS "Staff access to raw bookings" ON public.raw_bookings;
CREATE POLICY "Staff access to raw bookings" 
ON public.raw_bookings 
FOR ALL 
USING (default_staff_access());

DROP POLICY IF EXISTS "Staff access to boat availability" ON public.enhanced_boat_availability;
CREATE POLICY "Staff access to boat availability" 
ON public.enhanced_boat_availability 
FOR ALL 
USING (default_staff_access());

DROP POLICY IF EXISTS "Staff access to unavailabilities" ON public.unavailabilities;
CREATE POLICY "Staff access to unavailabilities" 
ON public.unavailabilities 
FOR ALL 
USING (default_staff_access());

DROP POLICY IF EXISTS "Staff access to calendar availability" ON public.calendar_availability;
CREATE POLICY "Staff access to calendar availability" 
ON public.calendar_availability 
FOR ALL 
USING (default_staff_access());

-- Enable RLS on other critical tables that may not have it
ALTER TABLE IF EXISTS public.business_forecasting ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.business_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.customer_history ENABLE ROW LEVEL SECURITY;

-- Add policies for these tables
DROP POLICY IF EXISTS "Management access to forecasting" ON public.business_forecasting;
CREATE POLICY "Management access to forecasting" 
ON public.business_forecasting 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

DROP POLICY IF EXISTS "Management access to targets" ON public.business_targets;
CREATE POLICY "Management access to targets" 
ON public.business_targets 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

DROP POLICY IF EXISTS "Staff access to operations" ON public.operations;
CREATE POLICY "Staff access to operations" 
ON public.operations 
FOR ALL 
USING (default_staff_access());

DROP POLICY IF EXISTS "Staff access to customers" ON public.customers;
CREATE POLICY "Staff access to customers" 
ON public.customers 
FOR ALL 
USING (default_staff_access());

DROP POLICY IF EXISTS "Staff access to customer history" ON public.customer_history;
CREATE POLICY "Staff access to customer history" 
ON public.customer_history 
FOR ALL 
USING (default_staff_access());