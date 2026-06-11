import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#terminal", label: "Terminal" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialDark =
      root.classList.contains("dark") ||
      (localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches));
    if (initialDark) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-14 flex items-center gap-6">
        <a href="#top" className="font-display text-lg leading-none tracking-tight">
          Dhir<span className="text-win-blue">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 ml-auto font-mono text-xs">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto md:ml-0 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">IN · Surat</span>
          <span className="h-3 w-px bg-border hidden sm:inline-block" />
          <span>{time}</span>
          <span className="h-3 w-px bg-border" />
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer flex items-center justify-center"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
