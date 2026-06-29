import { Button } from "@/components/ui/button";
import { Facebook, X } from "lucide-react";
import { trackExternalLink, trackFacebookPageClick } from "@/utils/analytics";
interface OfferBannerProps {
  onDismiss: () => void;
}

const OfferBanner = ({ onDismiss }: OfferBannerProps) => {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-[hsl(var(--sunshine-yellow))] via-[hsl(var(--primary-orange))] to-[hsl(var(--sunshine-yellow))] shadow-lg">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white">
                £5 OFF
              </span>
              <span className="hidden sm:inline text-white/90 text-sm font-medium">
                - Get £5 off your first job if you follow me on Facebook
              </span>
              <span className="sm:hidden text-white/90 text-xs font-medium">
                Follow on Facebook for £5 off
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 text-sm font-semibold"
            >
              <a
                href="https://www.facebook.com/chrisyourmanwithavankilmarnock"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackExternalLink('https://www.facebook.com/chrisyourmanwithavankilmarnock', 'Facebook');
                  trackFacebookPageClick('offer_banner');
                }}
                className="flex items-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                <span className="hidden sm:inline">Follow Now</span>
                <span className="sm:hidden">Follow</span>
              </a>
            </Button>
            
            <button
              onClick={onDismiss}
              className="p-1 hover:bg-black/10 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;


