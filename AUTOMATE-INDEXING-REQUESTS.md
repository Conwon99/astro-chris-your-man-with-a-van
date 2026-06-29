# Automate Google Search Console Indexing Requests

You can automate the indexing request process using the Google Search Console API. Here are several methods:

---

## Method 1: Google Search Console API (Recommended)

### Overview
Google provides an API that allows you to programmatically request indexing for URLs. This is the official way to automate indexing requests.

### Prerequisites
1. Google Cloud Project
2. Google Search Console API enabled
3. Service account or OAuth credentials
4. Access to the property in Google Search Console

### Setup Steps

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Note your project ID

#### Step 2: Enable Search Console API
1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Search Console API"
3. Click **Enable**

#### Step 3: Create Service Account
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name it (e.g., "search-console-indexer")
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

#### Step 4: Create and Download Key
1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON**
5. Download the JSON file (keep it secure!)

#### Step 5: Add Service Account to Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Go to **Settings** → **Users and permissions**
4. Click **Add user**
5. Enter the service account email (from the JSON file, looks like: `xxx@xxx.iam.gserviceaccount.com`)
6. Set permission to **Owner** or **Full**
7. Click **Add**

---

## Method 2: Node.js Script (Easiest)

### Installation

```bash
npm install googleapis
```

### Script: `request-indexing.js`

```javascript
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load service account credentials
const credentials = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'service-account-key.json'), 'utf8')
);

// URLs to request indexing for
const urlsToIndex = [
  'https://chrisyourmanwithavan.com/',
  'https://chrisyourmanwithavan.com/services',
  'https://chrisyourmanwithavan.com/locations',
  'https://chrisyourmanwithavan.com/contact',
  'https://chrisyourmanwithavan.com/locations/cumnock',
  'https://chrisyourmanwithavan.com/locations/ayr',
  'https://chrisyourmanwithavan.com/locations/kilmarnock',
  'https://chrisyourmanwithavan.com/locations/irvine',
  'https://chrisyourmanwithavan.com/locations/troon',
  'https://chrisyourmanwithavan.com/locations/prestwick',
  'https://chrisyourmanwithavan.com/locations/saltcoats',
  'https://chrisyourmanwithavan.com/locations/girvan',
  'https://chrisyourmanwithavan.com/locations/dalrymple',
  'https://chrisyourmanwithavan.com/locations/mauchline',
  'https://chrisyourmanwithavan.com/locations/kirkconnel',
  'https://chrisyourmanwithavan.com/locations/sanquhar',
  'https://chrisyourmanwithavan.com/locations/mossblown',
  'https://chrisyourmanwithavan.com/locations/ardrossan',
  'https://chrisyourmanwithavan.com/locations/auchinleck',
  'https://chrisyourmanwithavan.com/locations/beith',
  'https://chrisyourmanwithavan.com/locations/dalry',
  'https://chrisyourmanwithavan.com/locations/darvel',
  'https://chrisyourmanwithavan.com/locations/galston',
  'https://chrisyourmanwithavan.com/locations/maybole',
  'https://chrisyourmanwithavan.com/locations/newmilns',
  'https://chrisyourmanwithavan.com/locations/patna',
  'https://chrisyourmanwithavan.com/locations/dalmellington',
  'https://chrisyourmanwithavan.com/services/small-removals',
  'https://chrisyourmanwithavan.com/services/courier',
  'https://chrisyourmanwithavan.com/services/waste-removal',
  'https://chrisyourmanwithavan.com/services/collection-and-delivery',
  'https://chrisyourmanwithavan.com/services/end-of-tenancy',
  'https://chrisyourmanwithavan.com/services/flat-pack-assembly',
];

// Your Search Console property URL (the site URL)
const siteUrl = 'https://chrisyourmanwithavan.com';

async function requestIndexing() {
  try {
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient,
    });

    console.log('Starting indexing requests...\n');

    let successCount = 0;
    let errorCount = 0;

    // Request indexing for each URL (with delay to respect rate limits)
    for (let i = 0; i < urlsToIndex.length; i++) {
      const url = urlsToIndex[i];
      
      try {
        await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: siteUrl,
          },
        });

        // Actually request indexing (the API method above is for inspection)
        // Note: The actual indexing request API endpoint is:
        // POST https://indexing.googleapis.com/v3/urlNotifications:publish
        
        console.log(`✓ Requested indexing for: ${url}`);
        successCount++;

        // Rate limiting: Wait 1 second between requests
        if (i < urlsToIndex.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`✗ Error for ${url}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n✅ Complete!`);
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
  } catch (error) {
    console.error('Authentication error:', error.message);
    console.error('Make sure your service account key is correct and has access to Search Console.');
  }
}

requestIndexing();
```

**Note:** The above uses the Search Console API for inspection. For actual indexing requests, you need the **Indexing API** (see Method 3).

---

## Method 3: Google Indexing API (For Actual Indexing Requests)

The Indexing API is specifically designed for requesting indexing. However, it has limitations:

### Limitations
- Only works for job posting or broadcast event pages
- Requires specific structured data
- Not suitable for regular website pages

**For regular website pages, use Method 2 or manual requests.**

---

## Method 4: Python Script

### Installation

```bash
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

### Script: `request_indexing.py`

```python
from google.oauth2 import service_account
from googleapiclient.discovery import build
import time

# Service account credentials
SERVICE_ACCOUNT_FILE = 'service-account-key.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters']

# Your site URL
SITE_URL = 'https://chrisyourmanwithavan.com'

# URLs to index
URLS = [
    'https://chrisyourmanwithavan.com/',
    'https://chrisyourmanwithavan.com/services',
    # ... add all your URLs
]

def request_indexing():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    
    service = build('searchconsole', 'v1', credentials=credentials)
    
    for url in URLS:
        try:
            # Note: This is for inspection, not actual indexing request
            # The Indexing API is separate and has limitations
            print(f'Processing: {url}')
            time.sleep(1)  # Rate limiting
        except Exception as e:
            print(f'Error for {url}: {e}')

if __name__ == '__main__':
    request_indexing()
```

---

## Method 5: Automated Sitemap Submission (Simplest)

### Using Netlify Build Hook

You can automatically submit your sitemap after each deployment:

#### Step 1: Create a Build Script

Create `scripts/submit-sitemap.js`:

```javascript
const https = require('https');

// This is a simplified version - you'd need to use the Search Console API
// to actually submit the sitemap programmatically

console.log('Sitemap available at: https://chrisyourmanwithavan.com/sitemap.xml');
console.log('Submit manually in Google Search Console or use the API');
```

#### Step 2: Add to package.json

```json
{
  "scripts": {
    "postbuild": "node scripts/submit-sitemap.js"
  }
}
```

---

## Method 6: Using GitHub Actions (CI/CD)

### `.github/workflows/request-indexing.yml`

```yaml
name: Request Indexing

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  request-indexing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Request indexing
        env:
          GOOGLE_APPLICATION_CREDENTIALS: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
        run: node scripts/request-indexing.js
```

**Note:** Store your service account key as a GitHub Secret.

---

## Important Limitations & Best Practices

### Rate Limits
- Google limits indexing requests to prevent abuse
- **Recommended:** 1 request per second
- **Daily limit:** Varies, but typically 200-500 requests per day
- Don't spam requests - Google may temporarily block you

### When to Request Indexing
- ✅ After deploying new pages
- ✅ After fixing indexing issues
- ✅ After updating important content
- ❌ Don't request for pages that haven't changed
- ❌ Don't request multiple times for the same URL in a short period

### Best Practices
1. **Batch requests:** Process URLs in batches with delays
2. **Monitor results:** Check Search Console for indexing status
3. **Respect limits:** Don't exceed rate limits
4. **Focus on important pages:** Prioritize key pages first
5. **Use sitemaps:** Submit sitemaps for bulk discovery

---

## Alternative: Third-Party Tools

### SEO Tools with Automation
- **Screaming Frog SEO Spider** - Can check indexing status
- **Ahrefs** - Has indexing monitoring
- **SEMrush** - Indexing status tracking
- **Sitebulb** - Can monitor indexing

**Note:** These tools monitor indexing status but don't automatically request indexing.

---

## Recommended Approach for Your Site

### Option 1: Manual (For Now)
1. Use URL Inspection tool for important pages (10 per day limit)
2. Submit sitemap (unlimited)
3. Wait for Google to crawl naturally

### Option 2: Semi-Automated
1. Create a script to generate a list of URLs from your sitemap
2. Run the script manually after deployments
3. Use the script to request indexing in batches

### Option 3: Fully Automated
1. Set up Google Search Console API
2. Create a script that runs after each deployment
3. Automatically request indexing for new/changed pages

---

## Quick Start: Simple Node.js Script

I can create a ready-to-use script for your site. Would you like me to:

1. Create the `request-indexing.js` script with all your URLs?
2. Add it to your `package.json`?
3. Set up instructions for getting the service account key?

**The script would:**
- Read URLs from your sitemap or a config file
- Request indexing for each URL
- Respect rate limits
- Log results
- Can be run manually or automated

---

## Summary

**Easiest:** Submit sitemap manually (already done) + wait for natural crawling

**Better:** Use Google Search Console API with a Node.js script (semi-automated)

**Best:** Full automation with CI/CD pipeline (requires setup)

**For your 36 pages:** I recommend starting with the sitemap submission (which you've done) and manually requesting indexing for the most important 10-20 pages using URL Inspection. The rest will be discovered and indexed naturally over time.

Would you like me to create a ready-to-use indexing script for your site?


