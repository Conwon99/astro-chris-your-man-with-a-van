# Supabase Direct Integration - Simple Analytics

Much simpler approach: send tracking data directly to Supabase without a custom API server.

## 🚀 Step 1: Create Supabase Project

### 1.1 Go to Supabase
1. **Visit:** https://supabase.com
2. **Sign up/Login**
3. **Click "New Project"**
4. **Choose organization**
5. **Name:** `revucapture-analytics`
6. **Database Password:** (choose a strong password)
7. **Region:** Choose closest to you
8. **Click "Create new project"**

### 1.2 Get Your Credentials
After project creation, go to **Settings → API** and note:
- **Project URL:** `https://your-project-id.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📊 Step 2: Create Database Tables

### 2.1 Go to SQL Editor
In your Supabase dashboard, go to **SQL Editor** and run this:

```sql
-- Create analytics table
CREATE TABLE analytics (
    id BIGSERIAL PRIMARY KEY,
    website_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB,
    url TEXT,
    referrer TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_analytics_website_id ON analytics(website_id);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for your tracking script)
CREATE POLICY "Allow anonymous inserts" ON analytics
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Create policy to allow reads (for your dashboard)
CREATE POLICY "Allow authenticated reads" ON analytics
    FOR SELECT 
    TO authenticated 
    USING (true);
```

### 2.2 Optional: Create Views for Easy Queries
```sql
-- Create view for daily stats
CREATE VIEW daily_stats AS
SELECT 
    website_id,
    DATE(created_at) as date,
    COUNT(CASE WHEN event_type = 'visit' THEN 1 END) as visits,
    COUNT(CASE WHEN event_type = 'messenger_click' AND event_data->>'type' = 'whatsapp' THEN 1 END) as whatsapp_clicks,
    COUNT(CASE WHEN event_type = 'messenger_click' AND event_data->>'type' = 'facebook' THEN 1 END) as facebook_clicks
FROM analytics
GROUP BY website_id, DATE(created_at)
ORDER BY date DESC;
```

## 🔧 Step 3: Update Simple Tracker

### 3.1 Modify the Simple Tracker
Update your `simple-tracker.js` to work with Supabase:

```javascript
// In the sendEvent function, replace the fetch call:
sendEvent: function(event) {
    const payload = {
        website_id: CONFIG.websiteId,
        session_id: sessionData.id,
        event_type: event.type,
        event_data: event,
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent.substring(0, 200)
    };

    fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.apiKey,
            'Authorization': `Bearer ${CONFIG.apiKey}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        utils.log(`Event sent: ${event.type}`);
    })
    .catch(error => {
        utils.log(`Failed to send event: ${error.message}`);
        this.storeFailedEvent(event);
    });
}
```

### 3.2 Update Your index.html
```html
<!-- RevuCapture Analytics -->
<script 
    src="https://revucapturestaging.netlify.app/simple-tracker.js"
    data-website-id="chris-van-services"
    data-api-key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
    data-api-endpoint="https://your-project-id.supabase.co/rest/v1/analytics">
</script>
```

## 📊 Step 4: Create Simple Dashboard

### 4.1 Create Dashboard HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>RevuCapture Analytics Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .stat { background: #f0f0f0; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .stat h3 { margin: 0 0 10px 0; }
        .stat .number { font-size: 2em; font-weight: bold; color: #007bff; }
    </style>
</head>
<body>
    <h1>📊 RevuCapture Analytics</h1>
    
    <div class="stat">
        <h3>Total Visits</h3>
        <div class="number" id="totalVisits">Loading...</div>
    </div>
    
    <div class="stat">
        <h3>WhatsApp Clicks</h3>
        <div class="number" id="whatsappClicks">Loading...</div>
    </div>
    
    <div class="stat">
        <h3>Facebook Clicks</h3>
        <div class="number" id="facebookClicks">Loading...</div>
    </div>

    <script>
        // Your Supabase credentials
        const SUPABASE_URL = 'https://your-project-id.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
        
        async function loadStats() {
            try {
                // Get total visits
                const visitsResponse = await fetch(`${SUPABASE_URL}/rest/v1/daily_stats?website_id=eq.chris-van-services&select=*`, {
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                });
                const stats = await visitsResponse.json();
                
                if (stats.length > 0) {
                    const latest = stats[0];
                    document.getElementById('totalVisits').textContent = latest.visits || 0;
                    document.getElementById('whatsappClicks').textContent = latest.whatsapp_clicks || 0;
                    document.getElementById('facebookClicks').textContent = latest.facebook_clicks || 0;
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        
        // Load stats on page load
        loadStats();
        
        // Refresh every 30 seconds
        setInterval(loadStats, 30000);
    </script>
</body>
</html>
```

## 🧪 Step 5: Test the Integration

### 5.1 Test Direct API Call
```bash
curl -X POST 'https://your-project-id.supabase.co/rest/v1/analytics' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "website_id": "chris-van-services",
    "session_id": "test-123",
    "event_type": "visit",
    "event_data": {"visits": 1, "isNewVisitor": true},
    "url": "https://test.com",
    "referrer": "https://google.com"
  }'
```

### 5.2 Test Your Website
1. **Deploy your updated website** with the new Supabase endpoint
2. **Visit your site** and check the console
3. **Check Supabase dashboard** → Table Editor → analytics table
4. **You should see new rows** appearing

## 🎯 Benefits of This Approach

- ✅ **No custom API server needed**
- ✅ **Direct database storage**
- ✅ **Built-in authentication**
- ✅ **Real-time capabilities**
- ✅ **Easy dashboard creation**
- ✅ **Automatic backups**
- ✅ **Free tier available**

## 📊 Query Examples

### Get All Data for a Website
```sql
SELECT * FROM analytics 
WHERE website_id = 'chris-van-services' 
ORDER BY created_at DESC;
```

### Get Daily Stats
```sql
SELECT * FROM daily_stats 
WHERE website_id = 'chris-van-services' 
ORDER BY date DESC 
LIMIT 30;
```

### Get Recent WhatsApp Clicks
```sql
SELECT * FROM analytics 
WHERE website_id = 'chris-van-services' 
AND event_type = 'messenger_click' 
AND event_data->>'type' = 'whatsapp'
ORDER BY created_at DESC 
LIMIT 10;
```

## 🔧 Advanced Features

### Real-time Subscriptions
```javascript
// Listen for new analytics data in real-time
const subscription = supabase
  .from('analytics')
  .on('INSERT', payload => {
    console.log('New tracking data:', payload.new);
    updateDashboard();
  })
  .subscribe();
```

### Multiple Website Support
Just change the `website_id` in your tracking script:
```html
<!-- For different websites -->
<script 
    src="https://revucapturestaging.netlify.app/simple-tracker.js"
    data-website-id="another-website-id"
    data-api-key="your-supabase-key"
    data-api-endpoint="https://your-project.supabase.co/rest/v1/analytics">
</script>
```

This approach is much simpler and gives you all the functionality you need without the complexity of a custom API server!

