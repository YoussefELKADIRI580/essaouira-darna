-- Add French and English columns to association_info
ALTER TABLE public.association_info
ADD COLUMN IF NOT EXISTS name_fr TEXT,
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS tagline_fr TEXT,
ADD COLUMN IF NOT EXISTS tagline_en TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS address_fr TEXT,
ADD COLUMN IF NOT EXISTS address_en TEXT;

-- Add French and English columns to news
ALTER TABLE public.news
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_fr TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS content_fr TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

-- Update the existing data so it doesn't stay null for existing rows
-- (You can manually translate later, but this ensures no crashes if you don't)
UPDATE public.association_info
SET name_fr = name, name_en = name
WHERE name_fr IS NULL;

UPDATE public.news
SET title_fr = title, title_en = title
WHERE title_fr IS NULL;

-- Add French and English columns to nav_links
ALTER TABLE public.nav_links
ADD COLUMN IF NOT EXISTS label_fr TEXT,
ADD COLUMN IF NOT EXISTS label_en TEXT;

UPDATE public.nav_links
SET label_fr = label, label_en = label
WHERE label_fr IS NULL;

-- Add French and English columns to stats
ALTER TABLE public.stats
ADD COLUMN IF NOT EXISTS label_fr TEXT,
ADD COLUMN IF NOT EXISTS label_en TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

UPDATE public.stats
SET label_fr = label, label_en = label, description_fr = description, description_en = description
WHERE label_fr IS NULL;

-- Add French and English columns to association_values
ALTER TABLE public.association_values
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

UPDATE public.association_values
SET title_fr = title, title_en = title, description_fr = description, description_en = description
WHERE title_fr IS NULL;

-- Add French and English columns to about_content
ALTER TABLE public.about_content
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS content_fr TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

UPDATE public.about_content
SET title_fr = title, title_en = title, content_fr = content, content_en = content
WHERE title_fr IS NULL;

-- Add French and English columns to partners
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS name_fr TEXT,
ADD COLUMN IF NOT EXISTS name_en TEXT;

UPDATE public.partners
SET name_fr = name, name_en = name
WHERE name_fr IS NULL;

-- Add French and English columns to history_timeline
ALTER TABLE public.history_timeline
ADD COLUMN IF NOT EXISTS description_fr TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

UPDATE public.history_timeline
SET description_fr = description, description_en = description
WHERE description_fr IS NULL;

-- Add French and English columns to members
ALTER TABLE public.members
ADD COLUMN IF NOT EXISTS name_fr TEXT,
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS role_fr TEXT,
ADD COLUMN IF NOT EXISTS role_en TEXT;

UPDATE public.members
SET name_fr = name, name_en = name, role_fr = role, role_en = role
WHERE name_fr IS NULL;

-- Add French and English columns to projects
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS short_description_fr TEXT,
ADD COLUMN IF NOT EXISTS short_description_en TEXT,
ADD COLUMN IF NOT EXISTS long_description_fr TEXT,
ADD COLUMN IF NOT EXISTS long_description_en TEXT;

UPDATE public.projects
SET title_fr = title, title_en = title, 
    short_description_fr = short_description, short_description_en = short_description,
    long_description_fr = long_description, long_description_en = long_description
WHERE title_fr IS NULL;

-- Add French and English columns to project_supplies
ALTER TABLE public.project_supplies
ADD COLUMN IF NOT EXISTS name_fr TEXT,
ADD COLUMN IF NOT EXISTS name_en TEXT;

UPDATE public.project_supplies
SET name_fr = name, name_en = name
WHERE name_fr IS NULL;
