const stats = [
  { value: "10×", label: "Faster publishing" },
  { value: "60%", label: "Reduced delivery overhead" },
  { value: "99.9%", label: "Playback reliability" },
  { value: "100%", label: "Secure content access" },
];

const Metrics = () => (
  <section className="section-padding bg-surface">
    <div className="container-narrow">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Metrics;
