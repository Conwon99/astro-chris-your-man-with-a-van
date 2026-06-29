# Complete Netlify Deployment Guide

## 🏠 Step 1: Local Testing Setup

### 1.1 Create Test Server
Create `test-server.js` in your project root:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Test endpoint to receive tracking data
app.post('/track', (req, res) => {
    console.log('📊 Received tracking data:');
    console.log(JSON.stringify(req.body, null, 2));
    
    // Log each event type
    req.body.events.forEach(event => {
        switch (event.type) {
            case 'visit':
                console.log(`👁️  Visit: ${event.visit.isNewVisitor ? 'New' : 'Returning'} visitor`);
                break;
            case 'messenger_click':
                console.log(`💬 ${event.messenger.type.toUpperCase()} click tracked`);
                break;
        }
    });
    
    res.json({ 
        success: true, 
        message: 'Events processed successfully',
        processed: req.body.events.length 
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`🧪 Test server running at http://localhost:${port}`);
    console.log(`📡 Ready to receive tracking data!`);
    console.log(`🔍 Health check: http://localhost:${port}/health`);
});
```

### 1.2 Install Dependencies
```bash
# Install test server dependencies
npm init -y
npm install express cors

# Create package.json scripts
npm pkg set scripts.test-server="node test-server.js"
npm pkg set scripts.serve="python -m http.server 8000"
```

### 1.3 Update Your index.html
Update the script tag in your `index.html`:

```html
<!-- Simple Analytics Tracker -->
<script 
    src="./simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="test-api-key-123"
    data-api-endpoint="http://localhost:3000/track">
</script>
```

### 1.4 Test Locally
```bash
# Terminal 1: Start test server
npm run test-server

# Terminal 2: Serve your website
npm run serve
# OR: python -m http.server 8000

# Open: http://localhost:8000
```

**Expected Results:**
- Browser console: `[SimpleTracker] Visit tracked: #1`
- Test server console: Visit and click data logged

## 🎛️ Step 2: Configure Your Existing Dashboard

### 2.1 Add Tracking Endpoint to Your Dashboard
Your dashboard needs to accept POST requests at `/track`. Here are examples for different frameworks:

#### Node.js/Express Dashboard
```javascript
// Add this route to your existing Express app
app.post('/track', (req, res) => {
    const { websiteId, apiKey, events } = req.body;
    
    // Validate API key (replace with your validation logic)
    if (!isValidApiKey(apiKey)) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid API key' 
        });
    }
    
    let processed = 0;
    
    events.forEach(event => {
        switch (event.type) {
            case 'visit':
                // Store visit in your database
                storeVisit(websiteId, event);
                processed++;
                break;
                
            case 'messenger_click':
                // Store messenger click
                storeMessengerClick(websiteId, event);
                processed++;
                break;
        }
    });
    
    res.json({ 
        success: true, 
        message: 'Events processed successfully',
        processed: processed 
    });
});

// API key validation function
function isValidApiKey(apiKey) {
    const validKeys = [
        'your-production-api-key',
        'chris-van-services-key',
        'test-api-key-123' // For testing
    ];
    return validKeys.includes(apiKey);
}

// Database storage functions (adapt to your database)
function storeVisit(websiteId, event) {
    // Your existing database logic here
    console.log(`Storing visit for ${websiteId}:`, event.visit);
}

function storeMessengerClick(websiteId, event) {
    // Your existing database logic here
    console.log(`Storing ${event.messenger.type} click for ${websiteId}`);
}
```

#### PHP Dashboard
```php
<?php
// track.php - Add this to your existing PHP dashboard

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['websiteId'], $input['apiKey'], $input['events'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request format']);
    exit;
}

// Validate API key
if (!isValidApiKey($input['apiKey'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}

$processed = 0;

foreach ($input['events'] as $event) {
    switch ($event['type']) {
        case 'visit':
            // Store visit in your database
            storeVisit($input['websiteId'], $event);
            $processed++;
            break;
            
        case 'messenger_click':
            // Store messenger click
            storeMessengerClick($input['websiteId'], $event);
            $processed++;
            break;
    }
}

echo json_encode([
    'success' => true,
    'message' => 'Events processed successfully',
    'processed' => $processed
]);

function isValidApiKey($apiKey) {
    $validKeys = ['your-production-api-key', 'chris-van-services-key'];
    return in_array($apiKey, $validKeys);
}

function storeVisit($websiteId, $event) {
    // Your existing database logic here
    error_log("Storing visit for $websiteId: " . json_encode($event['visit']));
}

function storeMessengerClick($websiteId, $event) {
    // Your existing database logic here
    $type = $event['messenger']['type'];
    error_log("Storing $type click for $websiteId");
}
?>
```

#### Python/Flask Dashboard
```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/track', methods=['POST'])
def track_events():
    data = request.get_json()
    
    if not data or 'websiteId' not in data or 'apiKey' not in data or 'events' not in data:
        return jsonify({'error': 'Invalid request format'}), 400
    
    # Validate API key
    if not is_valid_api_key(data['apiKey']):
        return jsonify({'error': 'Invalid API key'}), 401
    
    processed = 0
    
    for event in data['events']:
        if event['type'] == 'visit':
            store_visit(data['websiteId'], event)
            processed += 1
        elif event['type'] == 'messenger_click':
            store_messenger_click(data['websiteId'], event)
            processed += 1
    
    return jsonify({
        'success': True,
        'message': 'Events processed successfully',
        'processed': processed
    })

def is_valid_api_key(api_key):
    valid_keys = ['your-production-api-key', 'chris-van-services-key']
    return api_key in valid_keys

def store_visit(website_id, event):
    # Your existing database logic here
    print(f"Storing visit for {website_id}: {event['visit']}")

def store_messenger_click(website_id, event):
    # Your existing database logic here
    msg_type = event['messenger']['type']
    print(f"Storing {msg_type} click for {website_id}")
```

### 2.2 Generate Production API Key
Create a secure API key for production:

```javascript
// Generate a secure API key
const crypto = require('crypto');
const apiKey = crypto.randomBytes(32).toString('hex');
console.log('Production API Key:', apiKey);
// Output: something like "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
```

### 2.3 Update Dashboard CORS Settings
Make sure your dashboard accepts requests from your Netlify domain:

```javascript
// Node.js/Express
app.use(cors({
    origin: [
        'https://chrisyourmanwithavan.netlify.app',
        'http://localhost:8000' // For local testing
    ],
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'X-API-Key']
}));
```

## 🚀 Step 3: Deploy to Netlify

### 3.1 Prepare Files for Deployment
Your project structure should look like:
```
your-project/
├── index.html (updated with tracker)
├── simple-tracker.js
├── src/
├── public/
├── package.json
└── netlify.toml (optional)
```

### 3.2 Create netlify.toml (Optional)
```toml
[build]
  publish = "."
  command = "npm run build"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/simple-tracker.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### 3.3 Update index.html for Production
```html
<!-- Simple Analytics Tracker - Production -->
<script 
    src="https://chrisyourmanwithavan.netlify.app/simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="your-production-api-key"
    data-api-endpoint="https://your-dashboard-domain.com/track">
</script>
```

### 3.4 Deploy to Netlify

#### Option A: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir .

# Set environment variables
netlify env:set API_KEY "your-production-api-key"
```

#### Option B: Git Integration
1. Push your code to GitHub/GitLab
2. Connect repository to Netlify
3. Set build settings:
   - Build command: `npm run build` (if needed)
   - Publish directory: `.` (or `dist` if built)
4. Deploy

#### Option C: Drag & Drop
1. Zip your project folder
2. Go to Netlify dashboard
3. Drag & drop the zip file

### 3.5 Set Environment Variables (if using Netlify Functions)
If your dashboard uses Netlify Functions, add environment variables:

```bash
# In Netlify dashboard or CLI
netlify env:set API_KEY "your-production-api-key"
netlify env:set DASHBOARD_URL "https://your-dashboard-domain.com"
```

## 🧪 Step 4: Test Production Deployment

### 4.1 Test Your Live Website
1. Visit your Netlify URL: `https://chrisyourmanwithavan.netlify.app`
2. Open browser console (F12)
3. Look for tracker messages:
   ```
   [SimpleTracker] Visit tracked: #1
   [SimpleTracker] Event sent: visit
   ```

### 4.2 Test API Endpoint
```bash
# Test your dashboard API
curl -X POST https://your-dashboard-domain.com/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-production-api-key" \
  -d '{
    "websiteId": "chris-van-services",
    "apiKey": "your-production-api-key",
    "events": [{"type": "test"}]
  }'
```

### 4.3 Test Messenger Links
Add test links to your website:
```html
<!-- Add these to your website for testing -->
<a href="https://wa.me/07735852822?text=Hello" target="_blank">
    📱 WhatsApp Contact
</a>

<a href="https://m.me/yourpage" target="_blank">
    💬 Facebook Messenger
</a>
```

## 🔧 Step 5: Monitor and Debug

### 5.1 Enable Production Debug (Temporarily)
```html
<script>
// Temporary debug for production testing
SimpleTracker.init({
    websiteId: 'chris-van-services',
    apiKey: 'your-production-api-key',
    apiEndpoint: 'https://your-dashboard-domain.com/track',
    debug: true // Enable for initial testing
});
</script>
```

### 5.2 Monitor Dashboard Logs
Check your dashboard logs for incoming tracking data:
- Visit events
- WhatsApp click events
- Facebook Messenger click events

### 5.3 Remove Debug Mode
Once everything is working, remove debug mode:
```html
<script 
    src="https://chrisyourmanwithavan.netlify.app/simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="your-production-api-key"
    data-api-endpoint="https://your-dashboard-domain.com/track">
</script>
```

## 📊 Expected Results

### Your Dashboard Should Receive:
```json
{
  "websiteId": "chris-van-services",
  "apiKey": "your-production-api-key",
  "events": [
    {
      "type": "visit",
      "visit": {
        "visits": 1,
        "isNewVisitor": true,
        "referrer": "https://google.com"
      }
    },
    {
      "type": "messenger_click",
      "messenger": {
        "type": "whatsapp",
        "clicks": 1
      }
    }
  ]
}
```

### Your Dashboard Should Respond:
```json
{
  "success": true,
  "message": "Events processed successfully",
  "processed": 2
}
```

## 🚨 Troubleshooting

### Common Issues:
1. **CORS Errors**: Check dashboard CORS settings
2. **404 Errors**: Verify API endpoint URL
3. **401 Errors**: Check API key validation
4. **No Events**: Check browser console for tracker errors

### Debug Commands:
```bash
# Check if tracker is loading
curl -I https://chrisyourmanwithavan.netlify.app/simple-tracker.js

# Test API endpoint
curl -X POST https://your-dashboard-domain.com/track \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## 🎉 You're Done!

Once deployed, your Simple Tracker will:
- ✅ Track website visits automatically
- ✅ Track WhatsApp clicks on `wa.me` links
- ✅ Track Facebook Messenger clicks on `m.me` links
- ✅ Send data to your existing dashboard
- ✅ Handle errors gracefully with retry logic
- ✅ Respect user privacy with opt-out functionality

Your dashboard will receive real-time data about visitor engagement and messenger interactions!

