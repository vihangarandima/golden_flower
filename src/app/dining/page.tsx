import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { dining } from "@/content/pages";

export const metadata: Metadata = {
  title: "Food & catering",
  description: "Wedding buffets from our own kitchen in Hingurakgoda: Sri Lankan rice and curry, Western and Chinese menus.",
  alternates: { canonical: "/dining" },
};

export default function Dining() {
  return (
    <Page>
      <PageHead kicker="Food & catering" title="Cooked *next door*" lede="Our kitchen is a few steps from the hall, so the buffet arrives hot and the people who cooked it are there to serve it." />
      <div className="wrap"><Photo k="table-centrepiece" ratio="4/3" className="md:!aspect-[21/9]" sizes="100vw" priority /></div>
      <section className="wrap grid gap-x-16 gap-y-12 py-24 md:grid-cols-2 md:py-32">
        {dining.map((d) => (
          <div key={d.title} className="border-t border-line pt-8" data-fade>
            <h2 className="display text-[clamp(2rem,3vw,2.8rem)] leading-none">{d.title}</h2>
            <p className="mt-4 max-w-[44ch] text-ink-2">{d.body}</p>
          </div>
        ))}
      </section>
      <EnquireBand title="Book *a tasting*" body="Sit down with our cooks before you decide. Bring whoever in the family has the strongest opinions." />
    </Page>
  );
}
