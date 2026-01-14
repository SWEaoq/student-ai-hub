# AI Features Setup Guide

This guide explains how to set up and use the AI features in the Student AI Hub.

## Required Environment Variables

Add the following to your `.env` file:

```env
# OpenAI Configuration (Required for AI features)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

## Database Setup

### 1. Enable pgvector Extension

Run this in your Supabase SQL editor:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 2. Run Database Migration

Execute the SQL in `db_dynamic_update.sql` to:
- Add embedding columns to `tools` and `prompts` tables
- Create vector indexes for fast similarity search

### 3. Generate Embeddings for Existing Data

After setting up the database, you'll need to generate embeddings for existing tools and prompts. This can be done through:

1. **Admin Panel** (when implemented): Use the "Generate Embeddings" button
2. **Manual Script**: Create a utility script to batch generate embeddings
3. **Automatic**: New items will have embeddings generated when created (if implemented)

## Features

### 1. Semantic Search

- **Location**: Tools and Prompts pages
- **Usage**: Click the sparkle icon (✨) in the search bar to enable AI-powered semantic search
- **How it works**: Converts search queries to embeddings and finds similar content using vector similarity

### 2. Smart Recommendations

- **Location**: Tool Detail pages
- **How it works**: Shows similar tools based on embedding similarity
- **Requirements**: Tools must have embeddings generated

### 3. Content Generation

- **Location**: Admin panels (Tools and Prompts)
- **Features**:
  - Generate descriptions
  - Generate taglines
  - Translate content between English and Arabic
  - Generate prompt text
- **Usage**: Click the AI generation buttons (🎯, ✨, 🌐, 🤖) next to form fields

## API Costs

- **Embeddings**: ~$0.02 per 1M tokens (text-embedding-3-small)
- **Content Generation**: ~$0.15-0.60 per 1M tokens (gpt-4o-mini)

## Security Notes

⚠️ **Important**: The current implementation uses the OpenAI API key directly in the client. For production:

1. **Recommended**: Use Supabase Edge Functions to proxy API calls
2. **Alternative**: Use Supabase's built-in AI features if available
3. **Current**: API key is exposed in client bundle (not recommended for production)

## Troubleshooting

### Embeddings not working
- Ensure pgvector extension is enabled
- Check that embedding columns exist in database
- Verify embeddings have been generated for your content

### Semantic search not finding results
- Make sure embeddings exist for the content
- Try adjusting the similarity threshold in `src/utils/embeddings.js`
- Check browser console for errors

### Content generation failing
- Verify `VITE_OPENAI_API_KEY` is set correctly
- Check API key has sufficient credits
- Review rate limits (100ms between requests)

## Next Steps

1. Set up environment variables
2. Run database migrations
3. Generate embeddings for existing content
4. Test semantic search and recommendations
5. Use AI content generation in admin panel
