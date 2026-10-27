import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page, PageHead } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { EnquireBand } from "@/components/Blocks";
import { venues } from "@/content/weddings";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/venues/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = venues.find((x) => x.slug === slug);
  return v ? { title: v.name, description: v.short, alternates: { canonical: `/venues/${v.slug}` } } : {};
}

export default async function VenuePage({ params }: PageProps<"/venues/[slug]">) {
  const { slug } = await params;
  const v = venues.find((x) => x.slug === slug);
  if (!v) notFound();
  const other = venues.find((x) => x.slug !== slug)!;
  const ld = { "@context": "https://schema.org", "@type": "EventVenue", name: `${v.name}, Golden Flower`, address: `${site.address.line1}, ${site.address.town}, Sri Lanka`, description: v.short };

  return (
    <Page>
      <PageHead kicker={`${v.setting} · ${v.capacity ? `up to ${v.capacity} guests` : "capacity on request"}`} title={v.name} lede={v.short} />
      <div className="wrap"><Photo k={v.photo} ratio="16/9" sizes="100vw" priority parallax={0.1} /></div>

      <section className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="space-y-6 text-[1.1875rem] leading-relaxed md:col-span-7">
          {v.long.map((p) => <p key={p} data-fade>{p}</p>)}
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <h2 className="text-sm text-ink-2">What&rsquo;s here</h2>
          <ul className="mt-4">
            {v.details.map((d) => <li key={d} className="border-b border-line py-3" data-fade>{d}</li>)}
          </ul>
          <p className="mt-6 text-sm text-ink-2">Best for {v.bestFor.join(", ").toLowerCase()}.</p>
        </aside>
      </section>

      <section className="wrap grid gap-4 pb-24 md:grid-cols-2 md:pb-32">
        {v.gallery.slice(1).map((g, i, all) => {
          // odd count: the first photo runs full width so the grid ends evenly
          const wide = all.length % 2 === 1 && i === 0;
          return <Photo key={g} k={g} ratio={wide ? "16/9" : "4/3"} className={wide ? "md:col-span-2" : ""} sizes={wide ? "100vw" : "(min-width:768px) 48vw, 100vw"} />;
        })}
      </section>

      {/* TODO: drop a 360° tour or walkthrough video here when filmed */}
      <section className="wrap pb-24">
        <Link href={`/venues/${other.slug}`} className="group flex items-center justify-between gap-6 border-y border-line py-10">
          <span>
            <span className="block text-sm text-ink-2">Next venue</span>
            <span className="display text-[clamp(2.4rem,5vw,4.4rem)] leading-none">{other.name}</span>
          </span>
          <span className="grid size-14 place-items-center rounded-full ring-1 ring-line transition-colors group-hover:bg-ink group-hover:text-araliya"><ArrowRight /></span>
        </Link>
      </section>
      <EnquireBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Page>
  );
}
