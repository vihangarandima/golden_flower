import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { rooms } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Rooms for wedding couples and family at Golden Flower, Hingurakgoda, close to Minneriya and Polonnaruwa.",
  alternates: { canonical: "/stay" },
};

export default function Stay() {
  return (
    <Page>
      <PageHead kicker="Rooms" title="Nobody has to *drive home*" lede="Simple, clean rooms upstairs from the celebration. Wedding families get first call on them." />
      <section className="wrap space-y-24 pb-24 md:pb-32">
        {rooms.map((r, i) => (
          <article key={r.name} className="grid gap-8 md:grid-cols-12 md:items-center">
            {r.photo && (
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                <Photo k={r.photo} ratio="4/3" sizes="(min-width:768px) 58vw, 100vw" />
              </div>
            )}
            <div className={r.photo ? `md:col-span-4 ${i % 2 ? "md:col-start-1" : "md:col-start-9"}` : "rounded-[28px] bg-husk p-8 md:col-span-7 md:col-start-6 md:p-12"}>
              <h2 className="display text-[clamp(2.4rem,4vw,3.6rem)] leading-none">{r.name}</h2>
              <p className="mt-5 text-ink-2">{r.body}</p>
              <ul className="mt-6">
                {r.features.map((f) => <li key={f} className="border-b border-line py-2.5 text-[0.9375rem]">{f}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="bg-husk">
        <div className="wrap py-24 md:py-32">
          <h2 className="display text-[clamp(2.4rem,4.6vw,4rem)]">The morning <em>after</em></h2>
          <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
            {site.nearby.map((n) => (
              <li key={n.place} className="flex items-baseline justify-between gap-6 border-b border-line py-5" data-fade>
                <span>
                  <span className="display block text-[1.7rem] leading-none">{n.place}</span>
                  <span className="text-sm text-ink-2">{n.note}</span>
                </span>
                <span className="shrink-0 text-ink-2">{n.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <EnquireBand title="Hold rooms *for the family*" body="Tell us how many rooms you need with your wedding enquiry and we'll keep them aside." />
    </Page>
  );
}
