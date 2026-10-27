"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mark } from "./ui/Icons";

/*
  First visit per session only. An inline script in <head> sets html[data-visited] for
  repeat visits, so this never flashes. The flower "opens" petal by petal, the counter
  follows real progress (fonts + hero image), capped at ~1.6s, then the panel lifts.
*/
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const done = () => {
      html.dataset.loaded = "1";
      window.dispatchEvent(new Event("gf:loaded"));
      try { sessionStorage.setItem("gf-visited", "1"); } catch {}
    };
    const el = root.current;
    if (!el || html.dataset.visited || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) el.style.display = "none";
      return done();
    }

    const count = el.querySelector<HTMLElement>("[data-count]")!;
    const state = { p: 0 };
    const ready = Promise.race([
      Promise.all([document.fonts?.ready, new Promise((r) => (document.readyState === "complete" ? r(0) : addEventListener("load", r, { once: true })))]),
      new Promise((r) => setTimeout(r, 1400)),
    ]);

    const tl = gsap.timeline();
    tl.fromTo(el.querySelectorAll("svg circle"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(2)", stagger: { each: 0.035, from: "end" } }, 0)
      .fromTo(el.querySelectorAll("[data-pl-text]"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 }, 0.15)
      .to(state, { p: 86, duration: 0.9, ease: "power2.out", onUpdate: () => (count.textContent = String(Math.round(state.p))) }, 0);

    // Timers still run when rAF is paused (background tab), so this guarantees the page is never stuck behind the cover.
    const safety = setTimeout(() => {
      if (html.dataset.loaded) return;
      tl.kill();
      el.style.display = "none";
      done();
    }, 4000);

    ready.then(() => {
      tl.to(state, { p: 100, duration: 0.25, onUpdate: () => (count.textContent = String(Math.round(state.p))) })
        .to(el.querySelector("[data-pl-inner]"), { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" }, ">0.05")
        .to(el, { yPercent: -100, duration: 0.9, ease: "expo.inOut", onStart: done }, "<0.1")
        .add(() => { el.style.display = "none"; });
    });
    return () => { tl.kill(); clearTimeout(safety); };
  }, []);

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] grid place-items-center bg-lawn text-on-lawn" aria-hidden>
      <div data-pl-inner className="flex flex-col items-center gap-6">
        <Mark className="size-16 text-gold-light" />
        <div className="overflow-hidden"><p data-pl-text className="display text-4xl">Golden Flower</p></div>
        <div className="overflow-hidden"><p data-pl-text lang="si" className="font-sinhala text-on-lawn-2">ආයුබෝවන්</p></div>
      </div>
      <p className="absolute bottom-8 right-8 tabular-nums text-sm text-on-lawn-2"><span data-count>0</span></p>
    </div>
  );
}
