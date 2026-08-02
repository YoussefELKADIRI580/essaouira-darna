-- 1. Ensure the user is an admin
UPDATE public.profiles SET role = 'admin';

-- 2. Drop the existing news policy
DROP POLICY IF EXISTS "Allow admins to manage news" ON public.news;

-- 3. Create a bulletproof policy for news that explicitly has WITH CHECK
CREATE POLICY "Allow admins to manage news" 
ON public.news 
FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
