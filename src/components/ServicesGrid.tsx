import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Package, Trash2, ShoppingCart, Home, Scissors, Wrench } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import { trackServiceClick } from "@/utils/analytics";

const ServicesGrid = () => {
  const services = [
    {
      title: "Small Removals",
      slug: "small-removals",
      description: "Professional small removal services in Cumnock and surrounding areas",
      features: ["House moves", "Office relocations", "Furniture transport", "Personal service"],
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Truck,
      color: "primary-orange"
    },
    {
      title: "Courier Services",
      slug: "courier",
      description: "Reliable courier and delivery services across Ayrshire",
      features: ["Same-day delivery", "Package collection", "Secure transport"],
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Package,
      color: "primary-orange"
    },
    {
      title: "Tip Runs & Waste Removal",
      slug: "waste-removal",
      description: "SEPA registered waste removal and tip run services",
      features: ["Bin bag collection", "Garage clearances", "Shed clearances"],
      image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2f2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2f2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Trash2,
      color: "primary-orange"
    },
    {
      title: "In-Store Collection & Delivery",
      slug: "collection-and-delivery",
      description: "Collection from stores and delivery to your door",
      features: ["Furniture stores", "Online purchases", "Same-day service", "Careful handling"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: ShoppingCart,
      color: "primary-orange"
    },
    {
      title: "End-of-Tenancy Clearance",
      slug: "end-of-tenancy",
      description: "Complete property clearance for tenants and landlords",
      features: ["Full property clearance", "Furniture removal"],
      image: "/2.png",
      fallbackImage: "/2.png",
      icon: Home,
      color: "primary-orange"
    },
    {
      title: "Flat Pack Assembly",
      slug: "flat-pack-assembly",
      description: "Professional flat pack furniture assembly service",
      features: ["IKEA furniture", "All major brands", "Tools provided", "Expert assembly"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      fallbackImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: Wrench,
      color: "primary-orange"
    }
  ];

  const handleLearnMoreClick = (serviceTitle: string, serviceSlug: string) => {
    trackServiceClick(serviceTitle, 'services_grid_learn_more');
  };

  return (
    <section id="services" className="relative py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="/vanfront.jpg"
          alt="Chris, Your Man with a Van background"
          className="w-full h-full object-cover object-center"
          fallbackSrc="/vanfront.jpg"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-left mb-16">
          <div className="flex items-center mb-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mr-6">
              MY SERVICES
            </h2>
            <div className="flex-1 h-px bg-white"></div>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            Professional small removals, courier services, tip runs, waste removal, and in-store collection & delivery across Ayrshire & beyond - courier services across the UK. SEPA registered, 5-star service, all jobs done personally with free quotes via WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card-service group flex flex-col h-full">
              {/* Service Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`w-20 h-20 bg-[hsl(var(--${service.color}))] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Service Content */}
              <div className="flex flex-col flex-grow space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/80">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-white/90">
                      <div className="w-1.5 h-1.5 bg-[hsl(var(--primary-orange))] rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a 
                  href={`/services/${service.slug}`}
                  onClick={() => handleLearnMoreClick(service.title, service.slug)}
                  className="mt-auto"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <Button 
                    className="w-full bg-[hsl(var(--primary-orange))] hover:bg-[hsl(var(--dark-orange))] text-white font-semibold rounded-full group/button"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;