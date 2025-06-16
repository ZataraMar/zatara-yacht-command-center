
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM (
  'staff',
  'skippers', 
  'management',
  'owners',
  'casual_staff',
  'charter_brokers',
  'boat_owners',
  'charter_clients',
  'boat_club_clients'
);

-- Update profiles table with the specific roles
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role user_role DEFAULT 'staff',
  phone TEXT,
  company TEXT, -- For brokers, boat owners, etc.
  emergency_contact TEXT, -- For skippers and staff
  certifications TEXT[], -- For skippers (licenses, etc.)
  boat_access TEXT[], -- Which boats they can access
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies
-- Management and owners can see all profiles
CREATE POLICY "Management can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role IN ('management', 'owners')
    )
  );

-- Staff and skippers can see other staff and skippers
CREATE POLICY "Staff can view staff profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role IN ('staff', 'skippers', 'casual_staff')
    ) AND 
    role IN ('staff', 'skippers', 'casual_staff', 'management', 'owners')
  );

-- Clients can only see their own profile and basic staff info
CREATE POLICY "Clients can view limited profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    auth.uid() = id OR 
    (auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role IN ('charter_clients', 'boat_club_clients', 'charter_brokers', 'boat_owners')
    ) AND role IN ('staff', 'skippers', 'management'))
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Only management can insert new profiles
CREATE POLICY "Management can create profiles" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE role IN ('management', 'owners')
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email,
    COALESCE((new.raw_user_meta_data ->> 'role')::user_role, 'staff')
  );
  RETURN new;
END;
$$;

-- Trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add updated_at trigger
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
