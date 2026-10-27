"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { moments } from "@/content/weddings";
import { Photo } from "../ui/Photo";
import { Words } from "../ui/Words";
import { ArrowRight } from "../ui/Icons";

/**
 * One plot, five moments. Large screens: the section pins and vertical scroll drives the rail sideways.
 * Phones and reduced motion: a native swipe rail with scroll-snap (what iOS users expect).
 */
export function MomentsRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const distance = () => t.scrollWidth - t.clientWidth;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      gsap.utils.toArray<HTMLElement>("[data-moment-img]", t).forEach((img) =>
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }),
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="wrap flex items-end justify-between gap-6">
        <div>
          <p className="kicker" data-fade>The place</p>
          <Words text="One garden. *Five moods.*" className="display mt-5 text-[clamp(2.6rem,6vw,5.6rem)]" />
        </div>
        <p className="hidden max-w-[30ch] text-ink-2 md:block" data-fade>Everything below happens within a two-minute walk.</p>
      </div>

      <div
        ref={track}
        data-cursor="Drag"
        className="no-bar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:px-8 lg:mt-14 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-1320px)/2))]"
      >
        {moments.map((m, i) => (
          <Link key={m.title} href={m.href} className="group w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-[min(46vw,640px)]">
            <div className="photo-frame aspect-[4/3]">
              <div data-moment-img className="absolute -inset-x-[10%] inset-y-0">
                <Photo k={m.photo} sizes="(min-width:1024px) 46vw, 82vw" reveal={false} className="!rounded-none h-full !aspect-auto" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-apple)] group-hover:scale-[1.04]" />
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <div>
                <h3 className="display text-[1.9rem] leading-none">{m.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-2">{m.caption}</p>
              </div>
              <span className="text-sm tabular-nums text-ink-2">{i + 1}/{moments.length}</span>
            </div>
          </Link>
        ))}
        <Link href="/venues" className="flex w-[60vw] shrink-0 snap-center items-center justify-center rounded-[28px] border border-line sm:w-[30vw] lg:w-[22vw]">
          <span className="inline-flex items-center gap-2 text-lg">All venues <ArrowRight /></span>
        </Link>
      </div>
    </section>
  );
}
