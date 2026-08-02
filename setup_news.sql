-- Create the news table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    published_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    day_text TEXT,
    month_text TEXT,
    is_published BOOLEAN DEFAULT true,
    slug TEXT UNIQUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to news" 
ON public.news FOR SELECT 
USING (is_published = true);

-- Allow authenticated admins to do everything
CREATE POLICY "Allow admins to manage news" 
ON public.news FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Insert dummy data to match the screenshot
INSERT INTO public.news (title, excerpt, content, day_text, month_text, is_published, sort_order)
VALUES 
('الاحتفال باليوم الوطني لليتيم لسنة 2021', 'بمناسبة اليوم الوطني لليتيم، تنظم الجمعية حملة لجمع التبرعات من المحسنين وأصدقاء الجمعية لرسم الابتسامة على محيا الأطفال...', 'المحتوى الكامل هنا...', '02', 'سبتمبر', true, 1),
('مرور جمعية الصويرة دارنا في برنامج «ناس الخير» على قناة 2M', 'تشرفت جمعية الصويرة دارنا باستقبال فريق البرنامج الاجتماعي «ناس الخير» الذي يبث على قناة 2M. ويسلط هذا التقرير الضوء على المبادرات...', 'المحتوى الكامل هنا...', '10', 'أبريل', true, 2),
('زيارة السيد محمد رشيد إلى مؤسسة دارنا بالصويرة', 'قام عامل إقليم الصويرة، السيد محمد رشيد بزيارة ميدانية إلى مؤسسة دارنا، مرافقاً بوفد مرافق له. وهدفت هذه الزيارة إلى الاطلاع عن قرب على...', 'المحتوى الكامل هنا...', '10', 'أبريل', true, 3)
ON CONFLICT DO NOTHING;
