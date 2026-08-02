-- =====================================================
-- 1. Create Profiles Table (User Roles)
-- =====================================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'doctor', 'reception', 'coordinator', 'donor')) DEFAULT 'donor',
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Admins can read and update all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );

CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );

CREATE POLICY "Admins can insert all profiles" ON public.profiles
    FOR INSERT WITH CHECK (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- =====================================================
-- 2. Trigger to automatically create a profile on signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'donor') -- Default to donor unless specified
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================
-- 3. Staff Logs Table (سجلات الطاقم)
-- =====================================================
CREATE TABLE public.staff_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- The role of the user who made the log (e.g., 'doctor', 'reception')
    action_type TEXT NOT NULL, -- e.g., 'patient_check', 'visitor_entry'
    details JSONB NOT NULL, -- Flexible data structure for different roles
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.staff_logs ENABLE ROW LEVEL SECURITY;

-- Users can read their own logs
CREATE POLICY "Staff can view own logs" ON public.staff_logs
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can read all logs
CREATE POLICY "Admins can view all logs" ON public.staff_logs
    FOR SELECT USING (
        (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );

-- Staff can insert their own logs
CREATE POLICY "Staff can insert own logs" ON public.staff_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4. Update existing donations table (Optional link to user)
-- =====================================================
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
