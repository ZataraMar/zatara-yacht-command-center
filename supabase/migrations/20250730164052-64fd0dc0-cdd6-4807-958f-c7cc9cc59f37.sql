-- Clean up failed audit functions and fix critical RLS issues
-- Drop problematic audit functions
DROP FUNCTION IF EXISTS public.enhanced_security_audit() CASCADE;
DROP FUNCTION IF EXISTS public.track_security_violations(text, text, text, jsonb, jsonb) CASCADE;

-- Fix critical RLS policy for auth_tokens (currently allows all)
DROP POLICY IF EXISTS "Users can manage their own tokens" ON public.auth_tokens;
CREATE POLICY "Users can manage their own tokens" ON public.auth_tokens
FOR ALL USING (auth.uid() = user_id);

-- Fix overly permissive policies on profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view all profiles" ON public.profiles
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Fix admin_content policies (currently too permissive)
DROP POLICY IF EXISTS "Default security policy" ON public.admin_content;
CREATE POLICY "Staff can manage admin content" ON public.admin_content
FOR ALL USING (
  CASE 
    WHEN auth.role() = 'authenticated' THEN is_staff_or_higher()
    ELSE false
  END
);

-- Create basic security monitoring view without complex triggers
CREATE OR REPLACE VIEW public.security_summary AS
SELECT 
  'auth_tokens' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN expires_at < NOW() THEN 1 END) as expired_tokens
FROM auth_tokens
UNION ALL
SELECT 
  'profiles' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN role IN ('owner', 'management') THEN 1 END) as admin_users
FROM profiles;

-- Grant access to security summary for management
GRANT SELECT ON public.security_summary TO authenticated;