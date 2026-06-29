import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Package, Trash2, ShoppingCart, Home, Wrench, Phone, MessageSquare, MapPin } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { trackServiceClick, trackPhoneCall, trackWhatsAppClick, trackNavigation, trackWhatsAppMessage } from "@/utils/analytics";
import { navigate } from "@/utils/navigation";

// WhatsApp Logo Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img 
    src="/whatsapp-svgrepo-com.svg" 
    alt="WhatsApp" 
    className={className}
  />
);

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Small Removals & House Moves",
      slug: "small-removals",
      description: "Professional small removal services in Cumnock and surrounding Ayrshire areas. Whether you're moving house, relocating your office, or just need furniture moved, I provide a friendly, reliable service.",
      features: [
        "House moves across Ayrshire",
        "Office relocations",
        "Furniture transport",
        "Personal service with care",
        "Competitive pricing",
        "Free quotes via WhatsApp"
      ],
      image: "/services/removals.webp",
      fallbackImage: "/services/removals.webp",
      icon: Truck,
      color: "primary-orange",
      details: "Moving house or office doesn't have to be stressful. I handle small to medium removals with care and attention to detail. All items are wrapped and protected during transport. Whether it's a single room or a full property, I'll work with you to make the move as smooth as possible."
    },
    {
      title: "Courier Services & Delivery",
      slug: "courier",
      description: "Reliable courier and delivery services across Ayrshire and throughout the UK. Same-day service available for urgent deliveries.",
      features: [
        "Same-day delivery available",
        "Package collection and delivery",
        "Secure transport",
        "UK-wide courier services",
        "Friendly, professional service",
        "Free quotes"
      ],
      image: "/services/delivery.jpg",
      fallbackImage: "/services/delivery.jpg",
      icon: Package,
      color: "primary-orange",
      details: "Need something delivered quickly? I offer fast, reliable courier services across Ayrshire and throughout the UK. Whether it's documents, parcels, or larger items, your package is handled with care and delivered on time. Same-day service is available for urgent deliveries."
    },
    {
      title: "Tip Runs & Waste Removal",
      slug: "waste-removal",
      description: "SEPA registered waste removal and tip run services. Professional disposal of household waste, garden waste, and unwanted items.",
      features: [
        "SEPA registered",
        "Bin bag collection",
        "Garage clearances",
        "Shed clearances",
        "Garden waste removal",
        "Eco-friendly disposal"
      ],
      image: "/services/tiprun.jpg",
      fallbackImage: "/services/tiprun.jpg",
      icon: Trash2,
      color: "primary-orange",
      details: "As a SEPA registered waste carrier, I provide professional waste removal services. From regular bin bag collections to full garage or shed clearances, I'll dispose of your unwanted items responsibly. All waste is taken to licensed disposal facilities, ensuring eco-friendly and legal disposal."
    },
    {
      title: "In-Store Collection & Delivery",
      slug: "collection-and-delivery",
      description: "Collection from furniture stores, online purchases, and delivery straight to your door. No need to worry about transport - I'll handle it for you.",
      features: [
        "Collection from furniture stores",
        "Online purchase delivery",
        "Same-day service available",
        "Careful handling guaranteed",
        "White glove service",
        "Delivery and placement"
      ],
      image: "/services/in person delivery.jpg",
      fallbackImage: "/services/in person delivery.jpg",
      icon: ShoppingCart,
      color: "primary-orange",
      details: "Bought furniture but can't collect it? I'll collect from stores or warehouses and deliver to your home. All items are handled with care, and I can even help with placement in your home. Save time and avoid the hassle - let me collect and deliver your purchases safely."
    },
    {
      title: "End-of-Tenancy Clearance",
      slug: "end-of-tenancy",
      description: "Complete property clearance for tenants and landlords. Fast, thorough service to get properties ready for the next tenant.",
      features: [
        "Full property clearance",
        "Furniture removal",
        "Deep clean preparation",
        "Fast turnaround",
        "Tenant and landlord friendly",
        "Property ready for handover"
      ],
      image: "/services/endtenancy.jpg",
      fallbackImage: "/services/endtenancy.jpg",
      icon: Home,
      color: "primary-orange",
      details: "Moving out and need to clear the property? I provide comprehensive end-of-tenancy clearance services. From removing old furniture to clearing out all belongings, I'll ensure the property is ready for inspection. Fast, reliable service that helps tenants and landlords alike."
    },
    {
      title: "Flat Pack Assembly",
      slug: "flat-pack-assembly",
      description: "Professional flat pack furniture assembly service. Save time and frustration - I'll assemble your furniture correctly the first time.",
      features: [
        "IKEA furniture assembly",
        "All major brands",
        "Tools provided",
        "Expert assembly",
        "Same-day service",
        "Quality guarantee"
      ],
      image: "/2.png",
      fallbackImage: "/2.png",
      icon: Wrench,
      color: "primary-orange",
      details: "Struggling with flat pack furniture instructions? I've assembled hundreds of items from IKEA and other major brands. I bring all necessary tools and have the experience to assemble your furniture quickly and correctly. Same-day service available, so you can enjoy your new furniture without the frustration."
    }
  ];

  const handleQuoteClick = (serviceTitle: string) => {
    trackServiceClick(serviceTitle, 'services_page_get_quote');
    trackNavigation('contact_page');
    navigate('/contact');
  };

  const handleCallClick = () => {
    trackPhoneCall('services_page');
    window.location.href = "tel:+447735852822";
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('services_page');
    trackWhatsAppMessage('services_page');
    const defaultMessage = "Hi Chris! I'd like to request a quote via WhatsApp. Could you please get back to me?";
    try {
      const phone = "447735852822";
      const encoded = encodeURIComponent(defaultMessage);
      const waUrl = `https://wa.me/${phone}?text=${encoded}`;
      window.open(waUrl, "_blank");
    } catch {}
  };

  return (
    <>
      <main className="min-h-screen overflow-x-hidden">
        <Navigation />
        
        {/* Services Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.jpg"
              alt="Chris, Your Man with a Van services"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl w-full relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
                Our Services
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Professional van services across Cumnock and Ayrshire. Small removals, courier services, tip runs, waste removal, flat-pack assembly, and in-store collection & delivery. SEPA registered, 5-star service, all jobs done personally.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Services Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))] overflow-x-hidden">
          <div className="container mx-auto max-w-7xl overflow-hidden">
            <div className="space-y-16 w-full">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-8 items-center justify-items-center w-full ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`min-w-0 w-full ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-none sm:shadow-xl mx-auto">
                      <div className="aspect-[4/3] relative">
                        <LazyImage
                          src={service.image}
                          alt={service.title}
                          className="!relative w-full h-full object-cover"
                          fallbackSrc={service.fallbackImage}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-6 min-w-0 w-full mx-auto max-w-2xl text-center lg:text-left ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <div className={`w-16 h-16 bg-[hsl(var(--${service.color}))] rounded-full flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display text-3xl lg:text-4xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-white/90 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <p className="text-base text-white/80 leading-relaxed">
                      {service.details}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-white/90">
                          <div className="w-2 h-2 bg-[hsl(var(--primary-orange))] rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-center lg:justify-start">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto border-2 border-[hsl(var(--primary-orange))] text-[hsl(var(--primary-orange))] hover:bg-[hsl(var(--primary-orange))] hover:text-white font-semibold px-8 py-6 rounded-full group"
                      >
                        <a 
                          href={`/services/${service.slug}`} 
                          onClick={() => trackServiceClick(service.title, 'services_page_read_more')} 
                          aria-label={`Learn more about ${service.title}`}
                        >
                          Learn more
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                      <Button
                        onClick={() => handleQuoteClick(service.title)}
                        className="w-full sm:w-auto bg-[hsl(var(--primary-orange))] hover:bg-[hsl(var(--dark-orange))] text-white font-semibold px-8 py-6 rounded-full group"
                      >
                        Get Quote
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))] overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Available Across Ayrshire
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                All services are available throughout Ayrshire. Click any location to learn more about van services in that area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
              {[
                { name: "Cumnock", slug: "cumnock", description: "Home base - fast, reliable service" },
                { name: "Ayr", slug: "ayr", description: "Major town - comprehensive coverage" },
                { name: "Kilmarnock", slug: "kilmarnock", description: "Largest town in East Ayrshire" },
                { name: "Irvine", slug: "irvine", description: "Coastal town - full service available" },
                { name: "Troon", slug: "troon", description: "Popular seaside destination" },
                { name: "Prestwick", slug: "prestwick", description: "Airport town - convenient access" },
              ].map((location) => (
                <a
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  onClick={() => trackNavigation(`services_to_location_${location.slug}`)}
                  className="flex items-start gap-3 p-4 rounded-lg bg-[hsl(var(--card))] border border-white/10 hover:border-[hsl(var(--primary-orange))]/50 transition-all duration-300 group"
                >
                  <MapPin className="w-5 h-5 text-[hsl(var(--primary-orange))] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1 group-hover:text-[hsl(var(--primary-orange))] transition-colors">{location.name}</h3>
                    <p className="text-white/70 text-sm">{location.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[hsl(var(--primary-orange))] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/locations"
                onClick={() => trackNavigation('view_all_locations_from_services')}
                className="inline-flex items-center gap-2 text-[hsl(var(--primary-orange))] hover:text-[hsl(var(--dark-orange))] font-semibold text-lg transition-colors"
              >
                View All Service Locations
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))] overflow-hidden">
          <div className="container mx-auto max-w-7xl w-full overflow-hidden">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose Chris?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Personal service, professional standards, and competitive prices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-[hsl(var(--card))] rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Personal Service
                </h3>
                <p className="text-white/80">
                  All jobs are completed personally by Chris with care and attention to detail. No subcontractors, no surprises.
                </p>
              </div>

              <div className="text-center p-8 bg-[hsl(var(--card))] rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  SEPA Registered
                </h3>
                <p className="text-white/80">
                  Fully licensed and SEPA registered for waste removal. All waste is disposed of legally and responsibly.
                </p>
              </div>

              <div className="text-center p-8 bg-[hsl(var(--card))] rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Free Quotes
                </h3>
                <p className="text-white/80">
                  Get a free, no-obligation quote via WhatsApp, phone, or Facebook Messenger. Quick responses guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
        
        <Footer />
      </main>
    </>
  );
};

export default Services;

