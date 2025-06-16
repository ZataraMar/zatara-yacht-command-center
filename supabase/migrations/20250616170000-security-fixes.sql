
-- Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_management_or_owner()
RETURNS BOOLEAN 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('management', 'owners')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_staff_or_higher()
RETURNS BOOLEAN 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('staff', 'skippers', 'management', 'owners', 'casual_staff')
  );
$$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow authenticated users to view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated users to insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated users to update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated users to delete bookings" ON public.bookings;

-- Create secure RLS policies for bookings table
CREATE POLICY "Management can view all bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (public.is_management_or_owner());

CREATE POLICY "Staff can view bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (public.is_staff_or_higher());

CREATE POLICY "Management can insert bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (public.is_management_or_owner());

CREATE POLICY "Staff can insert bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (public.is_staff_or_higher());

CREATE POLICY "Management can update bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (public.is_management_or_owner());

CREATE POLICY "Staff can update operational fields" 
  ON public.bookings 
  FOR UPDATE 
  USING (public.is_staff_or_higher());

-- Secure business analytics and forecasting - management only
ALTER TABLE public.business_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_forecasting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_targets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Management only access to analytics" 
  ON public.business_analytics 
  FOR ALL 
  USING (public.is_management_or_owner());

CREATE POLICY "Management only access to forecasting" 
  ON public.business_forecasting 
  FOR ALL 
  USING (public.is_management_or_owner());

CREATE POLICY "Management only access to targets" 
  ON public.business_targets 
  FOR ALL 
  USING (public.is_management_or_owner());

-- Secure operational tables - staff and higher
ALTER TABLE public.charter_reconciliation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charter_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charter_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can access charter reconciliation" 
  ON public.charter_reconciliation 
  FOR ALL 
  USING (public.is_staff_or_higher());

CREATE POLICY "Staff can access operations" 
  ON public.operations 
  FOR ALL 
  USING (public.is_staff_or_higher());

CREATE POLICY "Staff can access charter checklist" 
  ON public.charter_checklist 
  FOR ALL 
  USING (public.is_staff_or_higher());

CREATE POLICY "Staff can access charter messages" 
  ON public.charter_messages 
  FOR ALL 
  USING (public.is_staff_or_higher());

-- Secure customer communications - staff can access
ALTER TABLE public.customer_communications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can access customer communications" 
  ON public.customer_communications 
  FOR ALL 
  USING (public.is_staff_or_higher());

-- Historical and raw data - management only
ALTER TABLE public.historical_charters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Management only access to historical charters" 
  ON public.historical_charters 
  FOR ALL 
  USING (public.is_management_or_owner());

CREATE POLICY "Management only access to raw bookings" 
  ON public.raw_bookings 
  FOR ALL 
  USING (public.is_management_or_owner());

CREATE POLICY "Management only access to raw invoices" 
  ON public.raw_invoices 
  FOR ALL 
  USING (public.is_management_or_owner());

CREATE POLICY "Management only access to seasonal performance" 
  ON public.seasonal_performance 
  FOR ALL 
  USING (public.is_management_or_owner());
