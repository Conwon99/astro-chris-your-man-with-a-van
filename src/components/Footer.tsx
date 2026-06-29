import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { trackExternalLink, trackNavigation, trackFacebookPageClick } from "@/utils/analytics";
import { openConsentBanner } from "@/utils/consentManager";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white py-16 px-4" style={{ backgroundImage: 'url(/footer2.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-[hsl(var(--sunshine-yellow))] mb-4">
                Chris, Your Man with a Van
              </h3>
              <p className="text-white leading-relaxed">
                Friendly, reliable van services across Cumnock and surrounding Ayrshire areas. 
                Professional small removals, courier services, tip runs, waste removal, flat-pack assembly & in-store collection & delivery with a personal touch.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[hsl(var(--sunshine-yellow))]" />
                <span className="text-white">+44 7735 852822</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[hsl(var(--sunshine-yellow))]" />
                <a href="mailto:chris@chrisyourmanwithavan.com" className="text-white hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  chris@chrisyourmanwithavan.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[hsl(var(--sunshine-yellow))]" />
                <span className="text-white">WhatsApp: 07735 852822</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[hsl(var(--sunshine-yellow))]" />
                <span className="text-white">Cumnock & Ayrshire, Scotland</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl font-bold text-[hsl(var(--sunshine-yellow))] mb-6">
              Our Services
            </h4>
            <ul className="space-y-3 text-white">
              <li>
                <a href="/services/small-removals" onClick={() => trackNavigation('services_small_removals')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Small Removals & House Moves
                </a>
              </li>
              <li>
                <a href="/services/courier" onClick={() => trackNavigation('services_courier')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Courier Services & Delivery
                </a>
              </li>
              <li>
                <a href="/services/waste-removal" onClick={() => trackNavigation('services_waste_removal')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Tip Runs & Waste Removal
                </a>
              </li>
              <li>
                <a href="/services/flat-pack-assembly" onClick={() => trackNavigation('services_flat_pack')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Flat-Pack Assembly
                </a>
              </li>
              <li>
                <a href="/services/collection-and-delivery" onClick={() => trackNavigation('services_collection')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • In-Store Collection & Delivery
                </a>
              </li>
              <li>
                <a href="/services/end-of-tenancy" onClick={() => trackNavigation('services_end_tenancy')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • End-of-Tenancy Clearance
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display text-xl font-bold text-[hsl(var(--sunshine-yellow))] mb-6">
              Service Areas
            </h4>
            <ul className="space-y-3 text-white">
              <li>
                <a href="/locations/irvine" onClick={() => trackNavigation('footer_irvine')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Man with a Van Irvine
                </a>
              </li>
              <li>
                <a href="/locations/ayr" onClick={() => trackNavigation('footer_ayr')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Man with a Van Ayr
                </a>
              </li>
              <li>
                <a href="/locations/kilmarnock" onClick={() => trackNavigation('footer_kilmarnock')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Man with a Van Kilmarnock
                </a>
              </li>
              <li>
                <a href="/locations/troon" onClick={() => trackNavigation('footer_troon')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Man with a Van Troon
                </a>
              </li>
              <li>
                <a href="/locations/kilwinning" onClick={() => trackNavigation('footer_kilwinning')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Man with a Van Kilwinning
                </a>
              </li>
              <li>
                <a href="/locations/ardrossan" onClick={() => trackNavigation('footer_ardrossan')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • Man with a Van Ardrossan
                </a>
              </li>
              <li>
                <a href="/locations" onClick={() => trackNavigation('locations')} className="hover:text-[hsl(var(--sunshine-yellow))] transition-colors">
                  • View All Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-display text-xl font-bold text-[hsl(var(--sunshine-yellow))] mb-6">
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/chrisyourmanwithavankilmarnock" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  trackExternalLink('https://www.facebook.com/chrisyourmanwithavankilmarnock', 'Facebook');
                  trackFacebookPageClick('footer');
                }}
                className="flex items-center gap-2 text-[hsl(var(--sunshine-yellow))] hover:text-[hsl(var(--donut-pink))] transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[hsl(var(--sunshine-yellow))] pt-8 space-y-6">
          <address className="not-italic text-white/90 text-sm text-center md:text-left leading-relaxed max-w-xl">
            <p className="font-medium text-white">Chris, your man with a Van Ltd</p>
            <p>SC 882440</p>
            <p>Registered in Scotland</p>
            <p>
              147 Glaisnock street
              <br />
              KA18 1JT
            </p>
          </address>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[hsl(var(--sunshine-yellow))] text-sm">
              © {currentYear} Chris, Your Man with a Van. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1 text-sm">
              <a
                href="/privacy-policy"
                className="text-[hsl(var(--sunshine-yellow))] hover:text-white transition-colors underline"
              >
                Privacy Policy
              </a>
              <button
                onClick={openConsentBanner}
                className="text-[hsl(var(--sunshine-yellow))] hover:text-white transition-colors underline bg-transparent border-0 cursor-pointer p-0 text-sm"
              >
                Cookie Settings
              </button>
              <a
                href="https://codapixel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--sunshine-yellow))] hover:text-white transition-colors underline"
              >
                Website by CodaPixel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;