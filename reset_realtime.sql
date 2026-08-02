-- =====================================================
-- Reset Script & Realtime Setup: جمعية الصويرة دارنا
-- Run this in Supabase SQL Editor to start from zero and enable real-time updates!
-- =====================================================

-- 1. Truncate previous donations and messages to start from scratch
TRUNCATE TABLE donations CASCADE;
TRUNCATE TABLE contact_messages CASCADE;
TRUNCATE TABLE sponsorships CASCADE;

-- 2. Reset projects raised amount to zero
UPDATE projects
SET raised_amount = 0;

-- 3. Reset project supplies fulfillment status to false
UPDATE project_supplies
SET is_fulfilled = false;

-- 4. Enable Supabase Realtime for live updates (progress bar and checklists)
DO $$
BEGIN
  -- Attempt to add projects table to publication
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE projects;
  EXCEPTION WHEN duplicate_object THEN
    -- Table is already in the publication, ignore
  END;

  -- Attempt to add project_supplies table to publication
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE project_supplies;
  EXCEPTION WHEN duplicate_object THEN
    -- Table is already in the publication, ignore
  END;

  -- Attempt to add donations table to publication
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE donations;
  EXCEPTION WHEN duplicate_object THEN
    -- Table is already in the publication, ignore
  END;
END $$;
