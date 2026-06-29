# Analytics Dashboard Implementation Guide

This guide shows you how to build a real-time analytics dashboard to receive and display data from the Simple Tracker.

## 🏗️ Dashboard Architecture

### Option 1: Simple Web Dashboard (Recommended)
- **Frontend**: HTML/CSS/JavaScript
- **Backend**: Node.js/Express API
- **Database**: SQLite (simple) or PostgreSQL (production)
- **Real-time**: WebSockets or Server-Sent Events

### Option 2: Serverless Dashboard
- **Frontend**: Static HTML hosted on Netlify/Vercel
- **Backend**: Vercel Functions/AWS Lambda
- **Database**: PlanetScale/Supabase
- **Real-time**: Pusher/Ably

### Option 3: Full-Stack Framework
- **Frontend**: React/Vue.js dashboard
- **Backend**: Node.js/Express or Python/FastAPI
- **Database**: PostgreSQL/MongoDB
- **Real-time**: Socket.io

## 📊 API Endpoint Implementation

### Node.js/Express API Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./analytics.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    url TEXT,
    referrer TEXT,
    is_new_visitor BOOLEAN,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messenger_clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    messenger_type TEXT NOT NULL,
    url TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS daily_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website_id TEXT NOT NULL,
    date DATE NOT NULL,
    visits INTEGER DEFAULT 0,
    whatsapp_clicks INTEGER DEFAULT 0,
    facebook_clicks INTEGER DEFAULT 0,
    UNIQUE(website_id, date)
  )`);
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });

// API endpoint to receive tracking data
app.post('/track', (req, res) => {
  const { websiteId, apiKey, events } = req.body;

  // Validate API key (implement your own validation)
  if (!isValidApiKey(apiKey)) {
    return res.status(401).json({ success: false, message: 'Invalid API key' });
  }

  let processedCount = 0;

  events.forEach(event => {
    switch (event.type) {
      case 'visit':
        db.run(
          'INSERT INTO visits (website_id, session_id, url, referrer, is_new_visitor) VALUES (?, ?, ?, ?, ?)',
          [websiteId, event.sessionId, event.url, event.visit.referrer, event.visit.isNewVisitor],
          function(err) {
            if (err) console.error('Visit insert error:', err);
          }
        );
        processedCount++;
        break;

      case 'messenger_click':
        db.run(
          'INSERT INTO messenger_clicks (website_id, session_id, messenger_type, url) VALUES (?, ?, ?, ?)',
          [websiteId, event.sessionId, event.messenger.type, event.url],
          function(err) {
            if (err) console.error('Messenger click insert error:', err);
          }
        );
        processedCount++;
        break;
    }

    // Update daily stats
    updateDailyStats(websiteId, event);
  });

  // Send real-time update to dashboard
  broadcastUpdate(websiteId);

  res.json({ 
    success: true, 
    message: 'Events processed successfully',
    processed: processedCount 
  });
});

// Function to update daily stats
function updateDailyStats(websiteId, event) {
  const today = new Date().toISOString().split('T')[0];
  
  db.get(
    'SELECT * FROM daily_stats WHERE website_id = ? AND date = ?',
    [websiteId, today],
    (err, row) => {
      if (err) {
        console.error('Daily stats error:', err);
        return;
      }

      if (row) {
        // Update existing record
        let updateQuery = 'UPDATE daily_stats SET ';
        let params = [];

        if (event.type === 'visit') {
          updateQuery += 'visits = visits + 1 ';
        } else if (event.type === 'messenger_click') {
          if (event.messenger.type === 'whatsapp') {
            updateQuery += 'whatsapp_clicks = whatsapp_clicks + 1 ';
          } else if (event.messenger.type === 'facebook') {
            updateQuery += 'facebook_clicks = facebook_clicks + 1 ';
          }
        }

        updateQuery += 'WHERE website_id = ? AND date = ?';
        params = [websiteId, today];

        db.run(updateQuery, params);
      } else {
        // Create new record
        let visits = 0, whatsappClicks = 0, facebookClicks = 0;

        if (event.type === 'visit') {
          visits = 1;
        } else if (event.type === 'messenger_click') {
          if (event.messenger.type === 'whatsapp') {
            whatsappClicks = 1;
          } else if (event.messenger.type === 'facebook') {
            facebookClicks = 1;
          }
        }

        db.run(
          'INSERT INTO daily_stats (website_id, date, visits, whatsapp_clicks, facebook_clicks) VALUES (?, ?, ?, ?, ?)',
          [websiteId, today, visits, whatsappClicks, facebookClicks]
        );
      }
    }
  );
}

// Function to broadcast updates to dashboard
function broadcastUpdate(websiteId) {
  const stats = getCurrentStats(websiteId);
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'stats_update',
        websiteId: websiteId,
        data: stats
      }));
    }
  });
}

// Function to get current stats
function getCurrentStats(websiteId) {
  return new Promise((resolve) => {
    const today = new Date().toISOString().split('T')[0];
    
    db.get(
      'SELECT * FROM daily_stats WHERE website_id = ? AND date = ?',
      [websiteId, today],
      (err, row) => {
        if (err || !row) {
          resolve({ visits: 0, whatsappClicks: 0, facebookClicks: 0 });
        } else {
          resolve({
            visits: row.visits,
            whatsappClicks: row.whatsapp_clicks,
            facebookClicks: row.facebook_clicks
          });
        }
      }
    );
  });
}

// API endpoints for dashboard
app.get('/api/stats/:websiteId', (req, res) => {
  const { websiteId } = req.params;
  const { period = 'today' } = req.query;

  let dateFilter = '';
  let params = [websiteId];

  switch (period) {
    case 'today':
      dateFilter = 'AND date = ?';
      params.push(new Date().toISOString().split('T')[0]);
      break;
    case 'week':
      dateFilter = 'AND date >= date("now", "-7 days")';
      break;
    case 'month':
      dateFilter = 'AND date >= date("now", "-30 days")';
      break;
  }

  const query = `
    SELECT 
      SUM(visits) as total_visits,
      SUM(whatsapp_clicks) as total_whatsapp_clicks,
      SUM(facebook_clicks) as total_facebook_clicks
    FROM daily_stats 
    WHERE website_id = ? ${dateFilter}
  `;

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.json({
      visits: row.total_visits || 0,
      whatsappClicks: row.total_whatsapp_clicks || 0,
      facebookClicks: row.total_facebook_clicks || 0,
      period: period
    });
  });
});

// Get detailed stats for charts
app.get('/api/charts/:websiteId', (req, res) => {
  const { websiteId } = req.params;
  const { days = 30 } = req.query;

  const query = `
    SELECT date, visits, whatsapp_clicks, facebook_clicks
    FROM daily_stats 
    WHERE website_id = ? AND date >= date("now", "-${days} days")
    ORDER BY date ASC
  `;

  db.all(query, [websiteId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.json(rows.map(row => ({
      date: row.date,
      visits: row.visits,
      whatsappClicks: row.whatsapp_clicks,
      facebookClicks: row.facebook_clicks
    })));
  });
});

// API key validation (implement your own logic)
function isValidApiKey(apiKey) {
  // Add your API key validation logic here
  const validKeys = ['your-revucapture-api-key', 'demo-api-key-456'];
  return validKeys.includes(apiKey);
}

app.listen(port, () => {
  console.log(`Analytics API running on port ${port}`);
  console.log(`WebSocket server running on port 8080`);
});
```

## 🎨 Dashboard Frontend

### HTML Dashboard Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RevuCapture Analytics Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            color: #333;
        }

        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }

        .stat-label {
            font-size: 1.1em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .chart-container {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .controls {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #667eea;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #5a6fd8;
        }

        .btn.active {
            background-color: #764ba2;
        }

        .status {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            border-radius: 5px;
            font-weight: bold;
        }

        .status.connected {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status.disconnected {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
            .dashboard {
                padding: 10px;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>📊 RevuCapture Analytics</h1>
            <p>Real-time tracking for website visits and messenger clicks</p>
        </div>

        <div class="status" id="connectionStatus">Connecting...</div>

        <div class="controls">
            <button class="btn active" onclick="setPeriod('today')">Today</button>
            <button class="btn" onclick="setPeriod('week')">This Week</button>
            <button class="btn" onclick="setPeriod('month')">This Month</button>
            <button class="btn" onclick="refreshData()">Refresh</button>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="totalVisits">0</div>
                <div class="stat-label">Website Visits</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="whatsappClicks">0</div>
                <div class="stat-label">WhatsApp Clicks</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="facebookClicks">0</div>
                <div class="stat-label">Facebook Clicks</div>
            </div>
        </div>

        <div class="chart-container">
            <h3>📈 Daily Trends</h3>
            <canvas id="trendsChart" width="400" height="200"></canvas>
        </div>
    </div>

    <script>
        // Configuration
        const WEBSITE_ID = 'chris-van-services'; // Your website ID
        const API_BASE = 'http://localhost:3000/api';
        const WS_URL = 'ws://localhost:8080';

        // Global variables
        let currentPeriod = 'today';
        let trendsChart = null;
        let ws = null;

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', function() {
            initializeWebSocket();
            loadData();
            initializeChart();
        });

        // WebSocket connection for real-time updates
        function initializeWebSocket() {
            ws = new WebSocket(WS_URL);
            
            ws.onopen = function() {
                updateConnectionStatus(true);
                console.log('Connected to analytics server');
            };
            
            ws.onclose = function() {
                updateConnectionStatus(false);
                console.log('Disconnected from analytics server');
                // Reconnect after 5 seconds
                setTimeout(initializeWebSocket, 5000);
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'stats_update' && data.websiteId === WEBSITE_ID) {
                    updateStats(data.data);
                }
            };
            
            ws.onerror = function(error) {
                console.error('WebSocket error:', error);
                updateConnectionStatus(false);
            };
        }

        // Update connection status indicator
        function updateConnectionStatus(connected) {
            const status = document.getElementById('connectionStatus');
            if (connected) {
                status.textContent = '🟢 Connected';
                status.className = 'status connected';
            } else {
                status.textContent = '🔴 Disconnected';
                status.className = 'status disconnected';
            }
        }

        // Load data from API
        async function loadData() {
            try {
                const response = await fetch(`${API_BASE}/stats/${WEBSITE_ID}?period=${currentPeriod}`);
                const data = await response.json();
                updateStats(data);
                
                // Load chart data
                const chartResponse = await fetch(`${API_BASE}/charts/${WEBSITE_ID}?days=30`);
                const chartData = await chartResponse.json();
                updateChart(chartData);
                
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        // Update stats display
        function updateStats(data) {
            document.getElementById('totalVisits').textContent = data.visits || 0;
            document.getElementById('whatsappClicks').textContent = data.whatsappClicks || 0;
            document.getElementById('facebookClicks').textContent = data.facebookClicks || 0;
        }

        // Initialize Chart.js chart
        function initializeChart() {
            const ctx = document.getElementById('trendsChart').getContext('2d');
            
            trendsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Visits',
                        data: [],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'WhatsApp Clicks',
                        data: [],
                        borderColor: '#25D366',
                        backgroundColor: 'rgba(37, 211, 102, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Facebook Clicks',
                        data: [],
                        borderColor: '#0084FF',
                        backgroundColor: 'rgba(0, 132, 255, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
        }

        // Update chart with new data
        function updateChart(data) {
            const labels = data.map(item => new Date(item.date).toLocaleDateString());
            const visits = data.map(item => item.visits);
            const whatsappClicks = data.map(item => item.whatsappClicks);
            const facebookClicks = data.map(item => item.facebookClicks);

            trendsChart.data.labels = labels;
            trendsChart.data.datasets[0].data = visits;
            trendsChart.data.datasets[1].data = whatsappClicks;
            trendsChart.data.datasets[2].data = facebookClicks;
            trendsChart.update();
        }

        // Set time period
        function setPeriod(period) {
            currentPeriod = period;
            
            // Update button states
            document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            loadData();
        }

        // Refresh data
        function refreshData() {
            loadData();
        }

        // Auto-refresh every 30 seconds
        setInterval(loadData, 30000);
    </script>
</body>
</html>
```

## 🚀 Deployment Instructions

### 1. Local Development Setup

```bash
# Create project directory
mkdir revucapture-dashboard
cd revucapture-dashboard

# Initialize npm project
npm init -y

# Install dependencies
npm install express cors sqlite3 ws

# Create server.js (copy the API code above)
# Create dashboard.html (copy the HTML code above)

# Run the server
node server.js

# Open dashboard in browser
open dashboard.html
```

### 2. Production Deployment

#### Option A: VPS/Cloud Server
```bash
# Install PM2 for process management
npm install -g pm2

# Start the server
pm2 start server.js --name analytics-api

# Setup nginx reverse proxy
# Configure SSL certificates
# Set up domain name
```

#### Option B: Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000 8080

CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t analytics-dashboard .
docker run -p 3000:3000 -p 8080:8080 analytics-dashboard
```

### 3. Environment Configuration

Create `.env` file:
```env
PORT=3000
WS_PORT=8080
DATABASE_PATH=./analytics.db
API_KEYS=your-revucapture-api-key,demo-api-key-456
CORS_ORIGIN=https://yourdomain.com
```

## 📊 Dashboard Features

### Real-time Updates
- WebSocket connection for instant data updates
- Live stats refresh every 30 seconds
- Connection status indicator

### Time Periods
- Today's stats
- This week's stats  
- This month's stats

### Visual Charts
- Daily trends over 30 days
- Line charts for visits and messenger clicks
- Responsive design for mobile devices

### Data Storage
- SQLite database for development
- PostgreSQL for production
- Daily aggregated stats
- Individual event logging

## 🔧 Customization Options

### Add More Metrics
```javascript
// Add new event types to the API
case 'phone_call':
    // Track phone number clicks
    break;
case 'email_click':
    // Track email link clicks
    break;
```

### Custom Styling
- Modify the CSS in `dashboard.html`
- Add your brand colors and fonts
- Customize the layout and components

### Additional Charts
- Pie charts for messenger type distribution
- Bar charts for hourly activity
- Geographic maps for visitor locations

## 🛡️ Security Considerations

1. **API Key Validation**: Implement proper API key validation
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **CORS Configuration**: Configure CORS for your domain
4. **SSL/HTTPS**: Use HTTPS in production
5. **Input Validation**: Validate all incoming data
6. **Database Security**: Use prepared statements to prevent SQL injection

## 📱 Mobile Responsiveness

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🆘 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check firewall settings
   - Verify WebSocket server is running
   - Check browser console for errors

2. **API Requests Failing**
   - Verify API endpoint URL
   - Check CORS configuration
   - Validate API key

3. **Database Errors**
   - Check database file permissions
   - Verify SQLite installation
   - Check disk space

### Debug Mode

Enable debug logging in the API:
```javascript
const DEBUG = process.env.NODE_ENV === 'development';
if (DEBUG) console.log('Debug info:', data);
```

This implementation provides a complete, production-ready analytics dashboard that will receive and display data from your Simple Tracker!

