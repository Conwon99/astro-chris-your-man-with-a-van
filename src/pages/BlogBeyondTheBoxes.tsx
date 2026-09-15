import { useEffect } from "react";
import { PartyPopper, Search, Sparkles, ListChecks } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackWhatsAppMessage } from "@/utils/analytics";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className={className} />
);

const BlogBeyondTheBoxes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("blog_beyond_the_boxes");
    trackWhatsAppMessage("blog_beyond_the_boxes");
    const defaultMessage =
      "Hi Chris! I read your Beyond the Boxes blog post and I'd like a free quote for my house move.";
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
              src="/services/removals.webp"
              alt="Chris, Your Man with a Van — house removals in Ayrshire"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/services/removals.jpg"
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
                Beyond the Boxes
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Time to move house… yay! Here's the honest truth about moving day nerves — and a
                new mini-series to help you get through it.
              </p>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="py-16 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-3xl">
            <div className="prose-blog text-white/85 text-lg leading-relaxed space-y-6">
              <p>
                Time to move house… yay! However, anyone who's moved house knows that the
                excitement of finding a new property can turn into a hair-tearing nightmare with
                alarming speed unless it is planned properly.
              </p>
              <p>We've all been there — me included — and certain aspects are seriously not fun.</p>
              <p>
                You start the property search, looking at property after property that seem
                amazing on the website, hoping that this might be a dream property, only to find
                that it's too small… too shabby… needs too much money to update… is not in the
                desired location… you know what I mean. That alone can deplete your energy
                reserves!
              </p>
              <p>BUT… finally you've found THE ONE!</p>
              <p>
                You've negotiated through bids, the price, what goes and what stays in the house,
                estate agents, banks, mortgages, notaries… and it's DONE! A moving date has been
                agreed!
              </p>
              <p>
                And you breathe a sigh of relief and try not to even go anywhere near the thought
                that you need to pack all the stuff you've accumulated over however many years
                living in this property.
              </p>
              <p>
                Just the thought of trying to declutter through all the pots and pans, and tens of
                plates, and the 46 mugs that are lurking in the back of the kitchen cupboards can
                be, quite simply, overwhelming.
              </p>
              <p>
                …and let's not even think of the fact that, though the kids are nearly teenagers,
                you've still got the Bugaboo in the shed, and clothes for ages 0–3 months still in
                bags in the loft!
              </p>
              <p>
                We've all been there, we've all got the T-shirt, so no shame coming from me, you
                can believe me!
              </p>

              <div className="rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    No shame here!
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  I live in complete awe of people who live by the one-in-one-out philosophy… I
                  mean, honestly, I bow down in modesty in front of these gurus, but despite my
                  MANY resolutions, I still find myself hanging on to the kids' birthday cards, my
                  mother's mismatched collection of Doulton plates gathering dust in the loft, and
                  a generous assortment of broken Christmas decorations that hold many memories.
                </p>
              </div>

              <p>
                But — I have learned some lessons along the way, and I would like to share them
                with you, with the hope that it will make your house move easier and smoother than
                some of the ones I've had.
              </p>
              <p>
                It would be too long for me to write it all down in one blog. So, I thought it
                would be best if 3 blogs are added in the coming weeks, with test-and-tried tips on
                how to manage your house move like a PRO!
              </p>

              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white pt-4">
                Keep your eyes open for the following blogs:
              </h2>
              <div className="rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-xl flex items-center justify-center flex-shrink-0">
                    <ListChecks className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Coming soon</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <PartyPopper className="w-5 h-5 text-[hsl(var(--sunshine-yellow))] flex-shrink-0 mt-1" />
                    <span className="text-white/80">
                      <strong className="text-white">Part 1:</strong> Streamline Your Move — The
                      Pre-Packing Strategy
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PartyPopper className="w-5 h-5 text-[hsl(var(--sunshine-yellow))] flex-shrink-0 mt-1" />
                    <span className="text-white/80">
                      <strong className="text-white">Part 2:</strong> Pack Like a Pro — Clever
                      Hacks for a Smooth Move
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <PartyPopper className="w-5 h-5 text-[hsl(var(--sunshine-yellow))] flex-shrink-0 mt-1" />
                    <span className="text-white/80">
                      <strong className="text-white">Part 3:</strong> Moving Day Mastery — How to
                      Navigate Through Moving Day and First Night
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                If you'd like a hand with the moving side of things (or any of the other services I
                offer), don't hesitate to get in touch and I'll get back to you as soon as I can.
                Send me a WhatsApp to{" "}
                <a
                  href="tel:+447735852822"
                  className="text-[hsl(var(--primary-orange))] font-semibold hover:underline"
                >
                  07735 852822
                </a>{" "}
                to get a free quote. I work across Cumnock and the wider Ayrshire area. Don't
                forget to follow us on{" "}
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

              <p>
                In the meantime, you can read my other blog on{" "}
                <a href="/blog" className="text-[hsl(var(--primary-orange))] font-semibold hover:underline">
                  SEPA registered waste disposal
                </a>{" "}
                — handy if your move means a tip run too.
              </p>
            </div>

            {/* Key takeaways */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12 not-prose">
              <div className="rounded-xl p-6 border border-white/10 bg-[hsl(var(--card))] text-center">
                <PartyPopper className="w-8 h-8 text-[hsl(var(--sunshine-yellow))] mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  A house move can be exciting and overwhelming in equal measure — you're not alone
                  in feeling that.
                </p>
              </div>
              <div className="rounded-xl p-6 border border-white/10 bg-[hsl(var(--card))] text-center">
                <Search className="w-8 h-8 text-[hsl(var(--sunshine-yellow))] mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  A 3-part mini-series is coming with real, tried-and-tested tips for pre-packing,
                  packing, and moving day itself.
                </p>
              </div>
              <div className="rounded-xl p-6 border border-white/10 bg-[hsl(var(--card))] text-center">
                <Sparkles className="w-8 h-8 text-[hsl(var(--sunshine-yellow))] mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  Need a hand with the move itself? I offer friendly, reliable small removals
                  across Ayrshire.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl p-10 text-center border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                Planning a House Move?
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Get in touch for a free, no-obligation quote. Friendly, reliable and fully insured,
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

export default BlogBeyondTheBoxes;
