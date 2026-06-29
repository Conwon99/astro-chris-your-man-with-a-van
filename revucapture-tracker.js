/**
 * RevuCapture Analytics Tracker
 * Lightweight JavaScript tracking script for website analytics
 * Version: 1.0.0
 * License: MIT
 */

(function(window, document) {
    'use strict';

    // Configuration defaults
    const DEFAULT_CONFIG = {
        apiEndpoint: 'https://api.revucapture.com/track',
        websiteId: null,
        apiKey: null,
        batchSize: 10,
        batchTimeout: 5000,
        maxRetries: 3,
        retryDelay: 1000,
        debug: false,
        respectDoNotTrack: true,
        anonymizeIP: true,
        trackClicks: true,
        trackScroll: true,
        trackForms: true,
        trackPerformance: true,
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        storageKey: 'rc_session',
        optOutKey: 'rc_opt_out'
    };

    // Session data
    let sessionData = null;
    let eventQueue = [];
    let batchTimer = null;
    let isTracking = false;
    let config = {};

    // Utility functions
    const utils = {
        // Generate unique ID
        generateId: function() {
            return 'rc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        // Get timestamp
        now: function() {
            return new Date().toISOString();
        },

        // Deep merge objects
        merge: function(target, source) {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    target[key] = target[key] || {};
                    this.merge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
            return target;
        },

        // Check if Do Not Track is enabled
        isDoNotTrack: function() {
            return navigator.doNotTrack === '1' || 
                   navigator.doNotTrack === 'yes' || 
                   navigator.msDoNotTrack === '1' ||
                   window.doNotTrack === '1';
        },

        // Get browser info
        getBrowserInfo: function() {
            const ua = navigator.userAgent;
            const browsers = {
                Chrome: /Chrome\/(\d+)/,
                Firefox: /Firefox\/(\d+)/,
                Safari: /Safari\/(\d+)/,
                Edge: /Edg\/(\d+)/,
                IE: /MSIE (\d+)/
            };

            for (const [name, regex] of Object.entries(browsers)) {
                const match = ua.match(regex);
                if (match) {
                    return { name, version: match[1] };
                }
            }
            return { name: 'Unknown', version: 'Unknown' };
        },

        // Get OS info
        getOSInfo: function() {
            const ua = navigator.userAgent;
            if (/Windows/.test(ua)) return 'Windows';
            if (/Mac/.test(ua)) return 'macOS';
            if (/Linux/.test(ua)) return 'Linux';
            if (/Android/.test(ua)) return 'Android';
            if (/iOS/.test(ua)) return 'iOS';
            return 'Unknown';
        },

        // Get device type
        getDeviceType: function() {
            const width = window.screen.width;
            const height = window.screen.height;
            const ratio = window.devicePixelRatio || 1;
            
            if (width <= 768 || (width <= 1024 && ratio > 1)) {
                return 'mobile';
            } else if (width <= 1024) {
                return 'tablet';
            }
            return 'desktop';
        },

        // Anonymize IP (simple hash)
        anonymizeIP: function(ip) {
            if (!ip) return null;
            // Simple hash function for IP anonymization
            let hash = 0;
            for (let i = 0; i < ip.length; i++) {
                const char = ip.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return Math.abs(hash).toString(36);
        },

        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // Session management
    const session = {
        init: function() {
            const stored = this.getStored();
            const now = Date.now();
            
            if (stored && (now - stored.timestamp) < config.sessionTimeout) {
                sessionData = stored;
                sessionData.lastSeen = now;
            } else {
                sessionData = {
                    id: utils.generateId(),
                    timestamp: now,
                    lastSeen: now,
                    isNew: !stored,
                    pageViews: 0,
                    events: 0
                };
            }
            
            this.store();
        },

        getStored: function() {
            try {
                const stored = localStorage.getItem(config.storageKey);
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                return null;
            }
        },

        store: function() {
            try {
                localStorage.setItem(config.storageKey, JSON.stringify(sessionData));
            } catch (e) {
                // Storage quota exceeded or disabled
            }
        },

        increment: function(type) {
            if (sessionData && sessionData[type] !== undefined) {
                sessionData[type]++;
                this.store();
            }
        }
    };

    // Event tracking
    const tracker = {
        init: function() {
            if (isTracking) return;
            isTracking = true;

            // Check opt-out status
            if (this.isOptedOut()) {
                this.log('Tracking disabled - user opted out');
                return;
            }

            // Check Do Not Track
            if (config.respectDoNotTrack && utils.isDoNotTrack()) {
                this.log('Tracking disabled - Do Not Track enabled');
                return;
            }

            // Initialize session
            session.init();

            // Start tracking
            this.trackPageView();
            this.setupEventListeners();
            this.setupPerformanceTracking();
            this.setupScrollTracking();
        },

        isOptedOut: function() {
            try {
                return localStorage.getItem(config.optOutKey) === 'true';
            } catch (e) {
                return false;
            }
        },

        optOut: function() {
            try {
                localStorage.setItem(config.optOutKey, 'true');
                this.log('User opted out of tracking');
            } catch (e) {
                this.log('Could not set opt-out status');
            }
        },

        optIn: function() {
            try {
                localStorage.removeItem(config.optOutKey);
                this.log('User opted in to tracking');
            } catch (e) {
                this.log('Could not remove opt-out status');
            }
        },

        track: function(eventType, eventData = {}) {
            if (!isTracking || this.isOptedOut()) return;

            const event = {
                type: eventType,
                timestamp: utils.now(),
                sessionId: sessionData.id,
                websiteId: config.websiteId,
                url: window.location.href,
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                ...eventData
            };

            eventQueue.push(event);
            session.increment('events');
            this.processQueue();
        },

        trackPageView: function() {
            const pageData = {
                page: {
                    url: window.location.href,
                    path: window.location.pathname,
                    title: document.title,
                    referrer: document.referrer
                },
                device: {
                    screen: {
                        width: window.screen.width,
                        height: window.screen.height,
                        pixelRatio: window.devicePixelRatio || 1
                    },
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    browser: utils.getBrowserInfo(),
                    os: utils.getOSInfo(),
                    deviceType: utils.getDeviceType(),
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                session: {
                    isNew: sessionData.isNew,
                    pageViews: sessionData.pageViews + 1,
                    events: sessionData.events
                }
            };

            session.increment('pageViews');
            this.track('page_view', pageData);
        },

        trackClick: function(element, event) {
            const clickData = {
                click: {
                    element: {
                        tagName: element.tagName,
                        id: element.id,
                        className: element.className,
                        text: element.textContent?.substring(0, 100),
                        href: element.href,
                        type: element.type
                    },
                    position: {
                        x: event.clientX,
                        y: event.clientY
                    },
                    timestamp: Date.now()
                }
            };

            this.track('click', clickData);
        },

        trackScroll: function(depth, timeSpent) {
            const scrollData = {
                scroll: {
                    depth: depth,
                    timeSpent: timeSpent,
                    timestamp: Date.now()
                }
            };

            this.track('scroll', scrollData);
        },

        trackForm: function(form, action, data = {}) {
            const formData = {
                form: {
                    action: action,
                    id: form.id,
                    className: form.className,
                    method: form.method,
                    fields: Object.keys(data).length,
                    data: config.debug ? data : null
                }
            };

            this.track('form_interaction', formData);
        },

        trackPerformance: function() {
            if (!window.performance || !config.trackPerformance) return;

            const perf = window.performance;
            const navigation = perf.getEntriesByType('navigation')[0];
            
            if (!navigation) return;

            const perfData = {
                performance: {
                    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstByte: navigation.responseStart - navigation.requestStart,
                    dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
                    tcpConnect: navigation.connectEnd - navigation.connectStart,
                    sslConnect: navigation.secureConnectionStart ? 
                        navigation.connectEnd - navigation.secureConnectionStart : null
                }
            };

            this.track('performance', perfData);
        },

        setupEventListeners: function() {
            if (!config.trackClicks) return;

            // Click tracking
            document.addEventListener('click', (event) => {
                const element = event.target;
                if (element.tagName === 'A' || element.tagName === 'BUTTON' || 
                    element.closest('button') || element.closest('a')) {
                    this.trackClick(element, event);
                }
            }, true);

            // Form tracking
            if (config.trackForms) {
                document.addEventListener('submit', (event) => {
                    const form = event.target;
                    if (form.tagName === 'FORM') {
                        const formData = new FormData(form);
                        const data = {};
                        for (const [key, value] of formData.entries()) {
                            data[key] = value;
                        }
                        this.trackForm(form, 'submit', data);
                    }
                });
            }

            // Outbound link tracking
            document.addEventListener('click', (event) => {
                const link = event.target.closest('a');
                if (link && link.href && !link.href.startsWith(window.location.origin)) {
                    this.track('outbound_click', {
                        link: {
                            url: link.href,
                            text: link.textContent?.substring(0, 100)
                        }
                    });
                }
            });
        },

        setupScrollTracking: function() {
            if (!config.trackScroll) return;

            let maxScroll = 0;
            let startTime = Date.now();
            let scrollTimer = null;

            const trackScrollDepth = utils.throttle(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollDepth = documentHeight > 0 ? Math.round((scrollTop / documentHeight) * 100) : 0;
                
                if (scrollDepth > maxScroll) {
                    maxScroll = scrollDepth;
                }

                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    const timeSpent = Date.now() - startTime;
                    if (maxScroll > 0) {
                        this.trackScroll(maxScroll, timeSpent);
                    }
                }, 1000);
            }, 100);

            window.addEventListener('scroll', trackScrollDepth);
        },

        setupPerformanceTracking: function() {
            if (document.readyState === 'complete') {
                this.trackPerformance();
            } else {
                window.addEventListener('load', () => {
                    setTimeout(() => this.trackPerformance(), 100);
                });
            }
        },

        processQueue: function() {
            if (eventQueue.length >= config.batchSize) {
                this.sendBatch();
            } else if (!batchTimer) {
                batchTimer = setTimeout(() => this.sendBatch(), config.batchTimeout);
            }
        },

        sendBatch: function() {
            if (eventQueue.length === 0) return;

            const batch = eventQueue.splice(0, config.batchSize);
            clearTimeout(batchTimer);
            batchTimer = null;

            this.sendRequest(batch, 0);
        },

        sendRequest: function(batch, retryCount) {
            const payload = {
                websiteId: config.websiteId,
                apiKey: config.apiKey,
                events: batch,
                timestamp: utils.now()
            };

            fetch(config.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': config.apiKey
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                this.log(`Batch sent successfully (${batch.length} events)`);
            })
            .catch(error => {
                this.log(`Request failed: ${error.message}`);
                
                if (retryCount < config.maxRetries) {
                    setTimeout(() => {
                        this.sendRequest(batch, retryCount + 1);
                    }, config.retryDelay * Math.pow(2, retryCount));
                } else {
                    // Store failed events for later retry
                    this.storeFailedEvents(batch);
                }
            });
        },

        storeFailedEvents: function(batch) {
            try {
                const failed = JSON.parse(localStorage.getItem('rc_failed_events') || '[]');
                failed.push(...batch);
                // Keep only last 100 events
                if (failed.length > 100) {
                    failed.splice(0, failed.length - 100);
                }
                localStorage.setItem('rc_failed_events', JSON.stringify(failed));
            } catch (e) {
                this.log('Could not store failed events');
            }
        },

        retryFailedEvents: function() {
            try {
                const failed = JSON.parse(localStorage.getItem('rc_failed_events') || '[]');
                if (failed.length > 0) {
                    this.log(`Retrying ${failed.length} failed events`);
                    eventQueue.unshift(...failed);
                    localStorage.removeItem('rc_failed_events');
                    this.processQueue();
                }
            } catch (e) {
                this.log('Could not retry failed events');
            }
        },

        log: function(message) {
            if (config.debug) {
                console.log('[RevuCapture]', message);
            }
        }
    };

    // Public API
    const RevuCapture = {
        init: function(options = {}) {
            config = utils.merge({}, DEFAULT_CONFIG);
            config = utils.merge(config, options);

            if (!config.websiteId || !config.apiKey) {
                console.error('RevuCapture: websiteId and apiKey are required');
                return;
            }

            tracker.init();
            
            // Retry failed events on initialization
            setTimeout(() => tracker.retryFailedEvents(), 2000);
        },

        track: function(eventType, eventData) {
            tracker.track(eventType, eventData);
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

        // Custom event tracking
        trackEvent: function(eventName, properties = {}) {
            tracker.track('custom_event', {
                eventName: eventName,
                properties: properties
            });
        },

        // E-commerce tracking
        trackPurchase: function(orderId, value, currency = 'USD', items = []) {
            tracker.track('purchase', {
                orderId: orderId,
                value: value,
                currency: currency,
                items: items
            });
        },

        // Goal tracking
        trackGoal: function(goalId, value = null) {
            tracker.track('goal', {
                goalId: goalId,
                value: value
            });
        }
    };

    // Auto-initialize if config is provided via data attributes
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.querySelector('script[src*="revucapture-tracker"]');
        if (script) {
            const websiteId = script.getAttribute('data-website-id');
            const apiKey = script.getAttribute('data-api-key');
            const apiEndpoint = script.getAttribute('data-api-endpoint');
            
            if (websiteId && apiKey) {
                RevuCapture.init({
                    websiteId: websiteId,
                    apiKey: apiKey,
                    apiEndpoint: apiEndpoint || DEFAULT_CONFIG.apiEndpoint
                });
            }
        }
    });

    // Expose to global scope
    window.RevuCapture = RevuCapture;

})(window, document);


