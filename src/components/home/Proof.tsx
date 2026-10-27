"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/content/site";

/**
 * Real numbers, said as sentences rather than a stat grid. Each figure counts up once.
 */
export function Proof() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
        const to = Number(el.dataset.countTo);
        const dec = Number(el.dataset.dec ?? 0);
        const fmt = (v: number) => v.toLocaleString("en-LK", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        const s = { v: 0 };
        el.textContent = fmt(0);
        gsap.to(s, { v: to, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }, onUpdate: () => (el.textContent = fmt(s.v)) });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const n = (v: number, dec = 0) => (
    <span className="text-gold tabular-nums not-italic" data-count-to={v} data-dec={dec}>{v.toLocaleString("en-LK", { minimumFractionDigits: dec })}</span>
  );

  return (
    <section ref={root} className="border-t border-line">
      <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <p className="kicker self-start md:col-span-3" data-fade>In numbers</p>
        <div className="space-y-8 md:col-span-9">
          <p className="display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.1]" data-fade>
            {n(6200)} people follow our stages and tables on Facebook, where couples rate us {n(site.reviews.facebook.rating, 1)} out of 5.
          </p>
          <p className="display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.1]" data-fade>
            {n(site.reviews.google.count)} guests have reviewed the hotel on Google. Read them before you visit; we would.
          </p>
          <p className="display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.1]" data-fade>
            Minneriya&rsquo;s elephants are {n(20)} minutes away, for the morning after.
          </p>
        </div>
      </div>
    </section>
  );
}
