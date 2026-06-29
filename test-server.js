import express from 'express';
import cors from 'cors';
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
