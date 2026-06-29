# Fix: "Crawled - Currently Not Indexed" Issue

**Date**: January 2025  
**Status**: Fixed & Action Required

---

## 🔍 **Root Cause Identified**

The issue was caused by **canonical URL conflicts**. Your CSV data from Screaming Frog showed that pages were being crawled on `chrisyourmanwithavan.com` but the canonical URLs in the HTML were pointing to `chrisyourmanwithavan.netlify.app`, causing Google to think these pages were duplicates and not worth indexing.

**Evidence from CSV**:
- **Address**: `https://chrisyourmanwithavan.com/`
- **Canonical Link Element**: `https://chrisyourmanwithavan.netlify.app/`
- **Indexability Status**: "Canonicalised" (Non-Indexable)

---

## ✅ **Fixes Applied**

### 1. **Updated Canonical URLs** ✅

**Files Fixed**:
- `src/pages/ServiceDetail.tsx` - Updated structured data URL from `.netlify.app` to `.com`
- `src/layouts/BaseLayout.astro` - Updated preconnect URLs from staging to production domain

**Changes**:
```typescript
// Before
url: `https://chrisyourmanwithavan.netlify.app/services/${slug}`

// After
url: `https://chrisyourmanwithavan.com/services/${slug}`
```

### 2. **Updated Preconnect URLs** ✅

**Before**:
```html
<link rel="dns-prefetch" href="https://chrismanwithvanstaging.netlify.app" />
<link rel="preconnect" href="https://chrismanwithvanstaging.netlify.app" crossorigin />
```

**After**:
```html
<link rel="dns-prefetch" href="https://chrisyourmanwithavan.com" />
<link rel="preconnect" href="https://chrisyourmanwithavan.com" crossorigin />
```

### 3. **Verified Configuration** ✅

- ✅ All canonical URLs in `BaseLayout.astro` use `.com` domain
- ✅ All canonical URLs in page templates use `.com` domain
- ✅ Sitemap uses `.com` domain
- ✅ Robots.txt references `.com` domain
- ✅ www → non-www redirect configured in `_redirects`

---

## 🚀 **Next Steps - ACTION REQUIRED**

### **Step 1: Rebuild and Deploy**

1. **Rebuild the site**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - If using Git: Commit and push changes
   - If using Netlify CLI: `netlify deploy --prod`

### **Step 2: Request Re-Indexing in Google Search Console**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `chrisyourmanwithavan.com`
3. Navigate to **URL Inspection** tool
4. For each affected page:
   - Enter the URL (e.g., `https://chrisyourmanwithavan.com/`)
   - Click **Test Live URL**
   - Once it shows "URL is on Google" or "URL is not on Google", click **Request Indexing**

### **Step 3: Submit Updated Sitemap**

1. In Google Search Console, go to **Sitemaps**
2. Remove the old sitemap (if it exists)
3. Submit the new sitemap: `https://chrisyourmanwithavan.com/sitemap.xml`
4. Wait for Google to process it (usually 24-48 hours)

### **Step 4: Monitor Indexing Status**

1. In Google Search Console, go to **Pages** → **Indexing**
2. Check the **Why pages aren't indexed** report
3. Monitor for improvements over the next few days

---

## 📋 **Additional Checks to Ensure Indexability**

### **1. Verify Canonical URLs Match Current Domain**

After deployment, check that all pages use the correct canonical URL:

```bash
# Check homepage
curl -s https://chrisyourmanwithavan.com/ | grep -i canonical

# Should show:
# <link rel="canonical" href="https://chrisyourmanwithavan.com/" />
```

### **2. Verify Robots.txt Allows Indexing**

```bash
curl https://chrisyourmanwithavan.com/robots.txt

# Should show:
# User-agent: *
# Allow: /
```

### **3. Verify No "noindex" Tags**

Check that pages don't have `noindex` robots meta tag:

```bash
curl -s https://chrisyourmanwithavan.com/ | grep -i "robots"

# Should show:
# <meta name="robots" content="index, follow" />
```

### **4. Verify Sitemap is Accessible**

```bash
curl -I https://chrisyourmanwithavan.com/sitemap.xml

# Should return:
# HTTP/2 200
```

### **5. Check for Duplicate Content**

Ensure all pages have:
- ✅ Unique `<title>` tags
- ✅ Unique meta descriptions
- ✅ Unique H1 headings
- ✅ Sufficient unique content (300+ words)

---

## 🔧 **Why This Happened**

The site was likely built before switching from `.netlify.app` to `.com` domain, or some files weren't updated when the domain was changed. The old canonical URLs were pointing to the Netlify subdomain, which caused Google to see canonical conflicts.

---

## 📊 **Expected Timeline**

- **Immediate**: Fixes are applied to source code
- **After deployment**: Pages will have correct canonical URLs
- **24-48 hours**: Google will re-crawl pages with new canonicals
- **1-2 weeks**: Pages should start appearing in search results

---

## 🆘 **If Issues Persist**

If pages are still showing "Crawled - currently not indexed" after 2 weeks:

1. **Check Google Search Console for specific reasons**:
   - Go to **Pages** → **Indexing** → **Why pages aren't indexed**
   - Look for specific errors or warnings

2. **Common additional causes**:
   - **Low-quality or duplicate content**: Ensure each page has unique, valuable content
   - **Missing internal links**: Ensure pages are linked from other pages
   - **Site too new**: New sites can take time to index
   - **Thin content**: Ensure pages have at least 300+ words of unique content

3. **Request manual review** (if needed):
   - In Google Search Console, use the **URL Inspection** tool
   - Request indexing for specific URLs
   - Monitor the status

---

## ✅ **Summary**

**What we fixed**:
- ✅ Canonical URL conflicts (`.netlify.app` → `.com`)
- ✅ Preconnect URLs updated
- ✅ All domain references now use `.com`

**What you need to do**:
1. Rebuild and deploy the site
2. Request re-indexing in Google Search Console
3. Submit the updated sitemap
4. Monitor indexing status over the next 1-2 weeks

**Expected outcome**:
- Pages should start indexing within 24-48 hours after deployment
- Full indexing may take 1-2 weeks

