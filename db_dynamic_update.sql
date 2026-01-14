-- Enable pgvector extension for vector similarity search
-- Run this in your Supabase SQL editor if pgvector is not already enabled
-- CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding columns to tools table
ALTER TABLE tools 
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Add embedding columns to prompts table
ALTER TABLE prompts 
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create indexes for vector similarity search using cosine distance
-- This enables fast similarity searches
CREATE INDEX IF NOT EXISTS tools_embedding_idx ON tools 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS prompts_embedding_idx ON prompts 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Note: ivfflat indexes require at least some data to be effective
-- If you have less than 100 rows, consider using a different index type or no index initially
