import { Facebook, MessageSquare } from "lucide-react";
import AboutImageCollage from "@/components/AboutImageCollage";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-4 bg-[hsl(var(--asphalt-grey))]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight">
                ABOUT ME
              </h2>
              <div className="w-16 h-1 bg-primary"></div>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                Hi, I'm Chris! I'm your local go-to for all things van services in Cumnock and across Ayrshire and beyond. I'm a quality-driven, SEPA registered professional turning your moving and delivery needs into reality—one job at a time. Always happy to help, no job is too small.
              </p>

              <GoogleReviewsBadge goldStars />
              
              {/* Social Media Icons */}
              <div className="space-y-4">
                <p className="text-white/80 text-sm font-medium">
                  Follow me on Facebook for updates and reviews!
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.facebook.com/chrisyourmanwithavankilmarnock" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="Follow Chris on Facebook"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://wa.me/447735852822" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                    aria-label="Contact Chris on WhatsApp"
                  >
                    <MessageSquare className="w-6 h-6 text-[hsl(var(--asphalt-grey))]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image Collage */}
          <AboutImageCollage />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;