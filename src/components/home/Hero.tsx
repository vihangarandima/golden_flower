"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { photos } from "@/content/photos";
import { whenLoaded } from "../Motion";
import { Words } from "../ui/Words";
import { SunsetTime } from "../SunsetTime";
import { ArrowRight, Sun } from "../ui/Icons";

const VIDEO = "/assets/video/garden-night.mp4";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // Art direction: wide daylight lawn on desktop, the portrait night shot on phones.
  const common = { alt: "", sizes: "100vw", priority: true } as const;
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: photos["garden-ceremony"].src, width: photos["garden-ceremony"].w, height: photos["garden-ceremony"].h });
  const { props: { srcSet: tall, ...img } } = getImageProps({ ...common, src: photos["garden-night"].src, width: photos["garden-night"].w, height: photos["garden-night"].h });

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const save = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || save) {
      setPlaying(false);
      [video.current, card.current].forEach((v) => v?.pause());
    }
    const el = root.current!;
    let ctx: gsap.Context | undefined;
    const off = whenLoaded(() => {
      ctx = gsap.context(() => {
        if (reduce) return;
        gsap.fromTo("[data-hero-bg]", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "expo.out" });
        gsap.fromTo("[data-hero-in]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.5 });
        gsap.fromTo("[data-hero-card]", { opacity: 0, y: 40, rotate: 2 }, { opacity: 1, y: 0, rotate: 0, duration: 1.4, ease: "expo.out", delay: 0.6 });
        // gentle depth on the way out
        gsap.to("[data-hero-bg]", { yPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }, el);
    });
    return () => { off?.(); ctx?.revert(); };
  }, []);

  const toggle = () => {
    const next = !playing;
    setPlaying(next);
    [video.current, card.current].forEach((v) => (next ? v?.play() : v?.pause()));
  };

  return (
    <section ref={root} className="on-dark relative isolate flex min-h-[640px] h-[100svh] items-end overflow-hidden bg-lawn text-white">
      <div data-hero-bg className="absolute inset-0 -z-10 will-change-transform">
        <picture>
          <source media="(min-width: 768px)" srcSet={wide} sizes="100vw" />
          <source srcSet={tall} sizes="100vw" />
          <img {...img} alt={photos["garden-ceremony"].alt} className="h-full w-full object-cover object-[50%_60%]" />
        </picture>
        {/* Phones get the night footage full-bleed; it's portrait, so it fits */}
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover md:hidden"
          src={VIDEO}
          poster={photos["garden-night"].src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_36_29/0.4)_0%,rgb(14_36_29/0.05)_28%,rgb(14_36_29/0.3)_55%,rgb(14_36_29/0.9)_100%)]" />
      <div className="absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(90deg,rgb(14_36_29/0.62)_0%,rgb(14_36_29/0.28)_45%,transparent_70%)]" />

      <div className="wrap grid grid-cols-1 items-end gap-10 pb-10 md:pb-14 lg:grid-cols-[1fr_auto]">
        <div>
          <p data-hero-in className="glass mb-6 inline-flex min-h-9 items-center gap-2 rounded-full !bg-white/12 px-3.5 text-[0.8125rem] text-white !shadow-none ring-1 ring-white/25">
            <Sun className="size-4 text-gold-light" />
            Sunset in Hingurakgoda today · <SunsetTime />
          </p>
          <Words as="h1" text="Vows by morning. *Lights by night.*" className="display text-[clamp(3.2rem,9.4vw,8.75rem)] max-w-[11ch] text-white" delay={0.15} />
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p data-hero-in className="max-w-[40ch] text-[1.0625rem] text-white/85">
              A garden and hall for weddings in Hingurakgoda, with our own décor team, kitchen and rooms on the same plot.
            </p>
            <div data-hero-in className="flex flex-wrap gap-2.5">
              <Link href="/contact" className="btn btn-gold">Plan your wedding <ArrowRight /></Link>
              <Link href="/venues/the-garden" className="btn btn-ghost backdrop-blur-sm">See the garden</Link>
            </div>
          </div>
        </div>

        {/* Desktop: the night footage as a phone-sized film card — honest to its 360×640 source */}
        <figure data-hero-card className="relative hidden w-[200px] lg:block xl:w-[220px]">
          <div className="overflow-hidden rounded-[26px] shadow-2xl ring-1 ring-white/20">
            <video ref={card} src={VIDEO} poster={photos["garden-night"].src} muted loop playsInline autoPlay preload="metadata" className="aspect-[9/16] w-full object-cover" aria-label="The garden after dark: tables under string lights" />
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-[0.8125rem] text-white/75">
            <span>The same lawn, after dark</span>
            <button type="button" onClick={toggle} className="min-h-8 rounded-full px-2 hover:text-white cursor-pointer">
              {playing ? "Pause" : "Play"}
            </button>
          </figcaption>
        </figure>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 top-24 grid size-11 place-items-center rounded-full bg-black/25 text-white backdrop-blur-md ring-1 ring-white/20 cursor-pointer md:top-auto md:bottom-14 md:right-auto md:left-1/2 md:-translate-x-1/2 lg:hidden"
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? (
          <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden><rect x="3.5" y="2.5" width="3" height="11" rx="1" /><rect x="9.5" y="2.5" width="3" height="11" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden><path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5z" /></svg>
        )}
      </button>
    </section>
  );
}
