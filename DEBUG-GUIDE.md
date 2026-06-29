# Simple Tracker Debug Guide

## 🔍 How to Check if the Script is Running

### 1. **Browser Console Check**
Open your website and press `F12` (or right-click → Inspect → Console), then look for:

**✅ Script Loaded Successfully:**
```
[SimpleTracker] Visit tracked: #1
[SimpleTracker] WhatsApp click tracked: #1
```

**❌ Script Not Loading:**
```
Failed to load resource: the server responded with a 404
Uncaught ReferenceError: SimpleTracker is not defined
```

### 2. **Manual Testing**
In the browser console, type:
```javascript
// Check if tracker is loaded
console.log(typeof SimpleTracker);

// Check current stats
console.log(SimpleTracker.getStats());

// Check if opted out
console.log(SimpleTracker.isOptedOut());

// Manually trigger events
SimpleTracker.trackWhatsAppClick();
SimpleTracker.trackFacebookClick();
```

### 3. **Network Tab Check**
1. Open Developer Tools → Network tab
2. Refresh the page
3. Look for requests to your API endpoint
4. Check if requests are being sent

## 🐛 Common Issues & Solutions

### Issue 1: Script Not Loading
**Symptoms:** Console shows "404" or "Failed to load resource"

**Solutions:**
```html
<!-- ❌ Wrong - script doesn't exist -->
<script src="simple-tracker.js"></script>

<!-- ✅ Correct - use full URL or local file -->
<script src="https://your-domain.com/simple-tracker.js"></script>
<!-- OR -->
<script src="./simple-tracker.js"></script>
```

### Issue 2: Configuration Missing
**Symptoms:** Console shows "websiteId and apiKey are required"

**Solutions:**
```html
<!-- ❌ Missing required attributes -->
<script src="simple-tracker.js"></script>

<!-- ✅ Correct - include both required attributes -->
<script 
    src="simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="your-api-key">
</script>
```

### Issue 3: API Endpoint Not Responding
**Symptoms:** Network tab shows failed requests (red entries)

**Solutions:**
1. **Check API endpoint URL:**
```html
<!-- Add custom endpoint if needed -->
<script 
    src="simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="your-api-key"
    data-api-endpoint="https://your-api.com/track">
</script>
```

2. **Test API endpoint manually:**
```bash
curl -X POST https://your-api.com/track \
  -H "Content-Type: application/json" \
  -d '{"websiteId":"test","apiKey":"test","events":[]}'
```

### Issue 4: Do Not Track Enabled
**Symptoms:** Script loads but no events are tracked

**Solutions:**
```javascript
// Check if DNT is blocking tracking
console.log('Do Not Track:', navigator.doNotTrack);
console.log('Opted out:', SimpleTracker.isOptedOut());

// Disable DNT respect for testing
SimpleTracker.init({
    websiteId: 'chris-van-services',
    apiKey: 'your-api-key',
    respectDoNotTrack: false, // Disable for testing
    debug: true
});
```

### Issue 5: No WhatsApp/Facebook Links
**Symptoms:** Visits tracked but no messenger clicks

**Solutions:**
1. **Check if you have the right links:**
```html
<!-- ✅ These will be tracked -->
<a href="https://wa.me/07735852822">WhatsApp</a>
<a href="https://m.me/yourpage">Facebook Messenger</a>

<!-- ❌ These won't be tracked -->
<a href="tel:07735852822">Call</a>
<a href="mailto:info@example.com">Email</a>
```

2. **Test with manual tracking:**
```javascript
// Manually trigger clicks for testing
SimpleTracker.trackWhatsAppClick();
SimpleTracker.trackFacebookClick();
```

## 🧪 Debug Mode

### Enable Debug Mode
```html
<script 
    src="simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="your-api-key"
    data-api-endpoint="https://your-api.com/track">
</script>
<script>
SimpleTracker.init({
    websiteId: 'chris-van-services',
    apiKey: 'your-api-key',
    debug: true // Enable debug logging
});
</script>
```

### Debug Output Examples
```
[SimpleTracker] Visit tracked: #1
[SimpleTracker] WhatsApp click tracked: #1
[SimpleTracker] Event sent: visit
[SimpleTracker] Event sent: messenger_click
[SimpleTracker] Request failed: HTTP 500
```

## 🔧 Step-by-Step Debug Process

### Step 1: Check Script Loading
1. Open your website
2. Press F12 → Console
3. Look for `[SimpleTracker]` messages
4. If no messages, script isn't loading

### Step 2: Verify Configuration
```javascript
// In console, check if tracker is initialized
console.log('SimpleTracker object:', SimpleTracker);
console.log('Current stats:', SimpleTracker.getStats());
```

### Step 3: Test Manual Events
```javascript
// Test visit tracking
SimpleTracker.track('visit', { visit: { visits: 1, isNewVisitor: true } });

// Test WhatsApp click
SimpleTracker.trackWhatsAppClick();

// Test Facebook click  
SimpleTracker.trackFacebookClick();
```

### Step 4: Check Network Requests
1. F12 → Network tab
2. Refresh page
3. Look for POST requests to your API
4. Check response status (should be 200)

### Step 5: Verify API Response
Click on a network request and check:
```json
// Request body should look like:
{
  "websiteId": "chris-van-services",
  "apiKey": "your-api-key",
  "events": [...]
}

// Response should be:
{
  "success": true,
  "processed": 1
}
```

## 🚨 Emergency Debug Checklist

### Quick Health Check
```javascript
// Run this in console to check everything
(function() {
    console.log('=== Simple Tracker Debug ===');
    console.log('1. Script loaded:', typeof SimpleTracker !== 'undefined');
    console.log('2. Stats:', SimpleTracker ? SimpleTracker.getStats() : 'N/A');
    console.log('3. Opted out:', SimpleTracker ? SimpleTracker.isOptedOut() : 'N/A');
    console.log('4. DNT enabled:', navigator.doNotTrack);
    console.log('5. Local storage:', typeof localStorage !== 'undefined');
    
    // Test API endpoint
    fetch('https://your-api.com/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true })
    }).then(r => console.log('6. API reachable:', r.status))
      .catch(e => console.log('6. API error:', e.message));
})();
```

## 📱 Mobile Debug

### Chrome Mobile Debug
1. Connect phone via USB
2. Enable USB debugging
3. Open `chrome://inspect` in desktop Chrome
4. Select your device and website
5. Check console for tracker messages

### Mobile Console Alternative
Add this temporary debug code to your page:
```html
<script>
// Temporary mobile debug
window.debugTracker = function() {
    alert('Tracker loaded: ' + (typeof SimpleTracker !== 'undefined'));
    if (window.SimpleTracker) {
        alert('Stats: ' + JSON.stringify(SimpleTracker.getStats()));
    }
};
</script>

<!-- Add button for testing -->
<button onclick="debugTracker()">Debug Tracker</button>
```

## 🔄 Reset Everything

### Clear All Tracking Data
```javascript
// In console - clears all stored data
localStorage.removeItem('simple_session');
localStorage.removeItem('simple_opt_out');
localStorage.removeItem('simple_failed_events');
console.log('All tracking data cleared');
```

### Reinitialize Tracker
```javascript
// Force reinitialize
SimpleTracker.init({
    websiteId: 'chris-van-services',
    apiKey: 'your-api-key',
    debug: true
});
```

## 📊 Expected Behavior

### Normal Operation:
1. **Page Load:** Visit event sent immediately
2. **WhatsApp Click:** Messenger click event sent
3. **Facebook Click:** Messenger click event sent
4. **Console:** Shows debug messages (if enabled)
5. **Network:** Shows successful POST requests

### What You Should See:
- Console: `[SimpleTracker] Visit tracked: #1`
- Network: POST request to `/track` endpoint
- Response: `{"success": true, "processed": 1}`

If you're not seeing this behavior, run through the debug steps above to identify the issue!

