import { Shield, MapPin, Star, Phone } from "lucide-react";

const TrustBar = () => {
  const trustItems = [
    {
      icon: MapPin,
      text: "Cumnock & Ayrshire"
    },
    {
      icon: Shield,
      text: "SEPA Registered"
    },
    {
      icon: Phone,
      text: "Free Quotes"
    },
    {
      icon: Star,
      text: "5★ Service"
    }
  ];

  return (
    <section className="py-8 bg-green-600">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-[hsl(var(--trust-foreground))]">
              <item.icon className="w-6 h-6" />
              <span className="font-semibold text-lg">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;