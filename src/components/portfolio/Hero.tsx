import { ArrowDownRight, Download } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative grain pt-10 md:pt-14 pb-20 md:pb-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-center gap-3 chip mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
          Available for select projects — 2026
        </div>

        {/* Editorial grid: 12 cols. Headline + portrait share vertical guides. */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-start">
          {/* Headline — spans 8/12 on desktop, sits flush left */}
          <h1 className="col-span-12 md:col-span-8 font-display font-medium tracking-[-0.045em] text-[clamp(3rem,13vw,12rem)] leading-[0.86] reveal">
            Dhir
            <br />
            <span className="italic font-light text-navy">Agrawal</span>
            <span className="text-win-blue">.</span>
          </h1>

          {/* Portrait — spans 4/12, pulled up to align top with headline cap-height */}
          <figure
            className="hidden md:block col-span-4 hairline rounded-xl aspect-[3/4] bg-secondary overflow-hidden relative reveal mt-2"
            style={{ animationDelay: "200ms" }}
          >
            <img
              src="/portrait.jpg"
              alt="Dhir Agrawal"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white border-b border-white/10 bg-black/40 backdrop-blur-sm z-10">
              <span>● live</span>
              <span>01 · portrait</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white border-t border-white/10 bg-black/40 backdrop-blur-sm z-10">
              <span>Age · 21</span>
              <span>2026</span>
            </div>
          </figure>

          {/* Metadata row — aligned under headline, shares left edge */}
          <div
            className="col-span-12 md:col-span-8 mt-10 md:mt-14 reveal"
            style={{ animationDelay: "120ms" }}
          >
            <dl className="grid grid-cols-3 gap-6 max-w-xl">
              {[
                ["Role", "BCA Graduate"],
                ["Focus", "DS · ML · AI"],
                ["Based", "India"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-foreground pt-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait placeholder for mobile only — shown after metadata */}
          <figure className="md:hidden col-span-12 mt-10 hairline rounded-xl aspect-[4/5] bg-secondary overflow-hidden relative">
            <img
              src="/portrait.jpg"
              alt="Dhir Agrawal"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white border-b border-white/10 bg-black/40 backdrop-blur-sm z-10">
              <span>● live</span>
              <span>01 · portrait</span>
            </div>
          </figure>

          {/* Lede + CTAs — span 8, kept on the same left guide as headline */}
          <div
            className="col-span-12 md:col-span-8 mt-10 md:mt-12 reveal"
            style={{ animationDelay: "180ms" }}
          >
            <p className="font-display text-2xl md:text-[2rem] leading-[1.2] max-w-2xl">
              I graduated from BCA —
              <span className="text-muted-foreground">
                {" "}seeking internships where I can apply statistical modeling, predictive algorithms, and AI systems.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-md font-medium hover:bg-navy transition-colors"
              >
                Selected Work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border hover:border-foreground transition-colors"
              >
                Get in touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-3 py-3 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                resume.pdf
              </a>
            </div>
          </div>

          {/* Right-rail caption under portrait, aligned to portrait's left guide */}
          <aside
            className="hidden md:block col-span-4 mt-10 md:mt-12 reveal"
            style={{ animationDelay: "260ms" }}
          >
            <div className="border-t border-foreground pt-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Issue Nº 01 · MMXXVI
              </div>
              <p className="mt-2 font-display italic text-base leading-snug text-foreground/80">
                "Designing software with the patience of an editor."
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="absolute -bottom-16 left-0 right-0 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[28vw] leading-none text-center">developer</div>
      </div>
    </section>
  );
}
