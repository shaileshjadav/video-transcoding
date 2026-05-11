const logos = ["StreamVault", "CourseFlow", "Pixelwave", "DataNova", "CloudSync", "MediaPulse"];

const SocialProof = () => (
  <section className="section-padding py-16">
    <div className="container-narrow text-center">
      <p className="text-sm font-medium text-muted-foreground mb-8 tracking-wide uppercase">
        Trusted by growing teams that ship video faster
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {logos.map((name) => (
          <span
            key={name}
            className="font-display text-lg font-semibold text-muted-foreground/40 select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
