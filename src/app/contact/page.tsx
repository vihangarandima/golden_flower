import type { Metadata } from "next";
import { Suspense } from "react";
import { Page, PageHead } from "@/components/ui/Page";
import { EnquiryForm } from "@/components/EnquiryForm";
import { site } from "@/content/site";
import { Phone, Pin, WhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact & enquire",
  description: "Check your wedding date at Golden Flower, Hingurakgoda. Call, WhatsApp or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <Page>
      <PageHead kicker="Contact" title="Let's check *your date*" lede="Three short steps and we'll call you back, usually the same day. Prefer to talk? Every number below reaches someone who can book you." />
      <section className="wrap grid gap-10 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="h-[560px] rounded-[28px] bg-husk" />}>
            <EnquiryForm />
          </Suspense>
        </div>
        <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="text-sm text-ink-2">Call</h2>
            <ul className="mt-3">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex min-h-12 items-center justify-between gap-4 border-b border-line">
                    <span className="inline-flex items-center gap-2.5 tabular-nums"><Phone className="size-4 text-gold" />{p.number}</span>
                    <span className="text-sm text-ink-2">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a href={`https://wa.me/${site.whatsapp.intl}`} target="_blank" rel="noopener" className="btn btn-gold w-full !min-h-13">
            <WhatsApp className="size-4" /> WhatsApp {site.whatsapp.number}
          </a>
          <div>
            <h2 className="text-sm text-ink-2">Visit</h2>
            <a href={site.mapUrl} target="_blank" rel="noopener" className="mt-3 flex items-start gap-2.5">
              <Pin className="mt-1 size-4 shrink-0 text-gold" />
              <span>
                {site.address.line1}, {site.address.town}, {site.address.country}
                <br />
                <span className="text-sm text-ink-2">{site.officeHours}</span>
              </span>
            </a>
          </div>
          <iframe
            title="Map to Golden Flower, Hingurakgoda"
            src={`https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`}
            loading="lazy"
            className="aspect-square w-full rounded-[22px] border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </aside>
      </section>
    </Page>
  );
}
