import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { celebrations } from "@/content/pages";

export const metadata: Metadata = {
  title: "Other celebrations",
  description: "Homecomings, engagements, birthdays, company events and décor at your own venue, Hingurakgoda.",
  alternates: { canonical: "/celebrations" },
};

export default function Celebrations() {
  return (
    <Page>
      <PageHead kicker="Other celebrations" title="Not only *weddings*" lede="The same garden, hall, kitchen and décor team, for every other day worth dressing up for." />
      <section className="wrap grid gap-x-5 gap-y-14 pb-24 md:grid-cols-6 md:pb-32">
        {celebrations.map((c, i) => (
          <article key={c.title} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
            <Photo k={c.photo} ratio={i < 2 ? "4/3" : "4/5"} sizes={i < 2 ? "(min-width:768px) 48vw, 100vw" : "(min-width:768px) 31vw, 100vw"} />
            <h2 className="display mt-5 text-[2.2rem] leading-none">{c.title}</h2>
            <p className="mt-3 text-ink-2">{c.body}</p>
          </article>
        ))}
      </section>
      <EnquireBand title="What are you *celebrating?*" />
    </Page>
  );
}
