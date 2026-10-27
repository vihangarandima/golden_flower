import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { VenueExplorer } from "@/components/Interactive";
import { EnquireBand } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Venues",
  description: "The Garden for ceremonies and night receptions, the Banquet Hall for receptions and homecomings. Hingurakgoda, Sri Lanka.",
  alternates: { canonical: "/venues" },
};

export default function Venues() {
  return (
    <Page>
      <PageHead kicker="Venues" title="The garden *and* the hall" lede="Two spaces, a short walk apart. Most weddings use both: the lawn for the ceremony, the hall when the sun is high or the rain comes." />
      <VenueExplorer />
      <EnquireBand title="Come and *walk it*" body="The best way to choose is to stand on the lawn at the hour your ceremony starts. Call and we'll show you round." />
    </Page>
  );
}
