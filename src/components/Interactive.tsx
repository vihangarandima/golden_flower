"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { plannerRates, services, venues, type Venue } from "@/content/weddings";
import { site } from "@/content/site";
import { track, whatsappLink } from "@/lib/track";
import { Photo } from "./ui/Photo";
import { ArrowRight, WhatsApp } from "./ui/Icons";

function Segmented<T extends string>({ value, options, onChange, label, className = "" }: { value: T; options: readonly T[]; onChange: (v: T) => void; label: string; className?: string }) {
  return (
    <div role="radiogroup" aria-label={label} className={`no-bar inline-grid max-w-full auto-cols-auto grid-flow-col overflow-x-auto rounded-xl bg-ink/[0.07] p-1 max-sm:w-full sm:auto-cols-fr ${className}`}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`min-h-10 whitespace-nowrap rounded-lg px-2 text-[0.8125rem] transition-all duration-300 cursor-pointer sm:px-4 sm:text-[0.9375rem] ${value === o ? "bg-araliya font-medium shadow-sm" : "text-ink-2 hover:text-ink"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function VenueExplorer() {
  const [setting, setSetting] = useState<"All" | "Outdoor" | "Indoor">("All");
  const [use, setUse] = useState<"Any" | Venue["bestFor"][number]>("Any");
  const [compare, setCompare] = useState(false);
  const list = venues.filter((v) => (setting === "All" || v.setting === setting) && (use === "Any" || v.bestFor.includes(use)));

  return (
    <section className="wrap pb-24 md:pb-32">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented label="Setting" value={setting} options={["All", "Outdoor", "Indoor"] as const} onChange={setSetting} />
        <Segmented label="Best for" value={use} options={["Any", "Ceremony", "Reception", "Homecoming"] as const} onChange={setUse} />
        <button type="button" onClick={() => setCompare((c) => !c)} aria-pressed={compare} className={`btn sm:ml-auto ${compare ? "btn-gold" : "btn-ghost"}`}>
          {compare ? "Hide comparison" : "Compare side by side"}
        </button>
      </div>

      {compare ? (
        <div className="mt-10 rounded-[22px] bg-husk p-1 sm:rounded-[28px] sm:p-2">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr>
                <th className="w-[22%] p-2.5 font-normal text-ink-2 sm:w-auto sm:p-4" scope="col"><span className="sr-only">Detail</span></th>
                {venues.map((v) => <th key={v.slug} scope="col" className="display p-2.5 text-xl leading-tight font-normal sm:p-4 sm:text-3xl">{v.name}</th>)}
              </tr>
            </thead>
            <tbody className="text-[0.8125rem] sm:text-[0.9375rem]">
              {[
                ["Setting", (v: Venue) => v.setting],
                ["Seated guests", (v: Venue) => v.capacity ? `Up to ${v.capacity}` : "Ask us"],
                ["Best for", (v: Venue) => v.bestFor.join(", ")],
                ...[0, 1, 2, 3].map((i) => [i === 0 ? "Includes" : "", (v: Venue) => v.details[i] ?? ""] as const),
              ].map(([k, fn], r) => (
                <tr key={r} className="border-t border-line">
                  <th scope="row" className="p-2.5 font-normal text-ink-2 align-top sm:p-4">{k as string}</th>
                  {venues.map((v) => <td key={v.slug} className="p-2.5 align-top sm:p-4">{(fn as (v: Venue) => string)(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {list.map((v) => (
            <Link key={v.slug} href={`/venues/${v.slug}`} data-cursor="Explore" className="group block">
              <Photo k={v.photo} ratio="5/4" sizes="(min-width:768px) 48vw, 100vw" reveal={false} imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-apple)] group-hover:scale-[1.04]" />
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm text-ink-2">{v.setting} · {v.capacity ? `up to ${v.capacity} guests` : "capacity on request"}</p>
                  <h2 className="display mt-2 text-[2.6rem] leading-none">{v.name}</h2>
                  <p className="mt-3 max-w-[40ch] text-ink-2">{v.short}</p>
                </div>
                <span className="mt-8 grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors group-hover:bg-ink group-hover:text-araliya"><ArrowRight /></span>
              </div>
            </Link>
          ))}
          {!list.length && <p className="text-ink-2">No venue matches both filters. Try “Any”.</p>}
        </div>
      )}
    </section>
  );
}

export function Planner() {
  const [guests, setGuests] = useState(250);
  const [where, setWhere] = useState<"Garden" | "Hall">("Garden");
  const [extras, setExtras] = useState<string[]>(["Décor & stage", "Catering"]);
  const rate = plannerRates.perHead[where === "Garden" ? "garden" : "hall"];
  const estimate = useMemo(() => (rate ? Math.round((rate * guests) / 10000) * 10000 : null), [rate, guests]);
  const text = `Hello Golden Flower, we'd like a quote: about ${guests} guests, ${where.toLowerCase()}, with ${extras.join(", ") || "venue only"}.`;

  return (
    <section className="wrap py-24 md:py-32">
      <div className="grid gap-10 rounded-[28px] bg-husk p-6 md:p-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="kicker">Quick planner</p>
          <h2 className="display mt-5 text-[clamp(2.4rem,4.6vw,4rem)] leading-none">Build your <em>quote request</em></h2>
          <p className="mt-5 max-w-[40ch] text-ink-2">
            Choose the basics and send them to us in one tap. We reply with a written quote, usually the same day.
          </p>
        </div>
        <div className="grid gap-7">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="pl-g" className="font-medium">Guests</label>
              <output htmlFor="pl-g" className="display text-4xl tabular-nums">{guests}</output>
            </div>
            <input id="pl-g" type="range" min={25} max={600} step={25} value={guests} onChange={(e) => { setGuests(+e.target.value); track("planner_used"); }} className="mt-3 w-full min-h-11 accent-[var(--gold)]" />
          </div>
          <div>
            <p className="mb-3 font-medium">Where</p>
            <Segmented label="Where" value={where} options={["Garden", "Hall"] as const} onChange={setWhere} className="w-full" />
          </div>
          <fieldset>
            <legend className="mb-3 font-medium">Include</legend>
            <div className="flex flex-wrap gap-2">
              {services.filter((s) => s !== "Venue").map((s) => {
                const on = extras.includes(s);
                return (
                  <button key={s} type="button" aria-pressed={on} onClick={() => setExtras(on ? extras.filter((x) => x !== s) : [...extras, s])} className={`min-h-11 rounded-full px-4 text-[0.9375rem] ring-1 transition-colors cursor-pointer ${on ? "bg-ink text-araliya ring-ink" : "ring-line hover:bg-araliya"}`}>
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="border-t border-line pt-6">
            {estimate ? (
              <p className="text-ink-2">Indicative only, venue and food: <span className="display text-3xl text-ink">{plannerRates.currency} {estimate.toLocaleString("en-LK")}</span></p>
            ) : (
              <p className="text-ink-2">Rates depend on the date and menu, so we quote each wedding personally.</p>
            )}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={whatsappLink(site.whatsapp.intl, text)} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { from: "planner" })} className="btn btn-gold"><WhatsApp className="size-4" /> Send on WhatsApp</a>
              <Link href={`/contact?guests=${guests}`} className="btn btn-ghost">Use the full form</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
