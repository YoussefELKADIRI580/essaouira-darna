-- تفعيل RLS على الجداول (إذا لم تكن مفعلة مسبقاً)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. سياسات جدول التبرعات (donations)
-- السماح للجميع بقراءة التبرعات (مطلوب من أجل RecentDonors)
DROP POLICY IF EXISTS "Allow public read donations" ON donations;
CREATE POLICY "Allow public read donations" ON donations
  FOR SELECT TO public USING (true);

-- السماح للجميع بإضافة تبرعات جديدة
DROP POLICY IF EXISTS "Allow public insert donations" ON donations;
CREATE POLICY "Allow public insert donations" ON donations
  FOR INSERT TO public WITH CHECK (true);

-- 2. سياسات جدول المشاريع (projects)
-- السماح للجميع بقراءة المشاريع
DROP POLICY IF EXISTS "Allow public read projects" ON projects;
CREATE POLICY "Allow public read projects" ON projects
  FOR SELECT TO public USING (true);

-- السماح للجميع بتحديث المشاريع (مطلوب لزيادة المبلغ المجموع raised_amount)
DROP POLICY IF EXISTS "Allow public update projects" ON projects;
CREATE POLICY "Allow public update projects" ON projects
  FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 3. سياسات جدول المستلزمات (project_supplies)
-- السماح للجميع بقراءة المستلزمات
DROP POLICY IF EXISTS "Allow public read project_supplies" ON project_supplies;
CREATE POLICY "Allow public read project_supplies" ON project_supplies
  FOR SELECT TO public USING (true);

-- السماح للجميع بتحديث المستلزمات (مطلوب لتحويل is_fulfilled إلى true)
DROP POLICY IF EXISTS "Allow public update project_supplies" ON project_supplies;
CREATE POLICY "Allow public update project_supplies" ON project_supplies
  FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 4. سياسات جدول الاتصال (contact_messages)
-- السماح للجميع بقراءة رسائل (اختياري)
DROP POLICY IF EXISTS "Allow public read contact_messages" ON contact_messages;
CREATE POLICY "Allow public read contact_messages" ON contact_messages
  FOR SELECT TO public USING (true);

-- السماح للجميع بإرسال رسائل
DROP POLICY IF EXISTS "Allow public insert contact_messages" ON contact_messages;
CREATE POLICY "Allow public insert contact_messages" ON contact_messages
  FOR INSERT TO public WITH CHECK (true);
