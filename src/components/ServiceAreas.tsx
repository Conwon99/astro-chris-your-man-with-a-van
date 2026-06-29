import { MapPin } from "lucide-react";
import { trackPhoneCall, trackWhatsAppClick, trackWhatsAppMessage } from "@/utils/analytics";

const ServiceAreas = () => {
  const handleCallClick = () => {
    trackPhoneCall('service_areas');
    window.location.href = "tel:+447735852822";
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('service_areas');
    trackWhatsAppMessage('service_areas');
  };
  const serviceAreas = [
    { name: "Cumnock", slug: "cumnock" },
    { name: "Ayr", slug: "ayr" },
    { name: "Kilmarnock", slug: "kilmarnock" },
    { name: "Irvine", slug: "irvine" },
    { name: "Troon", slug: "troon" },
    { name: "Prestwick", slug: "prestwick" },
    { name: "Maybole", slug: "maybole" },
    { name: "Girvan", slug: "girvan" },
    { name: "Stewarton", slug: "stewarton" },
    { name: "Dalrymple", slug: "dalrymple" },
    { name: "Mauchline", slug: "mauchline" },
    { name: "Dalmellington", slug: "dalmellington" },
    { name: "Patna", slug: "patna" },
    { name: "Auchinleck", slug: "auchinleck" },
    { name: "Dreghorn", slug: "dreghorn" },
    { name: "Kilwinning", slug: "kilwinning" },
    { name: "Beith", slug: "beith" },
    { name: "Dalry", slug: "dalry" },
    { name: "Largs", slug: "largs" },
    { name: "Saltcoats", slug: "saltcoats" },
    { name: "Ardrossan", slug: "ardrossan" },
    { name: "Darvel", slug: "darvel" },
    { name: "Newmilns", slug: "newmilns" },
    { name: "Galston", slug: "galston" },
    { name: "Kirkconnel", slug: "kirkconnel" },
    { name: "Sanquhar", slug: "sanquhar" },
    { name: "Mossblown", slug: "mossblown" }
  ];

  return (
    <section id="service-areas" className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <div className="flex items-center mb-4">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mr-6">
              <span className="text-primary">SERVICE</span> AREAS
            </h2>
            <div className="flex-1 h-px bg-[hsl(var(--asphalt-grey))]"></div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We proudly serve Cumnock and surrounding areas across Ayrshire. <strong className="text-primary">Courier services are available across the UK.</strong> Contact us to confirm coverage for your specific location. <a href="/locations" className="text-primary hover:underline font-semibold">View all service locations →</a>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Coverage Area */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border-2 border-primary/20">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-background">
                <div className="text-center p-8 space-y-4">
                  <MapPin className="w-16 h-16 text-primary mx-auto" />
                  <div>
                    <h3 className="font-display font-bold text-2xl text-primary mb-2">
                      Ayrshire Coverage Area
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Serving Cumnock and surrounding areas
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Cumnock,+Ayrshire,+Scotland"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 rounded-lg text-white font-semibold text-sm bg-primary hover:bg-[hsl(19_67%_39%)] transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Service areas list */}
          <div className="space-y-8">

            <div className="grid grid-cols-2 gap-4">
              {serviceAreas.map((area, index) => (
                <a
                  key={index}
                  href={`/locations/${area.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {area.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <h4 className="font-display font-bold text-xl text-foreground mb-3">
                Need Service Outside These Areas?
              </h4>
              <p className="text-muted-foreground mb-4">
                We may be able to help with services outside our main coverage area. <strong className="text-primary">Courier services are available across the UK</strong> - contact us to discuss your specific needs and we'll do our best to accommodate you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+447735852822"
                  onClick={handleCallClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  Call 07735 852822
                </a>
                <a
                  href="https://wa.me/447735852822"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  WhatsApp Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
