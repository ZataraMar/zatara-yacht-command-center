-- Create web pages registry table
CREATE TABLE public.web_pages_registry (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path character varying NOT NULL UNIQUE,
  page_name character varying NOT NULL,
  page_type character varying NOT NULL DEFAULT 'component', -- component, page, layout, public, dashboard
  page_category character varying, -- dashboard, public, auth, admin, etc.
  component_file_path text NOT NULL,
  route_pattern character varying,
  is_protected boolean DEFAULT false,
  required_role character varying,
  parent_page_id uuid REFERENCES public.web_pages_registry(id),
  meta_title character varying,
  meta_description text,
  seo_keywords text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  last_accessed timestamp with time zone,
  access_count integer DEFAULT 0
);

-- Create page database dependencies table
CREATE TABLE public.page_database_dependencies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id uuid NOT NULL REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
  table_name character varying NOT NULL,
  dependency_type character varying NOT NULL, -- read, write, both
  query_type character varying, -- select, insert, update, delete, rpc
  hook_or_service character varying,
  is_critical boolean DEFAULT false,
  performance_impact character varying DEFAULT 'low', -- low, medium, high
  created_at timestamp with time zone DEFAULT now()
);

-- Create page relationships table
CREATE TABLE public.page_relationships (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_page_id uuid NOT NULL REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
  child_page_id uuid NOT NULL REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
  relationship_type character varying NOT NULL, -- navigation, redirect, modal, component
  relationship_description text,
  is_primary_navigation boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(parent_page_id, child_page_id, relationship_type)
);

-- Create page development status table
CREATE TABLE public.page_development_status (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id uuid NOT NULL REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
  development_status character varying NOT NULL DEFAULT 'in_development', -- completed, in_development, needs_review, deprecated
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  assigned_developer character varying,
  priority_level character varying DEFAULT 'medium', -- low, medium, high, critical
  estimated_hours numeric,
  actual_hours numeric,
  todo_items jsonb DEFAULT '[]'::jsonb,
  known_issues jsonb DEFAULT '[]'::jsonb,
  feature_requests jsonb DEFAULT '[]'::jsonb,
  last_update_notes text,
  target_completion_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create page performance metrics table
CREATE TABLE public.page_performance_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id uuid NOT NULL REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
  metric_date date NOT NULL DEFAULT CURRENT_DATE,
  load_time_ms integer,
  bundle_size_kb integer,
  lighthouse_score integer CHECK (lighthouse_score >= 0 AND lighthouse_score <= 100),
  core_web_vitals jsonb,
  error_count integer DEFAULT 0,
  user_satisfaction_score numeric CHECK (user_satisfaction_score >= 0 AND user_satisfaction_score <= 5),
  bounce_rate numeric,
  conversion_rate numeric,
  accessibility_score integer CHECK (accessibility_score >= 0 AND accessibility_score <= 100),
  seo_score integer CHECK (seo_score >= 0 AND seo_score <= 100),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(page_id, metric_date)
);

-- Enable RLS on all tables
ALTER TABLE public.web_pages_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_database_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_development_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (management access only)
CREATE POLICY "Management can manage web pages registry" ON public.web_pages_registry
FOR ALL USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage page dependencies" ON public.page_database_dependencies
FOR ALL USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage page relationships" ON public.page_relationships
FOR ALL USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage page development status" ON public.page_development_status
FOR ALL USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

CREATE POLICY "Management can manage page performance metrics" ON public.page_performance_metrics
FOR ALL USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Create function to auto-discover and register pages
CREATE OR REPLACE FUNCTION public.discover_and_register_pages()
RETURNS TABLE(page_path text, status text, details text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pages_data RECORD;
BEGIN
  -- Define known pages structure
  FOR pages_data IN 
    VALUES 
      ('/dashboard', 'Dashboard Home', 'page', 'dashboard', 'src/pages/Dashboard.tsx', '/dashboard', true, 'staff'),
      ('/dashboard/operations', 'Operations Center', 'page', 'dashboard', 'src/components/dashboard/operations/EnhancedBusinessViewDashboard.tsx', '/dashboard/operations', true, 'staff'),
      ('/dashboard/fleet', 'Fleet Management', 'page', 'dashboard', 'src/components/dashboard/fleet/FleetOverview.tsx', '/dashboard/fleet', true, 'staff'),
      ('/dashboard/team', 'Team Management', 'page', 'dashboard', 'src/components/dashboard/team/StaffManagement.tsx', '/dashboard/team', true, 'staff'),
      ('/dashboard/crm', 'CRM Dashboard', 'page', 'dashboard', 'src/components/dashboard/crm/CRMDashboard.tsx', '/dashboard/crm', true, 'staff'),
      ('/dashboard/analytics', 'Business Analytics', 'page', 'dashboard', 'src/components/dashboard/analytics/AdvancedReporting.tsx', '/dashboard/analytics', true, 'staff'),
      ('/dashboard/financials', 'Financial Overview', 'page', 'dashboard', 'src/components/dashboard/financial/AdvancedFinancials.tsx', '/dashboard/financials', true, 'staff'),
      ('/dashboard/bookings', 'Bookings Center', 'page', 'dashboard', 'src/components/dashboard/crm/BookingsCenter.tsx', '/dashboard/bookings', true, 'charter_clients'),
      ('/dashboard/admin/users', 'User Management', 'page', 'admin', 'src/components/dashboard/admin/UserManagement.tsx', '/dashboard/admin/users', true, 'management'),
      ('/dashboard/admin/system', 'System Overview', 'page', 'admin', 'src/components/dashboard/admin/SystemOverviewDashboard.tsx', '/dashboard/admin/system', true, 'owner'),
      ('/dashboard/database-schema', 'Database Schema Manager', 'page', 'admin', 'src/components/dashboard/admin/DatabaseSchemaManager.tsx', '/dashboard/database-schema', true, 'owner'),
      ('/', 'Public Homepage', 'page', 'public', 'src/pages/public/Homepage.tsx', '/', false, null),
      ('/charter', 'Charter Services', 'page', 'public', 'src/pages/public/Charter.tsx', '/charter', false, null),
      ('/boat-club', 'Boat Club', 'page', 'public', 'src/pages/public/BoatClub.tsx', '/boat-club', false, null),
      ('/sales', 'Sales & Partnerships', 'page', 'public', 'src/pages/public/Sales.tsx', '/sales', false, null),
      ('/management', 'Management Services', 'page', 'public', 'src/pages/public/Management.tsx', '/management', false, null),
      ('/guides', 'Travel Guides', 'page', 'public', 'src/pages/public/Guides.tsx', '/guides', false, null),
      ('/auth', 'Authentication', 'page', 'auth', 'src/pages/Auth.tsx', '/auth', false, null),
      ('/experiences/mallorcan-sailing', 'Mallorcan Sailing Experience', 'page', 'public', 'src/pages/public/experiences/MallorcanSailing.tsx', '/experiences/mallorcan-sailing', false, null)
    AS t(page_path, page_name, page_type, page_category, component_file_path, route_pattern, is_protected, required_role)
  LOOP
    INSERT INTO web_pages_registry (
      page_path, page_name, page_type, page_category, 
      component_file_path, route_pattern, is_protected, required_role
    ) VALUES (
      pages_data.page_path, pages_data.page_name, pages_data.page_type, pages_data.page_category,
      pages_data.component_file_path, pages_data.route_pattern, pages_data.is_protected, pages_data.required_role
    ) ON CONFLICT (page_path) DO UPDATE SET
      page_name = EXCLUDED.page_name,
      page_type = EXCLUDED.page_type,
      page_category = EXCLUDED.page_category,
      component_file_path = EXCLUDED.component_file_path,
      route_pattern = EXCLUDED.route_pattern,
      is_protected = EXCLUDED.is_protected,
      required_role = EXCLUDED.required_role,
      updated_at = now();
      
    RETURN QUERY SELECT pages_data.page_path::text, 'registered'::text, 'Page discovered and registered'::text;
  END LOOP;
END;
$$;

-- Create function to analyze page performance
CREATE OR REPLACE FUNCTION public.analyze_page_performance()
RETURNS TABLE(page_path text, performance_score integer, recommendations text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    wpr.page_path::text,
    COALESCE(ppm.lighthouse_score, 0)::integer,
    CASE 
      WHEN COALESCE(ppm.lighthouse_score, 0) < 50 THEN 'Critical: Needs immediate optimization'
      WHEN COALESCE(ppm.lighthouse_score, 0) < 80 THEN 'Warning: Performance improvements needed'
      ELSE 'Good: Performance within acceptable range'
    END::text
  FROM web_pages_registry wpr
  LEFT JOIN page_performance_metrics ppm ON wpr.id = ppm.page_id 
    AND ppm.metric_date = CURRENT_DATE
  ORDER BY COALESCE(ppm.lighthouse_score, 0) ASC;
END;
$$;

-- Create triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_web_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_web_pages_registry_updated_at
  BEFORE UPDATE ON public.web_pages_registry
  FOR EACH ROW
  EXECUTE FUNCTION public.update_web_pages_updated_at();

CREATE TRIGGER update_page_development_status_updated_at
  BEFORE UPDATE ON public.page_development_status
  FOR EACH ROW
  EXECUTE FUNCTION public.update_web_pages_updated_at();

-- Run initial page discovery
SELECT * FROM discover_and_register_pages();