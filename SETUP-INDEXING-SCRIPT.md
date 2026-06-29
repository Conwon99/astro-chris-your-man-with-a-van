# Setup Instructions for Indexing Status Check Script

Since you've completed Method 1 (Google Cloud setup), here's what you need to do next:

---

## Step 1: Install Required Package

Run this command in your project directory:

```bash
npm install googleapis
```

---

## Step 2: Add Service Account Key

1. Place your downloaded service account JSON key file in the **project root** (same folder as `package.json`)
2. Name it exactly: `service-account-key.json`
3. **Important:** Add this file to `.gitignore` to keep it secure:

```bash
echo "service-account-key.json" >> .gitignore
```

---

## Step 3: Run the Script

Once everything is set up, run:

```bash
npm run check-indexing
```

---

## What the Script Does

The script will:
- ✅ Check the indexing status of all your URLs
- ✅ Show which pages are indexed vs not indexed
- ✅ Display any errors or issues
- ✅ Save results to `indexing-status-results.json`
- ✅ Give you a prioritized list of pages that need indexing

**Note:** This script **checks** indexing status but **doesn't request indexing**. For that, you still need to:
1. Use the manual "Request Indexing" button in Google Search Console (10 per day limit)
2. Rely on your sitemap submission (which you've already done)

---

## What You'll See

The script will output something like:

```
🔍 Checking indexing status...

Site: https://chrisyourmanwithavan.com

✅ INDEXED: https://chrisyourmanwithavan.com/
❌ NOT INDEXED: https://chrisyourmanwithavan.com/locations/cumnock
   Status: FAIL | Coverage: DISCOVERED_NOT_INDEXED
...

📊 SUMMARY
============================================================
✅ Indexed: 5
❌ Not Indexed: 31
✗ Errors: 0
📄 Total: 36

📋 URLs NOT INDEXED (request indexing for these):
1. https://chrisyourmanwithavan.com/locations/cumnock
   → FAIL | DISCOVERED_NOT_INDEXED
...
```

---

## Troubleshooting

### Error: "service-account-key.json not found"
- Make sure the file is in the project root (same folder as `package.json`)
- Check the filename is exactly `service-account-key.json`

### Error: "Authentication error"
- Verify the service account email has been added to Google Search Console
- Check that the service account has "Owner" or "Full" permissions
- Make sure the Search Console API is enabled in Google Cloud Console

### Error: "Permission denied"
- Go to Google Search Console → Settings → Users and permissions
- Add the service account email (from the JSON file)
- Set permission to "Owner" or "Full"

---

## Next Steps After Running

1. **Review the results** - See which pages need indexing
2. **Prioritize** - Focus on the most important pages first
3. **Manual requests** - Use Google Search Console URL Inspection tool to request indexing for the top 10-20 pages
4. **Wait** - Let the sitemap handle the rest (Google will discover and index them naturally)

---

## Do You Need This Script?

**Short answer:** It's helpful but not required.

**Benefits:**
- ✅ Quickly see which pages are indexed
- ✅ Identify pages that need attention
- ✅ Monitor indexing status over time

**Alternative:**
- You can check indexing status manually in Google Search Console
- Your sitemap submission will handle most of the work
- Google will naturally discover and index pages over time

**Recommendation:** 
- If you want to monitor indexing status easily → Use the script
- If you prefer manual checking → Skip the script and just use Search Console UI

The script is ready to use once you install `googleapis` and add your service account key!


