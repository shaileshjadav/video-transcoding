const codeSnippet = `// Upload a video
const res = await fetch("https://api.mediacodex.com/v1/upload", {
  method: "POST",
  headers: { "Authorization": "Bearer mc_sk_..." },
  body: formData,
});

// Check transcode status
const job = await fetch(\`/v1/jobs/\${res.id}\`);
// { status: "complete", outputs: ["720p", "1080p", "hls"] }

// Embed playback
<iframe src="https://play.mediacodex.com/v/abc123" />`;

const DeveloperSection = () => (
  <section className="section-padding" id="docs">
    <div className="container-narrow">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">
            For developers
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            Built for developers who want control without complexity
          </h2>
          <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <li>• API-first workflow with clean documentation</li>
            <li>• Webhooks for real-time job notifications</li>
            <li>• Custom playback integration</li>
            <li>• Secure token-based access</li>
            <li>• Automation-friendly architecture</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-foreground text-primary-foreground p-6 overflow-x-auto font-mono text-xs leading-relaxed shadow-xl">
          <div className="flex gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-primary-foreground/20" />
            <span className="w-3 h-3 rounded-full bg-primary-foreground/20" />
            <span className="w-3 h-3 rounded-full bg-primary-foreground/20" />
          </div>
          <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
        </div>
      </div>
    </div>
  </section>
);

export default DeveloperSection;
