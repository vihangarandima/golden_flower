import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Hotel Golden Flower and Golden Flower Wedding Arrangement: a family-run hotel, garden and décor team in Hingurakgoda.",
  alternates: { canonical: "/about" },
};

// TODO: the owner's own words: when the hotel opened, who started the décor team, a family name or two.
export default function About() {
  return (
    <Page>
      <PageHead kicker="About us" title="A hotel that became *a wedding house*" />
      <div className="wrap"><Photo k="entrance-arch" ratio="16/9" sizes="100vw" priority parallax={0.1} position="50% 25%" /></div>
      <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="space-y-6 text-[1.1875rem] leading-relaxed md:col-span-7">
          <p data-fade>
            Golden Flower is a hotel on Airport Road in Hingurakgoda, a town of paddy fields between Minneriya and Polonnaruwa. For years, families asked us to host their weddings in the garden behind the hotel. Then they asked if we could decorate too.
          </p>
          <p data-fade>
            So we built a décor team, Golden Flower Wedding Arrangement, that now makes the stages, flower walls and tables for weddings here and at other venues across the district.
          </p>
          <p data-fade>
            We&rsquo;re not trying to be a five-star resort. We&rsquo;re trying to be the place where your whole family is looked after, from the first phone call to the last guest leaving.
          </p>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <h2 className="text-sm text-ink-2">Find us</h2>
          <address className="display mt-3 text-3xl not-italic leading-tight">{site.address.line1},<br />{site.address.town}</address>
          <a href={site.mapUrl} target="_blank" rel="noopener" className="link-draw mt-4 inline-block text-gold">Open in Maps</a>
        </aside>
      </section>
      <EnquireBand />
    </Page>
  );
}
