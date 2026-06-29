# Prompt for Fixing Google Search Console Indexing Issues

Use this prompt on another AI assistant or developer platform to fix similar issues:

---

## Prompt Text:

I'm experiencing several Google Search Console indexing issues on my website. Please help me fix them:

**Issues Found:**
1. **"Alternative page with proper canonical tag"** - Multiple pages affected
   - Google is seeing duplicate URLs where one version has a trailing slash and one doesn't
   - Example: `/page-name` vs `/page-name/`
   - My sitemap.xml uses URLs in one format, but the site is generating pages in a different format

2. **"Redirect error"** - Multiple pages affected
   - Pages are causing redirect errors due to URL format mismatches
   - Some URLs redirect incorrectly when accessed with or without trailing slashes

3. **"Discovered - currently not indexed"** - Multiple pages affected
   - Pages have been discovered but not indexed, likely due to URL inconsistencies

**My Tech Stack:**
- Framework: [Your framework - e.g., Astro, Next.js, Gatsby, Nuxt, etc.]
- Hosting: [Your hosting - e.g., Netlify, Vercel, Cloudflare, etc.]
- Site structure: [Describe your route structure - e.g., dynamic routes, static pages, etc.]

**What I Need:**
1. Configure the framework to generate URLs consistently (with or without trailing slashes)
2. Add 301 redirects to handle URLs in the opposite format and redirect them to the preferred version
3. Ensure canonical tags match the actual page URLs
4. Verify sitemap.xml URLs match the actual page structure

**Specific Requirements:**
- All URLs should be standardized to one format (either with or without trailing slashes)
- Redirects should be 301 (permanent) for SEO
- Canonical tags should match the actual page URL format
- Sitemap should reflect the correct URL structure

Please:
1. Check my current configuration files
2. Check my redirect configuration
3. Check my sitemap.xml
4. Fix any inconsistencies between sitemap URLs and actual page URLs
5. Add proper redirects to handle URL format variations
6. Verify canonical tags are correct and match actual URLs

**Files to Check:**
- Framework config file (e.g., `astro.config.mjs`, `next.config.js`, `gatsby-config.js`, etc.)
- Redirect configuration (e.g., `netlify.toml`, `_redirects`, `.htaccess`, `nginx.conf`, etc.)
- Sitemap file (e.g., `sitemap.xml`, `sitemap.txt`)
- Page templates/components that set canonical tags

Please provide the specific code changes needed for my setup.

---

## Alternative Shorter Version:

I have Google Search Console issues caused by URL format inconsistencies (trailing slash mismatches):
- Multiple pages showing "Alternative page with proper canonical tag" 
- Multiple pages with "Redirect error"
- Multiple pages "Discovered - currently not indexed"

**Problem:** My sitemap has URLs in one format (e.g., `/page-name`) but my site generates pages in a different format (e.g., `/page-name/`), creating duplicate content issues.

**Need:** 
1. Configure my site to generate URLs consistently (standardize to one format)
2. Add 301 redirects from one URL format to the preferred version
3. Ensure canonical tags match actual URLs

**Stack:** [Your framework] on [Your hosting]

Please check my config files and fix the URL format inconsistency issue.

---

## For Different Frameworks:

### If using Next.js:
- Check `next.config.js` for `trailingSlash` setting
- Check `next.config.js` redirects or middleware

### If using Gatsby:
- Check `gatsby-config.js` for `trailingSlash` setting
- Check redirects in `gatsby-node.js` or `gatsby-config.js`

### If using Nuxt:
- Check `nuxt.config.js` for `trailingSlash` router option
- Check redirects in `nuxt.config.js` or middleware

### If using Vite/Vue/React SPA:
- Check build configuration
- Check hosting redirect rules (Netlify, Vercel, etc.)

### If using WordPress:
- Check permalink settings
- Check `.htaccess` redirects
- Check Yoast/SEO plugin canonical settings

---

## Expected Solution:

1. **Framework Config:** Set trailing slash preference (e.g., `trailingSlash: false` or `trailingSlash: true`) to match your sitemap
2. **Redirects:** Add rules to redirect from one format to the other:
   - If standardizing to no trailing slash: `/*/` → `/*` (301)
   - If standardizing to trailing slash: `/*` → `/*/` (301)
   - Or add specific rules for your route patterns
3. **Canonical Tags:** Ensure they match actual URLs (same format as your standard)
4. **Sitemap:** Verify URLs match actual page structure and format

---

