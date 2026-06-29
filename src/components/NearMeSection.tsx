import { MapPin, Star } from "lucide-react";
import { trackNavigation } from "@/utils/analytics";
import { isLowRankingLocation } from "@/data/locationServices";

const westTowns = [
  { name: "Irvine", slug: "irvine" },
  { name: "Ayr", slug: "ayr" },
  { name: "Kilmarnock", slug: "kilmarnock" },
  { name: "Troon", slug: "troon" },
  { name: "Ardrossan", slug: "ardrossan" },
  { name: "Prestwick", slug: "prestwick" },
  { name: "Kilwinning", slug: "kilwinning" },
  { name: "Saltcoats", slug: "saltcoats" },
];

const getTownHref = (slug: string) =>
  isLowRankingLocation(slug)
    ? `/locations/${slug}/small-removals`
    : `/locations/${slug}`;

const NearMeSection = () => {
  return (
    <section className="py-16 px-4 bg-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Man with a Van Near Me in Ayrshire
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Searching for a man with a van near you? Chris serves towns across Ayrshire with removals,
            courier, waste removal, and more — backed by <strong className="text-primary">77 five-star Google reviews</strong>.
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-semibold">
            <Star className="w-5 h-5 fill-current" />
            <span>5.0 rating · 77 Google reviews · SEPA registered</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {westTowns.map((town) => (
            <a
              key={town.slug}
              href={getTownHref(town.slug)}
              onClick={() => trackNavigation(`near_me_${town.slug}`)}
              className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors group"
            >
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                Man with a Van {town.name}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/locations"
            onClick={() => trackNavigation('near_me_all_locations')}
            className="text-primary hover:underline font-semibold"
          >
            View all service locations across Ayrshire →
          </a>
        </div>
      </div>
    </section>
  );
};

export default NearMeSection;
