import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trackNavigation } from "@/utils/analytics";

const posts = [
  {
    slug: "beyond-the-boxes",
    title: "Beyond the Boxes!",
    excerpt:
      "Moving house doesn't have to be a nightmare. Kicking off a new mini-series with tried-and-tested tips to help your move go smoother.",
    image: "/services/removals.webp",
    fallbackImage: "/services/removals.jpg",
  },
  {
    slug: "sepa-registered-waste-disposal",
    title: "SEPA Registered Waste Disposal — Why It's Important",
    excerpt:
      "What fly-tipping is, why it matters, and how to make sure whoever removes your rubbish is doing it legally.",
    image: "/vanfront.webp",
    fallbackImage: "/vanfront.jpg",
  },
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[40vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.webp"
              alt="Chris, Your Man with a Van — blog"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                Blog
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Tips, advice and news from Chris, Your Man with a Van.
              </p>
            </div>
          </div>
        </section>

        {/* Post list */}
        <section className="py-16 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-5xl">
            <div className="grid sm:grid-cols-2 gap-8">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={() => trackNavigation(`blog_post_${post.slug}`)}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-[hsl(var(--card))] hover:border-[hsl(var(--primary-orange))]/50 transition-colors"
                >
                  <div className="aspect-[16/9] relative">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="!relative w-full h-full object-cover"
                      fallbackSrc={post.fallbackImage}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[hsl(var(--primary-orange))] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[hsl(var(--primary-orange))] font-semibold text-sm">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer client:load />
    </>
  );
};

export default Blog;
