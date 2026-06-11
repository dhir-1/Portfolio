import { WindowFrame } from "./WindowFrame";

const groups = [
  {
    name: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Vite"],
  },
  {
    name: "Backend",
    items: ["Flask", "Express", "FastAPI", "PostgreSQL", "MongoDB", "REST"],
  },
  {
    name: "Machine Learning",
    items: ["PyTorch", "scikit-learn", "Pandas", "Computer Vision", "HuggingFace", "NumPy"],
  },
  {
    name: "Video & Craft",
    items: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Color", "Sound", "Edit"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-24 md:py-32 bg-secondary/40 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="text-win-blue">§ 02</span> — Capabilities
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.02]">
              A working toolkit,
              <br />
              <span className="italic font-light text-navy">not a buzzword list.</span>
            </h2>
          </div>
          <div className="chip">control panel / v4.2</div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g, i) => (
            <WindowFrame key={g.name} title={g.name.toLowerCase().replace(/\s+/g, "-") + ".cfg"} status={`${g.items.length} items`}>
              <div className="p-5">
                <div className="font-display text-2xl mb-4">
                  <span className="text-muted-foreground font-mono text-sm align-top mr-1">0{i + 1}.</span>
                  {g.name}
                </div>
                <ul className="space-y-2 font-mono text-[13px]">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center justify-between border-t border-dashed border-border pt-2">
                      <span>{it}</span>
                      <span className="text-muted-foreground text-[10px] uppercase tracking-widest">
                        installed
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </WindowFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
