import { useEffect } from "react";
import { MapPin, ArrowRight, MessageSquare, Truck, Package, Trash2, ShoppingCart, Home, Wrench } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackFacebookMessengerClick, trackNavigation, trackWhatsAppMessage, trackFacebookMessage } from "@/utils/analytics";

// WhatsApp Logo Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img 
    src="/whatsapp-svgrepo-com.svg" 
    alt="WhatsApp" 
    className={className}
  />
);

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ayrshire towns and areas served
  const locations = [
    {
      name: "Cumnock",
      slug: "cumnock",
      nearbyAreas: ["New Cumnock", "Auchinleck", "Ochiltree", "Catrine"]
    },
    {
      name: "Ayr",
      slug: "ayr",
      nearbyAreas: ["Alloway", "Prestwick", "Troon", "Doonfoot", "Heads of Ayr"]
    },
    {
      name: "Kilmarnock",
      slug: "kilmarnock",
      nearbyAreas: ["Dundonald", "Town Centre", "Hurlford", "Crosshouse", "Stewarton"]
    },
    {
      name: "Irvine",
      slug: "irvine",
      nearbyAreas: ["Kilwinning", "Troon", "Ayr", "Dreghorn"]
    },
    {
      name: "Troon",
      slug: "troon",
      nearbyAreas: ["Prestwick", "Ayr", "Irvine", "Barassie"]
    },
    {
      name: "Prestwick",
      slug: "prestwick",
      nearbyAreas: ["Ayr", "Troon", "Monkton", "Prestwick Airport"]
    },
    {
      name: "Maybole",
      slug: "maybole",
      nearbyAreas: ["Ayr", "Girvan", "Crosshill", "Dailly"]
    },
    {
      name: "Girvan",
      slug: "girvan",
      nearbyAreas: ["Ayr", "Maybole", "Turnberry", "Ballantrae"]
    },
    {
      name: "Stewarton",
      slug: "stewarton",
      nearbyAreas: ["Kilmarnock", "Irvine", "Dreghorn"]
    },
    {
      name: "Dalrymple",
      slug: "dalrymple",
      nearbyAreas: ["Ayr", "Mauchline", "Cumnock"]
    },
    {
      name: "Mauchline",
      slug: "mauchline",
      nearbyAreas: ["Kilmarnock", "Cumnock", "Ayr"]
    },
    {
      name: "Dalmellington",
      slug: "dalmellington",
      nearbyAreas: ["Ayr", "Cumnock", "Patna"]
    },
    {
      name: "Patna",
      slug: "patna",
      nearbyAreas: ["Ayr", "Dalmellington", "Cumnock"]
    },
    {
      name: "Auchinleck",
      slug: "auchinleck",
      nearbyAreas: ["Cumnock", "Mauchline", "Kilmarnock"]
    },
    {
      name: "Dreghorn",
      slug: "dreghorn",
      nearbyAreas: ["Irvine", "Kilmarnock", "Troon"]
    },
    {
      name: "Kilwinning",
      slug: "kilwinning",
      nearbyAreas: ["Irvine", "Ayr", "Beith"]
    },
    {
      name: "Beith",
      slug: "beith",
      nearbyAreas: ["Irvine", "Kilmarnock", "Kilwinning"]
    },
    {
      name: "Dalry",
      slug: "dalry",
      nearbyAreas: ["Irvine", "Kilwinning", "Beith"]
    },
    {
      name: "Largs",
      slug: "largs",
      nearbyAreas: ["Irvine", "West Kilbride", "Fairlie"]
    },
    {
      name: "Saltcoats",
      slug: "saltcoats",
      nearbyAreas: ["Ardrossan", "Irvine", "Kilwinning"]
    },
    {
      name: "Ardrossan",
      slug: "ardrossan",
      nearbyAreas: ["Saltcoats", "Irvine", "West Kilbride"]
    },
    {
      name: "Darvel",
      slug: "darvel",
      nearbyAreas: ["Kilmarnock", "Newmilns", "Galston"]
    },
    {
      name: "Newmilns",
      slug: "newmilns",
      nearbyAreas: ["Darvel", "Kilmarnock", "Galston"]
    },
    {
      name: "Galston",
      slug: "galston",
      nearbyAreas: ["Kilmarnock", "Darvel", "Newmilns"]
    },
    {
      name: "Kirkconnel",
      slug: "kirkconnel",
      nearbyAreas: ["Sanquhar", "Cumnock", "New Cumnock"]
    },
    {
      name: "Sanquhar",
      slug: "sanquhar",
      nearbyAreas: ["Kirkconnel", "Cumnock", "Dumfries"]
    },
    {
      name: "Mossblown",
      slug: "mossblown",
      nearbyAreas: ["Ayr", "Prestwick", "Troon"]
    }
  ];

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('locations_page');
    trackWhatsAppMessage('locations_page');
    const defaultMessage = "Hi Chris! I'd like to request a quote via WhatsApp. Could you please get back to me?";
    try {
      const phone = "447735852822";
      const encoded = encodeURIComponent(defaultMessage);
      const waUrl = `https://wa.me/${phone}?text=${encoded}`;
      window.open(waUrl, "_blank");
    } catch {}
  };

  const handleFacebookMessengerClick = () => {
    trackFacebookMessengerClick('locations_page');
    trackFacebookMessage('locations_page');
    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = messengerUrl;
    } else {
      window.open(messengerUrl, "_blank");
    }
  };

  const handleLocationClick = (locationName: string) => {
    trackNavigation(`location_${locationName.toLowerCase()}`);
  };

  return (
    <>
      <main className="min-h-screen">
        <Navigation />
        
        {/* Locations Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[50vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.jpg"
              alt="Chris, Your Man with a Van service locations"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
                Service Locations
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-4">
                Mobile Van Services Across Cumnock & Ayrshire Metro Areas
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Chris provides comprehensive mobile van services throughout Ayrshire. Our strategically positioned service ensures rapid response times for removals, courier services, waste removal, and on-site assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Ayrshire
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                We proudly serve towns and villages across Ayrshire. <strong className="text-[hsl(var(--primary-orange))]">Courier services are available across the UK.</strong>
              </p>
            </div>

            {/* Locations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {locations.map((location, index) => (
                <a
                  key={index}
                  href={`/locations/${location.slug}`}
                  onClick={() => handleLocationClick(location.name)}
                  className="group"
                >
                  <div className="card-service h-full flex flex-col hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-[hsl(var(--primary-orange))] transition-colors">
                            {location.name}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-[hsl(var(--primary-orange))] group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    {location.nearbyAreas && location.nearbyAreas.length > 0 && (
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <p className="text-xs text-white/60 mb-2">Service Areas:</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {location.nearbyAreas.slice(0, 3).join(", ")}
                          {location.nearbyAreas.length > 3 && " and more"}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 text-right">
                      <span className="text-xs text-[hsl(var(--primary-orange))] font-semibold">
                        View Details →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Available Services Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                All Services Available
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Every service is available in all locations across Ayrshire. Click any service to learn more and get a quote.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Small Removals & House Moves", slug: "small-removals", icon: Truck },
                { title: "Courier Services & Delivery", slug: "courier", icon: Package },
                { title: "Tip Runs & Waste Removal", slug: "waste-removal", icon: Trash2 },
                { title: "In-Store Collection & Delivery", slug: "collection-and-delivery", icon: ShoppingCart },
                { title: "End-of-Tenancy Clearance", slug: "end-of-tenancy", icon: Home },
                { title: "Flat Pack Assembly", slug: "flat-pack-assembly", icon: Wrench },
              ].map((service) => (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => trackNavigation(`locations_to_service_${service.slug}`)}
                  className="card-service hover:border-[hsl(var(--primary-orange))]/50 transition-all duration-300 group text-center p-6"
                >
                  <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[hsl(var(--primary-orange))] transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center justify-center text-[hsl(var(--primary-orange))] font-semibold text-sm group-hover:gap-2 transition-all">
                    View {service.title.toLowerCase()} details
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/services"
                onClick={() => trackNavigation('view_all_services_from_locations')}
                className="inline-flex items-center gap-2 text-[hsl(var(--primary-orange))] hover:text-[hsl(var(--dark-orange))] font-semibold text-lg transition-colors"
              >
                View All Services
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Coverage Stats Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center place-items-center">
              <div className="p-8 bg-[hsl(var(--card))] rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                <div className="text-5xl font-bold text-[hsl(var(--primary-orange))] mb-2">
                  45 min
                </div>
                <div className="text-white/80 text-lg">
                  Average Response Time
                </div>
              </div>
              
              {/* Removed 24/7 availability card per request */}
              
              <div className="p-8 bg-[hsl(var(--card))] rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                <div className="text-5xl font-bold text-[hsl(var(--primary-orange))] mb-2">
                  {locations.length}+
                </div>
                <div className="text-white/80 text-lg">
                  Towns Covered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Coverage Area Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Full Coverage Area
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                We cover all of Ayrshire and beyond. Courier services are available across the UK.
              </p>
            </div>

            {/* Coverage Area */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <div className="bg-gradient-to-br from-[hsl(var(--primary-orange))]/10 to-[hsl(var(--primary-orange))]/5 rounded-2xl p-4 border-2 border-[hsl(var(--primary-orange))]/20">
                <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-[hsl(var(--card))]">
                  <div className="text-center p-8 space-y-4">
                    <MapPin className="w-12 h-12 mx-auto" style={{ color: "hsl(19 67% 49%)" }} />
                    <div>
                      <p className="text-white font-semibold text-lg">Cumnock, Ayrshire</p>
                      <p className="text-white/70 text-sm mt-1">Covering all of Ayrshire and beyond</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Cumnock,+Ayrshire,+Scotland"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-lg text-white font-semibold text-sm transition-colors"
                      style={{ backgroundColor: "hsl(19 67% 49%)" }}
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-[hsl(var(--primary-orange))]/20 to-[hsl(var(--sunshine-yellow))]/20 rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/30 text-center">
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                Get Your Free Quote
              </h3>
              <p className="text-xl text-white/90 mb-6">
                Available Day & Night
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl flex items-center gap-3 text-lg"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp Me
                </Button>
                <Button
                  onClick={handleFacebookMessengerClick}
                  className="bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold px-8 py-6 rounded-xl flex items-center gap-3 text-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  Facebook Messenger
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

export default Locations;

