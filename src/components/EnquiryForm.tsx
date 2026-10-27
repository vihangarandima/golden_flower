"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ceremonyTypes, services, venues } from "@/content/weddings";
import { site } from "@/content/site";
import { track, whatsappLink } from "@/lib/track";
import { ArrowRight, WhatsApp } from "./ui/Icons";

type Data = {
  names: string; phone: string; email: string;
  date: string; flexible: boolean; nekath: string;
  guests: number; venue: string; ceremony: string; services: string[];
  message: string; company: string; // company = honeypot
};

const STEPS = ["The two of you", "The day", "What you need"] as const;

export function EnquiryForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const panel = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [d, setD] = useState<Data>({
    names: "", phone: "", email: "",
    date: params.get("date") ?? "", flexible: false, nekath: "",
    guests: Number(params.get("guests")) || 200, venue: "No preference", ceremony: ceremonyTypes[0], services: ["Venue", "Décor & stage", "Catering"],
    message: "", company: "",
  });
  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    if (!started.current) { started.current = true; track("enquiry_started", { from: "contact" }); }
    setD((x) => ({ ...x, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  useEffect(() => {
    if (!panel.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panel.current.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" });
  }, [step, status]);

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (d.names.trim().length < 2) e.names = "Tell us who's getting married.";
      if (!/^\+?[\d\s-]{9,15}$/.test(d.phone.trim())) e.phone = "Enter a phone number we can call or WhatsApp, e.g. 071 234 5678.";
      if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) e.email = "That email doesn't look complete.";
    }
    if (s === 1 && !d.date && !d.flexible) e.date = "Pick a date, or switch on “Dates are flexible”.";
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validate(step)) return;
    track("enquiry_step", { step: step + 1 });
    setStep((s) => s + 1);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < STEPS.length - 1) return next();
    if (!validate(step)) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error();
      setStatus("sent");
      track("enquiry_completed", { guests: d.guests, venue: d.venue });
    } catch {
      setStatus("error");
    }
  };

  const waText = useMemo(
    () => `Hello Golden Flower, this is ${d.names || "[names]"}. We're looking at ${d.date || "[date]"}${d.nekath ? ` (nekath ${d.nekath})` : ""} for about ${d.guests} guests, ${d.venue.toLowerCase()}. Ceremony: ${d.ceremony}. We need: ${d.services.join(", ")}.`,
    [d],
  );

  const field = "mt-2 w-full rounded-2xl bg-araliya px-4 min-h-13 text-[1.0625rem] ring-1 ring-line outline-none transition focus:ring-2 focus:ring-gold aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#b3261e]";
  const label = "block text-[0.9375rem] font-medium";
  const err = (k: string) => errors[k] && <p id={`e-${k}`} className="mt-2 text-sm text-[#b3261e]">{errors[k]}</p>;

  if (status === "sent") {
    return (
      <div ref={panel} className="rounded-[28px] bg-husk p-8 md:p-12" role="status">
        <svg viewBox="0 0 52 52" className="size-14 text-gold" aria-hidden>
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: "draw 0.8s ease-out both" }} />
        </svg>
        <style>{`@keyframes draw{from{stroke-dashoffset:40}}`}</style>
        <h2 className="display mt-6 text-5xl">Thank you, {d.names.split(/\s|&/)[0]}.</h2>
        <p className="mt-4 max-w-[44ch] text-ink-2">We&rsquo;ve got your enquiry and will call {d.phone} from one of our numbers, usually the same day. If it&rsquo;s urgent, WhatsApp is quickest.</p>
        <a href={whatsappLink(site.whatsapp.intl, waText)} target="_blank" rel="noopener" className="btn btn-ghost mt-8" onClick={() => track("whatsapp_click", { from: "form_success" })}>
          <WhatsApp className="size-4" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[28px] bg-husk p-5 md:p-10" aria-labelledby="enq-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="enq-title" className="display text-3xl md:text-4xl">{STEPS[step]}</h2>
        <p className="text-sm tabular-nums text-ink-2" aria-live="polite">Step {step + 1} of {STEPS.length}</p>
      </div>
      {/* segmented progress, iOS style */}
      <div className="mt-5 grid grid-cols-3 gap-1.5" aria-hidden>
        {STEPS.map((s, i) => (
          <span key={s} className="h-1 overflow-hidden rounded-full bg-ink/10">
            <span className={`block h-full rounded-full bg-gold transition-transform duration-700 ease-[var(--ease-apple)] origin-left ${i <= step ? "scale-x-100" : "scale-x-0"}`} />
          </span>
        ))}
      </div>

      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={d.company} onChange={(e) => set("company", e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

      <div ref={panel} className="mt-8 grid gap-6">
        {step === 0 && (
          <>
            <label className={label}>
              Your names
              <input id="f-names" autoComplete="name" placeholder="Nadeesha & Kasun" value={d.names} onChange={(e) => set("names", e.target.value)} aria-invalid={!!errors.names} aria-describedby={errors.names ? "e-names" : undefined} className={field} />
              {err("names")}
            </label>
            <label className={label}>
              Phone or WhatsApp
              <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="071 234 5678" value={d.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} className={field} />
              {err("phone")}
            </label>
            <label className={label}>
              Email <span className="font-normal text-ink-2">(optional)</span>
              <input id="f-email" type="email" inputMode="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={field} />
              {err("email")}
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className={label}>
                Wedding date
                <input id="f-date" type="date" min={new Date().toISOString().slice(0, 10)} value={d.date} onChange={(e) => set("date", e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? "e-date" : undefined} className={field} />
                {err("date")}
              </label>
              <label className={label}>
                Nekath time <span className="font-normal text-ink-2">(if you have it)</span>
                <input type="time" value={d.nekath} onChange={(e) => set("nekath", e.target.value)} className={field} />
              </label>
            </div>
            <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-2xl bg-araliya px-4 py-3 ring-1 ring-line">
              <span>Dates are flexible</span>
              <input type="checkbox" role="switch" checked={d.flexible} onChange={(e) => set("flexible", e.target.checked)} className="peer sr-only" />
              <span aria-hidden className="relative h-[31px] w-[51px] shrink-0 rounded-full bg-ink/15 transition-colors peer-checked:bg-[#34a853] peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:left-[2px] after:top-[2px] after:size-[27px] after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 peer-checked:after:translate-x-5" />
            </label>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="f-guests" className={label}>Guests</label>
                <output htmlFor="f-guests" className="display text-3xl tabular-nums">{d.guests}{d.guests >= 600 ? "+" : ""}</output>
              </div>
              <input id="f-guests" type="range" min={25} max={600} step={25} value={d.guests} onChange={(e) => set("guests", Number(e.target.value))} className="mt-3 w-full accent-[var(--gold)] min-h-11" />
            </div>
            <fieldset>
              <legend className={label}>Ceremony</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {ceremonyTypes.map((c) => (
                  <label key={c} className="cursor-pointer">
                    <input type="radio" name="ceremony" value={c} checked={d.ceremony === c} onChange={() => set("ceremony", c)} className="peer sr-only" />
                    <span className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] ring-1 ring-line transition-colors peer-checked:bg-ink peer-checked:text-araliya peer-focus-visible:outline-2 peer-focus-visible:outline-gold">{c}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset>
              <legend className={label}>Where</legend>
              {/* iOS segmented control */}
              <div className="mt-3 grid grid-cols-3 rounded-xl bg-ink/[0.07] p-1">
                {["No preference", ...venues.map((v) => v.name)].map((v) => (
                  <label key={v} className="cursor-pointer">
                    <input type="radio" name="venue" value={v} checked={d.venue === v} onChange={() => set("venue", v)} className="peer sr-only" />
                    <span className="flex min-h-10 items-center justify-center rounded-lg px-2 text-center text-[0.875rem] transition-all peer-checked:bg-araliya peer-checked:shadow-sm peer-checked:font-medium peer-focus-visible:outline-2 peer-focus-visible:outline-gold">{v === "No preference" ? "Either" : v.replace(/^The (Banquet )?/, "")}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className={label}>What should we take care of?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {services.map((s) => {
                  const on = d.services.includes(s);
                  return (
                    <label key={s} className="cursor-pointer">
                      <input type="checkbox" checked={on} onChange={() => set("services", on ? d.services.filter((x) => x !== s) : [...d.services, s])} className="peer sr-only" />
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] ring-1 ring-line transition-colors peer-checked:bg-ink peer-checked:text-araliya peer-focus-visible:outline-2 peer-focus-visible:outline-gold">{s}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <label className={label}>
              Anything else <span className="font-normal text-ink-2">(colours, ideas, questions)</span>
              <textarea rows={4} value={d.message} onChange={(e) => set("message", e.target.value)} className={`${field} py-3`} />
            </label>
          </>
        )}
      </div>

      {status === "error" && (
        <p className="mt-6 rounded-2xl bg-[#b3261e]/10 p-4 text-[0.9375rem]" role="alert">
          That didn&rsquo;t send. Your details are still here: try again, or{" "}
          <a className="underline" href={whatsappLink(site.whatsapp.intl, waText)} target="_blank" rel="noopener">send them on WhatsApp</a>.
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-ghost">Back</button>
        ) : <span />}
        <button type="submit" disabled={status === "sending"} className="btn btn-gold min-w-40 disabled:opacity-60">
          {step < STEPS.length - 1 ? <>Continue <ArrowRight /></> : status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
