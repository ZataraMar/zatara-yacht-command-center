-- Fix overly permissive RLS policies - Replace 'true' conditions with proper staff access

-- Fix business analytics tables
DROP POLICY IF EXISTS "Allow authenticated users full access" ON business_analytics;
CREATE POLICY "Staff can manage business analytics" ON business_analytics
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Allow authenticated users full access" ON business_forecasting;
CREATE POLICY "Staff can manage business forecasting" ON business_forecasting
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Allow authenticated users full access" ON business_targets;
CREATE POLICY "Staff can manage business targets" ON business_targets
FOR ALL USING (default_staff_access());

-- Fix charter management tables
DROP POLICY IF EXISTS "Allow authenticated users full access" ON charter_checklist;
CREATE POLICY "Staff can manage charter checklist" ON charter_checklist
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Allow authenticated users full access" ON charter_messages;
CREATE POLICY "Staff can manage charter messages" ON charter_messages
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Allow authenticated users full access" ON charter_reconciliation;
CREATE POLICY "Staff can manage charter reconciliation" ON charter_reconciliation
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Allow authenticated users full access" ON charters_2022;
CREATE POLICY "Staff can manage historical charters" ON charters_2022
FOR ALL USING (default_staff_access());

-- Fix communications
DROP POLICY IF EXISTS "Users can manage all communications" ON communications;
CREATE POLICY "Staff can manage communications" ON communications
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Allow authenticated users full access" ON customer_communications;
CREATE POLICY "Staff can manage customer communications" ON customer_communications
FOR ALL USING (default_staff_access());

-- Fix operations
DROP POLICY IF EXISTS "Allow authenticated users full access" ON operations;
CREATE POLICY "Staff can manage operations" ON operations
FOR ALL USING (default_staff_access());

-- Fix raw data tables (critical - contains sensitive booking/invoice data)
DROP POLICY IF EXISTS "Allow authenticated users full access" ON raw_bookings;
DROP POLICY IF EXISTS "Allow authenticated users to read raw_bookings" ON raw_bookings;
DROP POLICY IF EXISTS "Allow service role full access to raw_bookings" ON raw_bookings;
CREATE POLICY "Management only access to raw bookings" ON raw_bookings
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    WHEN auth.role() = 'service_role' THEN true
    ELSE false
  END
);

DROP POLICY IF EXISTS "Allow authenticated users full access" ON raw_invoices;
DROP POLICY IF EXISTS "Allow authenticated users to read raw_invoices" ON raw_invoices;
DROP POLICY IF EXISTS "Allow service role full access to raw_invoices" ON raw_invoices;
CREATE POLICY "Management only access to raw invoices" ON raw_invoices
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    WHEN auth.role() = 'service_role' THEN true
    ELSE false
  END
);

-- Fix seasonal performance
DROP POLICY IF EXISTS "Allow authenticated users full access" ON seasonal_performance;
CREATE POLICY "Staff can manage seasonal performance" ON seasonal_performance
FOR ALL USING (default_staff_access());

-- Fix financial tables
DROP POLICY IF EXISTS "Admin access to checkout sessions" ON stripe_checkout_sessions;
CREATE POLICY "Management only access to checkout sessions" ON stripe_checkout_sessions
FOR ALL USING (
  CASE
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Fix task management
DROP POLICY IF EXISTS "Users can manage all subtasks" ON subtasks;
CREATE POLICY "Staff can manage subtasks" ON subtasks
FOR ALL USING (default_staff_access());

DROP POLICY IF EXISTS "Users can manage all tasks" ON tasks;
CREATE POLICY "Staff can manage tasks" ON tasks
FOR ALL USING (default_staff_access());

-- Fix media management
DROP POLICY IF EXISTS "Users can manage all media" ON media;
CREATE POLICY "Staff can manage media" ON media
FOR ALL USING (default_staff_access());

-- Fix people management
DROP POLICY IF EXISTS "Users can view all people" ON people;
CREATE POLICY "Staff can manage people" ON people
FOR ALL USING (default_staff_access());

-- Fix historical charters
DROP POLICY IF EXISTS "Allow authenticated users full access" ON historical_charters;
CREATE POLICY "Staff can manage historical charters" ON historical_charters
FOR ALL USING (default_staff_access());