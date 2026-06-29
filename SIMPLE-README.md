# Simple Analytics Tracker

A lightweight JavaScript tracking script that collects only 3 essential metrics for your website.

## 📊 What It Tracks

1. **Website Visits** - Each time someone visits your site
2. **WhatsApp Clicks** - Clicks on WhatsApp links/buttons  
3. **Facebook Messenger Clicks** - Clicks on Facebook Messenger links/buttons

## 🚀 Quick Setup

### 1. Basic Installation

```html
<script 
    src="https://cdn.yourdomain.com/simple-tracker.js"
    data-website-id="your-website-id"
    data-api-key="your-api-key">
</script>
```

### 2. Manual Configuration

```html
<script src="https://cdn.yourdomain.com/simple-tracker.js"></script>
<script>
SimpleTracker.init({
    websiteId: 'your-website-id',
    apiKey: 'your-api-key',
    apiEndpoint: 'https://api.revucapture.com/track', // Optional
    debug: false // Set to true for development
});
</script>
```

## 📱 Automatic Link Detection

The tracker automatically detects and counts clicks on these URL patterns:

### WhatsApp Links
- `https://wa.me/1234567890`
- `https://whatsapp.com/send?phone=1234567890`
- `https://api.whatsapp.com/send?phone=1234567890`

### Facebook Messenger Links
- `https://m.me/yourpage`
- `https://messenger.com/t/yourpage`
- `https://www.facebook.com/messages/t/yourpage`

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `websiteId` | string | **required** | Your unique website identifier |
| `apiKey` | string | **required** | Your RevuCapture API key |
| `apiEndpoint` | string | `https://api.revucapture.com/track` | Custom API endpoint |
| `debug` | boolean | `false` | Enable debug logging |
| `respectDoNotTrack` | boolean | `true` | Respect browser DNT settings |

## 📡 API Data Format

### Visit Event
```json
{
    "type": "visit",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "sessionId": "sess_1705315800000_abc123def",
    "websiteId": "your-website-id",
    "url": "https://example.com",
    "visit": {
        "visits": 1,
        "isNewVisitor": true,
        "referrer": "https://google.com",
        "userAgent": "Mozilla/5.0..."
    }
}
```

### Messenger Click Event
```json
{
    "type": "messenger_click",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "sessionId": "sess_1705315800000_abc123def",
    "websiteId": "your-website-id",
    "url": "https://example.com",
    "messenger": {
        "type": "whatsapp",
        "clicks": 1,
        "url": "https://example.com"
    }
}
```

## 🔒 Privacy Features

### Opt-out Functionality
```javascript
// Check opt-out status
if (SimpleTracker.isOptedOut()) {
    console.log('User has opted out');
}

// Allow users to opt out
SimpleTracker.optOut();

// Allow users to opt back in
SimpleTracker.optIn();
```

### GDPR Compliance
```html
<div class="privacy-notice">
    <p>We track visits and messenger clicks to improve our service.</p>
    <button onclick="SimpleTracker.optOut()">Opt Out</button>
</div>
```

## 🎯 Manual Tracking

If you need to manually track clicks on custom elements:

```javascript
// Manually track WhatsApp click
SimpleTracker.trackWhatsAppClick();

// Manually track Facebook Messenger click
SimpleTracker.trackFacebookClick();
```

## 📈 Get Current Stats

```javascript
const stats = SimpleTracker.getStats();
console.log(stats);
// Output: {
//   visits: 5,
//   whatsappClicks: 3,
//   facebookClicks: 2,
//   isOptedOut: false
// }
```

## 🧪 Testing

### Debug Mode
```javascript
SimpleTracker.init({
    websiteId: 'test-website',
    apiKey: 'test-key',
    debug: true
});
```

### Test Your Implementation
1. Open `simple-example.html` in your browser
2. Click the messenger buttons
3. Check the browser console for debug messages
4. View the stats panel for real-time updates

## 📦 File Size

- **Uncompressed**: ~8KB
- **Gzipped**: ~3KB
- **Dependencies**: None
- **Browser Support**: All modern browsers

## 🔧 Advanced Usage

### Custom API Endpoint
```javascript
SimpleTracker.init({
    websiteId: 'your-website-id',
    apiKey: 'your-api-key',
    apiEndpoint: 'https://your-api.com/track'
});
```

### Session Management
- Visits are counted per 24-hour session
- Session data is stored locally in localStorage
- Failed events are stored locally and retried automatically

## 🚨 Error Handling

The tracker includes automatic error handling:
- Failed API requests are stored locally
- Automatic retry of failed events
- Graceful degradation if localStorage is unavailable
- Respects Do Not Track browser settings

## 📝 Example Implementation

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
    <script 
        src="simple-tracker.js"
        data-website-id="my-website-123"
        data-api-key="my-api-key-456">
    </script>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <!-- WhatsApp contact button -->
    <a href="https://wa.me/1234567890?text=Hello" target="_blank">
        📱 Contact us on WhatsApp
    </a>
    
    <!-- Facebook Messenger contact button -->
    <a href="https://m.me/mypage" target="_blank">
        💬 Contact us on Messenger
    </a>
    
    <script>
        // Optional: Get current stats
        setTimeout(() => {
            const stats = SimpleTracker.getStats();
            console.log('Current stats:', stats);
        }, 2000);
    </script>
</body>
</html>
```

## 🆘 Troubleshooting

### Common Issues

1. **Events not sending**
   - Check browser console for errors
   - Verify API endpoint is accessible
   - Ensure API key is correct

2. **Links not being tracked**
   - Make sure links use supported URL patterns
   - Check that links are actual `<a>` tags with `href` attributes
   - Verify links are not blocked by ad blockers

3. **Stats not updating**
   - Check if user has opted out
   - Verify localStorage is available
   - Enable debug mode to see tracking events

### Debug Checklist

- [ ] Script loads without errors
- [ ] API endpoint is accessible
- [ ] API key is valid
- [ ] Events appear in browser console (debug mode)
- [ ] Network requests are being sent
- [ ] API responds with success

## 📄 License

MIT License - Free to use and modify

---

**Perfect for simple analytics needs with minimal privacy impact!**

