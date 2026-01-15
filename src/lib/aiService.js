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
    ? `اكتب وصفاً عملياً ومختصراً جداً لأداة الذكاء الاصطناعي "${toolName}" في فئة "${category}". الشروط: سطرين كحد أقصى. ممنوع استخدام لغة تسويقية أو مبالغات. ممنوع القوائم. ركز فقط على وظيفة الأداة.`
    : `Write a strictly factual, concise description for an AI tool named "${toolName}" in the "${category}" category. Constraints: Maximum 2 lines. NO promotional language or fluff. NO bullet points. Focus only on what it does.`;

  return await generateContent(prompt, { maxTokens: 200 });
};

/**
 * Generate steps for a playbook
 * @param {string} title - Title of the playbook
 * @param {string} category - Category of the playbook
 * @param {string} lang - Language ('en' or 'ar')
 * @returns {Promise<Array>} Array of steps { title, content }
 */
export const generatePlaybookSteps = async (title, category, lang = 'en') => {
  const prompt = lang === 'ar'
    ? `أنشئ خطوات عملية ودراسية لكتيب إرشادي (Playbook) بعنوان "${title}" في قسم "${category}".
       يجب أن تكون الخطوات موجهة للطلاب.
       أرجع النتيجة بصيغة JSON فقط مصفوفة من النصوص (Strings)، كل نص يمثل خطوة كاملة.
       مثال:
       [
         "الخطوة 1: افعل كذا...",
         "الخطوة 2: ثم افعل كذا..."
       ]
       بدون أي نصوص إضافية أو markdown code blocks.`
    : `Create practical study steps for a Playbook titled "${title}" in the "${category}" category.
       The steps should be student-focused.
       Return the result strictly as a valid JSON array of strings, where each string is a complete step.
       Example:
       [
         "Step 1: Do this...",
         "Step 2: Then do that..."
       ]
       Do not include any extra text or markdown code blocks.`;

  const response = await generateContent(prompt, { maxTokens: 1000, temperature: 0.7 });
  
  try {
    const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Failed to parse playbook steps:", e);
    // Return a fallback single step so the UI doesn't crash
    return [{ title: lang === 'ar' ? "خطوة مولدة" : "Generated Step", content: response }];
  }
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
 * Generate a Lucide icon name suggestion
 * @param {string} name - Name of the item
 * @param {string} description - Description of the item
 * @returns {Promise<string>} Generated icon name
 */
export const generateIconSuggestion = async (name, description) => {
  const prompt = `Based on the following item name and description, suggest a SINGLE, suitable Lucide icon name.
  
  Item Name: "${name}"
  Description: "${description}"
  
  Popular Lucide Icons: Zap, Book, GraduationCap, Code, PenTool, Database, Brain, Rocket, Lightbulb, Search, MessageCircle, FileText, Image, Video, Music, Calendar, Clock, User, Users, Settings, Tool, Wrench, Briefcase, DollarSign, Calculator, Globe, Map, Compass, Camera, Mic, Speaker, Heart, Star, Flag, Check, X, Plus, Minus, Info, Help, AlertTriangle, Shield, Lock, Unlock, Key, Trash, Edit, Save, Share, Link, ExternalLink, Download, Upload, Copy, Printer, Eye, EyeOff, Layout, Grid, List, Menu, Home, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, ChevronUp, ChevronDown.
  
  Return ONLY the icon name (e.g., "Zap" or "GraduationCap"). No extra text, no markdown.`;
  
  const icon = await generateContent(prompt, { maxTokens: 10, temperature: 0.3 });
  
  // Clean up result just in case
  return icon.replace(/[^a-zA-Z]/g, '').trim();
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
    You are a specialized AI assistant for "Student AI Hub".
    
    CRITICAL INSTRUCTIONS:
    1. SCOPE: Answer questions about AI tools, coding, studying, and productivity. Refuse off-topic queries politely.
    2. LANGUAGE: The user's interface language is "${lang}". If "${lang}" is "ar", EVERYTHING must be in Arabic. Otherwise, English.
    
    RECOMMENDATION LOGIC:
    - Analyze the user's request.
    - Select the best tool from the "AVAILABLE TOOLS" list below.
    - If the user asks about building a project, YOU MUST ALSO recommended a "stack".
    - IMPORTANT: You can (and often should) return BOTH a "toolId" AND a "stack". For example, if the user wants to code, recommend "Cursor" (toolId: "cursor") AND the tech stack.

    FEW-SHOT EXAMPLES:
    User: "I need to write a blog post"
    Result: {
      "reply": "I recommend ChatGPT for writing content.",
      "toolId": "chatgpt",
      "usagePrompt": "Write a 500-word blog post about the future of AI in education. Use a professional but engaging tone.", 
      "stack": null
    }

    User: "How do I build a react app?"
    Result: {
      "reply": "You should use Cursor, it's great for React development.",
      "toolId": "cursor",
      "usagePrompt": "Act as a senior React developer. Initialize a new React project using Vite and explain the folder structure.",
      "stack": ["React", "Vite", "TailwindCSS"]
    }
    
    RESPONSE FORMAT (JSON ONLY):
    {
      "reply": "Conversational, helpful answer. Mention the recommended tool by name here if applicable.",
      "toolId": "EXACT_ID_FROM_LIST OR null. (If you mention a tool in reply, you MUST put its ID here)",
      "reasoning": "A short, direct explanation TO THE USER about why this tool/stack is good for them.",
      "usagePrompt": "STRICTLY ONLY the prompt text to copy. NO introductions like 'Here is the prompt'. NO quotes around it. Example: 'Explain quantum physics to a 5 year old.'",
      "stack": ["Tech 1", "Tech 2", "Tech 3"] (Required for build/code requests)
    }

    AVAILABLE TOOLS:
    ${JSON.stringify(toolsContext)}
  `;

  const response = await generateContent(systemPrompt + `\n\nUser Query: "${userQuery}"`, { 
    model: 'gpt-4o',
    temperature: 0.3,
    maxTokens: 500
  });

  try {
    // Clean potential markdown code blocks if the model adds them
    const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJson);

    // FIX: Handle "null" string from AI
    if (result.toolId === 'null' || result.toolId === 'undefined') {
        result.toolId = null;
    }
    // Validate stack to prevent crashes
    if (result.stack) {
      if (!Array.isArray(result.stack)) {
         if (typeof result.stack === 'string') {
             // If the AI returned a string (e.g. "React, Node"), split it
             result.stack = result.stack.split(',').map(s => s.trim());
         } else {
             // If invalid type, fallback to empty
             result.stack = [];
         }
      }

      // Final Check: Ensure every item in stack is a string. 
      // Sometimes AI returns [{name: "React"}] which crashes React render.
      result.stack = result.stack
          .filter(item => typeof item === 'string' && item.trim().length > 0)
          .map(item => item.trim()); // normalize
    } else {
        result.stack = [];
    }

    // fallback: if toolId is missing but we mention a tool in the reply, try to find it
    if (!result.toolId && tools && Array.isArray(tools)) {
        const lowerReply = (result.reply || '').toLowerCase();
        
        // Console log for debugging
        console.log('[AI Service] Attempting fallback tool detection. Reply excerpt:', lowerReply.substring(0, 50));

        const foundTool = tools.find(t => {
            const nameEn = t.content?.en?.name?.toLowerCase();
            const nameAr = t.content?.ar?.name?.toLowerCase();
            const id = t.id.toLowerCase();
            
            // Check for ID match or Name match in the text
            // We use word boundary logic or simple includes
            const matchesId = id && lowerReply.includes(id);
            const matchesNameEn = nameEn && lowerReply.includes(nameEn);
            const matchesNameAr = nameAr && lowerReply.includes(nameAr);
            
            if (matchesId || matchesNameEn || matchesNameAr) {
                console.log(`[AI Service] Fallback match found: ${t.id} (Matches: ID=${matchesId}, Name=${matchesNameEn})`);
                return true;
            }
            return false;
        });

        if (foundTool) {
            result.toolId = foundTool.id;
        } else {
             console.log('[AI Service] No fallback tool found.');
        }
    }

    return result;
  } catch (e) {
    console.error("Failed to parse AI recommendation:", e);
    // Fallback or error
    throw new Error("Failed to generate recommendation");
  }
};
