import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { Words } from "@/components/ui/Words";
import { Faq, EnquireBand } from "@/components/Blocks";
import { TheDay } from "@/components/home/TheDay";
import { ceremonyTypes } from "@/content/weddings";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Weddings",
  description: "Poruwa, Hindu, Christian and Muslim ceremonies, receptions and homecomings in Hingurakgoda. Garden or hall, with our own décor and kitchen.",
  alternates: { canonical: "/weddings" },
};

export default function Weddings() {
  return (
    <Page>
      <PageHead kicker="Weddings" title="Every ceremony, *one garden*" lede="Families from Polonnaruwa, Minneriya, Dambulla and further come to us for one reason: the venue, the décor, the food and the rooms are run by the same people." />
      <div className="wrap"><Photo k="garden-ceremony" ratio="4/3" className="md:!aspect-[21/9]" sizes="100vw" priority parallax={0.1} /></div>

      <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <Words text="We have set *all of these*" className="display text-[clamp(2.4rem,4.6vw,4rem)]" />
        </div>
        <ul className="md:col-span-7 md:pt-3">
          {ceremonyTypes.map((c) => (
            <li key={c} className="border-b border-line py-5" data-fade>
              <span className="display text-[1.9rem] leading-none">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <TheDay />

      <section className="wrap grid gap-5 py-24 md:grid-cols-2 md:py-32">
        <div className="flex flex-col justify-center gap-6">
          <p className="kicker" data-fade>Décor</p>
          <Words text="Built by hand, *the night before*" className="display text-[clamp(2.4rem,4.6vw,4rem)]" />
          <p className="max-w-[44ch] text-ink-2" data-fade>
            The stage, the flower walls and the table centrepieces are made by our own décor team, Golden Flower Wedding Arrangement. Nothing is hired in from a stranger, so nothing turns up late.
          </p>
          <Link href="/planning" className="btn btn-ghost self-start" data-fade>How we plan <ArrowRight /></Link>
        </div>
        <Photo k="stage-sofa" ratio="4/3" sizes="(min-width:768px) 48vw, 100vw" />
      </section>

      <Faq />
      <EnquireBand />
    </Page>
  );
}
