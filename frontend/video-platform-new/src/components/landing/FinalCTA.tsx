import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <div className="rounded-3xl bg-foreground text-primary-foreground text-center px-6 py-16 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Start delivering video the smarter way
        </h2>
        <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
          Upload, transcode, secure, and stream with one platform designed for your business.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" variant="secondary" className="gap-2">
            Get started free <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
            Talk to sales
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCTA;
