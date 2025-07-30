-- Phase 1A: Critical Security Fixes - Enable RLS on tables with policies but no RLS

-- First, let's enable RLS on all tables that have policies but RLS is disabled
-- These are the tables identified by the linter as having policies but RLS disabled

-- Enable RLS on core tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boat_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boat_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on financial and sensitive tables
ALTER TABLE public.seasonal_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_forecasting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_invoices ENABLE ROW LEVEL SECURITY;

-- Enable RLS on admin and configuration tables
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_field_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_bookings ENABLE ROW LEVEL SECURITY;

-- Enable RLS on audit and security tables
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_import_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_availability ENABLE ROW LEVEL SECURITY;

-- Create missing essential policies for core tables that need them

-- Bookings: Allow staff and higher to access all, clients to access their own
CREATE POLICY "Staff can access all bookings" ON public.bookings
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

-- Operations: Staff access only
CREATE POLICY "Staff can access operations" ON public.operations
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

-- Customers: Staff can access all
CREATE POLICY "Staff can access customer data" ON public.customers
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

-- Customer History: Staff access
CREATE POLICY "Staff can access customer history" ON public.customer_history
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

-- Profiles: Users can see their own, staff can see all
CREATE POLICY "Users can manage their own profile" ON public.profiles
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN (auth.uid() = id OR is_staff_or_higher())
      ELSE false
    END
  );

-- Financial data: Management only
CREATE POLICY "Management can access seasonal performance" ON public.seasonal_performance
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

CREATE POLICY "Management can access business forecasting" ON public.business_forecasting
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

CREATE POLICY "Management can access business targets" ON public.business_targets
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

-- Raw data: Management only
CREATE POLICY "Management can access raw bookings" ON public.raw_bookings
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

CREATE POLICY "Management can access raw invoices" ON public.raw_invoices
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

-- Admin templates and configuration: Staff access
CREATE POLICY "Staff can access whatsapp templates" ON public.whatsapp_templates
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

CREATE POLICY "Staff can access message field mapping" ON public.message_field_mapping
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

-- Landing page bookings: Staff access
CREATE POLICY "Staff can access landing page bookings" ON public.landing_page_bookings
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );

-- Audit logs: Management only
CREATE POLICY "Management can access user activity logs" ON public.user_activity_logs
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

CREATE POLICY "Management can access data import logs" ON public.data_import_logs
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
      ELSE false
    END
  );

-- Calendar availability: Staff access
CREATE POLICY "Staff can access calendar availability" ON public.calendar_availability
  FOR ALL USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
      ELSE false
    END
  );