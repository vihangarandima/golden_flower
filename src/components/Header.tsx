"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { menu, nav, site } from "@/content/site";
import { photos } from "@/content/photos";
import { Mark, Phone, WhatsApp } from "./ui/Icons";
import { track, whatsappLink } from "@/lib/track";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Hide on the way down, return on the way up — the Safari toolbar behaviour.
  useEffect(() => {
    let last = scrollY, raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = scrollY;
        setHidden(y > 160 && y > last + 2);
        if (y < last - 2 || y < 160) setHidden(false);
        last = y;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] btn btn-gold">Skip to content</a>
      <header
        className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 pointer-events-none transition-transform duration-500 ease-[var(--ease-apple)] ${hidden && !open ? "-translate-y-[140%]" : ""}`}
      >
        <div className="glass pointer-events-auto flex h-14 w-full max-w-[1040px] items-center justify-between rounded-full pl-4 pr-1.5">
          <Link href="/" className="flex items-center gap-2.5 min-h-11" aria-label="Golden Flower, home">
            <Mark className="size-7 text-gold" />
            <span className="display text-[1.35rem] leading-none tracking-[-0.03em]">Golden Flower</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 text-[0.9375rem]">
              {nav.map((n) => {
                const active = pathname.startsWith(n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-10 items-center rounded-full px-3.5 transition-colors ${active ? "bg-ink/[0.07]" : "hover:bg-ink/[0.05]"}`}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Link href="/contact" className="btn btn-gold !min-h-11 !px-4 text-[0.875rem] sm:!px-5">
              <span className="sm:hidden">Enquire</span>
              <span className="hidden sm:inline">Plan your wedding</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full hover:bg-ink/[0.06] transition-colors cursor-pointer"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-apple)] ${open ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-apple)] ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}

function Menu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string>(menu[0].photo);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      setMounted(true);
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.8, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-mi]"), { yPercent: 110 }, { yPercent: 0, duration: reduce ? 0 : 0.9, ease: "expo.out", stagger: 0.035, delay: reduce ? 0 : 0.3 });
      el.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else if (mounted) {
      window.__lenis?.start();
      document.body.style.overflow = "";
      gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "expo.inOut", onComplete: () => setMounted(false) });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={`on-dark fixed inset-0 z-40 bg-lawn text-on-lawn ${mounted || open ? "" : "invisible"}`}
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="wrap grid h-full grid-cols-1 gap-10 overflow-y-auto pt-28 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-24">
        <nav aria-label="Full menu">
          <ul>
            {menu.map((m) => (
              <li key={m.href} className="overflow-hidden">
                <Link
                  data-mi
                  href={m.href}
                  onMouseEnter={() => setHover(m.photo)}
                  onFocus={() => setHover(m.photo)}
                  aria-current={pathname === m.href ? "page" : undefined}
                  className="group flex items-baseline gap-4 py-1 display text-[clamp(2.1rem,5.4vw,4.6rem)] leading-[1.08] text-on-lawn/90 hover:text-gold-light focus-visible:text-gold-light transition-colors"
                >
                  {m.label}
                  <span className="hidden h-px flex-1 origin-left scale-x-0 bg-gold-light/50 transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-x-100 lg:block" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
            {menu.map((m) => {
              const p = photos[m.photo as keyof typeof photos];
              return (
                <Image key={m.href} src={p.src} alt="" fill sizes="40vw" className={`object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-apple)] ${hover === m.photo ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-on-lawn-2 lg:col-span-2">
          <a href={`tel:${site.phones[0].tel}`} className="inline-flex min-h-11 items-center gap-2 hover:text-on-lawn" onClick={() => track("call_click", { from: "menu" })}>
            <Phone /> {site.phones[0].number}
          </a>
          <a href={whatsappLink(site.whatsapp.intl, "Hello Golden Flower, we're planning a wedding and would like to check a date.")} className="inline-flex min-h-11 items-center gap-2 hover:text-on-lawn" onClick={() => track("whatsapp_click", { from: "menu" })}>
            <WhatsApp className="size-4" /> WhatsApp {site.whatsapp.number}
          </a>
          <span className="inline-flex min-h-11 items-center">{site.address.line1}, {site.address.town}</span>
        </div>
      </div>
    </div>
  );
}
