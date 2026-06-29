import { useEffect } from "react";
import { MapPin, ArrowRight, MessageSquare, Check, Phone, ShieldCheck, Star } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";
import Reviews from "@/components/Reviews";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackFacebookMessengerClick, trackNavigation, trackWhatsAppMessage, trackFacebookMessage } from "@/utils/analytics";
import {
  SERVICES,
  NEARBY_LOCATIONS,
  getLocationBySlug,
  getServiceBySlug,
  getServiceIntro,
  getLocalizedFaqs,
  getLocationName,
  getServiceLink,
} from "@/data/locationServices";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className={className} />
);

interface LocationServiceDetailProps {
  locationSlug?: string;
  serviceSlug?: string;
}

const LocationServiceDetail = ({ locationSlug, serviceSlug }: LocationServiceDetailProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationSlug, serviceSlug]);

  const location = getLocationBySlug(locationSlug || "");
  const service = getServiceBySlug(serviceSlug || "");

  if (!location || !service) {
    return null;
  }

  const intro = getServiceIntro(location.name, location.region, service.slug);
  const faqs = getLocalizedFaqs(location.name, service.slug);
  const nearbySlugs = (NEARBY_LOCATIONS[location.slug] ?? []).filter((s) => s !== location.slug);
  const siblingServices = SERVICES.filter((s) => s.slug !== service.slug);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(`location_service_${location.slug}_${service.slug}`);
    trackWhatsAppMessage(`location_service_${location.slug}_${service.slug}`);
    const message = `Hi Chris! I'd like a quote for ${service.title} in ${location.name}. Could you please get back to me?`;
    window.open(`https://wa.me/447735852822?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleFacebookMessengerClick = () => {
    trackFacebookMessengerClick(`location_service_${location.slug}_${service.slug}`);
    trackFacebookMessage(`location_service_${location.slug}_${service.slug}`);
    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = messengerUrl;
    } else {
      window.open(messengerUrl, "_blank");
    }
  };

  const benefits = [
    { icon: Star, title: "77 Google Reviews", description: `Trusted by customers across ${location.name} and Ayrshire with a 5-star rating.` },
    { icon: ShieldCheck, title: "SEPA Registered", description: "Fully licensed for waste removal and tip runs with legal disposal guaranteed." },
    { icon: MapPin, title: "Local Knowledge", description: `Chris knows ${location.name}'s streets, parking, and access routes inside out.` },
    { icon: Phone, title: "Fast Response", description: "Free quotes via WhatsApp with quick, personal communication on every job." },
  ];

  return (
    <>
      <main className="min-h-screen">
        <Navigation />

        <section className="relative px-4 pt-2 pb-8 overflow-hidden max-sm:min-h-[calc(100dvh-7.75rem)] max-sm:flex max-sm:flex-col max-sm:justify-center sm:py-20 sm:min-h-[60vh] sm:flex sm:items-center">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/back1.webp"
              alt={`${service.title} in ${location.name}`}
              className="w-full h-full object-cover object-[40%_center] md:object-center"
              fallbackSrc="/back1.jpg"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <nav className="hidden sm:flex text-sm text-white/70 mb-6 flex-wrap gap-2 items-center">
              <a href="/" className="hover:text-[hsl(var(--primary-orange))]">Home</a>
              <span>/</span>
              <a href="/locations" className="hover:text-[hsl(var(--primary-orange))]">Locations</a>
              <span>/</span>
              <a href={`/locations/${location.slug}`} className="hover:text-[hsl(var(--primary-orange))]">{location.name}</a>
              <span>/</span>
              <span className="text-white">{service.shortTitle}</span>
            </nav>

            <div className="max-w-4xl mx-auto sm:mx-0 text-center sm:text-left">
              <h1 className="font-display text-[2rem] leading-tight sm:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-6">
                {service.title} in {location.name}, Ayrshire
              </h1>
              <p className="text-base sm:text-xl text-white/90 leading-snug mb-4 sm:mb-6">
                <span className="sm:hidden">Free quotes via WhatsApp or Messenger.</span>
                <span className="hidden sm:inline">
                  Man with a van service in {location.name} — 77 five-star Google reviews. Free quotes via WhatsApp or Messenger.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto sm:mx-0">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-6 py-4 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base whitespace-normal"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-center leading-tight">
                    <span className="sm:hidden">Free Quote on WhatsApp</span>
                    <span className="hidden sm:inline">Get Free Quote via WhatsApp</span>
                  </span>
                </Button>
                <Button
                  onClick={handleFacebookMessengerClick}
                  className="w-full bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold px-4 sm:px-6 py-4 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base whitespace-normal"
                >
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-center leading-tight">
                    <span className="sm:hidden">Free Quote on Messenger</span>
                    <span className="hidden sm:inline">Get Free Quote via Messenger</span>
                  </span>
                </Button>
              </div>
              <div className="flex justify-center sm:justify-start mt-4 sm:mt-6">
                <GoogleReviewsBadge goldStars />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-4xl">
            <p className="text-lg text-white/90 leading-relaxed mb-8">{intro}</p>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Chris, Your Man with a Van is based in Cumnock and serves {location.name} regularly throughout {location.region}.
              Every job is completed personally — no subcontractors — so you always deal directly with Chris from quote to completion.
              Whether you searched for a man with a van near me in {location.name} or need a specific {service.keywordPhrase} service,
              you get reliable, affordable help with transparent pricing and no hidden fees.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="card-service p-6">
                  <benefit.icon className="w-8 h-8 text-[hsl(var(--primary-orange))] mb-3" />
                  <h3 className="font-display text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/80 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display text-3xl font-bold text-white mb-6">
              Why choose Chris for {service.shortTitle.toLowerCase()} in {location.name}?
            </h2>
            <ul className="space-y-3 mb-12">
              {[
                `Personal service — Chris handles every ${service.keywordPhrase} job in ${location.name} himself`,
                `Competitive, transparent pricing with free WhatsApp quotes`,
                `Fast response times across ${location.name} and ${location.region}`,
                `Fully insured and SEPA registered for all waste-related work`,
                `77 five-star Google reviews from satisfied Ayrshire customers`,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/90">
                  <Check className="w-5 h-5 text-[hsl(var(--primary-orange))] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {faqs.length > 0 && (
              <>
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  Frequently asked questions — {service.shortTitle} in {location.name}
                </h2>
                <div className="space-y-4 mb-12">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="card-service p-6">
                      <h3 className="font-display text-lg font-bold text-white mb-2">{faq.question}</h3>
                      <p className="text-white/80">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div id="location-service-quote" className="bg-[hsl(var(--muted))] rounded-2xl p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Get a free quote for {service.title.toLowerCase()} in {location.name}
              </h2>
              <p className="text-white/80 mb-6">Message Chris on WhatsApp or Facebook Messenger for a fast, no-obligation quote.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleWhatsAppClick} className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp Me
                </Button>
                <Button onClick={handleFacebookMessengerClick} className="bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold px-8 py-6 rounded-xl flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  Facebook Messenger
                </Button>
              </div>
              <div className="flex justify-center mt-6">
                <GoogleReviewsBadge />
              </div>
            </div>
          </div>
        </section>

        <Reviews locationName={location.name} reviewCount={77} quoteSectionId="location-service-quote" />

        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">
              Other services in {location.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {siblingServices.map((sibling) => (
                <a
                  key={sibling.slug}
                  href={`/locations/${location.slug}/${sibling.slug}`}
                  onClick={() => trackNavigation(`location_service_sibling_${sibling.slug}`)}
                  className="card-service p-6 hover:border-[hsl(var(--primary-orange))]/50 transition-all group flex items-center justify-between"
                >
                  <span className="text-white group-hover:text-[hsl(var(--primary-orange))] transition-colors font-medium">
                    {sibling.title} in {location.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[hsl(var(--primary-orange))] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
            <div className="text-center">
              <a
                href={`/locations/${location.slug}`}
                onClick={() => trackNavigation(`location_service_back_to_${location.slug}`)}
                className="inline-flex items-center gap-2 text-[hsl(var(--primary-orange))] hover:text-[hsl(var(--dark-orange))] font-semibold text-lg"
              >
                <MapPin className="w-5 h-5" />
                All van services in {location.name}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {nearbySlugs.length > 0 && (
          <section className="py-20 px-4 bg-[hsl(var(--background))]">
            <div className="container mx-auto max-w-7xl">
              <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">
                {service.title} in nearby areas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {nearbySlugs.map((nearbySlug) => (
                  <a
                    key={nearbySlug}
                    href={getServiceLink(nearbySlug, service.slug)}
                    onClick={() => trackNavigation(`location_service_nearby_${nearbySlug}`)}
                    className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(var(--card))] border border-white/10 hover:border-[hsl(var(--primary-orange))]/50 transition-all group"
                  >
                    <MapPin className="w-5 h-5 text-[hsl(var(--primary-orange))] flex-shrink-0" />
                    <span className="text-white font-medium group-hover:text-[hsl(var(--primary-orange))] transition-colors">
                      {service.shortTitle} in {getLocationName(nearbySlug)}
                    </span>
                  </a>
                ))}
              </div>
              <div className="text-center mt-8">
                <a
                  href={`/services/${service.slug}`}
                  onClick={() => trackNavigation(`location_service_to_generic_${service.slug}`)}
                  className="text-[hsl(var(--primary-orange))] hover:underline font-semibold"
                >
                  Learn more about {service.title.toLowerCase()} across Ayrshire →
                </a>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
};

export default LocationServiceDetail;
