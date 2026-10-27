import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { journey } from "@/content/weddings";

export const metadata: Metadata = {
  title: "How we plan",
  description: "From the first call to the homecoming: how Golden Flower plans a wedding in Hingurakgoda.",
  alternates: { canonical: "/planning" },
};

export default function Planning() {
  return (
    <Page>
      <PageHead kicker="How we plan" title="Six steps, *one team*" lede="It starts with a phone call and ends with the couple upstairs. In between, you deal with the same few people." />
      <section className="wrap grid gap-12 pb-24 md:grid-cols-12 md:pb-32">
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-28"><Photo k="stage-sofa" ratio="4/5" sizes="40vw" position="50% 60%" /></div>
        </div>
        <ol className="md:col-span-6 md:col-start-7">
          {journey.map((j, i) => (
            <li key={j.step} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-10 first:pt-0" data-fade>
              <span className="display text-2xl text-gold tabular-nums">{i + 1}</span>
              <div>
                <h2 className="display text-[clamp(2rem,3vw,2.8rem)] leading-none">{j.step}</h2>
                <p className="mt-4 max-w-[46ch] text-ink-2">{j.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <EnquireBand title="Step one is *a call*" />
    </Page>
  );
}
