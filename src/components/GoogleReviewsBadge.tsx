import { Star } from "lucide-react";
import { trackNavigation } from "@/utils/analytics";

const GOOGLE_REVIEWS_URL = "https://g.page/r/CTXFEt51p7p3EBM";

const GoogleGLogo = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg className={`flex-shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

interface GoogleReviewsBadgeProps {
  className?: string;
  reviewCount?: number;
  goldStars?: boolean;
  compact?: boolean;
}

const GoogleReviewsBadge = ({
  className = "",
  reviewCount = 100,
  goldStars = false,
  compact = false,
}: GoogleReviewsBadgeProps) => {
  const handleClick = () => {
    trackNavigation("google-reviews-badge");
    window.open(GOOGLE_REVIEWS_URL, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 sm:gap-3 group ${className}`}
      aria-label={`${reviewCount} five-star Google reviews`}
    >
      <GoogleGLogo className={compact ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9"} />
      <div className="text-left">
        <p
          className={`${
            compact ? "text-sm" : "text-sm sm:text-base"
          } text-white/70 font-medium leading-tight group-hover:text-white/90 transition-colors`}
        >
          {reviewCount} five-star reviews
        </p>
        <div className="flex items-center gap-0.5 mt-0.5 sm:mt-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`${compact ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : "w-4 h-4 sm:w-5 sm:h-5"} ${
                goldStars
                  ? "fill-[hsl(var(--sunshine-yellow))] text-[hsl(var(--sunshine-yellow))]"
                  : "fill-[#4B7BFF] text-[#4B7BFF]"
              }`}
            />
          ))}
        </div>
      </div>
    </button>
  );
};

export default GoogleReviewsBadge;
