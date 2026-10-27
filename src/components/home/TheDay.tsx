"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { theDay } from "@/content/weddings";
import { Photo } from "../ui/Photo";
import { Words } from "../ui/Words";
import { SunsetTime } from "../SunsetTime";

/**
 * The signature section: a wedding day told as a timeline. The photo column is sticky;
 * once you scroll past sunset the whole section goes from daylight to the lawn at night.
 */
export function TheDay() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const sunsetIndex = theDay.findIndex((d) => d.sunset);
  const night = active > sunsetIndex;

  useEffect(() => {
    const steps = root.current!.querySelectorAll<HTMLElement>("[data-step]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.step))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.forEach((s) => io.observe(s));

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-day-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-day-steps]", start: "top 55%", end: "bottom 55%", scrub: true } });
    });
    return () => { io.disconnect(); mm.revert(); };
  }, []);

  return (
    <section
      ref={root}
      className={`relative transition-colors duration-[1200ms] ease-[var(--ease-apple)] ${night ? "on-dark bg-lawn text-on-lawn" : "bg-araliya text-ink"}`}
    >
      <div className="wrap py-24 md:py-36">
        <p className={`kicker ${night ? "!text-on-lawn-2" : ""}`} data-fade>A day here</p>
        <Words text="From your *nekath* to the last dance" className="display mt-6 max-w-[14ch] text-[clamp(2.6rem,6vw,5.6rem)]" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* sticky photo stack (large screens) */}
          <div className="hidden lg:block">
            <div className="sticky top-[14vh]">
              <div className="photo-frame aspect-[4/5]">
                {theDay.map((d, i) => (
                  <div key={d.title} className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-apple)] ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"}`}>
                    <Photo k={d.photo} ratio="4/5" sizes="45vw" reveal={false} className="!rounded-none h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ol data-day-steps className="relative">
            <span aria-hidden className={`absolute left-[5px] top-2 bottom-2 w-px ${night ? "bg-white/15" : "bg-line"}`} />
            <span aria-hidden data-day-line className={`absolute left-[5px] top-2 bottom-2 w-px origin-top ${night ? "bg-gold-light" : "bg-gold"}`} />
            {theDay.map((d, i) => (
              <li key={d.title} data-step={i} className="relative pl-10 pb-20 last:pb-0 lg:min-h-[62vh] lg:pb-0">
                <span aria-hidden className={`absolute left-0 top-[0.55rem] size-[11px] rounded-full border transition-colors duration-500 ${i <= active ? (night ? "border-gold-light bg-gold-light" : "border-gold bg-gold") : night ? "border-white/30 bg-lawn" : "border-line bg-araliya"}`} />
                <p className={`text-[0.9375rem] tabular-nums ${night ? "text-gold-light" : "text-gold"}`}>
                  {d.sunset ? <>Today, <SunsetTime /></> : d.time}
                </p>
                <h3 className="display mt-2 text-[clamp(2rem,3.4vw,3.2rem)] leading-none">{d.title}</h3>
                <p className={`mt-4 max-w-[42ch] text-[1.0625rem] ${night ? "text-on-lawn-2" : "text-ink-2"}`}>{d.body}</p>
                <div className="mt-6 lg:hidden">
                  <Photo k={d.photo} ratio="4/3" sizes="92vw" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
