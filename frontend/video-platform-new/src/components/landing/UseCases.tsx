import { GraduationCap, Blocks, ShoppingBag, Newspaper, ArrowRight } from "lucide-react";

const cases = [
  {
    icon: GraduationCap,
    title: "Course creators",
    description: "Protect paid content and deliver lessons securely.",
  },
  {
    icon: Blocks,
    title: "SaaS / product teams",
    description: "Embed video workflows directly into your app.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description: "Stream product videos that load fast and convert better.",
  },
  {
    icon: Newspaper,
    title: "Media / publishing",
    description: "Transcode and deliver video at scale with confidence.",
  },
];

const UseCases = () => (
  <section className="section-padding bg-surface" id="solutions">
    <div className="container-narrow">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Built for industries that rely on video
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From course platforms to product teams, MediaCodex fits your workflow.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cases.map((c) => (
          <div
            key={c.title}
            className="card-elevated p-6 group cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
              <c.icon size={20} className="text-accent-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.description}</p>
            <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn more <ArrowRight size={14} />
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
