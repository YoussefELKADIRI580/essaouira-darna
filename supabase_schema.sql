-- =====================================================
-- Supabase Schema & Data for: جمعية الصويرة دارنا
-- Generated from the Next.js project analysis
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ASSOCIATION INFO (معلومات الجمعية)
-- =====================================================
CREATE TABLE association_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  bank_account TEXT,
  bank_name TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO association_info (name, tagline, description, address, phone, email, bank_account, bank_name)
VALUES (
  'جمعية الصويرة دارنا',
  'رعاية وإيواء وإدماج الأطفال في وضعية صعبة بإقليم الصويرة',
  'تأسست جمعية الصويرة دارنا بهدف تقديم الرعاية الكاملة، التعليم، والدعم النفسي والاجتماعي للأطفال الأيتام والمتخلى عنهم أو الذين يعيشون في ظروف اجتماعية صعبة في مدينة الصويرة ونواحيها.',
  'تجزئة الغزوة، الصويرة، المغرب',
  '+212 524 78X XXX',
  'contact@essaouiradarna.ma',
  '011 810 0000 1234567890 123 45',
  'البنك الشعبي - وكالة الصويرة الغزوة'
);

-- =====================================================
-- 2. NAVIGATION LINKS (روابط التنقل)
-- =====================================================
CREATE TABLE nav_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  href TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO nav_links (href, label, sort_order) VALUES
  ('/', 'الرئيسية', 1),
  ('/about', 'من نحن', 2),
  ('/projects', 'مشاريعنا', 3),
  ('/contribute', 'كيف تساهم', 4),
  ('/contact', 'اتصل بنا', 5);

-- =====================================================
-- 3. STATS (الإحصائيات)
-- =====================================================
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  page TEXT DEFAULT 'home', -- 'home' or 'about'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Home page stats
INSERT INTO stats (value, label, description, sort_order, page) VALUES
  ('+420', 'مستفيد', 'عدد المستفيدين حتى 31/12/2025', 1, 'home'),
  ('850.000.00', 'درهم', 'المبلغ المتوقع للتبرعات الخيرية لعام 2026 (24%)', 2, 'home'),
  ('3.483.470.35', 'درهم', 'الميزانية التشغيلية المتوقعة لعام 2026', 3, 'home'),
  ('+100', 'مستفيد', 'عدد المستفيدين لعام 2026', 4, 'home');

-- About page stats
INSERT INTO stats (value, label, description, sort_order, page) VALUES
  ('+420', 'مستفيد', 'عدد المستفيدين حتى 31/12/2025', 1, 'about'),
  ('+100', 'مستفيد', 'عدد المستفيدين لعام 2026', 2, 'about'),
  ('850,000', 'درهم', 'المبلغ المتوقع للتبرعات الخيرية لعام 2026 (24%)', 3, 'about'),
  ('3,483,470', 'درهم', 'الميزانية التشغيلية المتوقعة لعام 2026', 4, 'about');

-- =====================================================
-- 4. PROJECTS (المشاريع)
-- =====================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  image_url TEXT,
  target_amount DECIMAL(12,2) DEFAULT 0,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'completed')) DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO projects (slug, title, short_description, long_description, image_url, target_amount, raised_amount, status, sort_order) VALUES
(
  'darna-house',
  'تجهيز وتسيير دار الأطفال دارنا',
  'توفير مأوى آمن ورعاية شاملة للأطفال الأيتام وفي وضعية شارع بالصويرة.',
  'يهدف هذا المشروع المستمر إلى تغطية التكاليف التشغيلية لدار الرعاية بالصويرة (دارنا)، بما في ذلك التغذية، اللباس، التطبيب، والتعليم للأطفال المقيمين. نسعى لتوفير بيئة أسرية دافئة تدعم نموهم المتكامل وإدماجهم في المجتمع.',
  'https://picsum.photos/id/1018/800/600',
  500000, 350000, 'active', 1
),
(
  'early-education',
  'دعم التعليم الأولي والدمج المدرسي',
  'تمويل الرسوم المدرسية واقتناء المحافظ والكتب المدرسية للأطفال المعوزين.',
  'نسعى لضمان عدم انقطاع أي طفل عن الدراسة بسبب الصعوبات المادية. يشمل هذا المشروع شراء الكتب المدرسية، المحافظ، الدفاتر، والأدوات التعليمية، بالإضافة إلى توفير حصص الدعم والتقوية ودروس الدعم النفسي-التربوي للأطفال.',
  'https://picsum.photos/id/367/800/600',
  150000, 120000, 'active', 2
),
(
  'nutrition-support',
  'الرعاية الصحية والدعم الغذائي للأسر المعوزة',
  'تقديم المساعدات الغذائية الأساسية والرعاية الصحية الدورية للأسر الأكثر هشاشة.',
  'يركز هذا البرنامج على الفحوصات الطبية الدورية والتكفل بمصاريف الأدوية والعمليات الجراحية المستعجلة لفائدة الأطفال المستفيدين وأمهاتهم اللواتي يعشن في ظروف قاسية، إلى جانب توزيع قفف غذائية دورية.',
  'https://picsum.photos/id/830/800/600',
  200000, 200000, 'completed', 3
);

-- =====================================================
-- 5. PROJECT SUPPLIES (مستلزمات المشاريع)
-- =====================================================
CREATE TABLE project_supplies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  is_fulfilled BOOLEAN DEFAULT FALSE,
  category TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Supplies for: دار الأطفال دارنا
INSERT INTO project_supplies (project_id, name, cost, is_fulfilled, category, sort_order)
SELECT p.id, s.name, s.cost, s.is_fulfilled, s.category, s.sort_order
FROM projects p
CROSS JOIN (VALUES
  ('سرير خشبي مريح للأطفال', 1200, TRUE, 'أثاث', 1),
  ('غطاء صوفي شتوي دافئ', 250, FALSE, 'أفرشة', 2),
  ('مجموعة خزانة ملابس شخصية لكل طفل', 800, FALSE, 'أثاث', 3),
  ('حقيبة طبية للإسعافات الأولية', 400, TRUE, 'معدات طبية', 4),
  ('جهاز تدفئة آمن للغرف المشتركة', 1500, FALSE, 'تجهيز', 5),
  ('وجبة غذائية متكاملة لطفل لمدة شهر', 600, TRUE, 'تغذية', 6)
) AS s(name, cost, is_fulfilled, category, sort_order)
WHERE p.slug = 'darna-house';

-- Supplies for: التعليم الأولي
INSERT INTO project_supplies (project_id, name, cost, is_fulfilled, category, sort_order)
SELECT p.id, s.name, s.cost, s.is_fulfilled, s.category, s.sort_order
FROM projects p
CROSS JOIN (VALUES
  ('محفظة مدرسية مجهزة بالكامل بالدفاتر والأقلام', 350, TRUE, 'دراسة', 1),
  ('كتب ومقررات المستوى الابتدائي', 200, TRUE, 'دراسة', 2),
  ('طاولة دراسية ثنائية للقسم', 1100, FALSE, 'أثاث', 3),
  ('حاسوب محمول للتعليم والتوجيه التفاعلي', 4500, FALSE, 'أجهزة', 4),
  ('لوحة جدارية تفاعلية للتدريس', 2000, FALSE, 'تجهيز', 5)
) AS s(name, cost, is_fulfilled, category, sort_order)
WHERE p.slug = 'early-education';

-- Supplies for: الرعاية الصحية
INSERT INTO project_supplies (project_id, name, cost, is_fulfilled, category, sort_order)
SELECT p.id, s.name, s.cost, s.is_fulfilled, s.category, s.sort_order
FROM projects p
CROSS JOIN (VALUES
  ('قفة المواد الغذائية الأساسية لأسرة لمدة شهر', 450, TRUE, 'تغذية', 1),
  ('توفير الأدوية الأساسية والوصفات الطبية المستعجلة', 500, TRUE, 'صحة', 2),
  ('نظارات طبية مصححة للأطفال ضعاف البصر', 600, TRUE, 'صحة', 3)
) AS s(name, cost, is_fulfilled, category, sort_order)
WHERE p.slug = 'nutrition-support';

-- =====================================================
-- 6. VALUES / القيم
-- =====================================================
CREATE TABLE association_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- lucide icon name
  sort_order INT DEFAULT 0,
  page TEXT DEFAULT 'home', -- 'home' or 'about'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Home page values
INSERT INTO association_values (title, description, icon_name, sort_order, page) VALUES
  ('جودة الخدمات', 'خدماتنا مجانية لضمان استمراريتها وامتثالها للقانون رقم 14/05', 'Award', 1, 'home'),
  ('شراكة', 'نحن مقتنعون بأن نجاح كل عمل اجتماعي يعتمد على المشاركة والتعاون بين الافراد', 'Handshake', 2, 'home'),
  ('المصداقية', 'إلى كل المبادرات التي تساعدنا في تقديم المساعدات الضرورية للاطفال المحتاجين', 'CheckCircle', 3, 'home'),
  ('التواصل', 'في تواصل دائم مع شركائنا', 'Network', 4, 'home'),
  ('تكافل', 'بين المستفيدين وموظفي الجمعية', 'Users', 5, 'home'),
  ('الشفافية', 'في إدارة الشؤون الإدارية والمالية', 'ShieldCheck', 6, 'home');

-- About page values (core values)
INSERT INTO association_values (title, description, icon_name, sort_order, page) VALUES
  ('رعاية شاملة', 'توفير المأوى، الغذاء، اللباس، والتطبيب لكل طفل مقيم بالدار لضمان نموه بشكل متوازن وطبيعي.', 'Heart', 1, 'about'),
  ('التعليم والتوجيه', 'متابعة الأطفال في مساراتهم الدراسية وتوجيههم وتأهيلهم لولوج سوق الشغل والاعتماد على أنفسهم.', 'Compass', 2, 'about'),
  ('الشفافية والالتزام', 'الالتزام بأعلى معايير الحكامة المالية والتدبير الإداري مع كافة الشركاء والمتبرعين والمؤسسات.', 'ShieldCheck', 3, 'about');

-- =====================================================
-- 7. HISTORY TIMELINE (تاريخ الجمعية)
-- =====================================================
CREATE TABLE history_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT NOT NULL,
  date TEXT, -- e.g. '21 مارس'
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO history_timeline (year, date, description, sort_order) VALUES
  ('2005', NULL, 'بالشراكة مع محافظة الصويرة ولد مشروع "الصويرة دارنا" في إطار برنامج INDH (المبادرة الوطنية للتنمية البشرية).', 1),
  ('2008', '21 مارس', 'افتتحت الجمعية أبوابها رسميًا، وبدأت في الترحيب بالأطفال المتخلى عنهم وأولئك الذين يواجهون أوضاعًا اجتماعية صعبة القادمين بشكل أساسي من جمعيات أخرى مثل جمعية النجمة وجمعية نور مقادور.', 2),
  ('2009', '28 أبريل', 'حصلت المؤسسة على ترخيص قانوني وفقًا للقانون رقم 141-05 ووفقًا للقرار رقم 10/09 الصادر عن وزارة التضامن والأسرة والتنمية الاجتماعية للمرأة، بسعة 60 مستفيد ومستفيدة.', 3),
  ('2017', '20 أغسطس', 'تم تفويض المؤسسة، وفقًا للقانون 14-05، لزيادة سعة الاستقبال إلى 120 مستفيدً ومستفيدة.', 4),
  ('حالياً', NULL, 'يتم تسيير المؤسسة حاليا من قبل جمعية مكونة من سبعة أعضاء، من بينهم ثلاث سيدات.', 5);

-- =====================================================
-- 8. ABOUT PAGE CONTENT (محتوى صفحة "من نحن")
-- =====================================================
CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL, -- 'intro_blocks', 'vision', 'mission'
  sort_order INT DEFAULT 0,
  content TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Intro blocks (from home page "من نحن" section)
INSERT INTO about_content (section, sort_order, content) VALUES
  ('intro_blocks', 1, 'جمعية الصويرة دارنا هي مؤسسة للحماية الاجتماعية تعتني بالأطفال المهجورين أو الذين يعانون من أوضاع صعبة.'),
  ('intro_blocks', 2, 'تأسست الجمعية في 21 مارس 2008 بفضل المبادرة الوطنية للتنمية البشرية التي انطلقت عام 2005 بالصويرة.'),
  ('intro_blocks', 3, 'أصبحت المؤسسة مرخصة قانونيا في أبريل 2009 ، وفقا للقرار رقم 10/09 الصادر عن وزارة التضامن النسائي والأسرة والتنمية الاجتماعية ، بسعة 120 مستفيد ومستفيدة.'),
  ('intro_blocks', 4, 'تخضع إدارة المؤسسة للقانون التشريعي رقم 14/05 المتعلق بشروط التأهيل لفتح وإدارة مؤسسات الحماية الاجتماعية في المغرب.');

-- Vision & Mission
INSERT INTO about_content (section, sort_order, content, title) VALUES
  ('vision', 1, 'نطمح في جمعية الصويرة دارنا إلى أن يصبح إقليم الصويرة خالياً تماماً من ظاهرة الأطفال المشردين أو المعرضين للخطر، وأن نضمن لكل طفل ينتمي إلى هذه الفئة مأوىً كريمًا وفرصة متكافئة للتعليم الجيد والنمو السليم.', 'مستقبل بدون أطفال في وضعية شارع'),
  ('mission', 1, 'تتمثل رسالتنا في احتضان الأطفال اليتامى والمتخلى عنهم أو الذين يعيشون في وضعية صعبة، وتوفير المأوى الآمن والتغذية المتكاملة والرعاية الطبية والدراسة والأنشطة الترفيهية لهم، تمهيداً لإدماجهم الفعال في محيطهم الاجتماعي والمهني كأعضاء فاعلين ومستقلين.', 'الرعاية والإيواء والإدماج الاجتماعي');

-- =====================================================
-- 9. MEMBERS (الأعضاء)
-- =====================================================
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  member_type TEXT CHECK (member_type IN ('active', 'honorary', 'center_team')) NOT NULL,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Active Members (أعضاء نشطون)
INSERT INTO members (name, role, member_type, sort_order) VALUES
  ('Khaled BENGHADA', 'Président fondateur', 'active', 1),
  ('Aziz ECHCHAIBI SEFRIOUI', 'Président', 'active', 2),
  ('Zahra KENABO', 'Président adjoint', 'active', 3),
  ('Souad BAINO', 'Trésorier', 'active', 4),
  ('Habib EL BAHI', 'Trésorier adjoint', 'active', 5),
  ('Aicha LACHAB', 'Secrétaire Général', 'active', 6),
  ('Noura SARAOUI', 'Secrétaire adjoint', 'active', 7);

-- Honorary Members (أعضاء الشرف)
INSERT INTO members (name, role, member_type, sort_order) VALUES
  ('Michel Bohbot', 'Expert en art contemporain', 'honorary', 1),
  ('Fatimzahra EL Hour', 'Miss Maroc année 2015', 'honorary', 2),
  ('Professeur Abdelhafid LAHLAIDI', 'Médecin chirurgien cardio vasculaire chercheur génie d''anatomie', 'honorary', 3),
  ('Mourad BOURIKI', 'Gagnant de la 1ère Saison "The Voice أحلى صوت"', 'honorary', 4);

-- Center Team (فريق المركز)
INSERT INTO members (name, role, member_type, sort_order) VALUES
  ('Bouchra BOUJLIL', 'Directrice', 'center_team', 1),
  ('Saida DAROUI', 'Surveillante générale', 'center_team', 2),
  ('Rabiaa ZETOUNE', 'Coordinatrice éducatrices', 'center_team', 3),
  ('Fatimzzahra ADI', 'Responsable Financière', 'center_team', 4);

-- =====================================================
-- 10. PARTNERS (الشركاء)
-- =====================================================
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  partner_type TEXT CHECK (partner_type IN ('donor', 'institutional', 'civil', 'donor_member', 'official')) NOT NULL,
  logo_url TEXT,
  icon_name TEXT, -- lucide icon name for marquee partners
  website_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donor Partners (شركاء مانحون)
INSERT INTO partners (name, partner_type, sort_order) VALUES
  ('Groupe Accor Hôtel Ibis Essaouira', 'donor', 1),
  ('Hôtels prestige Marrakech', 'donor', 2),
  ('Laboratoire Galinica Casablanca pharmacie', 'donor', 3),
  ('Laboratoire Abdelkarim EL KHATABI d''Essaouira', 'donor', 4);

-- Institutional Partners (شركاء مؤسساتيون)
INSERT INTO partners (name, partner_type, sort_order) VALUES
  ('Comité Provincial de Développement Humain de la Province d''Essaouira', 'institutional', 1),
  ('Ministère de la famille solidarité égalité et développement social', 'institutional', 2),
  ('Entraide National', 'institutional', 3),
  ('Conseil Provincial d''Esssaouira', 'institutional', 4),
  ('Conseil Régional de Marrakech Safi', 'institutional', 5);

-- Civil Partners (شركاء المجتمع المدني)
INSERT INTO partners (name, partner_type, sort_order) VALUES
  ('Association d''appui au Complexe Social Ibtissama d''Essaouira', 'civil', 1),
  ('Association Essaouira Mogador', 'civil', 2),
  ('Conseil Provincial du Tourisme d''Essaouira', 'civil', 3),
  ('Institut Francais d''Essaouira', 'civil', 4),
  ('Association Sidi Bel Abasse Bab – Marrakech', 'civil', 5),
  ('Association Trait d''Union Marrakech', 'civil', 6),
  ('Association village SOS – Ait Ourire (Marrakech)', 'civil', 7),
  ('Association Club Planche a Voile d''Essaouira', 'civil', 8),
  ('Association La Danse des Femmes – France', 'civil', 9),
  ('Association Cap – Santé Belgique', 'civil', 10),
  ('Hotel Golf Sofitel', 'civil', 11);

-- Donor Members (أعضاء مانحون)
INSERT INTO partners (name, partner_type, sort_order) VALUES
  ('Mr Hicham EL MEHRAB', 'donor_member', 1),
  ('Mr El Mahi BENBINE', 'donor_member', 2),
  ('Docteur Naoufel EL MANSOURI', 'donor_member', 3),
  ('Mr Haj Brahim CHOUKRI', 'donor_member', 4),
  ('Mr Hassan NAJIB', 'donor_member', 5),
  ('Mme Soriya OTMANI', 'donor_member', 6),
  ('Mr Mostafa OTMANI', 'donor_member', 7),
  ('Mr Noureddine OTMANI', 'donor_member', 8),
  ('Mr Hakim EL OUASSINI', 'donor_member', 9),
  ('Mme Hannane EL OUASSINI', 'donor_member', 10),
  ('Mr Patrique et Michel', 'donor_member', 11);

-- Official Partners for Marquee (شركاء النجاح)
INSERT INTO partners (name, partner_type, icon_name, sort_order) VALUES
  ('المبادرة الوطنية للتنمية البشرية', 'official', 'Landmark', 1),
  ('وزارة التضامن والإدماج', 'official', 'Building2', 2),
  ('مجلس إقليم الصويرة', 'official', 'HeartHandshake', 3),
  ('المديرية الإقليمية للصحة', 'official', 'Hospital', 4),
  ('أكاديمية التربية والتكوين', 'official', 'GraduationCap', 5),
  ('التعاون الوطني', 'official', 'ShieldCheck', 6),
  ('محسنين وشركات محلية', 'official', 'FileCheck', 7);

-- =====================================================
-- 11. NEWS / الأخبار
-- =====================================================
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_date DATE,
  day_text TEXT,
  month_text TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  slug TEXT UNIQUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO news (title, excerpt, day_text, month_text, sort_order) VALUES
(
  'زيارة السيد محمد رشيد إلى مؤسسة دارنا بالصويرة',
  'قام عامل إقليم الصويرة، السيد محمد رشيد بزيارة ميدانية إلى مؤسسة دارنا، مرافقاً بوفد مرافق له. وهدفت هذه الزيارة إلى الاطلاع عن قرب على...',
  '10', 'أبريل', 1
),
(
  'مرور جمعية الصويرة دارنا في برنامج «ناس الخير» على قناة 2M',
  'تشرفت جمعية الصويرة دارنا باستقبال فريق البرنامج الاجتماعي «ناس الخير» الذي يبث على قناة 2M. ويسلط هذا التقرير الضوء على المبادرات...',
  '10', 'أبريل', 2
),
(
  'الاحتفال باليوم الوطني لليتيم لسنة 2021',
  'بمناسبة اليوم الوطني لليتيم، تنظم الجمعية حملة لجمع التبرعات من المحسنين وأصدقاء الجمعية لرسم الابتسامة على محيا الأطفال...',
  '02', 'سبتمبر', 3
);

-- =====================================================
-- 12. ANNUAL REPORTS (التقارير السنوية)
-- =====================================================
CREATE TABLE annual_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT NOT NULL,
  file_size TEXT,
  description TEXT,
  file_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO annual_reports (year, file_size, description, sort_order) VALUES
  ('2023', '2.4 MB', 'يتضمن تفاصيل استكمال ورش توسعة مبنى الإيواء.', 1),
  ('2022', '1.8 MB', 'تقرير مفصل حول الاستجابة لفترة التعافي بعد الجائحة.', 2),
  ('2021', '2.1 MB', 'الحصيلة السنوية لبرامج الدعم المدرسي وتكفل الأيتام.', 3);

-- =====================================================
-- 13. TRANSPARENCY DATA (بيانات الشفافية)
-- =====================================================
CREATE TABLE transparency_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  percentage INT NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  color TEXT, -- CSS class or hex color
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO transparency_data (label, percentage, color, sort_order) VALUES
  ('الرعاية والإيواء (الغذاء، اللباس، السكن)', 65, 'bg-primary', 1),
  ('التعليم والدعم المدرسي', 20, 'bg-cta', 2),
  ('الرعاية الصحية والدعم النفسي', 10, 'bg-secondary', 3),
  ('المصاريف الإدارية واللوجستية', 5, 'bg-charcoal/50', 4);

-- =====================================================
-- 14. VOLUNTEERING STEPS (خطوات التطوع)
-- =====================================================
CREATE TABLE volunteering_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO volunteering_steps (title, description, icon_name, sort_order) VALUES
  ('تحديد مجال رغبتك', 'هل ترغب في تدريس الأطفال؟ تقديم الرعاية الصحية؟ المساعدة في التسيير اليومي؟ أو التنشيط التربوي؟', 'BookOpen', 1),
  ('ملء استمارة التطوع', 'تواصل معنا مباشرة عبر استمارة الاتصال لتزويدنا بمعلوماتك وخبراتك ووقتك المتاح.', 'Handshake', 2),
  ('المقابلة والتنسيق', 'سيقوم فريقنا بالاتصال بك لترتيب لقاء في مقر الجمعية لتنسيق المهام وتحديد المسؤوليات.', 'HeartHandshake', 3);

-- =====================================================
-- 15. DONATION CATEGORIES (فئات التبرعات العينية)
-- =====================================================
CREATE TABLE donation_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO donation_categories (title, description, icon_name, sort_order) VALUES
  ('تبرع بالملابس والأغطية', 'نقبل جميع الملابس والأغطية النظيفة والصالحة للاستعمال، خاصة للأطفال واليافعين، لحمايتهم من برد الشتاء.', 'Gift', 1),
  ('تبرع بالمواد الغذائية', 'يمكنك إرسال مواد غذائية جافة (دقيق، زيت، سكر، قطنيات) مباشرة لمطبخ الدار لدعم التغذية اليومية للأطفال.', 'HeartHandshake', 2),
  ('الدعم الطبي والصحي', 'الأدوية، كراسي الحركة، أو تقديم فحوصات طبية وتدخلات جراحية مجانية للأطفال المقيمين.', 'ShieldAlert', 3);

-- =====================================================
-- 16. PRIVACY POLICIES (سياسات الخصوصية)
-- =====================================================
CREATE TABLE privacy_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO privacy_policies (title, content, icon_name, sort_order) VALUES
(
  'حقوق الصورة والهوية',
  'نلتزم التزاماً قاطعاً بعدم استغلال صور الأطفال المنتمين للجمعية لأغراض التسويق أو الاستعطاف. جميع الصور المنشورة على موقعنا أو منصاتنا تخضع للمعالجة التمويهية (Blur) لإخفاء ملامح الوجه، أو يتم التقاطها من زوايا خلفية تحفظ هوية الطفل، احتراماً لكرامته وحقه المطلق في الخصوصية وتجنباً لأي وصم اجتماعي.',
  'EyeOff', 1
),
(
  'سرية بيانات المتبرعين والمكفولين',
  'كافة المعلومات الشخصية للمتبرعين، وتفاصيل الكفالات (مثل البيانات الطبية والمدرسية للطفل المكفول) تخضع للسرية التامة ولا يتم مشاركتها مع أي طرف ثالث تحت أي ظرف، وفقاً للقانون المغربي 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي.',
  'Lock', 2
),
(
  'البيئة الآمنة ومدونة السلوك',
  'يخضع جميع العاملين، المربين، والمتطوعين في الجمعية لتدقيق وموافقة مسبقة. كما يتم إلزام الجميع بتوقيع "ميثاق حماية الطفولة" الداخلي الذي يمنع منعاً باتاً التصوير الشخصي للأطفال بالهواتف الخاصة، أو الانفراد بهم خارج الإطار التربوي المعتمد من طرف إدارة الجمعية.',
  'ShieldCheck', 3
),
(
  'الإبلاغ والتواصل',
  'إذا لاحظت أي محتوى على منصاتنا تعتقد أنه ينتهك هذه السياسة، أو كانت لديك استفسارات حول كيفية إدارتنا للبيانات، يرجى التواصل فوراً مع الإدارة عبر صفحة "اتصل بنا". نحن نأخذ هذه التبليغات بأقصى درجات الجدية والسرعة.',
  'HeartHandshake', 4
);

-- =====================================================
-- 17. CONTACT MESSAGES (رسائل التواصل)
-- =====================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 18. DONATIONS (التبرعات المالية)
-- =====================================================
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  supply_id UUID REFERENCES project_supplies(id) ON DELETE SET NULL,
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT, -- 'card', 'bank_transfer', 'paypal'
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 19. SPONSORSHIP / KAFALA (كفالة الأيتام)
-- =====================================================
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_name TEXT NOT NULL,
  sponsor_email TEXT,
  sponsor_phone TEXT,
  monthly_amount DECIMAL(10,2) DEFAULT 500,
  status TEXT CHECK (status IN ('active', 'paused', 'completed')) DEFAULT 'active',
  start_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 20. SEO & PAGE META (بيانات SEO)
-- =====================================================
CREATE TABLE page_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO page_meta (page_slug, title, description) VALUES
  ('home', 'جمعية الصويرة دارنا | رعاية وإيواء الأطفال في وضعية صعبة', 'جمعية الصويرة دارنا لرعاية وإيواء وإدماج الأطفال في وضعية صعبة بإقليم الصويرة. نسعى لتوفير بيئة أمنة ومستقبل أفضل للأطفال.'),
  ('about', 'من نحن | جمعية الصويرة دارنا', 'تعرف على تاريخ وقيم ورسالة جمعية الصويرة دارنا للرعاية الاجتماعية'),
  ('projects', 'مشاريعنا | جمعية الصويرة دارنا', 'اكتشف مشاريعنا الخيرية لدعم الأطفال في وضعية صعبة بالصويرة'),
  ('contribute', 'كيف تساهم | جمعية الصويرة دارنا', 'تعرف على طرق المساهمة والتطوع ودعم أطفال جمعية الصويرة دارنا'),
  ('contact', 'اتصل بنا | جمعية الصويرة دارنا', 'تواصل مع جمعية الصويرة دارنا للاستفسارات أو التبرعات أو التطوع'),
  ('privacy', 'سياسة حماية الطفولة والخصوصية | جمعية الصويرة دارنا', 'سياسة حماية الأطفال وسرية البيانات في جمعية الصويرة دارنا');

-- =====================================================
-- RLS (Row Level Security) - Supabase policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE association_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE association_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE annual_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE transparency_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteering_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_meta ENABLE ROW LEVEL SECURITY;

-- Public READ access for content tables (anonymous users can read)
CREATE POLICY "Public read access" ON association_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON nav_links FOR SELECT USING (true);
CREATE POLICY "Public read access" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON project_supplies FOR SELECT USING (true);
CREATE POLICY "Public read access" ON association_values FOR SELECT USING (true);
CREATE POLICY "Public read access" ON history_timeline FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON members FOR SELECT USING (true);
CREATE POLICY "Public read access" ON partners FOR SELECT USING (true);
CREATE POLICY "Public read access" ON news FOR SELECT USING (true);
CREATE POLICY "Public read access" ON annual_reports FOR SELECT USING (true);
CREATE POLICY "Public read access" ON transparency_data FOR SELECT USING (true);
CREATE POLICY "Public read access" ON volunteering_steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON donation_categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON privacy_policies FOR SELECT USING (true);
CREATE POLICY "Public read access" ON page_meta FOR SELECT USING (true);

-- Public INSERT access for contact_messages and donations (anyone can submit)
CREATE POLICY "Public insert access" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON sponsorships FOR INSERT WITH CHECK (true);

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_supplies_project_id ON project_supplies(project_id);
CREATE INDEX idx_news_published_date ON news(published_date);
CREATE INDEX idx_donations_project_id ON donations(project_id);
CREATE INDEX idx_partners_type ON partners(partner_type);
CREATE INDEX idx_members_type ON members(member_type);
CREATE INDEX idx_stats_page ON stats(page);
CREATE INDEX idx_values_page ON association_values(page);

-- =====================================================
-- UPDATED_AT trigger function
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON association_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON project_supplies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON about_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON privacy_policies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON sponsorships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON page_meta
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
