import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  Cpu, 
  Globe, 
  Volume2, 
  Sparkles, 
  Play, 
  Pause,
  AlertTriangle 
} from "lucide-react";
import { WindowFrame } from "@/components/portfolio/WindowFrame";
import { BackgroundShader } from "@/components/portfolio/BackgroundShader";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Dhir Agrawal" },
      {
        name: "description",
        content: "Detailed archive of machine learning, AI speech systems, and full-stack web applications built by Dhir Agrawal.",
      },
    ],
  }),
  component: ProjectsPage,
});

const ALL_PROJECTS = [
  {
    id: "lexis",
    n: "01",
    title: "Lexis",
    fullName: "Lexis — Real-Time Sign Language & Speech Interpreter",
    kind: "Deep Learning · WebSockets",
    year: "2026",
    status: "In Development",
    statusType: "development", // development | progress | hold | completed
    isFlagship: true,
    body: "A real-time full-stack interpreter bridging sign language and speech. Recognizes full ASL words from video using a custom bidirectional GRU model trained on the WLASL dataset. Features a FastAPI WebSocket server for frame streaming, and a RAG pipeline utilizing ChromaDB + Gemini Flash.",
    longBody: "WLASL full-word recognition is a complex temporal modeling challenge. A bidirectional GRU captures both past and future frame context to perform full vocabulary recognition from motion sequences rather than simple fingerspelling. Features a low-latency frame streaming WebSocket, RAG pipeline utilizing ChromaDB + Gemini Flash for context-aware translation, and Groq Whisper speech transcription.",
    stack: ["Python", "PyTorch", "Bidirectional GRU", "FastAPI", "React", "ChromaDB", "Gemini Flash", "Groq Whisper"],
    categories: ["Machine Learning", "Voice & AI"],
    accent: "oklch(0.62 0.16 290)",
    source: "https://github.com/dhir-1",
  },
  {
    id: "pitwall",
    n: "02",
    title: "Dhir’s Pit Wall",
    fullName: "Dhir’s Pit Wall — F1 2026 Race Prediction Dashboard",
    kind: "Machine Learning · Telemetry",
    year: "2026",
    status: "Completed",
    statusType: "completed",
    body: "An end-to-end ML pipeline pulling live F1 API telemetry via FastF1 to engineer 13 driver features. Trained an XGBoost classifier (F1: 0.857, AUC: 0.968) using Leave One Race Out cross-validation on 2026 season data. Serves live predictions via a cached FastAPI backend and React frontend.",
    stack: ["Python", "XGBoost", "FastF1", "FastAPI", "React", "TailwindCSS"],
    categories: ["Machine Learning", "Web Apps"],
    accent: "var(--burgundy)",
    source: "https://github.com/dhir-1",
    live: "https://dhirs-pit-wall.vercel.app/",
  },
  {
    id: "foodguard",
    n: "03",
    title: "FoodGuard India",
    fullName: "FoodGuard India — Food Security Early Warning System",
    kind: "Machine Learning · Forecasting",
    year: "2026",
    status: "Completed",
    statusType: "completed",
    body: "A 2-step ML early warning system combining Random Forest retail price growth forecasts with rainfall deficits and baseline nutrition into a risk index. Built on a 2.1M retail price panel and daily rainfall records, yielding 3.49% MAE. Shipped as a Streamlit dashboard.",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Plotly", "Streamlit"],
    categories: ["Machine Learning"],
    accent: "var(--teal)",
    source: "https://github.com/dhir-1/Food-Crisis-India",
  },
  {
    id: "churno",
    n: "04",
    title: "Churno",
    fullName: "Churno — Customer Churn Prediction System",
    kind: "Machine Learning · Analytics",
    year: "2026",
    status: "Completed",
    statusType: "completed",
    body: "Full-stack machine learning application to predict telecom customer churn using an XGBoost pipeline. Features a high-performance FastAPI REST backend for real-time inference, PostgreSQL database history tracking, and a React dashboard utilizing Recharts.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "PostgreSQL", "TailwindCSS"],
    categories: ["Machine Learning", "Web Apps"],
    accent: "var(--win-blue)",
    source: "https://github.com/dhir-1/Churno",
  },
  {
    id: "vigilo",
    n: "05",
    title: "Vigilo Insights",
    fullName: "Vigilo Insights — Community Crime Reporting & Safety Intelligence Platform",
    kind: "Full-stack Web · AI Scoring",
    year: "2025",
    status: "College Prototype",
    statusType: "completed",
    body: "A community crime map for Surat. Features time-based risk heatmap sliders, AI image verification, and a Trust Score Engine (0-100) analyzing description details, user history, and geolocation data. Includes emergency SOS and route safety planners.",
    stack: ["React", "FastAPI", "PostgreSQL", "Scikit-learn", "MapLibre GL", "Cloudinary", "Resend API"],
    categories: ["Web Apps", "Machine Learning"],
    accent: "oklch(0.55 0.15 40)",
    source: "https://github.com/dhir-1/Vigilo",
  },
  {
    id: "diabetes",
    n: "06",
    title: "Diabetes Clustering",
    fullName: "Global Diabetes Burden Clustering",
    kind: "Unsupervised ML · Clustering",
    year: "2025",
    status: "Completed",
    statusType: "completed",
    body: "Unsupervised learning pipeline that clusters 124 countries by diabetes burden and healthcare capacity. Merges WHO, NCD-RisC, and World Bank datasets, applying StandardScaler, K-Means, PCA, and Isolation Forest anomalies mapping.",
    stack: ["Python", "Pandas", "Scikit-learn", "PCA", "K-Means", "Plotly", "Streamlit"],
    categories: ["Machine Learning"],
    accent: "oklch(0.65 0.12 140)",
  },
  {
    id: "hana",
    n: "07",
    title: "Hana AI Voice Assistant",
    fullName: "Hana — Real-Time AI Voice Assistant",
    kind: "Voice Systems · ONNX Inference",
    year: "2026",
    status: "In Progress",
    statusType: "progress",
    body: "Locally-running voice assistant built from scratch in Python. Combines Silero VAD, faster-whisper, Groq LLaMA, and local Kokoro ONNX TTS with interruption detection, emotion-aware voice speed, and PC app control APIs.",
    stack: ["Python", "ONNX", "Whisper", "VAD", "Groq API", "Sounddevice"],
    categories: ["Voice & AI"],
    accent: "oklch(0.6 0.18 200)",
  },
  {
    id: "kiro",
    n: "08",
    title: "Kiro Anime Recommender",
    fullName: "Kiro — Intelligent Anime Discovery Platform",
    kind: "Similarity Engines · NLP",
    year: "2025",
    status: "On Hold",
    statusType: "hold",
    body: "Intelligent anime recommendations using TF-IDF cosine similarity across 28,000+ MyAnimeList titles. Features a FastAPI backend, Supabase sync, JWT authentication, and a clean React UI with interactive cards.",
    stack: ["React", "FastAPI", "TF-IDF", "Supabase", "JWT", "Jikan API"],
    categories: ["Web Apps", "Voice & AI"],
    accent: "oklch(0.58 0.15 20)",
    source: "https://github.com/dhir-1",
  },
];

const CATEGORIES = ["All", "Machine Learning", "Web Apps", "Voice & AI"];

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.categories.includes(activeCategory);
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getStatusBadgeClass = (type: string) => {
    switch (type) {
      case "completed":
        return "border-emerald-500/30 text-emerald-400 bg-emerald-500/10";
      case "progress":
        return "border-sky-500/30 text-sky-400 bg-sky-500/10 animate-pulse-slow";
      case "hold":
        return "border-amber-500/30 text-amber-400 bg-amber-500/10";
      case "development":
        return "border-purple-500/30 text-purple-400 bg-purple-500/10";
      default:
        return "border-border text-muted-foreground bg-muted/10";
    }
  };

  return (
    <main className="min-h-screen bg-background/90 text-foreground relative overflow-hidden pb-24">
      <BackgroundShader />
      {/* Background ambient lighting */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Subpage Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>back_to_home.sh</span>
          </Link>
          <div className="font-display text-md">
            Dhir<span className="text-win-blue">.</span>projects
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
            archive_v2.026
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-16 md:pt-24 pb-8 reveal-on-scroll">
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
          <span className="text-win-blue">●</span> Project Directory
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight">
          All Projects<span className="italic font-light text-navy">.</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-xl font-mono text-xs">
          A filterable catalogue of analytical model notebooks, FastAPI backends, and responsive React client frontends.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10 mb-12 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-border py-6">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-md w-full md:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by name or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-card border border-border rounded-md text-xs font-mono focus:border-foreground focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl reveal-on-scroll">
            <AlertTriangle className="h-8 w-8 mx-auto text-amber-500/75 mb-3" />
            <h3 className="font-display text-xl mb-1">No matches found</h3>
            <p className="text-muted-foreground text-xs font-mono">
              Try adjusting your query or filter tab.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Lexis Flagship Showcase (Sticky on Top if it matches filter) */}
            {filteredProjects.some((p) => p.id === "lexis") && (
              <div className="reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
                <WindowFrame
                  title="~/flagship/lexis-interpreter.bin"
                  subtitle="featured"
                  status="IN DEVELOPMENT"
                  tone="ink"
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-8 p-8 md:p-12">
                      <div className="font-mono text-[11px] uppercase tracking-widest text-white/50 flex items-center gap-3">
                        <span className="text-purple-400">● FLAGSHIP</span>
                        <span>{ALL_PROJECTS[0].kind}</span>
                      </div>
                      <h2 className="mt-4 font-display text-3xl md:text-5xl leading-none text-white tracking-tight">
                        {ALL_PROJECTS[0].fullName}
                      </h2>
                      <p className="mt-6 text-white/80 text-[15px] leading-relaxed max-w-2xl">
                        {ALL_PROJECTS[0].longBody}
                      </p>
                      
                      <div className="mt-8 flex flex-wrap gap-2">
                        {ALL_PROJECTS[0].stack.map((s) => (
                          <span key={s} className="chip bg-white/5 border-white/10 text-white/60">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-10 flex items-center gap-6">
                        <a
                          href={ALL_PROJECTS[0].source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 font-medium border-b border-white pb-1 text-white hover:gap-3 transition-all"
                        >
                          Source Code
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>

                    <div className="lg:col-span-4 min-h-[300px] border-t lg:border-t-0 lg:border-l border-white/10 flex items-center justify-center p-8 bg-purple-950/20">
                      <div className="relative w-full aspect-[4/3] max-w-xs rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col justify-between p-4 group/box">
                        <div className="flex items-center justify-between text-[8px] font-mono text-white/40 tracking-wider">
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                            CAMERA_FEED [ACTIVE]
                          </span>
                          <span>60 FPS</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                          <svg className="w-full h-full text-purple-300 opacity-60" viewBox="0 0 100 100">
                            <polyline points="50,90 50,60 30,42 22,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="50,60 45,35 40,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="50,60 58,35 63,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <polyline points="50,60 70,45 78,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
                    </div>
                  </div>
                </WindowFrame>
              </div>
            )}

            {/* Grid for standard projects */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects
                .filter((p) => !p.isFlagship)
                .map((p, idx) => (
                  <div
                    key={p.id}
                    className="reveal-on-scroll group"
                    style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
                  >
                    <WindowFrame
                      title={`~/archive/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      subtitle={p.kind.split("·")[0].trim().toLowerCase()}
                      status={p.status || p.year}
                      className="h-full flex flex-col justify-between"
                    >
                      <div className="p-6 md:p-8 flex flex-col justify-between h-full flex-1">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center justify-between mb-4">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: p.accent }}
                              />
                              {p.year}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full border text-[8px] font-semibold uppercase tracking-wider ${getStatusBadgeClass(p.statusType)}`}>
                              {p.status}
                            </span>
                          </div>

                          <h3 className="font-display text-2xl tracking-tight leading-tight group-hover:text-accent transition-colors">
                            {p.fullName}
                          </h3>

                          <p className="mt-4 text-sm text-foreground/80 leading-relaxed font-sans">
                            {p.body}
                          </p>
                        </div>

                        <div className="mt-8">
                          {/* Tech list */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {p.stack.map((s) => (
                              <span key={s} className="chip">
                                {s}
                              </span>
                            ))}
                          </div>

                          {/* Link buttons */}
                          <div className="flex items-center gap-4 border-t border-dashed border-border pt-4 font-mono text-xs">
                            {p.live && (
                              <a
                                href={p.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-medium border-b border-foreground pb-0.5 hover:gap-2.5 transition-all text-foreground"
                              >
                                Live Demo
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            )}
                            {p.source && (
                              <a
                                href={p.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                              >
                                source_code ↗
                              </a>
                            )}
                            {!p.source && !p.live && (
                              <span className="text-[10px] uppercase text-muted-foreground italic tracking-wider">
                                internal code
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </WindowFrame>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
