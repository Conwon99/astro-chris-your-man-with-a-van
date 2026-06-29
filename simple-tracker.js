/**
 * Simple Analytics Tracker - Direct Supabase Integration
 * Tracks: Website visits, WhatsApp clicks, Facebook Messenger clicks
 * Version: 2.0.0
 */

(function(window, document) {
    'use strict';

    // Configuration
    const CONFIG = {
        websiteId: null,
        debug: false,
        respectDoNotTrack: true,
        storageKey: 'simple_session',
        optOutKey: 'simple_opt_out',
        // Supabase configuration
        supabaseUrl: 'https://aeiyfpwephaxussdlcgb.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaXlmcHdlcGhheHVzc2RsY2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MTU4OTIsImV4cCI6MjA3Mjk5MTg5Mn0.WPkTaSUVB0az0aTEcdKsRt3c4Vvg-SfcOoNWtUX_nSM'
    };

    let sessionData = null;

    // Utility functions
    const utils = {
        generateId: function() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        now: function() {
            return new Date().toISOString();
        },

        isDoNotTrack: function() {
            return navigator.doNotTrack === '1' || 
                   navigator.doNotTrack === 'yes' || 
                   navigator.msDoNotTrack === '1' ||
                   window.doNotTrack === '1';
        },

        log: function(message) {
            if (CONFIG.debug) {
                console.log('[SimpleTracker]', message);
            }
        }
    };

    // Session management
    const session = {
        init: function() {
            const stored = this.getStored();
            const now = Date.now();
            
            if (stored && (now - stored.lastVisit) < (24 * 60 * 60 * 1000)) { // 24 hours
                sessionData = stored;
                sessionData.lastVisit = now;
            } else {
                sessionData = {
                    id: utils.generateId(),
                    firstVisit: now,
                    lastVisit: now,
                    visits: stored ? stored.visits + 1 : 1
                };
            }
            
            this.store();
        },

        getStored: function() {
            try {
                const stored = localStorage.getItem(CONFIG.storageKey);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                return null;
            }
        },

        store: function() {
            try {
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(sessionData));
            } catch (e) {
                // Storage not available
            }
        }
    };

    // Supabase integration
    const supabase = {
        sendEvent: async function(event) {
            const headers = {
                'apikey': CONFIG.supabaseKey,
                'Authorization': `Bearer ${CONFIG.supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            };

            try {
                // Prepare data for analytics table
                const analyticsData = {
                    website_id: CONFIG.websiteId,
                    session_id: event.sessionId,
                    event_type: event.type,
                    event_data: event,
                    url: event.url,
                    referrer: event.visit?.referrer || document.referrer || '',
                    user_agent: event.visit?.userAgent || navigator.userAgent.substring(0, 200)
                };
                
                await fetch(`${CONFIG.supabaseUrl}/rest/v1/analytics`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(analyticsData)
                });

                utils.log(`Event sent to Supabase: ${event.type}`);
                
            } catch (error) {
                utils.log(`Failed to send event: ${error.message}`);
            }
        }
    };

    // Main tracker
    const tracker = {
        init: function() {
            // Check opt-out status
            if (this.isOptedOut()) {
                utils.log('Tracking disabled - user opted out');
                return;
            }

            // Check Do Not Track
            if (CONFIG.respectDoNotTrack && utils.isDoNotTrack()) {
                utils.log('Tracking disabled - Do Not Track enabled');
                return;
            }

            // Initialize session
            session.init();

            // Track website visit
            this.trackVisit();
            
            // Setup click tracking
            this.setupClickTracking();
        },

        isOptedOut: function() {
            try {
                return localStorage.getItem(CONFIG.optOutKey) === 'true';
            } catch (e) {
                return false;
            }
        },

        optOut: function() {
            try {
                localStorage.setItem(CONFIG.optOutKey, 'true');
                utils.log('User opted out of tracking');
            } catch (e) {
                utils.log('Could not set opt-out status');
            }
        },

        optIn: function() {
            try {
                localStorage.removeItem(CONFIG.optOutKey);
                utils.log('User opted in to tracking');
            } catch (e) {
                utils.log('Could not remove opt-out status');
            }
        },

        track: function(eventType, eventData = {}) {
            if (this.isOptedOut()) return;

            const event = {
                type: eventType,
                timestamp: utils.now(),
                sessionId: sessionData.id,
                url: window.location.href,
                ...eventData
            };

            supabase.sendEvent(event);
        },

        trackVisit: function() {
            const visitData = {
                visit: {
                    visits: sessionData.visits,
                    isNewVisitor: sessionData.visits === 1,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent.substring(0, 200)
                }
            };

            this.track('visit', visitData);
            utils.log(`Visit tracked: #${sessionData.visits}`);
        },

        trackWhatsAppClick: function() {
            const clickData = {
                messenger: {
                    type: 'whatsapp',
                    url: window.location.href
                }
            };

            this.track('whatsapp_click', clickData);
            utils.log('WhatsApp click tracked');
        },

        trackFacebookClick: function() {
            const clickData = {
                messenger: {
                    type: 'facebook',
                    url: window.location.href
                }
            };

            this.track('facebook_messenger_click', clickData);
            utils.log('Facebook Messenger click tracked');
        },

        setupClickTracking: function() {
            // Listen for Google Analytics events via dataLayer
            const originalPush = window.dataLayer?.push;
            if (originalPush) {
                window.dataLayer.push = function(data) {
                    // Call original push first
                    originalPush.call(this, data);
                    
                    // Listen for messenger_click events from Google Analytics
                    if (data.event === 'messenger_click') {
                        utils.log('Google Analytics messenger_click detected:', data);
                        
                        // Determine if it's WhatsApp or Facebook Messenger based on source
                        const source = data.source?.toLowerCase() || '';
                        if (source.includes('whatsapp')) {
                            utils.log('WhatsApp click from GA detected!');
                            this.trackWhatsAppClick();
                        } else if (source.includes('facebook') || source.includes('messenger')) {
                            utils.log('Facebook Messenger click from GA detected!');
                            this.trackFacebookClick();
                        } else {
                            // Default to Facebook Messenger if unclear
                            utils.log('Messenger click from GA detected (defaulting to Facebook)!');
                            this.trackFacebookClick();
                        }
                    }
                    
                    // Also listen for specific WhatsApp events if they exist
                    if (data.event === 'whatsapp_click') {
                        utils.log('WhatsApp click event from GA detected!');
                        this.trackWhatsAppClick();
                    }
                    
                    // Listen for Facebook Messenger specific events
                    if (data.event === 'facebook_messenger_click') {
                        utils.log('Facebook Messenger click event from GA detected!');
                        this.trackFacebookClick();
                    }
                }.bind(this);
            }

            // Fallback: Listen for direct link clicks
            document.addEventListener('click', (event) => {
                const element = event.target;
                const href = element.href || element.closest('a')?.href;
                
                // Check for WhatsApp links
                if (href && (href.includes('wa.me') || href.includes('whatsapp.com') || href.includes('api.whatsapp.com'))) {
                    this.trackWhatsAppClick();
                }
                
                // Check for Facebook Messenger links
                if (href && (href.includes('m.me') || href.includes('messenger.com') || href.includes('facebook.com/messages'))) {
                    this.trackFacebookClick();
                }
            }, true);
        },

        // Get current stats
        getStats: function() {
            return {
                visits: sessionData.visits,
                isOptedOut: this.isOptedOut()
            };
        }
    };

    // Public API
    const SimpleTracker = {
        init: function(options = {}) {
            // Merge config
            Object.assign(CONFIG, options);

            if (!CONFIG.websiteId) {
                console.error('SimpleTracker: websiteId is required');
                return;
            }

            tracker.init();
        },

        track: function(eventType, eventData = {}) {
            tracker.track(eventType, eventData);
        },

        trackWhatsAppClick: function() {
            tracker.trackWhatsAppClick();
        },

        trackFacebookClick: function() {
            tracker.trackFacebookClick();
        },

        optOut: function() {
            tracker.optOut();
        },

        optIn: function() {
            tracker.optIn();
        },

        isOptedOut: function() {
            return tracker.isOptedOut();
        },

        getStats: function() {
            return tracker.getStats();
        }
    };

    // Auto-initialize if config is provided via data attributes
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.querySelector('script[src*="simple-tracker"]');
        if (script) {
            const websiteId = script.getAttribute('data-website-id');
            
            if (websiteId) {
                SimpleTracker.init({
                    websiteId: websiteId,
                    debug: true // Enable for testing
                });
            }
        }
    });

    // Expose to global scope
    window.SimpleTracker = SimpleTracker;

})(window, document);