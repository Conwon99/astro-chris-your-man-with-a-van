import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import LazyImage from "@/components/LazyImage";
import { trackPhoneCall, trackNavigation, trackQuoteRequest } from "@/utils/analytics";
import { useScrollDetection } from "@/hooks/use-scroll-detection";
import { navigate, getCurrentPath } from "@/utils/navigation";
import OfferBanner from "./OfferBanner";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  const isScrolled = useScrollDetection(100); // Detect scroll past 100px

  useEffect(() => {
    setIsHomePage(getCurrentPath() === '/');
    
    // Update on navigation
    const handlePopState = () => {
      setIsHomePage(getCurrentPath() === '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCallClick = () => {
    trackPhoneCall('navigation');
    window.location.href = "tel:+447735852822";
  };

  const scrollToSection = (sectionId: string) => {
    trackNavigation(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('navigation_button', []);
    navigate('/contact');
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, item: { label: string; sectionId?: string; path?: string }) => {
    trackNavigation(item.label.toLowerCase());
    setIsMenuOpen(false);
    
    if (item.path) {
      // Navigate to a route
      if (item.path === '/' && isHomePage && item.sectionId) {
        // If already on homepage and clicking Home, scroll to top/hero
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Let the anchor tag handle navigation naturally
        // navigate() will be called by the href
      }
    } else if (item.sectionId) {
      if (isHomePage) {
        // On homepage, scroll to section
        e.preventDefault();
        scrollToSection(item.sectionId);
      } else {
        // Not on homepage, navigate to homepage with hash
        // The anchor tag will handle the navigation, then we'll scroll after load
        setTimeout(() => {
          const element = document.getElementById(item.sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const getNavigationHref = (item: { label: string; sectionId?: string; path?: string }) => {
    if (item.path) {
      return item.path;
    } else if (item.sectionId) {
      return `/#${item.sectionId}`;
    }
    return '#';
  };

  const navItems = [
    { label: "Home", sectionId: "hero", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Locations", path: "/locations" },
    { label: "Reviews", sectionId: "reviews" },
    { label: "FAQ", sectionId: "faq" },
    { label: "Contact", path: "/contact" },
    { label: "Jobs", path: "/jobs" },
  ];

  return (
    <>
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="cursor-pointer"
              aria-label="Go to homepage"
            >
              <div className="w-20 h-20">
                <LazyImage
                  src="/vanlogo.webp"
                  alt="Chris, Your Man with a Van logo"
                  className="w-full h-full object-contain"
                  fallbackSrc="/vanlogo.png"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation & CTA - Right Aligned */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Desktop Navigation */}
            {navItems.map((item) => (
              <a
                key={item.label}
                href={getNavigationHref(item)}
                onClick={(e) => handleNavigation(e, item)}
                className="transition-colors duration-300 font-medium text-white hover:text-white/80"
              >
                {item.label}
              </a>
            ))}
            
            {/* Desktop CTA */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleCallClick}
                variant="ghost"
                className="flex items-center gap-2 transition-colors duration-300 text-white/80 hover:text-white"
              >
                <Phone className="w-4 h-4" />
                07735 852822
              </Button>
              <Button
                asChild
                className="px-6 py-2 rounded-full font-semibold transition-colors duration-300 bg-green-600 hover:bg-green-700 text-white"
              >
                <a href="/contact" onClick={handleQuoteClick}>
                  Free Quote
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 z-50 relative"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 transition-colors duration-300 text-white" />
            ) : (
              <Menu className="w-6 h-6 transition-colors duration-300 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t transition-all duration-300 z-40 relative bg-black/95 border-gray-800">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={getNavigationHref(item)}
                  onClick={(e) => handleNavigation(e, item)}
                  className="block w-full text-left px-4 py-2 transition-colors duration-300 text-white hover:text-white/80 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-gray-800 space-y-3">
                <Button
                  onClick={handleCallClick}
                  variant="ghost"
                  className="w-full justify-start flex items-center gap-2 text-white hover:text-white/80"
                >
                  <Phone className="w-4 h-4" />
                  Call: 07735 852822
                </Button>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href="/contact" onClick={handleQuoteClick}>
                    Get Free Quote
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    {showOfferBanner && <OfferBanner onDismiss={() => setShowOfferBanner(false)} />}
    <div
      className={showOfferBanner ? "h-[7.75rem]" : "h-16"}
      aria-hidden="true"
    />
    </>
  );
};

export default Navigation;