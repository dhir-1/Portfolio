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
    title: "FoodGuard India",
    fullName: "FoodGuard India — Food Security Early Warning System",
    kind: "Machine Learning · Forecasting",
    year: "2026",
    body: "A 2-step ML early warning system combining Random Forest retail price growth forecasts with rainfall deficits and baseline nutrition into a risk index. Built on a 2.1M retail price panel and daily rainfall records, yielding 3.49% MAE. Shipped as a Streamlit dashboard.",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Plotly", "Streamlit"],
    accent: "var(--teal)",
    source: "https://github.com/dhir-1/Food-Crisis-India",
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
                      <div className="relative group-hover:scale-110 group-hover:rotate-[6deg] transition-all duration-500 ease-out flex items-center justify-center">
                        <div className="absolute -inset-4 bg-teal/10 rounded-full blur-xl animate-pulse" />
                        <span className="text-8xl select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] relative z-10">
                          🌾
                        </span>
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
