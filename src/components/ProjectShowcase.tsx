import LazyImage from "@/components/LazyImage";

const ProjectShowcase = () => {
  return (
    <section id="project-showcase" className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Images */}
          <div className="space-y-6">
            {/* Project 1 */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-64 sm:h-72 md:h-80">
                <LazyImage
                  src="/1.png"
                  alt="Property clearance project showing before and after transformation"
                  className="w-full h-full object-cover"
                  fallbackSrc="/1.png"
                  loading="eager"
                />
              </div>
            </div>

            {/* Project 2 */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-64 sm:h-72 md:h-80">
                <LazyImage
                  src="/2.png"
                  alt="Property clearance project showing before and after transformation"
                  className="w-full h-full object-cover"
                  fallbackSrc="/2.png"
                  loading="eager"
                />
              </div>
            </div>
            
            {/* View More Jobs Button - Mobile only */}
            <div className="text-center mt-8 lg:hidden">
              <a
                href="https://www.facebook.com/chrisyourmanwithavankilmarnock"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                View More Jobs on Facebook
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                Professional Results You Can Trust
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These projects demonstrate the quality and attention to detail that sets me apart. 
                Every project is handled personally with the same level of professionalism and care.
              </p>
            </div>

            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-lg">1</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-foreground mb-2">Call or message via WhatsApp/Messenger</h4>
                   <p className="text-muted-foreground">
                     Get in touch with me easily through your preferred communication method.
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-lg">2</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-foreground mb-2">Get a free quote</h4>
                   <p className="text-muted-foreground">
                     I provide transparent pricing with no hidden costs or surprises.
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-lg">3</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-foreground mb-2">Schedule time</h4>
                   <p className="text-muted-foreground">
                     I work around your schedule to find the most convenient time for you.
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-lg">4</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-foreground mb-2">Pay after</h4>
                   <p className="text-muted-foreground">
                     Simple payment after the job is complete - no upfront costs required.
                   </p>
                 </div>
               </div>
            </div>

            {/* Buttons - Desktop side by side, Mobile stacked */}
            <div className="pt-6 flex flex-col lg:flex-row gap-4">
              <a
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-center"
              >
                Get Your Free Quote
              </a>
              
              {/* Facebook button - Desktop only */}
              <a
                href="https://www.facebook.com/chrisyourmanwithavankilmarnock"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                View More Jobs on Facebook
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectShowcase;
