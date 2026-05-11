const columns = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
  { title: "Solutions", links: ["Course creators", "SaaS teams", "E-commerce", "Media"] },
  { title: "Resources", links: ["Docs", "API reference", "Blog", "Status"] },
  { title: "Company", links: ["About", "Contact", "Careers", "Privacy", "Terms"] },
];

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container-narrow px-4 py-14">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <a href="/" className="font-display text-lg font-bold text-foreground">
            <span className="text-gradient">M</span>ediaCodex
          </a>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Video Hosting and streaming for your business.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-10 pt-6 text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} MediaCodex. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
