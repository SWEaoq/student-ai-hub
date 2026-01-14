-- Optional: Create RPC functions for efficient vector similarity search
-- Run this in your Supabase SQL editor after enabling pgvector extension
-- These functions provide better performance than client-side filtering

-- Function for finding similar tools
CREATE OR REPLACE FUNCTION match_tools(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5,
    exclude_id uuid DEFAULT NULL
)
RETURNS TABLE (
    id uuid,
    name text,
    tag_line text,
    description text,
    category text,
    url text,
    icon_name text,
    has_free_tier boolean,
    content jsonb,
    color text,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id,
        t.name,
        t.tag_line,
        t.description,
        t.category,
        t.url,
        t.icon_name,
        t.has_free_tier,
        t.content,
        t.color,
        1 - (t.embedding <=> query_embedding) AS similarity
    FROM tools t
    WHERE t.embedding IS NOT NULL
        AND (exclude_id IS NULL OR t.id != exclude_id)
        AND (1 - (t.embedding <=> query_embedding)) >= match_threshold
    ORDER BY t.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Function for finding similar prompts
CREATE OR REPLACE FUNCTION match_prompts(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5,
    exclude_id uuid DEFAULT NULL
)
RETURNS TABLE (
    id uuid,
    category text,
    content jsonb,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.category,
        p.content,
        1 - (p.embedding <=> query_embedding) AS similarity
    FROM prompts p
    WHERE p.embedding IS NOT NULL
        AND (exclude_id IS NULL OR p.id != exclude_id)
        AND (1 - (p.embedding <=> query_embedding)) >= match_threshold
    ORDER BY p.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Grant execute permissions (adjust based on your RLS policies)
-- These functions will be called by authenticated users via Supabase client
GRANT EXECUTE ON FUNCTION match_tools TO authenticated;
GRANT EXECUTE ON FUNCTION match_prompts TO authenticated;
GRANT EXECUTE ON FUNCTION match_tools TO anon;
GRANT EXECUTE ON FUNCTION match_prompts TO anon;
