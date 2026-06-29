# Simple Tracker API Integration

Instructions for integrating Simple Tracker data into your existing dashboard.

## 📡 API Endpoint

Your dashboard needs to provide this endpoint to receive tracking data:

```
POST /track
Content-Type: application/json
```

## 📊 Data Format

### Request Body Structure
```json
{
  "websiteId": "chris-van-services",
  "apiKey": "your-api-key",
  "events": [
    {
      "type": "visit",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "sessionId": "sess_1705315800000_abc123def",
      "url": "https://chrisyourmanwithavan.netlify.app/",
      "visit": {
        "visits": 1,
        "isNewVisitor": true,
        "referrer": "https://google.com",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Event Types

#### 1. Visit Event
```json
{
  "type": "visit",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "sessionId": "sess_1705315800000_abc123def",
  "websiteId": "chris-van-services",
  "url": "https://chrisyourmanwithavan.netlify.app/",
  "visit": {
    "visits": 1,
    "isNewVisitor": true,
    "referrer": "https://google.com",
    "userAgent": "Mozilla/5.0..."
  }
}
```

#### 2. WhatsApp Click Event
```json
{
  "type": "messenger_click",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "sessionId": "sess_1705315800000_abc123def",
  "websiteId": "chris-van-services",
  "url": "https://chrisyourmanwithavan.netlify.app/",
  "messenger": {
    "type": "whatsapp",
    "clicks": 1,
    "url": "https://chrisyourmanwithavan.netlify.app/"
  }
}
```

#### 3. Facebook Messenger Click Event
```json
{
  "type": "messenger_click",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "sessionId": "sess_1705315800000_abc123def",
  "websiteId": "chris-van-services",
  "url": "https://chrisyourmanwithavan.netlify.app/",
  "messenger": {
    "type": "facebook",
    "clicks": 1,
    "url": "https://chrisyourmanwithavan.netlify.app/"
  }
}
```

## 🔧 Dashboard Integration Examples

### Node.js/Express
```javascript
app.post('/track', (req, res) => {
  const { websiteId, apiKey, events } = req.body;

  // Validate API key
  if (!isValidApiKey(apiKey)) {
    return res.status(401).json({ success: false, message: 'Invalid API key' });
  }

  // Process each event
  events.forEach(event => {
    switch (event.type) {
      case 'visit':
        // Store visit data
        console.log(`Visit from ${event.visit.referrer}, New visitor: ${event.visit.isNewVisitor}`);
        break;
        
      case 'messenger_click':
        if (event.messenger.type === 'whatsapp') {
          // Store WhatsApp click
          console.log('WhatsApp click tracked');
        } else if (event.messenger.type === 'facebook') {
          // Store Facebook Messenger click
          console.log('Facebook Messenger click tracked');
        }
        break;
    }
  });

  res.json({ 
    success: true, 
    message: 'Events processed successfully',
    processed: events.length 
  });
});
```

### PHP
```php
<?php
// track.php
header('Content-Type: application/json');

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
            // Store visit data
            storeVisit($input['websiteId'], $event);
            $processed++;
            break;
            
        case 'messenger_click':
            if ($event['messenger']['type'] === 'whatsapp') {
                storeWhatsAppClick($input['websiteId'], $event);
            } else if ($event['messenger']['type'] === 'facebook') {
                storeFacebookClick($input['websiteId'], $event);
            }
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
    $validKeys = ['your-api-key', 'chris-van-api-key'];
    return in_array($apiKey, $validKeys);
}

function storeVisit($websiteId, $event) {
    // Your database logic here
    // INSERT INTO visits (website_id, session_id, url, referrer, is_new_visitor, timestamp)
}

function storeWhatsAppClick($websiteId, $event) {
    // Your database logic here
    // INSERT INTO messenger_clicks (website_id, session_id, type, url, timestamp)
}

function storeFacebookClick($websiteId, $event) {
    // Your database logic here
    // INSERT INTO messenger_clicks (website_id, session_id, type, url, timestamp)
}
?>
```

### Python/Flask
```python
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

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
            if event['messenger']['type'] == 'whatsapp':
                store_whatsapp_click(data['websiteId'], event)
            elif event['messenger']['type'] == 'facebook':
                store_facebook_click(data['websiteId'], event)
            processed += 1
    
    return jsonify({
        'success': True,
        'message': 'Events processed successfully',
        'processed': processed
    })

def is_valid_api_key(api_key):
    valid_keys = ['your-api-key', 'chris-van-api-key']
    return api_key in valid_keys

def store_visit(website_id, event):
    # Your database logic here
    pass

def store_whatsapp_click(website_id, event):
    # Your database logic here
    pass

def store_facebook_click(website_id, event):
    # Your database logic here
    pass
```

## 🗄️ Database Schema

### Visits Table
```sql
CREATE TABLE visits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    website_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    url TEXT,
    referrer TEXT,
    is_new_visitor BOOLEAN,
    user_agent TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_website_date (website_id, timestamp),
    INDEX idx_session (session_id)
);
```

### Messenger Clicks Table
```sql
CREATE TABLE messenger_clicks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    website_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    messenger_type ENUM('whatsapp', 'facebook') NOT NULL,
    url TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_website_type (website_id, messenger_type),
    INDEX idx_website_date (website_id, timestamp)
);
```

### Daily Stats Table (Optional - for aggregated data)
```sql
CREATE TABLE daily_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    website_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    visits INT DEFAULT 0,
    whatsapp_clicks INT DEFAULT 0,
    facebook_clicks INT DEFAULT 0,
    UNIQUE KEY unique_website_date (website_id, date),
    INDEX idx_date (date)
);
```

## 📊 Response Format

Your API should respond with:
```json
{
    "success": true,
    "message": "Events processed successfully",
    "processed": 3
}
```

## 🔒 Security Considerations

### API Key Validation
```javascript
function isValidApiKey(apiKey) {
    const validKeys = [
        'your-production-api-key',
        'chris-van-services-key',
        'demo-api-key'
    ];
    return validKeys.includes(apiKey);
}
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP'
});

app.use('/track', limiter);
```

### CORS Configuration
```javascript
app.use(cors({
    origin: ['https://chrisyourmanwithavan.netlify.app'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'X-API-Key']
}));
```

## 🧪 Testing

### Test the endpoint with curl:
```bash
curl -X POST https://your-dashboard.com/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "websiteId": "chris-van-services",
    "apiKey": "your-api-key",
    "events": [
      {
        "type": "visit",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "sessionId": "test-session-123",
        "url": "https://chrisyourmanwithavan.netlify.app/",
        "visit": {
          "visits": 1,
          "isNewVisitor": true,
          "referrer": "https://google.com",
          "userAgent": "Mozilla/5.0..."
        }
      }
    ]
  }'
```

## 📱 Expected Data Volume

For a typical website:
- **Visits**: 1 event per page load per visitor
- **WhatsApp Clicks**: 0-5% of visits (depending on placement)
- **Facebook Clicks**: 0-3% of visits (depending on placement)

Example for 100 daily visitors:
- ~100 visit events
- ~2-5 WhatsApp click events  
- ~1-3 Facebook click events

## 🔧 Configuration

Update your Simple Tracker configuration:
```html
<script 
    src="simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="your-dashboard-api-key"
    data-api-endpoint="https://your-dashboard.com/track">
</script>
```

That's it! Your dashboard just needs to provide the `/track` endpoint to receive the 3 types of data: visits, WhatsApp clicks, and Facebook Messenger clicks.

