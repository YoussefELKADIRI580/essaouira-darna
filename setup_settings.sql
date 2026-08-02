-- 1. Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.association_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    bank_account TEXT,
    bank_name TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.association_info ENABLE ROW LEVEL SECURITY;

-- Allow public to read the info (for Navbar, Footer, etc.)
DROP POLICY IF EXISTS "Allow public read access to association_info" ON public.association_info;
CREATE POLICY "Allow public read access to association_info" 
ON public.association_info FOR SELECT 
USING (true);

-- Allow admins to update the info
DROP POLICY IF EXISTS "Allow admins to manage association_info" ON public.association_info;
CREATE POLICY "Allow admins to manage association_info" 
ON public.association_info 
FOR ALL 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Insert default row if table is empty
INSERT INTO public.association_info (name, tagline, address, phone, email, bank_account, bank_name)
SELECT 
    'جمعية الصويرة دارنا', 
    'رعاية، حماية، ومستقبل مشرق للأطفال',
    'المركب الاجتماعي، حي تافوكت، الصويرة، المغرب',
    '+212 524 47 00 00',
    'contact@essaouira-darna.ma',
    '000 000 00000000000000 00',
    'البنك الشعبي'
WHERE NOT EXISTS (
    SELECT 1 FROM public.association_info LIMIT 1
);
