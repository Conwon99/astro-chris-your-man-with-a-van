# Heroku API Setup for RevuCapture Analytics

Complete guide to set up a Heroku API that receives tracking data from the Simple Tracker.

## 🚀 Step 1: Create Heroku App

### 1.1 Install Heroku CLI
```bash
# Download and install from: https://devcenter.heroku.com/articles/heroku-cli
# Or use npm
npm install -g heroku-cli
```

### 1.2 Login to Heroku
```bash
heroku login
```

### 1.3 Create New App
```bash
# Create app (choose a unique name)
heroku create revucapture-api

# Or create with specific region
heroku create revucapture-api --region us
```

## 📁 Step 2: Create API Project Structure

### 2.1 Create Project Directory
```bash
mkdir revucapture-api
cd revucapture-api
```

### 2.2 Initialize Node.js Project
```bash
npm init -y
```

### 2.3 Install Dependencies
```bash
npm install express cors helmet morgan
npm install --save-dev nodemon
```

## 💻 Step 3: Create API Code

### 3.1 Create `server.js`
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(cors({
    origin: [
        'https://chrismanwithvanstaging.netlify.app',
        'https://chrisyourmanwithavan.netlify.app',
        'https://revucapturestaging.netlify.app'
    ],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-API-Key'],
    credentials: false
}));
app.use(express.json({ limit: '10mb' }));

// In-memory storage (replace with database in production)
let trackingData = {
    visits: [],
    messengerClicks: [],
    dailyStats: {}
};

// API Routes

// Health check
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'RevuCapture Analytics API',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Tracking endpoint
app.post('/api/track', (req, res) => {
    try {
        const { websiteId, apiKey, events } = req.body;
        
        console.log(`📊 Received tracking data for website: ${websiteId}`);
        console.log(`📝 Events count: ${events.length}`);
        
        // Validate API key
        if (!isValidApiKey(apiKey)) {
            console.log('❌ Invalid API key');
            return res.status(401).json({
                success: false,
                message: 'Invalid API key'
            });
        }
        
        // Validate required fields
        if (!websiteId || !events || !Array.isArray(events)) {
            console.log('❌ Invalid request format');
            return res.status(400).json({
                success: false,
                message: 'Invalid request format'
            });
        }
        
        let processedCount = 0;
        
        // Process each event
        events.forEach(event => {
            switch (event.type) {
                case 'visit':
                    processVisitEvent(websiteId, event);
                    processedCount++;
                    break;
                    
                case 'messenger_click':
                    processMessengerClickEvent(websiteId, event);
                    processedCount++;
                    break;
                    
                default:
                    console.log(`⚠️  Unknown event type: ${event.type}`);
            }
        });
        
        console.log(`✅ Processed ${processedCount} events successfully`);
        
        res.json({
            success: true,
            message: 'Events processed successfully',
            processed: processedCount,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error processing tracking data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Handle preflight requests
app.options('/api/track', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    res.status(200).end();
});

// Get analytics data (optional - for dashboard)
app.get('/api/analytics/:websiteId', (req, res) => {
    const { websiteId } = req.params;
    
    const websiteData = {
        websiteId: websiteId,
        totalVisits: trackingData.visits.filter(v => v.websiteId === websiteId).length,
        totalWhatsAppClicks: trackingData.messengerClicks.filter(
            m => m.websiteId === websiteId && m.type === 'whatsapp'
        ).length,
        totalFacebookClicks: trackingData.messengerClicks.filter(
            m => m.websiteId === websiteId && m.type === 'facebook'
        ).length,
        lastUpdated: new Date().toISOString()
    };
    
    res.json(websiteData);
});

// Event Processing Functions
function processVisitEvent(websiteId, event) {
    const visitData = {
        websiteId: websiteId,
        sessionId: event.sessionId,
        url: event.url,
        referrer: event.visit?.referrer || '',
        isNewVisitor: event.visit?.isNewVisitor || false,
        userAgent: event.visit?.userAgent || '',
        timestamp: event.timestamp || new Date().toISOString()
    };
    
    trackingData.visits.push(visitData);
    
    // Update daily stats
    updateDailyStats(websiteId, 'visit');
    
    console.log(`👁️  Visit tracked: ${visitData.isNewVisitor ? 'New' : 'Returning'} visitor from ${visitData.referrer}`);
}

function processMessengerClickEvent(websiteId, event) {
    const messengerData = {
        websiteId: websiteId,
        sessionId: event.sessionId,
        type: event.messenger?.type || 'unknown',
        url: event.url,
        clicks: event.messenger?.clicks || 1,
        timestamp: event.timestamp || new Date().toISOString()
    };
    
    trackingData.messengerClicks.push(messengerData);
    
    // Update daily stats
    const statKey = messengerData.type === 'whatsapp' ? 'whatsappClicks' : 'facebookClicks';
    updateDailyStats(websiteId, statKey);
    
    console.log(`💬 ${messengerData.type.toUpperCase()} click tracked: ${messengerData.clicks} clicks`);
}

function updateDailyStats(websiteId, eventType) {
    const today = new Date().toISOString().split('T')[0];
    const key = `${websiteId}_${today}`;
    
    if (!trackingData.dailyStats[key]) {
        trackingData.dailyStats[key] = {
            websiteId: websiteId,
            date: today,
            visits: 0,
            whatsappClicks: 0,
            facebookClicks: 0
        };
    }
    
    if (eventType === 'visit') {
        trackingData.dailyStats[key].visits++;
    } else if (eventType === 'whatsappClicks') {
        trackingData.dailyStats[key].whatsappClicks++;
    } else if (eventType === 'facebookClicks') {
        trackingData.dailyStats[key].facebookClicks++;
    }
}

// API Key Validation
function isValidApiKey(apiKey) {
    const validKeys = [
        'rc_live_7f9a2b8c4d1e6f3a9b5c2d8e1f4a7b0c',
        'rc_test_1234567890abcdef',
        // Add more API keys as needed
    ];
    return validKeys.includes(apiKey);
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RevuCapture Analytics API running on port ${PORT}`);
    console.log(`📊 Tracking endpoint: http://localhost:${PORT}/api/track`);
    console.log(`🔍 Health check: http://localhost:${PORT}/`);
});

module.exports = app;
```

### 3.2 Create `package.json`
```json
{
  "name": "revucapture-api",
  "version": "1.0.0",
  "description": "RevuCapture Analytics API for tracking website visits and messenger clicks",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "keywords": [
    "analytics",
    "tracking",
    "api",
    "revucapture"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

### 3.3 Create `Procfile`
```bash
# Create Procfile (no extension)
echo "web: node server.js" > Procfile
```

## 🚀 Step 4: Deploy to Heroku

### 4.1 Initialize Git
```bash
git init
git add .
git commit -m "Initial RevuCapture API setup"
```

### 4.2 Connect to Heroku
```bash
# Add Heroku remote
heroku git:remote -a revucapture-api

# Deploy
git push heroku main
```

### 4.3 Verify Deployment
```bash
# Check app status
heroku ps

# View logs
heroku logs --tail

# Open app in browser
heroku open
```

## 🧪 Step 5: Test the API

### 5.1 Test Health Check
```bash
curl https://revucapture-api.herokuapp.com/
```

### 5.2 Test Tracking Endpoint
```bash
curl -X POST https://revucapture-api.herokuapp.com/api/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: rc_live_7f9a2b8c4d1e6f3a9b5c2d8e1f4a7b0c" \
  -d '{
    "websiteId": "chris-van-services",
    "apiKey": "rc_live_7f9a2b8c4d1e6f3a9b5c2d8e1f4a7b0c",
    "events": [
      {
        "type": "visit",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "sessionId": "test-session-123",
        "url": "https://chrismanwithvanstaging.netlify.app/",
        "visit": {
          "visits": 1,
          "isNewVisitor": true,
          "referrer": "https://google.com"
        }
      }
    ]
  }'
```

### 5.3 Test Analytics Endpoint
```bash
curl https://revucapture-api.herokuapp.com/api/analytics/chris-van-services
```

## 🔧 Step 6: Environment Configuration

### 6.1 Set Environment Variables (Optional)
```bash
# Set API keys as environment variables
heroku config:set API_KEY_1=rc_live_7f9a2b8c4d1e6f3a9b5c2d8e1f4a7b0c
heroku config:set API_KEY_2=rc_test_1234567890abcdef

# Set CORS origins
heroku config:set CORS_ORIGINS="https://chrismanwithvanstaging.netlify.app,https://chrisyourmanwithavan.netlify.app"
```

### 6.2 Update Code to Use Environment Variables
```javascript
// In server.js, replace the hardcoded values:
const validKeys = [
    process.env.API_KEY_1,
    process.env.API_KEY_2,
    'rc_live_7f9a2b8c4d1e6f3a9b5c2d8e1f4a7b0c' // fallback
].filter(Boolean);

const corsOrigins = process.env.CORS_ORIGINS ? 
    process.env.CORS_ORIGINS.split(',') : 
    ['https://chrismanwithvanstaging.netlify.app'];
```

## 📊 Step 7: Database Integration (Optional)

### 7.1 Add PostgreSQL (Recommended for Production)
```bash
# Add Heroku Postgres
heroku addons:create heroku-postgresql:mini
```

### 7.2 Install Database Dependencies
```bash
npm install pg
```

### 7.3 Update Code for Database
```javascript
// Add database connection and queries
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Replace in-memory storage with database queries
async function storeVisit(visitData) {
    const query = `
        INSERT INTO visits (website_id, session_id, url, referrer, is_new_visitor, user_agent, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(query, [
        visitData.websiteId,
        visitData.sessionId,
        visitData.url,
        visitData.referrer,
        visitData.isNewVisitor,
        visitData.userAgent,
        visitData.timestamp
    ]);
}
```

## 🔍 Step 8: Monitoring and Logs

### 8.1 View Logs
```bash
# Real-time logs
heroku logs --tail

# Recent logs
heroku logs --num 100
```

### 8.2 Monitor Performance
```bash
# Check dyno usage
heroku ps:scale web=1

# Monitor metrics
heroku addons:create newrelic:wayne
```

## 🚨 Troubleshooting

### Common Issues:

1. **App won't start:**
   ```bash
   heroku logs --tail
   ```

2. **CORS errors:**
   - Check CORS origins in server.js
   - Verify domain is in the allowed list

3. **API key validation:**
   - Ensure API key is in the validKeys array
   - Check for typos in the key

4. **Database connection:**
   ```bash
   heroku pg:info
   ```

## 🎯 Expected Results

After setup, your API should:
- ✅ Accept POST requests to `/api/track`
- ✅ Validate API keys
- ✅ Process visit and messenger click events
- ✅ Return success responses
- ✅ Log all tracking data
- ✅ Handle CORS properly

## 📝 Next Steps

1. **Deploy the API** following the steps above
2. **Test with your website** using the tracking script
3. **Monitor logs** to see incoming data
4. **Add database** for persistent storage
5. **Create dashboard** to view analytics data

Your API will be available at: `https://revucapture-api.herokuapp.com/api/track`

