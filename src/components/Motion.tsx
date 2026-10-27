"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { __lenis?: Lenis; __gfMotion?: boolean }
}

const isLite = () => {
  const n = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (n.hardwareConcurrency ?? 8) <= 4 || (n.deviceMemory ?? 8) <= 4 || !!n.connection?.saveData;
};
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Waits for the preloader (first visit only) so the hero reveal isn't hidden behind it. */
export function whenLoaded(cb: () => void) {
  if (document.documentElement.dataset.loaded) return cb();
  const on = () => cb();
  window.addEventListener("gf:loaded", on, { once: true });
  return () => window.removeEventListener("gf:loaded", on);
}

export function SmoothScroll() {
  useEffect(() => {
    window.__gfMotion = true;
    if (reduced() || isLite()) {
      document.documentElement.classList.add("lite");
      return;
    }
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}

/** One scanner for every declarative animation on the page; rebuilt on each route. */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    if (reduced()) return;
    const lite = isLite();
    let ctx: gsap.Context | undefined;

    const off = whenLoaded(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".w > span"),
            { yPercent: 105, y: 0 },
            { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.045, delay: Number(el.dataset.delay ?? 0), scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } },
          );
        });

        // Not `once: true`: self-killing triggers mid-setup confuse ScrollTrigger's refresh order.
        ScrollTrigger.batch("[data-fade]", {
          start: "top 92%",
          onEnter: (els) => {
            const fresh = (els as HTMLElement[]).filter((e) => !e.dataset.shown);
            fresh.forEach((e) => (e.dataset.shown = "1"));
            gsap.fromTo(fresh, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.07, overwrite: true });
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
          tl.fromTo(el, { clipPath: "inset(12% 6% 12% 6% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.4, ease: "expo.out" } /* keep the end state: clearing it would re-apply the CSS hidden clip */);
          const inner = el.querySelector("[data-settle]");
          if (inner) tl.fromTo(inner, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
        });

        if (!lite) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amt = Math.min(Number(el.dataset.parallax), 0.15) * 100;
            gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
          gsap.fromTo(el.querySelectorAll(".fw"), { opacity: 0.16 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
        });
      });
      // images and fonts change layout after first paint
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      off?.();
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
