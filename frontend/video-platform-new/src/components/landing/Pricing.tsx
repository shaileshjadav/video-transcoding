import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "For individuals and small projects",
    features: ["50 GB storage", "Basic transcoding", "Embed player", "Community support", "API access"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$99",
    desc: "For growing teams and products",
    features: ["500 GB storage", "Advanced transcoding", "Secure playback", "Priority support", "Webhooks & analytics", "Custom player branding"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large-scale media operations",
    features: ["Unlimited storage", "Premium transcoding", "SSO & access controls", "Dedicated support", "SLA guarantee", "Custom integrations"],
    popular: false,
  },
];

const Pricing = () => (
  <section className="section-padding" id="pricing">
    <div className="container-narrow">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Start free. Scale as you grow. No surprise fees.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 flex flex-col ${
              p.popular
                ? "border-primary shadow-lg ring-1 ring-primary/20 relative"
                : "border-border bg-card"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">{p.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{p.desc}</p>
            <p className="font-display text-4xl font-bold text-foreground mb-1">
              {p.price}
              {p.price !== "Custom" && <span className="text-base font-normal text-muted-foreground">/mo</span>}
            </p>
            <ul className="space-y-2 my-6 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={p.popular ? "default" : "outline"} className="w-full">
              {p.price === "Custom" ? "Contact sales" : "Get started"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
