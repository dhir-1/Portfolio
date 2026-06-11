import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Work } from "@/components/portfolio/Work";
import { Experience } from "@/components/portfolio/Experience";
import { Terminal } from "@/components/portfolio/Terminal";
import { Contact } from "@/components/portfolio/Contact";
import { BackgroundShader } from "@/components/portfolio/BackgroundShader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhir Agrawal — Developer, ML Enthusiast, Editor" },
      {
        name: "description",
        content:
          "Portfolio of Dhir Agrawal — web developer, machine learning enthusiast, and video editor based in India.",
      },
      { property: "og:title", content: "Dhir Agrawal — Portfolio" },
      {
        property: "og:description",
        content: "Selected work in web development, machine learning, and video.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background/90 text-foreground relative overflow-hidden">
      <BackgroundShader />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Terminal />
      <Contact />
    </main>
  );
}
