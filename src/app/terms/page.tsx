import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

// TODO: replace with the hotel's booking, deposit and cancellation terms.
export default function Terms() {
  return (
    <Page>
      <PageHead kicker="Terms" title="The *small print*" />
      <section className="wrap max-w-[68ch] space-y-5 pb-32 text-ink-2">
        <p>Packages and descriptions on this site are a guide. Your written quote sets out exactly what is included, the price and the payment schedule.</p>
        <p>A date is reserved once we confirm it in writing and receive the advance stated on your quote.</p>
        <p>Photos on this site are from events at Golden Flower and are shown for reference; every wedding is designed to order.</p>
      </section>
    </Page>
  );
}
