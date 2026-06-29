import LazyImage from "@/components/LazyImage";

const BeforeImage = () => {
  return (
    <section id="before" className="py-16 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            BEFORE
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This is how your property looks before our professional clearance service
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="aspect-video">
            <LazyImage
              src="/1.png"
              alt="Property before clearance work - cluttered and in need of professional service"
              className="w-full h-full object-cover"
              fallbackSrc="/1.png"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="font-semibold text-xl mb-2">Property Clearance Project</h3>
            <p className="text-white/90">Ayrshire - Before Service</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don't let clutter overwhelm your space. Our professional team can transform any property.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeImage;










