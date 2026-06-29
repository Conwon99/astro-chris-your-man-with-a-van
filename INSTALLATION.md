# RevuCapture Analytics Tracker - Installation Guide

## Quick Start

### 1. Basic Installation

Add this script tag to your website's `<head>` section:

```html
<script 
    src="https://cdn.yourdomain.com/revucapture-tracker.js"
    data-website-id="your-website-id"
    data-api-key="your-api-key">
</script>
```

### 2. Manual Configuration

If you prefer manual initialization:

```html
<script src="https://cdn.yourdomain.com/revucapture-tracker.js"></script>
<script>
RevuCapture.init({
    websiteId: 'your-website-id',
    apiKey: 'your-api-key',
    apiEndpoint: 'https://api.revucapture.com/track', // Optional
    debug: false, // Set to true for development
    respectDoNotTrack: true,
    trackClicks: true,
    trackScroll: true,
    trackForms: true,
    trackPerformance: true
});
</script>
```

## Configuration Options

### Required Parameters

- **websiteId** (string): Your unique website identifier
- **apiKey** (string): Your RevuCapture API key for authentication

### Optional Parameters

- **apiEndpoint** (string): Custom API endpoint (default: `https://api.revucapture.com/track`)
- **batchSize** (number): Number of events to batch before sending (default: 10)
- **batchTimeout** (number): Time in ms to wait before sending batch (default: 5000)
- **maxRetries** (number): Maximum retry attempts for failed requests (default: 3)
- **retryDelay** (number): Initial delay between retries in ms (default: 1000)
- **debug** (boolean): Enable debug logging (default: false)
- **respectDoNotTrack** (boolean): Respect browser Do Not Track setting (default: true)
- **anonymizeIP** (boolean): Anonymize IP addresses (default: true)
- **trackClicks** (boolean): Track click events (default: true)
- **trackScroll** (boolean): Track scroll depth and time (default: true)
- **trackForms** (boolean): Track form interactions (default: true)
- **trackPerformance** (boolean): Track page performance metrics (default: true)
- **sessionTimeout** (number): Session timeout in milliseconds (default: 1800000 = 30 minutes)

## Advanced Usage

### Custom Event Tracking

```javascript
// Track custom events
RevuCapture.trackEvent('button_clicked', {
    buttonName: 'signup',
    location: 'header'
});

// Track e-commerce purchases
RevuCapture.trackPurchase('order-123', 99.99, 'USD', [
    { id: 'product-1', name: 'Widget', price: 49.99, quantity: 2 }
]);

// Track conversion goals
RevuCapture.trackGoal('newsletter_signup', 5.00);
```

### Privacy Controls

```javascript
// Check if user has opted out
if (RevuCapture.isOptedOut()) {
    console.log('User has opted out of tracking');
}

// Allow users to opt out
document.getElementById('opt-out-btn').addEventListener('click', function() {
    RevuCapture.optOut();
    alert('You have opted out of analytics tracking.');
});

// Allow users to opt back in
document.getElementById('opt-in-btn').addEventListener('click', function() {
    RevuCapture.optIn();
    alert('Analytics tracking has been re-enabled.');
});
```

### GDPR Compliance

Add a privacy notice with opt-out functionality:

```html
<div id="privacy-notice" style="display: none;">
    <p>We use analytics to improve our website. 
       <a href="#" onclick="RevuCapture.optOut(); this.parentElement.style.display='none'; return false;">
           Opt out
       </a>
    </p>
</div>
```

## Data Collected

### Automatic Tracking

The script automatically collects:

- **Page Views**: URL, title, referrer, timestamp
- **Click Events**: Element details, position, timestamp
- **Scroll Behavior**: Depth percentage, time spent
- **Form Interactions**: Form submissions and field data
- **Performance Metrics**: Load times, DOM ready time, etc.
- **Device Information**: Browser, OS, screen resolution, device type
- **Session Data**: Unique session ID, new/returning visitor status

### Event Types

- `page_view`: Automatic page view tracking
- `click`: Button and link clicks
- `scroll`: Scroll depth and time tracking
- `form_interaction`: Form submissions
- `performance`: Page load performance metrics
- `outbound_click`: External link clicks
- `custom_event`: User-defined events
- `purchase`: E-commerce transactions
- `goal`: Conversion goal completions

## API Integration

### Request Format

Events are sent to your API endpoint as POST requests:

```json
{
    "websiteId": "your-website-id",
    "apiKey": "your-api-key",
    "events": [
        {
            "type": "page_view",
            "timestamp": "2024-01-15T10:30:00.000Z",
            "sessionId": "rc_1705315800000_abc123def",
            "url": "https://example.com/page",
            "referrer": "https://google.com",
            "userAgent": "Mozilla/5.0...",
            "page": {
                "url": "https://example.com/page",
                "path": "/page",
                "title": "Page Title"
            },
            "device": {
                "screen": {
                    "width": 1920,
                    "height": 1080,
                    "pixelRatio": 1
                },
                "browser": {
                    "name": "Chrome",
                    "version": "120"
                },
                "os": "Windows",
                "deviceType": "desktop",
                "language": "en-US",
                "timezone": "America/New_York"
            }
        }
    ],
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Response Format

Your API should respond with:

```json
{
    "success": true,
    "message": "Events processed successfully",
    "processed": 1
}
```

## Performance Considerations

- **File Size**: ~15KB uncompressed, ~5KB gzipped
- **Memory Usage**: Minimal impact with event batching
- **Network**: Batched requests reduce server load
- **Offline Support**: Failed events stored locally and retried

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11 (limited functionality)

## Troubleshooting

### Debug Mode

Enable debug mode to see tracking events in console:

```javascript
RevuCapture.init({
    websiteId: 'your-website-id',
    apiKey: 'your-api-key',
    debug: true
});
```

### Common Issues

1. **Events not sending**: Check browser console for errors
2. **API errors**: Verify API endpoint and authentication
3. **Privacy compliance**: Ensure opt-out functionality is implemented
4. **Performance impact**: Monitor page load times after implementation

### Testing

Test your implementation:

```javascript
// Test custom event
RevuCapture.trackEvent('test_event', { test: true });

// Check if tracking is working
console.log('Tracking status:', RevuCapture.isOptedOut() ? 'Disabled' : 'Enabled');
```

## Security Notes

- API keys should be kept secure and not exposed in client-side code
- Consider using environment-specific keys for development/production
- Implement rate limiting on your API endpoint
- Validate and sanitize all incoming data

## Support

For technical support or feature requests, contact the RevuCapture team or refer to the API documentation.


