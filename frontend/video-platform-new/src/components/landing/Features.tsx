import { Repeat, Shield, Code2, BarChart3, Server, Play } from "lucide-react";

const features = [
  { icon: Repeat, title: "Video transcoding", desc: "Convert files into the right formats and bitrates automatically." },
  { icon: Shield, title: "Secure delivery", desc: "Protect content with access controls, signed URLs, and playback restrictions." },
  // { icon: Play, title: "Easy embeds", desc: "Drop video into your product with simple embed support." },
  // { icon: Code2, title: "Developer APIs", desc: "Automate upload, processing, and delivery in your workflow." },
  // { icon: BarChart3, title: "Analytics", desc: "Track views, playback health, and performance in one dashboard." },
  { icon: Server, title: "Scalable infrastructure", desc: "Built for reliable delivery as your usage grows." },
];

const Features = () => (
  <section className="section-padding" id="product">
    <div className="container-narrow">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Everything you need to manage video delivery
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A complete toolkit for upload, processing, protection, and streaming.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="card-elevated p-6">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <f.icon size={20} className="text-accent-foreground" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
