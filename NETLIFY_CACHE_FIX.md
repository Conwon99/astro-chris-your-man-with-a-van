# Netlify Cache & Deployment Fix

## Issue: Netlify Showing Old Version

### Immediate Solutions (Try in order):

#### 1. **Clear Netlify Build Cache**
   - Go to Netlify Dashboard → Your Site → **Deploys**
   - Click on the latest deploy
   - Click **"Clear cache and retry deploy"** or **"Trigger deploy"**
   - Or go to: **Site settings → Build & deploy → Clear build cache**

#### 2. **Force a New Deployment**
   - Netlify Dashboard → **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
   - This will rebuild everything from scratch

#### 3. **Verify Environment Variables**
   - Netlify Dashboard → **Site settings** → **Environment variables**
   - Ensure `GOOGLE_PLACES_API_KEY` and `GOOGLE_MAPS_URL` are set
   - If you made changes, trigger a new deploy after saving

#### 4. **Check Build Output**
   - Netlify Dashboard → **Deploys** → Click on the deploy → **View logs**
   - Verify the build completed successfully
   - Check if any errors occurred

#### 5. **Browser Cache Clear**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or open in Incognito/Private mode
   - Clear browser cache completely

### Configuration Changes Made:

1. **Cache Headers Updated**: Changed CSS/JS cache from 1 year to 1 hour with `must-revalidate`
2. **Netlify Adapter Added**: Required for hybrid mode API routes to work on Netlify
3. **Build Configuration**: Added functions directory for API routes

### Next Steps:

1. **Rebuild locally** to test:
   ```bash
   npm run build
   ```

2. **Commit and push** these changes:
   ```bash
   git add .
   git commit -m "Fix Netlify deployment: Add adapter, reduce cache times"
   git push
   ```

3. **Trigger a new Netlify deploy** with cache cleared

### If Issues Persist:

- Check Netlify build logs for errors
- Verify the `dist` folder is being generated correctly
- Ensure all files in `public/` are being copied to `dist/`
- Check if there's a deployment lock or pending build


