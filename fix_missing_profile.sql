-- 1. Ensure all authenticated users have a profile and are set as 'admin'
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';

-- 2. Double check the news policy
DROP POLICY IF EXISTS "Allow admins to manage news" ON public.news;

CREATE POLICY "Allow admins to manage news" 
ON public.news 
FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
