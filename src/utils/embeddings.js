/**
 * Embedding utilities for generating and storing embeddings
 * Handles embedding generation for new content and batch processing for existing data
 */

import { generateEmbedding } from '../lib/aiService';
import { supabase } from '../lib/supabase';

/**
 * Generate text representation for embedding
 * Combines relevant fields into a single searchable string
 */
const getEmbeddingText = (item, type) => {
  if (type === 'tool') {
    const content = item.content || {};
    const en = content.en || {};
    const ar = content.ar || {};
    
    // Combine name, tag, description, and category for better semantic search
    const text = [
      en.name || item.name || '',
      en.tag || item.tag_line || '',
      en.description || item.description || '',
      ar.name || '',
      ar.tag || '',
      ar.description || '',
      item.category || '',
    ].filter(Boolean).join(' ');
    
    return text.trim();
  } else if (type === 'prompt') {
    const content = item.content || {};
    const en = content.en || {};
    const ar = content.ar || {};
    
    // Combine title, text, tag, and category
    const text = [
      en.title || '',
      en.text || '',
      en.tag || '',
      ar.title || '',
      ar.text || '',
      ar.tag || '',
      item.category || '',
    ].filter(Boolean).join(' ');
    
    return text.trim();
  }
  
  return '';
};

/**
 * Generate and store embedding for a single item
 * @param {Object} item - The item (tool or prompt) to generate embedding for
 * @param {string} type - 'tool' or 'prompt'
 * @returns {Promise<boolean>} Success status
 */
export const generateAndStoreEmbedding = async (item, type) => {
  try {
    if (!item || !item.id) {
      throw new Error('Item must have an id');
    }

    if (type !== 'tool' && type !== 'prompt') {
      throw new Error('Type must be "tool" or "prompt"');
    }

    const text = getEmbeddingText(item, type);
    
    if (!text || text.trim().length === 0) {
      console.warn(`No text found for ${type} ${item.id}, skipping embedding generation`);
      return false;
    }

    // Generate embedding
    const embedding = await generateEmbedding(text);

    // Store in database
    const table = type === 'tool' ? 'tools' : 'prompts';
    const { error } = await supabase
      .from(table)
      .update({ embedding })
      .eq('id', item.id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error(`Error generating embedding for ${type} ${item.id}:`, error);
    return false;
  }
};

/**
 * Generate embeddings for all items in a table
 * Useful for initial setup or batch regeneration
 * @param {string} type - 'tool' or 'prompt'
 * @param {Function} onProgress - Callback with (current, total) for progress tracking
 * @returns {Promise<{success: number, failed: number}>}
 */
export const generateEmbeddingsForAll = async (type, onProgress = null) => {
  if (type !== 'tool' && type !== 'prompt') {
    throw new Error('Type must be "tool" or "prompt"');
  }

  const table = type === 'tool' ? 'tools' : 'prompts';
  
  try {
    // Fetch all items
    const { data: items, error } = await supabase
      .from(table)
      .select('*');

    if (error) {
      throw error;
    }

    if (!items || items.length === 0) {
      return { success: 0, failed: 0 };
    }

    let success = 0;
    let failed = 0;

    // Process items one by one to avoid rate limits
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (onProgress) {
        onProgress(i + 1, items.length);
      }

      const result = await generateAndStoreEmbedding(item, type);
      if (result) {
        success++;
      } else {
        failed++;
      }

      // Small delay between items to respect rate limits
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    return { success, failed };
  } catch (error) {
    console.error(`Error generating embeddings for all ${type}s:`, error);
    throw error;
  }
};

/**
 * Search for similar items using vector similarity
 * @param {number[]} queryEmbedding - The embedding vector to search with
 * @param {string} type - 'tool' or 'prompt'
 * @param {Object} options - Search options
 * @param {number} options.limit - Number of results (default: 5)
 * @param {number} options.threshold - Similarity threshold (default: 0.7)
 * @param {string} options.excludeId - ID to exclude from results
 * @returns {Promise<Array>} Array of similar items with similarity scores
 */
export const findSimilarItems = async (queryEmbedding, type, options = {}) => {
  const { limit = 5, threshold = 0.7, excludeId = null } = options;

  if (type !== 'tool' && type !== 'prompt') {
    throw new Error('Type must be "tool" or "prompt"');
  }

  if (!queryEmbedding || !Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
    throw new Error('Valid embedding vector is required');
  }

  const table = type === 'tool' ? 'tools' : 'prompts';

  try {
    // Use Supabase RPC function for vector similarity search
    // This requires a database function to be created (see migration notes)
    
    // For now, we'll use a direct query approach
    // Note: This requires pgvector extension and proper indexing
    
    let query = supabase.rpc('match_' + table, {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: limit,
      exclude_id: excludeId,
    });

    // If RPC function doesn't exist, fall back to client-side filtering
    // (This is less efficient but works without database functions)
    const { data, error } = await query;

    if (error) {
      // Fallback: fetch all and filter client-side (not recommended for large datasets)
      console.warn('RPC function not available, using fallback method');
      const { data: allItems } = await supabase
        .from(table)
        .select('*')
        .not('embedding', 'is', null);

      if (!allItems) {
        return [];
      }

      // Calculate cosine similarity for each item
      const results = allItems
        .map(item => {
          if (!item.embedding || item.embedding.length === 0) return null;
          if (excludeId && item.id === excludeId) return null;

          const similarity = cosineSimilarity(queryEmbedding, item.embedding);
          return { ...item, similarity };
        })
        .filter(item => item !== null && item.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

      return results;
    }

    return data || [];
  } catch (error) {
    console.error(`Error finding similar ${type}s:`, error);
    return [];
  }
};

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} Similarity score (0-1)
 */
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
};

/**
 * Perform semantic search
 * @param {string} queryText - The search query text
 * @param {string} type - 'tool' or 'prompt'
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Array of matching items
 */
export const semanticSearch = async (queryText, type, options = {}) => {
  if (!queryText || queryText.trim().length === 0) {
    return [];
  }

  try {
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding(queryText.trim());

    // Find similar items
    const results = await findSimilarItems(queryEmbedding, type, options);

    return results;
  } catch (error) {
    console.error('Error performing semantic search:', error);
    return [];
  }
};
