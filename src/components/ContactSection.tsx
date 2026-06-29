import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";
import { trackPhoneCall, trackWhatsAppClick, trackFacebookMessengerClick, trackQuoteRequest, trackWhatsAppMessage, trackFacebookMessage, trackFacebookPageClick } from "@/utils/analytics";
import { useFadeIn } from "@/hooks/use-fade-in";

// WhatsApp Logo Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img 
    src="/whatsapp-svgrepo-com.svg" 
    alt="WhatsApp" 
    className={className}
  />
);

const ContactSection = () => {
  // Fade-in animations
  const { elementRef: headerRef, isVisible: headerVisible } = useFadeIn({ delay: 200 });
  const { elementRef: buttonsRef, isVisible: buttonsVisible } = useFadeIn({ delay: 400 });

  const handleCallClick = () => {
    trackPhoneCall('contact_section');
    window.location.href = "tel:+447735852822";
  };

  const handleMessengerClick = () => {
    trackWhatsAppClick('contact_section');
    trackWhatsAppMessage('contact_section');
    const defaultMessage = "Hi Chris! I'd like to request a quote via WhatsApp. Could you please get back to me?";
    try {
      const phone = "447735852822";
      const encoded = encodeURIComponent(defaultMessage);
      const waUrl = `https://wa.me/${phone}?text=${encoded}`;
      window.open(waUrl, "_blank");
    } catch {}
  };

  const handleFacebookClick = () => {
    trackFacebookMessengerClick('contact_section');
    trackFacebookPageClick('contact_section');
    trackFacebookMessage('contact_section');
    window.open("https://www.facebook.com/chrisyourmanwithavankilmarnock", "_blank");
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('contact_section_button', []);
    trackWhatsAppClick('contact_section_quote_button');
    trackWhatsAppMessage('contact_section_quote_button');
    window.open("https://wa.me/447735852822", "_blank");
  };

  return (
    <section id="contact-form" className="py-20 px-4 bg-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-4xl">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Contact Chris for professional van services across Ayrshire. Get your free quote via WhatsApp, call, or Facebook Messenger.
          </p>
        </div>

        <div 
          ref={buttonsRef}
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto transition-all duration-1000 ${
            buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Call Button */}
          <Button
            onClick={handleCallClick}
            className="flex items-center gap-4 bg-transparent hover:bg-transparent p-0 h-auto shadow-none hover:shadow-none transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Call me</span>
              <span className="text-purple-100 text-xl font-bold">07735 852822</span>
            </div>
          </Button>

          {/* WhatsApp Button */}
          <Button 
            onClick={handleMessengerClick}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-8 h-16 rounded-xl flex items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <WhatsAppIcon className="w-5 h-5 animate-bounce" />
            WhatsApp Me
          </Button>
        </div>

        {/* Facebook Link */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleFacebookClick}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            Or visit us on Facebook
              </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;