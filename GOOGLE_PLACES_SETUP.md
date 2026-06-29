# Google Places API Setup Guide

## Overview
This guide will help you set up Google Places API to display live Google reviews on the website.

## Step 1: Enable Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click on "Places API" and click "Enable"

## Step 2: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy your API key
4. (Recommended) Restrict the API key:
   - Click on the API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Places API"
   - Save the restrictions

## Step 3: Get Your Place ID

**Important**: You don't need to own the Google Business Profile! The API can fetch reviews from any public business listing.

### Option 1: Use Place ID Finder Tool (EASIEST)
1. Go to [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id)
2. Enter your business name: "Chris Your Man with a Van"
3. Select your location (Cumnock, Ayrshire or wherever your business is located)
4. Click "Find Place ID"
5. Copy the Place ID (it will look like: `ChIJ...`)

### Option 2: From Google Maps Share Link
If you have a Google share link (like `https://share.google/...`):

1. **Open the share link in your browser** - it will redirect to Google Maps
2. **Look at the URL bar** - you'll see the full Google Maps URL
3. **Extract Place ID**:
   - The URL might look like: `https://www.google.com/maps/place/Chris+Your+Man+with+a+Van/@...`
   - If you see `?cid=` in the URL, you can convert it to Place ID using the Place ID Finder tool
   - OR better yet, just copy the business name from the Maps page and use Option 1

### Option 3: Use Google Maps URL (NEW!)
If you have a Google Maps URL (like a share link or search URL), you can use it directly:

1. Copy your Google Maps URL (can be a share link like `https://share.google/...` or a full Maps URL)
2. Add it to your `.env` file:
   ```
   GOOGLE_MAPS_URL=https://www.google.com/search?kgmid=/g/11xtrgf8jv&q=Chris
   ```
3. The API will automatically extract business information and find the Place ID

### Option 4: Auto-Detection (No Place ID Needed!)
If you don't set `GOOGLE_PLACE_ID` or `GOOGLE_MAPS_URL`, the API will automatically search for "Chris Your Man with a Van Cumnock" and use the first result. This works if your business is easily findable on Google Maps.

**To use auto-detection**: Simply don't set the `GOOGLE_PLACE_ID` or `GOOGLE_MAPS_URL` environment variables.

## Step 4: Set Environment Variables

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   GOOGLE_PLACES_API_KEY=your_actual_api_key_here
   GOOGLE_PLACE_ID=your_actual_place_id_here
   # OR use a Google Maps URL instead:
   GOOGLE_MAPS_URL=https://www.google.com/search?kgmid=/g/11xtrgf8jv&q=Chris
   ```

### Production (Netlify)

1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add the following variables:
   - `GOOGLE_PLACES_API_KEY` = your API key (required)
   - `GOOGLE_PLACE_ID` = your Place ID (optional - fastest if you have it)
   - `GOOGLE_MAPS_URL` = your Google Maps URL (optional - alternative to Place ID)

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your website and check the Reviews section
3. Open the browser console and look for any errors
4. The reviews should load from Google Places API

## Troubleshooting

### Error: "API key not configured"
- Make sure `.env` file exists and contains `GOOGLE_PLACES_API_KEY`
- Restart your development server after adding environment variables

### Error: "Place ID not found"
- **If using auto-detection**: Make sure the business name "Chris Your Man with a Van Cumnock" can be found via text search on Google Maps
- **If setting Place ID manually**: 
  - Verify the Place ID is correct using the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id)
  - Make sure the business has a verified Google Business Profile
  - Try searching with just the business name (e.g., "Chris Your Man with a Van") and your city

### Error: "INVALID_REQUEST" or "REQUEST_DENIED"
- Check that Places API is enabled in Google Cloud Console
- Verify your API key is correct
- Check API key restrictions (make sure Places API is allowed)

### No Reviews Showing
- The API returns empty reviews if there are no reviews on Google
- The component will fallback to static reviews if API fails
- Check the API response in the browser Network tab

## API Costs

- Google Places API has a **free tier**: $200/month credit
- Place Details API: $17 per 1,000 requests
- Text Search API: $32 per 1,000 requests
- With caching (1 hour), you should use minimal credits
- Monitor usage in Google Cloud Console

## Security Notes

- Never commit `.env` file to Git
- The API key is kept server-side only (in the API endpoint)
- Client-side code never sees the API key
- Always restrict your API key in Google Cloud Console


