-- 1. Create a function to bypass RLS and check if the user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the problematic news policy
DROP POLICY IF EXISTS "Allow admins to manage news" ON public.news;

-- 3. Create the new safe policy for news
CREATE POLICY "Allow admins to manage news" 
ON public.news FOR ALL 
USING (public.is_admin());

-- 4. Fix the profiles policies that were causing the infinite loop
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can insert all profiles" ON public.profiles
    FOR INSERT WITH CHECK (public.is_admin());
