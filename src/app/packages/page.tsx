import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { Faq, EnquireBand } from "@/components/Blocks";
import { Planner } from "@/components/Interactive";
import { packages } from "@/content/weddings";

export const metadata: Metadata = {
  title: "Wedding packages",
  description: "Garden ceremony, reception, and two-day wedding & homecoming packages in Hingurakgoda. Rates on request.",
  alternates: { canonical: "/packages" },
};

export default function Packages() {
  return (
    <Page>
      <PageHead kicker="Packages" title="Start with one, *change anything*" lede="Three common shapes for a wedding here. Every quote is written for your date, numbers and menu, so treat these as a starting point." />
      <section className="wrap space-y-5 pb-12">
        {packages.map((p, i) => (
          <article key={p.name} className="grid gap-6 rounded-[28px] bg-husk p-3 md:grid-cols-12 md:items-center md:gap-10 md:p-4" data-fade>
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
              <Photo k={p.photo} ratio="4/3" sizes="(min-width:768px) 40vw, 100vw" reveal={false} />
            </div>
            <div className="px-3 pb-6 md:col-span-7 md:px-6 md:pb-0">
              <p className="text-sm text-ink-2">{p.for}</p>
              <h2 className="display mt-2 text-[clamp(2.4rem,4vw,3.6rem)] leading-none">{p.name}</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {p.includes.map((x) => (
                  <li key={x} className="flex gap-3"><span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-gold" />{x}</li>
                ))}
              </ul>
              <p className="mt-8 text-ink-2">{p.priceFrom ? `From LKR ${p.priceFrom.toLocaleString("en-LK")}` : "Rates on request"}</p>
            </div>
          </article>
        ))}
      </section>
      <Planner />
      <Faq />
      <EnquireBand />
    </Page>
  );
}
