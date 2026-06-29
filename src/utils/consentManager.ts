const CONSENT_KEY = "cookie_consent";

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function loadAnalytics(): void {
  if (typeof window === "undefined") return;
  if ((window as Window & { __analyticsLoaded?: boolean }).__analyticsLoaded) return;
  (window as Window & { __analyticsLoaded?: boolean }).__analyticsLoaded = true;

  // Initialize gtag with arguments object (required by GA4)
  const w = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments as unknown);
  };

  w.gtag("js", new Date());
  w.gtag("config", "G-V7YSJ55C9T");
  w.gtag("config", "G-L1XB9GKZ7E");

  const ga1 = document.createElement("script");
  ga1.async = true;
  ga1.src = "https://www.googletagmanager.com/gtag/js?id=G-V7YSJ55C9T";
  document.head.appendChild(ga1);

  const ga2 = document.createElement("script");
  ga2.async = true;
  ga2.src = "https://www.googletagmanager.com/gtag/js?id=G-L1XB9GKZ7E";
  document.head.appendChild(ga2);

  // Meta Pixel
  const fbScript = document.createElement("script");
  fbScript.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','24850345264644281');fbq('track','PageView');`;
  document.head.appendChild(fbScript);
}

export function openConsentBanner(): void {
  window.dispatchEvent(new Event("open-cookie-consent"));
}
