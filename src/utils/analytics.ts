type GaLike = (
  command: string,
  eventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GaLike;
    dataLayer?: unknown[];
  }
}

export function trackPageView(pathname: string, title?: string): void {
  try {
    if (typeof window === "undefined") return;

    // Google Analytics 4 via gtag.js
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: title ?? document.title,
      });
      return;
    }

    // Fallback: push to dataLayer for GTM if present
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
        page_title: title ?? document.title,
      });
    }
  } catch {
    // Swallow errors to avoid breaking navigation
  }
}

export function trackPhoneCall(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "phone_call", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "phone_call",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackNavigation(sectionId: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "navigation_click", {
        section_id: sectionId,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "navigation_click",
        section_id: sectionId,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackQuoteRequest(source: string, services: string[]): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "quote_request", {
        source: source,
        services: services,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "quote_request",
        source: source,
        services: services,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackWhatsAppClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    // Always push to dataLayer first (works even if gtag not loaded yet)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "whatsapp_click",
        source: source,
        cta_type: "whatsapp",
      });
      window.dataLayer.push({
        event: "whatsapp_button_click",
        source: source,
        cta_type: "whatsapp",
      });
    }

    // Also use gtag if available
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        source: source,
        cta_type: "whatsapp",
      });
      window.gtag("event", "whatsapp_button_click", {
        source: source,
        cta_type: "whatsapp",
      });
    }
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error tracking WhatsApp click:", error);
    }
  }
}

export function trackWhatsAppMessage(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_message", {
        source: source,
      });
      window.gtag("event", "whatsapp_send", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "whatsapp_message",
        source: source,
      });
      window.dataLayer.push({
        event: "whatsapp_send",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFacebookMessengerClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    // Always push to dataLayer first (works even if gtag not loaded yet)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "facebook_messenger_click",
        source: source,
        cta_type: "facebook_messenger",
      });
    }

    // Also use gtag if available
    if (typeof window.gtag === "function") {
      window.gtag("event", "facebook_messenger_click", {
        source: source,
        cta_type: "facebook_messenger",
      });
    }
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error tracking Facebook Messenger click:", error);
    }
  }
}

export function trackFacebookPageClick(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "facebook_page_click", {
        source: source,
      });
      window.gtag("event", "facebook_page_button_click", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "facebook_page_click",
        source: source,
      });
      window.dataLayer.push({
        event: "facebook_page_button_click",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFacebookMessage(source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "facebook_message", {
        source: source,
      });
      window.gtag("event", "messenger_message", {
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "facebook_message",
        source: source,
      });
      window.dataLayer.push({
        event: "messenger_message",
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

// Legacy function - keeping for backwards compatibility but marking as deprecated
export function trackMessenger(source: string): void {
  // Default to WhatsApp tracking for backwards compatibility
  trackWhatsAppClick(source);
}

export function trackFormStart(formName: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "form_start", {
        form_name: formName,
      });
      window.gtag("event", "form_begin", {
        form_name: formName,
      });
      window.gtag("event", "form_submission_start", {
        form_name: formName,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "form_start",
        form_name: formName,
      });
      window.dataLayer.push({
        event: "form_begin",
        form_name: formName,
      });
      window.dataLayer.push({
        event: "form_submission_start",
        form_name: formName,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackFormSubmit(formName: string, formData?: Record<string, unknown>): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "form_submit", {
        form_name: formName,
        form_data: formData,
      });
      window.gtag("event", "form_submission", {
        form_name: formName,
        form_data: formData,
      });
      window.gtag("event", "submit_form", {
        form_name: formName,
        form_data: formData,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "form_submit",
        form_name: formName,
        form_data: formData,
      });
      window.dataLayer.push({
        event: "form_submission",
        form_name: formName,
        form_data: formData,
      });
      window.dataLayer.push({
        event: "submit_form",
        form_name: formName,
        form_data: formData,
      });
    }
  } catch {
    // Swallow errors
  }
}

// Legacy function - keeping for backwards compatibility
export function trackFormInteraction(action: string, formData?: Record<string, unknown>): void {
  // Map to new form_submit event
  if (action === "submit_success" || action === "submit_error") {
    trackFormSubmit("quote_form", formData);
  }
}

export function trackServiceClick(serviceTitle: string, source: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "service_click", {
        service_title: serviceTitle,
        source: source,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "service_click",
        service_title: serviceTitle,
        source: source,
      });
    }
  } catch {
    // Swallow errors
  }
}

export function trackExternalLink(url: string, linkText: string): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof window.gtag === "function") {
      window.gtag("event", "external_link_click", {
        link_url: url,
        link_text: linkText,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "external_link_click",
        link_url: url,
        link_text: linkText,
      });
    }
  } catch {
    // Swallow errors
  }
}

