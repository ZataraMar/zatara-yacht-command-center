-- Create page role permissions table
CREATE TABLE public.page_role_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR NOT NULL,
  page_name VARCHAR NOT NULL,
  role_name VARCHAR NOT NULL,
  permission_type VARCHAR NOT NULL DEFAULT 'read',
  is_allowed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(page_path, role_name, permission_type)
);

-- Create permission templates table
CREATE TABLE public.permission_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name VARCHAR NOT NULL UNIQUE,
  template_description TEXT,
  role_permissions JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create permission audit log
CREATE TABLE public.permission_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR NOT NULL,
  role_name VARCHAR NOT NULL,
  permission_type VARCHAR NOT NULL,
  old_value BOOLEAN,
  new_value BOOLEAN NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  change_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Management can manage page permissions" 
ON public.page_role_permissions 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false 
  END
);

CREATE POLICY "Staff can view page permissions" 
ON public.page_role_permissions 
FOR SELECT 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
    ELSE false 
  END
);

CREATE POLICY "Management can manage templates" 
ON public.permission_templates 
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false 
  END
);

CREATE POLICY "Management can view audit logs" 
ON public.permission_audit_log 
FOR SELECT 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false 
  END
);

-- Function to check page permission
CREATE OR REPLACE FUNCTION public.has_page_permission(
  user_role TEXT,
  page_path TEXT,
  permission_type TEXT DEFAULT 'read'
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_allowed 
     FROM page_role_permissions 
     WHERE role_name = user_role 
     AND page_path = has_page_permission.page_path 
     AND permission_type = has_page_permission.permission_type),
    -- Default fallback to existing role system
    CASE 
      WHEN user_role IN ('owner', 'management') THEN true
      WHEN user_role IN ('staff', 'skippers', 'boat_owners') THEN true
      ELSE false
    END
  );
$$;

-- Function to grant page permission
CREATE OR REPLACE FUNCTION public.grant_page_permission(
  page_path TEXT,
  page_name TEXT,
  role_name TEXT,
  permission_type TEXT DEFAULT 'read'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  old_permission BOOLEAN;
BEGIN
  -- Get current permission
  SELECT is_allowed INTO old_permission
  FROM page_role_permissions 
  WHERE page_role_permissions.page_path = grant_page_permission.page_path 
  AND page_role_permissions.role_name = grant_page_permission.role_name
  AND page_role_permissions.permission_type = grant_page_permission.permission_type;
  
  -- Insert or update permission
  INSERT INTO page_role_permissions (page_path, page_name, role_name, permission_type, is_allowed, created_by)
  VALUES (page_path, page_name, role_name, permission_type, true, auth.uid())
  ON CONFLICT (page_path, role_name, permission_type)
  DO UPDATE SET 
    is_allowed = true,
    updated_at = now(),
    page_name = EXCLUDED.page_name;
  
  -- Log the change
  INSERT INTO permission_audit_log (page_path, role_name, permission_type, old_value, new_value, changed_by)
  VALUES (page_path, role_name, permission_type, COALESCE(old_permission, false), true, auth.uid());
END;
$$;

-- Function to revoke page permission
CREATE OR REPLACE FUNCTION public.revoke_page_permission(
  page_path TEXT,
  role_name TEXT,
  permission_type TEXT DEFAULT 'read'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  old_permission BOOLEAN;
BEGIN
  -- Get current permission
  SELECT is_allowed INTO old_permission
  FROM page_role_permissions 
  WHERE page_role_permissions.page_path = revoke_page_permission.page_path 
  AND page_role_permissions.role_name = revoke_page_permission.role_name
  AND page_role_permissions.permission_type = revoke_page_permission.permission_type;
  
  -- Update permission to false
  UPDATE page_role_permissions 
  SET is_allowed = false, updated_at = now()
  WHERE page_role_permissions.page_path = revoke_page_permission.page_path 
  AND page_role_permissions.role_name = revoke_page_permission.role_name
  AND page_role_permissions.permission_type = revoke_page_permission.permission_type;
  
  -- If no record exists, create one with false
  IF NOT FOUND THEN
    INSERT INTO page_role_permissions (page_path, page_name, role_name, permission_type, is_allowed, created_by)
    VALUES (page_path, 'Unknown Page', role_name, permission_type, false, auth.uid());
  END IF;
  
  -- Log the change
  INSERT INTO permission_audit_log (page_path, role_name, permission_type, old_value, new_value, changed_by)
  VALUES (page_path, role_name, permission_type, COALESCE(old_permission, true), false, auth.uid());
END;
$$;

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_permission_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_page_permissions_timestamp
  BEFORE UPDATE ON public.page_role_permissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_permission_timestamps();

CREATE TRIGGER update_permission_templates_timestamp
  BEFORE UPDATE ON public.permission_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_permission_timestamps();

-- Insert default permission templates
INSERT INTO public.permission_templates (template_name, template_description, role_permissions) VALUES 
('Full Admin Access', 'Complete access to all pages and functions', '{
  "owner": {"all": true},
  "management": {"all": true}
}'),
('Operations Team', 'Access to operations, fleet, and bookings', '{
  "staff": {"/dashboard/fleet": true, "/dashboard/operations": true, "/dashboard/bookings": true},
  "skippers": {"/dashboard/fleet": true, "/dashboard/operations": true}
}'),
('Client Portal', 'Limited access for charter clients', '{
  "charter_clients": {"/dashboard/bookings": true, "/dashboard/user-settings": true}
}'),
('Financial Team', 'Access to financial reports and analytics', '{
  "management": {"/dashboard/financials": true, "/dashboard/analytics": true}
}');