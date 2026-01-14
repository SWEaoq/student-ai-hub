/**
 * Test OpenAI API connection and diagnose issues
 * Run this in browser console to debug API key issues
 */

import { generateEmbedding } from '../lib/aiService';

/**
 * Test OpenAI API connection
 * Returns detailed diagnostic information
 */
export const testOpenAIConnection = async () => {
  const results = {
    timestamp: new Date().toISOString(),
    apiKeyConfigured: false,
    apiKeyPreview: '',
    apiKeyLength: 0,
    testResult: null,
    error: null,
    recommendations: []
  };

  // Check if API key is configured
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    results.error = 'API key not found in environment variables';
    results.recommendations.push('Add VITE_OPENAI_API_KEY to your .env file');
    results.recommendations.push('Restart your dev server after adding the key');
    return results;
  }

  results.apiKeyConfigured = true;
  results.apiKeyPreview = apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4);
  results.apiKeyLength = apiKey.length;

  // Validate key format
  if (!apiKey.startsWith('sk-')) {
    results.error = 'Invalid API key format';
    results.recommendations.push('API key should start with "sk-" or "sk-proj-"');
    results.recommendations.push('Get a new key from https://platform.openai.com/api-keys');
    return results;
  }

  // Test with a simple embedding request
  try {
    console.log('[Test] Attempting to generate embedding...');
    const embedding = await generateEmbedding('test');
    
    if (embedding && Array.isArray(embedding) && embedding.length > 0) {
      results.testResult = 'SUCCESS';
      results.recommendations.push('✅ API key is working correctly!');
      results.recommendations.push('If you still get quota errors, check organization settings');
    } else {
      results.testResult = 'UNEXPECTED_RESPONSE';
      results.error = 'Got response but embedding is invalid';
    }
  } catch (error) {
    results.testResult = 'FAILED';
    results.error = error.message;
    
    // Provide specific recommendations based on error
    if (error.message.includes('quota') || error.message.includes('billing')) {
      results.recommendations.push('🔴 Quota/Billing Issue:');
      results.recommendations.push('1. Go to https://platform.openai.com/account/billing');
      results.recommendations.push('2. Verify payment method is added and active');
      results.recommendations.push('3. Check credits balance');
      results.recommendations.push('4. Check organization settings: https://platform.openai.com/org-settings');
      results.recommendations.push('5. Make sure API key belongs to the account with credits');
    } else if (error.message.includes('invalid') || error.message.includes('401')) {
      results.recommendations.push('🔴 Invalid API Key:');
      results.recommendations.push('1. Verify key in .env file is correct');
      results.recommendations.push('2. Create new key: https://platform.openai.com/api-keys');
      results.recommendations.push('3. Make sure you copied the entire key');
    } else if (error.message.includes('rate limit')) {
      results.recommendations.push('🟡 Rate Limit:');
      results.recommendations.push('Wait a few minutes and try again');
    } else {
      results.recommendations.push('🔴 Unknown Error:');
      results.recommendations.push('Check browser console for full error details');
      results.recommendations.push('Error: ' + error.message);
    }
  }

  return results;
};

/**
 * Print test results in a readable format
 */
export const printTestResults = (results) => {
  console.log('\n' + '='.repeat(60));
  console.log('OpenAI API Connection Test Results');
  console.log('='.repeat(60));
  console.log('Timestamp:', results.timestamp);
  console.log('API Key Configured:', results.apiKeyConfigured ? '✅ Yes' : '❌ No');
  
  if (results.apiKeyConfigured) {
    console.log('API Key Preview:', results.apiKeyPreview);
    console.log('API Key Length:', results.apiKeyLength);
  }
  
  console.log('\nTest Result:', results.testResult || 'Not tested');
  
  if (results.error) {
    console.log('\n❌ Error:', results.error);
  }
  
  if (results.recommendations.length > 0) {
    console.log('\n📋 Recommendations:');
    results.recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
  }
  
  console.log('='.repeat(60) + '\n');
  
  return results;
};

/**
 * Run full diagnostic test
 */
export const runDiagnostic = async () => {
  console.log('🔍 Starting OpenAI API diagnostic...');
  const results = await testOpenAIConnection();
  printTestResults(results);
  return results;
};
