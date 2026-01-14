/**
 * AI Service - OpenAI integration for embeddings and content generation
 * Handles API calls, error handling, and rate limiting
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

// Rate limiting configuration
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = parseInt(import.meta.env.VITE_AI_MIN_INTERVAL) || 100; // ms between requests (default: 100ms)

// Daily/monthly limits (optional - set in .env)
const DAILY_REQUEST_LIMIT = parseInt(import.meta.env.VITE_AI_DAILY_LIMIT) || 0; // 0 = unlimited
const MONTHLY_REQUEST_LIMIT = parseInt(import.meta.env.VITE_AI_MONTHLY_LIMIT) || 0; // 0 = unlimited

// Track usage (stored in localStorage)
const getUsageKey = (period) => `ai_usage_${period}`;
const getCurrentDate = () => new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const getCurrentMonth = () => new Date().toISOString().slice(0, 7); // YYYY-MM

/**
 * Get usage count for a period
 */
const getUsage = (period) => {
  const key = getUsageKey(period);
  const stored = localStorage.getItem(key);
  if (!stored) return { count: 0, date: period };
  
  const data = JSON.parse(stored);
  // Reset if it's a new day/month
  if (data.date !== period) {
    return { count: 0, date: period };
  }
  return data;
};

/**
 * Increment usage count
 */
const incrementUsage = (period) => {
  const key = getUsageKey(period);
  const current = getUsage(period);
  const newData = {
    count: current.count + 1,
    date: period,
    lastRequest: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(newData));
  return newData.count;
};

/**
 * Check if request is allowed based on limits
 */
const checkLimits = () => {
  if (DAILY_REQUEST_LIMIT > 0) {
    const dailyUsage = getUsage(getCurrentDate());
    if (dailyUsage.count >= DAILY_REQUEST_LIMIT) {
      throw new Error(`Daily request limit reached (${DAILY_REQUEST_LIMIT}). Please try again tomorrow.`);
    }
  }

  if (MONTHLY_REQUEST_LIMIT > 0) {
    const monthlyUsage = getUsage(getCurrentMonth());
    if (monthlyUsage.count >= MONTHLY_REQUEST_LIMIT) {
      throw new Error(`Monthly request limit reached (${MONTHLY_REQUEST_LIMIT}). Please try again next month.`);
    }
  }
};

/**
 * Wait if needed to respect rate limits
 */
const waitForRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();
};

/**
 * Make API request with error handling
 */
const makeRequest = async (endpoint, options = {}) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your environment variables.');
  }

  // Debug: Log API key info (first 10 chars only for security)
  const keyPreview = OPENAI_API_KEY.substring(0, 10) + '...';
  console.log('[AI Service] Making request to:', endpoint);
  console.log('[AI Service] API Key preview:', keyPreview);
  console.log('[AI Service] Key length:', OPENAI_API_KEY.length);

  // Check daily/monthly limits
  checkLimits();

  // Wait for rate limit
  await waitForRateLimit();

  try {
    const response = await fetch(`${OPENAI_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        ...options.headers,
      },
    });

    console.log('[AI Service] Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `API request failed: ${response.statusText}`;
      const errorType = errorData.error?.type || 'unknown';
      const errorCode = errorData.error?.code || response.status;
      
      console.error('[AI Service] Error details:', {
        status: response.status,
        statusText: response.statusText,
        errorMessage,
        errorType,
        errorCode,
        fullError: errorData
      });
      
      // Provide helpful messages for common errors
      if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorCode === 'insufficient_quota') {
        throw new Error(
          'OpenAI Quota Error - Debugging Steps:\n\n' +
          '1. Verify API Key:\n' +
          '   - Go to https://platform.openai.com/api-keys\n' +
          '   - Make sure you\'re using the correct key\n' +
          '   - Key should start with "sk-proj-" or "sk-"\n\n' +
          '2. Check Account:\n' +
          '   - Go to https://platform.openai.com/account/billing\n' +
          '   - Verify payment method is active\n' +
          '   - Check credits balance (should show $5+)\n\n' +
          '3. Check Organization:\n' +
          '   - Go to https://platform.openai.com/org-settings\n' +
          '   - Make sure API key belongs to correct organization\n' +
          '   - Check if organization has spending limits\n\n' +
          '4. Verify Usage:\n' +
          '   - Go to https://platform.openai.com/usage\n' +
          '   - Check if requests are showing up\n\n' +
          'Error Code: ' + errorCode + '\n' +
          'Error Type: ' + errorType + '\n' +
          'Original: ' + errorMessage
        );
      }
      
      if (errorMessage.includes('rate limit') || errorCode === 'rate_limit_exceeded') {
        throw new Error(
          'Rate limit exceeded. Please wait a moment and try again.\n\n' +
          'You can increase VITE_AI_MIN_INTERVAL in your .env file to slow down requests.'
        );
      }

      if (errorMessage.includes('invalid_api_key') || errorCode === 'invalid_api_key') {
        throw new Error(
          'Invalid API Key:\n\n' +
          '1. Check your .env file has the correct key\n' +
          '2. Go to https://platform.openai.com/api-keys\n' +
          '3. Create a new key if needed\n' +
          '4. Make sure key starts with "sk-proj-" or "sk-"'
        );
      }
      
      throw new Error(`Error ${errorCode}: ${errorMessage}`);
    }

    const result = await response.json();
    
    // Increment usage counters on success
    incrementUsage(getCurrentDate());
    incrementUsage(getCurrentMonth());
    
    return result;
  } catch (error) {
    // Don't increment usage on error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Failed to connect to OpenAI API');
  }
};

/**
 * Generate embedding vector for text using OpenAI
 * @param {string} text - Text to generate embedding for
 * @returns {Promise<number[]>} Embedding vector (1536 dimensions)
 */
export const generateEmbedding = async (text) => {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('Text is required for embedding generation');
  }

  const response = await makeRequest('/embeddings', {
    method: 'POST',
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text.trim(),
    }),
  });

  if (!response.data || !response.data[0] || !response.data[0].embedding) {
    throw new Error('Invalid response from embedding API');
  }

  return response.data[0].embedding;
};

/**
 * Generate content using GPT-4
 * @param {string} prompt - The prompt to send to GPT
 * @param {Object} options - Additional options
 * @param {string} options.model - Model to use (default: 'gpt-4o-mini')
 * @param {number} options.temperature - Temperature (0-2, default: 0.7)
 * @param {number} options.maxTokens - Max tokens (default: 500)
 * @returns {Promise<string>} Generated text
 */
export const generateContent = async (prompt, options = {}) => {
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error('Prompt is required for content generation');
  }

  const {
    model = 'gpt-4o-mini',
    temperature = 0.7,
    maxTokens = 500,
  } = options;

  const response = await makeRequest('/chat/completions', {
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt.trim(),
        },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.choices || !response.choices[0] || !response.choices[0].message) {
    throw new Error('Invalid response from content generation API');
  }

  return response.choices[0].message.content.trim();
};

/**
 * Find similar items using vector similarity search
 * @param {number[]} queryEmbedding - The embedding vector to search with
 * @param {string} table - Table name ('tools' or 'prompts')
 * @param {Object} options - Search options
 * @param {number} options.limit - Number of results (default: 5)
 * @param {number} options.threshold - Similarity threshold (default: 0.7)
 * @param {string} options.excludeId - ID to exclude from results
 * @returns {Promise<Array>} Array of similar items
 */
export const findSimilar = async (queryEmbedding, table, options = {}) => {
  const { limit = 5, threshold = 0.7, excludeId = null } = options;

  if (!queryEmbedding || !Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
    throw new Error('Valid embedding vector is required');
  }

  if (table !== 'tools' && table !== 'prompts') {
    throw new Error('Table must be "tools" or "prompts"');
  }

  // Note: This function assumes Supabase has pgvector extension enabled
  // and the embedding column exists. The actual vector search will be done
  // via Supabase RPC function or direct SQL query.
  // For now, we'll return a helper function that can be used with Supabase client
  
  return {
    queryEmbedding,
    table,
    limit,
    threshold,
    excludeId,
  };
};

/**
 * Generate text for tool description
 * @param {string} toolName - Name of the tool
 * @param {string} category - Category of the tool
 * @param {string} lang - Language ('en' or 'ar')
 * @returns {Promise<string>} Generated description
 */
export const generateToolDescription = async (toolName, category, lang = 'en') => {
  const prompt = lang === 'ar'
    ? `اكتب وصفًا مختصرًا وجذابًا لأداة AI اسمها "${toolName}" في فئة "${category}". يجب أن يكون الوصف بالعربية، واضحًا، ومفيدًا للطلاب. (حد أقصى 150 كلمة)`
    : `Write a concise and engaging description for an AI tool named "${toolName}" in the "${category}" category. The description should be clear, helpful for students, and highlight key features. (Maximum 150 words)`;

  return await generateContent(prompt, { maxTokens: 200 });
};

/**
 * Generate tagline for a tool
 * @param {string} toolName - Name of the tool
 * @param {string} description - Description of the tool
 * @param {string} lang - Language ('en' or 'ar')
 * @returns {Promise<string>} Generated tagline
 */
export const generateToolTagline = async (toolName, description, lang = 'en') => {
  const prompt = lang === 'ar'
    ? `أنشئ سطرًا واحدًا قصيرًا وجذابًا (tagline) لأداة AI اسمها "${toolName}". الوصف: "${description}". يجب أن يكون السطر بالعربية، قصيرًا (3-5 كلمات)، وجذابًا.`
    : `Create a short, catchy one-line tagline for an AI tool named "${toolName}". Description: "${description}". The tagline should be short (3-5 words), catchy, and memorable.`;

  return await generateContent(prompt, { maxTokens: 50, temperature: 0.8 });
};

/**
 * Translate text using AI
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language ('en' or 'ar')
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang) => {
  if (targetLang !== 'en' && targetLang !== 'ar') {
    throw new Error('Target language must be "en" or "ar"');
  }

  const prompt = targetLang === 'ar'
    ? `Translate the following text to Arabic. Keep the tone and style natural. Only return the translation, no explanations:\n\n${text}`
    : `Translate the following text to English. Keep the tone and style natural. Only return the translation, no explanations:\n\n${text}`;

  return await generateContent(prompt, { maxTokens: 300 });
};

/**
 * Generate prompt text for prompts vault
 * @param {string} category - Category of the prompt
 * @param {string} title - Title of the prompt
 * @param {string} lang - Language ('en' or 'ar')
 * @returns {Promise<string>} Generated prompt text
 */
export const generatePromptText = async (category, title, lang = 'en') => {
  const prompt = lang === 'ar'
    ? `أنشئ نص أمر (prompt) احترافي للذكاء الاصطناعي في فئة "${category}" بعنوان "${title}". يجب أن يكون النص بالعربية، واضحًا، ومفيدًا للطلاب. استخدم [BRACKETS] للمتغيرات التي يمكن للمستخدم تخصيصها.`
    : `Create a professional AI prompt text for the category "${category}" with the title "${title}". The prompt should be clear, helpful for students, and use [BRACKETS] for variables that users can customize.`;

  return await generateContent(prompt, { maxTokens: 300, temperature: 0.8 });
};

/**
 * Get tool recommendation and prompt based on user chat
 * @param {string} userQuery - The user's question or request
 * @param {Array} tools - List of available tools
 * @param {string} lang - Current language context ('en' or 'ar')
 * @returns {Promise<Object>} Recommendation object { toolId, reasoning, usagePrompt }
 */
export const getChatRecommendation = async (userQuery, tools, lang = 'en') => {
  // simplify tools list to save tokens, only keep essential info
  const toolsContext = tools.map(t => ({
    id: t.id,
    name: t.content.en.name,
    description: t.content.en.description,
    category: t.category
  }));

  const systemPrompt = `
    You are a specialized AI assistant for "Student AI Hub", an educational platform.
    
    CRITICAL SAFETY & SCOPE INSTRUCTIONS:
    1. SCOPE: You are ONLY allowed to answer questions related to:
       - AI tools and software
       - Studying, exams, and academic research
       - Coding and development
       - Productivity and workflow
    2. REFUSAL: If the user asks about ANY other topic (politics, religion, dating, violence, illegal acts, etc.), you MUST refuse politely by saying:
       "${lang === 'ar' 
          ? 'عذراً، أنا متخصص فقط في مساعدتك في دراستك وأدوات الذكاء الاصطناعي.' 
          : 'I can only assist with educational topics and AI tools.'}"
    3. LANGUAGE: Detect the language of the User Query. If it is Arabic, your entire JSON response (reasoning and prompt) MUST be in Arabic. If English, use English.

    TASK:
    Analyze the User Query and select the SINGLE BEST tool from the "Available Tools" list to solve their problem.
    Then, write a specific, high-quality prompt that the user can copy and paste into that tool.

    AVAILABLE TOOLS:
    ${JSON.stringify(toolsContext)}

    OUTPUT FORMAT:
    Return strictly valid JSON with no markdown formatting:
    {
      "toolId": "id_of_the_best_tool",
      "reasoning": "A short, helpful explanation of why this tool is best for this specific task (max 1 sentence).",
      "usagePrompt": "The actual prompt the user should copy. Make it detailed and fill in placeholders where possible."
    }
  `;

  const response = await generateContent(systemPrompt + `\n\nUser Query: "${userQuery}"`, { 
    model: 'gpt-4o-mini',
    temperature: 0.3, // Lower temp for more consistent logical tool selection
    maxTokens: 500
  });

  try {
    // Clean potential markdown code blocks if the model adds them
    const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Failed to parse AI recommendation:", e);
    // Fallback or error
    throw new Error("Failed to generate recommendation");
  }
};
