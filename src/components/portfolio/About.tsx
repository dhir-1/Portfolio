export function About() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sticky top-24">
            <span className="text-win-blue">§ 01</span> — About
          </div>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl">
            I build systems that extract meaning from data with the precision of a developer and the
            <em className="font-light text-navy"> curiosity of a researcher.</em>
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-10 text-[15px] leading-relaxed text-foreground/80">
            <p>
              I graduated from BCA. I focus on applied Machine Learning, Data Science, and Artificial Intelligence, building full-stack platforms that turn predictive models into interactive, live dashboards.
            </p>
            <p>
              I am looking for internship opportunities in ML and Data Science. I care about clean datasets, thorough feature engineering, robust classification models, and serving predictions through high-performance APIs.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-border pt-8">
            {[
              ["Education", "BCA Graduate\nSGPA: 8.82 | CGPA: 7.83"],
              ["Currently", "Seeking Internships in\nData Science & ML"],
              ["Interests", "Predictive ML\nData Science & AI"],
              ["Toolbelt", "Python · SQL · XGBoost\nReact · FastAPI · Git"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-2 whitespace-pre-line text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
