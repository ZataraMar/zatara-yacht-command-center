-- Create Web Pages Registry table
CREATE TABLE IF NOT EXISTS public.web_pages_registry (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_name character varying NOT NULL,
    page_path character varying NOT NULL,
    page_type character varying DEFAULT 'component',
    component_file_path text,
    page_description text,
    is_public boolean DEFAULT false,
    requires_auth boolean DEFAULT true,
    access_roles text[],
    parent_page_id uuid,
    page_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    last_modified timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(page_path)
);

-- Create Page Database Dependencies table
CREATE TABLE IF NOT EXISTS public.page_database_dependencies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id uuid REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
    table_name character varying NOT NULL,
    dependency_type character varying DEFAULT 'read',
    is_critical boolean DEFAULT false,
    usage_context text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create Page Relationships table
CREATE TABLE IF NOT EXISTS public.page_relationships (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_page_id uuid REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
    child_page_id uuid REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
    relationship_type character varying DEFAULT 'navigation',
    relationship_context text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(parent_page_id, child_page_id, relationship_type)
);

-- Create Page Development Status table
CREATE TABLE IF NOT EXISTS public.page_development_status (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id uuid REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
    development_status character varying DEFAULT 'active',
    priority_level character varying DEFAULT 'medium',
    assigned_developer character varying,
    completion_percentage integer DEFAULT 0,
    last_updated_by character varying,
    status_notes text,
    milestone_target date,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(page_id)
);

-- Create Page Performance Metrics table
CREATE TABLE IF NOT EXISTS public.page_performance_metrics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id uuid REFERENCES public.web_pages_registry(id) ON DELETE CASCADE,
    metric_date date DEFAULT CURRENT_DATE,
    load_time_ms integer,
    component_count integer,
    database_queries_count integer,
    bundle_size_kb integer,
    performance_score integer,
    accessibility_score integer,
    user_engagement_score integer,
    error_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(page_id, metric_date)
);

-- Enable RLS on all tables
ALTER TABLE public.web_pages_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_database_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_development_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for staff access
CREATE POLICY "Staff can manage web pages registry" 
ON public.web_pages_registry FOR ALL 
USING (CASE WHEN auth.role() = 'authenticated' THEN is_staff_or_higher() ELSE false END);

CREATE POLICY "Staff can manage page dependencies" 
ON public.page_database_dependencies FOR ALL 
USING (CASE WHEN auth.role() = 'authenticated' THEN is_staff_or_higher() ELSE false END);

CREATE POLICY "Staff can manage page relationships" 
ON public.page_relationships FOR ALL 
USING (CASE WHEN auth.role() = 'authenticated' THEN is_staff_or_higher() ELSE false END);

CREATE POLICY "Staff can manage page development status" 
ON public.page_development_status FOR ALL 
USING (CASE WHEN auth.role() = 'authenticated' THEN is_staff_or_higher() ELSE false END);

CREATE POLICY "Staff can view page performance metrics" 
ON public.page_performance_metrics FOR ALL 
USING (CASE WHEN auth.role() = 'authenticated' THEN is_staff_or_higher() ELSE false END);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_web_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_web_pages_registry_updated_at
    BEFORE UPDATE ON public.web_pages_registry
    FOR EACH ROW
    EXECUTE FUNCTION public.update_web_pages_updated_at();

CREATE TRIGGER update_page_dependencies_updated_at
    BEFORE UPDATE ON public.page_database_dependencies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_web_pages_updated_at();

CREATE TRIGGER update_page_relationships_updated_at
    BEFORE UPDATE ON public.page_relationships
    FOR EACH ROW
    EXECUTE FUNCTION public.update_web_pages_updated_at();

CREATE TRIGGER update_page_development_status_updated_at
    BEFORE UPDATE ON public.page_development_status
    FOR EACH ROW
    EXECUTE FUNCTION public.update_web_pages_updated_at();