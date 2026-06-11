import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function useScrollReveal() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered, especially on route transitions
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              // Stop observing once animated to avoid layout stutter
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -40px 0px", // trigger slightly before entering viewport
        }
      );

      const elements = document.querySelectorAll(
        ".reveal-on-scroll, .reveal-on-scroll-left, .reveal-on-scroll-right"
      );
      elements.forEach((el) => {
        if (el.classList.contains("revealed")) return;
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);
}
