# RevuCapture Analytics Tracker

A lightweight, privacy-focused JavaScript tracking script for real-time website analytics. Built for the RevuCapture platform to provide comprehensive visitor insights with minimal performance impact.

## 🚀 Features

### Core Tracking
- **Page Views**: Automatic tracking with URL, referrer, and user agent
- **Click Events**: Button, link, and interactive element tracking
- **Scroll Analytics**: Depth percentage and time spent on page
- **Session Management**: Unique session IDs with new/returning visitor detection
- **Form Interactions**: Form submissions and field-level tracking

### Device & Performance
- **Device Detection**: Browser, OS, screen resolution, device type
- **Performance Metrics**: Page load times, DOM ready, first byte
- **Geographic Data**: Country/city detection (when available)
- **Outbound Links**: External link click tracking

### Privacy & Compliance
- **GDPR Compliant**: Built-in opt-out functionality
- **Do Not Track**: Respects browser DNT settings
- **IP Anonymization**: Optional IP address hashing
- **Data Minimization**: Only collects necessary data

### Performance & Reliability
- **Lightweight**: < 15KB uncompressed, ~5KB gzipped
- **Batched Requests**: Reduces server load with intelligent batching
- **Offline Support**: Failed events stored locally and retried
- **Retry Logic**: Automatic retry with exponential backoff
- **Zero Dependencies**: No external libraries required

## 📦 Files

- `revucapture-tracker.js` - Main tracking script (development version)
- `example.html` - Complete demo page with all features
- `INSTALLATION.md` - Detailed installation and configuration guide
- `README.md` - This file

## 🛠 Quick Start

### 1. Basic Installation

```html
<script 
    src="https://cdn.yourdomain.com/revucapture-tracker.js"
    data-website-id="your-website-id"
    data-api-key="your-api-key">
</script>
```

### 2. Manual Configuration

```html
<script src="https://cdn.yourdomain.com/revucapture-tracker.js"></script>
<script>
RevuCapture.init({
    websiteId: 'your-website-id',
    apiKey: 'your-api-key',
    debug: true // Enable for development
});
</script>
```

### 3. Custom Event Tracking

```javascript
// Track custom events
RevuCapture.trackEvent('button_clicked', {
    buttonName: 'signup',
    location: 'header'
});

// Track purchases
RevuCapture.trackPurchase('order-123', 99.99, 'USD', [
    { id: 'product-1', name: 'Widget', price: 99.99, quantity: 2 }
]);

// Track goals
RevuCapture.trackGoal('newsletter_signup', 5.00);
```

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `websiteId` | string | **required** | Your unique website identifier |
| `apiKey` | string | **required** | Your RevuCapture API key |
| `apiEndpoint` | string | `https://api.revucapture.com/track` | Custom API endpoint |
| `batchSize` | number | `10` | Events per batch |
| `batchTimeout` | number | `5000` | Batch timeout in ms |
| `debug` | boolean | `false` | Enable debug logging |
| `respectDoNotTrack` | boolean | `true` | Respect DNT headers |
| `trackClicks` | boolean | `true` | Track click events |
| `trackScroll` | boolean | `true` | Track scroll behavior |
| `trackForms` | boolean | `true` | Track form interactions |
| `trackPerformance` | boolean | `true` | Track performance metrics |

## 📊 Data Structure

### Page View Event
```json
{
    "type": "page_view",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "sessionId": "rc_1705315800000_abc123def",
    "url": "https://example.com/page",
    "referrer": "https://google.com",
    "page": {
        "url": "https://example.com/page",
        "path": "/page",
        "title": "Page Title"
    },
    "device": {
        "screen": { "width": 1920, "height": 1080 },
        "browser": { "name": "Chrome", "version": "120" },
        "os": "Windows",
        "deviceType": "desktop",
        "language": "en-US",
        "timezone": "America/New_York"
    }
}
```

### Click Event
```json
{
    "type": "click",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "sessionId": "rc_1705315800000_abc123def",
    "click": {
        "element": {
            "tagName": "BUTTON",
            "id": "signup-btn",
            "className": "btn-primary",
            "text": "Sign Up Now"
        },
        "position": { "x": 150, "y": 300 }
    }
}
```

## 🔒 Privacy Features

### Opt-out Functionality
```javascript
// Check opt-out status
if (RevuCapture.isOptedOut()) {
    console.log('User has opted out');
}

// Allow users to opt out
RevuCapture.optOut();

// Allow users to opt back in
RevuCapture.optIn();
```

### GDPR Compliance
```html
<div class="privacy-notice">
    <p>We use analytics to improve our website.</p>
    <button onclick="RevuCapture.optOut()">Opt Out</button>
</div>
```

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Internet Explorer** 11 (limited functionality)

## 🚀 Performance

- **File Size**: ~15KB uncompressed, ~5KB gzipped
- **Memory Usage**: Minimal impact with efficient event batching
- **Network**: Batched requests reduce server load by up to 90%
- **Load Time**: < 1ms initialization overhead
- **CPU Usage**: Negligible impact with throttled scroll tracking

## 🧪 Testing

### Debug Mode
```javascript
RevuCapture.init({
    websiteId: 'test-website',
    apiKey: 'test-key',
    debug: true
});
```

### Local Testing
1. Open `example.html` in your browser
2. Open Developer Tools → Console
3. Interact with the page to see tracking events
4. Check the debug panel for real-time information

## 📡 API Integration

### Request Format
```javascript
POST https://api.revucapture.com/track
Content-Type: application/json
X-API-Key: your-api-key

{
    "websiteId": "your-website-id",
    "apiKey": "your-api-key",
    "events": [...],
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Response Format
```json
{
    "success": true,
    "message": "Events processed successfully",
    "processed": 5
}
```

## 🔧 Development

### Local Development
1. Clone or download the files
2. Open `example.html` in a web browser
3. Modify `revucapture-tracker.js` as needed
4. Test changes in the browser console

### Production Deployment
1. Upload `revucapture-tracker.js` to your CDN
2. Update the script src URL in your HTML
3. Configure with your production API endpoint
4. Test with `debug: false`

## 📝 Event Types

| Event Type | Description | Automatic |
|------------|-------------|-----------|
| `page_view` | Page loads and navigation | ✅ |
| `click` | Button and link clicks | ✅ |
| `scroll` | Scroll depth and time | ✅ |
| `form_interaction` | Form submissions | ✅ |
| `performance` | Page load metrics | ✅ |
| `outbound_click` | External link clicks | ✅ |
| `custom_event` | User-defined events | ❌ |
| `purchase` | E-commerce transactions | ❌ |
| `goal` | Conversion goals | ❌ |

## 🆘 Troubleshooting

### Common Issues

1. **Events not sending**
   - Check browser console for errors
   - Verify API endpoint is accessible
   - Ensure API key is correct

2. **Debug mode not working**
   - Make sure `debug: true` is set in config
   - Check browser console for log messages

3. **Privacy compliance**
   - Implement opt-out functionality
   - Add privacy notice to your site
   - Test opt-out/opt-in flow

### Debug Checklist

- [ ] Script loads without errors
- [ ] API endpoint is accessible
- [ ] API key is valid
- [ ] Events appear in browser console (debug mode)
- [ ] Network requests are being sent
- [ ] API responds with success

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Support

For technical support, feature requests, or bug reports:
- Check the troubleshooting section above
- Review the installation guide
- Contact the RevuCapture team

---

**Built with ❤️ for the RevuCapture platform**