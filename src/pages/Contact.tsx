import { useEffect } from "react";
import { Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackPhoneCall, trackWhatsAppClick, trackFacebookMessengerClick, trackExternalLink, trackWhatsAppMessage, trackFacebookMessage, trackFacebookPageClick } from "@/utils/analytics";

// WhatsApp Logo Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img 
    src="/whatsapp-svgrepo-com.svg" 
    alt="WhatsApp" 
    className={className}
  />
);

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCallClick = () => {
    trackPhoneCall('contact_page');
    window.location.href = "tel:+447735852822";
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('contact_page');
    trackWhatsAppMessage('contact_page');
    const defaultMessage = "Hi Chris! I'd like to request a quote. Could you please get back to me?";
    try {
      const phone = "447735852822";
      const encoded = encodeURIComponent(defaultMessage);
      const waUrl = `https://wa.me/${phone}?text=${encoded}`;
      window.open(waUrl, "_blank");
    } catch {}
  };

  const handleFacebookMessengerClick = () => {
    trackFacebookMessengerClick('contact_page');
    trackFacebookMessage('contact_page');
    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = messengerUrl;
    } else {
      window.open(messengerUrl, "_blank");
    }
  };

  const handleEmailClick = () => {
    trackExternalLink('mailto:chris@chrisyourmanwithavan.com', 'Email');
    window.location.href = "mailto:chris@chrisyourmanwithavan.com";
  };

  const handleFacebookClick = () => {
    trackExternalLink('https://www.facebook.com/chrisyourmanwithavankilmarnock', 'Facebook');
    trackFacebookPageClick('contact_page');
    window.open("https://www.facebook.com/chrisyourmanwithavankilmarnock", "_blank");
  };

  return (
    <>
      <main className="min-h-screen">
        <Navigation />

        {/* Contact Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.jpg"
              alt="Chris, Your Man with a Van contact"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                Contact Chris for professional van services across Ayrshire. Get your free quote today!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods & Information Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Get Your Free Quote
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
                Choose how you'd like to get your free quote instantly:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Left Side - Contact Buttons */}
              <div>
                <div className="flex flex-col gap-4">
                  <Button 
                  onClick={() => {
                    trackWhatsAppClick('contact_page_main_cta');
                    trackWhatsAppMessage('contact_page_main_cta');
                    const msg = `Hi Chris! I'd like to request a quote for your van services.`;
                    const phone = "447735852822";
                    const encoded = encodeURIComponent(msg);
                    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                    const waUrl = `https://wa.me/${phone}?text=${encoded}`;
                    if (isMobile) {
                      window.location.href = waUrl;
                    } else {
                      window.open(waUrl, "_blank");
                    }
                  }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-20 rounded-xl flex items-center justify-center gap-3"
                  >
                    <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="w-6 h-6" />
                    WhatsApp Me
                  </Button>
                  <Button 
                  onClick={() => {
                    trackFacebookMessengerClick('contact_page_main_cta');
                    trackFacebookMessage('contact_page_main_cta');
                    const msg = `Hi Chris! I'd like to request a quote for your van services.`;
                    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
                    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                    if (isMobile) {
                      window.location.href = messengerUrl;
                    } else {
                      window.open(messengerUrl, "_blank");
                    }
                  }}
                    className="w-full bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold text-lg h-20 rounded-xl flex items-center justify-center gap-3"
                  >
                    <img src="/Facebook_Messenger_logo_2020.svg" alt="Facebook Messenger" className="w-6 h-6" />
                    Facebook Messenger
                  </Button>
                </div>
              </div>

              {/* Right Side - Contact Information */}
              <div>
                <h2 className="font-display text-3xl font-bold text-white mb-8">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Phone Number</h3>
                      <a 
                        href="tel:+447735852822" 
                        onClick={handleCallClick}
                        className="text-[hsl(var(--primary-orange))] hover:underline"
                      >
                        07735 852822
                      </a>
                      <p className="text-white/70 text-sm mt-1">Available day & night</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email Address</h3>
                      <a 
                        href="mailto:chris@chrisyourmanwithavan.com" 
                        onClick={handleEmailClick}
                        className="text-[hsl(var(--primary-orange))] hover:underline break-all"
                      >
                        chris@chrisyourmanwithavan.com
                      </a>
                      <p className="text-white/70 text-sm mt-1">Usually respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Service Area</h3>
                      <p className="text-white/90">Cumnock & Ayrshire, Scotland</p>
                      <p className="text-white/70 text-sm mt-1">Courier services available across the UK</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Availability</h3>
                      <p className="text-white/90">Day & Night Service</p>
                      <p className="text-white/70 text-sm mt-1">Contact for current availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Why Contact Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Van Services You Can Quote For
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Chris, Your Man with a Van provides professional, reliable help across Ayrshire — backed by 77 five-star Google reviews. Whether you need a single item moved or a full property cleared, you get a personal service with direct WhatsApp communication and honest, transparent pricing.
              </p>
              <p className="text-white/90 mb-6 leading-relaxed">
                Request a free, no-obligation quote for small removals and house moves, same-day courier and delivery, SEPA registered waste removal and tip runs, in-store collection and furniture delivery, end-of-tenancy clearances, or flat-pack assembly. Chris is fully insured, SEPA registered for waste work, and available day and night across Cumnock, Ayr, Kilmarnock, Irvine, Troon, Prestwick and surrounding towns.
              </p>
              <p className="text-white/90 mb-8 leading-relaxed">
                The fastest way to get a quote is WhatsApp — send a message with what you need moved, your locations, and preferred dates. You can also call 07735 852822 or message on Facebook Messenger. Most quotes are returned quickly, and same-day availability is often possible for urgent collections, deliveries, and tip runs.
              </p>
              <h2 className="font-display text-3xl font-bold text-white mb-8">
                Service Areas
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                I proudly serve towns and villages across Ayrshire, with courier services available throughout the UK.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  "Cumnock", "Ayr", "Kilmarnock", "Irvine",
                  "Troon", "Prestwick", "Stewarton", "Kilwinning",
                  "Dundonald", "Hurlford", "Crosshouse", "Dreghorn"
                ].map((area, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-[hsl(var(--card))] border border-white/10">
                    <MapPin className="w-4 h-4 text-[hsl(var(--primary-orange))] flex-shrink-0" />
                    <span className="text-white text-sm">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/70 text-sm">
                Don't see your area? <strong className="text-[hsl(var(--primary-orange))]">Contact me to confirm coverage!</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Follow Us on Social Media
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Stay updated with our latest services and customer reviews on Facebook.
              </p>
              <Button
                onClick={handleFacebookClick}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl flex items-center gap-3 text-lg mx-auto"
              >
                <MessageSquare className="w-6 h-6" />
                Visit Our Facebook Page
              </Button>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Service Coverage Area
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                We cover all of Ayrshire and beyond. Courier services are available across the UK.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-[hsl(var(--primary-orange))]/10 to-[hsl(var(--primary-orange))]/5 rounded-2xl p-4 border-2 border-[hsl(var(--primary-orange))]/20">
                <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2258.5!2d-4.5!3d55.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488f8b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAyrshire%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chris Van Services - Ayrshire Coverage Area"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-gradient-to-r from-[hsl(var(--primary-orange))]/20 to-[hsl(var(--sunshine-yellow))]/20 rounded-2xl p-6 sm:p-8 border-2 border-[hsl(var(--primary-orange))]/30 text-center">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-base sm:text-xl text-white/90 mb-8 px-2">
                Get your free quote today via WhatsApp for the fastest response!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    trackWhatsAppClick('contact_page_final_cta');
                    handleWhatsAppClick();
                  }}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-8 py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span>Get Free Quote on WhatsApp</span>
                </Button>
                <Button
                  onClick={() => {
                    trackFacebookMessengerClick('contact_page_final_cta');
                    handleFacebookMessengerClick();
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold px-4 sm:px-8 py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg"
                >
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span>Facebook Messenger</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Contact;

