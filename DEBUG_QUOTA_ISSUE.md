# Debug: Quota Error Even With Credits

## 🔍 Step-by-Step Debugging

### Step 1: Test API Connection

I've added a test button to your admin dashboard. 

1. Go to `/admin/dashboard`
2. Look for **"Test OpenAI Connection"** button at the top
3. Click **"Run Test"**
4. Check the results - it will tell you exactly what's wrong

### Step 2: Check Common Issues

#### Issue 1: Wrong API Key
**Symptoms:**
- Dashboard shows no usage
- Getting quota errors
- Key might be from different account

**Fix:**
1. Go to https://platform.openai.com/api-keys
2. Check which account/organization the key belongs to
3. Make sure it's the SAME account where you added $5
4. If unsure, create a NEW key from the account with credits

#### Issue 2: Organization Mismatch
**Symptoms:**
- Credits in one account
- API key from different organization

**Fix:**
1. Go to https://platform.openai.com/org-settings
2. Check which organization is active
3. Make sure API key and credits are in same org
4. Switch organization if needed (top right dropdown)

#### Issue 3: Spending Limits
**Symptoms:**
- Credits added but can't use
- Organization has $0 spending limit

**Fix:**
1. Go to https://platform.openai.com/org-settings
2. Check "Spending limits" section
3. Increase or remove spending limit
4. Make sure limit is higher than your credits

#### Issue 4: Account Verification
**Symptoms:**
- Payment method added but not verified
- Account needs verification

**Fix:**
1. Check email for verification link
2. Go to https://platform.openai.com/account
3. Verify email and phone if required

### Step 3: Verify API Key in Code

1. Open browser console (F12)
2. Type this and press Enter:
   ```javascript
   console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY?.substring(0, 10) + '...')
   ```
3. Check if key is loaded
4. Compare first 10 characters with your actual key

### Step 4: Check Browser Console

1. Open browser console (F12)
2. Try generating content
3. Look for error messages
4. Check for `[AI Service]` logs - they show detailed info

### Step 5: Manual API Test

Test the API key directly:

1. Open browser console (F12)
2. Paste this code:
   ```javascript
   const testKey = async () => {
     const key = import.meta.env.VITE_OPENAI_API_KEY;
     console.log('Testing key:', key?.substring(0, 10) + '...');
     
     const response = await fetch('https://api.openai.com/v1/models', {
       headers: {
         'Authorization': `Bearer ${key}`
       }
     });
     
     const data = await response.json();
     console.log('Status:', response.status);
     console.log('Response:', data);
     
     if (!response.ok) {
       console.error('Error:', data);
     }
   };
   
   testKey();
   ```
3. Check the response - it will show if key works

## 🎯 Quick Checklist

- [ ] API key is from the SAME account where you added $5
- [ ] Organization settings allow spending
- [ ] Spending limit is set (or removed)
- [ ] Payment method is verified
- [ ] Account email is verified
- [ ] Test button shows connection works
- [ ] Browser console shows correct API key
- [ ] Manual API test returns 200 status

## 🔧 Most Common Fix

**90% of the time, it's this:**

1. You have multiple OpenAI accounts/organizations
2. Credits are in Account A
3. API key is from Account B
4. They don't match!

**Solution:**
- Create a NEW API key from the account where you added $5
- Update your `.env` file with the new key
- Restart dev server

## 📞 Still Not Working?

Run this in browser console and share the output:

```javascript
// Full diagnostic
import { runDiagnostic } from './src/utils/testOpenAI.js';
runDiagnostic();
```

Or use the test button in admin dashboard - it does the same thing!
