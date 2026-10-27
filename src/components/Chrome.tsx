"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/content/site";
import { track, whatsappLink } from "@/lib/track";
import { WhatsApp } from "./ui/Icons";

/** A ring that follows the pointer and names the action over photos and rails. Fine pointers only. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ring.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let current = "";
    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = t?.dataset.cursor ?? "";
      if (next !== current) {
        current = next;
        setLabel(next);
        gsap.to(el, { scale: next ? 1 : 0, opacity: next ? 1 : 0, duration: 0.4, ease: "power3.out" });
      }
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-11 -mt-11 hidden size-22 scale-0 place-items-center rounded-full bg-araliya/80 text-[0.8125rem] font-medium text-ink opacity-0 backdrop-blur-md [@media(pointer:fine)]:grid"
    >
      {label}
    </div>
  );
}

/** Floating WhatsApp capsule. Appears once the hero has scrolled away. */
export function FloatingContact() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(scrollY > innerHeight * 0.7);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <a
      href={whatsappLink(site.whatsapp.intl, "Hello Golden Flower, we're planning a wedding. Is our date free?")}
      target="_blank"
      rel="noopener"
      onClick={() => track("whatsapp_click", { from: "floating" })}
      className={`glass fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 items-center gap-2 rounded-full pl-3.5 pr-4 text-[0.9375rem] font-medium transition-[transform,opacity] duration-500 ease-[var(--ease-apple)] ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      aria-label="Chat with us on WhatsApp"
      tabIndex={show ? 0 : -1}
    >
      <span className="grid size-7 place-items-center rounded-full bg-[#1f7a4d] text-white"><WhatsApp className="size-4" /></span>
      <span>Is our date free?</span>
    </a>
  );
}
