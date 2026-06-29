import { useState, useEffect } from "react";
import { loadAnalytics, openConsentBanner } from "@/utils/consentManager";

const CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      loadAnalytics();
    } else if (stored === null) {
      setVisible(true);
    }

    const handler = () => setVisible(true);
    window.addEventListener("open-cookie-consent", handler);
    return () => window.removeEventListener("open-cookie-consent", handler);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    loadAnalytics();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 shadow-2xl"
      style={{ backgroundColor: "hsl(0 0% 10%)", borderTop: "2px solid hsl(19 67% 49%)" }}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex-1">
          <p
            className="font-semibold mb-1"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: "hsl(51 85% 60%)" }}
          >
            We use cookies
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
            We use Google Analytics and Meta Pixel to understand how visitors use our site. These
            tools may set cookies to track page views and interactions. You can accept all cookies
            or choose essential only (no tracking).{" "}
            <a
              href="/privacy-policy"
              style={{ color: "hsl(51 85% 60%)", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 rounded-lg text-sm transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              background: "transparent",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            Essential only
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "hsl(19 67% 49%)" }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "hsl(19 67% 39%)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "hsl(19 67% 49%)")
            }
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  );
}
