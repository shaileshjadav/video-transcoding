import { Upload, Cpu, Globe } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload", desc: "Add your video files or connect via API.", num: "01" },
  { icon: Cpu, title: "Process", desc: "MediaCodex transcodes, optimizes, and prepares playback versions.", num: "02" },
  { icon: Globe, title: "Deliver", desc: "Share secure embeds or stream directly to your audience.", num: "03" },
];

const HowItWorks = () => (
  <section className="section-padding bg-surface">
    <div className="container-narrow">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          How it works
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Three simple steps from raw footage to global delivery.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
              <s.icon size={24} className="text-accent-foreground" />
            </div>
            <span className="font-display text-xs font-semibold text-primary tracking-widest uppercase mb-2 block">
              Step {s.num}
            </span>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
