-- Add content column to playbooks table to store full guide content (steps, etc.)
ALTER TABLE playbooks
ADD COLUMN IF NOT EXISTS content jsonb;
-- Ensure RLS policies allow authenticated users (like admins) to insert/update
-- (Assuming policies from db_schema.sql style exist, but if not, we might need to add them)
-- For now, just the column addition is critical.