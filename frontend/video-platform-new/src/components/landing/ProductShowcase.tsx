import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const checklist = [
  "Adaptive video optimization",
  "Global CDN distribution & caching",
  "Protected video streaming using signed tokens and URL expiration",
];

const ProductShowcase = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            One platform for business video hosting and streaming.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            MediaCodex helps Small Businesses, Enterprises & Creative Teams to manage and stream video securely with scalable infrastructure and global delivery.
          </p>
          <ul className="space-y-3 mb-8">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-accent-foreground" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <Button size="lg">Explore the platform</Button>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
          <img
            src={dashboardMockup}
            alt="MediaCodex platform overview"
            width={1280}
            height={800}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ProductShowcase;
