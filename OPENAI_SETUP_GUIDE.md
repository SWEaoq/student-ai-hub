# Step-by-Step Guide: Setting Up OpenAI API Key

## Step 1: Create an OpenAI Account and Get API Key

### 1.1 Create Account
1. Go to **https://platform.openai.com/**
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Sign up with your email or use Google/Microsoft account

### 1.2 Add Payment Method (Required)
1. Once logged in, go to **Settings** → **Billing**
2. Click **"Add payment method"**
3. Add your credit card (OpenAI requires this even for free tier usage)
4. You'll get $5 free credit to start

### 1.3 Create API Key
1. Go to **https://platform.openai.com/api-keys**
2. Click **"Create new secret key"**
3. Give it a name (e.g., "Student AI Hub")
4. **IMPORTANT**: Copy the key immediately - you won't see it again!
   - It looks like: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
5. Save it somewhere safe (password manager recommended)

## Step 2: Add API Key to Your Website

### 2.1 Create .env File
1. In your project root folder (`student-ai-hub`), create a file named `.env`
2. If `.env` already exists, open it

### 2.2 Add the API Key and Rate Limits
Open `.env` and add these lines:

```env
# Required: Your OpenAI API Key
VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here

# Optional: Rate Limiting (uncomment to enable)
# VITE_AI_MIN_INTERVAL=100          # Milliseconds between requests (default: 100ms)
# VITE_AI_DAILY_LIMIT=100           # Max requests per day (0 = unlimited)
# VITE_AI_MONTHLY_LIMIT=2000        # Max requests per month (0 = unlimited)
```

**Replace `sk-proj-your-actual-key-here` with your actual API key!**

Example:
```env
VITE_OPENAI_API_KEY=sk-proj-abc123xyz789...
VITE_AI_MIN_INTERVAL=200
VITE_AI_DAILY_LIMIT=50
VITE_AI_MONTHLY_LIMIT=1000
```

**Rate Limit Options Explained:**
- `VITE_AI_MIN_INTERVAL`: Time to wait between requests (prevents rapid-fire calls)
  - `100` = 100ms (10 requests/second max)
  - `1000` = 1 second (1 request/second max)
  - `2000` = 2 seconds (safer for free tier)
  
- `VITE_AI_DAILY_LIMIT`: Maximum requests per day
  - `0` = No limit
  - `50` = Stop after 50 requests per day
  - `100` = Stop after 100 requests per day
  
- `VITE_AI_MONTHLY_LIMIT`: Maximum requests per month
  - `0` = No limit
  - `1000` = Stop after 1000 requests per month
  - `5000` = Stop after 5000 requests per month

### 2.3 Verify .env File Location
Make sure `.env` is in the root directory:
```
student-ai-hub/
├── .env          ← Should be here
├── package.json
├── src/
└── ...
```

### 2.4 Restart Development Server
1. Stop your dev server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```
3. The environment variable will now be loaded

## Step 3: Understanding Rate Limits

### Current Rate Limiting (Already Implemented)
The code already has basic rate limiting:
- **100ms delay** between requests (prevents too many rapid calls)
- This is a simple client-side throttle

### OpenAI's Built-in Limits
OpenAI has their own rate limits:
- **Free tier**: ~3 requests/minute
- **Paid tier**: Varies by plan (check your dashboard)

### Step 3.1: Check Your Rate Limits
1. Go to **https://platform.openai.com/account/limits**
2. See your current limits:
   - **Rate limits**: Requests per minute
   - **Usage limits**: Tokens per minute/day

## Step 4: Configure Rate Limits (Already Implemented!)

Rate limiting is already built in! Just configure it in your `.env` file:

### 4.1 Basic Rate Limiting (Time Between Requests)
Add to `.env`:
```env
VITE_AI_MIN_INTERVAL=200  # Wait 200ms between requests
```

**Recommended values:**
- **Free tier**: `2000` (2 seconds) - safer, prevents rate limit errors
- **Paid tier**: `100` (100ms) - faster, but costs more
- **Testing**: `500` (0.5 seconds) - balanced

### 4.2 Daily Request Limit
Add to `.env`:
```env
VITE_AI_DAILY_LIMIT=50  # Max 50 requests per day
```

**Recommended values:**
- **Free tier**: `20-50` requests/day
- **Paid tier**: `100-500` requests/day
- **Unlimited**: `0` or don't set it

### 4.3 Monthly Request Limit
Add to `.env`:
```env
VITE_AI_MONTHLY_LIMIT=1000  # Max 1000 requests per month
```

**Recommended values:**
- **Free tier**: `500-1000` requests/month
- **Paid tier**: `5000-10000` requests/month
- **Unlimited**: `0` or don't set it

### 4.4 Example .env Configuration

**For Free Tier (Conservative):**
```env
VITE_OPENAI_API_KEY=sk-proj-your-key
VITE_AI_MIN_INTERVAL=2000
VITE_AI_DAILY_LIMIT=30
VITE_AI_MONTHLY_LIMIT=500
```

**For Paid Tier (Balanced):**
```env
VITE_OPENAI_API_KEY=sk-proj-your-key
VITE_AI_MIN_INTERVAL=200
VITE_AI_DAILY_LIMIT=100
VITE_AI_MONTHLY_LIMIT=5000
```

**For Development (Unlimited):**
```env
VITE_OPENAI_API_KEY=sk-proj-your-key
VITE_AI_MIN_INTERVAL=100
# No daily/monthly limits
```

### 4.5 Check Your Current Usage
The limits are tracked in browser localStorage. To check:
1. Open browser console (F12)
2. Go to **Application** tab → **Local Storage**
3. Look for keys like:
   - `ai_usage_2024-01-15` (daily)
   - `ai_usage_2024-01` (monthly)

## Step 5: Test the Setup

### 5.1 Test in Admin Panel
1. Start your dev server: `npm run dev`
2. Go to `/admin/login` and log in
3. Go to **Tools** tab
4. Click **"Add New Tool"**
5. Fill in:
   - Category: `writing`
   - Name: `Test Tool`
6. Click the **🎯 Generate Description** button
7. If it works, you'll see AI-generated text appear!

### 5.2 Test Semantic Search
1. Go to `/tools` page
2. Click the **✨ sparkle icon** in the search bar
3. Type a search query (e.g., "code editor")
4. Results should appear based on meaning, not just keywords

### 5.3 Check for Errors
- Open browser console (F12)
- Look for any red error messages
- Common issues:
  - "API key is not configured" → Check `.env` file
  - "Invalid API key" → Key might be wrong
  - "Insufficient quota" → Need to add credits

## Step 6: Monitor Usage and Costs

### 6.1 Check Usage Dashboard
1. Go to **https://platform.openai.com/usage**
2. See:
   - **Current usage** (tokens used)
   - **Cost** (in USD)
   - **Daily/monthly breakdown**

### 6.2 Set Usage Limits (Recommended)
1. Go to **https://platform.openai.com/account/billing/limits**
2. Set **Hard limit** (e.g., $10/month)
3. This prevents unexpected charges

### 6.3 Cost Estimates
- **Embeddings**: ~$0.02 per 1M tokens
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Typical search**: ~100-500 tokens per query
- **Content generation**: ~200-1000 tokens per generation

## Troubleshooting

### Problem: "OpenAI API key is not configured"
**Solution**: 
- Check `.env` file exists in root directory
- Verify the key starts with `sk-`
- Restart dev server after adding `.env`

### Problem: "Invalid API key"
**Solution**:
- Make sure you copied the entire key
- Check for extra spaces
- Try creating a new key

### Problem: "Rate limit exceeded"
**Solution**:
- Wait a few minutes
- Increase `MIN_REQUEST_INTERVAL` in `aiService.js`
- Check your OpenAI dashboard for actual limits

### Problem: "Insufficient quota"
**Solution**:
- Add payment method in OpenAI dashboard
- Add credits to your account
- Check billing settings

## Security Notes

⚠️ **Important for Production**:
- The API key is currently exposed in the client bundle
- For production, use **Supabase Edge Functions** to hide the key
- Or use **Supabase's built-in AI features** if available

## Next Steps

1. ✅ Get OpenAI API key
2. ✅ Add to `.env` file
3. ✅ Restart dev server
4. ✅ Test in admin panel
5. ✅ Monitor usage dashboard
6. ⚠️ Set usage limits
7. 🚀 Start using AI features!
