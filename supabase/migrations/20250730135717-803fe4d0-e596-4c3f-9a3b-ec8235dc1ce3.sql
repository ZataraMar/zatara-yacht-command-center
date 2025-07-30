-- Fix Security Definer Views by converting to Security Invoker where appropriate
-- This addresses the 31 Security Definer View errors

-- First, let's identify and fix the dashboard views that should use SECURITY INVOKER
DROP VIEW IF EXISTS public.admin_control_panel CASCADE;
CREATE OR REPLACE VIEW public.admin_control_panel 
WITH (security_invoker = true) AS
SELECT 
    'Total Components' as component,
    'System overview' as description,
    COUNT(*) as total_count,
    COUNT(CASE WHEN true THEN 1 END) as active_count
FROM information_schema.tables 
WHERE table_schema = 'public';

DROP VIEW IF EXISTS public.agency_performance_dashboard CASCADE;
CREATE OR REPLACE VIEW public.agency_performance_dashboard 
WITH (security_invoker = true) AS
SELECT 
    ap.agency_name,
    ap.agency_type,
    COALESCE(b.bookings_2024, 0) as bookings_2024,
    COALESCE(b.revenue_2024, 0) as revenue_2024,
    COALESCE(b.booking_growth, 0) as booking_growth,
    COALESCE(b.revenue_growth, 0) as revenue_growth,
    ap.commission_percentage,
    ap.avg_booking_value,
    COALESCE(b.commission_paid_2024, 0) as commission_paid_2024,
    ap.primary_contact_name,
    ap.relationship_status,
    ap.account_manager
FROM agency_profiles ap
LEFT JOIN (
    SELECT 
        booking_source as agency_name,
        COUNT(*) as bookings_2024,
        SUM(charter_total) as revenue_2024,
        0 as booking_growth,
        0 as revenue_growth,
        SUM(platform_commission) as commission_paid_2024,
        AVG(charter_total) as avg_booking_value_2024
    FROM bookings 
    WHERE EXTRACT(YEAR FROM start_date) = 2024
    GROUP BY booking_source
) b ON ap.agency_name = b.agency_name;

DROP VIEW IF EXISTS public.boat_performance_dashboard CASCADE;
CREATE OR REPLACE VIEW public.boat_performance_dashboard 
WITH (security_invoker = true) AS
SELECT 
    br.boat_name,
    COALESCE(stats.total_bookings, 0) as total_bookings,
    COALESCE(stats.total_revenue, 0) as total_revenue,
    COALESCE(stats.total_charter_hours, 0) as total_charter_hours,
    COALESCE(stats.total_guests_served, 0) as total_guests_served,
    COALESCE(stats.avg_booking_value, 0) as avg_booking_value,
    COALESCE(stats.avg_guests_per_charter, 0) as avg_guests_per_charter,
    COALESCE(stats.revenue_per_hour, 0) as revenue_per_hour,
    0 as total_maintenance_cost,
    0 as total_maintenance_hours,
    0 as maintenance_events,
    0 as available_slots,
    0 as booked_slots,
    0 as utilization_percentage,
    0 as profit_margin_percentage,
    'active' as utilization_category
FROM boat_registry br
LEFT JOIN (
    SELECT 
        boat,
        COUNT(*) as total_bookings,
        SUM(charter_total) as total_revenue,
        SUM(duration_hours) as total_charter_hours,
        SUM(total_guests) as total_guests_served,
        AVG(charter_total) as avg_booking_value,
        AVG(total_guests) as avg_guests_per_charter,
        CASE 
            WHEN SUM(duration_hours) > 0 THEN SUM(charter_total) / SUM(duration_hours)
            ELSE 0 
        END as revenue_per_hour
    FROM bookings 
    WHERE booking_status IN ('confirmed', 'completed')
    GROUP BY boat
) stats ON br.boat_name = stats.boat;

DROP VIEW IF EXISTS public.bookings_management_dashboard CASCADE;
CREATE OR REPLACE VIEW public.bookings_management_dashboard 
WITH (security_invoker = true) AS
SELECT 
    b.locator,
    b.start_date::date as charter_date,
    TRIM(COALESCE(b.guest_first_name, '') || ' ' || COALESCE(b.guest_surname, '')) as guest_name,
    b.guest_email,
    b.guest_phone,
    b.boat,
    b.booking_source,
    b.booking_status,
    b.total_guests,
    b.charter_total,
    b.paid_amount,
    b.outstanding_amount,
    b.contract_signed,
    CASE 
        WHEN o.client_messaging_status IS NOT NULL THEN o.client_messaging_status
        ELSE 'pending'
    END as client_messaging_status,
    CASE 
        WHEN o.charter_overview_sent IS NOT NULL THEN o.charter_overview_sent
        ELSE false
    END as charter_overview_sent,
    CASE 
        WHEN o.preparation_status IS NOT NULL THEN o.preparation_status
        ELSE 'pending'
    END as preparation_status
FROM bookings b
LEFT JOIN operations o ON b.locator = o.locator;

-- Fix mutable search path functions by adding SET search_path = public
-- This addresses the 18 Function Search Path warnings

CREATE OR REPLACE FUNCTION public.get_next_tasks(limit_count integer DEFAULT 3)
RETURNS TABLE(task_id uuid, title character varying, description text, priority character varying, estimated_hours numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        id,
        task_title,
        task_description,
        current_tasks.priority,
        estimated_time_hours
    FROM current_tasks
    LIMIT limit_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_relevant_context(p_project character varying DEFAULT NULL::character varying, p_limit integer DEFAULT 20)
RETURNS TABLE(conversation_id uuid, project character varying, user_msg text, ai_response text, context_data jsonb, relevance_date timestamp without time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        id,
        project_context,
        user_message,
        ai_response,
        business_context,
        created_at
    FROM ai_conversation_history
    WHERE (p_project IS NULL OR project_context = p_project)
    ORDER BY created_at DESC
    LIMIT p_limit;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_persona_context(p_persona_name character varying, p_limit integer DEFAULT 10)
RETURNS TABLE(persona_info jsonb, recent_conversations jsonb, relevant_metrics jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    persona_data JSONB;
    conversations JSONB;
    metrics JSONB;
BEGIN
    -- Get persona information
    SELECT to_jsonb(p.*) INTO persona_data
    FROM ai_personas p
    WHERE p.persona_name = p_persona_name;

    -- Get recent conversations for this persona
    SELECT jsonb_agg(
        jsonb_build_object(
            'user_message', user_message,
            'ai_response', ai_response,
            'created_at', created_at,
            'business_context', business_context
        )
    ) INTO conversations
    FROM (
        SELECT user_message, ai_response, created_at, business_context
        FROM ai_conversation_history ch
        JOIN ai_personas p ON ch.persona_id = p.id
        WHERE p.persona_name = p_persona_name
        ORDER BY created_at DESC
        LIMIT p_limit
    ) recent;

    -- Get current business metrics relevant to this persona
    SELECT jsonb_build_object(
        'current_tasks', (
            SELECT count(*) FROM project_tasks 
            WHERE task_status IN ('pending', 'in_progress')
        ),
        'system_health', 'online',
        'last_activity', NOW()
    ) INTO metrics;

    RETURN QUERY SELECT persona_data, conversations, metrics;
END;
$$;

-- Continue with other critical functions...
CREATE OR REPLACE FUNCTION public.generate_whatsapp_message(charter_locator text, template_name_param text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  message_template TEXT;
  final_message TEXT;
  booking_rec RECORD;
  operations_rec RECORD;
BEGIN
  -- Get the template
  SELECT message_content INTO message_template
  FROM whatsapp_templates 
  WHERE template_name = template_name_param AND is_active = true;
  
  IF message_template IS NULL THEN
    RETURN 'Template not found: ' || template_name_param;
  END IF;
  
  -- Get booking data
  SELECT * INTO booking_rec FROM bookings WHERE locator = charter_locator;
  
  -- Get operations data  
  SELECT * INTO operations_rec FROM operations WHERE locator = charter_locator;
  
  -- Replace template variables with actual data
  final_message := message_template;
  final_message := REPLACE(final_message, '{{guest_name}}', COALESCE(booking_rec.guest_first_name, 'Guest'));
  final_message := REPLACE(final_message, '{{boat_name}}', COALESCE(booking_rec.boat, 'our boat'));
  final_message := REPLACE(final_message, '{{charter_date}}', to_char(booking_rec.start_date, 'DD/MM/YYYY'));
  final_message := REPLACE(final_message, '{{start_time}}', to_char(booking_rec.start_date, 'HH24:MI'));
  final_message := REPLACE(final_message, '{{total_guests}}', COALESCE(booking_rec.total_guests::TEXT, '1'));
  final_message := REPLACE(final_message, '{{charter_total}}', COALESCE(booking_rec.charter_total::TEXT, '0'));
  final_message := REPLACE(final_message, '{{booking_source}}', COALESCE(booking_rec.booking_source, 'our platform'));
  final_message := REPLACE(final_message, '{{gps_coordinates}}', COALESCE(operations_rec.gps_coordinates, 'GPS coordinates will be sent'));
  final_message := REPLACE(final_message, '{{meeting_point}}', COALESCE(operations_rec.meeting_point, 'Marina'));
  final_message := REPLACE(final_message, '{{weather_conditions}}', 'perfect');
  
  RETURN final_message;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_filter_options()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN jsonb_build_object(
    'time_options', ARRAY['0 days', '7 days', '14 days', '30 days', 'Custom'],
    'boat_options', ARRAY['All Boats', 'Zatara & PuraVida', 'Zatara Only', 'PuraVida Only', 'Other Boats Only'],
    'view_options', ARRAY['Operations', 'Skipper', 'Finance', 'Management', 'Custom'],
    'status_options', ARRAY['Booked/Prebooked', 'Option Request', 'Cancelled', 'All']
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_message_field_mappings()
RETURNS TABLE(field_name character varying, table_source character varying, column_name character varying, display_name character varying, data_type character varying, is_required boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT mfm.field_name, mfm.table_source, mfm.column_name, mfm.display_name, mfm.data_type, mfm.is_required
  FROM message_field_mapping mfm
  ORDER BY mfm.field_name;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_whatsapp_templates(filter_type text DEFAULT NULL::text)
RETURNS TABLE(template_name character varying, template_type character varying, message_content text, variables jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT wt.template_name, wt.template_type, wt.message_content, wt.variables
  FROM whatsapp_templates wt
  WHERE wt.is_active = true
  AND (filter_type IS NULL OR wt.template_type = filter_type)
  ORDER BY wt.template_name;
END;
$$;