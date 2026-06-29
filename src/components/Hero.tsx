import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Facebook } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";
import { trackWhatsAppClick, trackFacebookMessengerClick, trackQuoteRequest, trackFormSubmit, trackExternalLink, trackFacebookPageClick, trackWhatsAppMessage, trackFacebookMessage } from "@/utils/analytics";

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();



  const openWhatsApp = (text: string): void => {
    try {
      const phone = "447735852822"; // international format, no +
      const encoded = encodeURIComponent(text);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const waUrl = `https://wa.me/${phone}?text=${encoded}`;
      if (isMobile) {
        window.location.href = waUrl;
      } else {
        window.open(waUrl, "_blank");
      }
    } catch {}
  };

  const openMessenger = async (text: string): Promise<void> => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(ta);
      }
    } catch {}

    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = messengerUrl;
    } else {
      window.open(messengerUrl, "_blank");
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create WhatsApp message with form data
      const whatsappMessage = `Hi Chris! I'd like to request a quote for your van services.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}

Please get back to me with a quote. Thanks!`;

      // Open WhatsApp with pre-filled message (mobile uses app, desktop uses web)
      openWhatsApp(whatsappMessage);

        // Track successful form submission
      trackQuoteRequest('contact_form', []);
      trackFormSubmit('quote_form', formData);
      trackWhatsAppMessage('hero_form');
        
        toast({
        title: "Redirecting to WhatsApp!",
        description: "You'll be taken to WhatsApp to send your quote request.",
        });
        
      // Already opened via openWhatsApp above
      
      // Reset form after opening WhatsApp
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 100);
      
    } catch (error) {
      trackFormSubmit('quote_form', { error: true, ...formData });
      toast({
        title: "Error preparing request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="hero" className="relative bg-black min-h-screen px-4 pb-8 md:pb-16 overflow-hidden flex flex-col justify-start pt-6 md:pt-36 lg:pt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="/back1.webp"
          alt="Chris, Your Man with a Van background"
          className="w-full h-full object-cover object-[40%_center] md:object-center"
          fallbackSrc="/back1.jpg"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10 w-full pt-2 md:pt-0">
        <div className="flex flex-col items-start">
          {/* Heading, subtext, CTAs & reviews */}
          <div className="flex flex-col items-start gap-3 md:gap-4 text-left w-full max-w-2xl lg:max-w-3xl max-md:pt-4">
            <h1 
              className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight drop-shadow-lg overflow-visible"
            >
              <div className="relative inline-block overflow-visible">
                {/* Arrow SVG - positioned behind text */}
                <div className="absolute -top-20 -left-6 -right-42 -bottom-32 md:-left-8 md:-right-40 flex items-center justify-center pointer-events-none">
                  <LazyImage
                    src="/PNG NOBACK.svg"
                    alt="Arrow decoration"
                    className="w-full h-full object-contain"
                    fallbackSrc="/PNG NOBACK.svg"
                    loading="lazy"
                  />
                </div>
                <span className="text-blue-600 italic text-6xl lg:text-7xl relative z-10">Chris</span>
                <span className="text-blue-600 relative z-10">,</span>
              </div>
              <br />YOUR MAN WITH A VAN
            </h1>

            <p className="text-sm md:text-base text-white/90 font-medium max-w-lg leading-snug drop-shadow-md">
              Removals, courier & waste removal across Ayrshire. SEPA registered. Free WhatsApp quotes.
            </p>

            <div id="contact-form" className="space-y-4 pt-1 w-full md:w-auto">
              <div className="md:hidden w-full">
                <h2 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-wide text-center">
                  Get a Free Quote
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-start w-full md:w-auto">
                <Button 
                  onClick={() => {
                    trackWhatsAppClick('hero_cta');
                    trackWhatsAppMessage('hero_cta');
                    const msg = `Hi Chris! I'd like to request a quote for your van services.`;
                    openWhatsApp(msg);
                  }}
                  className="w-full sm:w-1/2 md:w-auto md:min-w-[220px] bg-green-600 hover:bg-green-700 text-white font-bold text-base md:text-lg h-14 md:h-20 rounded-xl flex items-center justify-center gap-3"
                >
                  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="w-6 h-6" />
                  WhatsApp Me
                </Button>
                <Button 
                  onClick={() => {
                    trackFacebookMessengerClick('hero_cta');
                    trackFacebookMessage('hero_cta');
                    const msg = `Hi Chris! I'd like to request a quote for your van services.`;
                    openMessenger(msg);
                  }}
                  className="w-full sm:w-1/2 md:w-auto md:min-w-[220px] bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold text-base md:text-lg h-14 md:h-20 rounded-xl flex items-center justify-center gap-3"
                >
                  <img src="/Facebook_Messenger_logo_2020.svg" alt="" className="w-6 h-6" />
                  Facebook Messenger
                </Button>
              </div>
              <div className="flex justify-center md:justify-start w-full md:w-auto pt-2 pb-1 md:pb-0">
                <GoogleReviewsBadge goldStars className="self-start" />
              </div>
            </div>
          </div>
          
          {/* Mobile-only image after contact form */}
          <div className="md:hidden mt-8 mb-4 w-full">
            <LazyImage
              src="/back1.webp"
              alt="Chris, Your Man with a Van mobile image"
              className="w-full h-auto rounded-lg shadow-lg"
              fallbackSrc="/back1.jpg"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;