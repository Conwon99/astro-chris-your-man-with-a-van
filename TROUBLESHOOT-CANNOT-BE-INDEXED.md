# Troubleshooting "Can't Be Indexed" in Google Search Console

When Google Search Console says a page "can't be indexed" during live testing, it means Google found a specific reason why it won't index the page. Here's how to diagnose and fix it.

---

## What "Can't Be Indexed" Means

This message appears in the **URL Inspection** tool when you click "Test Live URL". Google will show you a specific reason why it can't index the page.

---

## Common Reasons & Solutions

### 1. **"Page is a redirect"**

**What it means:** Google sees the page as redirecting to another URL.

**Possible causes:**
- The trailing slash redirect we just added might be interfering
- The catch-all redirect in `netlify.toml` might be catching the page
- There's a redirect loop

**How to check:**
1. Visit the URL directly in your browser
2. Check if it redirects (look at the address bar)
3. Use a redirect checker: https://httpstatus.io/

**Solution:**
- If the page redirects when it shouldn't, check your redirect rules
- Make sure the trailing slash redirects are working correctly
- The catch-all redirect `/* → /index.html` should only apply to 404s, not real pages

---

### 2. **"Page has noindex tag"**

**What it means:** The page has `<meta name="robots" content="noindex">` which tells Google not to index it.

**How to check:**
1. View page source (right-click → View Page Source)
2. Search for "noindex" or "robots"
3. Check if you see: `<meta name="robots" content="noindex">`

**Solution:**
- Check `src/layouts/BaseLayout.astro` - make sure `robots` prop is `"index, follow"` (not `"noindex"`)
- Only the 404 page should have `noindex, nofollow`

---

### 3. **"Canonical tag points to different URL"**

**What it means:** The canonical tag in the HTML points to a different URL than the one being tested.

**Example:**
- Testing: `https://chrisyourmanwithavan.com/locations/cumnock`
- Canonical tag says: `https://chrisyourmanwithavan.com/locations/cumnock/` (with trailing slash)

**How to check:**
1. View page source
2. Find: `<link rel="canonical" href="...">`
3. Compare it to the URL you're testing

**Solution:**
- Make sure canonical URLs match the actual page URL (no trailing slash)
- Check `src/pages/locations/[slug].astro` and `src/pages/services/[slug].astro`
- Canonical should be: `https://chrisyourmanwithavan.com/locations/${slug}` (no trailing slash)

---

### 4. **"Page is blocked by robots.txt"**

**What it means:** Your `robots.txt` file is blocking Google from accessing the page.

**How to check:**
1. Visit: `https://chrisyourmanwithavan.com/robots.txt`
2. Check if your page path is in a `Disallow:` rule

**Solution:**
- Your `robots.txt` should allow all pages (which it does)
- Make sure it's deployed correctly
- Check that it's in the `public/` folder

---

### 5. **"Page requires authentication"**

**What it means:** Google thinks the page requires login to view.

**How to check:**
1. Open the URL in an incognito/private window
2. See if you can access it without logging in

**Solution:**
- Make sure pages are publicly accessible
- Check for any authentication middleware

---

### 6. **"Page is a soft 404"**

**What it means:** The page returns 200 OK but has no real content (like an empty page or error page).

**How to check:**
1. Visit the URL
2. Check if it shows actual content or is blank/error

**Solution:**
- Make sure pages have content
- Check that React components are rendering correctly
- Verify the page isn't showing a 404 error

---

## Step-by-Step Diagnosis

### Step 1: Check What Google Sees

1. Go to **URL Inspection** in Google Search Console
2. Enter your URL (e.g., `https://chrisyourmanwithavan.com/locations/cumnock`)
3. Click **"Test Live URL"**
4. Look at the **"Coverage"** section - it will tell you the specific reason

### Step 2: Check the Actual Page

1. Visit the URL in your browser
2. Right-click → **View Page Source**
3. Check for:
   - `<meta name="robots" content="...">` - should be `index, follow`
   - `<link rel="canonical" href="...">` - should match the URL exactly
   - Make sure there's actual HTML content

### Step 3: Check Redirects

1. Use a redirect checker: https://httpstatus.io/
2. Enter your URL
3. Check:
   - Final URL (should be the same as what you entered)
   - Status code (should be 200, not 301/302)
   - Redirect chain (should be empty or minimal)

### Step 4: Verify Deployment

1. Make sure your latest code is deployed
2. Check the deployment date in Netlify
3. Clear your browser cache and test again
4. Wait 5-10 minutes after deployment for changes to propagate

---

## Most Likely Issue for Your Site

Based on your setup, the most likely issue is:

### **The catch-all redirect is interfering**

Your `netlify.toml` has:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This catch-all redirect might be making Google think all pages redirect to `/index.html`, even though they're actually pre-rendered.

**Solution:** Since you're using Astro with `output: 'hybrid'` and pages are pre-rendered, this catch-all should only apply to routes that don't exist. However, Google might be seeing it differently.

**Try this:**
1. Make sure your pages are actually being pre-rendered (check the `dist/` folder after build)
2. The catch-all should be last in the redirect list (which it is)
3. Consider if you really need the catch-all - Astro hybrid mode should handle routing

---

## Quick Fix Checklist

- [ ] Check URL Inspection tool for the specific error message
- [ ] Verify the page loads correctly in browser
- [ ] Check page source for `noindex` tag (shouldn't be there)
- [ ] Verify canonical tag matches the URL exactly
- [ ] Check robots.txt allows the page
- [ ] Verify redirects work correctly (use redirect checker)
- [ ] Make sure latest code is deployed
- [ ] Wait 10 minutes after deployment before testing
- [ ] Clear browser cache and test again

---

## If Still Not Working

1. **Check the exact error message** in URL Inspection - Google will tell you the specific reason
2. **Test with a different tool:**
   - Use Google's Rich Results Test: https://search.google.com/test/rich-results
   - Use Screaming Frog SEO Spider (free version)
3. **Check Netlify logs:**
   - Go to Netlify Dashboard → Your Site → Functions → Logs
   - Look for any errors when accessing the page
4. **Verify build output:**
   - Check that pages are in `dist/` folder after build
   - Verify HTML files exist for your routes

---

## Expected Behavior After Fixes

Once everything is working correctly:
- URL Inspection should show: **"URL is on Google"** or **"URL is not on Google"** (not "can't be indexed")
- The page should be indexable
- You can click **"Request Indexing"** successfully

---

## Need More Help?

If you're still seeing "can't be indexed" after checking all of the above:

1. **Copy the exact error message** from URL Inspection
2. **Check which specific reason** Google gives (it will say something like "Redirect" or "Blocked by robots.txt")
3. **Share that information** and we can provide a more specific solution

The key is to look at what Google Search Console tells you - it will give you the specific reason why it can't index the page.


