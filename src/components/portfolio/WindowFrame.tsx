import { type ReactNode } from "react";

interface WindowFrameProps {
  title?: string;
  subtitle?: string;
  status?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "ink";
}

export function WindowFrame({
  title = "untitled",
  subtitle,
  status,
  children,
  className = "",
  tone = "light",
}: WindowFrameProps) {
  const isInk = tone === "ink";
  return (
    <div className={`window-card overflow-hidden ${isInk ? "window-card-ink" : ""} ${className}`}>
      <div className={`flex items-center gap-3 px-3 py-2 border-b ${isInk ? "border-white/10" : "border-border"} font-mono text-[11px]`}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-burgundy/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-silver" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
        </div>
        <div className={`flex-1 text-center truncate ${isInk ? "text-white/60" : "text-muted-foreground"}`}>
          {title}
          {subtitle && <span className="opacity-50"> — {subtitle}</span>}
        </div>
        <div className={`text-[10px] uppercase tracking-widest ${isInk ? "text-white/40" : "text-muted-foreground"}`}>
          {status ?? "ready"}
        </div>
      </div>
      {children}
    </div>
  );
}
