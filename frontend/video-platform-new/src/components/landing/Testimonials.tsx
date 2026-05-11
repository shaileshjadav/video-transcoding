const testimonials = [
  {
    quote: "We launched video delivery in days, not weeks. MediaCodex handled everything we needed out of the box.",
    name: "Sarah Kim",
    role: "Growth Lead",
  },
  {
    quote: "Our course content is now easier to protect and deliver. Students get a smooth experience every time.",
    name: "James Okonkwo",
    role: "Content Ops Manager",
  },
  {
    quote: "The workflow feels simple, but the infrastructure is powerful. It's exactly what our engineering team wanted.",
    name: "Priya Mehta",
    role: "CTO",
  },
];

const Testimonials = () => (
  <section className="section-padding bg-surface">
    <div className="container-narrow">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Trusted by teams shipping video
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="card-elevated p-6 flex flex-col">
            <p className="text-foreground text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
