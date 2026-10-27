import type { Metadata } from "next";
import { Page, PageHead } from "@/components/ui/Page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

// TODO: have this reviewed before launch.
export default function Privacy() {
  return (
    <Page>
      <PageHead kicker="Privacy" title="Your details *stay with us*" />
      <section className="wrap max-w-[68ch] space-y-5 pb-32 text-ink-2">
        <p>When you send an enquiry we receive your names, phone number, optional email, wedding date and the details you choose to share. We use them only to reply to you and plan your event.</p>
        <p>We don&rsquo;t sell or share your details. Enquiries are delivered to our team by email. If you&rsquo;d like us to delete them, call {site.phones[3].number}.</p>
        <p>This site counts anonymous visits and button taps (such as &ldquo;WhatsApp&rdquo;) to understand what&rsquo;s useful. It doesn&rsquo;t use advertising cookies.</p>
      </section>
    </Page>
  );
}
