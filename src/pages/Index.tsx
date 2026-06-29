import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import AboutUs from "@/components/AboutUs";
import ProjectShowcase from "@/components/ProjectShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import ServiceAreas from "@/components/ServiceAreas";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustBar />
      <AboutUs />
      <ProjectShowcase />
      <ServicesGrid />
      <ServiceAreas />
      <Reviews />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
    </>
  );
};

export default Index;
