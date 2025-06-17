
-- Insert the owner profile for cruise@zatara.es
-- First, let's check if the user exists and get their ID
INSERT INTO public.profiles (id, first_name, last_name, email, role, active, company, phone)
SELECT 
  au.id,
  'Jules' as first_name,
  'Whiteway' as last_name,
  'cruise@zatara.es' as email,
  'owners'::user_role as role,
  true as active,
  'Zatara Mar' as company,
  NULL as phone
FROM auth.users au
WHERE au.email = 'cruise@zatara.es'
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role,
  company = EXCLUDED.company,
  active = EXCLUDED.active,
  updated_at = now();
