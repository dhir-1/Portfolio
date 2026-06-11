const items = [
  {
    year: "2026 — Present",
    role: "BCA Graduate",
    org: "University",
    body: "Graduated from BCA. Achieved overall CGPA of 7.83 and SGPA of 8.82 in the final semester. Actively seeking internships in Data Science, Machine Learning, and AI systems.",
  },
  {
    year: "2026",
    role: "Applied ML Projects",
    org: "Self-driven",
    body: "Shipped Churno (telecom churn predictor with FastAPI/PostgreSQL), Dhir's Pit Wall (F1 telemetry & race predictor with FastF1/XGBoost), and FoodGuard India (Streamlit early warning risk indicator).",
  },
  {
    year: "2023",
    role: "BCA Degree Begin",
    org: "University",
    body: "Began formal studies in computer applications. Shipped small command-line utilities and fell in love with statistical computing and predictive modeling.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-24 md:py-32 bg-secondary/40 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="text-win-blue">§ 04</span> — Timeline
        </div>
        <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl">
          A short history of
          <em className="italic font-light text-navy"> what I've shipped.</em>
        </h2>

        <ol className="mt-16 relative">
          <div className="absolute left-[7.5rem] sm:left-44 top-0 bottom-0 w-px bg-border hidden sm:block" />
          {items.map((it) => (
            <li
              key={it.year}
              className="grid grid-cols-[7rem_1fr] sm:grid-cols-[11rem_1fr] gap-6 sm:gap-12 py-8 border-t border-border first:border-t-0"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-2 relative">
                {it.year}
                <span className="hidden sm:block absolute right-[-0.55rem] top-3 h-2 w-2 rounded-full bg-win-blue ring-4 ring-background" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl leading-snug">
                  {it.role}
                </h3>
                <div className="mt-1 text-sm text-muted-foreground">{it.org}</div>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/80">
                  {it.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
