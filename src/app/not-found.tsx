import Link from "next/link";
import { Page } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Photo";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <Page>
      <section className="wrap grid min-h-[100svh] items-center gap-10 pt-28 pb-16 md:grid-cols-2">
        <div>
          <p className="kicker">Page not found</p>
          <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)]">This path ends at <em>the hedge.</em></h1>
          <p className="mt-6 max-w-[38ch] text-ink-2">The page you wanted isn&rsquo;t here. The garden still is.</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/" className="btn btn-gold">Back to the start <ArrowRight /></Link>
            <Link href="/contact" className="btn btn-ghost">Check a date</Link>
          </div>
        </div>
        <Photo k="entrance-arch" ratio="4/5" sizes="(min-width:768px) 48vw, 100vw" reveal={false} position="50% 20%" />
      </section>
    </Page>
  );
}
