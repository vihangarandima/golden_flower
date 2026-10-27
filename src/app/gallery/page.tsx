import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { photos, type PhotoKey } from "@/content/photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Stages, tables, ceremonies and receptions at Golden Flower, Hingurakgoda.",
  alternates: { canonical: "/gallery" },
};

// TODO: add full wedding stories (with each couple's permission) as /gallery/[slug].
// Rows on desktop: wide + narrow, four portraits, narrow + wide. Spans and ratios are paired so each row ends level.
const layout: { k: PhotoKey; span: string; ratio: string; sizes: string }[] = [
  { k: "garden-ceremony", span: "md:col-span-7 md:!aspect-[7/5]", ratio: "4/3", sizes: "(min-width:768px) 58vw, 100vw" },
  { k: "garden-night", span: "md:col-span-5 md:!aspect-square", ratio: "4/5", sizes: "(min-width:768px) 42vw, 100vw" },
  { k: "stage-sofa", span: "md:col-span-3 md:!aspect-[3/4]", ratio: "4/3", sizes: "(min-width:768px) 25vw, 100vw" },
  { k: "head-table", span: "md:col-span-3 md:!aspect-[3/4]", ratio: "4/3", sizes: "(min-width:768px) 25vw, 100vw" },
  { k: "table-centrepiece", span: "md:col-span-3 md:!aspect-[3/4]", ratio: "4/3", sizes: "(min-width:768px) 25vw, 100vw" },
  { k: "entrance-arch", span: "md:col-span-3 md:!aspect-[3/4]", ratio: "4/3", sizes: "(min-width:768px) 25vw, 100vw" },
  { k: "banquet-hall", span: "md:col-span-5 md:!aspect-square", ratio: "4/3", sizes: "(min-width:768px) 42vw, 100vw" },
  { k: "hall-event", span: "md:col-span-7 md:!aspect-[7/5]", ratio: "4/3", sizes: "(min-width:768px) 58vw, 100vw" },
];

export default function Gallery() {
  return (
    <Page>
      <PageHead
        kicker="Gallery"
        title="Real days, *real stages*"
        lede={`Every photo here is ours, from weddings and events at the hotel. More go up on Facebook every week; ${site.reviews.facebook.followers} people follow along.`}
      />
      <section className="wrap grid gap-x-4 gap-y-8 pb-24 md:grid-cols-12 md:pb-32">
        {layout.map(({ k, span, ratio, sizes }) => (
          <figure key={k} className={span.split(" ")[0]}>
            <Photo k={k} ratio={ratio} className={span.split(" ").slice(1).join(" ")} sizes={sizes} />
            <figcaption className="mt-2.5 text-sm text-ink-2">{photos[k].caption}</figcaption>
          </figure>
        ))}
      </section>
      <EnquireBand />
    </Page>
  );
}
