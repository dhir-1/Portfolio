import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { WindowFrame } from "./WindowFrame";

type Line = { kind: "in" | "out"; text: string };

const commands: Record<string, string | (() => string)> = {
  help: `available commands:
  about      — who is dhir
  skills     — what i work with
  projects   — selected machine learning work
  resume     — download cv
  contact    — say hello
  clear      — reset the terminal`,
  about: `dhir agrawal — BCA graduate & ml enthusiast.
graduated from BCA.
sgpa: 8.82 | overall cgpa: 7.83.
actively seeking internships in data science, ml, and ai.`,
  skills: `ml & ds    · xgboost, scikit-learn, pandas, numpy, plotly, streamlit, computer vision
backend    · fastapi, python, postgresql, sql, flask
frontend   · react, tailwind css, vite, typescript`,
  projects: `01 · dhir's pit wall   (f1 telemetry ML predictor · 2026)
  02 · lexis             (sign language & speech interpreter · 2026)
  03 · foodguard india   (early warning indicator ML · 2026)
  04 · churno            (customer churn analytics · 2026)`,
  resume: `→ Dhir_Resume.pdf download started.`,
  contact: `email   · dhiragrawal17@gmail.com
phone   · +91 7779051838
github  · github.com/dhir-1
linkedin· /in/dhir-agrawal21`,
};

const banner = `dhir.os 1.0   ·   type 'help' to begin`;

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: banner },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...history, { kind: "in", text: raw }];
    if (!cmd) {
      setHistory(next);
      return;
    }
    if (cmd === "clear") {
      setHistory([{ kind: "out", text: banner }]);
      return;
    }
    if (cmd === "resume") {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Dhir_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setHistory([...next, { kind: "out", text: "→ Dhir_Resume.pdf download started." }]);
      return;
    }
    const c = commands[cmd];
    const out =
      typeof c === "function"
        ? c()
        : c ?? `command not found: ${cmd}. try 'help'.`;
    setHistory([...next, { kind: "out", text: out }]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    }
  };

  return (
    <section id="terminal" className="border-t border-border py-24 md:py-32 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="text-win-blue">§ 05</span> — Terminal
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.02]">
            For the
            <br />
            <em className="italic font-light text-navy">curious cursor.</em>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-foreground/80 max-w-sm">
            A tiny shell with the things you'd normally hunt for in a sidebar.
            Try <code className="font-mono text-sm">help</code>,{" "}
            <code className="font-mono text-sm">projects</code>, or{" "}
            <code className="font-mono text-sm">contact</code>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["help", "about", "skills", "projects", "contact"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  run(c);
                  inputRef.current?.focus();
                }}
                className="chip hover:border-foreground hover:text-foreground transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-8">
          <WindowFrame
            tone="ink"
            title="dhir@portfolio: ~"
            subtitle="zsh"
            status="Live"
          >
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="font-mono text-[13px] leading-[1.65] p-5 h-[420px] overflow-y-auto"
            >
              {history.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {l.kind === "in" ? (
                    <div>
                      <span className="text-teal">dhir@portfolio</span>
                      <span className="text-white/40">:</span>
                      <span className="text-win-blue">~</span>
                      <span className="text-white/40">$ </span>
                      <span>{l.text}</span>
                    </div>
                  ) : (
                    <div className="text-white/80">{l.text}</div>
                  )}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-teal">dhir@portfolio</span>
                <span className="text-white/40">:</span>
                <span className="text-win-blue">~</span>
                <span className="text-white/40">$&nbsp;</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent outline-none border-0 text-white caret-win-blue"
                  aria-label="terminal input"
                />
              </div>
            </div>
          </WindowFrame>
        </div>
      </div>
    </section>
  );
}
