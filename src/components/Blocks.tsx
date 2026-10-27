import Link from "next/link";
import { faqs } from "@/content/weddings";
import { site } from "@/content/site";
import { Words } from "./ui/Words";
import { ArrowRight, Plus } from "./ui/Icons";

export function Faq({ items = faqs, title = "Questions families *ask us*" }: { items?: { q: string; a: string }[]; title?: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-32">
      <div className="md:col-span-4">
        <Words text={title} className="display text-[clamp(2.4rem,4.6vw,4rem)] max-w-[10ch]" />
      </div>
      <div className="md:col-span-8">
        {items.map((f) => (
          <details key={f.q} className="faq border-b border-line" data-fade>
            <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-[1.1875rem] font-medium">
              {f.q}
              <span className="chev grid size-9 shrink-0 place-items-center rounded-full bg-husk"><Plus /></span>
            </summary>
            <p className="max-w-[60ch] pb-6 text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}

export function EnquireBand({ title = "Is your date *free?*", body = "Call, message or send the form. Most replies go out the same day." }: { title?: string; body?: string }) {
  return (
    <section className="on-dark bg-lawn text-on-lawn">
      <div className="wrap flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div>
          <Words text={title} className="display text-[clamp(2.8rem,7vw,6.5rem)]" />
          <p className="mt-5 max-w-[42ch] text-on-lawn-2" data-fade>{body}</p>
        </div>
        <div className="flex flex-wrap gap-2.5" data-fade>
          <Link href="/contact" className="btn btn-gold">Send an enquiry <ArrowRight /></Link>
          <a href={`tel:${site.phones[0].tel}`} className="btn btn-ghost">Call {site.phones[0].number}</a>
        </div>
      </div>
    </section>
  );
}
