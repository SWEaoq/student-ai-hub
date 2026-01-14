# Quick Start: OpenAI API Setup

## 🚀 3-Step Setup

### Step 1: Get API Key (2 minutes)
1. Go to **https://platform.openai.com/api-keys**
2. Click **"Create new secret key"**
3. **Copy the key** (starts with `sk-proj-...`)

### Step 2: Add to Website (1 minute)
1. Create `.env` file in project root
2. Add this line:
   ```env
   VITE_OPENAI_API_KEY=sk-proj-paste-your-key-here
   ```

### Step 3: Restart Server (30 seconds)
```bash
# Stop server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ Test It Works

1. Go to `/admin/login`
2. Click **Tools** → **Add New Tool**
3. Click **🎯 Generate Description** button
4. If text appears → **Success!** 🎉

## ⚙️ Optional: Add Rate Limits

Add to `.env`:
```env
VITE_AI_MIN_INTERVAL=2000      # 2 seconds between requests (safer)
VITE_AI_DAILY_LIMIT=50         # Max 50 requests per day
VITE_AI_MONTHLY_LIMIT=1000     # Max 1000 requests per month
```

## 📖 Full Guide

See `OPENAI_SETUP_GUIDE.md` for detailed instructions.
