import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is MediaCodex used for?", a: "MediaCodex is a video infrastructure platform that handles transcoding, secure delivery, and streaming. Teams use it to upload video once, process it automatically, and deliver it globally with embeds or urls." },
  { q: "Can I use it with my existing app?", a: "Yes. MediaCodex provides REST APIs, embeddable players, and webhooks so you can integrate video directly into your product, LMS, or CMS." },
  { q: "Does it support secure playback?", a: "Absolutely. You can enable signed URLs, domain restrictions, and access controls to protect premium content from unauthorized viewing." },
  { q: "Can I integrate through API?", a: "Yes. Our API-first design lets you automate uploads, monitor transcode jobs, and manage playback settings programmatically." },
  { q: "Is it suitable for course platforms?", a: "Definitely. Many course creators use MediaCodex to host, protect, and deliver video lessons with DRM-level security and smooth playback." },
  { q: "Do you offer enterprise support?", a: "Yes. Enterprise plans include dedicated support, custom SLAs, SSO, and tailored integrations for large-scale operations." },
];

const FAQ = () => (
  <section className="section-padding bg-surface" id="resources">
    <div className="container-narrow max-w-3xl">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Frequently asked questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="card-elevated px-6 border rounded-xl">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
