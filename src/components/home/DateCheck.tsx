"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { track, whatsappLink } from "@/lib/track";
import { Words } from "../ui/Words";
import { ArrowRight, WhatsApp } from "../ui/Icons";

/** Closing call to action: a two-field date check that hands off to the full enquiry form. */
export function DateCheck() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    track("enquiry_started", { from: "home_cta" });
    const q = new URLSearchParams();
    if (date) q.set("date", date);
    if (guests) q.set("guests", guests);
    router.push(`/contact${q.size ? `?${q}` : ""}`);
  };

  const today = new Date().toISOString().slice(0, 10);
  const field = "w-full rounded-2xl bg-white/[0.07] px-4 pt-6 pb-2.5 text-[1.0625rem] text-on-lawn ring-1 ring-white/15 outline-none transition focus:ring-2 focus:ring-gold-light [color-scheme:dark]";

  return (
    <section className="on-dark bg-lawn text-on-lawn">
      <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="kicker !text-on-lawn-2" data-fade>Start here</p>
          <Words text="Tell us your *date.*" className="display mt-6 text-[clamp(3rem,8vw,7.5rem)]" />
          <p className="mt-6 max-w-[40ch] text-on-lawn-2" data-fade>
            Or your nekath, if the astrologer has already given it. We&rsquo;ll tell you within the day whether the garden or hall is free.
          </p>
        </div>

        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2" data-fade>
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-2 text-[0.75rem] text-on-lawn-2">Wedding date</span>
            <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
          </label>
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-2 text-[0.75rem] text-on-lawn-2">Guests, roughly</span>
            <input type="number" inputMode="numeric" min={10} max={1000} step={10} placeholder="250" value={guests} onChange={(e) => setGuests(e.target.value)} className={`${field} placeholder:text-white/30`} />
          </label>
          <button type="submit" className="btn btn-gold sm:col-span-2 !min-h-13 text-base">Check availability <ArrowRight /></button>
          <a
            href={whatsappLink(site.whatsapp.intl, `Hello Golden Flower, is ${date || "[date]"} free for a wedding of about ${guests || "[number]"} guests?`)}
            target="_blank"
            rel="noopener"
            onClick={() => track("whatsapp_click", { from: "home_cta" })}
            className="btn btn-ghost sm:col-span-2"
          >
            <WhatsApp className="size-4" /> Ask on WhatsApp instead
          </a>
        </form>
      </div>
    </section>
  );
}
