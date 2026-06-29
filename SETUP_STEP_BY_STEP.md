# Google Places API Setup - Step-by-Step Guide

This guide will walk you through setting up Google Places API to display live reviews on your website.

## 🎯 What You'll Need

- A Google account (Gmail)
- About 15-20 minutes
- Access to your Netlify account (for production)

---

## 📋 Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Open: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click the project dropdown at the top
   - Click **"New Project"**
   - Name it: `Chris Van Reviews` (or any name you like)
   - Click **"Create"**
   - Wait a few seconds for it to be created

✅ **Checkpoint**: You should see your project name at the top of the page.

---

## 📋 Step 2: Enable Places API

1. **Go to APIs & Services**
   - In the left sidebar, click **"APIs & Services"** → **"Library"**

2. **Search for Places API**
   - In the search box, type: `Places API`
   - Click on **"Places API"** (it will say "Places API" with a map icon)

3. **Enable the API**
   - Click the blue **"Enable"** button
   - Wait for it to enable (may take 10-30 seconds)

✅ **Checkpoint**: You should see "API enabled" message and a "Disable" button.

---

## 📋 Step 3: Create API Key

1. **Go to Credentials**
   - In the left sidebar, click **"APIs & Services"** → **"Credentials"**

2. **Create API Key**
   - Click **"Create Credentials"** at the top
   - Click **"API Key"**
   - A popup will appear with your API key

3. **Copy Your API Key**
   - **IMPORTANT**: Copy this key immediately (it looks like: `AIza...`)
   - Save it somewhere safe (like a text file or password manager)
   - Click **"Close"** in the popup

4. **Restrict the API Key (Recommended for Security)**
   - Find your API key in the list (under "API keys")
   - Click on the key name to edit it
   - Under **"API restrictions"**, select **"Restrict key"**
   - Check the box next to **"Places API"**
   - Click **"Save"**

✅ **Checkpoint**: You have an API key that looks like `AIzaSy...` and it's restricted to Places API.

---

## 📋 Step 4: Get Your Place ID (Optional but Recommended)

You have **3 options** - choose the easiest one for you:

### Option A: Use Place ID Finder Tool (EASIEST - Recommended)

1. **Open Place ID Finder**
   - Go to: https://developers.google.com/maps/documentation/places/web-service/place-id#find-id
   - Scroll down to the tool

2. **Find Your Business**
   - In the search box, type: `Chris Your Man with a Van`
   - Select your location (e.g., "Cumnock, Ayrshire")
   - Click **"Find Place ID"**

3. **Copy the Place ID**
   - You'll see a Place ID that looks like: `ChIJ...` (starts with "ChIJ")
   - Copy this entire Place ID
   - Save it somewhere safe

✅ **Checkpoint**: You have a Place ID that starts with `ChIJ...`

### Option B: From Google Share Link

1. **Open Your Share Link**
   - Open the link: `https://share.google/4XQIBrkbqueET4uxo` in your browser
   - It will redirect to Google Maps

2. **Use Place ID Finder**
   - Copy your business name from the Maps page
   - Go to Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id#find-id
   - Search for your business and get the Place ID (same as Option A)

### Option C: Skip Place ID (Auto-Detection)

- **You can skip this step!** The API will automatically search for your business if you don't provide a Place ID
- The system will search for: "Chris Your Man with a Van Cumnock"
- This works if your business is easily findable on Google Maps

✅ **Checkpoint**: You either have a Place ID OR you've decided to use auto-detection.

---

## 📋 Step 5: Set Up Environment Variables for Local Development

1. **Create .env File**
   - In your project folder, create a new file called `.env`
   - Make sure it's in the root folder (same folder as `package.json`)

2. **Add Your API Key**
   - Open the `.env` file in a text editor
   - Add this line (replace with your actual API key):
     ```
     GOOGLE_PLACES_API_KEY=AIzaSy...your_actual_key_here
     ```

3. **Add Your Place ID (Optional)**
   - If you got a Place ID, add this line:
     ```
     GOOGLE_PLACE_ID=ChIJ...your_actual_place_id_here
     ```
   - If you're using auto-detection, skip this line or leave it empty

4. **Save the File**
   - Save the `.env` file

✅ **Checkpoint**: You have a `.env` file with at least `GOOGLE_PLACES_API_KEY` in it.

**Example .env file:**
```
GOOGLE_PLACES_API_KEY=AIzaSyAbC123dEf456GhI789JkL012MnO345PqR
GOOGLE_PLACE_ID=ChIJDxXyZaBcDEfGHIjKlMnO456PQr
```

---

## 📋 Step 6: Test Locally

1. **Start Development Server**
   - Open terminal/command prompt in your project folder
   - Run: `npm run dev`
   - Wait for it to start (you'll see a local URL like `http://localhost:4321`)

2. **Visit Your Website**
   - Open the local URL in your browser
   - Navigate to the Reviews section
   - Open browser console (Press F12, then click "Console" tab)

3. **Check for Errors**
   - If reviews load: ✅ **SUCCESS!**
   - If you see errors:
     - Check that your `.env` file is in the root folder
     - Make sure you restarted the dev server after adding the `.env` file
     - Check the console for specific error messages

✅ **Checkpoint**: Reviews are loading (or you've identified the issue).

---

## 📋 Step 7: Set Up for Production (Netlify)

1. **Go to Netlify Dashboard**
   - Log in to: https://app.netlify.com/
   - Select your site: `chrisyourmanwithavan`

2. **Add Environment Variables**
   - Click **"Site settings"** (gear icon)
   - Click **"Environment variables"** in the left menu
   - Click **"Add variable"**

3. **Add API Key**
   - **Key**: `GOOGLE_PLACES_API_KEY`
   - **Value**: Your API key (the `AIza...` one)
   - Click **"Save"**

4. **Add Place ID (Optional)**
   - Click **"Add variable"** again
   - **Key**: `GOOGLE_PLACE_ID`
   - **Value**: Your Place ID (the `ChIJ...` one), or leave blank for auto-detection
   - Click **"Save"**

5. **Redeploy Your Site**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Wait for deployment to complete

✅ **Checkpoint**: Environment variables are set in Netlify and site is redeployed.

---

## ✅ Final Checklist

- [ ] Google Cloud project created
- [ ] Places API enabled
- [ ] API key created and restricted
- [ ] Place ID obtained (or using auto-detection)
- [ ] `.env` file created with API key
- [ ] Local testing shows reviews loading
- [ ] Environment variables set in Netlify
- [ ] Site redeployed on Netlify
- [ ] Reviews showing on live website

---

## 🆘 Troubleshooting

### "API key not configured"
- Make sure `.env` file exists in the root folder
- Check that the variable name is exactly: `GOOGLE_PLACES_API_KEY`
- Restart your dev server after creating `.env` file

### "Place ID not found"
- If using auto-detection: Make sure "Chris Your Man with a Van Cumnock" can be found on Google Maps
- If using Place ID: Double-check it starts with `ChIJ` and is copied correctly

### "INVALID_REQUEST" or "REQUEST_DENIED"
- Make sure Places API is enabled in Google Cloud Console
- Check that your API key is correct
- Verify API key restrictions allow Places API

### No Reviews Showing
- Check browser console (F12) for errors
- Verify the business has reviews on Google
- The system will show static reviews as a fallback if API fails

---

## 💰 Cost Information

- **Free Tier**: $200/month credit (enough for ~11,000 requests)
- **With caching**: You'll use minimal credits
- **Monitor**: Check usage in Google Cloud Console → Billing

---

## 🔒 Security Notes

- ✅ Your API key is kept server-side only (never exposed to users)
- ✅ The `.env` file should NEVER be committed to Git
- ✅ API key is restricted to Places API only
- ✅ Always use restricted API keys in production

---

## 📞 Need Help?

If you get stuck:
1. Check the browser console for error messages
2. Verify all steps above are completed
3. Make sure environment variables are set correctly
4. Check that Places API is enabled in Google Cloud Console

---

**You're all set! 🎉**

Once completed, your website will automatically fetch and display live Google reviews.



