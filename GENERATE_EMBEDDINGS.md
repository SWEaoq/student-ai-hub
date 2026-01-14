# How to Generate Embeddings for Recommendations

## Problem
Recommendations don't show because tools don't have embeddings yet.

## Quick Fix: Generate Embeddings

### Option 1: Generate via Browser Console (Easiest)

1. Open your website
2. Go to any tool detail page
3. Open browser console (F12)
4. Paste this code:

```javascript
// Generate embedding for current tool
const generateEmbeddingForTool = async (toolId) => {
  const { generateEmbedding } = await import('./src/lib/aiService.js');
  const { generateAndStoreEmbedding } = await import('./src/utils/embeddings.js');
  const { supabase } = await import('./src/lib/supabase.js');
  
  // Fetch tool
  const { data: tool } = await supabase
    .from('tools')
    .select('*')
    .eq('id', toolId)
    .single();
  
  if (!tool) {
    console.error('Tool not found');
    return;
  }
  
  console.log('Generating embedding for:', tool.name);
  const success = await generateAndStoreEmbedding(tool, 'tool');
  console.log(success ? '✅ Success!' : '❌ Failed');
};

// Get current tool ID from URL
const toolId = window.location.pathname.split('/tool/')[1];
if (toolId) {
  generateEmbeddingForTool(toolId);
} else {
  console.log('Not on a tool detail page');
}
```

### Option 2: Generate All Embeddings (Admin Function)

Add this to your admin dashboard or run in console:

```javascript
// Generate embeddings for all tools
const generateAllEmbeddings = async () => {
  const { generateEmbeddingsForAll } = await import('./src/utils/embeddings.js');
  
  console.log('Starting batch embedding generation...');
  const result = await generateEmbeddingsForAll('tool', (current, total) => {
    console.log(`Progress: ${current}/${total}`);
  });
  
  console.log('✅ Done!', result);
};

generateAllEmbeddings();
```

### Option 3: Add to Admin Dashboard

I can add a button in the admin dashboard to generate embeddings. Would you like me to do that?

## Verify Embeddings Exist

Check in browser console:

```javascript
const { supabase } = await import('./src/lib/supabase.js');
const { data } = await supabase
  .from('tools')
  .select('id, name, embedding')
  .not('embedding', 'is', null)
  .limit(5);

console.log('Tools with embeddings:', data);
```

## Why This Happens

- New tools don't have embeddings automatically
- Embeddings need to be generated once per tool
- After generation, recommendations will work

## After Generating Embeddings

1. Refresh the tool detail page
2. Scroll down
3. You should see "Similar Tools" section
4. It will show 3 similar tools
