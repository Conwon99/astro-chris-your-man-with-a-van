# Google Search Console - Manual Actions Required

After deploying the code fixes, you need to take these actions in Google Search Console to resolve the indexing issues.

---

## Step 1: Verify the Fixes Are Live (Wait 5-10 minutes after deployment)

1. Go to your live website
2. Test a few URLs to confirm:
   - URLs without trailing slashes work (e.g., `https://chrisyourmanwithavan.com/locations/cumnock`)
   - URLs with trailing slashes redirect properly (e.g., `https://chrisyourmanwithavan.com/locations/cumnock/` should redirect to the non-slash version)
   - Check the redirect is a 301 (permanent) redirect

---

## Step 2: Submit Updated Sitemap

1. Go to **Google Search Console** → **Sitemaps** (left sidebar)
2. If you already have a sitemap submitted:
   - Click on your sitemap URL
   - Click **"Test sitemap"** to verify it's valid
   - If valid, click **"Request indexing"** or wait for Google to re-crawl automatically
3. If you don't have a sitemap submitted:
   - Enter your sitemap URL: `https://chrisyourmanwithavan.com/sitemap.xml`
   - Click **"Submit"**
4. **Note:** Google may take 24-48 hours to process the sitemap

---

## Step 3: Request Re-indexing for Affected Pages

### For "Alternative page with proper canonical tag" issues:

1. Go to **Google Search Console** → **Coverage** (left sidebar)
2. Click on **"Alternative page with proper canonical tag"** in the list
3. You'll see a list of affected URLs
4. For each URL (or in batches):
   - Click on the URL
   - Click **"Request Indexing"** button
   - Wait for the status to show "Indexing requested"
5. **Alternative method:** Use the URL Inspection tool:
   - Go to **URL Inspection** (search bar at top)
   - Enter each affected URL
   - Click **"Request Indexing"**

### For "Redirect error" issues:

1. Go to **Coverage** → Click on **"Redirect error"**
2. For each URL:
   - Use **URL Inspection** tool
   - Enter the URL
   - Click **"Test Live URL"** to verify the redirect works
   - If it works correctly, click **"Request Indexing"**

### For "Discovered - currently not indexed" issues:

1. Go to **Coverage** → Click on **"Discovered - currently not indexed"**
2. For each URL:
   - Use **URL Inspection** tool
   - Enter the URL
   - Click **"Request Indexing"**

---

## Step 4: Use URL Inspection Tool (Recommended Method)

This is the most reliable way to request indexing:

1. Go to **URL Inspection** (search bar at the top of Google Search Console)
2. Enter the full URL (e.g., `https://chrisyourmanwithavan.com/locations/cumnock`)
3. Click **Enter** or the search icon
4. Review the page information:
   - Check **"Page is indexed"** status
   - Check **"URL is on Google"** status
   - Review any issues shown
5. Click **"Request Indexing"** button
6. Wait for confirmation: "Indexing requested"
7. Repeat for all affected pages

**Tip:** You can request indexing for up to 10 URLs per day using the URL Inspection tool. For more URLs, you'll need to wait or use the sitemap method.

---

## Step 5: Monitor Progress

### Check Coverage Report:

1. Go to **Coverage** → **Excluded** tab
2. Monitor these sections:
   - **"Alternative page with proper canonical tag"** - Should decrease over time
   - **"Redirect error"** - Should decrease to 0
   - **"Discovered - currently not indexed"** - Should decrease as pages get indexed

### Timeline Expectations:

- **Immediate (0-24 hours):** Google will start re-crawling requested URLs
- **24-48 hours:** Most indexing requests will be processed
- **1 week:** Coverage issues should be significantly reduced
- **2-4 weeks:** All issues should be resolved (depending on crawl budget)

---

## Step 6: Verify Fixes Are Working

### Check Individual URLs:

1. Use **URL Inspection** tool for a few test URLs
2. Verify:
   - **"Page is indexed"** = Yes
   - **"URL is on Google"** = Yes
   - **"User-declared canonical"** matches the actual URL (no trailing slash)
   - **"Google-selected canonical"** matches your declared canonical

### Check Search Results:

1. Search Google for: `site:chrisyourmanwithavan.com/locations/cumnock`
2. Verify the page appears in search results
3. Check that the URL shown doesn't have a trailing slash

---

## Step 7: If Issues Persist After 1 Week

### Re-check the fixes:

1. Verify redirects are working (use a redirect checker tool)
2. Verify canonical tags are correct (view page source)
3. Verify sitemap.xml is accessible and correct

### Additional actions:

1. **Remove old URLs from index** (if needed):
   - Go to **Removals** → **New Request**
   - Enter URLs with trailing slashes that shouldn't be indexed
   - Select **"Remove this URL"** or **"Clear cache"**

2. **Check for other issues:**
   - Review **Coverage** report for new issues
   - Check **Enhancements** for structured data issues
   - Review **Mobile Usability** if applicable

---

## Quick Checklist

- [ ] Deploy code fixes to production
- [ ] Verify redirects work on live site
- [ ] Submit/update sitemap in Google Search Console
- [ ] Request indexing for "Alternative page" URLs (14 pages)
- [ ] Request indexing for "Redirect error" URLs (7 pages)
- [ ] Request indexing for "Discovered - not indexed" URLs (15 pages)
- [ ] Wait 24-48 hours
- [ ] Check Coverage report for improvements
- [ ] Verify test URLs are indexed correctly
- [ ] Monitor for 1-2 weeks

---

## Important Notes

1. **Be Patient:** Google indexing can take time. Don't request indexing multiple times for the same URL in a short period.

2. **Daily Limits:** Google limits how many indexing requests you can make per day. If you hit the limit, wait 24 hours or rely on the sitemap.

3. **Crawl Budget:** Google has a crawl budget for your site. Too many indexing requests might slow down the process. Focus on the most important pages first.

4. **Canonical Tags:** After fixes, Google should automatically recognize the correct canonical URLs. You don't need to manually change canonicals in Search Console.

5. **Redirects:** Once redirects are working correctly, Google will eventually stop showing "Redirect error" issues. This may take a few crawl cycles.

---

## Expected Timeline

- **Day 1:** Deploy fixes, submit sitemap, request indexing
- **Days 2-3:** Google starts re-crawling and processing requests
- **Week 1:** Most issues should be resolved
- **Week 2-4:** All issues should be fully resolved

---

## Need Help?

If issues persist after 2 weeks:
1. Double-check that code fixes are actually deployed
2. Verify redirects work using a tool like: https://httpstatus.io/
3. Check canonical tags in page source
4. Review Google Search Console Help Center
5. Consider requesting a review in Search Console

---

**Last Updated:** November 23, 2025


