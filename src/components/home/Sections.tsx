import Link from "next/link";
import { packages } from "@/content/weddings";
import { site } from "@/content/site";
import { Photo } from "../ui/Photo";
import { Words } from "../ui/Words";
import { ArrowRight, ArrowUpRight } from "../ui/Icons";

/** A paragraph whose words fill in as you scroll through it. */
export function Intro() {
  const text =
    "We are not a resort, and we don't pretend to be. We're a family-run hotel on Airport Road with a shaded garden, a hall, a kitchen and a décor team that builds every stage by hand. All of it on one plot, so on your day nobody is waiting on anybody else.";
  return (
    <section className="wrap py-28 md:py-44">
      <p className="kicker" data-fade>Who we are</p>
      <p data-fill className="display mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.06] md:max-w-[26ch]">
        {text.split(" ").map((w, i) => (
          <span key={i} className="fw">{w} </span>
        ))}
      </p>
      <div className="mt-12 flex items-center gap-6" data-fade>
        <Link href="/about" className="btn btn-ghost">Our story <ArrowRight /></Link>
        <p lang="si" className="font-sinhala text-ink-2">ආයුබෝවන්</p>
      </div>
    </section>
  );
}

export function PackagesPreview() {
  return (
    <section className="bg-husk py-24 md:py-36">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker" data-fade>Packages</p>
            <Words text="Three ways to *begin.*" className="display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]" />
          </div>
          <p className="max-w-[38ch] text-ink-2" data-fade>
            Every family's list is different, so we price each wedding after one conversation. These are where most start.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {packages.map((p, i) => (
            <article key={p.name} className="group flex flex-col rounded-[28px] bg-araliya p-3 pb-7" data-fade>
              <Photo k={p.photo} ratio="4/3" sizes="(min-width:768px) 31vw, 92vw" reveal={false} imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-apple)] group-hover:scale-[1.04]" />
              <div className="flex flex-1 flex-col px-3 pt-6">
                <p className="text-sm text-ink-2">{p.for}</p>
                <h3 className="display mt-2 text-[2rem] leading-none">{p.name}</h3>
                <ul className="mt-6 space-y-2 text-[0.9375rem]">
                  {p.includes.slice(0, i === 2 ? 5 : 4).map((x) => (
                    <li key={x} className="flex gap-3"><span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-gold" />{x}</li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 text-sm text-ink-2">
                  {p.priceFrom ? `From LKR ${p.priceFrom.toLocaleString("en-LK")}` : "Rates on request"}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10" data-fade>
          <Link href="/packages" className="btn btn-gold">Compare packages <ArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}

export function GalleryPreview() {
  return (
    <section className="wrap py-24 md:py-36">
      <div className="flex items-end justify-between gap-6">
        <Words text="From the last *few seasons*" className="display text-[clamp(2.6rem,6vw,5.6rem)] max-w-[12ch]" />
        <Link href="/gallery" className="link-draw hidden shrink-0 md:inline-flex items-center gap-1.5">Full gallery <ArrowRight /></Link>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
        <Link href="/gallery" data-cursor="View" className="col-span-2 md:col-span-7 md:row-span-2"><Photo k="garden-ceremony" ratio="4/3" sizes="(min-width:768px) 58vw, 100vw" parallax={0.08} /></Link>
        <Link href="/gallery" data-cursor="View" className="md:col-span-5"><Photo k="stage-sofa" ratio="5/4" sizes="(min-width:768px) 40vw, 50vw" position="50% 60%" /></Link>
        <Link href="/gallery" data-cursor="View" className="md:col-span-5"><Photo k="head-table" ratio="5/4" sizes="(min-width:768px) 40vw, 50vw" /></Link>
        <Link href="/gallery" data-cursor="View" className="md:col-span-4 md:col-start-2"><Photo k="garden-night" ratio="4/5" sizes="(min-width:768px) 32vw, 50vw" /></Link>
        <Link href="/gallery" data-cursor="View" className="md:col-span-6"><Photo k="table-centrepiece" ratio="3/2" sizes="(min-width:768px) 48vw, 50vw" /></Link>
      </div>
      <Link href="/gallery" className="btn btn-ghost mt-10 md:hidden">Full gallery <ArrowRight /></Link>
    </section>
  );
}

export function StayDine() {
  const items = [
    { href: "/stay", kicker: "Rooms", title: "Stay the night upstairs", body: "Rooms for the couple and the family, a staircase from the party.", photo: "room-bed" as const, position: "35% 50%" },
    { href: "/dining", kicker: "Food", title: "Our own kitchen", body: "Rice and curry done properly, plus Western and Chinese menus.", photo: "table-centrepiece" as const, position: "50% 50%" },
  ];
  return (
    <section className="wrap grid gap-5 pb-24 md:grid-cols-2 md:pb-36">
      {items.map((it) => (
        <Link key={it.href} href={it.href} data-cursor="Open" className="group relative block overflow-hidden rounded-[28px] text-white">
          <Photo k={it.photo} ratio="4/5" sizes="(min-width:768px) 48vw, 100vw" reveal={false} position={it.position} className="!rounded-none" imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-apple)] group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
            <div>
              <p className="text-sm text-white/75">{it.kicker}</p>
              <h3 className="display mt-2 text-[clamp(2rem,3.4vw,3rem)] leading-none">{it.title}</h3>
              <p className="mt-3 max-w-[32ch] text-white/80">{it.body}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-apple)] group-hover:rotate-45"><ArrowUpRight /></span>
          </div>
        </Link>
      ))}
    </section>
  );
}

export function Marquee() {
  const items = ["Poruwa ceremonies", "Homecomings", "Engagements", "Church blessings", "Birthdays", "Décor at your venue", "Company nights"];
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="display px-6 text-[clamp(2rem,4vw,3.6rem)] italic md:px-10">{t}</span>
          <span className="size-2 rounded-full bg-gold" />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Celebrations we host" className="overflow-hidden border-y border-line py-7 md:py-10">
      <div className="marquee-track flex w-max">{row()}{row(true)}</div>
    </section>
  );
}

export function Social() {
  return (
    <section className="wrap flex flex-col gap-6 py-20 md:flex-row md:items-center md:justify-between md:py-28">
      <div>
        <p className="kicker" data-fade>Follow along</p>
        <p className="display mt-5 text-[clamp(2rem,4vw,3.4rem)] max-w-[20ch] leading-[1.05]" data-fade>
          New stages go up on Facebook most weekends.
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5" data-fade>
        <a href={site.social.facebook} target="_blank" rel="noopener" className="btn btn-ghost">Facebook <ArrowUpRight /></a>
        <a href={site.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost">Instagram <ArrowUpRight /></a>
      </div>
    </section>
  );
}
