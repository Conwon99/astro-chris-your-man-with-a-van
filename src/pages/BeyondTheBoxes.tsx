import { useEffect } from "react";
import { PackageOpen, Sparkles } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackWhatsAppMessage } from "@/utils/analytics";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className={className} />
);

const upcomingParts = [
  {
    number: "Part 1",
    title: "Streamline Your Move: The Pre-Packing Strategy",
  },
  {
    number: "Part 2",
    title: "Pack Like a Pro: Clever Hacks for a Smooth Move",
  },
  {
    number: "Part 3",
    title: "Moving Day Mastery: How to Navigate Through Moving Day and First Night",
  },
];

const BeyondTheBoxes = () => {
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
              alt="Chris, Your Man with a Van — house move packing tips"
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
                Beyond the Boxes!
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Moving house doesn't have to be a nightmare. A new mini-series with tried-and-tested
                tips to help your move go smoother.
              </p>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="py-16 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-3xl">
            <div className="prose-blog text-white/85 text-lg leading-relaxed space-y-6">
              <p>Time to move house… yay!</p>
              <p>
                However, anyone who's moved house knows that the excitement of finding a new
                property can turn into a hair-tearing nightmare with alarming speed unless it is
                planned properly. We've all been there — me included — and certain aspects are
                seriously not fun.
              </p>
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
              <p>We've all been there, we've all got the T-shirt, so no shame coming from me, you can believe me!</p>
              <p>
                I live in complete awe of people who live by the one-in-one-out philosophy… I
                mean, honestly, I bow down in modesty in front of these gurus, but despite my MANY
                resolutions, I still find myself hanging on the kids' birthday cards, my mother's
                mismatched collection of Doulton plates gathering dust in the loft, and a generous
                assortment of broken Christmas decorations that hold many memories.
              </p>

              <div className="rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Lessons learned along the way
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  But — I have learned some lessons along the way, and I would like to share them
                  with you, with the hope that it will make your house move easier and smoother
                  than some of the ones I've had.
                </p>
              </div>

              <p>
                It would be too long for me to write it all down in one blog. So, I thought it
                would be best if 3 blogs are added in the coming weeks, with tried-and-tested tips
                on how to manage your house move like a PRO! 😊
              </p>
              <p>Keep your eyes open for the following blogs:</p>
            </div>

            {/* Upcoming series */}
            <div className="grid gap-4 mt-8 not-prose">
              {upcomingParts.map((part) => (
                <div
                  key={part.number}
                  className="flex items-start gap-4 p-6 rounded-xl bg-[hsl(var(--card))] border border-white/10"
                >
                  <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center flex-shrink-0">
                    <PackageOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[hsl(var(--sunshine-yellow))] text-sm font-semibold uppercase tracking-wide mb-1">
                      {part.number} — Coming soon
                    </p>
                    <h3 className="font-display text-xl font-bold text-white">
                      {part.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl p-10 text-center border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))] not-prose">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                Moving House Soon?
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Get in touch for a free, no-obligation quote. Friendly, reliable removals across
                Cumnock and Ayrshire.
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

export default BeyondTheBoxes;
