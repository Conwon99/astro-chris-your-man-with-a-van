import { useEffect } from "react";
import { AlertTriangle, ShieldCheck, Search, Recycle } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackWhatsAppMessage } from "@/utils/analytics";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className={className} />
);

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("blog_sepa_registered_waste_disposal");
    trackWhatsAppMessage("blog_sepa_registered_waste_disposal");
    const defaultMessage =
      "Hi Chris! I read your blog post on SEPA registered waste disposal and I'd like a free quote for a tip run / waste removal.";
    try {
      const phone = "447735852822";
      const encoded = encodeURIComponent(defaultMessage);
      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
    } catch {}
  };

  return (
    <>
      <main className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.webp"
              alt="Chris, Your Man with a Van — SEPA registered waste disposal"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[hsl(var(--sunshine-yellow))] font-semibold tracking-wide uppercase mb-4">
                Blog
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                SEPA Registered Waste Disposal — Why It's Important
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                What fly-tipping is, why it matters, and how to make sure whoever removes your rubbish is doing it legally.
              </p>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="py-16 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-3xl">
            <div className="prose-blog text-white/85 text-lg leading-relaxed space-y-6">
              <p>
                We've all seen it before… we're driving along the road and spot some rubbish piled
                up at the side. Unsightly…? Yes. Not good for the environment…? Absolutely.
                Illegal…? Most definitely.
              </p>
              <p>
                The act of carrying out waste disposal in this manner is called fly-tipping and
                should always be avoided. Here we explore the reasons why, and what steps you
                should take if you have rubbish that needs removed.
              </p>

              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white pt-4">
                What is fly-tipping?
              </h2>
              <p>
                The term fly-tipping relates to the act of disposing of waste illegally — a
                mattress sitting on the pavement, an old dishwasher or washing machine left
                alongside the motorway and even leaving garden debris — such as grass cuttings,
                plants, etc — on land that is not your own/you don't have a license to do so, all
                comes under the umbrella of fly-tipping.
              </p>
              <p>
                The harm this can do to the environment is self-explanatory. There are, however,
                also financial and legal implications for fly-tipping. Even if you are paying
                someone else to dispose of your waste, you could still be liable to pay a fine if
                they are not SEPA registered. This is why it's important to exert caution when
                choosing someone to get rid of your rubbish — and why you should always check
                their credentials beforehand.
              </p>

              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white pt-4">
                Choosing a SEPA registered agent
              </h2>
              <p>
                That's why it's important to ensure that if you're looking for a waste disposal
                service provider, you choose someone who is registered with the Scottish
                Environment Protection Agency (SEPA). SEPA is an organisation tasked with
                protecting the environment. Employing a business registered with SEPA to remove
                your waste is the best way to be reassured that the person handling and disposing
                of your rubbish is doing so responsibly and legally.
              </p>

              <div className="rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Chris, Your Man with a Van — SEPA registered
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Here, at Chris, Your Man with a Van, I am SEPA registered. This means you can
                  rely on me to remove your waste in the correct manner. First and foremost, all
                  waste will be disposed of legally — no fly-tipping here! I will also endeavour to
                  recycle where possible as opposed to sending to landfill. I will tell you the cost
                  upfront (calculated according to what needs disposed of/the volume) and I will
                  carry out the job effectively, efficiently and punctually. No need to worry about
                  stumbling upon your old couch or otherwise in places you'd least expect to see
                  them!
                </p>
              </div>

              <p>
                So, whether you need to have a home and/or garden clearance, want to get rid of
                unwanted furniture or household items or even require help with excess household
                waste… don't put it off any longer, I am here to assist!
              </p>

              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white pt-4">
                Checking if someone is SEPA registered
              </h2>
              <p>
                It's also worth noting that it can be quick and easy to check if someone is SEPA
                registered or have provided you with a genuine SEPA number. Just head on over to
                the SEPA website and search for your waste carrier/broker. You'll be able to see
                the registration number, current status, when the license expires and what they
                are authorised to do. There is also an explanation as to what each of these terms
                mean. To find me, just search for{" "}
                <span className="text-[hsl(var(--sunshine-yellow))] font-semibold">
                  EAS/R/6100290
                </span>
                .
              </p>

              <p>
                If you'd like to find out more about my Tip Runs and Waste Disposal services (or
                any of the other services I offer), don't hesitate to get in touch and I'll get
                back to you as soon as I can. Send me a WhatsApp to{" "}
                <a
                  href="tel:+447735852822"
                  className="text-[hsl(var(--primary-orange))] font-semibold hover:underline"
                >
                  07735 852822
                </a>{" "}
                to get a free quote. I work across the Cumnock and Ayrshire area. Don't forget to
                follow us on{" "}
                <a
                  href="https://www.facebook.com/chrisyourmanwithavankilmarnock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--primary-orange))] font-semibold hover:underline"
                >
                  Facebook
                </a>{" "}
                to get £5 off your first job.
              </p>
            </div>

            {/* Key takeaways */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12 not-prose">
              <div className="rounded-xl p-6 border border-white/10 bg-[hsl(var(--card))] text-center">
                <AlertTriangle className="w-8 h-8 text-[hsl(var(--sunshine-yellow))] mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  Fly-tipping is illegal, and you can be fined even if someone else dumps your
                  waste for you.
                </p>
              </div>
              <div className="rounded-xl p-6 border border-white/10 bg-[hsl(var(--card))] text-center">
                <Search className="w-8 h-8 text-[hsl(var(--sunshine-yellow))] mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  Always check your waste carrier's SEPA registration on the SEPA website before
                  booking.
                </p>
              </div>
              <div className="rounded-xl p-6 border border-white/10 bg-[hsl(var(--card))] text-center">
                <Recycle className="w-8 h-8 text-[hsl(var(--sunshine-yellow))] mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  SEPA registered EAS/R/6100290 — legal disposal, recycled where possible.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl p-10 text-center border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                Need a Tip Run or Waste Removal?
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Get in touch for a free, no-obligation quote. SEPA registered, fully insured,
                serving Cumnock and across Ayrshire.
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl inline-flex items-center gap-3 text-lg"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Get a Free Quote
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer client:load />
    </>
  );
};

export default Blog;
