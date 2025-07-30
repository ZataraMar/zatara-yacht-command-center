-- Step 1: Enable RLS on tables that have policies but RLS disabled
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Step 2: Replace overly permissive booking policies with role-based access
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their role-specific data" ON public.bookings;

CREATE POLICY "Staff can access all bookings" ON public.bookings
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
    ELSE false
  END
);

CREATE POLICY "Charter clients can view their own bookings" ON public.bookings
FOR SELECT
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN (
      EXISTS(
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'charter_clients'
        AND guest_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
    ELSE false
  END
);

-- Step 3: Secure admin settings to management/owner only
DROP POLICY IF EXISTS "Admin settings management access" ON public.admin_settings;
DROP POLICY IF EXISTS "Default security policy" ON public.admin_settings;

CREATE POLICY "Management and owners only" ON public.admin_settings
FOR ALL 
USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
    ELSE false
  END
);

-- Step 4: Add role escalation prevention during signup
CREATE OR REPLACE FUNCTION public.prevent_role_escalation_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow certain roles for new signups
  IF NEW.role NOT IN ('charter_clients', 'boat_club_clients') THEN
    -- Check if current user has management privileges to assign other roles
    IF NOT (
      SELECT CASE 
        WHEN auth.role() = 'authenticated' THEN is_management_or_owner()
        ELSE false
      END
    ) THEN
      -- Default to charter_clients for public signups
      NEW.role = 'charter_clients';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for role escalation prevention on INSERT
DROP TRIGGER IF EXISTS prevent_signup_role_escalation ON public.profiles;
CREATE TRIGGER prevent_signup_role_escalation
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_escalation_signup();

-- Step 5: Enable comprehensive audit logging for sensitive tables
CREATE OR REPLACE FUNCTION public.enhanced_audit_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    record_id_value TEXT;
    user_role_value TEXT;
BEGIN
    -- Get current user role for context
    SELECT role::text INTO user_role_value 
    FROM public.profiles 
    WHERE id = auth.uid();
    
    -- Determine record ID based on table structure
    IF TG_TABLE_NAME = 'bookings' THEN
        record_id_value := COALESCE(NEW.id::TEXT, NEW.locator, 'unknown');
    ELSIF TG_TABLE_NAME = 'profiles' THEN
        record_id_value := COALESCE(NEW.id::TEXT, 'unknown');
    ELSE
        record_id_value := COALESCE(NEW.id::TEXT, 'unknown');
    END IF;

    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (
            table_name, record_id, operation_type, new_values,
            user_id, user_role, automated_change, data_sensitivity, created_at
        ) VALUES (
            TG_TABLE_NAME, record_id_value, TG_OP, row_to_json(NEW),
            auth.uid()::text, user_role_value, false, 'high', NOW()
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Handle OLD record ID for UPDATE
        IF TG_TABLE_NAME = 'bookings' THEN
            record_id_value := COALESCE(OLD.id::TEXT, OLD.locator, 'unknown');
        ELSIF TG_TABLE_NAME = 'profiles' THEN
            record_id_value := COALESCE(OLD.id::TEXT, 'unknown');
        ELSE
            record_id_value := COALESCE(OLD.id::TEXT, 'unknown');
        END IF;
        
        INSERT INTO audit_logs (
            table_name, record_id, operation_type, old_values, new_values,
            user_id, user_role, automated_change, data_sensitivity, created_at
        ) VALUES (
            TG_TABLE_NAME, record_id_value, TG_OP, row_to_json(OLD), row_to_json(NEW),
            auth.uid()::text, user_role_value, false, 'high', NOW()
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Handle OLD record ID for DELETE
        IF TG_TABLE_NAME = 'bookings' THEN
            record_id_value := COALESCE(OLD.id::TEXT, OLD.locator, 'unknown');
        ELSIF TG_TABLE_NAME = 'profiles' THEN
            record_id_value := COALESCE(OLD.id::TEXT, 'unknown');
        ELSE
            record_id_value := COALESCE(OLD.id::TEXT, 'unknown');
        END IF;
        
        INSERT INTO audit_logs (
            table_name, record_id, operation_type, old_values,
            user_id, user_role, automated_change, data_sensitivity, created_at
        ) VALUES (
            TG_TABLE_NAME, record_id_value, TG_OP, row_to_json(OLD),
            auth.uid()::text, user_role_value, false, 'high', NOW()
        );
        RETURN OLD;
    END IF;
END;
$$;

-- Apply enhanced audit triggers to sensitive tables
DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.profiles;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger();

DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.bookings;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger();