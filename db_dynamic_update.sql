-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- 1. update tools table to have color
ALTER TABLE tools
ADD COLUMN IF NOT EXISTS color text DEFAULT 'from-purple-500 to-indigo-600';
-- 2. site_settings table (Hero text, Footer text, global configs)
CREATE TABLE IF NOT EXISTS site_settings (
    key text PRIMARY KEY,
    value jsonb NOT NULL,
    -- { "en": "...", "ar": "..." } or complex objects
    description text,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- 3. navigation table
CREATE TABLE IF NOT EXISTS navigation (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    label jsonb NOT NULL,
    -- { "en": "Home", "ar": "الرئيسية" }
    path text NOT NULL,
    "order" integer DEFAULT 0,
    is_button boolean DEFAULT false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- 4. playbooks table
CREATE TABLE IF NOT EXISTS playbooks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title jsonb NOT NULL,
    -- { "en": "...", "ar": "..." }
    description jsonb,
    icon_name text,
    steps jsonb,
    -- Array of steps
    category text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- 5. academy_categories
CREATE TABLE IF NOT EXISTS academy_categories (
    id text PRIMARY KEY,
    -- e.g., 'web-dev'
    name jsonb NOT NULL,
    description jsonb,
    icon_name text,
    color text,
    "order" integer DEFAULT 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- 6. academy_tutorials (stacks)
CREATE TABLE IF NOT EXISTS academy_tutorials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id text REFERENCES academy_categories(id) ON DELETE CASCADE,
    title jsonb NOT NULL,
    description jsonb,
    content jsonb,
    -- Full markdown content or multiple sections
    difficulty text,
    -- 'Beginner', 'Intermediate', 'Advanced'
    estimated_time text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- 7. home_cards
CREATE TABLE IF NOT EXISTS home_cards (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title jsonb NOT NULL,
    description jsonb,
    icon_name text,
    link text,
    color text,
    "order" integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- RLS Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_cards ENABLE ROW LEVEL SECURITY;
-- Reading policies (Public)
-- Reading policies (Public)
DROP POLICY IF EXISTS "Public site_settings are viewable by everyone" ON site_settings;
CREATE POLICY "Public site_settings are viewable by everyone" ON site_settings FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Public navigation is viewable by everyone" ON navigation;
CREATE POLICY "Public navigation is viewable by everyone" ON navigation FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Public playbooks are viewable by everyone" ON playbooks;
CREATE POLICY "Public playbooks are viewable by everyone" ON playbooks FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Public academy_categories are viewable by everyone" ON academy_categories;
CREATE POLICY "Public academy_categories are viewable by everyone" ON academy_categories FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Public academy_tutorials are viewable by everyone" ON academy_tutorials;
CREATE POLICY "Public academy_tutorials are viewable by everyone" ON academy_tutorials FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Public home_cards are viewable by everyone" ON home_cards;
CREATE POLICY "Public home_cards are viewable by everyone" ON home_cards FOR
SELECT USING (true);
-- Writing policies (Authenticated Admins only)
DROP POLICY IF EXISTS "Admins can manage site_settings" ON site_settings;
CREATE POLICY "Admins can manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins can manage navigation" ON navigation;
CREATE POLICY "Admins can manage navigation" ON navigation FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins can manage playbooks" ON playbooks;
CREATE POLICY "Admins can manage playbooks" ON playbooks FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins can manage academy_categories" ON academy_categories;
CREATE POLICY "Admins can manage academy_categories" ON academy_categories FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins can manage academy_tutorials" ON academy_tutorials;
CREATE POLICY "Admins can manage academy_tutorials" ON academy_tutorials FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins can manage home_cards" ON home_cards;
CREATE POLICY "Admins can manage home_cards" ON home_cards FOR ALL USING (auth.role() = 'authenticated');
-- Seed Initial Data (Upserting to avoid duplicates on re-run)
-- Hero Content
INSERT INTO site_settings (key, value, description)
VALUES (
        'hero_title_1',
        '{"en": "DON''T JUST LEARN.", "ar": "لا تدرس وبس.."}'::jsonb,
        'Hero Title Line 1'
    ),
    (
        'hero_title_1_accent',
        '{"en": "CREATE.", "ar": "ابدع."}'::jsonb,
        'Hero Title Line 1 Accent'
    ),
    (
        'hero_title_2',
        '{"en": "BUILD THE", "ar": "اصنع"}'::jsonb,
        'Hero Title Line 2'
    ),
    (
        'hero_title_2_accent',
        '{"en": "FUTURE.", "ar": "المستقبل."}'::jsonb,
        'Hero Title Line 2 Accent'
    ),
    (
        'hero_subtitle',
        '{"en": "The ultimate toolkit for students, founders, and creators.", "ar": "الأدوات اللي تحتاجها، سواء للمذاكرة، للمشاريع الجانبية، أو حتى لو تبي تبدأ ستارت أب."}'::jsonb,
        'Hero Subtitle'
    ),
    (
        'footer_text',
        '{"en": "BUILT FOR BUILDERS. POWERED BY STUDENTS.", "ar": "تم التطوير بواسطة المبدعين، للمبدعين"}'::jsonb,
        'Footer Main Text'
    ) ON CONFLICT (key) DO NOTHING;
-- Navigation
INSERT INTO navigation (label, path, "order", is_button)
VALUES (
        '{"en": "Tools", "ar": "الأدوات"}'::jsonb,
        '/tools',
        1,
        false
    ),
    (
        '{"en": "Playbook", "ar": "الشروحات"}'::jsonb,
        '/playbook',
        2,
        false
    ),
    (
        '{"en": "Academy", "ar": "الأكاديمية"}'::jsonb,
        '/academy',
        3,
        false
    ),
    (
        '{"en": "Prompts", "ar": "الأوامر"}'::jsonb,
        '/prompts',
        4,
        false
    ) ON CONFLICT DO NOTHING;
-- Home Cards
INSERT INTO home_cards (
        title,
        description,
        icon_name,
        link,
        color,
        "order",
        is_featured
    )
VALUES (
        '{"en": "Explore Tools", "ar": "استكشف الأدوات"}'::jsonb,
        '{"en": "Discover the best AI tools for students.", "ar": "اكتشف أفضل أدوات الذكاء الاصطناعي للطلاب."}'::jsonb,
        'Zap',
        '/tools',
        'purple',
        1,
        false
    ),
    (
        '{"en": "View Playbooks", "ar": "تصفح الشروحات"}'::jsonb,
        '{"en": "Detailed guides and tutorials.", "ar": "شروحات ودروس مفصلة لكيفية الاستخدام."}'::jsonb,
        'BookOpen',
        '/playbook',
        'blue',
        2,
        false
    ),
    (
        '{"en": "Start Learning", "ar": "ابدأ التعلم"}'::jsonb,
        '{"en": "Master AI development skills.", "ar": "احترف مهارات تطوير الذكاء الاصطناعي."}'::jsonb,
        'Terminal',
        '/academy',
        'green',
        3,
        false
    ),
    (
        '{"en": "Browse Prompts", "ar": "مكتبة الأوامر"}'::jsonb,
        '{"en": "Ready-to-use prompts for study.", "ar": "أوامر جاهزة للاستخدام في دراستك."}'::jsonb,
        'GraduationCap',
        '/prompts',
        'orange',
        4,
        false
    );