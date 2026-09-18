import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { WindowFrame } from "./WindowFrame";

const projects = [
  {
    n: "01",
    title: "Dhir’s Pit Wall",
    fullName: "Dhir’s Pit Wall — F1 2026 Race Prediction Dashboard",
    kind: "Machine Learning · Telemetry",
    year: "2026",
    body: "An end-to-end ML pipeline pulling live F1 API telemetry via FastF1 to engineer 13 driver features. Trained an XGBoost classifier (F1: 0.857, AUC: 0.968) using Leave One Race Out cross-validation on 2026 season data. Serves live predictions via a cached FastAPI backend and React frontend.",
    stack: ["Python", "XGBoost", "FastF1", "FastAPI", "React", "TailwindCSS"],
    accent: "var(--burgundy)",
    source: "https://github.com/dhir-1",
    live: "https://dhirs-pit-wall.vercel.app/",
  },
  {
    n: "02",
    title: "Lexis",
    fullName: "Lexis — Real-Time Sign Language & Speech Interpreter",
    kind: "Deep Learning · WebSockets",
    year: "2026",
    body: "A real-time full-stack interpreter bridging sign language and speech. Recognizes full ASL words from video using a custom bidirectional GRU model trained on the WLASL dataset on a T4 GPU. Features a FastAPI WebSocket server for frame streaming, and a RAG pipeline utilizing ChromaDB + Gemini Flash.",
    stack: ["Python", "PyTorch", "GRU", "FastAPI", "React", "ChromaDB", "Gemini Flash", "Whisper"],
    accent: "oklch(0.62 0.16 290)",
    status: "In Development",
    source: "https://github.com/dhir-1",
  },
  {
    n: "03",
    title: "Multi-Agent Financial RAG",
    fullName: "Multi-Agent Financial RAG — SEC Form 10-K Intelligence System",
    kind: "Multi-Agent AI · Financial RAG",
    year: "2026",
    status: "Completed",
    body: "An institutional-grade multi-agent RAG pipeline built with LangGraph for analyzing SEC Form 10-K filings across 10 tech giants. Features dynamic zero-hardcoding filing registry, 50/50 balanced entity dispatch, a calibrated CPU cross-encoder confidence gate (FlashRank), schema-bounded adaptive synthesis with strict SEC citations [TICKER, Section], and deterministic mathematical guardrails.",
    stack: ["Python", "LangGraph", "Groq (gpt-oss-20b)", "ChromaDB", "BM25", "FlashRank", "FastAPI"],
    accent: "oklch(0.65 0.18 160)",
    source: "https://github.com/dhir-1/Multi_rag",
  },
  {
    n: "04",
    title: "Churno",
    fullName: "Churno — Customer Churn Prediction System",
    kind: "Machine Learning · Analytics",
    year: "2026",
    body: "Full-stack machine learning application to predict telecom customer churn using an XGBoost pipeline. Features a high-performance FastAPI REST backend for real-time inference, PostgreSQL database history tracking, and a React dashboard utilizing Recharts.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "PostgreSQL", "TailwindCSS"],
    accent: "var(--win-blue)",
    source: "https://github.com/dhir-1/Churno",
  },
];

export function Work() {
  return (
    <section id="work" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14 reveal-on-scroll">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="text-win-blue">§ 03</span> — Featured Work
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.02]">
              Selected projects,
              <br />
              <span className="italic font-light text-navy">honest case studies.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-muted-foreground max-w-xs">
            Each project is built end-to-end. Code, design, and the messy middle.
          </div>
        </div>

        <div className="space-y-12">
          {projects.map((p, idx) => (
            <div
              key={p.n}
              className="reveal-on-scroll group"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <WindowFrame
                title={`~/projects/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                subtitle="case-study"
                status={p.status || p.year}
              >
                <div className="grid md:grid-cols-12 gap-0">
                  <div className={`md:col-span-7 p-8 md:p-12 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-3">
                      <span style={{ color: p.accent }}>● {p.n}</span>
                      <span>{p.kind}</span>
                      {p.status && (
                        <span className="ml-auto text-[9px] font-mono border border-purple-500/30 text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                          {p.status}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight">
                      {p.fullName}
                    </h3>
                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/80">
                      {p.body}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-10 flex items-center gap-6">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 font-medium border-b border-foreground pb-1 hover:gap-3 transition-all"
                        >
                          Live Demo
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                        </a>
                      )}
                      {p.source && (
                        <a
                          href={p.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          source code ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div
                    className={`md:col-span-5 relative min-h-[300px] md:min-h-0 border-t md:border-t-0 ${
                      idx % 2 === 1 ? "md:border-r md:order-1" : "md:border-l"
                    } border-border overflow-hidden flex items-center justify-center`}
                    style={{
                      background: `linear-gradient(135deg, ${p.accent} 0%, oklch(0.18 0.012 260) 140%)`,
                    }}
                  >
                    <div className="absolute inset-6 rounded-lg border border-white/15 grain" />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/70 border-t border-white/10 bg-black/10 backdrop-blur-[2px]">
                      <span>preview · {p.n}</span>
                      <span>{p.year}</span>
                    </div>
                    
                    {/* Custom Visual Previews */}
                    {p.n === "01" && (
                      <div className="relative group-hover:scale-105 group-hover:rotate-[2deg] transition-all duration-500 ease-out flex items-center justify-center">
                        <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-xl" />
                        <img
                          src="/ICON.png"
                          alt="Dhir’s Pit Wall Icon"
                          className="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 relative z-10"
                        />
                      </div>
                    )}

                    {p.n === "02" && (
                      <div className="relative w-4/5 h-3/5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col justify-between p-4 group-hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center justify-between text-[8px] font-mono text-white/40 tracking-wider">
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                            CAMERA_FEED [ACTIVE]
                          </span>
                          <span>60 FPS</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                          <svg className="w-full h-full text-purple-300 opacity-60 group-hover:opacity-80 transition-opacity" viewBox="0 0 100 100">
                            {/* Hand skeleton path */}
                            <polyline points="50,90 50,60 30,42 22,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="50,60 45,35 40,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="50,60 58,35 63,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="50,60 70,45 78,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Joint dots */}
                            <circle cx="50" cy="90" r="3" className="fill-purple-400/50 animate-ping" />
                            <circle cx="50" cy="90" r="2" className="fill-purple-400" />
                            <circle cx="50" cy="60" r="2" className="fill-purple-400" />
                            <circle cx="30" cy="42" r="2" className="fill-purple-400" />
                            <circle cx="22" cy="25" r="2" className="fill-purple-400" />
                            <circle cx="45" cy="35" r="2" className="fill-purple-400" />
                            <circle cx="40" cy="15" r="2" className="fill-purple-400" />
                            <circle cx="58" cy="35" r="2" className="fill-purple-400" />
                            <circle cx="63" cy="15" r="2" className="fill-purple-400" />
                            <circle cx="70" cy="45" r="2" className="fill-purple-400" />
                            <circle cx="78" cy="25" r="2" className="fill-purple-400" />
                          </svg>
                        </div>
                        <div className="flex items-end justify-between font-mono text-[9px] text-purple-300/80">
                          <span>ASL: "HELLO"</span>
                          <span>CONFIDENCE: 98.7%</span>
                        </div>
                      </div>
                    )}

                    {p.n === "03" && (
                      <div className="relative w-[85%] rounded-xl border border-emerald-500/25 bg-black/50 backdrop-blur-md overflow-hidden flex flex-col justify-between p-4 group-hover:border-emerald-500/45 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        {/* Status bar */}
                        <div className="flex items-center justify-between text-[8px] font-mono text-emerald-400/70 tracking-wider pb-2 border-b border-white/5">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-emerald-300 font-semibold">LANGGRAPH_PIPELINE [ACTIVE]</span>
                          </span>
                          <span className="text-white/40">SEC 10-K · 10 FIRMS</span>
                        </div>

                        {/* Pipeline Node visualization */}
                        <div className="py-2.5 space-y-1.5 font-mono text-[9px]">
                          <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-white/5 border border-white/10">
                            <span className="text-white/60 flex items-center gap-1.5">
                              <span className="text-emerald-400">⚡</span>
                              <span>ENTITY DISPATCH:</span>
                            </span>
                            <span className="text-emerald-400 font-medium">50/50 BALANCED</span>
                          </div>

                          <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-white/5 border border-white/10">
                            <span className="text-white/60 flex items-center gap-1.5">
                              <span className="text-cyan-400">◆</span>
                              <span>FLASHRANK ONNX:</span>
                            </span>
                            <span className="text-cyan-300 font-medium">CONFIDENCE ≥ 0.001</span>
                          </div>

                          <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-white/70 flex items-center gap-1.5">
                              <span className="text-emerald-400">✓</span>
                              <span>SEC CITATION AUDIT:</span>
                            </span>
                            <span className="text-emerald-300 font-semibold">[TICKER, Section]</span>
                          </div>
                        </div>

                        {/* Bottom chips / metrics */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-white/50">
                          <div className="flex gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">[NVDA, Item 7]</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">[AMD, Item 1A]</span>
                          </div>
                          <span className="text-emerald-400/90 font-medium">0 TOKENS PRE-FLIGHT</span>
                        </div>
                      </div>
                    )}

                    {p.n === "04" && (
                      <div className="font-display italic text-white/85 text-4xl md:text-5xl rotate-[-4deg] tracking-tight text-center px-4 group-hover:scale-105 group-hover:rotate-[-2deg] transition-transform duration-500">
                        {p.title}
                      </div>
                    )}
                  </div>
                </div>
              </WindowFrame>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center reveal-on-scroll">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-card/50 hover:bg-secondary hover:border-foreground hover:-translate-y-0.5 transition-all duration-300 font-mono text-xs tracking-wider uppercase group shadow-sm"
          >
            <span>explore_more_projects.sh</span>
            <span className="text-win-blue group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
